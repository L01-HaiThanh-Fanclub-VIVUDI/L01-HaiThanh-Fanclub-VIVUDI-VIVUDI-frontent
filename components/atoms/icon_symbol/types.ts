/****************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                    *
 ****************************************************************************
 *  File        : Chứa types sử dụng trong IconSymbol                       *
 *  Author      : Minh Nhat                                                 *
 *  Created     : 12/06/2025                                                *
 *  Updated by  :                                                           *
 *  Modified    :                                                           *
\****************************************************************************/

import { MaterialIcons } from "@expo/vector-icons";
import { SymbolViewProps, SymbolWeight } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, StyleProp, TextStyle, ViewStyle } from "react-native";

/****************************************************************************
* IconMapping: Map tên SF Symbols sang Material Icons                       *
****************************************************************************/
type IconMapping = Partial<Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>>;

/****************************************************************************
* MAPPING: Bản đồ ánh xạ tên biểu tượng                                     *
****************************************************************************/
export const MAPPING: IconMapping = {
    'house.fill': 'home',
    'paperplane.fill': 'send',
    'chevron.left.forwardslash.chevron.right': 'code',
    'chevron.right': 'chevron-right',
};

/****************************************************************************
* IconSymbolName: Tên biểu tượng hợp lệ                                     *
****************************************************************************/
export type IconSymbolName = keyof typeof MAPPING;

/****************************************************************************
* IconSymbolProps: Thuộc tính cho component IconSymbol                      *
****************************************************************************/
export type IconSymbolProps = {
    /****************************************************************************
     * Tên biểu tượng sẽ được hiển thị                                          *
     ****************************************************************************/
    name: IconSymbolName;
    /****************************************************************************
     * Kích thước của biểu tượng (đơn vị pixel)                                 *
     * @optional                                                                *
     ****************************************************************************/
    size?: number;
    /****************************************************************************
     * Màu sắc của biểu tượng                                                   *
     ****************************************************************************/
    color: string | OpaqueColorValue;
    /****************************************************************************
     * Style tuỳ chỉnh cho biểu tượng                                           *
     * @optional                                                                *
     ****************************************************************************/
    style?: StyleProp<TextStyle>;
    /****************************************************************************
     * Độ đậm của biểu tượng                                                    *
     * @optional                                                                *
     ****************************************************************************/
    weight?: SymbolWeight;
};

/****************************************************************************
* IconSymbolIOSProps: Thuộc tính cho component IconSymbolIOS                *
****************************************************************************/
export type IconSymbolIOSProps = IconSymbolProps & {
    /****************************************************************************
     * Style tuỳ chỉnh cho biểu tượng                                           *
     * @optional                                                                *
     ****************************************************************************/
    style?: StyleProp<ViewStyle>;
};