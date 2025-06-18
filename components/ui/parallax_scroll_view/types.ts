/****************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                    *
 ****************************************************************************
 *  File        : Chứa types sử dụng trong ParallaxScrollView               *
 *  Author      : Minh Nhat                                                 *
 *  Created     : 14/06/2025                                                *
 *  Updated by  :                                                           *
 *  Modified    :                                                           *
\****************************************************************************/

import { PropsWithChildren } from "react";
import { ViewStyle } from "react-native";

/****************************************************************************
* ParallaxScrollViewProps: Thuộc tính cho component ParallaxScrollView      *
****************************************************************************/
export type ParallaxScrollViewProps = PropsWithChildren<{
    /****************************************************************************
     * Ảnh header hiển thị phía trên cùng                                       *
     ****************************************************************************/
    headerImage: React.ReactElement;
    /****************************************************************************
     * Màu nền header cho chế độ sáng và tối                                    *
     ****************************************************************************/
    headerBackgroundColor: { dark: string; light: string };
    /****************************************************************************
     * Chiều cao header (tuỳ chọn)                                              *
     * @optional                                                                *
     ****************************************************************************/
    headerHeightValue?: number;
    /****************************************************************************
     * Kiểu dáng cho nội dung bên trong ScrollView                              *
     * @optional                                                                *
     ****************************************************************************/
    contentStyle?: ViewStyle;
}>;