import LoadingScreen from '@/components/ui/loading_screen';
import PostCard from '@/components/ui/post_card/page';
import { PostCardProps } from '@/components/ui/post_card/types';
import { Post } from '@/models/post.dto';
import { googleDriveService } from '@/services/goole-drive.service';
import { postService } from '@/services/post.service';
import { appColors } from '@/settings';
import { router } from 'expo-router';
import { FC, JSX, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

const FeedScreen: FC = (): JSX.Element => {
    const [posts, setPosts] = useState<PostCardProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState<string | null>(null);

    const convertPostToCardProps = async (post: Post): Promise<PostCardProps> => {
        let imageUrls: any[] = [];

        if (post.medias && post.medias.length > 0) {
            for (const media of post.medias) {
                try {
                    const imageUrl = googleDriveService.getDriveLink(media.url);
                    imageUrls.push({ uri: imageUrl });
                } catch (error) {
                    console.error('Error getting direct link:', error);
                }
            }
        }

        if (imageUrls.length === 0) {
            imageUrls = [require('@/assets/images/home/shibuya.png')];
        }

        console.log(post);

        return {
            id: post.id,
            username: post.author_id || 'Unknown User',
            location: post.location?.name || 'Unknown Location',
            avatar: post.author?.avt_url
                ? { uri: post.author.avt_url }
                : require('@/assets/images/home/avatar.png'),
            image: imageUrls[0], 
            images: imageUrls, 
            likes: '0', // TODO: Add likes count from API
            likedBy: '', // TODO: Add liked by from API
            caption: post.content,
            date: new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric'
            }),
            imageCount: `1/${imageUrls.length}`,
            isVerified: false, // TODO: Add verified status from API
        };
    };

    const fetchPosts = useCallback(async () => {
        try {
            console.log('Fetching posts...');
            setIsLoading(true);
            const response = await postService.getAllPosts();

            console.log('Posts response:', response);

            if (response.success && response.data) {
                const postsData = response.data.data;
                const convertedPosts = await Promise.all(postsData.map(convertPostToCardProps));
                setPosts(convertedPosts);

                if (response.data.pagination) {
                    setCurrentPage(response.data.pagination.page);
                    setTotalPages(response.data.pagination.totalPage);
                    console.log(`Pagination: page ${response.data.pagination.page}/${response.data.pagination.totalPage}`);
                }

                setError(null);
                console.log(`Loaded ${postsData.length} posts`);
            } else {
                setError('Không thể tải bài viết');
            }
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError('Đã xảy ra lỗi khi tải bài viết');
            Alert.alert('Lỗi', 'Không thể tải bài viết', [
                { text: 'Thử lại', onPress: () => fetchPosts() },
                { text: 'Đóng', style: 'cancel' }
            ]);
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    }, []);

    const onRefresh = useCallback(() => {
        setIsRefreshing(true);
        setIsLoading(true);
        setCurrentPage(1);
        fetchPosts();
    }, [fetchPosts]);

    const onLoadMore = useCallback(async () => {
        if (isLoadingMore || currentPage >= totalPages) {
            console.log(`Skip loading: isLoadingMore=${isLoadingMore}, currentPage=${currentPage}, totalPages=${totalPages}`);
            return;
        }

        const nextPage = currentPage + 1;
        console.log(`📄 Loading page ${nextPage}...`);
        setIsLoadingMore(true);

        try {
            const response = await postService.getAllPosts(nextPage, 10);

            if (response.success && response.data) {
                const { data: newPosts, pagination } = response.data;
                const convertedPosts = await Promise.all(newPosts.map(convertPostToCardProps));

                setPosts(prev => [...prev, ...convertedPosts]);
                setCurrentPage(nextPage);
                setTotalPages(pagination.totalPage);

                console.log(`Loaded page ${nextPage}/${pagination.totalPage} (${newPosts.length} posts)`);
                console.log(`   Total posts now: ${posts.length + newPosts.length}`);
            }
        } catch (error) {
            console.error('Error loading more posts:', error);
        } finally {
            setIsLoadingMore(false);
        }
    }, [isLoadingMore, currentPage, totalPages]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handlePostPress = (postId: string) => {
        router.push(`/post_detail?id=${postId}`);
    };

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <LoadingScreen isVisible={isLoading} onHidden={() => { }} />
                <Text style={styles.loadingText}>Đang tải bài viết...</Text>
            </View>
        );
    }

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

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={posts}
                renderItem={({ item }) => (
                    <PostCard post={item} onPostPress={handlePostPress} />
                )}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                        tintColor={appColors.primary}
                        colors={[appColors.primary]}
                    />
                }
                ListEmptyComponent={
                    <View style={styles.centerContainer}>
                        <Text style={styles.emptyText}>Chưa có bài viết nào</Text>
                    </View>
                }
                onEndReached={onLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => (
                    isLoadingMore ? (
                        <View style={{ paddingVertical: 20 }}>
                            <ActivityIndicator size="small" color={appColors.primary} />
                        </View>
                    ) : null
                )}
            />
        </SafeAreaView>
    );
};

export default FeedScreen;