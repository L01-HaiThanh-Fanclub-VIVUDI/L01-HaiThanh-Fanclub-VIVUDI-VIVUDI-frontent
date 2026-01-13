import { PAGE_ID } from '@/settings/navigation/page';
import { AppStackNavigation } from '@/settings/navigation/route_params';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from 'expo-router';
import React, { FC, JSX, useEffect, useState } from 'react';
import { Alert, FlatList, Linking, Modal, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles_1';

type MediaAsset = MediaLibrary.Asset;
type Album = MediaLibrary.Album;

const PAGE_SIZE = 20;

const ImagePickerScreen: FC = (): JSX.Element => {
    const [media, setMedia] = useState<MediaAsset[]>([]);
    const [selectedImages, setSelectedImages] = useState<MediaAsset[]>([]);
    const [endCursor, setEndCursor] = useState<string | null>(null);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<'photo' | 'video'>('photo');
    const [albums, setAlbums] = useState<Album[]>([]);
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    const [showAlbumPicker, setShowAlbumPicker] = useState<boolean>(false);
    const navigation = useNavigation<AppStackNavigation>();

    const loadAlbums = async () => {
        try {
            console.log('--- Bắt đầu kiểm tra quyền ---');

            // 1. Kiểm tra trạng thái quyền hiện tại
            let { status, canAskAgain } = await MediaLibrary.getPermissionsAsync();
            console.log('Trạng thái quyền ban đầu:', status);

            // 2. Nếu chưa từng hỏi (undetermined) hoặc bị từ chối mà vẫn hỏi lại được -> thì hỏi lại
            if (status === 'undetermined' || (status === 'denied' && canAskAgain)) {
                console.log('Đang hiện popup xin quyền...');
                const newPermission = await MediaLibrary.requestPermissionsAsync();
                status = newPermission.status;
            }

            console.log('Trạng thái quyền sau khi hỏi:', status);

            // 3. Nếu vẫn không được cấp quyền -> Dừng ngay, KHÔNG gọi getAlbumsAsync
            if (status !== 'granted') {
                console.log('Quyền bị từ chối. Không thể tải album.');
                Alert.alert(
                    "Cần quyền truy cập",
                    "Ứng dụng cần quyền truy cập thư viện ảnh để hoạt động. Vui lòng vào Cài đặt để cấp quyền.",
                    [
                        { text: "Để sau", style: "cancel" },
                        {
                            text: "Mở Cài đặt",
                            onPress: () => {
                                // Mở cài đặt app để user tự bật
                                MediaLibrary.presentPermissionsPickerAsync().catch(() => {
                                    // Fallback cho Android nếu hàm trên không chạy
                                    Linking.openSettings();
                                });
                            }
                        }
                    ]
                );
                return;
            }

            // 4. Chỉ chạy xuống đây khi đã có quyền (granted)
            console.log('Đã có quyền, đang tải danh sách albums...');
            const albumsList = await MediaLibrary.getAlbumsAsync({
                includeSmartAlbums: false,
            });

            console.log('Tìm thấy:', albumsList.length, 'albums');
            setAlbums(albumsList);

            if (!selectedAlbum && albumsList.length > 0) {
                setSelectedAlbum(albumsList[0]);
            }
        } catch (error) {
            console.error('Lỗi khi tải albums:', error);
            Alert.alert("Lỗi", "Không thể tải danh sách Album: " + error);
        }
    };

    const loadMedia = async (
        afterCursor: string | null = null,
        initialLoad = false,
        type: 'photo' | 'video' = 'photo'
    ) => {
        if (!initialLoad && !hasNextPage) return;

        const permission = await MediaLibrary.requestPermissionsAsync(true);

        console.log('Media permission:', permission);

        if (!permission.granted) {
            Alert.alert(
                'Permission required',
                'Please allow full access to photos'
            );
            return;
        }

        if (!selectedAlbum) {
            Alert.alert('Chưa chọn album', 'Vui lòng chọn album để xem ảnh');
            return;
        }

        setIsLoading(true);

        try {
            console.log('Loading from album:', selectedAlbum.title);

            const res = await MediaLibrary.getAssetsAsync({
                album: selectedAlbum,
                mediaType:
                    type === 'photo'
                        ? MediaLibrary.MediaType.photo
                        : MediaLibrary.MediaType.video,

                first: PAGE_SIZE,
                after: afterCursor ?? undefined,

                sortBy: [MediaLibrary.SortBy.creationTime],

            });

            console.log(`Loaded ${res.assets.length} ${type}s from ${selectedAlbum.title}, hasNextPage: ${res.hasNextPage}, totalCount: ${res.totalCount}`);

            const sortedAssets = res.assets.sort((a, b) => {
                const isAJpeg = a.filename.toLowerCase().endsWith('.jpeg') || a.filename.toLowerCase().endsWith('.jpg');
                const isBJpeg = b.filename.toLowerCase().endsWith('.jpeg') || b.filename.toLowerCase().endsWith('.jpg');

                if (isAJpeg && !isBJpeg) return -1;
                if (!isAJpeg && isBJpeg) return 1;

                return b.creationTime - a.creationTime;
            });

            setMedia(prev =>
                initialLoad ? sortedAssets : [...prev, ...sortedAssets]
            );

            setEndCursor(res.endCursor ?? null);
            setHasNextPage(res.hasNextPage);
        } catch (error) {
            console.error('Error loading media:', error);
            Alert.alert('Lỗi', 'Không thể tải ảnh');
        } finally {
            setIsLoading(false);
        }
    };



    const handleSelectImage = (image: MediaAsset) => {
        const isSelected = selectedImages.some(item => item.id === image.id);

        if (isSelected) {
            setSelectedImages(prev => prev.filter(item => item.id !== image.id));
        } else {
            setSelectedImages(prev => [...prev, image]);
        }
    };

    const isImageSelected = (image: MediaAsset) => {
        return selectedImages.some(item => item.id === image.id);
    };

    const handleTabChange = (newTab: 'photo' | 'video') => {
        if (activeTab === newTab) return;

        setMedia([]);
        setEndCursor(null);
        setHasNextPage(true);
        setSelectedImages([]);

        setActiveTab(newTab);

        loadMedia(null, true, newTab);
    };

    const handleLoadMore = () => {
        if (!isLoading && hasNextPage && endCursor) {
            loadMedia(endCursor);
        }
    };

    const onBackPress = () => {
        navigation.goBack();
    }

    const onNextPress = () => {
        navigation.navigate(PAGE_ID.NEW_REEL_TABS, {
            screen: PAGE_ID.CONTENT,
            params: {
                selectedMediaUri: selectedImages.map(asset => asset.uri),
                mediaType: activeTab,
            }
        });
    }

    useEffect(() => {
        loadAlbums();
    }, []);

    useEffect(() => {
        if (selectedAlbum) {
            setMedia([]);
            setEndCursor(null);
            setHasNextPage(true);
            loadMedia(null, true, activeTab);
        }
    }, [selectedAlbum]);

    const renderGridItem = ({ item }: { item: MediaAsset }) => {
        const isSelected = isImageSelected(item);

        return (
            <TouchableOpacity
                style={styles.gridItem}
                onPress={() => handleSelectImage(item)}
            >
                <Image
                    source={{ uri: item.uri }}
                    style={styles.gridImage}
                    placeholder={item.uri}
                    transition={100}
                />

                {isSelected && <View style={styles.selectedOverlay} />}

                {isSelected && (
                    <View style={styles.selectedCheckmarkContainer}>
                        <Text style={styles.selectedCheckmarkText}>
                            {selectedImages.findIndex(i => i.id === item.id) + 1}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    const renderSelectedThumbnail = ({ item, index }: { item: MediaAsset, index: number }) => {
        return (
            <View style={styles.selectedThumbnailWrapper}>
                <Image
                    source={{ uri: item.uri }}
                    style={styles.selectedThumbnailImage}
                    contentFit="cover"
                />
                <View style={styles.selectedNumberContainer}>
                    <Text style={styles.selectedNumberText}>{index + 1}</Text>
                </View>
                {item.mediaType === 'video' && (
                    <View style={styles.videoOverlay}>
                        <Feather name="video" size={14} color="#FFF" />
                    </View>
                )}
            </View>
        );
    };

    const renderFooter = () => {
        if (!isLoading) return null;
        return (
            <View style={{ paddingVertical: 20 }}>
                <Text style={{ textAlign: 'center', color: '#888' }}>Loading more...</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBackPress}>
                    <Text style={styles.headerButton}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.headerCenter}
                    onPress={() => setShowAlbumPicker(true)}
                >
                    <Text style={styles.headerTitle}>
                        {selectedAlbum?.title || 'Select Album'}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextButton} onPress={onNextPress}>
                    <Text
                        style={styles.nextButtonText}
                    >
                        Next ({selectedImages.length})
                    </Text>
                </TouchableOpacity>
            </View>

            <Modal
                visible={showAlbumPicker}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowAlbumPicker(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Album</Text>
                            <TouchableOpacity onPress={() => setShowAlbumPicker(false)}>
                                <Ionicons name="close" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={albums}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.albumItem,
                                        selectedAlbum?.id === item.id && styles.albumItemSelected
                                    ]}
                                    onPress={() => {
                                        setSelectedAlbum(item);
                                        setShowAlbumPicker(false);
                                    }}
                                >
                                    <Text style={styles.albumTitle}>{item.title}</Text>
                                    <Text style={styles.albumCount}>{item.assetCount} items</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>

            <View style={styles.previewContainer}>
                {selectedImages.length > 0 ? (
                    <FlatList
                        data={selectedImages}
                        renderItem={renderSelectedThumbnail}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.selectedMediaList}
                        contentContainerStyle={styles.selectedMediaListContent}
                    />
                ) : (
                    <View style={styles.noMediaPlaceholder}>
                        <Text style={styles.noMediaText}>Select images or videos below</Text>
                    </View>
                )}
            </View>

            <FlatList
                data={media}
                renderItem={renderGridItem}
                keyExtractor={(item) => item.id}
                numColumns={4}
                style={styles.gridContainer}

                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
            />

            <View style={styles.bottomTabs}>
                <TouchableOpacity onPress={() => handleTabChange('photo')}>
                    <Text style={[styles.tabText, activeTab === 'photo' && styles.tabActive]}>Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabChange('video')}>
                    <Text style={[styles.tabText, activeTab === 'video' && styles.tabActive]}>Video</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ImagePickerScreen;