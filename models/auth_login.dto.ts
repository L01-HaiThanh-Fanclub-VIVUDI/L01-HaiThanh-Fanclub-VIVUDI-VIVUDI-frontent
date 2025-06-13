/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : DTO cho /auth/login                                         *
 *  Author      : Minh Nhật                                                   *
 *  Created     : 13/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

export class LoginDTO {
    /****************************
     * Email đăng nhập          *
     ****************************/
    public email!: string;
    /****************************
     * Mật khẩu đăng nhập       *
     ****************************/
    public password!: string;

    constructor() {
        this.email = '';
        this.password = '';
    };
};