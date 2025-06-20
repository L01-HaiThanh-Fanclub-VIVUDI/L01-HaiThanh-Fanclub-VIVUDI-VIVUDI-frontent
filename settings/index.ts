/*****************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                     *
 *****************************************************************************
 *  File        : Thiết lập mặc định cho StackScreen                         *
 *  Author      : Minh Nhat                                                  *
 *  Created     : 07/06/2025                                                 *
 *  Updated by  :                                                            *
 *  Modified    :                                                            *
\*****************************************************************************/

import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

/******************************************************************************
 * Thiết lập mặc định cho các màn hình trong Stack Navigator.                 *
 ******************************************************************************/
export const stackScreenSettings: NativeStackNavigationOptions = {
    headerShown: false,
};

/******************************************************************************
 * Màu sắc ứng dụng, bao gồm màu sáng và tối.                                 *
 * - tintColorLight: Màu chính cho giao diện sáng.                            *
 * - tintColorDark: Màu chính cho giao diện tối.                              *
 ******************************************************************************/
const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

/******************************************************************************
 * colors: Định nghĩa màu sắc cho giao diện sáng và tối.                      *
 * - light: Màu sắc cho giao diện sáng.                                       *
 * - dark: Màu sắc cho giao diện tối.                                         *
 ******************************************************************************/
export const colors = {
    light: {
        text: '#11181C',
        background: '#fff',
        tint: tintColorLight,
        icon: '#687076',
        tabIconDefault: '#687076',
        tabIconSelected: tintColorLight,
    },
    dark: {
        // text: '#ECEDEE',
        // background: '#2E2E2E',
        // tint: tintColorDark,
        // icon: '#9BA1A6',
        // tabIconDefault: '#9BA1A6',
        // tabIconSelected: tintColorDark,
        text: '#11181C',
        background: '#fff',
        tint: tintColorLight,
        icon: '#687076',
        tabIconDefault: '#687076',
        tabIconSelected: tintColorLight,
    },
};

/******************************************************************************
 * Key storage kiểm tra xem có phải lần đầu người dùng load app không         *
 ******************************************************************************/
export const FIRST_LAUNCH_KEY = 'HAS_LAUNCHED_APP';

/******************************************************************************
 * API URL BackEnd                                                            *
 ******************************************************************************/
// export const VIVUDI_API_URL = 'https://api.vivudi.com/v1';a
export const VIVUDI_API_URL = 'http://localhost:5001/api/v1';