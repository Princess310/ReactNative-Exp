import { StyleSheet, PixelRatio} from 'react-native';
import pallete from '../styles/colors';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: pallete.white,
	},
	formWrapper: {
		marginTop: 24,
		marginLeft: 14,
		marginRight: 14,
		borderWidth: 1 / PixelRatio.get(),
		borderColor: pallete.border.form,
		borderRadius: 4,
	},
	button: {
		borderRadius: 4,
		marginTop: 24,
		marginLeft: 24,
		marginRight: 24,
	}
});