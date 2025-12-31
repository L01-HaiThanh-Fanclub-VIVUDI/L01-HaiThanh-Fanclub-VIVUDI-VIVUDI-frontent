import mapCustomStyle from '@/assets/mapCustomStyle.json';
import { Position } from '@/models/position.dto';
import { positionService } from '@/services/position.service';
import { PAGE_ID } from '@/settings/navigation/page';
import { AppStackNavigation } from '@/settings/navigation/route_params';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { styles } from './styles';

export default function MapScreen() {
    const navigation = useNavigation<AppStackNavigation>();
    const [positions, setPositions] = useState<Position[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
    const [showFloatingCard, setShowFloatingCard] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [mapRegion, setMapRegion] = useState<Region>({
        latitude: 10.795,
        longitude: 106.745,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
    });

    /******************************************************************************
     * Get user location and fetch nearby positions
     ******************************************************************************/
    useEffect(() => {
        const fetchUserLocationAndPositions = async () => {
            try {
                // Get location permission
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission denied', 'Location permission is required');
                    return;
                }

                // Get current location
                const location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;
                setUserLocation({ latitude, longitude });

                // Update map region to user location
                setMapRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                });

                // Fetch nearby positions (1000km radius)
                const response = await positionService.getNearbyPositions(
                    longitude,
                    latitude,
                    1000000 // 1000km
                );

                if (response.success && response.data) {
                    setPositions(response.data);
                    console.log(`✅ Loaded ${response.data.length} positions`);
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

    /******************************************************************************
     * Handle marker press
     ******************************************************************************/
    const handleMarkerPress = useCallback((position: Position) => {
        console.log('Position selected:', position.name);
        setSelectedPosition(position);
        setShowFloatingCard(true);
    }, []);

    const handleCloseCard = useCallback(() => {
        setShowFloatingCard(false);
        setSelectedPosition(null);
    }, []);

    const handleOpenModal = useCallback(() => {
        setShowFloatingCard(false);
        setShowModal(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setShowModal(false);
        setSelectedPosition(null);
    }, []);

    const handleViewDetails = useCallback(() => {
        handleCloseModal();
        navigation.navigate(PAGE_ID.PRIVATE_TABS, { screen: PAGE_ID.PLACE_DETAIL });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={mapRegion}
                customMapStyle={mapCustomStyle}
                showsUserLocation={true}
                showsPointsOfInterest={false}
                onPress={handleCloseCard}
            >
                {/* Position Markers */}
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
            </MapView>

            {/* Back Button */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Feather name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>

            {/* Loading Indicator */}
            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FF678B" />
                    <Text style={styles.loadingText}>Đang tải vị trí...</Text>
                </View>
            )}

            {/* Floating Card Preview */}
            {showFloatingCard && selectedPosition && (
                <View style={styles.floatingCard}>
                    <TouchableOpacity
                        style={styles.floatingCardContent}
                        onPress={handleOpenModal}
                        activeOpacity={0.9}
                    >
                        {/* Header */}
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

                        {/* Info */}
                        <View style={styles.floatingCardBody}>
                            {selectedPosition.address && (
                                <View style={styles.floatingCardRow}>
                                    <Ionicons name="location" size={18} color="#FF678B" />
                                    <Text style={styles.floatingCardText} numberOfLines={2}>
                                        {selectedPosition.address}
                                    </Text>
                                </View>
                            )}

                            {selectedPosition.type && (
                                <View style={styles.floatingCardRow}>
                                    <Ionicons name="pricetag" size={18} color="#FF678B" />
                                    <Text style={styles.floatingCardText}>
                                        {selectedPosition.type}
                                    </Text>
                                </View>
                            )}

                            {selectedPosition.distance && (
                                <View style={styles.floatingCardRow}>
                                    <Ionicons name="navigate" size={18} color="#FF678B" />
                                    <Text style={styles.floatingCardText}>
                                        {(selectedPosition.distance / 1000).toFixed(1)} km
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* Tap Hint */}
                        <View style={styles.floatingCardFooter}>
                            <Text style={styles.floatingCardHint}>
                                Tap để xem chi tiết →
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}

            {/* Modal with Full Position Details */}
            <Modal
                visible={showModal}
                transparent={true}
                animationType="slide"
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {selectedPosition && (
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {/* Header */}
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>{selectedPosition.name}</Text>
                                    <TouchableOpacity onPress={handleCloseModal}>
                                        <Ionicons name="close" size={28} color="#1B1E28" />
                                    </TouchableOpacity>
                                </View>

                                {/* Address */}
                                {selectedPosition.address && (
                                    <View style={styles.infoRow}>
                                        <Ionicons name="location" size={22} color="#FF678B" />
                                        <Text style={styles.infoText}>{selectedPosition.address}</Text>
                                    </View>
                                )}

                                {/* Type */}
                                {selectedPosition.type && (
                                    <View style={styles.infoRow}>
                                        <Ionicons name="pricetag" size={22} color="#FF678B" />
                                        <Text style={styles.infoText}>{selectedPosition.type}</Text>
                                    </View>
                                )}

                                {/* Distance */}
                                {selectedPosition.distance && (
                                    <View style={styles.infoRow}>
                                        <Ionicons name="navigate" size={22} color="#FF678B" />
                                        <Text style={styles.infoText}>
                                            {(selectedPosition.distance / 1000).toFixed(1)} km
                                        </Text>
                                    </View>
                                )}

                                {/* Description */}
                                {selectedPosition.description && (
                                    <View style={styles.infoSection}>
                                        <Text style={styles.sectionLabel}>Mô tả</Text>
                                        <Text style={styles.descriptionText}>
                                            {selectedPosition.description}
                                        </Text>
                                    </View>
                                )}

                                {/* Coordinates */}
                                <View style={styles.infoSection}>
                                    <Text style={styles.sectionLabel}>Tọa độ</Text>
                                    <Text style={styles.coordinatesText}>
                                        {selectedPosition.point.coordinates[1].toFixed(6)}, {selectedPosition.point.coordinates[0].toFixed(6)}
                                    </Text>
                                </View>

                                {/* Action Buttons */}
                                <TouchableOpacity
                                    style={styles.primaryButton}
                                    onPress={handleViewDetails}
                                >
                                    <Text style={styles.primaryButtonText}>Xem chi tiết</Text>
                                    <Feather name="arrow-right" size={20} color="#FFFFFF" />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.secondaryButton}
                                    onPress={handleCloseModal}
                                >
                                    <Text style={styles.secondaryButtonText}>Đóng</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
}