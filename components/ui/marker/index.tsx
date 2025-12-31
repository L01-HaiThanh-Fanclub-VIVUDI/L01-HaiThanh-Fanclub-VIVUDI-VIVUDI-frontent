import React from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from './styles';
import { CustomMarkerViewProps } from './types';

export const DUMMY_LOCATIONS = [
    {
        id: '1',
        name: 'Vinhomes Central Park',
        address: 'Bình Thạnh, TP. Hồ Chí Minh',
        rating: 4.5,
        image: require('@/assets/images/home/vinhomes.png'),
        coordinate: { latitude: 10.8042, longitude: 106.7445 },
    },
    {
        id: '2',
        name: 'Megamall',
        address: 'Quận 2, TP. Hồ Chí Minh',
        rating: 4.2,
        image: require('@/assets/images/home/megamall.png'),
        coordinate: { latitude: 10.7936, longitude: 106.7410 },
    },
];

const CustomMarkerView: React.FC<CustomMarkerViewProps> = ({ location, onViewReady }) => {
    return (
        <View
            style={styles.customMarker}
            collapsable={false}
            onLayout={onViewReady}
        >
            <Image
                source={location.image}
                style={styles.markerImage}
            />
            <View style={styles.markerTextContainer}>
                <Text style={styles.markerTitle}>{location.name}</Text>
                <Text style={styles.markerSubtitle}>{location.address}</Text>
            </View>
        </View>
    );
};

export default CustomMarkerView;