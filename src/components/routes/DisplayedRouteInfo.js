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

    function convertSecondsToTime(time) {

        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time - (hours * 3600)) / 60);
        const seconds = time - (hours * 3600) - (minutes * 60);

        const timeString = hours.toString().padStart(2, '0') + ':' +
            minutes.toString().padStart(2, '0') + ':' +
            seconds.toString().padStart(2, '0');
        return timeString
    }

    const personalRows = [
        createData('Run Count', routePersonalInfo.number_of_runs),
        createData('Average Time', convertSecondsToTime(routePersonalInfo.average_time)),
        createData('Best Time', convertSecondsToTime(routePersonalInfo.best_time)),
    ];

    const generalRows = [
        createData('Run Count', currentRoute.total_number_of_runs),
        createData('Average Time', convertSecondsToTime(currentRoute.average_time)),
        createData('Best Time', convertSecondsToTime(currentRoute.best_time)),
    ]


    return (

        <div className='route-info'>
            <div className='directions'>
                <h2 className='directions-heading'>Directions</h2>
                <DirectionsList />
            </div>
            <div className='distance'>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableBody>
                            <TableRow key={'Distance'} className='table-row'>
                                <TableCell component="th" scope="row">
                                    <span className='distance-span'>Distance</span>
                                </TableCell>
                                <TableCell align="right">{`${parseFloat(currentRoute.distance).toFixed(2)} mi`}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className='personal-table'>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow className='table-row'>
                                <TableCell>Personal Stats</TableCell>
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
                </TableContainer>
            </div>
            <div className='general-table'>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow className='table-row'>
                                <TableCell>General</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {generalRows.map((row) => (
                                <TableRow key={row.category} className='table-row'>
                                    <TableCell component="th" scope="row">
                                        {row.category}
                                    </TableCell>
                                    <TableCell align="right">{row.value !== '00:00:00' ? row.value : 'N/A'}</TableCell>
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