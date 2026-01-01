import { AppStackNavigation } from '@/settings/navigation/route_params';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import OverviewTab from './overview_tab';
import ReviewsTabContent from './review_tab';
import { styles } from './styles';
import { IconName, Tab } from './types';

const MAIN_COLOR = '#FF678B';

const PlaceDetailScreen = () => {
    const [tab, setTab] = useState<Tab>('overview');
    const navigation = useNavigation<AppStackNavigation>();
    const overViewdata = {
        name: 'Vinhomes',
        rating: 4.7,
        reviewCount: 2498,
        distance: '45 min',
        isOpen: true,
        closingTime: '21:00',
        address: 'Lagastigsatan 65, 287 31 Stromsnasbruk, Sweden',

        mainImageUri: require('@/assets/images/home/vinhomes.png'),
        sideImage1Uri: require('@/assets/images/home/vinhomes.png'),
        sideImage2Uri: require('@/assets/images/home/vinhomes.png'),
    };

    const reviewData = {
        totalRating: 5.0,
        totalReviews: 5,
        ratingBreakdown: [100, 0, 0, 0, 0],

        sampleReview: {
            name: 'Mike',
            bio: 'Lives for a sunset',
            rating: 4,
            date: '4 years ago',
            tags: 'Matching boxers | Wonder Junkie',
            body: "When your daughter is an 11, your biggest risk is that her partner in life will hold her back. I realized quickly that Cory may not hold her back too badly, but over these past 4 years I have come to see Cory is her perfect balance. I love how he balances ambition",
        }
    };

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
                        <Text style={styles.openText}>Open</Text>
                        <Text style={styles.closesText}> • Closes {overViewdata.closingTime}</Text>
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
                    />
                    <View style={styles.sideImages}>
                        <Image
                            source={overViewdata.sideImage1Uri}
                            style={styles.sideImage}
                            contentFit="cover"
                        />
                        <Image
                            source={overViewdata.sideImage2Uri}
                            style={styles.sideImage}
                            contentFit="cover"
                        />
                    </View>
                </View>

                <View style={styles.tabsContainer}>
                    <TabButton label="Overview" isActive={'overview' === tab} onPress={() => handleTabTap('overview')} />
                    <TabButton label="Reviews" isActive={'review' === tab} onPress={() => handleTabTap('review')} />
                    <TabButton label="Photos" isActive={'photos' === tab} onPress={() => handleTabTap('photos')} />
                    <TabButton label="About" isActive={'about' === tab} onPress={() => handleTabTap('about')} />
                </View>

                {tab == 'overview' && <OverviewTab data={overViewdata} />}
                {tab == 'review' && <ReviewsTabContent data={reviewData} />}

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