import React, { useRef, useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
// import { getLatestRoute, getOtherRoutes, saveOtherRoute } from '../../store/routes';
import api from "../../utils";
import { Card, /*CardContent, Divider, CardMedia,*/ Typography, Button, Grid, Icon } from '@material-ui/core';
// import ExploreIcon from '@material-ui/icons/Explore';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useAuth0 } from '../../react-auth0-spa';

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

const OtherRoute = ({ id, distance, coordinates, average_time, best_time }) => {
    const [map, setMap] = useState(null)
    const [coords, setCoords] = useState(null)
    const [saved, setSaved] = useState(false)
    let mapContainer = useRef(null);
    const classes = useStyles();
    const { user } = useAuth0();


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

    useEffect(() => {
        const firstSplit = coordinates.split(';');
        const secondSplit = firstSplit.map((el) => {
            return el.split(',');
        });

        const finalArr = secondSplit.map((subArr) => {
            return subArr.map((stringNum) => {
                return Number(stringNum);
            });
        });

        setCoords(finalArr)
    }, [])

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

    const saveOtherRoute = async () => {
        const personalRouteStatsRes = await fetch(`${api.url}/routes/${id}/users/${user.userId}/personalroutestats`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (personalRouteStatsRes.ok) {
            setSaved(true)
        }
    }

    return (
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

                <Grid item xs={3} sm={3} className={classes.textCenter}>
                    <Typography variant="body2">Distance</Typography>
                    <p>
                        {!distance ? (
                            '- -'
                        ) : (
                                parseFloat(distance).toFixed(2)
                            )}{' '}
											miles
										</p>
                </Grid>
                <Grid item xs={3} sm={3} className={classes.textCenter}>
                    <Typography variant="body2">Average Time</Typography>
                    <p>{!average_time ? '- -' : convertTime(average_time)} min</p>
                </Grid>
                <Grid item xs={3} sm={3} className={classes.textCenter}>
                    <Typography variant="body2">Best Time</Typography>
                    <p>{!best_time ? '- -' : convertTime(best_time)} min</p>
                </Grid>
                <Grid item xs={3} sm={3} className={classes.textCenter}>
                    {!saved ? <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.button}
                        endIcon={<Icon className="fas fa-running" color="inherit" />}
                        onClick={saveOtherRoute}
                    >
                        Save
						</Button> :
                        <Typography>Saved!</Typography>}
                </Grid>
            </Grid>
        </Card>
    )

}

export default OtherRoute
