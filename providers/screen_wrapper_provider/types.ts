/****************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                    *
 ****************************************************************************
 *  File        : Chứa type sử dụng trong ScreenProvider                    *
 *  Author      : Minh Nhat                                                 *
 *  Created     : 02/06/2025                                                *
 *  Updated by  :                                                           *
 *  Modified    :                                                           *
\****************************************************************************/

import { PAGE_ID } from '@/settings/navigation/page';
import { ViewStyle } from 'react-native';

/****************************************************************************
* ScreenWrapperConfig: Cấu hình tuỳ chỉnh cho ScreenWrapper                 *
* - Dùng để lưu trữ các tuỳ chỉnh như style, hành động back, v.v.           *
* - Có thể được sử dụng để thay đổi cấu hình của ScreenWrapper trong ứng    *
*   dụng.                                                                   *
****************************************************************************/
export type ScreenWrapperConfig = {
    /****************************************************************************
     * Style thêm của root container                                            *
     * @optional                                                                *
     ****************************************************************************/
    style?: ViewStyle;
    /****************************************************************************
     * Disable action goback mặc định của React Native                          *
     * @optional                                                                *
     ****************************************************************************/
    disableDefaultGobackAction?: boolean;
    /****************************************************************************
     * Callback khi nhấn nút goback trên UI                                     *
     * @optional                                                                *
     ****************************************************************************/
    handleGoback?: () => void;
    /****************************************************************************
     * Hiển thị tên của màn hình này                                            *
     * @optional                                                                *
     ****************************************************************************/
    showScreenName?: boolean;
    /****************************************************************************
     * Giá trị tìm kiếm hiện tại, dùng để hiển thị trong ô tìm kiếm             *
     * Nếu không có thì sẽ không hiển thị ô tìm kiếm.                           *
     * @optional                                                                *
     ****************************************************************************/
    searchValue?: string;
    /****************************************************************************
     * Hàm set giá trị tìm kiếm, dùng để cập nhật giá trị ô tìm kiếm            *
     * @optional                                                                *
     ****************************************************************************/
    setSearchValue?: (value: string) => void;
    /****************************************************************************
     * Placeholder cho ô tìm kiếm (nếu thoả điều kiện hiển thị                  *
     * @optional                                                                *
     ****************************************************************************/
    searchPlaceholder?: string;
    /****************************************************************************
     * Các button action nằm bên phải của ScreenWrapper.                        *
     * Mỗi button bao gồm một icon và một hàm xử lý khi nhấn.                   *
     * Có thể truyền vào một object hoặc một mảng các object có dạng:           *
     * - `icon`: React.ReactNode - Icon hiển thị cho button.                    *
     * - `onPress`: () => void - Hàm callback khi nhấn button.                  *
     * @optional                                                                *
     ****************************************************************************/
    rightActions?: {
        icon: React.ReactNode;
        onPress: () => void;
    } | {
        icon: React.ReactNode;
        onPress: () => void;
    }[];
};
/****************************************************************************
* ScreenWrapperContextValue: Giá trị của context cho ScreenWrapper          *
* - Cung cấp cấu hình và hàm setConfig để cập nhật cấu hình.                *
* - Được sử dụng trong ScreenWrapperProvider để chia sẻ cấu hình với các    *
*  component con.                                                           *
*****************************************************************************/
export interface ScreenWrapperContextValue {
    config: ScreenWrapperConfig;
    setConfig: (config: ScreenWrapperConfig, screenId: PAGE_ID) => void;
};