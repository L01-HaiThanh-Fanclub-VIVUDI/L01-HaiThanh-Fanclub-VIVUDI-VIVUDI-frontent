import React, { forwardRef } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Location } from '@/components/ui/marker/types';
import { styles } from './styles';

interface LocationBottomSheetProps {
    location: Location | null;
    snapPoints: (string | number)[];
    onClose: () => void;
}

type Ref = BottomSheet;

const LocationBottomSheet = forwardRef<Ref, LocationBottomSheetProps>(
    ({ location, snapPoints, onClose }, ref) => {
        const renderContent = () => {
           
            if (!location) {
                return null;
            }

            return (
                <>
                    <View style={styles.bsHeader}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.bsTitle}>{location.title}</Text>
                            <Text style={styles.bsLocation}>{location.subtitle}</Text>
                        </View>
                        <Image source={location.image} style={styles.bsAvatar} />
                    </View>

                    <Text style={styles.bsAboutTitle}>About</Text>
                    <Text style={styles.bsAboutText}>
                        Đây là thông tin chi tiết về {location.title}.
                        Bạn có thể thêm mô tả dài ở đây.
                    </Text>
                </>
            );
        };

        return (
            <BottomSheet
                ref={ref}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                onClose={onClose}
                backgroundStyle={styles.bsBackground}
                handleIndicatorStyle={styles.bsHandleBar}
            >
                <View style={styles.bsContentContainer}>
                    {renderContent()}
                </View>
            </BottomSheet>
        );
    }
);

LocationBottomSheet.displayName = 'LocationBottomSheet';

export default LocationBottomSheet;