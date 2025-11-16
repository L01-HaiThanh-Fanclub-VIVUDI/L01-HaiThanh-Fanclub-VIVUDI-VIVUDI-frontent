import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FC, JSX } from 'react';
import { styles } from './styles';
import { Ionicons, Feather } from '@expo/vector-icons';
import { PostCardProps } from './types';

const PostCard: FC<{ post: PostCardProps }> = ({ post }): JSX.Element => {
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
                <Image
                    source={post.image}
                    style={styles.postImage}
                />
                {post.imageCount !== '1/1' && (
                    <View style={styles.imageCountBadge}>
                        <Text style={styles.imageCountText}>{post.imageCount}</Text>
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

            <View style={styles.captionContainer}>
                <Text style={styles.captionText} numberOfLines={2}>
                    <Text style={styles.boldText}>{post.username}</Text> {post.caption}
                </Text>
            </View>

            <Text style={styles.dateText}>{post.date}</Text>
        </View>
    );
};

export default PostCard;