import { StyleSheet, PixelRatio, Dimensions} from 'react-native';
import pallete from '../styles/colors';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingVertical: 24
    },
    iconBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 34,
    },
    headerContent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    headeImage: {
        width: 100,
        height: 100,
    },
    headerText: {
        marginTop: 7,
        color: pallete.white,
    },
    headerBar: {
        paddingTop: 8,
        paddingBottom: 8,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: pallete.white,
    },
    headerBarItem: {
        width: width / 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
    },
    headerBarItemText: {
        color: pallete.text.help,
    },
    headerBarItemTextBlue: {
        color: pallete.theme,
    },
    headerBarItemTextYellow: {
        color: pallete.text.yellow,
    },
    borderLeft: {
        borderLeftWidth: 1 / PixelRatio.get(),
        borderColor: pallete.border.normal,
    },
    actionBar: {
        marginTop: 16,
        paddingTop: 8,
        paddingBottom: 8,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: pallete.white,
    },
    actionBarItem: {
        width: width / 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 32,
    },
    listMenu: {
        marginTop: 16,
        backgroundColor: pallete.white,
    }
});