import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import { getLatestRoute, getOtherRoutes } from '../../store/routes';

import { Card, CardContent, Divider, CardMedia, Typography, Button, Grid } from '@material-ui/core';
import ExploreIcon from '@material-ui/icons/Explore';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import OtherRoute from './OtherRoute';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	media: {
		height: 0,
		paddingTop: '20.25%'
	},
	largeIcon: {
		width: 60,
		height: 60
	},
	mainDashIcon: {
		display: 'flex',
		justifyContent: 'center'
	},
	marginSpacing: {
		marginTop: 15
	},
	cardSize: {
		maxHeight: '500px'
	},
	linkStyle: {
		textDecoration: 'none',
		color: 'inherit'
	},
	textCenter: {
		textAlign: 'center'
	}
}));

const MainDash = () => {
	const [map, setMap] = useState(null);
	const [coords, setCoords] = useState(null)

	mapboxgl.accessToken =
		'pk.eyJ1IjoibWFya2ptNjEwIiwiYSI6ImNrYjFjeTBoMzAzb3UyeXF1YTE3Y25wdDMifQ.K9r926HKVv0u8RQzpdXleg';

	let mapContainer = useRef(null);

	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.authorization.currentUser);
	const latestRoute = useSelector((state) => state.routes.latestRoute);
	const otherRoutes = useSelector((state) => state.routes.otherRoutes);
	// console.log(otherRoutes)
	const [otherRoutesNumber, setOtherRoutesNumber] = useState(0)
	const [otherRoutesDescription, setOtherRoutesDescription] = useState(null)
	const [previousOtherRoutesNumber, setPreviousOtherRoutesNumber] = useState(0)
	useEffect(
		() => {
			if (currentUser) {
				dispatch(getLatestRoute(currentUser.userId));
				dispatch(getOtherRoutes(currentUser.userId))
			}
		},
		// eslint-disable-next-line
		[currentUser]
	);

	useEffect(
		() => {
			if (latestRoute.coordinates) {

				const firstSplit = latestRoute.coordinates.split(';');
				const secondSplit = firstSplit.map((el) => {
					return el.split(',');
				});

				const finalArr = secondSplit.map((subArr) => {
					return subArr.map((stringNum) => {
						return Number(stringNum);
					});
				});

				const coordinates = finalArr;

				setCoords(coordinates)


			}
		},
		[latestRoute]
	);

	useEffect(() => {
		if (coords) {
			const mapObj = new mapboxgl.Map({
				container: mapContainer, // container id
				style: 'mapbox://styles/mapbox/streets-v11', //hosted style id
				center: coords[0], // starting position
				zoom: 12, // starting zoom
				minZoom: 11 // keep it local
			});
			setMap(mapObj);
		}

	}, [coords])


	useEffect(
		() => {
			if (map && coords) {
				map.on('load', () => {
					if (map.getSource('route')) {
						map.removeLayer('route');
						map.removeSource('route');
					}

					const coordsObj = { coordinates: coords, type: 'LineString' };
					// map.removeLayer()
					map.addLayer({
						id: 'route',
						type: 'line',
						source: {
							type: 'geojson',
							data: {
								type: 'Feature',
								properties: {},
								geometry: coordsObj
							}
						},
						layout: {
							'line-join': 'round',
							'line-cap': 'round'
						},
						paint: {
							'line-color': '#3b9ddd',
							'line-width': 8,
							'line-opacity': 0.8
						}
					});
				});
			}
		},
		[map, coords]
	);

	const convertTime = time => {
		const min = Math.floor(time / 60);
		const sec = time % 60;

		return `${min}'${sec}"`;
	};

	const getNextFive = () => {
		setPreviousOtherRoutesNumber(otherRoutesNumber)
		let highestOtherRouteId = 0;
		otherRoutes[0].forEach(route => {
			if (route.id > highestOtherRouteId) {
				highestOtherRouteId = route.id
			}
		})

		dispatch(getOtherRoutes(currentUser.userId, highestOtherRouteId))
	}



	useEffect(() => {
		if (otherRoutes) {
			setOtherRoutesNumber(otherRoutesNumber + otherRoutes[0].length)
		}
	}, [otherRoutes])


	useEffect(() => {
		if (otherRoutesNumber) {
			setOtherRoutesDescription(`Showing ${previousOtherRoutesNumber + 1}-${otherRoutesNumber} of ${otherRoutes[1].total_routes} undiscovered routes`)

		}
	}, [otherRoutesNumber])


	const classes = useStyles();






	return (
		<React.Fragment>
			<Card variant="outlined">
				<CardMedia
					image={require('../../images/runner.jpg')}
					title="stock photo from unsplash"
					className={classes.media}
				/>
				<CardContent>
					<Typography variant="h5">Getting Started</Typography>
					<Typography variant="body1">
						We've listed a couple of steps to help you get started on Prova.
					</Typography>
					<Divider />
					<Grid
						container
						justify="center"
						alignContent="center"
						alignItems="center"
						className={classes.marginSpacing}
					>
						<Grid item md={3} className={classes.mainDashIcon}>
							<ExploreIcon className={classes.largeIcon} />
						</Grid>
						<Grid item md={9}>
							<Typography variant="body1">
								Create your first route to run today. Complete the run and add your stats to see
								everything laid out neatly!
							</Typography>
							<Button variant="contained" color="secondary">
								<Link to="/create-route" className={classes.linkStyle}>
									Create Route
								</Link>
							</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
			{latestRoute.coordinates && (
				<React.Fragment>
					<div className={classes.marginSpacing}>
						<Typography variant="h5">My Latest Route</Typography>
					</div>
					<Card variant="outlined" className={clsx(classes.marginSpacing, classes.cardSize)}>
						<Grid container justify="center" alignItems="center" alignContent="center" spacing={3}>
							<Grid item xs={12}>
								<div
									ref={(el) => {
										mapContainer = el;
									}}
									className="homeMapContainer"
								/>
							</Grid>
							{latestRoute && (
								<React.Fragment>
									<Grid item xs={4} sm={4} className={classes.textCenter}>
										<Typography variant="body2">Distance</Typography>
										<p>
											{!latestRoute.distance ? (
												'- -'
											) : (
													parseFloat(latestRoute.distance).toFixed(2)
												)}{' '}
											miles
										</p>
									</Grid>
									<Grid item xs={4} sm={4} className={classes.textCenter}>
										<Typography variant="body2">Average Time</Typography>
										<p>{!latestRoute.average_time ? '- -' : convertTime(latestRoute.average_time)} min</p>
									</Grid>
									<Grid item xs={4} sm={4} className={classes.textCenter}>
										<Typography variant="body2">Best Time</Typography>
										<p>{!latestRoute.best_time ? '- -' : convertTime(latestRoute.best_time)} min</p>
									</Grid>
								</React.Fragment>
							)}
						</Grid>
					</Card>
				</React.Fragment>
			)}
			{otherRoutes && (
				<div className={classes.marginSpacing}>
					<Typography variant="h5">Discover Routes</Typography>
					<div className='other-routes-info'>
						<Typography>{otherRoutesDescription}</Typography>
						{otherRoutesNumber < otherRoutes[1].total_routes && (
							<Button
								type="submit"
								variant="contained"
								color="secondary"
								size="small"
								className={classes.button}
								onClick={getNextFive}
							>
								See more
							</Button>)}
					</div>
				</div>)
			}

			{
				otherRoutes && otherRoutes[0].map((route) => {
					return (
						<OtherRoute
							key={route.id}
							id={route.id}
							coordinates={route.coordinates}
							distance={route.distance}
							average_time={route.average_time}
							best_time={route.best_time}
						/>)
				})
			}

		</React.Fragment >
	);
};

export default MainDash;
