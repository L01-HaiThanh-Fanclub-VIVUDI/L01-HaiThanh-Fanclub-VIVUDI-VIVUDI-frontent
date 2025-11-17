import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 30,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDED',
    },
    cancelButtonText: {
        fontSize: 16,
        color: '#888',
    },
    previewContainer: {
        width: '100%',
        height: 300,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    noMediaPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    noMediaText: {
        color: '#A0A0A0',
        fontSize: 16,
    },
    captionInput: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 15,
        paddingVertical: 10,
        minHeight: 80,
        maxHeight: 150,
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
    },
    bottomButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
        marginTop: 'auto',
    },
    draftButton: {
        flex: 1,
        backgroundColor: '#E0E0E0',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginRight: 10,
    },
    draftButtonText: {
        color: '#555',
        fontWeight: 'bold',
        fontSize: 16,
    },
    publishButton: {
        flex: 1,
        backgroundColor: '#E9446A',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginLeft: 10,
    },
    publishButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});