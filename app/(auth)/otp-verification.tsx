/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : Trang đăng nhập xuất hiện khi mở app                        *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 17/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import AuthOtpPage from "@/pages/auth_otp/page";
import { JSX } from "react";

/******************************************************************************
 * AuthLoginScreen: Hiển thị trang đăng nhập khi mở ứng dụng                  *
 * - Sử dụng LoginPage để hiển thị nội dung đăng nhập                         *
 * - Trả về JSX.Element để sử dụng trong navigation stack                     *
 ******************************************************************************/
const OtpScreen = (): JSX.Element => {
	return (
		<AuthOtpPage />
	);
};

export default OtpScreen;