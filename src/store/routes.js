// const GET_ROUTES = 'GET_ROUTES';

// export const getRoutes = routes => ({ type: 'GET_ROUTES', routes });

import { baseUrl } from '../config/config';

export const getMyRoutes = async (userId) => {
    const res = await fetch(`${baseUrl}/users/${userId}/routes`)

    const parsedRes = await res.json()

    // Need to see how structure of response compares to state before adding dispatch
}

export const createRoute = async (distance, averageTime, bestTime, coordinates, userId) => {
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



// export default function reducer(state = {}, action) {
//     switch (action.type) {
//         case 'GET_ROUTES': {
//             return {
//                 ...state,
//                 routes: action.routes
//             }
//         }
//     }
// }
