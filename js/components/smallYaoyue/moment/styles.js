import { StyleSheet, PixelRatio, Dimensions } from 'react-native';
import pallete from '../styles/colors';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: pallete.themeBackground,
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
		borderBottomWidth: 1,
		borderColor: pallete.border.normal,
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
	},
	detailActionPanel: {
		marginTop: 16,
		backgroundColor: pallete.white,
	},
	userBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 12,
		backgroundColor: pallete.white,
		borderColor: pallete.border.normal,
		borderBottomWidth: 1 / PixelRatio.get(),
	},
	userBarLeft: {
		width: 30,
	},
	userBarAvatr: {
		width: 30,
		height: 30,
	},
	userBarRight: {
		width: (width - 66)
	},
	userTag: {
		marginLeft: 4,
		paddingLeft: 4,
		paddingRight: 4,
		color: pallete.white,
		fontSize: 12,
		borderRadius: 4,
	},
	userLevel: {
		backgroundColor: pallete.text.yellow,
	},
	userInfluence: {
		backgroundColor: pallete.theme,
	},
	commentCard: {
		flexDirection: 'column',
		borderColor: pallete.border.normal,
		borderBottomWidth: 1 / PixelRatio.get(),
	},
	commentContent: {
		paddingLeft: 54,
		paddingRight: 64,
		backgroundColor: pallete.white,
	},
	commentReply: {
		color: pallete.theme,
	},
	commentActionBar: {
		height: 40,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		paddingRight: 12,
		alignItems: 'center',
		backgroundColor: pallete.white,
	},
	customTabBar: {
		backgroundColor: pallete.white,
		borderBottomWidth: 1,
		borderColor: pallete.border.normal,
	}
});