import React, { useState, useEffect, JSX, FC } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions, Alert, SafeAreaView } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Image } from 'expo-image';
import { styles } from './styles_1';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { AppStackNavigation } from '@/settings/navigation/route_params';
import { PAGE_ID } from '@/settings/navigation/page';

type MediaAsset = MediaLibrary.Asset;

const PAGE_SIZE = 20;

const ImagePickerScreen: FC = (): JSX.Element => {
    const [media, setMedia] = useState<MediaAsset[]>([]);
    const [selectedImages, setSelectedImages] = useState<MediaAsset[]>([]);
    const [endCursor, setEndCursor] = useState<string | null>(null);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<'photo' | 'video'>('photo');
    const navigation = useNavigation<AppStackNavigation>();

    const loadMedia = async (afterCursor: string | null = null, initialLoad: boolean = false, type: 'photo' | 'video' = 'photo') => {
        if (!initialLoad && !hasNextPage) return;

        if (afterCursor === null) {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'We need access to your photo library.');
                return;
            }
        }

        setIsLoading(true);

        const mediaResult = await MediaLibrary.getAssetsAsync({
            mediaType: type === 'photo' ? MediaLibrary.MediaType.photo : MediaLibrary.MediaType.video,
            sortBy: ['creationTime'],
            first: PAGE_SIZE,
            after: afterCursor ?? undefined,
        });

        const newAssets = mediaResult.assets as MediaAsset[];

        const currentIds = new Set(media.map(a => a.id));
        const uniqueNewAssets = newAssets.filter(asset => !currentIds.has(asset.id));
        
        setMedia(prev => [...prev, ...uniqueNewAssets]);
        setEndCursor(mediaResult.endCursor);
        setHasNextPage(mediaResult.hasNextPage);

        setIsLoading(false);
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
        loadMedia(null, true, 'photo');
    }, []);

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
                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle}>Recents</Text>
                </View>
                <TouchableOpacity style={styles.nextButton} onPress={onNextPress}>
                    <Text
                        style={styles.nextButtonText}
                    >
                        Next ({selectedImages.length})
                    </Text>
                </TouchableOpacity>
            </View>

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