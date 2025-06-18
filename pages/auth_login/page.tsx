/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : auth_login/page.tsx                                         *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 17/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import ThemedView from '@/components/atoms/themed_view';
import { useScreenWrapper } from '@/providers/screen_wrapper_provider';
import { PAGE_ID } from '@/settings/navigation/page';
import { AppStackNavigation } from '@/settings/navigation/route_params';
import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { FC, JSX, useEffect } from 'react';
import { useColorScheme } from 'react-native';

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
     * State và shared value cho animation                                        *
     ******************************************************************************/
    const { screenId, setConfig } = useScreenWrapper();

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
        if (screenId === PAGE_ID.AUTH_LOGIN) {
            setConfig({
                disableDefaultGobackAction: true,
                handleGoback: handleGoback,
            }, PAGE_ID.AUTH_LOGIN);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenId]);

    /******************************************************************************
     * Render component                                                           *
     ******************************************************************************/
    return (
        <ThemedView style={{ flex: 1 }}>
            {/* StatusBar với style phù hợp */}
            <StatusBar style={statusBarStyle} />
        </ThemedView>
    );
};

export default AuthLoginPage;