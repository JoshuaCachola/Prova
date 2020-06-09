import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

const CreateMap = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibWFya2ptNjEwIiwiYSI6ImNrYjFjeTBoMzAzb3UyeXF1YTE3Y25wdDMifQ.K9r926HKVv0u8RQzpdXleg';
  const [mapState, setMapState] = useState({
    lng: -122,
    lat: 37,
    zoom: 2
  });
  //   const [map, setMap] = useState(null);
  //   const [draw, setMapDraw] = useState(null);
  //   const handleMapDraw = (mapdraw) => setMapDraw(mapdraw);
  //   const handleMap = (map) => setMap(map);
  let mapContainer = useRef(null);

  // creates MapBox obj
  const createMB = (center) => { // added center argument to change starting point of map
    const mapObj = new mapboxgl.Map({
      container: mapContainer, // container id
      style: 'mapbox://styles/mapbox/streets-v11', //hosted style id
      center: [-122.675246, 45.529431], // starting position
      zoom: 13, // starting zoom
      minZoom: 11 // keep it local
    })


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
            "id": "gl-draw-line",
            "type": "line",
            "filter": ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
            "layout": {
              "line-cap": "round",
              "line-join": "round"
            },
            "paint": {
              "line-color": "#3b9ddd",
              "line-dasharray": [0.2, 2],
              "line-width": 4,
              "line-opacity": 0.7
            }
          },
          // vertex point halos
          {
            "id": "gl-draw-polygon-and-line-vertex-halo-active",
            "type": "circle",
            "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
            "paint": {
              "circle-radius": 10,
              "circle-color": "#FFF"
            }
          },
          // vertex points
          {
            "id": "gl-draw-polygon-and-line-vertex-active",
            "type": "circle",
            "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
            "paint": {
              "circle-radius": 6,
              "circle-color": "#3b9ddd",
            }
          },
        ]
      });

      // handleMapDraw(drawObj);
      // handleMap(mapObj);
      // console.log(map);
      // console.log(draw);
      //   handleMapDraw(draw);
      // map.addControl(draw);

      const updateRoute = () => {
        removeRoute();

        const data = drawObj.getAll();
        // add route information here
        // var answer = document.getElementById('calculated-line');

        const lastFeature = data.features.length - 1;
        const coords = data.features[lastFeature].geometry.coordinates;
        const newCoords = coords.join(';')
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
          mapObj.removeLayer('route')
          mapObj.removeSource('route')
        } else {
          mapObj.addLayer({
            "id": "route",
            "type": "line",
            "source": {
              "type": "geojson",
              "data": {
                "type": "Feature",
                "properties": {},
                "geometry": coords
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

        };
      };
      ////////////////////////////////////
      //       const geojson = {
      //         type: 'Feature',
      //         properties: {},
      //         geometry: {
      //           type: 'LineString',
      //           coordinates: route
      //         }
      //       };
      //       // if the route already exists on the map, reset it using setData
      //       if (map.getSource('route')) {
      //         map.getSource('route').setData(geojson);
      //       } else { // otherwise, make a new request
      //         map.addLayer({
      //           id: 'route',
      //           type: 'line',
      //           source: {
      //             type: 'geojson',
      //             data: {
      //               type: 'Feature',
      //               properties: {},
      //               geometry: {
      //                 type: 'LineString',
      //                 coordinates: geojson
      //               }
      //             }
      //           },
      //           layout: {
      //             'line-join': 'round',
      //             'line-cap': 'round'
      //           },
      //           paint: {
      //             'line-color': '#3887be',
      //             'line-width': 5,
      //             'line-opacity': 0.75
      //           }
      //         });
      //       }
      //       // add turn instructions here at the end
      //     };
      //     req.send();
      //   }
      //////////////////////////////
      const getMatch = async e => {
        const url = 'https://api.mapbox.com/directions/v5/mapbox/walking/' + e + '?geometries=geojson&steps=true&&access_token=' + mapboxgl.accessToken;

        // const coords = {
        //   coordinates: [[-122.661659, 45.548309],
        //   [-122.661659, 45.548267],
        //   [-122.650406, 45.548237],
        //   [-122.650406, 45.548309],
        //   [-122.650444, 45.542088],
        //   [-122.658813, 45.542107]]
        // };
        try {
          let res = await fetch(url);

          if (!res.ok) throw res;
          res = await res.json();
          // add later to display estimated time and distance
          // const distance = res.routes[0].distance * 0.001;
          // const duration = res.routes[0].duration / 60;

          const coords = res.routes[0].geometry;
          console.log(coords)
          console.log(coords.coordinates);
          addRoute(coords);
        } catch (err) {
          console.error(err);
        }
      };

      mapObj.addControl(drawObj);
      mapObj.on('draw.create', updateRoute);
      mapObj.on('draw.update', updateRoute);
      mapObj.on('draw.delete', removeRoute);

    })

  };



  useEffect(() => {
    createMB();

    // createMB()
    // if (!draw) setMapDraw(createMBD());
    // setMapDraw(createMBD());
    // console.log(map, draw);
    // map.addControl(draw);
    // map.on('draw.create', updateRoute);
    // map.on('draw.update', updateRoute);
    // map.on('draw.delete', removeRoute);

  }, []);

  return (
    <div>
      <div className='sidebarStyle'>
        <div>Longitude: {mapState.lng} | Latitude: {mapState.lat} | Zoom: {mapState.zoom}</div>
      </div>
      <div ref={el => mapContainer = el} className='mapContainer' />
    </div>
  );



};

export default CreateMap;