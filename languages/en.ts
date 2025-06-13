/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : Chứa ngôn ngữ tiếng Anh cho app                             *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 31/05/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import { MessageObject, MSG_ID } from "./provider/types";

//# region Authentication
/****************************************************************************
 * Bản tiếng Anh của route Authentication                                   *
 ****************************************************************************/
const authentication = {
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    forgotPassword: 'Forgot Password',
    resetPassword: 'Reset Password',
    changePassword: 'Change Password',
};
//#endregion

//# region English Messages
/****************************************************************************
 * Map id của các msg thông dụng với format tiếng Anh                       *
 * {n} là danh sách các tham số động, ưu tiên cuối cùng.                    *
 ****************************************************************************/
export const enMessages: MessageObject = {
    [MSG_ID.MSG_REQUIRED]: 'Please fill in the missing values: {n}',
    [MSG_ID.MSG_REGEX]: 'Field {0} must satisfy the format {1}',
    [MSG_ID.MSG_MIN_LENGTH]: 'Field {0} must have a minimum length of {1}',

    [MSG_ID.MSG_AUTH_LOGIN]: {
        0: 'Login successful',
        100: 'User not found',
        101: 'Incorrect password',
    },
};
//# endregion

export default { authentication } as const;