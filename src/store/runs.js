// import { baseUrl } from '../config/config';

// export const GET_RUNS = 'GET_RUNS';

// export const getMyRuns = runs => {
//   return {
//     type: GET_RUNS,
//     runs
//   };
// };

<<<<<<< HEAD
// export const getRuns = () => async (dispatch, getState) => {
//   try {
//     // const {
//     //   authorization: {

//     //   }
//     // } = getState();
=======
// export const getRuns = (userId) => async (dispatch, useState) => {
//   // const userId = useState().id;
//   try {
>>>>>>> 63bc046de11d691f1de08c4fc356256bb88e6e01
//     let res = await fetch(`${baseUrl}/users/${userId}/runs`);

//     if (!res.ok) throw res;

//     res = await res.json();
//     dispatch(getMyRuns(res));
//   } catch (err) {
//     console.error(err);
//   }
// }

// export default function reducer(state = {}, action) {
//   switch (action.type) {
//     case GET_RUNS: {
//       return {
//         ...state,
//         runs: action.runs
//       }
//     }
//     default: return state;
//   };
// };
