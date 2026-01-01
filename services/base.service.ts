/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : base.service.ts                                             *
 *  Author      : Minh Nhật                                                   *
 *  Created     : 13/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import { ApiResponse } from "@/models/api_response";
import { FLAG_PRODUCT_VERSION, VIVUDI_API_URL } from "@/settings";

/******************************************************************************
 * Định nghĩa các kiểu dữ liệu và giá trị mặc định                            *
 ******************************************************************************/
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchOptions {
    /******************************************************************************
     * Headers: Các header tùy chọn cho request, mặc định là rỗng                 *
     * body: Dữ liệu gửi đi, nếu có (chỉ dùng cho POST, PUT, PATCH)               *
     * params: Tham số query string, nếu có                                       *
     ******************************************************************************/
    headers?: Record<string, string>;
    body?: unknown;
    params?: Record<string, unknown>;
};

/******************************************************************************
 * Hàm request: Thực hiện gọi API với các method khác nhau                    *
 ******************************************************************************/
const request = async <T>(method: RequestMethod, endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> => {
    const { headers = {}, body, params } = options;

    /******************************************************************************
     * Chuẩn bị URL                                                               *
     ******************************************************************************/
    const url = new URL(`${VIVUDI_API_URL}${endpoint}`);
    /******************************************************************************
     * Thêm các tham số query string nếu có                                       *
     ******************************************************************************/
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.append(key, String(value));
            };
        });
    };

    /******************************************************************************
     * Thiết lập headers, nếu không có thì dùng mặc định                          *
     ******************************************************************************/
    const finalHeaders: Record<string, string> = {
        'Content-Type': headers['Content-Type'] ?? 'application/json',
        ...headers,
    };

    /******************************************************************************
     * Lấy token từ AsyncStorage và thêm vào Authorization header                 *
     ******************************************************************************/
    try {
        const AsyncStorage = await import('@react-native-async-storage/async-storage');
        const token = await AsyncStorage.default.getItem('auth_token');
        if (token) {
            finalHeaders['Authorization'] = `Bearer ${token}`;
        }
    } catch (error) {
        // Ignore error if AsyncStorage not available
        console.warn('Could not retrieve auth token:', error);
    }

    /******************************************************************************
     * Nếu có token thì thêm vào headers                                          *
     ******************************************************************************/
    const fetchOptions: RequestInit = {
        method,
        headers: finalHeaders,
    };

    /******************************************************************************
     * Nếu có body thì chuyển đổi thành JSON và thêm vào fetchOptions             *
     * Chỉ áp dụng cho các method POST, PUT, PATCH                                *
     * Nếu body là FormData thì không JSON.stringify và không set Content-Type    *
     ******************************************************************************/
    if (body) {
        if (body instanceof FormData) {
            // FormData: không cần JSON.stringify và tự động set Content-Type với boundary
            fetchOptions.body = body as any;
            // Remove Content-Type để browser tự động set với boundary
            delete finalHeaders['Content-Type'];
        } else {
            // JSON body: stringify như bình thường
            fetchOptions.body = JSON.stringify(body);
        }
    };

    try {
        const MAX_RETRIES = 3;
        const INITIAL_RETRY_DELAY = 1000; // 1 second
        let lastError: any;

        for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
            try {
                // Thực hiện fetch với URL và các tùy chọn đã chuẩn bị
                const response = await fetch(url.toString(), fetchOptions);
                // Kiểm tra Content-Type để xác định cách xử lý response
                const contentType = response.headers.get('Content-Type') || '';

                // Nếu response status là 500 và còn retry attempts, thử lại
                if (response.status >= 500 && attempt < MAX_RETRIES) {
                    const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, attempt);
                    console.warn(`⚠️ Server error ${response.status}, retrying in ${retryDelay}ms... (attempt ${attempt + 1}/${MAX_RETRIES})`);
                    await new Promise(resolve => setTimeout(resolve, retryDelay));
                    continue; // Retry
                }

                // Nếu response không thành công (status không trong khoảng 200-299)
                if (!response.ok) {
                    // Nếu response lỗi, vẫn trả về đúng ApiResponse từ backend
                    if (contentType.includes('application/json')) {
                        return await response.json();
                    };
                    const apiError = new ApiResponse<T>();
                    apiError.success = false;
                    apiError.message = await response.text();
                    apiError.statusCode = response.status as any;
                    apiError.error = apiError.message;
                    return apiError;
                };

                // Nếu response là JSON, trả về ApiResponse từ backend
                if (contentType.includes('application/json')) {
                    // Luôn trả về đúng ApiResponse từ backend, không gói lại nữa
                    return await response.json();
                };

                // Nếu không phải JSON, trả về text trong ApiResponse
                const text = await response.text();
                const apiResponse = new ApiResponse<T>();
                apiResponse.success = true;
                apiResponse.statusCode = 200 as any;
                apiResponse.message = '';
                apiResponse.data = text as any;
                return apiResponse;
            } catch (error: any) {
                lastError = error;

                // Nếu còn retry attempts, thử lại
                if (attempt < MAX_RETRIES) {
                    const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, attempt);
                    console.warn(`⚠️ Network error, retrying in ${retryDelay}ms... (attempt ${attempt + 1}/${MAX_RETRIES})`);
                    await new Promise(resolve => setTimeout(resolve, retryDelay));
                    continue; // Retry
                }

                // Đã hết retry attempts
                break;
            }
        }

        // Nếu đã hết retry attempts, trả về lỗi cuối cùng
        const apiError = new ApiResponse<T>();
        apiError.success = false;
        apiError.message = lastError?.message || 'Unknown error';
        apiError.error = lastError?.message;
        apiError.statusCode = 0 as any;

        // Nếu không phải phiên bản sản phẩm, in lỗi ra console
        if (!FLAG_PRODUCT_VERSION) {
            console.error('API Error after retries:', apiError.message);
        };

        return apiError;
    } catch (error: any) {
        const apiError = new ApiResponse<T>();
        apiError.success = false;
        apiError.message = error?.message || 'Unknown error';
        apiError.error = error?.message;
        apiError.statusCode = 0 as any;

        // Nếu không phải phiên bản sản phẩm, in lỗi ra console
        if (!FLAG_PRODUCT_VERSION) {
            console.error('API Error:', apiError.message);
        };

        return apiError;
    };
};

/******************************************************************************
 * baseApiService: Cung cấp các method gọi API                                *
 ******************************************************************************/
export const baseApiService = {
    get: <T>(endpoint: string, options?: FetchOptions) =>
        request<T>('GET', endpoint, options),
    post: <T>(endpoint: string, options?: FetchOptions) =>
        request<T>('POST', endpoint, options),
    put: <T>(endpoint: string, options?: FetchOptions) =>
        request<T>('PUT', endpoint, options),
    delete: <T>(endpoint: string, options?: FetchOptions) =>
        request<T>('DELETE', endpoint, options),
};