import ThemedView from '@/components/atoms/themed_view';
import { Position } from '@/models/position.dto';
import { positionService } from '@/services/position.service';
import { appColors } from '@/settings';
import { PAGE_ID } from '@/settings/navigation/page';
import { AppStackNavigation } from '@/settings/navigation/route_params';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useNavigation } from 'expo-router';
import { FC, JSX, useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import LoadingScreen from '@/components/ui/loading_screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';

const HOME_BG_IMAGE = require('@/assets/images/home/home_bg.png');
const { width } = Dimensions.get('window');

interface ReelItem {
    id: string;
    title: string;
    location: string;
    distance: string;
    image: any;
    position?: Position;
}

const ReelCard: FC<{ item: ReelItem; onRoutePress: () => void }> = ({ item, onRoutePress }) => (
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
                    <Text
                        style={styles.reelCardLocationText}
                        numberOfLines={2}
                        ellipsizeMode="tail">
                        {item.location}
                    </Text>
                </View>
                <View style={styles.reelCardFooter}>
                    <Text style={styles.reelCardDistance}>{item.distance}</Text>
                    <TouchableOpacity style={styles.routeButton} onPress={onRoutePress}>
                        <Text style={styles.routeButtonText}>Route</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    </ImageBackground>
);

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
    const insets = useSafeAreaInsets();
    const [positions, setPositions] = useState<Position[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [reelItems, setReelItems] = useState<ReelItem[]>([]);
    const [currentLocation, setCurrentLocation] = useState<string>('Đang tải...');
    const [searchRadius, setSearchRadius] = useState(10000);
    const homeImages = [
        require('@/assets/images/home/home1.png'),
        require('@/assets/images/home/home2.png'),
        require('@/assets/images/home/home3.png'),
        require('@/assets/images/home/home4.png'),
        require('@/assets/images/home/home5.png'),
        require('@/assets/images/home/home6.png'),
        require('@/assets/images/home/home7.png'),
    ];

    const fetchNearbyPositions = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setIsLoading(false);
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const { longitude, latitude } = location.coords;

            let currentRadius = searchRadius;
            const MIN_POSITIONS = 5;
            const MAX_RADIUS = 100000;
            let positions: Position[] = [];

            while (positions.length < MIN_POSITIONS && currentRadius <= MAX_RADIUS) {
                console.log(`Searching with radius: ${currentRadius}m`);

                const response = await positionService.getNearbyPositions(
                    longitude,
                    latitude,
                    currentRadius
                );

                console.log(response);

                if (response.success && response.data) {
                    positions = response.data;

                    if (positions.length >= MIN_POSITIONS) {
                        setSearchRadius(currentRadius);
                        break;
                    } else if (positions.length > 0 && currentRadius >= MAX_RADIUS) {
                        setSearchRadius(currentRadius);
                        break;
                    } else {
                        currentRadius = currentRadius * 2;
                    }
                } else {
                    break;
                }
            }

            if (positions.length > 0) {
                setPositions(positions);
                const items: ReelItem[] = positions.map(pos => ({
                    id: pos.id,
                    title: pos.name,
                    location: pos.address,
                    distance: pos.distance || pos.distance == 0
                        ? `${(pos.distance / 1000).toFixed(1)} km`
                        : 'N/A',
                    image: homeImages[Math.floor(Math.random() * homeImages.length)],
                    position: pos,
                }));
                setReelItems(items);
                setCurrentLocation(positions[0].name);

                console.log(`Loaded ${items.length} positions with radius ${currentRadius / 1000}km`);
            } else {
                setReelItems([]);
                setCurrentLocation('Không xác định');
                setSearchRadius(currentRadius);
            }
        } catch (error) {
            console.error('Error fetching nearby positions:', error);
            setCurrentLocation('Lỗi');
            Alert.alert('Lỗi', 'Không thể tải địa điểm gần bạn', [
                { text: 'Thử lại', onPress: () => fetchNearbyPositions() },
                { text: 'Đóng', style: 'cancel' }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNearbyPositions();
    }, []);

    useEffect(() => {
        fetchNearbyPositions();
    }, [searchRadius]);

    const handleViewAllClick = () => {
        navigation.navigate(PAGE_ID.HOME_TABS, { screen: PAGE_ID.REELS });
    }

    const handleRoutePress = (position: Position) => {
        navigation.navigate(PAGE_ID.HOME_TABS, {
            screen: PAGE_ID.MAP,
            params: { destination: JSON.stringify(position) }
        });
    }

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                bounces={false}
            >
                <View style={{ position: 'relative' }}>

                    <Image
                        source={HOME_BG_IMAGE}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: width,
                            height: width * 0.8,
                            resizeMode: 'cover',
                            backgroundColor: '#ffffff'
                        }}
                    />

                    <View style={[styles.headerContainer, { paddingTop: insets.top + 10, backgroundColor: 'transparent' }]}>
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
                                <Ionicons name="location-sharp" size={20} color="#fff" />
                                <Text style={[styles.locationText, { color: '#fff' }]}>{currentLocation}</Text>
                                <Feather name="chevron-down" size={20} color="#fff" />
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.searchContainer, { marginTop: 20, marginHorizontal: 20 }]}
                        onPress={() => navigation.navigate(PAGE_ID.PRIVATE_TABS, { screen: PAGE_ID.PLACE_SEARCH })}
                        activeOpacity={0.7}
                    >
                        <Feather name="search" size={20} color={appColors.textPlaceholder} />
                        <Text style={styles.searchInput}>Search</Text>
                    </TouchableOpacity>
                </View>

                <ThemedView style={{ marginTop: 20 }}>
                    <SectionHeader title="Reels" handleViewAllClick={handleViewAllClick} />
                    {isLoading ? (
                        <View style={{ padding: 40, alignItems: 'center' }}>
                            <LoadingScreen isVisible={isLoading} onHidden={() => { }} />
                            <Text style={{ marginTop: 12, color: appColors.textSecondary }}>Đang tải địa điểm...</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={reelItems}
                            renderItem={({ item }) => (
                                <ReelCard
                                    item={item}
                                    onRoutePress={() => item.position && handleRoutePress(item.position)}
                                />
                            )}
                            keyExtractor={item => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingLeft: 20 }}
                        />
                    )}
                </ThemedView>

            </ScrollView>
        </View>
    );
};

export default HomePage;