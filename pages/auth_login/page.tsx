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
import { Text, useColorScheme } from 'react-native';

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

            <ThemedView style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
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

            <Button style={{ width: '100%', height: 56, backgroundColor: '#FF678B', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }} onTap={() => { }}>
                <Text style={{ color: '#FFFFFF', fontSize: 16, lineHeight: 20, fontFamily: 'SFUISemibold' }}>
                    {t('authentication.signInButton')}
                </Text>
            </Button>

        </ThemedView>
    );
};

export default AuthLoginPage;