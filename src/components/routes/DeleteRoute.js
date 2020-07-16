import React from 'react';
import { Button } from '@material-ui/core';
import api from '../../utils';
import { useSelector } from 'react-redux';

const DeleteRoute = () => {

    const currentRoute = useSelector((state) => state.routes.currentRoute);
    const currentUser = useSelector((state) => state.authorization.currentUser);

    const deleteRouteClick = async () => {
        const res = await fetch(`${api.url}/routes/${currentRoute.id}/users/${currentUser.userId}/personalroutestats`, {
            method: 'DELETE'
        });
        if (res.ok) {
            window.location.href = '/my-routes'
        }
    }

    return (
        <Button color='secondary' onClick={deleteRouteClick}>Delete Route</Button>
    )
}

export default DeleteRoute;