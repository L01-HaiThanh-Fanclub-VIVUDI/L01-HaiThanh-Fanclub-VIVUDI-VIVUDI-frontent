/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : DTO cho /auth/forgot-password                               *
 *  Author      : Minh Nhật                                                   *
 *  Created     : 19/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

export class ForgotPasswordDto {
    /****************************
     * Email đặt lại mật khẩu   *
     * {REGEX_EMAIL}            *
     * {REGEX_ONLY_ASCII}       *
     ****************************/
    public email!: string;

    constructor() {
        this.email = '';
    };
};