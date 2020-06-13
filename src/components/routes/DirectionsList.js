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
		maxWidth: 300,
		backgroundColor: theme.palette.background.paper
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
            <div className='directions-container'>
                {/* <FixedSizeList height={400} width={300} itemSize={46} itemCount={directionsArr.length}> */}
                {directionsArr.map((direction, i) => {
                    return (
                        <ListItem key={i}>
                            <ListItemText primary={direction} />
                        </ListItem>
                    )
                })}
            </div>
        </div>
    );
}


export default DirectionsList;
