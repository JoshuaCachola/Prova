import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tab from '@material-ui/core/Tab';
import { displayRoute } from '../../store/routes';


const MyRoutesNav = ({ id, setSelectedTab, index, name }) => {

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.authorization.currentUser)
    const routeClickHandler = () => {
        setSelectedTab(index)
        dispatch(displayRoute(id, currentUser.userId))
    }

    return (
        <>
            <Tab className='route-nav-tab' label={name} onClick={routeClickHandler} />
        </>
    )
}

export default MyRoutesNav;