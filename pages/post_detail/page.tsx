import LoadingScreen from '@/components/ui/loading_screen';
import { Comment } from '@/models/comment.dto';
import { Post } from '@/models/post.dto';
import { commentService } from '@/services/comment.service';
import { googleDriveService } from '@/services/goole-drive.service';
import { postService } from '@/services/post.service';
import { AppStackNavigation } from '@/settings/navigation/route_params';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { FC, JSX, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { appColors } from '@/settings';

export type PostDetailParams = {
    id: string;
};

const PostDetailScreen: FC = (): JSX.Element => {
    const params = useLocalSearchParams<PostDetailParams>();
    const navigation = useNavigation<AppStackNavigation>();
    const postId = params.id as string;

    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoadingPost, setIsLoadingPost] = useState(true);
    const [isLoadingComments, setIsLoadingComments] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [commentText, setCommentText] = useState('');
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const fetchPost = async () => {
        try {
            console.log('Fetching post:', postId);
            const response = await postService.getPostById(postId);
            console.log(response);

            if (response.success && response.data) {
                setPost(response.data);

                if (response.data.medias && response.data.medias.length > 0) {
                    const urls = response.data.medias.map(media =>
                        googleDriveService.getDriveLink(media.url)
                    );
                    setImageUrls(urls);
                }

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

    const fetchComments = async () => {
        try {
            console.log('Fetching comments for post:', postId);
            const response = await commentService.getCommentsByPostId(postId);
            console.log(response);

            if (response.success && response.data) {
                setComments(response.data as unknown as Comment[]);
            } else {
                console.log('No comments found');
            }
        } catch (err) {
            console.error('Error fetching comments:', err);
        } finally {
            setIsLoadingComments(false);
        }
    };

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

    useEffect(() => {
        if (postId) {
            fetchPost();
            fetchComments();
        }
    }, [postId]);

    const renderComment = ({ item }: { item: Comment }) => (
        <View style={styles.commentItem}>
            <Image
                source={item.user?.avt_url ? { uri: item.user.avt_url } : require('@/assets/images/home/avatar.png')}
                style={styles.commentAvatar}
            />
            <View style={styles.commentContent}>
                <Text style={styles.commentAuthor}>{item.user_id || 'Unknown User'}</Text>
                <Text style={styles.commentText}>{item.content}</Text>
                <Text style={styles.commentDate}>
                    {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                </Text>
            </View>
        </View>
    );

    if (isLoadingPost) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContainer}>
                    <LoadingScreen isVisible={isLoadingPost} onHidden={() => { }} />

                    <Text style={styles.loadingText}>Đang tải bài viết...</Text>
                </View>
            </SafeAreaView>
        );
    }

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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1B1E28" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Bài viết</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.postContainer}>
                    <View style={styles.authorSection}>
                        <Image
                            source={post.author?.avt_url ? { uri: post.author.avt_url } : require('@/assets/images/home/avatar.png')}
                            style={styles.authorAvatar}
                        />
                        <View style={styles.authorInfo}>
                            <Text style={styles.authorName}>{post.author_id || 'Unknown User'}</Text>
                            <Text style={styles.postDate}>
                                {new Date(post.createdAt).toLocaleDateString('vi-VN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </Text>
                        </View>
                    </View>

                    {post.location && (
                        <View style={styles.locationSection}>
                            <Ionicons name="location" size={16} color={appColors.primary} />
                            <Text style={styles.locationText}>{post.location.name}</Text>
                        </View>
                    )}

                    <Text style={styles.postContent}>{post.content}</Text>
                </View>

                {imageUrls.length > 0 && (
                    <View style={styles.mediaContainer}>
                        <FlatList
                            data={imageUrls}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onViewableItemsChanged={({ viewableItems }) => {
                                if (viewableItems.length > 0) {
                                    setCurrentImageIndex(viewableItems[0].index || 0);
                                }
                            }}
                            viewabilityConfig={{
                                itemVisiblePercentThreshold: 50
                            }}
                            keyExtractor={(item, index) => `media-${index}`}
                            renderItem={({ item }) => (
                                <Image
                                    source={{ uri: item }}
                                    style={styles.postImage}
                                />
                            )}
                        />

                        {imageUrls.length > 1 && (
                            <View style={styles.paginationContainer}>
                                {imageUrls.map((_, index) => (
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

                        {imageUrls.length > 1 && (
                            <View style={styles.imageCounter}>
                                <Text style={styles.imageCounterText}>
                                    {currentImageIndex + 1}/{imageUrls.length}
                                </Text>
                            </View>
                        )}
                    </View>
                )}

                <View style={styles.postContainer}>
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

                <View style={styles.commentsContainer}>
                    <Text style={styles.commentsTitle}>
                        Bình luận ({comments.length})
                    </Text>

                    {isLoadingComments ? (
                        <ActivityIndicator size="small" color={appColors.primary} style={{ marginVertical: 20 }} />
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

export default PostDetailScreen;
