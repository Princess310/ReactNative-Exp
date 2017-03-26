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
export const YAOYUE_FETCH_MOMENT_DETAIL = 'YAOYUE_FETCH_MOMENT_DETAIL';
export const YAOYUE_FETCH_NEW_MOMENT_DETAIL = 'YAOYUE_FETCH_NEW_MOMENT_DETAIL';
export const YAOYUE_SEARCH_MOMENT = 'YAOYUE_SEARCH_MOMENT';
export const YAOYUE_CLEAR_SEARCH_MOMENT = 'YAOYUE_CLEAR_SEARCH_MOMENT';

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
		type: YAOYUE_FETCH_MOMENT_DETAIL,
		payload: {
			data: moment
		}
	}
}

const receiveNewMoment = (moment) => {
	return {
		type: YAOYUE_FETCH_NEW_MOMENT_DETAIL,
		payload: {
			data: moment
		}
	}
}

const receiveSearchMomentList = (list, page) => {
	return {
		type: YAOYUE_SEARCH_MOMENT,
		payload: {
			list: list,
			page: page,
		}
	}
}

const emptySearchMoment = () => {
	return {
		type: YAOYUE_CLEAR_SEARCH_MOMENT,
		payload: {
			list: [],
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
		return fetch.doPost("moments/release", props);
	}
}

export function fetchMomentDetail(id) {
	return dispatch => {
		return fetch.doGet('moments/details', {
			moments_id: id
		}).then(response => dispatch(receiveMoment(response.data)));
	}
}

export function fetchNewMomentDetail(id) {
	return dispatch => {
		return fetch.doGet('moments/new-details', {
			moments_id: id
		}).then(response => dispatch(receiveNewMoment(response.list[0])));
	}
}

export function doLikeMomet(id, uid) {
	return dispatch => {
		return fetch.doPost('moments/like', {
			moments_id: id,
			to_uid: uid
		}).then((response) => dispatch(fetchNewMomentDetail(id)));
	}
}

export function doLikeComment(id, uid) {
	return dispatch => {
		return fetch.doPost('comment-like', {
			moments_id: id,
			to_uid: uid
		}).then((response) => dispatch(fetchNewMomentDetail(id)));
	}
}

export function doAddComment(id, uid, content, pid) {
	return dispatch => {
		return fetch.doPost('comment-like', {
			moments_id: id,
			to_uid: uid,
			content: content,
			pid: pid,
		}).then((response) => dispatch(fetchNewMomentDetail(id)));
	}
}

export function doSearchMoment(keyword, page) {
	return dispatch => {
		return fetch.doGet('moments/search', {
			keyword: keyword,
			page: page,
		}).then((response) => dispatch(receiveSearchMomentList(response.list, response.page)));
	}
}

export function clearSearchMoment() {
	return dispatch => dispatch(emptySearchMoment());
}
