/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : Chứa các provider dùng cho toàn bộ ứng dụng                 *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 31/05/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import { useColorScheme } from '@/hooks/useColorScheme';
import { AppLanguageProvider } from '@/languages/provider';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LoadingProvider } from './loading_provider';
import { ScreenWrapperProvider } from './screen_wrapper_provider';
import { ProviderEntry, ProviderProps } from './types';

/******************************************************************************
 * ProviderInjection: Bọc các provider cho toàn bộ ứng dụng.                  *
 * - SafeAreaProvider: Đảm bảo vùng an toàn cho thiết bị.                     *
 * - ThemeProvider: Cung cấp theme sáng/tối dựa vào hệ thống.                 *
 ******************************************************************************/
export const ProviderInjection = ({ children }: ProviderProps) => {
    const colorScheme = useColorScheme();

    /**************************************************************************
     * Danh sách các provider sẽ được bọc.                                    *
     * Có thể thêm các provider khác nếu cần thiết.                           *
     *************************************************************************/
    const providers: ProviderEntry[] = [
        {
            provider: SafeAreaProvider,
        },
        {
            provider: ThemeProvider,
            props: {
                value: colorScheme === 'dark' ? DarkTheme : DefaultTheme,
            },
        },
        {
            provider: AppLanguageProvider,
        },
        {
            provider: GestureHandlerRootView,
        },
        {
            provider: ScreenWrapperProvider,
        },
        {
            provider: LoadingProvider,
        }
        // Thêm các provider khác nếu cần
    ];

    /**************************************************************************
     * Hàm wrapProviders: Bọc các provider từ ngoài vào trong.                *
     * @param children Các component con sẽ được bọc bởi các provider.        *
     *************************************************************************/
    const wrapProviders = (children: React.ReactNode) =>
        providers.reduceRight((acc, { provider: Provider, props }) => {
            return <Provider {...(props || {})}>{acc}</Provider>;
        }, children);

    return wrapProviders(children);
};