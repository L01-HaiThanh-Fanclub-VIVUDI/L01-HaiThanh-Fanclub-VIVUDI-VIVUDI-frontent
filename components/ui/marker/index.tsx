import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import { CustomMarkerViewProps } from './types';

export const DUMMY_LOCATIONS = [
    {
        id: '1',
        title: 'Vinhomes',
        subtitle: '2.09 mi',
        image: require('@/assets/images/home/vinhomes.png'),
        coordinate: { latitude: 10.8042, longitude: 106.7445 },
    },
    {
        id: '2',
        title: 'Megamall',
        subtitle: '2.09 mi',
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
                <Text style={styles.markerTitle}>{location.title}</Text>
                <Text style={styles.markerSubtitle}>{location.subtitle}</Text>
            </View>
        </View>
    );
};

export default CustomMarkerView;