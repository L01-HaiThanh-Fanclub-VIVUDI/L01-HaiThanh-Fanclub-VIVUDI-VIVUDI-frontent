import { StyleSheet, Dimensions } from 'react-native';

const TEXT_COLOR = '#1B1E28';
const LIGHT_TEXT_COLOR = '#7D848D';
const DOT_COLOR = '#9CA3AF';
const ACTIVE_DOT_COLOR = '#3B82F6';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        marginBottom: 10,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 10,
    },
    usernameRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    username: {
        fontFamily: 'SFUISemibold',
        color: TEXT_COLOR,
        fontSize: 14,
        fontWeight: '600',
        marginRight: 4,
    },
    location: {
        fontFamily: 'SFUISemibold',
        color: LIGHT_TEXT_COLOR,
        fontSize: 12,
    },
    icon: {
        color: TEXT_COLOR,
    },

    imageContainer: {
        width: width,
        height: width,
    },
    postImage: {
        width: '100%',
        height: '100%',
    },
    imageCountBadge: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    imageCountText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },

    actionBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    actionGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionIcon: {
        marginRight: 16,
    },
    paginationDots: {
        flexDirection: 'row',
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'center',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: DOT_COLOR,
        marginHorizontal: 3,
    },
    dotActive: {
        backgroundColor: ACTIVE_DOT_COLOR,
    },

    likesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    avatarStack: {

        flexDirection: 'row',
    },
    likeAvatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    likesText: {
        fontFamily: 'SFUISemibold',
        fontSize: 14,
        color: TEXT_COLOR,
        marginLeft: 8,
    },
    boldText: {
        fontWeight: '600',
        fontFamily: 'SFUISemibold',
        color: TEXT_COLOR,
    },

    captionContainer: {
        paddingHorizontal: 15,
        marginTop: 5,
    },
    captionText: {
        fontFamily: 'SFUISemibold',
        fontSize: 14,
        color: TEXT_COLOR,
        lineHeight: 20,
    },

    dateText: {
        fontFamily: 'SFUISemibold',
        fontSize: 12,
        color: LIGHT_TEXT_COLOR,
        paddingHorizontal: 15,
        marginTop: 5,
        marginBottom: 10,
    },
});