/****************************************************************************\
 * © ViVuDi 2025. All rights reserved.                    *
 ****************************************************************************
 * File        : Chứa styles sử dụng trong AuthOtpPage                     *
 * Author      : Minh Nhat                                                 *
 * Created     : 16/11/2025                                                *
 * Updated by  : A.I. Assistant                                            *
 * Modified    : 16/11/2025                                                *
\****************************************************************************/

import { StyleSheet } from 'react-native';

/****************************************************************************
 * Styles                                                                   *
 ****************************************************************************/
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Nền trắng
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    headerContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 30, // Khoảng cách tới "OTP Code"
    },
    titleContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 12, // Giảm khoảng cách
    },
    title: {
        color: '#1B1E28',
        fontSize: 28, // Tăng kích thước
        lineHeight: 36,
        fontFamily: 'SFUISemibold',
    },
    subtitleContainer: {
        width: '100%',
        alignItems: 'center',
    },
    subtitle: {
        color: '#7D848D',
        fontSize: 16,
        lineHeight: 22,
        fontFamily: 'SFUISemibold',
        textAlign: 'center',
        maxWidth: '80%', // Tránh tràn lề
    },
    // Xóa emailText (trừ khi bạn muốn thêm lại)

    otpLabel: {
        color: '#1B1E28',
        fontSize: 18,
        fontFamily: 'SFUISemibold',
        marginBottom: 16,
        alignSelf: 'flex-start', // Căn trái
    },
    otpContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between', // Phân bố đều 4 ô
        marginBottom: 20, // Khoảng cách tới lỗi (nếu có)
    },
    otpInput: {
        width: 70, // Kích thước ô vuông lớn hơn
        height: 70,
        borderWidth: 0, // Bỏ viền
        borderRadius: 16, // Bo tròn
        textAlign: 'center',
        fontSize: 24, // Tăng cỡ chữ
        fontFamily: 'SFUISemibold',
        color: '#1B1E28',
        backgroundColor: '#F5F5F5', // Nền xám nhạt như thiết kế
    },
    otpInputError: {
        borderWidth: 1, // Chỉ hiện viền khi lỗi
        borderColor: '#FF0000',
    },
    errorMessage: {
        color: '#FF0000',
        fontSize: 14,
        lineHeight: 16,
        fontFamily: 'SFUISemibold',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
    },
    verifyButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#EE8A9B', // Màu hồng/salmon từ thiết kế
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40, // Khoảng cách từ ô OTP (hoặc lỗi)
    },
    verifyButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        lineHeight: 20,
        fontFamily: 'SFUISemibold',
    },
    resendContainer: {
        width: '100%',
        marginTop: 24, // Khoảng cách từ nút Verify
        flexDirection: 'row',
        justifyContent: 'space-between', // "Resend" bên trái, timer bên phải
        alignItems: 'center',
    },
    resendText: {
        color: '#707B81',
        fontSize: 16, // Tăng kích thước
        fontFamily: 'SFUISemibold',
    },
    timerText: {
        color: '#707B81',
        fontSize: 16,
        fontFamily: 'SFUISemibold',
    },
    resendButton: {
        color: '#FF7029', // Màu cam cho nút "Resend"
        fontSize: 16,
        fontFamily: 'SFUISemibold',
    },
});