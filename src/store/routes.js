import api from '../utils';

export const getMyRoutesActionCreator = (routes) => ({ type: 'GET_MY_ROUTES', routes });
export const currentRouteActionCreator = (route) => ({ type: 'CURRENT_ROUTE', route });
export const currentRoutePersonalInfoActionCreator = (info) => ({ type: 'ROUTE_PERSONAL_INFO', info });
export const currentRouteRunsActionCreator = (runs) => ({ type: 'RUNS_FOR_ROUTE', runs });
export const latestRouteActionCreator = (latestRoute) => ({ type: 'LATEST_ROUTE', latestRoute });
export const otherRoutesActionCreator = (otherRoutes) => ({ type: 'OTHER_ROUTES', otherRoutes })


export const getMyRoutes = (userId) => async (dispatch, getState) => {
	const res = await fetch(`${api.url}/users/${userId}/routes`);

	const parsedRes = await res.json();
	dispatch(getMyRoutesActionCreator(parsedRes));
};

export const getLatestRoute = (userId) => async (dispatch, getState) => {
	const res = await fetch(`${api.url}/users/${userId}/latest_route`);

	const parsedRes = await res.json();

	dispatch(latestRouteActionCreator(parsedRes));
};

export const createRoute = (distance, coordinates, userId, directions) => async (dispatch, getState) => {
	const routeRes = await fetch(`${api.url}/routes`, {
		method: 'POST',
		body: JSON.stringify({ distance, coordinates, creatorId: userId, directions }),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const route = await routeRes.json();
	await fetch(`${api.url}/routes/${route.id}/users/${userId}/personalroutestats`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	})
};

export const displayRoute = (routeId, userId) => async (dispatch, getState) => {
	const res = await fetch(`${api.url}/routes/${routeId}`, {
		method: 'PUT',
		body: JSON.stringify({ userId }),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const parsedRes = await res.json();
	const routeInfo = parsedRes[0];
	const routePersonalInfo = parsedRes[1];
	const runsForRoute = parsedRes[2];
	dispatch(currentRouteActionCreator(routeInfo));
	dispatch(currentRoutePersonalInfoActionCreator(routePersonalInfo));
	dispatch(currentRouteRunsActionCreator(runsForRoute));
};

export const getOtherRoutes = (userId, highestOtherRouteId) => async (dispatch) => {
	const res = await fetch(`${api.url}/personalroutestats/${userId}`, {
		method: 'PUT',
		body: JSON.stringify({ highestOtherRouteId }),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	const otherRoutes = await res.json()

	dispatch(otherRoutesActionCreator(otherRoutes))
}

export const saveOtherRoute = (userId, routeId) => async (dispatch) => {
	await fetch(`${api.url}/routes/${routeId}/users/${userId}/personalroutestats`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	})

}

export default function reducer(state = { latestRoute: {} }, action) {
	switch (action.type) {
		case 'GET_MY_ROUTES': {
			return {
				...state,
				routes: action.routes
			};
		}
		case 'CURRENT_ROUTE': {
			return {
				...state,
				currentRoute: action.route
			};
		}
		case 'ROUTE_PERSONAL_INFO': {
			return {
				...state,
				routePersonalInfo: action.info
			};
		}
		case 'RUNS_FOR_ROUTE': {
			return {
				...state,
				runsForRoute: action.runs
			};
		}
		case 'LATEST_ROUTE': {
			return {
				...state,
				latestRoute: action.latestRoute
			};
		}
		case 'OTHER_ROUTES': {
			return {
				...state,
				otherRoutes: action.otherRoutes
			}
		}
		default:
			return state;
	}
}
