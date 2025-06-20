/****************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                    *
 ****************************************************************************
 *  File        : Chứa styles sử dụng trong RegexInput                      *
 *  Author      : Minh Nhat                                                 *
 *  Created     : 20/06/2025                                                *
 *  Updated by  :                                                           *
 *  Modified    :                                                           *
\****************************************************************************/

import { Dimensions, StyleSheet } from 'react-native';

/****************************************************************************
 * Lấy chiều rộng, dài của app                                              *
 ****************************************************************************/
const { width, height } = Dimensions.get('window');

/****************************************************************************
 * Styles                                                                   *
 ****************************************************************************/
export const styles = StyleSheet.create({
    inputContainer: {
        position: 'relative',
        backgroundColor: '#F7F7F9',
        borderRadius: 14,
        height: 56,
    },
    input: {
        borderRadius: 14,
        fontSize: 16,
        backgroundColor: 'transparent',
        paddingHorizontal: 16,
        paddingTop: 12,
        lineHeight: 20,
        fontFamily: 'SFUISemibold',
        height: 56,
        color: '#1B1E28',
    },
    blurOverlay: {
        ...StyleSheet.absoluteFillObject,
        top: 0,
        left: 0,
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 2,
    },
    checklist: {
        position: 'absolute',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 14,
        zIndex: 4,
    },
    checkTitle: {
        fontWeight: '600',
        marginBottom: 6
    },
    checkItem: {
        fontSize: 14,
        color: '#555',
        marginVertical: 2
    },
    pass: {
        color: '#28a745',
        fontWeight: '600'
    },
    errorMessage: {
        color: '#dc3545',
        fontSize: 14,
        fontWeight: '600',
        marginTop: 8,
        textAlign: 'center',
    },
    passwordEye: {
        position: 'absolute',
        right: 1,
        top: 2,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    passwordEyeButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
});