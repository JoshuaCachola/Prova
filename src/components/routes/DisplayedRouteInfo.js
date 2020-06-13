import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DirectionsList from './DirectionsList';

const useStyles = makeStyles({
    table: {
        minWidth: '100%'
    },
});

const DisplayedRouteInfo = () => {
    const classes = useStyles();

    function createData(category, value) {
        return { category, value };
    }

    const currentRoute = useSelector(state => state.routes.currentRoute)

    const routePersonalInfo = useSelector(state => state.routes.routePersonalInfo)


    const personalRows = [
        createData('Run Count', routePersonalInfo.number_of_runs),
        createData('Average Time', routePersonalInfo.average_time),
        createData('Best Time', routePersonalInfo.best_time),
    ];

    const generalRows = [
        createData('Run Count', currentRoute.total_number_of_runs),
        createData('Average Time', currentRoute.average_time),
        createData('Best Time', currentRoute.best_time),
    ]



    return (

        <div className='route-info'>
            <div className='distance'>
                <h2>Distance:</h2>
                {parseFloat(currentRoute.distance).toFixed(2)} mi
            </div>
            <div className='directions'>
                <h2>Directions:</h2>
                <DirectionsList />
            </div>
            <div className='personal-table'>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Personal</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {personalRows.map((row) => (
                                <TableRow key={row.category}>
                                    <TableCell component="th" scope="row">
                                        {row.category}
                                    </TableCell>
                                    <TableCell align="right">{row.value !== null ? row.value : 'N/A'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className='general-table'>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>General</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {generalRows.map((row) => (
                                <TableRow key={row.category}>
                                    <TableCell component="th" scope="row">
                                        {row.category}
                                    </TableCell>
                                    <TableCell align="right">{row.value !== null ? row.value : 'N/A'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default DisplayedRouteInfo;