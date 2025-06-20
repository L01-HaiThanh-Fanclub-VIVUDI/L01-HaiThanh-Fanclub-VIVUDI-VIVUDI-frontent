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

    emailField: 'Email',
    passwordField: 'Password',
    passwordPlaceholder: 'Enter your password',

    signInButton: 'Sign In',
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
    [MSG_ID.MSG_REGEX_MIN_LENGTH]: 'At least 8 characters',
    [MSG_ID.MSG_REGEX_ONE_UPPER]: 'At least one uppercase letter',
    [MSG_ID.MSG_REGEX_ONE_LOWER]: 'At least one lowercase letter',
    [MSG_ID.MSG_REGEX_ONE_DIGIT]: 'At least one digit',
    [MSG_ID.MSG_REGEX_ONE_SPECIAL]: 'At least one special character',
    [MSG_ID.MSG_REGEX_NO_WHITESPACE]: 'No whitespace allowed',
    [MSG_ID.MSG_REGEX_EMAIL]: 'Email must be in the format: example@email.com',
    [MSG_ID.MSG_REGEX_INPUT]: 'Field {0} must satisfy the following conditions:',

    [MSG_ID.MSG_AUTH_LOGIN]: {
        0: 'Login successful',
        100: 'User not found',
        101: 'Incorrect password',
    },
};
//# endregion

export default { authentication } as const;