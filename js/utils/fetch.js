import Toast from 'react-native-root-toast';
import core from './core';

export const apiRoot = 'https://jkhz.alijian.net/index.php?r=';

const fetchDao = {
	doGet: function(url, params){
		return this.request("GET", url, params);
	},

	doPost: function(url, params){
		return this.request("POST", url, params);
	},

	doPut: function(url, params){
		return this.request("PUT", url, params);
	},

	doDelete: function(url, params){
		return this.request("DELETE", url, params);
	},

	doUploadFile: function(url, params){
		return this.request("POST", url, params, true);
	},

	request: async function(method, u, params, file){
		const self = this;
		let url = apiRoot + u;
		let config = {
			method: method,
			headers: {},
		};

		if((method === 'GET' || method === 'DELETE') && typeof params !== "undefined"){
			let payload = [];
			Object.keys(params).forEach(key => payload.push(key + "=" + params[key]));
			url = url + '&' + payload.join('&');
		}

		if((method === 'POST' || method === 'PUT') && params !== "undefined"){
			config.headers = {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
			}

			let payload = [];
			Object.keys(params).forEach(key => payload.push(key + "=" + params[key]));
			config.body = payload.join("&");
		}

		const loadingToast = Toast.show('Loading...', {position: Toast.positions.CENTER})

		const token = await core.getAccessToken();

		if(token !== null){
			config.headers['X-Access-Token'] = token;
		}
		return new Promise(function (resolve, reject) {
			fetch(url, config)
			  .then((response) => response.json())
		      .then((responseJson) => {
		      	Toast.hide(loadingToast);
		      	
		      	if(responseJson.code !== 200){
		      		Toast.show(responseJson.message, {position: Toast.positions.CENTER})
		      		reject(responseJson);
		      	}else {
		      		resolve(responseJson);
		      	}		   
		      })
		      .catch((error) => {
		        reject(error);
		      });;
		});
	},

	checkStatus: function(response){
		if (response.status >= 200 && response.status < 300) {
			return response;
		} else {
			let error = new Error(response.statusText);
			error.response = response;
			throw error;
		}
	},

	parseJSON: function(response){
		return response.json();
	}
};

export default fetchDao;