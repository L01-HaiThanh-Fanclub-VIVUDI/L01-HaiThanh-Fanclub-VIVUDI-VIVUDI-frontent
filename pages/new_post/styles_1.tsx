import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const imageSize = width / 4;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#DBDBDB',
    },
    selectedOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    selectedCheckmarkContainer: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    selectedCheckmarkText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    headerButton: {
        fontSize: 16,
        color: '#000',
    },
    headerCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 5,
    },
    nextButton: {
        backgroundColor: '#E9446A',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    actionBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#F0F0F0',
    },
    actionBarLeft: {
        flexDirection: 'row',
    },
    selectMultiple: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 15,
    },
    checkbox: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#FFF',
        marginRight: 8,
    },
    selectText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 12,
    },

    gridContainer: {
        flex: 1,
    },
    gridItem: {
        width: imageSize,
        height: imageSize,
        borderWidth: 0.5,
        borderColor: '#FFF',
    },
    gridImage: {
        width: '100%',
        height: '100%',
    },
    previewContainer: {
        width: '100%',
        height: 330,
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    noMediaPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    noMediaText: {
        color: '#A0A0A0',
        fontSize: 14,
    },
    selectedMediaList: {
        flexGrow: 0,
        height: '100%',
    },
    selectedMediaListContent: {
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    selectedThumbnailWrapper: {
        width: 320,
        height: 320,
        borderRadius: 8,
        overflow: 'hidden',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedThumbnailImage: {
        width: '100%',
        height: '100%',
    },
    selectedNumberContainer: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedNumberText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    videoOverlay: {
        position: 'absolute',
        bottom: 4,
        left: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 3,
        padding: 2,
    },

    bottomTabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#DBDBDB',
        paddingVertical: 10,
    },
    tabText: {
        fontSize: 16,
        color: '#9E9E9E',
    },
    tabActive: {
        color: '#000',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '70%',
        paddingBottom: 30,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    albumItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    albumItemSelected: {
        backgroundColor: '#F5F5F5',
    },
    albumTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
        marginBottom: 4,
    },
    albumCount: {
        fontSize: 14,
        color: '#7D848D',
    },
});