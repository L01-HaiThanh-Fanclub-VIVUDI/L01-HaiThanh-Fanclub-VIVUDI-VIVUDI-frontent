/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : register.tsx                                                *
 *  Author      : AI Assistant                                                *
 *  Created     : 28/12/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import AuthRegisterPage from "@/pages/auth_register/page";
import { JSX } from "react";

/******************************************************************************
 * AuthRegisterScreen: Hiển thị trang đăng ký                                *
 * - Sử dụng AuthRegisterPage để hiển thị nội dung đăng ký                   *
 * - Trả về JSX.Element để sử dụng trong navigation stack                    *
 ******************************************************************************/
const AuthRegisterScreen = (): JSX.Element => {
    return (
        <AuthRegisterPage />
    );
};

export default AuthRegisterScreen;
