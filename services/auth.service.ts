import { LoginDTO } from "@/models/auth_login.dto";
import { BaseApiService } from "./base.service";

/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 *******************************************************************************
 *  File        : auth.service.ts                                             *
 *  Author      : Minh Nhật                                                   *
 *  Created     : 13/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

/******************************************************************************
 * AuthService Class                                                          *
 ******************************************************************************/
class AuthServiceClass {
    /******************************************************************************
     * Tạo instance cho service                                                   *
     ******************************************************************************/
    private static instance: AuthServiceClass;

    /******************************************************************************
     * Hàm khởi tạo private để đảm bảo chỉ có một instance duy nhất               *
     ******************************************************************************/
    private constructor() { }

    /******************************************************************************
     * Hàm lấy instance của AuthService                                           *
     * Sử dụng singleton pattern để đảm bảo chỉ có một instance duy nhất          *
     ******************************************************************************/
    static getInstance(): AuthServiceClass {
        if (!AuthServiceClass.instance) {
            AuthServiceClass.instance = new AuthServiceClass();
        };

        return AuthServiceClass.instance;
    };

    /******************************************************************************
     * Hàm đăng nhập người dùng                                                   *
     * @param payload: LoginDTO - Dữ liệu đăng nhập của người dùng                 *
     * @returns Promise<any> - Kết quả trả về từ API                               *
     ******************************************************************************/
    login(payload: LoginDTO) {
        return BaseApiService.post<any>("/auth/login", { body: payload });
    };
};

/******************************************************************************\
 * Khởi tạo instance của AuthService                                           *
 ******************************************************************************/
export const authService = AuthServiceClass.getInstance();