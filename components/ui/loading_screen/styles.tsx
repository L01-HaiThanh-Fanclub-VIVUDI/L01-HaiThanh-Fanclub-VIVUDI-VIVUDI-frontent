/****************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                    *
 ****************************************************************************
 *  File        : Chứa styles sử dụng trong LoadingScreen                   *
 *  Author      : Minh Nhat                                                 *
 *  Created     : 14/06/2025                                                *
 *  Updated by  :                                                           *
 *  Modified    :                                                           *
\****************************************************************************/

import { Dimensions, StyleSheet } from 'react-native';

/****************************************************************************
 * Lấy chiều rộng của app                                                   *
 ****************************************************************************/
const { width, height } = Dimensions.get('window');

/****************************************************************************
 * Styles                                                                   *
 ****************************************************************************/
export const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        zIndex: 9999,
        elevation: 9999,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    loaderWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
    },
    box: {
        width: 68,
        height: 68,
        backgroundColor: '#FF678B',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    shadow: {
        height: 5,
        position: 'absolute',
        bottom: 6,
    },
    logo: {
        width: 50,
        height: 50,
    },
});