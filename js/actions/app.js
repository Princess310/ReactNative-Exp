import fetch from '../utils/fetch';

export const FETCH_APP_LSIT = 'FETCH_APP_LSIT';

const receiveAppList = (list) => {
	return {
	    type: FETCH_APP_LSIT,
	    payload: list,
	  };
}

export function fetchAppList() {
  return dispatch => {
  	return fetch.doGet('getAppList')
  		.then(response => dispatch(receiveAppList(response.result)))
  }
}
