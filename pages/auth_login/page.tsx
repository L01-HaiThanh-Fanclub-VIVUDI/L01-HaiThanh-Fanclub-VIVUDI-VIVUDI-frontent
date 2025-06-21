/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : auth_login/page.tsx                                         *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 17/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import Button from '@/components/atoms/button';
import PasswordInput from '@/components/atoms/regex_input';
import ThemedView from '@/components/atoms/themed_view';
import { useLanguage } from '@/languages/provider';
import { useScreenWrapper } from '@/providers/screen_wrapper_provider';
import { PAGE_ID } from '@/settings/navigation/page';
import { AppStackNavigation } from '@/settings/navigation/route_params';
import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { FC, JSX, useEffect } from 'react';
import { Image, ImageSourcePropType, Text, useColorScheme, View } from 'react-native';

export type SocialButton = {
    /****************************************************************************
     * Khóa định danh duy nhất cho SocialButton                                 *
     ****************************************************************************/
    key: string;
    /****************************************************************************
     * Ảnh hiển thị trên button                                                 *
     ****************************************************************************/
    image: ImageSourcePropType;
};

const SOCIAL_BUTTONS: SocialButton[] = [
    {
        key: 'google',
        image: require('@/assets/images/auth/facebook.webp'),
    },
    {
        key: 'facebook',
        image: require('@/assets/images/auth/instagram.png'),
    },
    {
        key: 'apple',
        image: require('@/assets/images/auth/twitter.webp'),
    },
];

/******************************************************************************
 * AuthLoginPage: Màn hình login của ứng dụng                                 *
 ******************************************************************************/
const AuthLoginPage: FC = (): JSX.Element => {
    /******************************************************************************
     * Lấy theme hiện tại                                                         *
     ******************************************************************************/
    const theme = useColorScheme() ?? 'light';
    const statusBarStyle = theme === 'dark' ? 'light' : 'dark';

    /******************************************************************************
     * Lấy useLanguage                                                            *
     ******************************************************************************/
    const { t } = useLanguage();

    /******************************************************************************
     * State và shared value cho animation                                        *
     ******************************************************************************/
    const { setConfig } = useScreenWrapper();

    /******************************************************************************
     * Lấy navigation                                                             *
     ******************************************************************************/
    const navigation = useNavigation<AppStackNavigation>();

    /******************************************************************************
     * handleGoback: hàm override nút go back trên header                         *
     ******************************************************************************/
    const handleGoback = () => {
        navigation.replace(PAGE_ID.ON_BOARD);
    };

    /******************************************************************************
     * Thiết lập cấu hình màn hình khi mount                                      *
     ******************************************************************************/
    useEffect(() => {
        setConfig({
            disableDefaultGobackAction: true,
            handleGoback: handleGoback,
        }, PAGE_ID.AUTH_LOGIN);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /******************************************************************************
     * Render component                                                           *
     ******************************************************************************/
    return (
        <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* StatusBar với style phù hợp */}
            <StatusBar style={statusBarStyle} />

            <ThemedView style={{ flex: 1, width: '100%', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
                <ThemedView style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <ThemedView style={{ width: '100%', alignItems: 'center', marginBottom: 16 }}>
                        <Text style={{ color: '#1B1E28', fontSize: 26, lineHeight: 34, fontFamily: 'SFUISemibold' }}>
                            {t('authentication.signInTitle')}
                        </Text>
                    </ThemedView>

                    <ThemedView style={{ width: '100%', alignItems: 'center' }}>
                        <Text style={{ color: '#7D848D', fontSize: 16, lineHeight: 20, fontFamily: 'SFUISemibold' }}>
                            {t('authentication.signInSubtitle')}
                        </Text>
                    </ThemedView>
                </ThemedView>

                <PasswordInput
                    style={{ width: '100%', marginBottom: 24 }}
                    regexChecks={['email']}
                    placeholder='example@gmail.com'
                    inputName={t('authentication.emailField')}
                />

                <PasswordInput
                    style={{ width: '100%', marginBottom: 16 }}
                    placeholder={t('authentication.passwordPlaceholder')}
                    inputName={t('authentication.passwordField')}
                    regexChecks={['length', 'upper', 'lower', 'digit', 'special', 'noWhitespace']}
                    inputType="password"
                />

                <ThemedView style={{ width: '100%', alignItems: 'flex-end' }}>
                    <Text style={{ color: '#FF7029', fontSize: 14, lineHeight: 16, fontFamily: 'SFUISemibold' }}>
                        {t('authentication.forgotPassword')}?
                    </Text>
                </ThemedView>
            </ThemedView>

            <ThemedView style={{ width: '100%', padding: 20, paddingTop: 40 }}>
                <Button style={{ width: '100%', height: 56, backgroundColor: '#FF678B', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }} onTap={() => { }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 16, lineHeight: 20, fontFamily: 'SFUISemibold' }}>
                        {t('authentication.signInButton')}
                    </Text>
                </Button>

                <ThemedView style={{ width: '100%', marginTop: 40, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 4 }}>
                    <Text style={{ color: '#707B81', fontSize: 14, lineHeight: 16, fontFamily: 'SFUISemibold' }}>
                        {t('authentication.dontHaveAccount')}
                    </Text>
                    <Text style={{ color: '#FF7029', fontSize: 14, lineHeight: 16, fontFamily: 'SFUISemibold' }}>
                        {t('authentication.signUpButton')}
                    </Text>
                </ThemedView>

                <ThemedView style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 3 }}>
                    <View style={{ backgroundColor: '#707B8170', height: 2, width: 8, borderRadius: 99, marginTop: 3 }} />

                    <Text style={{ color: '#707B8170', fontSize: 14, lineHeight: 16, fontFamily: 'SFUISemibold' }}>
                        {t('authentication.connectMessage')}
                    </Text>

                    <View style={{ backgroundColor: '#707B8170', height: 2, width: 8, borderRadius: 99, marginTop: 3 }} />
                </ThemedView>

                <ThemedView style={{ marginTop: 36, alignItems: 'center', height: 44, justifyContent: 'center', width: '100%', flexDirection: 'row', gap: 20 }}>
                    {SOCIAL_BUTTONS.map((button) => (
                        <Button
                            key={button.key}
                            style={{ width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' }}
                            onTap={() => { }}
                        >
                            <Image
                                source={button.image}
                                style={{ width: '100%', height: '100%' }}
                                resizeMode="cover"
                            />
                        </Button>
                    ))}
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
};

export default AuthLoginPage;