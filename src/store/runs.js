import api from '../utils';

export const GET_RUNS = 'GET_RUNS';
export const SHOW_RUN_POPUP = 'SHOW_RUN_POPUP';

export const getMyRuns = runs => {
  return {
    type: GET_RUNS,
    runs
  };
};

export const showRunPopup = showRunPopup => {
  return {
    type: SHOW_RUN_POPUP,
    showRunPopup
  };
};

export const getRuns = userId => async dispatch => {
  const months = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12'
  };

  const days = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday"
  };

  try {
    let res = await fetch(`${api.url}/users/${userId}/runs`);

    if (!res.ok) throw res;

    res = await res.json();

    const newRuns = [];
    res.forEach(run => {
      const newRun = { ...run };
      const date = run.date.split(' ');
      date[0] = date[0].slice(0, 3);
      newRun.day = days[date[0]];
      newRun.date = `${date[3]}-${months[date[2]]}-${date[1]}`;
      newRun.timeOfDay = date[4];
      newRuns.push(newRun);
    });

    dispatch(getMyRuns(newRuns));
  } catch (err) {
    console.error(err);
  }
};

export const handleShowRunPopup = runPopup => dispatch => {
  dispatch(showRunPopup(runPopup))
}

export default function reducer(
  state = { runs: [], showRunPopup: {} }, action) {
  switch (action.type) {
    case GET_RUNS: {
      return {
        ...state,
        runs: action.runs
      };
    }
    case SHOW_RUN_POPUP: {
      return {
        ...state,
        showRunPopup: action.showRunPopup
      };
    }
    default: return state;
  };
};
