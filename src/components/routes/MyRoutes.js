import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import { getMyRoutes, displayRoute } from '../../store/routes';
import MyRoutesNav from './MyRoutesNav';
import Tabs from '@material-ui/core/Tabs';
import { makeStyles } from '@material-ui/core/styles';
import DisplayedRouteInfo from './DisplayedRouteInfo';

const MyRoutes = () => {
	mapboxgl.accessToken =
		'pk.eyJ1IjoibWFya2ptNjEwIiwiYSI6ImNrYjFjeTBoMzAzb3UyeXF1YTE3Y25wdDMifQ.K9r926HKVv0u8RQzpdXleg';

	let mapContainer = useRef(null);

	const currentUser = useSelector((state) => state.authorization.currentUser);

	const dispatch = useDispatch();

	const [mapCenter, setMapCenter] = useState([-122.675246, 45.529431]);

	const routes = useSelector((state) => state.routes.routes);

	const currentRoute = useSelector((state) => state.routes.currentRoute);

	const routePersonalInfo = useSelector((state) => state.routes.routePersonalInfo);

	const [map, setMap] = useState(null);
	const [selectedTab, setSelectedTab] = useState(0);
	const [hasLoaded, setHasLoaded] = useState(false)



	useEffect(
		() => {
			if (currentUser) {
				dispatch(getMyRoutes(currentUser.userId));
			}
		},
		[currentUser]
	);

	useEffect(() => {
		const mapObj = new mapboxgl.Map({
			container: mapContainer, // container id
			style: 'mapbox://styles/mapbox/streets-v11', //hosted style id
			center: mapCenter, // starting position
			zoom: 13, // starting zoom
			minZoom: 11 // keep it local
		});
		setMap(mapObj);
	}, []);

	useEffect(
		() => {
			if (map && currentRoute) {
				if (!hasLoaded) {
					map.on('load', () => {
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
						setHasLoaded(true)
					})

				} else {
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
				}





			}
		},
		[map, currentRoute]
	);

	useEffect(
		() => {
			if (routes && currentUser) {
				dispatch(displayRoute(routes[0].id, currentUser.userId));
			}
		},
		[currentUser, routes]
	);

	const useStyles = makeStyles((theme) => ({
		root: {
			flexGrow: 1,
			backgroundColor: theme.palette.background.paper,
			display: 'flex',
			height: '100vh'
		},
		tabs: {
			borderRight: `1px solid ${theme.palette.divider}`
		}
	}));

	const classes = useStyles();

	return (
		<div className="my-routes-container">
			<div className={classes.root}>
				<Tabs
					orientation="vertical"
					variant="scrollable"
					value={selectedTab}
					// onChange={handleChange}
					aria-label="Vertical tabs example"
					className={classes.tabs}
				>
					{routes &&
						routes.map(({ id }, i) => {
							return <MyRoutesNav index={i} key={id} id={id} setSelectedTab={setSelectedTab} />;
						})}
				</Tabs>
				<div className="map-area">
					<div className="map-grid-container">
						<div ref={(el) => (mapContainer = el)} className="my-routes-map-container" />
					</div>
					{/* {currentRoute && routePersonalInfo
            ? */}
					{currentRoute && routePersonalInfo && <DisplayedRouteInfo />}
					{/* :
            <h1>No Route Selected</h1>} */}
				</div>
			</div>
		</div>
	);
};

export default MyRoutes;
