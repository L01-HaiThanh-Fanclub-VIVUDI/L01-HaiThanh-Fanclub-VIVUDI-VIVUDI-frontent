/****************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                    *
 ****************************************************************************
 *  File        : Chứa styles sử dụng trong ParallaxScrollView              *
 *  Author      : Minh Nhat                                                 *
 *  Created     : /06/2025                                                  *
 *  Updated by  :                                                           *
 *  Modified    :                                                           *
\****************************************************************************/

import { Dimensions, StyleSheet } from 'react-native';

/******************************************************************************
 * Lấy chiều rộng màn hình                                                    *
 ******************************************************************************/
const width = Dimensions.get('window').width;

/****************************************************************************
 * Styles                                                                   *
 ****************************************************************************/
export const styles = StyleSheet.create({
    svg: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginTop: -78,
        width: width,
        overflow: 'hidden',
        position: 'relative'
    },
    bar: {
        position: 'absolute',
        top: 45,
        width: 40,
        left: (width - 40) / 2,
        height: 5,
        borderRadius: 99,
        backgroundColor: "#7D848D",
    }
});