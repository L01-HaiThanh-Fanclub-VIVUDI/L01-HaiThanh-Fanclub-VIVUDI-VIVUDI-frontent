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
    const [isLoading, setIsLoading] = useState(false);
    const [showVisibilityDropdown, setShowVisibilityDropdown] = useState(false);
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

            // Find nearby positions from backend (within 5km radius)
            const response = await positionService.getNearbyPositions(longitude, latitude, 5000);

            if (response.success && response.data && response.data.length > 0) {
                // Use the closest location
                setLocation(response.data[0]);
            } else {
                Alert.alert('Thông báo', 'Không tìm thấy địa điểm gần đây');
            }
        } catch (error) {
            console.error('Location detection error:', error);
            Alert.alert('Lỗi', 'Không thể xác định vị trí');
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

        if (!location) {
            Alert.alert('Lỗi', 'Không thể xác định vị trí. Vui lòng thử lại');
            return;
        }

        setIsLoading(true);

        try {
            // Prepare post data
            const postData: CreatePostRequest = {
                content: caption.trim(),
                location_id: location.id,
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