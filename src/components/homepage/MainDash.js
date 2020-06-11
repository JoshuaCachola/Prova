import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import { getMyRoutes } from '../../store/routes';

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
	}
}));

const MainDash = () => {
	const [ map, setMap ] = useState(null);

	mapboxgl.accessToken =
		'pk.eyJ1IjoibWFya2ptNjEwIiwiYSI6ImNrYjFjeTBoMzAzb3UyeXF1YTE3Y25wdDMifQ.K9r926HKVv0u8RQzpdXleg';

	let mapContainer = useRef(null);
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.authorization.currentUser);
	const routes = useSelector((state) => state.routes.routes);
	const currentRoute = useSelector((state) => state.routes.currentRoute);

	useEffect(
		() => {
			if (currentUser) {
				dispatch(getMyRoutes(currentUser.userId));
			}
		},
		// eslint-disable-next-line
		[ currentUser ]
	);

	useEffect(() => {
		const mapObj = new mapboxgl.Map({
			container: mapContainer, // container id
			style: 'mapbox://styles/mapbox/streets-v11', //hosted style id
			center: [ -122.675246, 45.529431 ], // starting position
			zoom: 13, // starting zoom
			minZoom: 11 // keep it local
		});
		setMap(mapObj);
	}, []);

	useEffect(
		() => {
			if (map && currentRoute) {
				if (map.getSource('route')) {
					map.removeLayer('route');
					map.removeSource('route');
				}

				const firstSplit = currentRoute.coordinates.split(';');
				const secondSplit = firstSplit.map((el) => {
					return el.split(',');
				});

				const finalArr = secondSplit.map((subArr) => {
					return subArr.map((stringNum) => {
						return Number(stringNum);
					});
				});

				const coords = finalArr;

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
			}
		},
		[ map, currentRoute ]
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
								Create your first route to run today. Complete the run and add your stats to see if laid
								out neatly
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
			<Card variant="outlined" className={clsx(classes.marginSpacing, classes.cardSize)}>
				<Grid container justify="center" alignItems="center" alignContent="center" spacing={3}>
					<Grid item xs={12}>
						<div ref={(el) => (mapContainer = el)} className="homeMapContainer" />
					</Grid>
					<Grid item xs={4} sm={4}>
						<Typography variant="body2">Time</Typography>
						<p>some kind of text</p>
					</Grid>
					<Grid item xs={4} sm={4}>
						<Typography variant="body2">Distance</Typography>
						<p>some kind of text</p>
					</Grid>
					<Grid item xs={4} sm={4}>
						<Typography variant="body2">Calories</Typography>
						<p>some kind of text</p>
					</Grid>
				</Grid>
			</Card>
		</React.Fragment>
	);
};

export default MainDash;
