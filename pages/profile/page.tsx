import ThemedView from '@/components/atoms/themed_view';
import { useLoading } from '@/providers/loading_provider';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useNavigation } from 'expo-router';
import { FC, JSX, useCallback, useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

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

    const handleLogout = useCallback(async () => {
        Alert.alert(
            'Đăng xuất',
            'Bạn có chắc chắn muốn đăng xuất?',
            [
                { text: 'Hủy', style: 'cancel' },
                {
                    text: 'Đăng xuất',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            show();
                            await AsyncStorage.removeItem('auth_token');
                            console.log('Logged out - token removed');

                            router.replace('/(auth)/login');
                        } catch (error) {
                            console.error('Logout error:', error);
                            Alert.alert('Lỗi', 'Không thể đăng xuất');
                        } finally {
                            hide();
                        }
                    }
                }
            ]
        );
    }, [show, hide]);

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

                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={handleLogout}
                    >
                        <Feather name="log-out" size={20} color="#FF3B30" />
                        <Text style={styles.logoutText}>Đăng xuất</Text>
                    </TouchableOpacity>
                </ThemedView>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditProfilePage;