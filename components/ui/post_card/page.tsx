import { Feather, Ionicons } from '@expo/vector-icons';
import { FC, JSX, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { PostCardProps } from './types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_WIDTH = SCREEN_WIDTH;

interface PostCardComponentProps {
    post: PostCardProps;
    onPostPress?: (postId: string) => void;
}

const PostCard: FC<PostCardComponentProps> = ({ post, onPostPress }): JSX.Element => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    // Use images array if available, otherwise fallback to single image
    const imagesToShow = post.images && post.images.length > 0
        ? post.images
        : [post.image];

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentImageIndex(viewableItems[0].index || 0);
        }
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50
    }).current;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image
                        source={post.avatar}
                        style={styles.avatar}
                    />
                    <View>
                        <View style={styles.usernameRow}>
                            <Text style={styles.username}>{post.username}</Text>
                            {post.isVerified && (
                                <Ionicons name="checkmark-circle" size={16} color="#3B82F6" />
                            )}
                        </View>
                        <Text style={styles.location}>{post.location}</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Feather name="more-horizontal" size={24} color={styles.icon.color} />
                </TouchableOpacity>
            </View>

            <View style={styles.imageContainer}>
                <FlatList
                    ref={flatListRef}
                    data={imagesToShow}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                    keyExtractor={(item, index) => `image-${index}`}
                    renderItem={({ item }) => (
                        <Image
                            source={item}
                            style={[styles.postImage, { width: IMAGE_WIDTH }]}
                        />
                    )}
                />

                {/* Pagination Dots */}
                {imagesToShow.length > 1 && (
                    <View style={styles.paginationContainer}>
                        {imagesToShow.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.paginationDot,
                                    index === currentImageIndex && styles.paginationDotActive
                                ]}
                            />
                        ))}
                    </View>
                )}

                {/* Image Count Badge */}
                {imagesToShow.length > 1 && (
                    <View style={styles.imageCountBadge}>
                        <Text style={styles.imageCountText}>
                            {currentImageIndex + 1}/{imagesToShow.length}
                        </Text>
                    </View>
                )}
            </View>

            <View style={styles.actionBar}>
                <View style={styles.actionGroup}>
                    <TouchableOpacity style={styles.actionIcon}>
                        <Ionicons name="heart-outline" size={28} color={styles.icon.color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionIcon}>
                        <Ionicons name="chatbubble-outline" size={26} color={styles.icon.color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionIcon}>
                        <Feather name="send" size={26} color={styles.icon.color} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Feather name="bookmark" size={26} color={styles.icon.color} />
                </TouchableOpacity>
            </View>

            <View style={styles.likesContainer}>
                <Text style={styles.likesText} numberOfLines={1}>
                    Liked by <Text style={styles.boldText}>{post.likedBy}</Text> and <Text style={styles.boldText}>{post.likes} others</Text>
                </Text>
            </View>

            <TouchableOpacity
                style={styles.captionContainer}
                onPress={() => onPostPress?.(post.id)}
                activeOpacity={0.9}
            >
                <Text style={styles.captionText} numberOfLines={2}>
                    <Text style={styles.boldText}>{post.username}</Text> {post.caption}
                </Text>
            </TouchableOpacity>

            <Text style={styles.dateText}>{post.date}</Text>
        </View>
    );
};

export default PostCard;