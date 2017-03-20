import fetch from '../utils/fetch';

// user
export const YAOYUE_USER_LOGIN = 'YAOYUE_USER_LOGIN';

const receiveUserInfo = (data, access_token) => {
	return {
	    type: YAOYUE_USER_LOGIN,
	    payload: {
	    	data: data,
	    	access_token: access_token,
	    },
	  };
}

export function doLogin(username, password) {
  return dispatch => {
  	return fetch.doPut('user/login', {
  		username: username,
  		password: password,
  	}).then(response => dispatch(receiveUserInfo(response.data, response.access_token)))
  }
}

// moment
export const YOAYUE_FETCH_MOMENT_ROLES = 'YOAYUE_MOMENT_FETCH_ROLES';
export const YAOYUE_FETCH_MOMENT_LIST = 'YAOYUE_FETCH_MOMENT_LIST';
export const YAOYUE_PUBLISH_MOMENT = 'YAOYUE_PUBLISH_MOMENT';

const receiveMomentRoles = (list) => {
	return {
		type: YOAYUE_FETCH_MOMENT_ROLES,
		payload: {
			list: list,
		}
	}
}

const receiveMomentList = (role, list, page) => {
	return {
		type: YAOYUE_FETCH_MOMENT_LIST,
		payload: {
			role: role,
			list: list,
			page: page,
		}
	}
}

const receiveMoment = (moment) => {
	return {
		type: YAOYUE_PUBLISH_MOMENT,
		payload: {
			moment: moment
		}
	}
}

export function fetchMomentRoles() {
	return dispatch => {
		return fetch.doGet('moments/role')
		.then(response => dispatch(receiveMomentRoles(response.list)));
	}
}

export function fetchMomentList(role, page) {
	if (typeof page === "undefined") { page = 1 }

	return dispatch => {
		return fetch.doGet('moments/exhibition-moments', {
			role: role,
			page: page,
		}).then(response => dispatch(receiveMomentList(role, response.list, response.page)));
	}
}

export function publishMoment(props) {
	return dispatch => {
		return fetch.doPost("moments/release", props)
			.then(response => dispatch(receiveMoment(response)))
	}
}
