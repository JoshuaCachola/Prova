import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { getMyRoutes, displayRoute } from '../../store/routes';

const MyRoutes = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibWFya2ptNjEwIiwiYSI6ImNrYjFjeTBoMzAzb3UyeXF1YTE3Y25wdDMifQ.K9r926HKVv0u8RQzpdXleg';

  let mapContainer = useRef(null);

  useEffect(() => {
    async function handleLoad() {
      const mapObj = new mapboxgl.Map({
        container: mapContainer, // container id
        style: 'mapbox://styles/mapbox/streets-v11', //hosted style id
        center: [-122.675246, 45.529431], // starting position
        zoom: 13, // starting zoom
        minZoom: 11 // keep it local
      })

      const coords = await displayRoute()
      console.log(coords)
      const coordsObj = { coordinates: coords, type: 'LineString' }
      mapObj.on('load', () => {
        mapObj.addLayer({
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
      })

    }


    handleLoad()


  }, [])


  return (
    <>
      <h1>My Routes</h1>
      <div>
        <div className='sidebarStyle'>
        </div>
        <div ref={el => mapContainer = el} className='mapContainer' />
      </div>
    </>
  );
}

export default MyRoutes;
