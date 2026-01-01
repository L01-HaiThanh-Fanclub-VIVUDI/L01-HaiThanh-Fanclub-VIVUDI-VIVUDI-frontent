import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from 'expo-image';
import { Key } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

const ReviewBar = ({ percentage }: { percentage: number }) => (
    <View style={styles.reviewBarContainer}>
        <View style={[styles.reviewBarFill, { width: `${percentage}%` }]} />
    </View>
);

const ReviewItem = ({ review }: { review: any }) => (
    <View style={styles.reviewItemContainer}>
        <View style={styles.reviewerHeader}>
            <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=1' }}
                style={styles.reviewerAvatar}
                contentFit="cover"
            />
            <View>
                <Text style={styles.reviewerName}>{review.name}</Text>
                <Text style={styles.reviewerBio}>{review.bio}</Text>
            </View>
        </View>

        <View style={styles.reviewMeta}>
            <View style={styles.starRow}>
                {[1, 2, 3, 4, 5].map((i) => (
                    <MaterialIcons
                        key={i}
                        name="star"
                        size={14}
                        color={i <= review.rating ? '#F5C300' : '#E0E0E0'}
                        style={{ marginRight: 2 }}
                    />
                ))}
            </View>
            <Text style={styles.reviewDate}>{review.date}</Text>
        </View>

        <Text style={styles.reviewTags}>{review.tags}</Text>
        <Text style={styles.reviewBody}>{review.body}</Text>
    </View>
);

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
                    {data.ratingBreakdown.map((percentage: number, index: Key | null | undefined) => (
                        <ReviewBar key={index} percentage={percentage} />
                    ))}
                    <Ionicons name="information-circle-outline" size={18} color="#888" style={{ marginTop: 5 }} />
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