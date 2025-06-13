/****************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                    *
 ****************************************************************************
 *  File        : Chứa styles sử dụng trong ParallaxScrollView              *
 *  Author      : Minh Nhat                                                 *
 *  Created     : /06/2025                                                *
 *  Updated by  :                                                           *
 *  Modified    :                                                           *
\****************************************************************************/

import { Dimensions, StyleSheet } from 'react-native';

/****************************************************************************
 * Lấy chiều rộng của app                                                   *
 ****************************************************************************/
const screenWidth = Dimensions.get('window').width;

/******************************************************************************
 * Định nghĩa hằng số cho chiều cao header                                    *
 ******************************************************************************/
export const DEFAULT_HEADER_HEIGHT_VALUE = 350;

/****************************************************************************
 * Styles                                                                   *
 ****************************************************************************/
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 0,
        position: 'relative',
    },
    header: {
        height: DEFAULT_HEADER_HEIGHT_VALUE,
        overflow: 'hidden',
        width: screenWidth,
        position: 'relative',
        zIndex: 1,
    },
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
});