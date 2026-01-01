import mapCustomStyle from '@/assets/mapCustomStyle.json';
import { Position } from '@/models/position.dto';
import { googleMapsService } from '@/services/google-maps.service';
import { positionService } from '@/services/position.service';
import { appColors } from '@/settings';
import { PAGE_ID } from '@/settings/navigation/page';
import { AppStackNavigation } from '@/settings/navigation/route_params';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Linking, Platform, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { styles } from './styles';

export default function MapScreen() {
    const navigation = useNavigation<AppStackNavigation>();
    const params = useLocalSearchParams();
    const mapRef = React.useRef<MapView>(null);
    const [positions, setPositions] = useState<Position[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
    const [destinationPosition, setDestinationPosition] = useState<Position | null>(null);
    const [routeCoordinates, setRouteCoordinates] = useState<Array<{ latitude: number; longitude: number }>>([]);
    const [isLoadingRoute, setIsLoadingRoute] = useState(false);
    const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);
    const [showFloatingCard, setShowFloatingCard] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [mapRegion, setMapRegion] = useState<Region>({
        latitude: 10.795,
        longitude: 106.745,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
    });

    useEffect(() => {
        const fetchUserLocationAndPositions = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission denied', 'Location permission is required');
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;
                setUserLocation({ latitude, longitude });

                setMapRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                });

                const response = await positionService.getNearbyPositions(
                    longitude,
                    latitude,
                    1000000
                );

                if (response.success && response.data) {
                    setPositions(response.data);
                    console.log(`Loaded ${response.data.length} positions`);
                } else {
                    console.log('No positions found nearby');
                }
            } catch (error) {
                console.error('Error fetching positions:', error);
                Alert.alert('Error', 'Could not fetch positions');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserLocationAndPositions();
    }, []);

    const fetchRoute = useCallback(async (
        origin: { latitude: number; longitude: number },
        destination: { latitude: number; longitude: number }
    ) => {
        setIsLoadingRoute(true);
        try {
            const route = await googleMapsService.getDirections(origin, destination, 'driving');

            if (route) {
                setRouteCoordinates(route.coordinates);
                setRouteInfo({
                    distance: route.distance,
                    duration: route.duration
                });
            } else {
                console.log('Using fallback straight line');
                setRouteCoordinates([origin, destination]);
                setRouteInfo(null);
            }
        } catch (error) {
            console.error('Error fetching route:', error);
            setRouteCoordinates([origin, destination]);
            setRouteInfo(null);
        } finally {
            setIsLoadingRoute(false);
        }
    }, []);

    useEffect(() => {
        if (params?.destination && userLocation) {
            try {
                const dest = typeof params.destination === 'string'
                    ? JSON.parse(params.destination) as Position
                    : JSON.parse(params.destination[0]) as Position;
                setDestinationPosition(dest);

                const destCoords = {
                    latitude: dest.point.coordinates[1],
                    longitude: dest.point.coordinates[0]
                };

                fetchRoute(userLocation, destCoords);

                const midLat = (userLocation.latitude + destCoords.latitude) / 2;
                const midLon = (userLocation.longitude + destCoords.longitude) / 2;
                const latDelta = Math.abs(userLocation.latitude - destCoords.latitude) * 1.5;
                const lonDelta = Math.abs(userLocation.longitude - destCoords.longitude) * 1.5;

                setMapRegion({
                    latitude: midLat,
                    longitude: midLon,
                    latitudeDelta: Math.max(latDelta, 0.02),
                    longitudeDelta: Math.max(lonDelta, 0.02),
                });
            } catch (error) {
                console.error('Error parsing destination parameter:', error);
                Alert.alert('Error', 'Invalid destination data');
            }
        }
    }, [params?.destination, userLocation, fetchRoute]);

    const handleMarkerPress = useCallback((position: Position) => {
        console.log('Position selected:', position.name);
        setSelectedPosition(position);
        setShowFloatingCard(true);
    }, []);

    const handleCloseCard = useCallback(() => {
        setShowFloatingCard(false);
        setSelectedPosition(null);
    }, []);

    const handleViewDetails = useCallback(() => {
        navigation.navigate(PAGE_ID.PRIVATE_TABS, { screen: PAGE_ID.PLACE_DETAIL });
    }, [navigation]);

    const handleClearRoute = useCallback(() => {
        setDestinationPosition(null);
        setRouteCoordinates([]);
        setRouteInfo(null);
    }, []);

    const openDirections = useCallback((destination: Position) => {
        const lat = destination.point.coordinates[1];
        const lng = destination.point.coordinates[0];
        const label = encodeURIComponent(destination.name);

        const scheme = Platform.select({
            ios: `maps:0,0?q=${label}@${lat},${lng}`,
            android: `geo:0,0?q=${lat},${lng}(${label})`
        });

        const url = scheme || `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`);
                }
            })
            .catch(() => {
                Alert.alert('Error', 'Không thể mở ứng dụng bản đồ');
            });
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={mapRegion}
                customMapStyle={mapCustomStyle}
                showsUserLocation={true}
                showsMyLocationButton={false}
                showsPointsOfInterest={false}
                onPress={handleCloseCard}
            >
                {positions.map((position) => (
                    <Marker
                        key={position.id}
                        coordinate={{
                            latitude: position.point.coordinates[1],
                            longitude: position.point.coordinates[0],
                        }}
                        onPress={() => handleMarkerPress(position)}
                    >
                        <View style={[
                            styles.poiMarker,
                            selectedPosition?.id === position.id && styles.poiMarkerSelected
                        ]} />
                    </Marker>
                ))}

                {destinationPosition && userLocation && routeCoordinates.length > 0 && (
                    <>
                        <Polyline
                            coordinates={routeCoordinates}
                            strokeColor={appColors.primary}
                            strokeWidth={4}
                        />

                        <Marker
                            coordinate={{
                                latitude: destinationPosition.point.coordinates[1],
                                longitude: destinationPosition.point.coordinates[0],
                            }}
                        >
                            <View style={styles.destinationMarker}>
                                <Ionicons name="location" size={32} color={appColors.primary} />
                            </View>
                        </Marker>
                    </>
                )}
            </MapView>

            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={appColors.primary} />
                    <Text style={styles.loadingText}>Đang tải vị trí...</Text>
                </View>
            )}

            <TouchableOpacity
                style={{
                    position: 'absolute',
                    bottom: 100,
                    right: 20,
                    backgroundColor: '#fff',
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                }}
                onPress={() => {
                    if (userLocation && mapRef.current) {
                        mapRef.current.animateToRegion({
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.02,
                        }, 500);
                    }
                }}
            >
                <Ionicons name="locate" size={24} color={appColors.primary} />
            </TouchableOpacity>

            {destinationPosition && !isLoading && (
                <View style={{
                    position: 'absolute',
                    top: 60,
                    left: 20,
                    right: 20,
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    padding: 12,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                }}>
                    {isLoadingRoute ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <ActivityIndicator size="small" color={appColors.primary} />
                            <Text style={{ marginLeft: 8, color: '#7D848D' }}>Đang tìm đường...</Text>
                        </View>
                    ) : routeInfo ? (
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1B1E28', flex: 1 }}>
                                    {destinationPosition.name}
                                </Text>
                                <TouchableOpacity
                                    onPress={handleClearRoute}
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                >
                                    <Ionicons name="close-circle" size={24} color={appColors.primary} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', gap: 16, marginBottom: 8 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name="navigate" size={16} color={appColors.primary} />
                                    <Text style={{ marginLeft: 4, color: '#7D848D', fontSize: 12 }}>
                                        {routeInfo.distance}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name="time" size={16} color={appColors.primary} />
                                    <Text style={{ marginLeft: 4, color: '#7D848D', fontSize: 12 }}>
                                        {routeInfo.duration}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: appColors.primary,
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    borderRadius: 8,
                                    gap: 6,
                                }}
                                onPress={() => openDirections(destinationPosition)}
                            >
                                <Ionicons name="navigate-circle" size={20} color="#fff" />
                                <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>Directions</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: '#7D848D', fontSize: 12, flex: 1 }}>
                                {destinationPosition.name}
                            </Text>
                            <TouchableOpacity
                                onPress={handleClearRoute}
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            >
                                <Ionicons name="close-circle" size={24} color={appColors.primary} />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            )}

            {showFloatingCard && selectedPosition && (
                <View style={styles.floatingCard}>
                    <View
                        style={styles.floatingCardContent}
                    >
                        <View style={styles.floatingCardHeader}>
                            <View style={styles.floatingCardTitleRow}>
                                <Text style={styles.floatingCardTitle} numberOfLines={1}>
                                    {selectedPosition.name}
                                </Text>
                                <TouchableOpacity
                                    onPress={handleCloseCard}
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                >
                                    <Ionicons name="close-circle" size={24} color="#7D848D" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.floatingCardBody}>
                            {selectedPosition.address && (
                                <View style={styles.floatingCardRow}>
                                    <Ionicons name="location" size={18} color={appColors.primary} />
                                    <Text style={styles.floatingCardText} numberOfLines={2}>
                                        {selectedPosition.address}
                                    </Text>
                                </View>
                            )}

                            {selectedPosition.type && (
                                <View style={styles.floatingCardRow}>
                                    <Ionicons name="pricetag" size={18} color={appColors.primary} />
                                    <Text style={styles.floatingCardText}>
                                        {selectedPosition.type}
                                    </Text>
                                </View>
                            )}

                            {selectedPosition.distance && (
                                <View style={styles.floatingCardRow}>
                                    <Ionicons name="navigate" size={18} color={appColors.primary} />
                                    <Text style={styles.floatingCardText}>
                                        {(selectedPosition.distance / 1000).toFixed(1)} km
                                    </Text>
                                </View>
                            )}
                        </View>

                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: appColors.primary,
                                paddingVertical: 10,
                                paddingHorizontal: 16,
                                borderRadius: 8,
                                marginTop: 12,
                                gap: 6,
                            }}
                            onPress={() => {
                                if (userLocation && selectedPosition) {
                                    const destCoords = {
                                        latitude: selectedPosition.point.coordinates[1],
                                        longitude: selectedPosition.point.coordinates[0]
                                    };
                                    setDestinationPosition(selectedPosition);
                                    fetchRoute(userLocation, destCoords);

                                    const midLat = (userLocation.latitude + destCoords.latitude) / 2;
                                    const midLon = (userLocation.longitude + destCoords.longitude) / 2;
                                    const latDelta = Math.abs(userLocation.latitude - destCoords.latitude) * 1.5;
                                    const lonDelta = Math.abs(userLocation.longitude - destCoords.longitude) * 1.5;

                                    setMapRegion({
                                        latitude: midLat,
                                        longitude: midLon,
                                        latitudeDelta: Math.max(latDelta, 0.02),
                                        longitudeDelta: Math.max(lonDelta, 0.02),
                                    });
                                }
                            }}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="navigate" size={18} color="#fff" />
                            <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>Show Route</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleViewDetails}
                            activeOpacity={0.9}
                            style={styles.floatingCardFooter}
                        >
                            <Text style={styles.floatingCardHint}>
                                Tap để xem chi tiết →
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

        </View>
    );
}