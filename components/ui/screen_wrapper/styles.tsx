/****************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                    *
 ****************************************************************************
 *  File        : Chứa styles sử dụng trong ScreenWrapper                   *
 *  Author      : Minh Nhat                                                 *
 *  Created     : 01/06/2025                                                *
 *  Updated by  :                                                           *
 *  Modified    :                                                           *
\****************************************************************************/

import { Dimensions, StyleSheet } from 'react-native';

/****************************************************************************
 * Lấy chiều rộng của app                                                   *
 ****************************************************************************/
const screenWidth = Dimensions.get('window').width;

/****************************************************************************
 * Styles                                                                   *
 ****************************************************************************/
export const styles = StyleSheet.create({
    root: {
        flex: 1,
        zIndex: 0,
        position: 'relative',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
        marginTop: 10,
        backgroundColor: 'transparent',
        position: 'absolute',
        width: screenWidth,
        left: 0,
        zIndex: 1,
        padding: 5,
        paddingHorizontal: 15,
    },
    backButtonContainer: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F7F9',
        borderRadius: 99,
    },
    actionButton: {
        height: 40,
        width: 40,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    screenTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#111827',
        flex: 1,
        textAlign: 'center',
    },
    screenTitleWithTwoActions: {
        paddingLeft: 5
    },
    screenTitleWithRightAction: {
        textAlign: 'left'
    },
    screenTitleWithBack: {
        marginLeft: -5, textAlign: 'left'
    },
    contentContainer: {
        flex: 1
    },
    bottomBorder: {
        borderBottomWidth: 1,
        borderColor: '#eee',
        paddingBottom: 10,
    },
});