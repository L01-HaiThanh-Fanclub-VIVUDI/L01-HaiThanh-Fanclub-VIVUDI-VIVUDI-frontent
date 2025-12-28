import { Comment } from '@/models/comment.dto';
import { Post } from '@/models/post.dto';
import { commentService } from '@/services/comment.service';
import { postService } from '@/services/post.service';
import { AppStackNavigation } from '@/settings/navigation/route_params';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { FC, JSX, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type PostDetailParams = {
    postId: string;
};

const PostDetailScreen: FC = (): JSX.Element => {
    const params = useLocalSearchParams<PostDetailParams>();
    const navigation = useNavigation<AppStackNavigation>();
    const postId = params.postId;

    /******************************************************************************
     * State Management
     ******************************************************************************/
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoadingPost, setIsLoadingPost] = useState(true);
    const [isLoadingComments, setIsLoadingComments] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [commentText, setCommentText] = useState('');
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);

    /******************************************************************************
     * Fetch Post Details
     ******************************************************************************/
    const fetchPost = async () => {
        try {
            console.log('Fetching post:', postId);
            const response = await postService.getPostById(postId);

            if (response.success && response.data) {
                setPost(response.data);
                setError(null);
            } else {
                setError('Không thể tải bài viết');
            }
        } catch (err) {
            console.error('Error fetching post:', err);
            setError('Đã xảy ra lỗi khi tải bài viết');
        } finally {
            setIsLoadingPost(false);
        }
    };

    /******************************************************************************
     * Fetch Comments
     ******************************************************************************/
    const fetchComments = async () => {
        try {
            console.log('Fetching comments for post:', postId);
            const response = await commentService.getCommentsByPostId(postId);

            if (response.success && response.data) {
                setComments(response.data);
            } else {
                console.log('No comments found');
            }
        } catch (err) {
            console.error('Error fetching comments:', err);
        } finally {
            setIsLoadingComments(false);
        }
    };

    /******************************************************************************
     * Submit Comment
     ******************************************************************************/
    const handleSubmitComment = async () => {
        if (!commentText.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập nội dung bình luận');
            return;
        }

        setIsSubmittingComment(true);
        try {
            const response = await commentService.createComment({
                content: commentText.trim(),
                post_id: postId,
            });

            if (response.success && response.data) {
                // Refresh comments
                setCommentText('');
                fetchComments();
            } else {
                Alert.alert('Lỗi', 'Không thể gửi bình luận');
            }
        } catch (err) {
            console.error('Error submitting comment:', err);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi gửi bình luận');
        } finally {
            setIsSubmittingComment(false);
        }
    };

    /******************************************************************************
     * Load data on mount
     ******************************************************************************/
    useEffect(() => {
        if (postId) {
            fetchPost();
            fetchComments();
        }
    }, [postId]);

    /******************************************************************************
     * Render Comment Item
     ******************************************************************************/
    const renderComment = ({ item }: { item: Comment }) => (
        <View style={styles.commentItem}>
            <Image
                source={item.user?.avt_url ? { uri: item.user.avt_url } : require('@/assets/images/home/avatar.png')}
                style={styles.commentAvatar}
            />
            <View style={styles.commentContent}>
                <Text style={styles.commentAuthor}>{item.user?.display_name || 'Unknown User'}</Text>
                <Text style={styles.commentText}>{item.content}</Text>
                <Text style={styles.commentDate}>
                    {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                </Text>
            </View>
        </View>
    );

    /******************************************************************************
     * Render Loading State
     ******************************************************************************/
    if (isLoadingPost) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#FF678B" />
                    <Text style={styles.loadingText}>Đang tải bài viết...</Text>
                </View>
            </SafeAreaView>
        );
    }

    /******************************************************************************
     * Render Error State
     ******************************************************************************/
    if (error || !post) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>{error || 'Không tìm thấy bài viết'}</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.backButton}>Quay lại</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    /******************************************************************************
     * Render Post Detail
     ******************************************************************************/
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1B1E28" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Bài viết</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.scrollView}>
                {/* Post Content */}
                <View style={styles.postContainer}>
                    {/* Author Info */}
                    <View style={styles.authorSection}>
                        <Image
                            source={post.author?.avt_url ? { uri: post.author.avt_url } : require('@/assets/images/home/avatar.png')}
                            style={styles.authorAvatar}
                        />
                        <View style={styles.authorInfo}>
                            <Text style={styles.authorName}>{post.author?.display_name || 'Unknown User'}</Text>
                            <Text style={styles.postDate}>
                                {new Date(post.createdAt).toLocaleDateString('vi-VN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </Text>
                        </View>
                    </View>

                    {/* Location */}
                    {post.location && (
                        <View style={styles.locationSection}>
                            <Ionicons name="location" size={16} color="#FF678B" />
                            <Text style={styles.locationText}>{post.location.name}</Text>
                        </View>
                    )}

                    {/* Post Content */}
                    <Text style={styles.postContent}>{post.content}</Text>

                    {/* Post Images */}
                    {post.medias && post.medias.length > 0 && (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mediaScroll}>
                            {post.medias.map((media, index) => (
                                <Image
                                    key={media.id || index}
                                    source={{ uri: media.url }}
                                    style={styles.postImage}
                                />
                            ))}
                        </ScrollView>
                    )}

                    {/* Rating */}
                    {post.rating && (
                        <View style={styles.ratingSection}>
                            <Text style={styles.ratingLabel}>Đánh giá:</Text>
                            <View style={styles.stars}>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <Ionicons
                                        key={star}
                                        name={star <= post.rating! ? "star" : "star-outline"}
                                        size={20}
                                        color="#FFD700"
                                    />
                                ))}
                            </View>
                        </View>
                    )}
                </View>

                {/* Comments Section */}
                <View style={styles.commentsContainer}>
                    <Text style={styles.commentsTitle}>
                        Bình luận ({comments.length})
                    </Text>

                    {isLoadingComments ? (
                        <ActivityIndicator size="small" color="#FF678B" style={{ marginVertical: 20 }} />
                    ) : comments.length > 0 ? (
                        <FlatList
                            data={comments}
                            renderItem={renderComment}
                            keyExtractor={item => item.id}
                            scrollEnabled={false}
                        />
                    ) : (
                        <Text style={styles.noCommentsText}>Chưa có bình luận nào</Text>
                    )}
                </View>
            </ScrollView>

            {/* Comment Input */}
            <View style={styles.commentInputContainer}>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Viết bình luận..."
                    value={commentText}
                    onChangeText={setCommentText}
                    multiline
                    editable={!isSubmittingComment}
                />
                <TouchableOpacity
                    style={[styles.sendButton, isSubmittingComment && styles.sendButtonDisabled]}
                    onPress={handleSubmitComment}
                    disabled={isSubmittingComment}
                >
                    {isSubmittingComment ? (
                        <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                        <Ionicons name="send" size={24} color="#FFF" />
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1B1E28',
    },
    scrollView: {
        flex: 1,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#7D848D',
    },
    errorText: {
        fontSize: 16,
        color: '#FF3B30',
        textAlign: 'center',
        marginBottom: 12,
    },
    backButton: {
        fontSize: 16,
        color: '#FF678B',
        fontWeight: '600',
    },
    postContainer: {
        padding: 16,
        borderBottomWidth: 8,
        borderBottomColor: '#F5F5F5',
    },
    authorSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    authorAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    authorInfo: {
        flex: 1,
    },
    authorName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1B1E28',
    },
    postDate: {
        fontSize: 14,
        color: '#7D848D',
        marginTop: 2,
    },
    locationSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 4,
    },
    locationText: {
        fontSize: 14,
        color: '#7D848D',
    },
    postContent: {
        fontSize: 16,
        color: '#1B1E28',
        lineHeight: 24,
        marginBottom: 16,
    },
    mediaScroll: {
        marginBottom: 16,
    },
    postImage: {
        width: 300,
        height: 300,
        borderRadius: 12,
        marginRight: 12,
    },
    ratingSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    ratingLabel: {
        fontSize: 14,
        color: '#7D848D',
    },
    stars: {
        flexDirection: 'row',
        gap: 4,
    },
    commentsContainer: {
        padding: 16,
    },
    commentsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1B1E28',
        marginBottom: 16,
    },
    noCommentsText: {
        fontSize: 14,
        color: '#7D848D',
        textAlign: 'center',
        marginVertical: 20,
    },
    commentItem: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    commentAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 12,
    },
    commentContent: {
        flex: 1,
    },
    commentAuthor: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1B1E28',
        marginBottom: 4,
    },
    commentText: {
        fontSize: 14,
        color: '#1B1E28',
        lineHeight: 20,
        marginBottom: 4,
    },
    commentDate: {
        fontSize: 12,
        color: '#7D848D',
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        backgroundColor: '#FFFFFF',
        gap: 8,
    },
    commentInput: {
        flex: 1,
        minHeight: 40,
        maxHeight: 100,
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 14,
        color: '#1B1E28',
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FF678B',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: '#FFB0C1',
    },
});

export default PostDetailScreen;
