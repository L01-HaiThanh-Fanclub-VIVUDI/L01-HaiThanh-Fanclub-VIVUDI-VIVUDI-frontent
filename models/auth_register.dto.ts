/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : DTO cho /auth/register                                      *
 *  Author      : Minh Nhật                                                   *
 *  Created     : 19/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

export class RegisterDto {
    /****************************
     * Email người dùng         *
     * {REGEX_EMAIL}            *
     * {REGEX_ONLY_ASCII}       *
     ****************************/
    public email!: string;

    /****************************
     * Số điện thoại            *
     * {REGEX_PHONE}            *
     ****************************/
    public phone_number!: string;

    /****************************
     * Mật khẩu                 *
     * {REGEX_PASSWORD}         *
     * {REGEX_ONLY_ASCII}       *
     ****************************/
    public password!: string;

    constructor() {
        this.email = '';
        this.phone_number = '';
        this.password = '';
    };
};

export class RegisterResponseDTO {
    /****************************
     * Token đăng ký            *
     * {REGEX_TOKEN}            *
     ****************************/
    public token!: string;
    public user!: {
        email: string,
        phone_number: string,
        id: string,
        updatedAt: string,
        createdAt: string
    }

    constructor() {
        this.token = '';
        this.user = {
            email: '',
            phone_number: '',
            id: '',
            updatedAt: '',
            createdAt: ''
        };
    };
};