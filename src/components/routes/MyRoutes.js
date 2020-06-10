import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { getMyRoutes, displayRoute } from '../../store/routes';
import { useAuth0 } from '../../react-auth0-spa';
import RouteElement from './RouteElement'

const MyRoutes = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibWFya2ptNjEwIiwiYSI6ImNrYjFjeTBoMzAzb3UyeXF1YTE3Y25wdDMifQ.K9r926HKVv0u8RQzpdXleg';

  let mapContainer = useRef(null);

  const { user } = useAuth0()

  const dispatch = useDispatch()

  const routes = useSelector(state => state.routes.routes)



  useEffect(() => {
    // getMyRoutes(user.userId)
    if (user) {
      dispatch(getMyRoutes(user.userId))
    }

  }, [user])

  useEffect(() => {
    console.log(routes)
  }, [routes])

  // const routeClickHandler = async () => {
  //   const mapObj = new mapboxgl.Map({
  //     container: mapContainer, // container id
  //     style: 'mapbox://styles/mapbox/streets-v11', //hosted style id
  //     center: [-122.675246, 45.529431], // starting position
  //     zoom: 13, // starting zoom
  //     minZoom: 11 // keep it local
  //   })

  //   const coords = await displayRoute()

  //   const coordsObj = { coordinates: coords, type: 'LineString' }
  //   mapObj.on('load', () => {
  //     mapObj.addLayer({
  //       "id": "route",
  //       "type": "line",
  //       "source": {
  //         "type": "geojson",
  //         "data": {
  //           "type": "Feature",
  //           "properties": {},
  //           "geometry": coordsObj
  //         }
  //       },
  //       "layout": {
  //         "line-join": "round",
  //         "line-cap": "round"
  //       },
  //       "paint": {
  //         "line-color": "#3b9ddd",
  //         "line-width": 8,
  //         "line-opacity": 0.8
  //       }
  //     });
  //   })

  // }



  return (
    <>
      {routes && routes.map(({ id }) => {
        return <RouteElement key={id} id={id} />
      })}
      {/* <button onClick={routeClickHandler}>Load Map</button> */}
      <div>
        <div className='sidebarStyle'>
        </div>
        <div ref={el => mapContainer = el} className='mapContainer' />
      </div>
    </>
  );
}

export default MyRoutes;
