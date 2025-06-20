/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : DTO cho /auth/change-password                               *
 *  Author      : Minh Nhật                                                   *
 *  Created     : 19/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

export class ChangePasswordDto {
    /****************************
     * Mật khẩu hiện tại        *
     * {REGEX_PASSWORD}         *
     * {REGEX_ONLY_ASCII}       *
     ****************************/
    public current_password!: string;

    /****************************
     * Mật khẩu mới             *
     * {REGEX_PASSWORD}         *
     * {REGEX_ONLY_ASCII}       *
     ****************************/
    public new_password!: string;

    constructor() {
        this.current_password = '';
        this.new_password = '';
    };
};