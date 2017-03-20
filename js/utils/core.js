import { AsyncStorage } from 'react-native';

export default core = {
	async setASCache(key, value) {
		if(typeof value === 'object') {
			value = JSON.stringify(value);
		}

		const val = await AsyncStorage.setItem(key, value);
		return val;
	},

	async getASCache(key) {
		const val = await AsyncStorage.getItem(key);

		return val;
	},

	async getAccessToken() {
		const key = 'access_token';
		const token = await AsyncStorage.getItem(key);

		return typeof (token) === 'string' ? token : '';
	},
}