import { baseUrl } from '../config/config';

// const GET_ROUTES = 'GET_ROUTES';

export const getRoutes = (routes) => ({ type: 'GET_ROUTES', routes });

export const getMyRoutes = (userId) => async (dispatch) => {
	const res = await fetch(`${baseUrl}/users/${userId}/routes`);

	const parsedRes = await res.json();

	dispatch(getRoutes(parsedRes));
};

export const createRoute = async (distance, averageTime, bestTime, coordinates, userId) => {
	const res = await fetch(`${baseUrl}/routes`, {
		method: 'POST',
		body: JSON.stringify({ distance, averageTime, bestTime, coordinates, creatorId: userId }),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const parsedRes = await res.json();
	console.log(parsedRes);
};

export const displayRoute = async (routeId) => {
	const res = await fetch(`${baseUrl}/routes/1`);
	const parsedRes = await res.json();
	const firstSplit = parsedRes.coordinates.split(';');
	const secondSplit = firstSplit.map((el) => {
		return el.split(',');
	});

	const finalArr = secondSplit.map((subArr) => {
		return subArr.map((stringNum) => {
			return Number(stringNum);
		});
	});

	// const coords = { coordinates: finalArr, type: 'LineString' }
	// console.log(coords)
	return finalArr;
};

export default function reducer(state = {}, action) {
	switch (action.type) {
		case 'GET_ROUTES': {
			return {
				...state,
				routes: action.routes
			};
		}
		default:
			return state;
	}
}
