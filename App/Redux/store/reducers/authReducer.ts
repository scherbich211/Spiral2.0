import { LOGIN, LOGOUT } from '../action-creators/actionType';

interface initialState {
	isLoggedIn: boolean;
	userName: null;
	userToken: null;
}
export const initialState: initialState = {
	isLoggedIn: false,
	userName: null,
	userToken: null,
};

export const authReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				isLoggedIn: true,
				userName: action.email,
				userToken: action.token,
			};
		case LOGOUT:
			return {
				...state,
				isLoggedIn: false,
				userName: null,
				userToken: null,
			};
		default:
			return state;
	}
};
