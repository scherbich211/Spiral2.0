import { SAVE_PROFILE } from '../action-creators/actionType';

interface initialState {
	name: null;
	birth: null;
	file: null;
}

export const initialState: initialState = {
	name: null,
	birth: null,
	file: null,
};

export const profileReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case SAVE_PROFILE:
			return {
				...state,
				name: action.name,
				birth: action.birth,
				file: action.file,
			};
		default:
			return state;
	}
};
