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
                        <ListItem className='list-item' key={i}>
                            <ListItemText primary={direction} />
                        </ListItem>
                    )
                })}
                {/* </FixedSizeList> */}
            </div>
            {/* <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow className='table-row'>
                            <TableCell>Personal</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {personalRows.map((row) => (
                            <TableRow key={row.category} className='table-row'>
                                <TableCell component="th" scope="row">
                                    {row.category}
                                </TableCell>
                                <TableCell align="right">{row.value !== '00:00:00' ? row.value : 'N/A'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}
        </div>
    );
}


export default DirectionsList;
