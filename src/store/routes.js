import { baseUrl } from '../config/config';

export const getMyRoutesActionCreator = routes => ({ type: 'GET_MY_ROUTES', routes });
export const currentRouteActionCreator = route => ({ type: 'CURRENT_ROUTE', route })
export const currentRoutePersonalInfoActionCreator = info => ({ type: 'ROUTE_PERSONAL_INFO', info })


export const getMyRoutes = userId => async (dispatch, getState) => {
    const res = await fetch(`${baseUrl}/users/${userId}/routes`)

    const parsedRes = await res.json();

    dispatch(getMyRoutesActionCreator(parsedRes));
};

export const createRoute = (distance, coordinates, userId) => async (dispatch, getState) => {

    const res = await fetch(`${baseUrl}/routes`, {
        method: 'POST',
        body: JSON.stringify({ distance, coordinates, creatorId: userId }),
        headers: {
            "Content-Type": 'application/json',
        }
    })
    const parsedRes = await res.json()
    console.log(parsedRes)
}

export const displayRoute = (routeId, userId) => async (dispatch, getState) => {

    const res = await fetch(`${baseUrl}/routes/${routeId}`, {
        method: 'PUT',
        body: JSON.stringify({ userId }),
        headers: {
            "Content-Type": 'application/json',
        }
    })
    const parsedRes = await res.json()
    const routeInfo = parsedRes[0]
    const routePersonalInfo = parsedRes[1]
    dispatch(currentRouteActionCreator(routeInfo))
    dispatch(currentRoutePersonalInfoActionCreator(routePersonalInfo))
}

export default function reducer(state = {}, action) {
    switch (action.type) {
        case 'GET_MY_ROUTES': {
            return {
                ...state,
                routes: action.routes
            }
        }
        case 'CURRENT_ROUTE': {
            return {
                ...state,
                currentRoute: action.route
            }
        }
        case 'ROUTE_PERSONAL_INFO': {
            return {
                ...state,
                routePersonalInfo: action.info
            }
        }
        default:
            return state
    }

}
