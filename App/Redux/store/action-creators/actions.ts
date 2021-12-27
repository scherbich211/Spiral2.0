import { sleep } from '../../utils/sleep';
import { LOGIN, LOGOUT, SAVE_PROFILE } from './actionType';

export function login(payload: any) {
	return {
		type: LOGIN,
		email: payload.userName,
		token: payload.userToken,
	};
}
export function logout() {
	return { type: LOGOUT };
}
export function loginSuccess(payload: any) {
	return async function (dispatch: any) {
		await sleep(1000);
		dispatch(login(payload));
	};
}

export function saveProfile(info: any) {
	return {
		type: SAVE_PROFILE,
		name: info.name,
		birth: info.birth,
		file: info.file,
	};
}
