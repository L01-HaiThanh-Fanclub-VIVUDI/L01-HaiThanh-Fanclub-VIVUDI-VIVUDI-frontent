import React, { FC, JSX, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Image } from 'expo-image'; 
import { useNavigation, useLocalSearchParams } from 'expo-router'; 
import { AppStackNavigation } from '@/settings/navigation/route_params'; 
import { Ionicons, Feather } from '@expo/vector-icons'; 
import { styles } from './styles_2';

export type CreatePostParams = {
    selectedMediaUri?: string[]; 
    mediaType?: 'photo' | 'video'; 
}

const CreatePostScreen: FC = (): JSX.Element => {
    const params = useLocalSearchParams<CreatePostParams>();

    const [selectedMediaUri] = useState(params.selectedMediaUri);
    console.log(params.mediaType);
    
    const navigation = useNavigation<AppStackNavigation>();

    const onCancelPress = () => {
        navigation.goBack(); 
    };

    const onNextPress = () => {
        console.log("Next button pressed!");
    };

    const onDraftPress = () => {
        console.log("Save as Draft button pressed!");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onCancelPress}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onNextPress}>
                    {/* <Text style={styles.nextButtonText}>Next</Text> */}
                </TouchableOpacity>
            </View>

            <View style={styles.previewContainer}>
                {selectedMediaUri?.length ? (
                    <Image
                        source={{ uri: selectedMediaUri[0] }}
                        style={styles.previewImage}
                        contentFit="cover" 
                    />
                ) : (
                    <View style={styles.noMediaPlaceholder}>
                        <Text style={styles.noMediaText}>No Media Selected</Text>
                    </View>
                )}
            </View>

            <TextInput
                style={styles.captionInput}
                placeholder="Thêm chú thích..."
                placeholderTextColor="#A0A0A0"
                multiline
                numberOfLines={4}
            />

            <View style={styles.bottomButtonsContainer}>
                <TouchableOpacity onPress={onDraftPress} style={styles.draftButton}>
                    <Text style={styles.draftButtonText}>Draft</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onNextPress} style={styles.publishButton}>
                    <Text style={styles.publishButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CreatePostScreen;