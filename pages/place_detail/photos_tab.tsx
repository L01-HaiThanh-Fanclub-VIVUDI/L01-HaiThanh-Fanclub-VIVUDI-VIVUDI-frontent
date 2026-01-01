import { Image } from 'expo-image';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');
const imageWidth = (width - 48) / 3;

const PhotosTabContent = ({ images }: { images: string[] }) => {
    if (images.length === 0) {
        return (
            <View style={photosStyles.emptyContainer}>
                <Text style={photosStyles.emptyText}>Chưa có hình ảnh nào</Text>
            </View>
        );
    }

    return (
        <View style={photosStyles.container}>
            <Text style={photosStyles.title}>Tất cả hình ảnh ({images.length})</Text>
            <View style={photosStyles.gridContainer}>
                {images.map((item, index) => (
                    <View key={`photo-${index}`} style={photosStyles.imageContainer}>
                        <Image
                            source={{ uri: item }}
                            style={photosStyles.image}
                            contentFit="cover"
                            transition={300}
                        />
                    </View>
                ))}
            </View>
        </View>
    );
};

const photosStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1B1E28',
        marginBottom: 12,
        fontFamily: 'SFUISemibold',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 16,
    },
    imageContainer: {
        width: imageWidth,
        height: imageWidth,
        marginRight: 4,
        marginBottom: 4,
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 14,
        color: '#7D848D',
        fontFamily: 'SFUIRegular',
    },
});

export default PhotosTabContent;
