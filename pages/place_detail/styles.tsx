import { StyleSheet } from 'react-native';

const MAIN_COLOR = appColors.primary;
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
        paddingVertical: 10,
        marginTop: 30,
    },
    headerRight: {
        flexDirection: 'row',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    infoSection: {
        paddingHorizontal: 15,
        paddingTop: 5,
        paddingBottom: 15,
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    ratingText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 4,
    },
    reviewCountText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 2,
    },
    dotSeparator: {
        color: '#666',
        marginHorizontal: 4,
    },
    distanceText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 2,
        fontWeight: '500',
    },
    openStatusText: {
        fontSize: 14,
    },
    openText: {
        color: MAIN_COLOR,
        fontWeight: 'bold',
    },
    closesText: {
        color: '#666',
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 10,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginRight: 10,
    },
    actionButtonText: {
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 14,
    },
    photoGallery: {
        flexDirection: 'row',
        height: 250,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    mainImage: {
        flex: 2,
        marginRight: 5,
        borderRadius: 8,
    },
    sideImages: {
        flex: 1,
        justifyContent: 'space-between',
        gap: 5,
        marginLeft: 5,
    },
    sideImage: {
        flex: 1,
        borderRadius: 8,
        marginVertical: 2,
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        marginHorizontal: 15,
    },
    tabButton: {
        paddingBottom: 10,
        marginHorizontal: 5,
    },
    tabText: {
        fontSize: 14,
        color: '#7f7f7fff',
        fontWeight: '500',
    },
    tabActiveText: {
        color: '#000',
        fontWeight: 'bold',
    },
    tabActiveIndicator: {
        height: 3,
        backgroundColor: MAIN_COLOR,
        position: 'absolute',
        bottom: -1,
        left: 0,
        right: 0,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    infoIcon: {
        marginRight: 15,
        width: 24,
        textAlign: 'center',
    },
    infoTextContainer: {
        flex: 1,

        paddingBottom: 2,
    },
    infoText: {
        fontSize: 16,
        fontWeight: '500',
    },
    addressRow: {
        marginTop: 5,
    },
    hoursRow: {
        borderBottomWidth: 0,
    },
    reviewsContainer: {
        paddingHorizontal: 15,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    reviewSummarySection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    summaryLeft: {
        alignItems: 'flex-start',
    },
    summaryRating: {
        fontSize: 48,
        fontWeight: '300',
        color: '#000',
    },
    summaryReviewCount: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    starRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    summaryRight: {
        flex: 1,
        marginLeft: 20,
        paddingRight: 10,
        justifyContent: 'center',
    },
    reviewBarContainer: {
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        marginVertical: 4,
    },
    reviewBarFill: {
        height: '100%',
        backgroundColor: '#F5C300', 
        borderRadius: 4,
    },
    reviewCardsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        marginHorizontal: -15, 
    },
    reviewCardPlaceholder: {
        width: 150,
        height: 250,
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
        marginHorizontal: 15,
        marginRight: 0,
    },
    rateReviewSection: {
        borderTopWidth: 1,
        borderTopColor: '#EDEDED',
        paddingTop: 20,
        marginBottom: 20,
    },
    rateReviewTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    rateReviewContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rateStars: {
        flexDirection: 'row',
        marginLeft: 10,
    },

    // Review Item
    reviewItemContainer: {
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#EDEDED',
    },
    reviewerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    reviewerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    reviewerName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    reviewerBio: {
        fontSize: 12,
        color: '#888',
    },
    reviewMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    reviewDate: {
        fontSize: 12,
        color: '#888',
        marginLeft: 10,
    },
    reviewTags: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    reviewBody: {
        fontSize: 15,
        lineHeight: 22,
        color: '#333',
    }
});