import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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

const MyRoutesNav = ({ id, setSelectedTab, index }) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.authorization.currentUser)
    const routeClickHandler = () => {
        setSelectedTab(index)
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