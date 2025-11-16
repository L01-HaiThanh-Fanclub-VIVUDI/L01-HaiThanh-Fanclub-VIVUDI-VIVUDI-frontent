import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    bsBackground: {
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    bsHandleBar: {
        width: 40,
        height: 5,
        borderRadius: 3,
        backgroundColor: '#E0E0E0',
        marginTop: 10,
    },
    bsContentContainer: {
        paddingHorizontal: 20,
        flex: 1,
    },
    bsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 10,
    },
    bsTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1B1E28',
    },
    bsLocation: {
        fontSize: 14,
        color: '#7D848D',
        marginTop: 4,
    },
    bsAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    bsAboutTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1B1E28',
        marginTop: 10,
        marginBottom: 8,
    },
    bsAboutText: {
        fontSize: 14,
        color: '#7D848D',
        lineHeight: 20,
    },
});