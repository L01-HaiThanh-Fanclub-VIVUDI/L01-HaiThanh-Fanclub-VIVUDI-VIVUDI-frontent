/****************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                    *
 ****************************************************************************
 *  File        : Chứa styles sử dụng trong page OnBoard                    *
 *  Author      : Minh Nhat                                                 *
 *  Created     : 17/06/2025                                                *
 *  Updated by  :                                                           *
 *  Modified    :                                                           *
\****************************************************************************/

import { StyleSheet } from 'react-native';

/****************************************************************************
 * Styles                                                                   *
 ****************************************************************************/
export const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    imgContainer: {
        flex: 1,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'flex-start',
        overflow: 'hidden',
    },
    skipBtnWrapper: {
        position: 'absolute',
        left: 12,
        zIndex: 2,
    },
    skipBtn: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 14,
        height: 30,
        width: 46,
        justifyContent: 'center',
        alignItems: 'center',
    },
    skipTxt: {
        color: '#FFF',
        fontSize: 14,
    },
    imageAnimated: {
        flexDirection: 'row',
        height: '100%',
    },
    imageWrapper: {
        height: '100%',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    content: {
        width: '100%',
        alignItems: 'center',
        padding: 20,
    },
    textContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 20,
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        lineHeight: 36,
        fontFamily: 'GeoBT',
        width: 309,
    },
    highlightContainer: {
        position: 'relative',
    },
    highlightText: {
        fontSize: 30,
        lineHeight: 36,
        fontFamily: 'GeoBT',
        marginBottom: -7
    },
    arcLens: {
        position: 'absolute',
        bottom: -17,
    },
    desc: {
        fontSize: 16,
        color: '#7D848D',
        textAlign: 'center',
        lineHeight: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        fontFamily: 'GilMT',
        width: 303,
    },
    dots: {
        marginBottom: 36,
    },
    btn: {
        width: '100%',
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnTxt: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'SFUISemibold',
    },
});