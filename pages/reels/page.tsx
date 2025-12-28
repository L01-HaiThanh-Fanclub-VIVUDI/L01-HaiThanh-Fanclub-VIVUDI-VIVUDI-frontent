import PostCard from '@/components/ui/post_card/page';
import { PostCardProps } from '@/components/ui/post_card/types';
import { Post } from '@/models/post.dto';
import { postService } from '@/services/post.service';
import { FC, JSX, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FeedScreen: FC = (): JSX.Element => {
    const [posts, setPosts] = useState<PostCardProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /******************************************************************************
     * convertPostToCardProps: Convert API Post to PostCardProps format
     ******************************************************************************/
    const convertPostToCardProps = (post: Post): PostCardProps => {
        return {
            id: post.id,
            username: post.author?.display_name || 'Unknown User',
            location: post.location?.name || 'Unknown Location',
            avatar: post.author?.avt_url
                ? { uri: post.author.avt_url }
                : require('@/assets/images/home/avatar.png'),
            image: post.medias && post.medias.length > 0
                ? { uri: post.medias[0].url }
                : require('@/assets/images/home/shibuya.png'),
            likes: '0', // TODO: Add likes count from API
            likedBy: '', // TODO: Add liked by from API
            caption: post.content,
            date: new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric'
            }),
            imageCount: post.medias ? `1/${post.medias.length}` : '0/0',
            isVerified: false, // TODO: Add verified status from API
        };
    };

    /******************************************************************************
     * fetchPosts: Fetch all posts from API
     ******************************************************************************/
    const fetchPosts = useCallback(async () => {
        try {
            console.log('Fetching posts...');
            const response = await postService.getAllPosts();

            console.log('Posts response:', response);

            if (response.success && response.data) {
                const convertedPosts = response.data.map(convertPostToCardProps);
                setPosts(convertedPosts);
                setError(null);
            } else {
                setError('Không thể tải bài viết');
            }
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError('Đã xảy ra lỗi khi tải bài viết');
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    }, []);

    /******************************************************************************
     * onRefresh: Pull to refresh handler
     ******************************************************************************/
    const onRefresh = useCallback(() => {
        setIsRefreshing(true);
        fetchPosts();
    }, [fetchPosts]);

    /******************************************************************************
     * Load posts on mount
     ******************************************************************************/
    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    /******************************************************************************
     * Render loading state
     ******************************************************************************/
    if (isLoading) {
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
     * Render error state
     ******************************************************************************/
    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <Text style={styles.retryText} onPress={fetchPosts}>
                        Thử lại
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    /******************************************************************************
     * Render posts feed
     ******************************************************************************/
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={posts}
                renderItem={({ item }) => (
                    <PostCard post={item} />
                )}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                        tintColor="#FF678B"
                        colors={['#FF678B']}
                    />
                }
                ListEmptyComponent={
                    <View style={styles.centerContainer}>
                        <Text style={styles.emptyText}>Chưa có bài viết nào</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
    retryText: {
        fontSize: 16,
        color: '#FF678B',
        fontWeight: '600',
    },
    emptyText: {
        fontSize: 16,
        color: '#7D848D',
        textAlign: 'center',
    },
});

export default FeedScreen;