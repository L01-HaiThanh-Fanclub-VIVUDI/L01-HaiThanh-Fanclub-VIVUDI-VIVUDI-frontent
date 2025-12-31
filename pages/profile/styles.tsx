import { StyleSheet } from 'react-native';

const ORANGE_COLOR = '#FF7029';
const TEXT_COLOR = '#1B1E28';
const LABEL_COLOR = '#1B1E28';
const BG_COLOR = '#FFFFFF';
const INPUT_BG = '#F7F7F9';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
        height: 60,
    },
    titleContainer: {
        alignItems: 'center',
    },
    title: {
        color: LABEL_COLOR,
        fontSize: 18,
        fontFamily: 'SFUISemibold',
        fontWeight: 'bold',
    },
    sideContainer: {
        flex: 1,
    },
    rightContainer: {
        alignItems: 'flex-end',
    },
    leftHeader: {
        color: '#ffffff',
    },
    doneButton: {
        color: ORANGE_COLOR,
        fontSize: 16,
        fontFamily: 'SFUISemibold',
    },
    subtitleContainer: {
        width: '100%',
        alignItems: 'center',
    },
    subtitle: {
        color: '#7D848D',
        fontSize: 16,
        lineHeight: 20,
        fontFamily: 'SFUISemibold',
    },
    scrollContainer: {
        paddingHorizontal: 24,
        paddingBottom: 100
    },
    avatarSection: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    avatarWrapper: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: '#FDEEF0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    username: {
        fontSize: 24,
        fontFamily: 'SFUISemibold',
        color: TEXT_COLOR,
        marginBottom: 8,
    },
    changePictureText: {
        fontSize: 14,
        fontFamily: 'SFUISemibold',
        color: ORANGE_COLOR,
    },

    formSection: {
        width: '100%',
    },
    label: {
        fontSize: 16,
        fontFamily: 'SFUISemibold',
        color: LABEL_COLOR,
        marginBottom: 10,
        marginTop: 15,
    },
    inputContainer: {
        backgroundColor: INPUT_BG,
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputText: {
        fontSize: 16,
        fontFamily: 'SFUISemibold',
        color: TEXT_COLOR,
    },
    checkIcon: {
        color: ORANGE_COLOR,
    },
    mobileRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countryCode: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF5F5',
        borderRadius: 12,
        paddingVertical: 16,
        marginTop: 30,
        gap: 10,
    },
    logoutText: {
        fontSize: 16,
        fontFamily: 'SFUISemibold',
        color: '#FF3B30',
        fontWeight: '600',
    },
});