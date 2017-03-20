import { tabReducer } from 'react-native-navigation-redux-helpers';

const tabs = {
	routes: [
		{ key: 'moment', title: 'Moment', iconName: 'ios-aperture-outline', selectedIconName: 'ios-aperture' },
		{ key: 'match', title: 'Match', iconName: 'ios-compass-outline', selectedIconName: 'ios-compass' },
		{ key: 'user', title: 'Mine', iconName: 'ios-contact-outline', selectedIconName: 'ios-contact' }
	],
	color: '#c5cae9',
	selectedColor: '#007aff',
	key: 'ApplicationTabs',
	index: 0
}

module.exports = tabReducer(tabs);