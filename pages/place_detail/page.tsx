import { Post } from '@/models/post.dto';
import { commentService } from '@/services/comment.service';
import { googleDriveService } from '@/services/goole-drive.service';
import { positionService } from '@/services/position.service';
import { postService } from '@/services/post.service';
import { appColors } from '@/settings';
import { AppStackNavigation } from '@/settings/navigation/route_params';
import { calculateDistance } from '@/utils/calculateDistance';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import OverviewTab from './overview_tab';
import PhotosTabContent from './photos_tab';
import ReviewsTabContent from './review_tab';
import { styles } from './styles';
import { IconName, Tab } from './types';

const MAIN_COLOR = appColors.primary;

const PlaceDetailScreen = () => {
    const [tab, setTab] = useState<Tab>('overview');
    const { id } = useLocalSearchParams<{ id: string }>();
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

    const navigation = useNavigation<AppStackNavigation>();
    const [isLoading, setIsLoading] = useState(true);

    const [overViewdata, setOverviewData] = useState({
        name: 'Đang tải...',
        rating: 0,
        reviewCount: 0,
        distance: '...',
        isOpen: false,
        openTime: '...',
        closingTime: '...',
        address: '...',
        mainImageUri: require('@/assets/images/placeholder.png'),
        sideImage1Uri: require('@/assets/images/placeholder.png'),
        sideImage2Uri: require('@/assets/images/placeholder.png'),
    });

    const [reviewData, setReviewData] = useState({
        totalRating: 0.0,
        totalReviews: 0,
        ratingBreakdown: [0, 0, 0, 0, 0],
        reviews: [] as any[],
    });

    const [allImages, setAllImages] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log("fetching", id);
            if (!id) return;
            setIsLoading(true);
            try {
                console.log("noew fetch");
                const [postsResponse, positionResponse] = await Promise.all([
                    postService.getAllPosts(1, 100),
                    positionService.getPositionById(id),
                ]);

                console.log(positionResponse);

                if (positionResponse.data) {
                    const position = positionResponse.data;

                    let distanceText = '...';
                    try {
                        const { status } = await Location.requestForegroundPermissionsAsync();
                        if (status === 'granted') {
                            const location = await Location.getCurrentPositionAsync({});
                            const userLoc = {
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude
                            };
                            setUserLocation(userLoc);

                            const distance = calculateDistance(
                                userLoc.latitude,
                                userLoc.longitude,
                                position.point.coordinates[1],
                                position.point.coordinates[0] 
                            );

                            if (distance < 0.1) {
                                distanceText = '<0.1 km';
                            } else if (distance < 1) {
                                distanceText = `${(distance * 1000).toFixed(0)} m`;
                            } else {
                                distanceText = `${distance.toFixed(1)} km`;
                            }
                        }
                    } catch (error) {
                        console.error('Error getting user location:', error);
                    }

                    setOverviewData(prev => ({
                        ...prev,
                        name: position.name || 'Unknown Location',
                        address: position.address || 'Unknown Address',
                        distance: distanceText,
                    }));
                }

                if (postsResponse?.data?.data) {
                    const posts = postsResponse.data.data;
                    const placePosts = posts.filter((p: Post) => p.location_id === id) || [];

                    console.log("Posts for location", id, placePosts.length);

                    if (placePosts.length > 0) {
                        console.log("Sample post:", JSON.stringify(placePosts[0], null, 2));
                    }

                    const totalRating = placePosts.reduce((acc: number, curr: Post) => acc + (curr.rating || 0), 0);
                    const avgRating = placePosts.length > 0 ? (totalRating / placePosts.length) : 0;

                    const today = new Date();
                    const todayPosts = placePosts.filter((p: Post) => {
                        const date = new Date(p.createdAt);
                        return date.getDate() === today.getDate() &&
                            date.getMonth() === today.getMonth() &&
                            date.getFullYear() === today.getFullYear();
                    });

                    let openTime = '...';
                    let closeTime = '...';
                    let isOpen = false;

                    if (todayPosts.length > 0) {
                        todayPosts.sort((a: Post, b: Post) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                        const firstPost = todayPosts[0];
                        const lastPost = todayPosts[todayPosts.length - 1];

                        const formatTime = (dateStr: string) => {
                            const date = new Date(dateStr);
                            return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
                        };

                        openTime = formatTime(firstPost.createdAt);
                        closeTime = formatTime(lastPost.createdAt);
                        isOpen = true;
                    }

                    const allImages: string[] = [];
                    placePosts.forEach((p: Post) => {
                        if (p.medias && p.medias.length > 0) {
                            p.medias.forEach((m: { url: string }) => {
                                const imageUrl = googleDriveService.getDriveLink(m.url);
                                allImages.push(imageUrl);
                            });
                        }
                    });
                    console.log("Total images found:", allImages.length, allImages);

                    setAllImages(allImages);

                    const allReviews: any[] = [];
                    try {
                        const commentPromises = placePosts.map(p =>
                            commentService.getCommentsByPostId(p.id)
                        );
                        const commentResponses = await Promise.all(commentPromises);

                        commentResponses.forEach((response: any) => {
                            if (response.success && response.data) {
                                allReviews.push(...response.data);
                            }
                        });
                    } catch (error) {
                        console.error("Error fetching comments:", error);
                    }
                    console.log("Total reviews found:", allReviews.length, allReviews);

                    const breakdown = [0, 0, 0, 0, 0];
                    placePosts.forEach((p: Post) => {
                        const r = Math.round(p.rating || 0);
                        if (r >= 1 && r <= 5) {
                            breakdown[5 - r]++;
                        }
                    });


                    setOverviewData(prev => ({
                        ...prev,
                        rating: parseFloat(avgRating.toFixed(1)),
                        reviewCount: placePosts.length,
                        openTime: openTime,
                        closingTime: closeTime,
                        isOpen: isOpen,
                        mainImageUri: allImages.length > 0 ? { uri: allImages[0] } : prev.mainImageUri,
                        sideImage1Uri: allImages.length > 1 ? { uri: allImages[1] } : prev.sideImage1Uri,
                        sideImage2Uri: allImages.length > 2 ? { uri: allImages[2] } : prev.sideImage2Uri,
                    }));

                    setReviewData({
                        totalRating: parseFloat(avgRating.toFixed(1)),
                        totalReviews: placePosts.length,
                        ratingBreakdown: breakdown,
                        reviews: allReviews,
                    });

                }
            } catch (error) {
                console.error("Error fetching place detail:", error);
            } finally {
                console.log("done fetch")
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleTabTap = (tab: Tab) => {
        setTab(tab);
    }

    const handleBackTap = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => handleBackTap()}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <View style={styles.headerRight}>
                    <TouchableOpacity>
                        <Ionicons name="share-outline" size={24} color="#000" style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="ellipsis-vertical" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.infoSection}>
                    <Text style={styles.nameText}>{overViewdata.name}</Text>
                    <View style={styles.ratingRow}>
                        <Text style={styles.ratingText}>{overViewdata.rating}</Text>
                        <MaterialIcons name="star" size={16} color="#F5C300" />
                        <Text style={styles.reviewCountText}> ({overViewdata.reviewCount})</Text>
                        <Text style={styles.dotSeparator}> • </Text>
                        <Ionicons name="information-circle-outline" size={16} color="#888" style={{ marginRight: 4 }} />
                        <Text style={styles.distanceText}>{overViewdata.distance}</Text>
                    </View>
                    <Text style={styles.openStatusText}>
                        <Text style={[styles.openText, { color: overViewdata.isOpen ? '#00C853' : '#D32F2F' }]}>
                            {overViewdata.isOpen ? 'Open' : 'Closed'}
                        </Text>
                        <Text style={styles.closesText}> • Closes {overViewdata.closingTime}</Text>
                    </Text>
                    <Text style={{ fontSize: 14, color: '#666', marginTop: 4, fontFamily: 'SFUIRegular' }}>
                        {overViewdata.address}
                    </Text>
                </View>

                <View style={styles.actionButtonsContainer}>
                    <ActionButton icon="navigate-circle-outline" label="Directions" color={MAIN_COLOR} />
                    <ActionButton icon="call-outline" label="Call" color="#000" />
                    <ActionButton icon="bookmark-outline" label="Save" color="#000" />
                </View>

                <View style={styles.photoGallery}>
                    <Image
                        source={overViewdata.mainImageUri}
                        style={styles.mainImage}
                        contentFit="cover"
                        transition={1000}
                    />
                    <View style={styles.sideImages}>
                        <Image
                            source={overViewdata.sideImage1Uri}
                            style={styles.sideImage}
                            contentFit="cover"
                            transition={1000}
                        />
                        <Image
                            source={overViewdata.sideImage2Uri}
                            style={styles.sideImage}
                            contentFit="cover"
                            transition={1000}
                        />
                    </View>
                </View>

                <View style={styles.tabsContainer}>
                    <TabButton label="Overview" isActive={'overview' === tab} onPress={() => handleTabTap('overview')} />
                    <TabButton label={`Reviews (${reviewData.totalReviews})`} isActive={'review' === tab} onPress={() => handleTabTap('review')} />
                    <TabButton label={`Photos (${allImages.length})`} isActive={'photos' === tab} onPress={() => handleTabTap('photos')} />
                    {/* <TabButton label="About" isActive={'about' === tab} onPress={() => handleTabTap('about')} /> */}
                </View>

                {tab == 'overview' && <OverviewTab data={overViewdata} />}
                {tab == 'review' && <ReviewsTabContent data={reviewData} />}
                {tab == 'photos' && <PhotosTabContent images={allImages} />}

            </ScrollView>
        </SafeAreaView>
    );
};

const ActionButton = ({ icon, label, color }: { icon: IconName, label: string, color: string }) => (
    <TouchableOpacity style={[styles.actionButton, { backgroundColor: color === MAIN_COLOR ? '#FCE8E6' : '#F0F0F0' }]}>
        <Ionicons
            name={icon}
            size={20}
            color={color === MAIN_COLOR ? MAIN_COLOR : '#444'}
            style={{ transform: [{ rotate: label === 'Directions' ? '45deg' : '0deg' }] }}
        />
        <Text style={[styles.actionButtonText, { color: color === MAIN_COLOR ? MAIN_COLOR : '#444' }]}>{label}</Text>
    </TouchableOpacity>
);


const TabButton = ({ label, isActive, onPress }: { label: string, isActive: boolean, onPress: () => void; }) => (
    <TouchableOpacity style={styles.tabButton} onPress={onPress}>
        <Text style={[styles.tabText, isActive && styles.tabActiveText]}>{label}</Text>
        {isActive && <View style={styles.tabActiveIndicator} />}
    </TouchableOpacity>
);

export default PlaceDetailScreen;