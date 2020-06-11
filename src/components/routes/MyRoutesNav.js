import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { displayRoute } from '../../store/routes';






const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));


function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const MyRoutesNav = ({ id, setSelectedTab }) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.authorization.currentUser)
    const routeClickHandler = () => {
        // setSelectedTab(id - 1)
        dispatch(displayRoute(id, currentUser.userId))
    }

    return (
        <>
            {/* <NavLink to={`/my-routes/${id}`} onClick={routeClickHandler}>Route {id}</NavLink> */}
            <Tab label={`Route ${id}`} onClick={routeClickHandler} />
        </>
    )
}

export default MyRoutesNav;