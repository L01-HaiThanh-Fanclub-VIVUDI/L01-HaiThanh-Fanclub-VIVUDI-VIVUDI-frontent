import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from 'expo-image';
import { Key } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

const ReviewBar = ({ percentage }: { percentage: number }) => (
    <View style={styles.reviewBarContainer}>
        <View style={[styles.reviewBarFill, { width: `${percentage}%` }]} />
    </View>
);

const ReviewItem = ({ review }: { review: any }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return 'Hôm nay';
        } else if (diffDays === 1) {
            return 'Hôm qua';
        } else if (diffDays < 7) {
            return `${diffDays} ngày trước`;
        } else {
            return date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'short', year: 'numeric' });
        }
    };

    return (
        <View style={styles.reviewItemContainer}>
            <View style={styles.reviewerHeader}>
                <Image
                    source={{ uri: `https://i.pravatar.cc/150?u=${review.user_id}` }}
                    style={styles.reviewerAvatar}
                    contentFit="cover"
                />
                <View>
                    <Text style={styles.reviewerName}>
                        {review.user?.display_name || `User ${review.user_id.slice(0, 8)}`}
                    </Text>
                    <Text style={styles.reviewDate}>{formatDate(review.createdAt)}</Text>
                </View>
            </View>

            <Text style={styles.reviewBody}>{review.content}</Text>

            {review.child_comments && review.child_comments.length > 0 && (
                <Text style={styles.reviewerBio}>
                    {review.child_comments.length} phản hồi
                </Text>
            )}
        </View>
    );
};

const ReviewsTabContent = ({ data }: { data: any }) => {
    return (
        <View style={styles.reviewsContainer}>
            <View style={styles.reviewSummarySection}>
                <View style={styles.summaryLeft}>
                    <Text style={styles.summaryRating}>{data.totalRating.toFixed(1)}</Text>
                    <View style={styles.starRow}>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <MaterialIcons key={i} name="star" size={20} color="#F5C300" />
                        ))}
                    </View>
                    <Text style={styles.summaryReviewCount}>({data.totalReviews})</Text>
                </View>

                <View style={styles.summaryRight}>
                    {data.ratingBreakdown.map((percentage: number, index: number) => (
                        <View
                            key={index}
                            style={styles.summaryRightNumberContainer}
                        >
                            <Text style={styles.summaryRightNumber}>
                                {5 - index}
                            </Text>

                            <MaterialIcons name="star" size={10} color="#7D848D" style={{ marginRight: 6, marginLeft: 2 }} />

                            <View style={{ flex: 1 }}>
                                <ReviewBar percentage={percentage} />
                            </View>
                        </View>
                    ))}
                </View>
            </View>

            {/* <View style={styles.rateReviewSection}>
                <Text style={styles.rateReviewTitle}>Rate & Review</Text>
                <View style={styles.rateReviewContent}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150?img=5' }}
                        style={styles.reviewerAvatar}
                        contentFit="cover"
                    />
                    <View style={styles.rateStars}>
                        {[1, 2, 3, 4, 5].map(i => (
                            <TouchableOpacity key={i} style={{ paddingHorizontal: 5 }}>
                                <MaterialIcons name="star" size={36} color="#F5C300" />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View> */}

            {data.reviews && data.reviews.length > 0 ? (
                data.reviews.map((review: any, index: number) => (
                    <ReviewItem key={index} review={review} />
                ))
            ) : (
                <View style={{ padding: 20, alignItems: 'center' }}>
                    <Text style={{ color: '#7D848D', fontSize: 14 }}>
                        Chưa có đánh giá nào
                    </Text>
                </View>
            )}

        </View>
    );
};

export default ReviewsTabContent;