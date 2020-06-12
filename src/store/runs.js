import { baseUrl } from '../config/config';

export const GET_RUNS = 'GET_RUNS';
// export const ADD_RUN = 'ADD_RUN';

export const getMyRuns = runs => {
  return {
    type: GET_RUNS,
    runs
  };
};

// export const addRun = run => {
//   return {
//     type: ADD_RUN,
//     run
//   };
// };

export const getRuns = userId => async dispatch => {
  try {
    let res = await fetch(`${baseUrl}/users/${userId}/runs`);

    if (!res.ok) throw res;

    res = await res.json();
    dispatch(getMyRuns(res));
  } catch (err) {
    console.error(err);
  }
};

// export const createRun = run => async dispatch => {

// };

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_RUNS: {
      return {
        ...state,
        runs: action.runs
      }
    }
    default: return state;
  };
};
