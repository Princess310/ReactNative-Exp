import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	slide: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	img: {
		width: width,
		flex: 1,
	},
	text: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold',
	},
	buttonWrapper: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 50,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		width: 135,
		height: 42,
		backgroundColor: '#4fabf1',
		borderRadius: 4,
	},
	pagination: {
		bottom: 125,
	},
});