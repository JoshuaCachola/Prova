import { baseUrl } from '../config/config';

export const getMyRoutesActionCreator = routes => ({ type: 'GET_MY_ROUTES', routes });
export const currentRouteActionCreator = route => ({ type: 'CURRENT_ROUTE', route })



export const getMyRoutes = userId => async (dispatch, getState) => {
    const res = await fetch(`${baseUrl}/users/${userId}/routes`)

    const parsedRes = await res.json();

	dispatch(getMyRoutesActionCreator(parsedRes));
};

export const createRoute = (distance, averageTime, bestTime, coordinates, userId) => async (dispatch, getState) => {

    const res = await fetch(`${baseUrl}/routes`, {
        method: 'POST',
        body: JSON.stringify({ distance, averageTime, bestTime, coordinates, creatorId: userId }),
        headers: {
            "Content-Type": 'application/json',
        }
    })
    const parsedRes = await res.json()
    console.log(parsedRes)
}

export const displayRoute = routeId => async (dispatch, getState) => {

    const res = await fetch(`${baseUrl}/routes/${routeId}`)
    const parsedRes = await res.json()

    dispatch(currentRouteActionCreator(parsedRes))
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
        default:
            return state
    }

}
