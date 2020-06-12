import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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


    const directionsArr = currentRoute.directions.split(';')



    return (

        <div className='route-info'>
            <div className='directions'>
                <DirectionsList />
            </div>
            <div className='personal-table'>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Personal</TableCell>
                                <TableCell align="right"></TableCell>
                                {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {personalRows.map((row) => (
                                <TableRow key={row.category}>
                                    <TableCell component="th" scope="row">
                                        {row.category}
                                    </TableCell>
                                    <TableCell align="right">{row.value !== null ? row.value : 'N/A'}</TableCell>
                                    {/* <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell> */}
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
                                {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {generalRows.map((row) => (
                                <TableRow key={row.category}>
                                    <TableCell component="th" scope="row">
                                        {row.category}
                                    </TableCell>
                                    <TableCell align="right">{row.value !== null ? row.value : 'N/A'}</TableCell>
                                    {/* <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell> */}
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