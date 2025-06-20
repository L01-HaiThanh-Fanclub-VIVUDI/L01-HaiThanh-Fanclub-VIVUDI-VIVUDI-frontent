/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : DTO cho /auth/verify-otp                                    *
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

    constructor() {
        this.otp = '';
    };
};