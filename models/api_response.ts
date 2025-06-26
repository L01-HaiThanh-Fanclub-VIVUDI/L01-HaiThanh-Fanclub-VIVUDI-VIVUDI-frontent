/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : Response object từ API                                      *
 *  Author      : Minh Nhật                                                   *
 *  Created     : 19/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import { MSG_API_ID } from "@/languages/provider/types";

export class ApiResponse<T = null> {
    /****************************
     * Trạng thái của response  *
     * true: thành công         *
     * false: thất bại          *
     ****************************/
    public success!: boolean;

    /****************************
     * Mã lỗi nếu có            *
     ****************************/
    public statusCode!: MSG_API_ID;

    /****************************
     * Thông điệp trả về từ API *
     ****************************/
    public message!: string;

    /****************************
     * Dữ liệu trả về từ API    *
     ****************************/
    public data!: T;

    /****************************
     * Message lỗi              *
     ****************************/
    public error?: string;

    constructor() {
        this.success = false;
        this.statusCode = 0;
        this.message = '';
        this.data = {} as T;
    };
};