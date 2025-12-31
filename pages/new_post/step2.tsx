import { CreatePostRequest } from '@/models/create_post_request.dto';
import { Position } from '@/models/position.dto';
import { positionService } from '@/services/position.service';
import { postService } from '@/services/post.service';
import { PAGE_ID } from '@/settings/navigation/page';
import { AppStackNavigation } from '@/settings/navigation/route_params';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { FC, JSX, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { styles } from './styles_2';

export type CreatePostParams = {
    selectedMediaUri?: string[];
    mediaType?: 'photo' | 'video';
}

const CreatePostScreen: FC = (): JSX.Element => {
    const params = useLocalSearchParams<CreatePostParams>();
    const navigation = useNavigation<AppStackNavigation>();

    /******************************************************************************
     * State Management
     ******************************************************************************/
    const [selectedMediaUris] = useState(params.selectedMediaUri);
    const [mediaType] = useState(params.mediaType);
    const [caption, setCaption] = useState<string>('');
    const [visibility, setVisibility] = useState<'PUBLIC' | 'PRIVATE' | 'FRIENDS'>('PUBLIC');
    const [rating, setRating] = useState<number>(0);
    const [location, setLocation] = useState<Position | null>(null);
    const [locationName, setLocationName] = useState<string>(''); // Tên địa điểm do user nhập
    const [locationType, setLocationType] = useState<'coffee' | 'street_food' | 'restaurant' | 'other'>('other'); // Loại địa điểm
    const [currentCoords, setCurrentCoords] = useState<{ longitude: number; latitude: number } | null>(null); // Tọa độ GPS
    const [isLoading, setIsLoading] = useState(false);
    const [showVisibilityDropdown, setShowVisibilityDropdown] = useState(false);
    const [showLocationTypeDropdown, setShowLocationTypeDropdown] = useState(false);
    const [isDetectingLocation, setIsDetectingLocation] = useState(true);

    /******************************************************************************
     * Location Detection - Auto detect on mount
     ******************************************************************************/
    useEffect(() => {
        detectLocation();
    }, []);

    const detectLocation = async () => {
        try {
            setIsDetectingLocation(true);

            // Request location permission
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Lỗi', 'Cần quyền truy cập vị trí để tạo bài viết');
                setIsDetectingLocation(false);
                return;
            }

            // Get current GPS coordinates
            const currentLocation = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });
            const { longitude, latitude } = currentLocation.coords;

            console.log('GPS Coordinates:', { longitude, latitude });

            // IMPORTANT: Save coordinates for creating new position later
            setCurrentCoords({ longitude, latitude });

            // Find nearby positions from backend (within 50m radius)
            const response = await positionService.getNearbyPositions(longitude, latitude, 50);

            console.log(response);
            if (response.success && response.data && response.data.length > 0) {
                // Use the closest location
                setLocation(response.data[0]);
                console.log('Found nearby location:', response.data[0].name);
            } else {
                // No nearby location - user will need to name it
                console.log('No location found - user should enter name');
                setLocation(null); // Make sure location is null
            }
        } catch (error) {
            console.error('Location detection error:', error);
            Alert.alert('Lỗi', 'Không thể xác định vị trí', [
                { text: 'Thử lại', onPress: () => detectLocation() },
                { text: 'Đóng', style: 'cancel' }
            ]);
        } finally {
            setIsDetectingLocation(false);
        }
    };

    /******************************************************************************
     * Post Creation Handler
     ******************************************************************************/
    const onPublishPress = async () => {
        // Validation
        if (!caption.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập nội dung bài viết');
            return;
        }

        // Check if we have GPS coordinates
        if (!location && !currentCoords) {
            Alert.alert('Lỗi', 'Không thể xác định vị trí. Vui lòng thử lại');
            return;
        }

        // If no existing location and user entered a custom name, we'll create new position
        if (!location && !locationName.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập tên địa điểm');
            return;
        }

        setIsLoading(true);

        try {
            let finalLocationId = location?.id;

            // If user entered a custom location name, create new position first
            if (locationName.trim() && currentCoords) {
                console.log('Creating new position:', locationName);

                // Use reverse geocoding to get address from coordinates
                let address = 'Unknown address';
                try {
                    const geocodedLocation = await Location.reverseGeocodeAsync({
                        latitude: currentCoords.latitude,
                        longitude: currentCoords.longitude,
                    });

                    console.log(geocodedLocation);

                    if (geocodedLocation && geocodedLocation.length > 0) {
                        const loc = geocodedLocation[0];
                        // Build address from components
                        address = [
                            loc.streetNumber,
                            loc.street,
                            loc.district,
                            loc.city,
                            loc.region,
                            loc.country,
                        ].filter(Boolean).join(', ');
                        console.log('Reverse geocoded address:', address);
                    }
                } catch (geocodeError) {
                    console.error('Reverse geocoding failed:', geocodeError);
                    // Continue with unknown address
                }

                // Create new position with geocoded address
                const createPositionResponse = await positionService.createPosition({
                    name: locationName.trim(),
                    address: address,
                    description: `Created by user on ${new Date().toLocaleDateString('vi-VN')}`,
                    type: locationType,
                    longtitude: currentCoords.longitude,
                    lattitude: currentCoords.latitude,
                });

                console.log(createPositionResponse);

                if (createPositionResponse.success && createPositionResponse.data) {
                    finalLocationId = createPositionResponse.data.id;
                    console.log('New position created with ID:', finalLocationId);
                } else {
                    throw new Error('Failed to create position');
                }
            }

            if (!finalLocationId) {
                Alert.alert('Lỗi', 'Không thể tạo địa điểm');
                setIsLoading(false);
                return;
            }

            // Prepare post data
            const postData: CreatePostRequest = {
                content: caption.trim(),
                location_id: finalLocationId,
                visibility,
                rating: rating > 0 ? rating : undefined,
            };

            // Create post with media
            const response = await postService.createPost(
                postData,
                selectedMediaUris || []
            );

            if (response.success) {
                Alert.alert('Thành công', 'Đã tạo bài viết!', [
                    {
                        text: 'OK',
                        onPress: () => {
                            // Navigate back to home
                            navigation.navigate(PAGE_ID.HOME_TABS, { screen: PAGE_ID.HOME });
                        }
                    }
                ]);
            } else {
                Alert.alert('Lỗi', response.message || 'Không thể tạo bài viết');
            }
        } catch (error) {
            console.error('Post creation error:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi tạo bài viết');
        } finally {
            setIsLoading(false);
        }
    };

    /******************************************************************************
     * UI Event Handlers
     ******************************************************************************/
    const onCancelPress = () => {
        navigation.goBack();
    };

    const onDraftPress = () => {
        Alert.alert('Thông báo', 'Tính năng lưu nháp đang được phát triển');
    };

    const handleStarPress = (star: number) => {
        // Toggle: if same star clicked, deselect
        setRating(rating === star ? 0 : star);
    };

    /******************************************************************************
     * Render Functions
     ******************************************************************************/
    const renderSelectedThumbnail = ({ item, index }: { item: string, index: number }) => {
        return (
            <View style={styles.selectedThumbnailWrapper}>
                <Image
                    source={{ uri: item }}
                    style={styles.selectedThumbnailImage}
                    contentFit="cover"
                />
                <View style={styles.selectedNumberContainer}>
                    <Text style={styles.selectedNumberText}>{index + 1}</Text>
                </View>
                {mediaType === 'video' && (
                    <View style={styles.videoOverlay}>
                        <Feather name="video" size={14} color="#FFF" />
                    </View>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onCancelPress}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Tạo bài viết</Text>
                <View style={{ width: 60 }} />
            </View>

            {/* Media Preview */}
            <View style={styles.previewContainer}>
                {selectedMediaUris?.length ? (
                    <FlatList
                        data={selectedMediaUris}
                        renderItem={renderSelectedThumbnail}
                        keyExtractor={(item) => item}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.selectedMediaList}
                        contentContainerStyle={styles.selectedMediaListContent}
                    />
                ) : (
                    <View style={styles.noMediaPlaceholder}>
                        <Text style={styles.noMediaText}>No Media Selected</Text>
                    </View>
                )}
            </View>

            {/* Caption Input */}
            <TextInput
                style={styles.captionInput}
                placeholder="Thêm chú thích..."
                placeholderTextColor="#A0A0A0"
                multiline
                numberOfLines={4}
                value={caption}
                onChangeText={setCaption}
                editable={!isLoading}
            />

            {/* Location Name Input - Show if no location found */}
            {!location && currentCoords && (
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Tên địa điểm</Text>
                    <TextInput
                        style={[
                            styles.locationInput,
                            isDetectingLocation && styles.inputDisabled
                        ]}
                        placeholder="Nhập tên địa điểm"
                        placeholderTextColor="#A0A0A0"
                        value={locationName}
                        onChangeText={setLocationName}
                        editable={!isDetectingLocation}
                    />

                    {/* Location Type Dropdown */}
                    <Text style={[styles.sectionLabel, { marginTop: 16 }]}>Loại địa điểm</Text>
                    <TouchableOpacity
                        onPress={() => setShowLocationTypeDropdown(!showLocationTypeDropdown)}
                        style={styles.visibilitySelector}
                        disabled={isLoading}
                    >
                        <Ionicons name="business-outline" size={20} color="#FF678B" />
                        <Text style={styles.visibilityText}>
                            {locationType === 'coffee' && 'Quán cà phê'}
                            {locationType === 'street_food' && 'Ăn vặt'}
                            {locationType === 'restaurant' && 'Nhà hàng'}
                            {locationType === 'other' && 'Khác'}
                        </Text>
                        <Ionicons name="chevron-down" size={20} color="#888" />
                    </TouchableOpacity>

                    {/* Type Dropdown */}
                    {showLocationTypeDropdown && (
                        <View style={styles.dropdown}>
                            <TouchableOpacity
                                style={styles.dropdownItem}
                                onPress={() => {
                                    setLocationType('coffee');
                                    setShowLocationTypeDropdown(false);
                                }}
                            >
                                <Text style={styles.dropdownItemText}>Quán cà phê</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.dropdownItem}
                                onPress={() => {
                                    setLocationType('street_food');
                                    setShowLocationTypeDropdown(false);
                                }}
                            >
                                <Text style={styles.dropdownItemText}>Ăn vặt</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.dropdownItem}
                                onPress={() => {
                                    setLocationType('restaurant');
                                    setShowLocationTypeDropdown(false);
                                }}
                            >
                                <Text style={styles.dropdownItemText}>Nhà hàng</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.dropdownItem}
                                onPress={() => {
                                    setLocationType('other');
                                    setShowLocationTypeDropdown(false);
                                }}
                            >
                                <Text style={styles.dropdownItemText}>Khác</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <Text style={styles.hint}>
                        Không tìm thấy địa điểm gần đây. Vui lòng đặt tên cho vị trí này.
                    </Text>
                </View>
            )}

            {/* Show existing location if found */}
            {location && (
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Địa điểm</Text>
                    <View style={styles.locationDisplay}>
                        <Ionicons name="location" size={20} color="#FF678B" />
                        <Text style={styles.locationText}>{location.name}</Text>
                    </View>
                </View>
            )}

            {/* Visibility Selector */}
            <View style={styles.section}>
                <Text style={styles.sectionLabel}>Chế độ hiển thị</Text>
                <TouchableOpacity
                    onPress={() => setShowVisibilityDropdown(!showVisibilityDropdown)}
                    style={styles.visibilitySelector}
                    disabled={isLoading}
                >
                    <Ionicons name="globe-outline" size={20} color="#FF678B" />
                    <Text style={styles.visibilityText}>{visibility}</Text>
                    <Ionicons name="chevron-down" size={20} color="#888" />
                </TouchableOpacity>

                {/* Dropdown */}
                {showVisibilityDropdown && (
                    <View style={styles.dropdown}>
                        {(['PUBLIC', 'PRIVATE', 'FRIENDS'] as const).map(option => (
                            <TouchableOpacity
                                key={option}
                                style={styles.dropdownOption}
                                onPress={() => {
                                    setVisibility(option);
                                    setShowVisibilityDropdown(false);
                                }}
                            >
                                <Text style={[
                                    styles.dropdownOptionText,
                                    visibility === option && styles.dropdownOptionTextSelected
                                ]}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

            {/* Location Display */}
            <View style={styles.section}>
                <Text style={styles.sectionLabel}>Vị trí</Text>
                {isDetectingLocation ? (
                    <View style={styles.locationDisplay}>
                        <ActivityIndicator size="small" color="#FF678B" />
                        <Text style={styles.locationText}>Đang xác định vị trí...</Text>
                    </View>
                ) : location ? (
                    <View style={styles.locationDisplay}>
                        <Ionicons name="location" size={20} color="#FF678B" />
                        <View style={styles.locationTextContainer}>
                            <Text style={styles.locationName}>{location.name}</Text>
                            <Text style={styles.locationAddress}>{location.address}</Text>
                        </View>
                    </View>
                ) : (
                    <TouchableOpacity onPress={detectLocation} style={styles.locationDisplay}>
                        <Ionicons name="refresh" size={20} color="#FF678B" />
                        <Text style={styles.locationText}>Thử lại</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Rating Selector */}
            {location && (
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Đánh giá địa điểm</Text>
                    <View style={styles.ratingContainer}>
                        {[1, 2, 3, 4, 5].map(star => (
                            <TouchableOpacity
                                key={star}
                                onPress={() => handleStarPress(star)}
                                disabled={isLoading}
                            >
                                <Ionicons
                                    name={star <= rating ? "star" : "star-outline"}
                                    size={36}
                                    color="#FFD700"
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}

            {/* Bottom Buttons */}
            <View style={styles.bottomButtonsContainer}>
                <TouchableOpacity
                    onPress={onDraftPress}
                    style={styles.draftButton}
                    disabled={isLoading}
                >
                    <Text style={styles.draftButtonText}>Draft</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onPublishPress}
                    style={[
                        styles.publishButton,
                        isLoading && styles.publishButtonDisabled
                    ]}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                        <Text style={styles.publishButtonText}>Đăng bài</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CreatePostScreen;