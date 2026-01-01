import { appColors } from '@/settings';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        marginTop: 30,
    },
    headerButtonText: {
        fontSize: 16,
        color: '#666',
        paddingVertical: 5,
    },
    nextButton: {
        backgroundColor: appColors.primary,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },


    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#EFEFEF',
        borderRadius: 10,
        height: 40,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    clearButton: {
        padding: 4,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    loadingText: {
        fontSize: 14,
        color: '#666',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        gap: 16,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
    },


    listContainer: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 20,
    },
    listItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F7F7F7',
    },
    primaryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    distanceText: {
        fontSize: 16,
        color: '#666',
        fontWeight: 'bold',
        marginRight: 10,
        minWidth: 55,
        textAlign: 'right',
    },
    primaryText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    secondaryText: {
        fontSize: 14,
        color: '#888',
        marginLeft: 65,
        marginTop: 2,
    },
    divider: {
        height: 10,
    }
});