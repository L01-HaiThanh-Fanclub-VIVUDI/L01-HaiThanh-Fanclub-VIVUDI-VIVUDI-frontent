/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : Chứa ngôn ngữ tiếng Việt cho app                            *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 31/05/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import { MessageObject, MSG_ID } from "./provider/types";

//# region Authentication
/****************************************************************************
 * Bản tiếng Việt của route Authentication                                  *
 ****************************************************************************/
const authentication = {
    login: 'Đăng nhập',
    register: 'Đăng ký',
    logout: 'Đăng xuất',
    forgotPassword: 'Quên mật khẩu',
    resetPassword: 'Đặt lại mật khẩu',
    changePassword: 'Đổi mật khẩu',

    emailField: 'Email',
    passwordField: 'Mật khẩu',
    passwordPlaceholder: 'Nhập mật khẩu của bạn',

    signInButton: 'Đăng nhập',
    connectMessage: 'Hoặc kết nối',
    dontHaveAccount: 'Chưa có tài khoản?',
    signInTitle: 'Đăng nhập ngay',
    signInSubtitle: 'Vui lòng đăng nhập để tiếp tục sử dụng ứng dụng của chúng tôi',

    signUpButton: 'Đăng ký',
};
//#endregion

//# region Vietnamese Messages
/****************************************************************************
 * Map id của các msg thông dụng với format tiếng Anh                       *
 * {n} là danh sách các tham số động, ưu tiên cuối cùng.                    *
 ****************************************************************************/
export const viMessages: MessageObject = {
    [MSG_ID.MSG_REQUIRED]: 'Vui lòng điền các giá trị còn thiếu: {n}',
    [MSG_ID.MSG_REGEX]: 'Trường {0} phải thoả mãn định dạng {1}',
    [MSG_ID.MSG_MIN_LENGTH]: 'Trường {0} phải có độ dài tối thiểu là {1}',
    [MSG_ID.MSG_REGEX_MIN_LENGTH]: 'Ít nhất 8 ký tự',
    [MSG_ID.MSG_REGEX_ONE_UPPER]: 'Ít nhất một chữ cái viết hoa',
    [MSG_ID.MSG_REGEX_ONE_LOWER]: 'Ít nhất một chữ cái viết thường',
    [MSG_ID.MSG_REGEX_ONE_DIGIT]: 'Ít nhất một chữ số',
    [MSG_ID.MSG_REGEX_ONE_SPECIAL]: 'Ít nhất một ký tự đặc biệt',
    [MSG_ID.MSG_REGEX_NO_WHITESPACE]: 'Không chứa khoảng trắng',
    [MSG_ID.MSG_REGEX_EMAIL]: 'Email phải có định dạng: example@email.com',
    [MSG_ID.MSG_REGEX_INPUT]: 'Trường {0} cần phải thoả mãn các điều kiện sau:',

    [MSG_ID.MSG_AUTH_LOGIN]: {
        0: 'Đăng nhập thành công',
        100: 'Không tìm thấy người dùng',
        101: 'Mật khẩu không đúng',
    },
};
//# endregion

export default { authentication } as const;