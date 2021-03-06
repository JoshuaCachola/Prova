export const SET_USER = 'prova/authentication/SET_USER';

export const setUser = (currentUser) => {
	return {
		type: SET_USER,
		currentUser
	};
};

export const getUser = (user) => (dispatch) => {
	dispatch(setUser(user));
};

export default function reducer(state = { currentUser: {} }, action) {
	switch (action.type) {
		case SET_USER: {
			return {
				...state,
				currentUser: action.currentUser
			};
		}
		default:
			return state;
	}
}
