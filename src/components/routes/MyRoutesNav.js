import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { displayRoute } from '../../store/routes';

const MyRoutesNav = ({ id }) => {
    const dispatch = useDispatch()
    const routeClickHandler = () => {

        dispatch(displayRoute(id))
    }

    return (
        <NavLink to={`/my-routes/${id}`} onClick={routeClickHandler}>Route {id}</NavLink>
    )
}

export default MyRoutesNav;