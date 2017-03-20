import { tabReducer } from 'react-native-navigation-redux-helpers';

const tabs = {
	routes: [
		{ key: 'feed', title: 'Apps', iconName: 'ios-apps-outline', selectedIconName: 'ios-apps' },
		{ key: 'notifications', title: 'Notifications', iconName: 'ios-notifications-outline', selectedIconName: 'ios-notifications' },
		{ key: 'settings', title: 'Settings', iconName: 'ios-settings-outline', selectedIconName: 'ios-settings' }
	],
	color: '#c5cae9',
	selectedColor: '#007aff',
	key: 'ApplicationTabs',
	index: 0
}

module.exports = tabReducer(tabs);