import { View, Text, ScrollView, TextInput, FlatList, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FC, JSX } from 'react';
import { styles } from './styles';
import { Feather, Ionicons } from '@expo/vector-icons';
import ThemedView from '@/components/atoms/themed_view';
import { useNavigation } from 'expo-router';
import { AppStackNavigation } from '@/settings/navigation/route_params';
import { PAGE_ID } from '@/settings/navigation/page';

const DUMMY_REELS = [
    { id: 'r1', title: 'DLG Hotel', location: 'District 1, Ho Chi Minh City', distance: '16,5 Km', image: require('@/assets/images/home/home1.png') },
    { id: 'r2', title: 'Vung Tau Beach', location: 'Vung Tau', distance: '55,5 Km', image: require('@/assets/images/home/home2.png') },
];

// const DUMMY_DESTINATIONS = [
//     { id: 'd1', title: 'Modern House', image: 'https://source.unsplash.com/random/300x300?architecture' },
//     { id: 'd2', title: 'Green Forest', image: 'https://source.unsplash.com/random/300x300?forest' },
// ];

const ReelCard: FC<{ item: typeof DUMMY_REELS[0] }> = ({ item }) => (
    <ImageBackground
        source={item.image}
        style={styles.reelCard}
        imageStyle={{ borderRadius: 20 }}
    >
        <View style={styles.reelCardOverlay}>
            <View style={styles.reelCardContentContainer}>
                <Text style={styles.reelCardTitle}>{item.title}</Text>
                <View style={styles.reelCardLocationRow}>
                    <Ionicons name="location-sharp" size={16} color="#000" />
                    <Text style={styles.reelCardLocationText}>{item.location}</Text>
                </View>
                <View style={styles.reelCardFooter}>
                    <Text style={styles.reelCardDistance}>{item.distance}</Text>
                    <TouchableOpacity style={styles.routeButton}>
                        <Text style={styles.routeButtonText}>Route</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    </ImageBackground>
);

// const DestinationCard: FC<{ item: typeof DUMMY_DESTINATIONS[0] }> = ({ item }) => (
//     <View style={styles.destCard}>
//         <ImageBackground
//             source={{ uri: item.image }}
//             style={styles.destCardImage}
//             imageStyle={{ borderRadius: 20 }}
//         >
//             <TouchableOpacity style={styles.bookmarkButton}>
//                 <Feather name="bookmark" size={20} color="#FFF" />
//             </TouchableOpacity>
//         </ImageBackground>
//     </View>
// );

const SectionHeader: FC<{ title: string, handleViewAllClick: () => void }> = ({ title, handleViewAllClick }) => (
    <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity onPress={handleViewAllClick}>
            <Text style={styles.sectionViewAll}>View all</Text>
        </TouchableOpacity>
    </View>
);

const HomePage: FC = (): JSX.Element => {
    const navigation = useNavigation<AppStackNavigation>();

    const handleViewAllClick = () => {
        navigation.navigate(PAGE_ID.PRIVATE_TABS, { screen: PAGE_ID.REELS });
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <ThemedView style={styles.headerContainer}>
                    <View style={styles.headerWave} />
                    <View style={styles.headerContent}>
                        <TouchableOpacity style={styles.headerProfile}>
                            <View style={styles.avatarContainer}>
                                <Image
                                    source={require('@/assets/images/home/avatar.png')}
                                    style={styles.avatarImage}
                                />
                            </View>
                            <Text style={styles.headerUsername}>ViVuDiUI</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.locationContainer}>
                        <Text style={styles.locationLabel}>Location</Text>
                        <View style={styles.locationRow}>
                            <Ionicons name="location-sharp" size={20} color="#1B1E28" />
                            <Text style={styles.locationText}>Ho Chi Minh, VietNam</Text>
                            <Feather name="chevron-down" size={20} color="#1B1E28" />
                        </View>
                    </View>
                </ThemedView>

                <ThemedView style={styles.searchContainer}>
                    <Feather name="search" size={20} color="#9CA3AF" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor="#9CA3AF"
                    />
                </ThemedView>

                <ThemedView>
                    <SectionHeader title="Reels" handleViewAllClick={handleViewAllClick}/>
                    <FlatList
                        data={DUMMY_REELS}
                        renderItem={({ item }) => <ReelCard item={item} />}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingLeft: 20 }}
                    />
                </ThemedView>

                {/* <ThemedView style={styles.destinationSection}>
                    <SectionHeader title="Best Destination" />
                    <FlatList
                        data={DUMMY_DESTINATIONS}
                        renderItem={({ item }) => <DestinationCard item={item} />}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingLeft: 20 }}
                    />
                </ThemedView> */}

            </ScrollView>
        </SafeAreaView>
    );
};

export default HomePage;