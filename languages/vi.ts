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
};
//#endregion

//# region Vietnamese Messages
/****************************************************************************
 * Map id của các msg thông dụng với format tiếng Anh                       *
 ****************************************************************************/
export const viMessages: MessageObject = {
    [MSG_ID.MSG_REQUIRED]: 'Vui lòng điền các giá trị còn thiếu: {0}, {1}, {2}',
    [MSG_ID.MSG_REGEX]: 'Trường {0} phải thoả mã định dạng {1}',
    [MSG_ID.MSG_MIN_LENGTH]: 'Trường {0} phải có độ dài tối thiểu là {1}',
};
//# endregion

export default { authentication } as const;