import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import { getMyRoutes } from '../../store/routes';
import { useAuth0 } from '../../react-auth0-spa';
import MyRoutesNav from './MyRoutesNav';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import VerticalTabs from './VerticalTabs';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';








const MyRoutes = () => {

  mapboxgl.accessToken = 'pk.eyJ1IjoibWFya2ptNjEwIiwiYSI6ImNrYjFjeTBoMzAzb3UyeXF1YTE3Y25wdDMifQ.K9r926HKVv0u8RQzpdXleg';

  let mapContainer = useRef(null);

  const { user } = useAuth0()

  const dispatch = useDispatch()

  const routes = useSelector(state => state.routes.routes)

  const currentRoute = useSelector(state => state.routes.currentRoute)

  const [map, setMap] = useState(null)
  const [selectedTab, setSelectedTab] = useState(0)

  useEffect(() => {
    // getMyRoutes(user.userId)
    if (user) {
      dispatch(getMyRoutes(user.userId))
    }

  }, [user])

  useEffect(() => {

    const mapObj = new mapboxgl.Map({
      container: mapContainer, // container id
      style: 'mapbox://styles/mapbox/streets-v11', //hosted style id
      center: [-122.675246, 45.529431], // starting position
      zoom: 13, // starting zoom
      minZoom: 11 // keep it local
    })
    setMap(mapObj)


  }, [])

  useEffect(() => {
    if (map && currentRoute) {
      if (map.getSource('route')) {
        map.removeLayer('route');
        map.removeSource('route');
      }

      const firstSplit = currentRoute.coordinates.split(';');
      const secondSplit = firstSplit.map((el) => {
        return el.split(',')
      })

      const finalArr = secondSplit.map(subArr => {
        return subArr.map(stringNum => {
          return Number(stringNum)
        })
      })

      const coords = finalArr;

      const coordsObj = { coordinates: coords, type: 'LineString' }
      // map.removeLayer()
      map.addLayer({
        "id": "route",
        "type": "line",
        "source": {
          "type": "geojson",
          "data": {
            "type": "Feature",
            "properties": {},
            "geometry": coordsObj
          }
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "#3b9ddd",
          "line-width": 8,
          "line-opacity": 0.8
        }
      });
    }
  }, [map, currentRoute])



  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: '100vh'
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  }));

  const classes = useStyles();


  return (
    <>
      {/* {routes && routes.map(({ id }) => {
        return <MyRoutesNav key={id} id={id} />
      })} */}
      <div className='my-routes-container'>
        <div className={classes.root}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={selectedTab}
            // onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            {routes && routes.map(({ id }) => {
              return <MyRoutesNav key={id} id={id} setSelectedTab={setSelectedTab} />
            })}

          </Tabs>
          <div className='map-area'>
            <div>
              <div ref={el => mapContainer = el} className='mapContainer' />
            </div>
            <div className='directions'></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyRoutes;
