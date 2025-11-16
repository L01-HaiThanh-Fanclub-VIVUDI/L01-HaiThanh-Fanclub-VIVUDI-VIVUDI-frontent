import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FC, JSX, useCallback, useState } from 'react';
import { styles } from './styles';
import { Feather } from '@expo/vector-icons';
import { Stack, useNavigation } from 'expo-router';
import ThemedView from '@/components/atoms/themed_view';
import { useLoading } from '@/providers/loading_provider';

const EditProfilePage: FC = (): JSX.Element => {
    const [firstName, setFirstName] = useState('Leonardo');
    const [lastName, setLastName] = useState('Ahmed');
    const [location, setLocation] = useState('Sylhet Bangladesh');
    const [mobile, setMobile] = useState('01758-000666');
    const [countryCode, setCountryCode] = useState('+88');

    const { show, hide } = useLoading();
    const navigation = useNavigation();

    const handleSaveProfile = useCallback(async () => {
        show();

        const profileData = { firstName, lastName, location, mobile, countryCode };

        await new Promise(resolve => setTimeout(resolve, 2000));

        hide();
    }, [firstName, lastName, location, mobile, countryCode, show, hide, navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <ThemedView style={styles.headerContainer}>
                    <View style={styles.sideContainer} >
                        <Text style={[styles.title, , styles.leftHeader]}>
                            Done
                        </Text>
                    </View>

                    <ThemedView style={styles.titleContainer}>
                        <Text style={styles.title}>
                            Profile
                        </Text>
                    </ThemedView>
                    <View style={[styles.sideContainer, styles.rightContainer]}>
                        <TouchableOpacity onPress={handleSaveProfile}>
                            <Text style={styles.doneButton}>
                                Done
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ThemedView>

                <ThemedView style={styles.avatarSection}>
                    <View style={styles.avatarWrapper}>
                        <Image
                            source={require('@/assets/images/home/avatar.png')}
                            style={styles.avatar}
                        />
                    </View>
                    <Text style={styles.username}>Leonardo</Text>
                    <TouchableOpacity>
                        <Text style={styles.changePictureText}>Change Profile Picture</Text>
                    </TouchableOpacity>
                </ThemedView>

                <ThemedView style={styles.formSection}>
                    <Text style={styles.label}>First Name</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.inputText, { flex: 1 }]}
                            value={firstName}
                            onChangeText={setFirstName}
                            placeholder="Nhập họ"
                        />
                    </View>

                    <Text style={styles.label}>Last Name</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.inputText, { flex: 1 }]}
                            value={lastName}
                            onChangeText={setLastName}
                            placeholder="Nhập tên"
                        />
                    </View>

                    <Text style={styles.label}>Location</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.inputText, { flex: 1 }]}
                            value={location}
                            onChangeText={setLocation}
                            placeholder="Nhập địa chỉ"
                        />
                    </View>

                    <Text style={styles.label}>Mobile Number</Text>
                    <View style={styles.inputContainer}>
                        <View style={[styles.mobileRow, { flex: 1 }]}>
                            <View style={styles.countryCode}>
                                <TextInput
                                    style={styles.inputText}
                                    value={countryCode}
                                    onChangeText={setCountryCode}
                                    keyboardType="phone-pad"
                                />
                                <Feather name="chevron-down" size={20} color="#1B1E28" />
                            </View>
                            <TextInput
                                style={[styles.inputText, { flex: 1, marginLeft: 10 }]}
                                value={mobile}
                                onChangeText={setMobile}
                                keyboardType="phone-pad"
                                placeholder="Nhập số điện thoại"
                            />
                        </View>
                    </View>
                </ThemedView>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditProfilePage;