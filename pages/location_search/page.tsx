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
import { appColors } from '@/settings';

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
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
    const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
    const [radius, setRadius] = useState(20); 
    const [isLoading, setIsLoading] = useState(true);
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

    useEffect(() => {
        const fetchPositions = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Location permission denied');
                    setIsLoading(false);
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;
                setUserLocation({ latitude, longitude });

                const radiusInMeters = radius * 1000;
                const response = await positionService.getNearbyPositions(
                    longitude,
                    latitude,
                    radiusInMeters
                );

                if (response.success && response.data) {
                    setAllPositions(response.data);
                    setFilteredPositions(response.data);
                    console.log(`Loaded ${response.data.length} positions within ${radius}km`);
                }
            } catch (error) {
                console.error('Error fetching positions:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPositions();
    }, [radius]);

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

    const handleCancel = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const handleNext = useCallback(() => {
        if (selectedPosition) {
            navigation.navigate(PAGE_ID.HOME_TABS, {
                screen: PAGE_ID.MAP,
                params: { destination: JSON.stringify(selectedPosition) }
            });
        }
    }, [navigation, selectedPosition]);

    const renderItem = ({ item }: { item: Position }) => (
        <TouchableOpacity
            style={[
                styles.listItem,
                selectedPosition?.id === item.id && { backgroundColor: '#FFF0F3' }
            ]}
            onPress={() => {
                console.log('Selected position:', item.name);
                setSelectedPosition(item);
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
                    onPress={handleNext}
                    style={[
                        styles.nextButton,
                        !selectedPosition && { opacity: 0.5 }
                    ]}
                    disabled={!selectedPosition}
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

            <View style={{ paddingHorizontal: 20, paddingVertical: 12, backgroundColor: '#F8F8F8' }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 }}>Search Radius</Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                    {[5, 10, 20, 50].map((r) => (
                        <TouchableOpacity
                            key={r}
                            onPress={() => setRadius(r)}
                            style={{
                                flex: 1,
                                paddingVertical: 8,
                                paddingHorizontal: 12,
                                borderRadius: 8,
                                backgroundColor: radius === r ? appColors.primary : '#fff',
                                borderWidth: 1,
                                borderColor: radius === r ? appColors.primary : '#E0E0E0',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{
                                fontSize: 14,
                                fontWeight: '600',
                                color: radius === r ? '#fff' : '#666'
                            }}>
                                {r} km
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={appColors.primary} />
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