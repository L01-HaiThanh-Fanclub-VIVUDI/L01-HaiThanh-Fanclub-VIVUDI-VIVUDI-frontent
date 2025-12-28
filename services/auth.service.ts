/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 *******************************************************************************
 *  File        : auth.service.ts                                             *
 *  Author      : Minh Nhật                                                   *
 *  Created     : 13/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import { ApiResponse } from "@/models/api_response";
import { LoginDTO, LoginResponseDTO } from "@/models/auth_login.dto";
import { RegisterDto, RegisterResponseDTO } from "@/models/auth_register.dto";
import { ResetPasswordDto } from "@/models/auth_verify_otp.dto";
import { baseApiService } from "./base.service";

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
     * @param payload: LoginDTO - Dữ liệu đăng nhập của người dùng                *
     * @returns Promise<ApiResponse<LoginResponseDTO>> - Kết quả trả về từ API    *
     ******************************************************************************/
    public async login(payload: LoginDTO) {
        return await baseApiService.post<LoginResponseDTO>("/auth/login", { body: payload });
    };

    public async verifyOtp(payload: ResetPasswordDto) {
        // return await baseApiService.post<LoginResponseDTO>("/auth/login", { body: payload });
        return await new Promise<ApiResponse<LoginResponseDTO>>(resolve =>
            setTimeout(() => {
                resolve({
                    success: true,
                    statusCode: 0,
                    message: "Đăng nhập thành công",
                    data: {
                        token: "mock-access-token-123456789",
                        user: {
                            email: '',
                            phone_number: '',
                            id: '',
                            updatedAt: '',
                            createdAt: ''
                        }
                    }
                });
            }, 5000)
        );
    };

    /******************************************************************************
     * Hàm đăng ký người dùng mới                                                 *
     * @param payload: RegisterDto - Dữ liệu đăng ký của người dùng              *
     * @returns Promise<ApiResponse<RegisterResponseDTO>> - Kết quả trả về từ API *
     ******************************************************************************/
    public async register(payload: RegisterDto) {
        return await baseApiService.post<RegisterResponseDTO>("/auth/register", { body: payload });
    };
};

/******************************************************************************\
 * Khởi tạo instance của AuthService                                           *
 ******************************************************************************/
export const authService = AuthServiceClass.getInstance();