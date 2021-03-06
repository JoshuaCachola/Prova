import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { useAuth0 } from '../../react-auth0-spa';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Icon, Grid, Typography, ListItemIcon } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import api from '../../utils';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import createPolylineStr from '../../utils/create-gradient-path';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import TimerIcon from '@material-ui/icons/Timer';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		backgroundColor: '#f7f7fa',
		margin: theme.spacing(1, 0),
		boxShadow:
			'0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
	},
	input: {
		marginLeft: theme.spacing(1),

		flex: 1,
		backgroudColor: 'yellow'
	},
	iconButton: {
		padding: 10
	},
	divider: {
		height: 28,
		margin: 4
	},
	nameInput: {
		margin: '30px'
	},
	container: {
		height: 'inherit'
	},
	bottomContainer: {
		display: 'flex',
		textAlign: 'center',
		alignItems: 'center',
		height: '6vh'
	},
	sidebarContainer: {
		width: '100%',
		height: '80vh',
		overflow: 'auto'
	},
	whiteBackground: {
		backgroundColor: 'white',
		padding: '15px 0'
	},
	inheritBackground: {
		backgroundColor: 'inherit',
		padding: '15px 0'
	},
	listMargin: {
		marginLeft: '20px'
	},
	directionText: {
		fontSize: '8px'
	}
}));

const CreateRoute = ({ history }) => {
	mapboxgl.accessToken =
		'pk.eyJ1IjoibWFya2ptNjEwIiwiYSI6ImNrYjFjeTBoMzAzb3UyeXF1YTE3Y25wdDMifQ.K9r926HKVv0u8RQzpdXleg';

	const { user } = useAuth0();

	const [coordState, setCoordState] = useState(null);
	const [distanceState, setDistanceState] = useState(0.0);

	const [searchInput, setSearch] = useState('');
	const [mapCenter, setMapCenter] = useState([-122.675246, 45.529431]);
	const [directionState, setDirectionState] = useState(null);
	const [displayedDirections, setDisplayedDirections] = useState(null);
	const [nameState, setNameState] = useState('');
	const [nameError, setNameError] = useState(false);
	const [coordError, setCoordError] = useState(false);
	const [staticMap, setStaticMap] = useState('');
	const [showGetStarted, setShowGetStarted] = useState(true);
	const [drawALine, setDrawALine] = useState(false);

	let mapContainer = useRef(null);

	useEffect(() => {
		document.title = 'Prova - Create Route';
	}, []);

	// creates MapBox obj
	const createMB = (center) => {
		// added center argument to change starting point of map
		const mapObj = new mapboxgl.Map({
			container: mapContainer, // container id
			style: 'mapbox://styles/mapbox/streets-v11', //hosted style id
			center: mapCenter, // starting position
			zoom: 13, // starting zoom
			minZoom: 11 // keep it local
		});

		// Maybe instantiate directions in updateRoute and give it the data then so it goes based on
		// path drawn instead of clicking

		mapObj.on('load', () => {
			const drawObj = new MapboxDraw({
				displayControlsDefault: false,
				controls: {
					line_string: true
				},
				styles: [
					// ACTIVE (being drawn)
					// line stroke
					{
						id: 'gl-draw-line',
						type: 'line',
						filter: ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
						layout: {
							'line-cap': 'round',
							'line-join': 'round'
						},
						paint: {
							'line-color': '#FF0000',
							'line-dasharray': [0.2, 2],
							'line-width': 4,
							'line-opacity': 0.7
						}
					},
					// vertex point halos
					{
						id: 'gl-draw-polygon-and-line-vertex-halo-active',
						type: 'circle',
						filter: [
							'all',
							['==', 'meta', 'vertex'],
							['==', '$type', 'Point'],
							['!=', 'mode', 'static']
						],
						paint: {
							'circle-radius': 10,
							'circle-color': '#F08080'
						}
					},
					// vertex points
					{
						id: 'gl-draw-polygon-and-line-vertex-active',
						type: 'circle',
						filter: [
							'all',
							['==', 'meta', 'vertex'],
							['==', '$type', 'Point'],
							['!=', 'mode', 'static']
						],
						paint: {
							'circle-radius': 6,
							'circle-color': '#F08080'
						}
					}
				]
			});

			const updateRoute = () => {
				// Maybe add directions here
				removeRoute();
				const data = drawObj.getAll();

				const lastFeature = data.features.length - 1;
				const coords = data.features[lastFeature].geometry.coordinates;
				const newCoords = coords.join(';');
				getMatch(newCoords);
			};

			const removeRoute = () => {
				if (mapObj.getSource('route')) {
					mapObj.removeLayer('route');
					mapObj.removeSource('route');
				} else {
					return;
				}
			};

			const addRoute = (coords) => {
				drawObj.deleteAll();

				if (mapObj.getSource('route')) {
					mapObj.removeLayer('route');
					mapObj.removeSource('route');
				} else {
					mapObj.addLayer({
						id: 'route',
						type: 'line',
						source: {
							type: 'geojson',
							data: {
								type: 'Feature',
								properties: {},
								geometry: coords
							}
						},
						layout: {
							'line-join': 'round',
							'line-cap': 'round'
						},
						paint: {
							'line-color': '#FF0000',
							'line-width': 8,
							'line-opacity': 0.8
						}
					});
				}
			};

			const getMatch = async (e) => {
				const url =
					'https://api.mapbox.com/directions/v5/mapbox/walking/' +
					e +
					'?geometries=geojson&steps=true&&access_token=' +
					mapboxgl.accessToken;

				try {
					let res = await fetch(url);

					if (!res.ok) throw res;
					res = await res.json();

					const instructionSteps = res.routes[0].legs;
					const runInstructions = [];

					for (let i = 0; i < instructionSteps.length; i++) {
						const steps = instructionSteps[i].steps;
						for (let j = 0; j < steps.length; j++) {
							runInstructions.push(steps[j].maneuver.instruction);
						}
					}
					setDrawALine(false);
					setDisplayedDirections(runInstructions);
					const directionString = runInstructions.join(';');
					setDirectionState(directionString);

					// add later to display estimated time and distance
					const distance = res.routes[0].distance * 0.001 / 1.609;
					const coords = res.routes[0].geometry;

					addRoute(coords);
					// fetch static map from mapbox gl api
					const polyline = createPolylineStr(coords.coordinates);
					const static_map = await fetch(
						`https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/${polyline}/auto/300x300?access_token=${mapboxgl.accessToken}`
					);
					setStaticMap(static_map.url);
					const stringCoords = coords.coordinates.join(';');

					setCoordState(stringCoords);
					setDistanceState(distance);
				} catch (err) {
					console.error(err);
				}
			};

			const handleModeChange = (e) => {
				if (showGetStarted) {
					setShowGetStarted(false);
					setDrawALine(true);
				}
				if (coordError) {
					setCoordError(false)
				}
			};

			mapObj.addControl(drawObj);
			mapObj.on('draw.create', updateRoute);
			mapObj.on('draw.update', updateRoute);
			mapObj.on('draw.delete', removeRoute);
			mapObj.on('draw.modechange', handleModeChange);
		});
	};

	useEffect(
		() => {
			createMB();
		},
		// eslint-disable-next-line
		[mapCenter, setMapCenter]
	);

	const createRouteClick = async (e) => {
		e.preventDefault();

		if (!nameState) {
			setNameError(true);
		}

		if (!coordState) {
			setCoordError(true)
		}

		if (!nameState || !coordState) {
			return
		}

		const routeRes = await fetch(`${api.url}/routes`, {
			method: 'POST',
			body: JSON.stringify({
				name: nameState,
				distance: distanceState,
				coordinates: coordState,
				creatorId: user.userId,
				directions: directionState,
				image: staticMap
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const route = await routeRes.json();
		const personalRouteStatsRes = await fetch(
			`${api.url}/routes/${route.id}/users/${user.userId}/personalroutestats`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		if (personalRouteStatsRes.ok) {
			history.push('/my-routes');
		}

	};

	const handleLocSearch = async (e) => {
		e.preventDefault();
		const search = encodeURI(searchInput);
		if (search === '') {
			return;
		}
		const url = `
			https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${mapboxgl.accessToken}`;

		let res = await fetch(url);
		res = await res.json();
		if (res.features.length) {
			setMapCenter(res.features[0].center);
		}
	};

	const handleSearchInput = (e) => {
		setSearch(e.target.value);
	};

	const nameInputChange = (e) => {
		setNameState(e.target.value);
		if (nameError === true) {
			setNameError(false);
		}
	};

	const directionIcon = (direction, i) => {
		let icon;
		if (i === displayedDirections.length - 1) {
			icon = <TimerIcon />
		} else if (direction.includes('north')) {
			icon = <ArrowUpwardIcon />
		} else if (direction.includes('left') || direction.includes('west')) {
			icon = <ArrowBackIcon />
		} else if (direction.includes('right') || direction.includes('east')) {
			icon = <ArrowForwardIcon />
		} else if (direction.includes('south')) {
			icon = <ArrowDownwardIcon />
		}

		return (
			<ListItem
				key={i}
				className={`${i % 2 ? classes.whiteBackground : classes.inheritBackground} ${'list-item'}`}
			>
				<Box display="flex">
					<Box ml={3} mt={3}>
						<ListItemIcon>
							{icon}
						</ListItemIcon>
					</Box>
					<Box mr={1}>
						<ListItemText primary={direction} className={classes.listMargin} />
					</Box>
				</Box>
			</ListItem>
		);
	};

	const classes = useStyles();
	return (
		<React.Fragment>
			<Grid container className={classes.container}>
				<Grid item xs={2} sm={2} lg={2}>
					<div className="create-route-sidebar">
						<TextField
							className={classes.nameInput}
							error={nameError}
							id="outlined-basic"
							label="Name Your Route"
							variant="outlined"
							color="secondary"
							value={nameState}
							onChange={nameInputChange}
							helperText={nameError && 'Route must have a name'}
						/>
						{displayedDirections ? (
							<React.Fragment>
								<List className={classes.sidebarContainer}>
									<h2 className={classes.listMargin}>Directions:</h2>
									{displayedDirections.map((direction, i) => {
										return (
											directionIcon(direction, i)
										);
									})}
								</List>
							</React.Fragment>
						)
							:
							<h2 style={{ marginLeft: '10px', color: coordError ? 'red' : 'black' }}>How to Create a Route:</h2>}
						{showGetStarted && (
							<React.Fragment>
								<div className="instructions" >
									<Typography>1. Search for where in the world you'd like to run.</Typography>
								</div>
								<div className="instructions">
									<Typography>
										2. Once you've found a spot, click the line button in the top right corner of the
										map to start drawing.
									</Typography>
								</div>
							</React.Fragment>
						)}
						{drawALine && (
							<React.Fragment>
								<div className="instructions">
									<Typography>
										3. Draw a general path, and the map will figure out a route for you.
									</Typography>
								</div>
								<div className="instructions">
									<Typography>4. Double-click to end your route.</Typography>
								</div>
								<div className="instructions">
									<Typography>5. If you want to change your route, just draw a new one!</Typography>
								</div>
							</React.Fragment>
						)}
					</div>
				</Grid>
				<Grid item xs={10} sm={10} lg={10}>
					<Box component="form" className={classes.root}>
						<InputBase
							className={classes.input}
							placeholder="Search by location"
							inputProps={{ 'aria-label': 'search' }}
							onChange={handleSearchInput}
						/>
						<IconButton
							type="submit"
							className={classes.iconButton}
							aria-label="search"
							onClick={handleLocSearch}
						>
							<SearchIcon />
						</IconButton>
						<Divider className={classes.divider} orientation="vertical" />
						<Button
							type="submit"
							variant="contained"
							color="secondary"
							size="small"
							className={classes.button}
							endIcon={<Icon className="fas fa-running" color="inherit" />}
							onClick={createRouteClick}
						>
							Save
						</Button>
					</Box>
					<div ref={(el) => (mapContainer = el)} className="mapContainer" />
					<Grid container className={classes.bottomContainer}>
						<Grid item xs={6} sm={6}>
							<Typography variant="h6">Distance</Typography>
							<Typography variant="body1">{distanceState.toFixed(2)} mi</Typography>
						</Grid>
						<Grid item xs={6} sm={6}>
							<Typography variant="h6">Est. route duration</Typography>
							<Typography variant="body1">{(distanceState * 10).toFixed(2)} min</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

export default CreateRoute;
