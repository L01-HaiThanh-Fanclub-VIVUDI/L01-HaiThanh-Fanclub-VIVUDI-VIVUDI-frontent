import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { styles } from './styles';
import mapCustomStyle from '@/assets/mapCustomStyle.json';
import { useNavigation } from 'expo-router';
import { AppStackNavigation } from '@/settings/navigation/route_params';
import { Feather } from '@expo/vector-icons';
import { Location } from '@/components/ui/marker/types';
import CustomMarkerView, { DUMMY_LOCATIONS } from '@/components/ui/marker';
import BottomSheet from '@gorhom/bottom-sheet';
import LocationBottomSheet from '@/components/ui/bottom_sheet';

const DUMMY_POIS = [
    { id: 'p1', coordinate: { latitude: 10.8080, longitude: 106.7350 }, color: '#3B82F6' },
    { id: 'p2', coordinate: { latitude: 10.7850, longitude: 106.7550 }, color: '#10B981' },
    { id: 'p3', coordinate: { latitude: 10.7900, longitude: 106.7600 }, color: '#3B82F6' },
];

export default function MapScreen() {
    const navigation = useNavigation<AppStackNavigation>();
    const initialRegion = {
        latitude: 10.795,
        longitude: 106.745,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
    };
    const [markerLoaded, setMarkerLoaded] = useState<Record<string, boolean>>({});
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['25%', '60%'], []);

    const handleMarkerPress = useCallback((location: Location) => {
        setSelectedLocation(location);
        bottomSheetRef.current?.snapToIndex(0);
    }, []);

    const handleSheetClose = useCallback(() => {
        setSelectedLocation(null);
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={initialRegion}
                customMapStyle={mapCustomStyle}
                showsUserLocation={true}
                showsPointsOfInterest={false}
            >
                {DUMMY_POIS.map(poi => (
                    <Marker key={poi.id} coordinate={poi.coordinate}>
                        <View style={[styles.poiMarker, { backgroundColor: poi.color }]} />
                    </Marker>
                ))}
                {DUMMY_LOCATIONS.map((location: Location) => (
                    <Marker
                        key={location.id}
                        coordinate={location.coordinate}

                        onPress={() => handleMarkerPress(location)}
                    >
                        <View style={styles.poiMarker} />
                    </Marker>
                ))}

            </MapView>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Feather name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>

            {/* <LocationBottomSheet
                ref={bottomSheetRef}
                location={selectedLocation}
                snapPoints={snapPoints}
                onClose={handleSheetClose}
            /> */}
        </View>
    );
}