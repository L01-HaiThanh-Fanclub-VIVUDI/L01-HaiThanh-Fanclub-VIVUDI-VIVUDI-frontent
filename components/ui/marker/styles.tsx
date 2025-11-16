import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    customMarker: {
        flexDirection: 'row',
        width: 160,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        borderRadius: 16,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    markerImage: {
        width: 40,
        height: 40,
        borderRadius: 12,
    },
    markerTextContainer: {
        marginLeft: 8,
        marginRight: 4,
    },
    markerTitle: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: 'SFUISemibold',
    },
    markerSubtitle: {
        color: '#E0E0E0',
        fontSize: 12,
        fontFamily: 'SFUISemibold',
    },
});