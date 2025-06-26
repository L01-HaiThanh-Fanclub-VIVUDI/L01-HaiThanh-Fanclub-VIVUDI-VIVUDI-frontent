/****************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                    *
 ****************************************************************************
 *  File        : Chứa styles sử dụng trong AuthLoginPage                   *
 *  Author      : Minh Nhat                                                 *
 *  Created     : 20/06/2025                                                *
 *  Updated by  :                                                           *
 *  Modified    :                                                           *
\****************************************************************************/

import { StyleSheet } from 'react-native';

/****************************************************************************
 * Styles                                                                   *
 ****************************************************************************/
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    headerContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        color: '#1B1E28',
        fontSize: 26,
        lineHeight: 34,
        fontFamily: 'SFUISemibold',
    },
    subtitleContainer: {
        width: '100%',
        alignItems: 'center',
    },
    subtitle: {
        color: '#7D848D',
        fontSize: 16,
        lineHeight: 20,
        fontFamily: 'SFUISemibold',
    },
    input: {
        width: '100%',
        marginBottom: 24,
    },
    passwordInput: {
        width: '100%',
        marginBottom: 16,
    },
    forgotPasswordContainer: {
        width: '100%',
        alignItems: 'flex-end',
    },
    forgotPassword: {
        color: '#FF7029',
        fontSize: 14,
        lineHeight: 16,
        fontFamily: 'SFUISemibold',
    },
    footerContainer: {
        width: '100%',
        padding: 20,
        paddingTop: 40,
    },
    signInButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#FF678B',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signInButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        lineHeight: 20,
        fontFamily: 'SFUISemibold',
    },
    signUpRow: {
        width: '100%',
        marginTop: 40,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 4,
    },
    signUpText: {
        color: '#707B81',
        fontSize: 14,
        lineHeight: 16,
        fontFamily: 'SFUISemibold',
    },
    signUpButton: {
        color: '#FF7029',
        fontSize: 14,
        lineHeight: 16,
        fontFamily: 'SFUISemibold',
    },
    connectRow: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 3,
    },
    connectLine: {
        backgroundColor: '#707B8170',
        height: 1,
        width: 8,
        borderRadius: 99,
        marginTop: 3,
    },
    connectText: {
        color: '#707B8170',
        fontSize: 14,
        lineHeight: 16,
        fontFamily: 'SFUISemibold',
    },
    socialRow: {
        marginTop: 36,
        alignItems: 'center',
        height: 44,
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row',
        gap: 20,
    },
    socialButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialImage: {
        width: '100%',
        height: '100%',
    },
});