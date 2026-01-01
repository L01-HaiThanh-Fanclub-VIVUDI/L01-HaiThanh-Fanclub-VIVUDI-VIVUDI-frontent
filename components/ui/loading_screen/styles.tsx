/****************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                    *
 ****************************************************************************
 *  File        : Chứa styles sử dụng trong LoadingScreen                   *
 *  Author      : Minh Nhat                                                 *
 *  Created     : 14/06/2025                                                *
 *  Updated by  :                                                           *
 *  Modified    :                                                           *
\****************************************************************************/

import { appColors } from '@/settings';
import { StyleSheet } from 'react-native';

/****************************************************************************
 * Styles                                                                   *
 ****************************************************************************/
export const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 9999,
        elevation: 9999,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    loaderWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
    },
    box: {
        width: 68,
        height: 68,
        backgroundColor: appColors.primary,
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