import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import { getLatestRoute } from '../../store/routes';

import { Card, CardContent, Divider, CardMedia, Typography, Button, Grid } from '@material-ui/core';
import ExploreIcon from '@material-ui/icons/Explore';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

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
	const [isLatestRoute, setLatestRoute] = useState(false);
	mapboxgl.accessToken =
		'pk.eyJ1IjoibWFya2ptNjEwIiwiYSI6ImNrYjFjeTBoMzAzb3UyeXF1YTE3Y25wdDMifQ.K9r926HKVv0u8RQzpdXleg';

	// const element = document.createElement('div')

	let mapContainer = useRef(null);

	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.authorization.currentUser);
	const latestRoute = useSelector((state) => state.routes.latestRoute);


	// useEffect(() => {
	// 	if (Object.keys(latestRoute).length > 0) {
	// 		setLatestRoute(true);
	// 	}
	// }, [Object.keys(latestRoute).length])

	useEffect(
		() => {
			if (currentUser) {
				dispatch(getLatestRoute(currentUser.userId));
			}
		},
		// eslint-disable-next-line
		[currentUser]
	);

	useEffect(() => {
		if (latestRoute.coordinates) {
			const mapObj = new mapboxgl.Map({
				container: mapContainer, // container id
				style: 'mapbox://styles/mapbox/streets-v11', //hosted style id
				center: [-122.675246, 45.529431], // starting position
				zoom: 12, // starting zoom
				minZoom: 11 // keep it local
			});
			setMap(mapObj);
		}

	}, [latestRoute]);

	useEffect(
		() => {
			if (map && latestRoute.coordinates) {
				map.on('load', () => {

					if (map.getSource('route')) {
						map.removeLayer('route');
						map.removeSource('route');
					}

					const firstSplit = latestRoute.coordinates.split(';');
					const secondSplit = firstSplit.map((el) => {
						return el.split(',');
					});

					const finalArr = secondSplit.map((subArr) => {
						return subArr.map((stringNum) => {
							return Number(stringNum);
						});
					});

					const coords = finalArr;

					map.flyTo({
						center: coords[0]
					});

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
		[map, latestRoute]
	);

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
									<p>{!latestRoute.average_time ? '- -' : latestRoute.average_time}</p>
								</Grid>
								<Grid item xs={4} sm={4} className={classes.textCenter}>
									<Typography variant="body2">Best Time</Typography>
									<p>{!latestRoute.best_time ? '- -' : latestRoute.best_time}</p>
								</Grid>
							</React.Fragment>
						)}
					</Grid>
					{latestRoute && (
						<React.Fragment>
							<Grid item xs={4} sm={4} className={classes.textCenter}>
								<Typography variant="body2">Distance</Typography>
								<p>{parseFloat(latestRoute.distance).toFixed(2)} miles</p>
							</Grid>
							<Grid item xs={4} sm={4} className={classes.textCenter}>
								<Typography variant="body2">Average Time</Typography>
								<p>{!latestRoute.average_time ? '- -' : latestRoute.average_time}</p>
							</Grid>
							<Grid item xs={4} sm={4} className={classes.textCenter}>
								<Typography variant="body2">Best Time</Typography>
								<p>{!latestRoute.best_time ? '- -' : latestRoute.best_time}</p>
							</Grid>
						</React.Fragment>
					)}
				</Card>
			)}
		</React.Fragment>
	);
};

export default MainDash;
