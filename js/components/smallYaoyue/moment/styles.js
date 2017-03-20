import { StyleSheet, PixelRatio} from 'react-native';
import pallete from '../styles/colors';

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	tabBar: {
		height: 20,
		backgroundColor: pallete.tabBackground,
	},
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: 'white',
	  },
	card: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 12,
		marginBottom: 6,
		backgroundColor: pallete.white,
	},
	cardLeft: {
		width: 48,
	},
	cardAvatar: {
		width: 48,
		height: 48,
	},
	cardRight: {
		width: 295,
		flexDirection: 'column',
	},
	cardHead: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	cardHeadText: {
		marginRight: 4,
		color: pallete.text.deepBlue,
		fontSize: 14,
	},
	cardUsername: {
		fontSize: 16,
	},
	cardTime: {
		marginTop: 7,
		fontSize: 12,
		color: pallete.text.help,
	},
	cardContent: {
		marginTop: 9,
	},
	cardContentText: {
		color: '#1A2126',
		fontSize: 14,
	},
	cardImages: {
		marginTop: 10,
		paddingRight: 45,
		flexWrap: 'wrap',
		flexDirection: 'row',
	},
	cardImage: {
		marginRight: 2,
		marginTop: 2,
	},
	cardSubInfo: {
		marginTop: 8,
		paddingRight: 65,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	cardSubInfoText: {
		fontSize: 10,
		color: pallete.text.subHelp,
	},
	cardSubInfoHongbao: {
		color: '#ED2302',
	},
	cardAction: {
		paddingLeft: 100,
		marginTop: 12,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	cardActionItem: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	cardActionIcon: {
		fontSize: 16,
		color: pallete.text.help,
	},
	cardActionActive: {
		color: pallete.theme,
	},
	cardActionText: {
		fontSize: 12,
		color: pallete.text.help,
		marginLeft: 4,
	},
	publishContent: {
		marginTop: 4,
		padding: 12,
		backgroundColor: pallete.white,
	},
	publishFiles: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	fileItem: {
		marginTop: 10,
		marginRight: 10,
		width: 80,
		height: 80,
	},
	addFile: {
		backgroundColor: '#EDEFF2',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	addFileText: {
		color: pallete.text.help,
	},
	delFile: {
		position: 'absolute',
		top: -8,
		right: -8,
		backgroundColor: 'transparent',
	},
	publishActionPanel: {
		marginTop: 4,
		backgroundColor: pallete.white,
	}
});