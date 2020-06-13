import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: 500,
        marginTop: 20
    },
    linkStyle: {
        textDecoration: 'none',
        color: 'inherit'
    },
    runIconStyle1: {
        marginBottom: 0,
        marginRight: 135
    },
    runIconStyle2: {
        marginBottom: 0,
        marginRight: 105
    },
    runIconStyle3: {
        marginBottom: 0,
        marginRight: 75
    },
    runIconStyle4: {
        marginBottom: 0,
        marginRight: 45
    },
    runIconStyle5: {
        marginBottom: 0,
        marginRight: 15
    },
    runIconStyle6: {
        marginBottom: 0,
        marginLeft: 15
    },
    runIconStyle7: {
        marginBottom: 0,
        marginLeft: 45
    },
    runIconStyle8: {
        marginBottom: 0,
        marginLeft: 75
    },
    runIconStyle9: {
        marginBottom: 0,
        marginLeft: 105
    },
    runIconStyle10: {
        marginBottom: 0,
        marginLeft: 135
    }

});

const NoRoutesFound = () => {
    const classes = useStyles();
    const [position, setPosition] = useState(1)

    useEffect(() => {
        function move() {
            if (position < 10) {
                setPosition(position + 1)
            } else {
                setPosition(1)
            }

        }
        setTimeout(move, 400)
    }, [position])

    return (
        <div className='no-routes-found-container'>
            <Card className={classes.root} variant="outlined">
                <div className='no-routes-found-button-container'>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            You have no saved routes yet.
                </Typography>
                    </CardContent>

                </div>
                <div className='no-routes-found-button-container'>
                    <CardActions>
                        <div className='icon-and-button'>
                            <div className='no-routes-found-run-icon-container'>
                                {position === 1 && <DirectionsWalkIcon className={classes.runIconStyle1} />}
                                {position === 2 && <DirectionsRunIcon className={classes.runIconStyle2} />}
                                {position === 3 && <DirectionsWalkIcon className={classes.runIconStyle3} />}
                                {position === 4 && <DirectionsRunIcon className={classes.runIconStyle4} />}
                                {position === 5 && <DirectionsWalkIcon className={classes.runIconStyle5} />}
                                {position === 6 && <DirectionsRunIcon className={classes.runIconStyle6} />}
                                {position === 7 && <DirectionsWalkIcon className={classes.runIconStyle7} />}
                                {position === 8 && <DirectionsRunIcon className={classes.runIconStyle8} />}
                                {position === 9 && <DirectionsWalkIcon className={classes.runIconStyle9} />}
                                {position === 10 && <DirectionsRunIcon className={classes.runIconStyle10} />}
                            </div>
                            <div>
                                <Button variant="contained" color="secondary" className={classes.button}>
                                    <Link to="/create-route" className={classes.linkStyle}>
                                        Create My First Route
					                </Link>
                                </Button>
                            </div>
                        </div>
                    </CardActions>
                </div>
            </Card>
        </div >
    );
}

export default NoRoutesFound;