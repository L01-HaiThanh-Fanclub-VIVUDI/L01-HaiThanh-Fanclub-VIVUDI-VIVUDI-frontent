/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : DTO cho /auth/reset-password                                *
 *  Author      : Minh Nhật                                                   *
 *  Created     : 19/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

export class ResetPasswordDto {
    /****************************
     * Mã OTP xác thực          *
     * {REGEX_OTP}              *
     ****************************/
    public otp!: string;

    /****************************
     * Mật khẩu mới             *
     * {REGEX_PASSWORD}         *
     * {REGEX_ONLY_ASCII}       *
     ****************************/
    public password!: string;

    constructor() {
        this.otp = '';
        this.password = '';
    };
};