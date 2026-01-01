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
import Constants from 'expo-constants';

/******************************************************************************
 * Thiết lập mặc định cho các màn hình trong Stack Navigator.                 *
 ******************************************************************************/
export const stackScreenSettings: NativeStackNavigationOptions = {
    headerShown: false,
};

/******************************************************************************
 * Màu sắc ứng dụng chính - App Colors                                        *
 * Tập trung tất cả màu sắc được sử dụng trong app để dễ quản lý              *
 ******************************************************************************/
export const appColors = {
    // Primary colors
    primary: '#FF678B',           // Màu chính (nút, icon quan trọng)
    secondary: '#24BAEC',         // Màu phụ (active state)

    // Text colors
    textPrimary: '#11181C',       // Text chính
    textSecondary: '#7D848D',     // Text phụ, mờ hơn
    textPlaceholder: '#9CA3AF',   // Placeholder text

    // Background colors
    background: '#FFFFFF',        // Nền chính
    backgroundSecondary: '#F5F5F5', // Nền phụ

    // Status colors
    success: '#10B981',           // Màu thành công
    error: '#EF4444',             // Màu lỗi
    warning: '#F59E0B',           // Màu cảnh báo
    info: '#3B82F6',              // Màu thông tin

    // Border & Divider
    border: '#E0E0E0',            // Border mặc định
    divider: '#F0F0F0',           // Đường phân cách

    // Tab colors
    tabActive: '#24BAEC',         // Tab đang active
    tabInactive: '#7D848D',       // Tab không active
};

/******************************************************************************
 * Màu sắc theo theme (light/dark mode)                                       *
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
        text: appColors.textPrimary,
        background: appColors.background,
        tint: tintColorLight,
        icon: '#687076',
        tabIconDefault: appColors.tabInactive,
        tabIconSelected: appColors.tabActive,
    },
    dark: {
        // Dark mode currently uses same colors as light
        text: appColors.textPrimary,
        background: appColors.background,
        tint: tintColorLight,
        icon: '#687076',
        tabIconDefault: appColors.tabInactive,
        tabIconSelected: appColors.tabActive,
    },
};

/******************************************************************************
 * Key storage kiểm tra xem có phải lần đầu người dùng load app không         *
 ******************************************************************************/
export const FIRST_LAUNCH_KEY = 'HAS_LAUNCHED_APP';

/******************************************************************************
 * Flag cho biết đang là môi trường beta hay product                          *
 ******************************************************************************/
export const FLAG_PRODUCT_VERSION = false; // Chỉnh sửa thành true khi deploy lên môi trường sản phẩm

/******************************************************************************
 * API URL BackEnd                                                            *
 ******************************************************************************/
export const VIVUDI_API_URL = 'http://116.106.47.217:3000';

/******************************************************************************
 * Google Maps API Key                                                       *
 * Dùng cho Directions API, Places API, etc.                                 *
 * Đọc từ .env thông qua app.config.js                                       *
 ******************************************************************************/
export const GOOGLE_MAPS_API_KEY =
    Constants.expoConfig?.android?.config?.googleMaps?.apiKey ||
    Constants.expoConfig?.ios?.config?.googleMapsApiKey ||
    '';