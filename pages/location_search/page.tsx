import { Position } from '@/models/position.dto';
import { positionService } from '@/services/position.service';
import { PAGE_ID } from '@/settings/navigation/page';
import { AppStackNavigation } from '@/settings/navigation/route_params';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useNavigation } from 'expo-router';
import React, { FC, JSX, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

// Haversine formula to calculate distance between two coordinates
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const SearchLocationScreen: FC = (): JSX.Element => {
    const navigation = useNavigation<AppStackNavigation>();
    const [searchQuery, setSearchQuery] = useState('');
    const [allPositions, setAllPositions] = useState<Position[]>([]);
    const [filteredPositions, setFilteredPositions] = useState<Position[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

    /******************************************************************************
     * Fetch nearby positions on mount
     ******************************************************************************/
    useEffect(() => {
        const fetchPositions = async () => {
            try {
                // Get user location
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Location permission denied');
                    setIsLoading(false);
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;
                setUserLocation({ latitude, longitude });

                // Fetch all positions within 20km
                const RADIUS_20KM = 20000; // meters
                const response = await positionService.getNearbyPositions(
                    longitude,
                    latitude,
                    RADIUS_20KM
                );

                if (response.success && response.data) {
                    setAllPositions(response.data);
                    setFilteredPositions(response.data);
                    console.log(`✅ Loaded ${response.data.length} positions within 20km`);
                }
            } catch (error) {
                console.error('Error fetching positions:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPositions();
    }, []);

    /******************************************************************************
     * Filter positions based on search query (client-side)
     ******************************************************************************/
    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredPositions(allPositions);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = allPositions.filter(position =>
            position.name.toLowerCase().includes(query) ||
            position.address.toLowerCase().includes(query) ||
            position.type.toLowerCase().includes(query)
        );

        setFilteredPositions(filtered);
    }, [searchQuery, allPositions]);

    /******************************************************************************
     * Calculate and format distance
     ******************************************************************************/
    const getDistanceText = useCallback((position: Position): string => {
        if (!userLocation) return '';

        const distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            position.point.coordinates[1],
            position.point.coordinates[0]
        );

        if (distance < 0.1) return '<0.1 km';
        if (distance < 1) return `${(distance * 1000).toFixed(0)} m`;
        return `${distance.toFixed(1)} km`;
    }, [userLocation]);

    /******************************************************************************
     * Handle cancel button
     ******************************************************************************/
    const handleCancel = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    /******************************************************************************
     * Render position item
     ******************************************************************************/
    const renderItem = ({ item }: { item: Position }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
                console.log('Selected position:', item.name);
                // Navigate to map with destination
                navigation.navigate(PAGE_ID.PRIVATE_TABS, {
                    screen: PAGE_ID.MAP,
                    params: { destination: item }
                });
            }}
        >
            <View style={styles.primaryRow}>
                <Text style={styles.distanceText}>{getDistanceText(item)}</Text>
                <Text style={styles.primaryText} numberOfLines={1}>{item.name}</Text>
            </View>
            {item.address ? (
                <Text style={styles.secondaryText} numberOfLines={2}>{item.address}</Text>
            ) : (
                <View style={styles.divider} />
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleCancel}>
                    <Text style={styles.headerButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => console.log('Next pressed')}
                    style={styles.nextButton}
                >
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.searchBarContainer}>
                <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm địa điểm..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoFocus
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity
                        onPress={() => setSearchQuery('')}
                        style={styles.clearButton}
                    >
                        <Ionicons name="close-circle" size={20} color="#888" />
                    </TouchableOpacity>
                )}
            </View>

            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FF678B" />
                    <Text style={styles.loadingText}>Đang tải vị trí...</Text>
                </View>
            ) : filteredPositions.length > 0 ? (
                <FlatList
                    data={filteredPositions}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    style={styles.listContainer}
                    contentContainerStyle={styles.listContent}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Ionicons name="location-outline" size={64} color="#D0D0D0" />
                    <Text style={styles.emptyText}>
                        {searchQuery ? 'Không tìm thấy kết quả' : 'Không có vị trí nào trong bán kính 20km'}
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
};

export default SearchLocationScreen;