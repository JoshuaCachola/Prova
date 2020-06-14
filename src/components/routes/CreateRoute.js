import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { useAuth0 } from '../../react-auth0-spa';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Icon, Grid } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import api from '../../utils';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: '100%'
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
	}
}));

const CreateRoute = ({ history }) => {
	mapboxgl.accessToken =
		'pk.eyJ1IjoibWFya2ptNjEwIiwiYSI6ImNrYjFjeTBoMzAzb3UyeXF1YTE3Y25wdDMifQ.K9r926HKVv0u8RQzpdXleg';

	const { user } = useAuth0();

	const [ coordState, setCoordState ] = useState(null);
	const [ distanceState, setDistanceState ] = useState(0.0);
	const [ durationState, setDurationState ] = useState(0.0);
	const [ searchInput, setSearch ] = useState('');
	const [ mapCenter, setMapCenter ] = useState([ -122.675246, 45.529431 ]);
	const [ directionState, setDirectionState ] = useState(null);
	const [ displayedDirections, setDisplayedDirections ] = useState(null);
	const [ nameState, setNameState ] = useState('');
	const [ nameError, setNameError ] = useState(false);
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
					line_string: true,
					trash: true
				},
				styles: [
					// ACTIVE (being drawn)
					// line stroke
					{
						id: 'gl-draw-line',
						type: 'line',
						filter: [ 'all', [ '==', '$type', 'LineString' ], [ '!=', 'mode', 'static' ] ],
						layout: {
							'line-cap': 'round',
							'line-join': 'round'
						},
						paint: {
							'line-color': '#3b9ddd',
							'line-dasharray': [ 0.2, 2 ],
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
							[ '==', 'meta', 'vertex' ],
							[ '==', '$type', 'Point' ],
							[ '!=', 'mode', 'static' ]
						],
						paint: {
							'circle-radius': 10,
							'circle-color': '#FFF'
						}
					},
					// vertex points
					{
						id: 'gl-draw-polygon-and-line-vertex-active',
						type: 'circle',
						filter: [
							'all',
							[ '==', 'meta', 'vertex' ],
							[ '==', '$type', 'Point' ],
							[ '!=', 'mode', 'static' ]
						],
						paint: {
							'circle-radius': 6,
							'circle-color': '#3b9ddd'
						}
					}
				]
			});

			const updateRoute = () => {
				// Maybe add directions here
				removeRoute();
				const data = drawObj.getAll();

				// add route information here
				// var answer = document.getElementById('calculated-line');

				const lastFeature = data.features.length - 1;
				const coords = data.features[lastFeature].geometry.coordinates;
				const newCoords = coords.join(';');
				getMatch(newCoords);
			};

			const removeRoute = () => {
				if (mapObj.getSource('route')) {
					mapObj.removeLayer('route');
					mapObj.removeSource('route');
					// document.getElementById('calculated-line').innerHTML = '';
				} else {
					return;
				}
			};

			const addRoute = (coords) => {
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
							'line-color': '#3b9ddd',
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

					console.log(res);
					setDurationState(Math.floor(res.routes[0].duration / 60)); // in minutes;

					const instructionSteps = res.routes[0].legs;
					const runInstructions = [];

					for (let i = 0; i < instructionSteps.length; i++) {
						const steps = instructionSteps[i].steps;
						for (let j = 0; j < steps.length; j++) {
							runInstructions.push(steps[j].maneuver.instruction);
						}
					}

					setDisplayedDirections(runInstructions);
					console.log(runInstructions);
					const directionString = runInstructions.join(';');
					setDirectionState(directionString);

					// add later to display estimated time and distance
					const distance = res.routes[0].distance * 0.001 / 1.609;
					// const duration = res.routes[0].duration / 60;

					const coords = res.routes[0].geometry;

					addRoute(coords);

					const stringCoords = coords.coordinates.join(';');

					setCoordState(stringCoords);
					setDistanceState(distance);
				} catch (err) {
					console.error(err);
				}
			};

			mapObj.addControl(drawObj);
			mapObj.on('draw.create', updateRoute);
			mapObj.on('draw.update', updateRoute);
			mapObj.on('draw.delete', removeRoute);
		});
	};

	useEffect(
		() => {
			createMB();
		},
		// eslint-disable-next-line
		[ mapCenter, setMapCenter ]
	);

	const createRouteClick = async (e) => {
		e.preventDefault();

		if (!nameState) {
			setNameError(true);
		} else {
			if (nameError) {
				setNameError(false);
			}

			const res = await fetch(`${api.url}/routes`, {
				method: 'POST',
				body: JSON.stringify({
					name: nameState,
					distance: distanceState,
					coordinates: coordState,
					creatorId: user.userId,
					directions: directionState,
					image: null
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (res.ok) {
				history.push('/my-routes');
			}
		}
	};

	const handleLocSearch = async (e) => {
		e.preventDefault();
		const search = encodeURI(searchInput);
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
							value={nameState}
							onChange={nameInputChange}
							helperText={nameError && 'Route must have a name'}
						/>
						{displayedDirections && (
							<React.Fragment>
								<List className={classes.sidebarContainer}>
									<h2 className={classes.listMargin}>Directions:</h2>
									{displayedDirections &&
										displayedDirections.map((direction, i) => {
											return (
												<ListItem
													key={i}
													className={
														i % 2 ? classes.whiteBackground : classes.inheritBackground
													}
												>
													<ListItemText primary={direction} className={classes.listMargin} />
												</ListItem>
											);
										})}
								</List>
							</React.Fragment>
						)}
					</div>
				</Grid>
				<Grid item xs={10} sm={10} lg={10}>
					<Box component="form" className={classes.root}>
						<InputBase
							className={classes.input}
							placeholder="Search"
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
							endIcon={<Icon className="fas fa-running" />}
							onClick={createRouteClick}
						>
							Save
						</Button>
					</Box>
					<div ref={(el) => (mapContainer = el)} className="mapContainer" />
					<Grid container className={classes.bottomContainer}>
						<Grid item xs={6} sm={6}>
							<div>Distance</div>
							<div>{distanceState.toFixed(2)} mi</div>
						</Grid>
						<Grid item xs={6} sm={6}>
							<div>Est. route duration</div>
							<div>{durationState} min</div>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

export default CreateRoute;
