import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 400,
    },
    whiteBackground: {
        backgroundColor: 'white',
        padding: '15px 0'
    },
    inheritBackground: {
        backgroundColor: 'whitesmoke',
        padding: '15px 0'
    },
    listMargin: {
        marginLeft: '20px'
    }
}));

function renderRow(props) {
    // const { index, style } = props;

    return (
        <ListItem button>
            <ListItemText primary={`Item`} />
        </ListItem>
    );
}

renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired
};

const DirectionsList = () => {

    const classes = useStyles();

    const currentRoute = useSelector(state => state.routes.currentRoute)

    const directionsArr = currentRoute.directions.split(';')

    return (
        <div className={classes.root}>
            {/* <div className='directions-container'> */}
            {directionsArr.map((direction, i) => {
                return (
                    <ListItem
                        className={`${i % 2 ? classes.whiteBackground : classes.inheritBackground} ${'list-item'}`}
                        key={i}>
                        <ListItemText className={classes.listMargin} primary={direction} />
                    </ListItem>
                )
            })}
            {/* </div> */}
        </div>
    );
}


export default DirectionsList;
