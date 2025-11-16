import { View, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FC, JSX } from 'react';
import { PostCardProps } from '@/components/ui/post_card/types';
import PostCard from '@/components/ui/post_card/page';

const DUMMY_POSTS: PostCardProps[] = [
    {
        id: '1',
        username: 'joshua_l',
        location: 'Tokyo, Japan',
        avatar: require('@/assets/images/home/avatar.png'),
        image: require('@/assets/images/home/shibuya.png'),
        likes: '44,686',
        likedBy: 'craig_love',
        caption: 'The game in Japan was amazing and I want to share some photos',
        date: 'September 19',
        imageCount: '1/3',
        isVerified: true,
    },
    {
        id: '2',
        username: 'another_user',
        location: 'Paris, France',
        avatar: require('@/assets/images/home/avatar.png'),
        image: require('@/assets/images/home/paris.png'),
        likes: '1,234',
        likedBy: 'sara_d',
        caption: 'Paris is always a good idea ❤️',
        date: 'September 20',
        imageCount: '1/1',
        isVerified: false,
    },
];

const FeedScreen: FC = (): JSX.Element => {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DUMMY_POSTS}
                renderItem={({ item }) => (
                    <PostCard post={item} />
                )}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    }
});

export default FeedScreen;