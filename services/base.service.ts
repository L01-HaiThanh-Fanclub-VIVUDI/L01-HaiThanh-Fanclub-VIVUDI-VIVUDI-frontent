/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : base.service.ts                                             *
 *  Author      : Minh Nhật                                                   *
 *  Created     : 13/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import { VIVUDI_API_URL } from "@/settings";

/******************************************************************************
 * Định nghĩa các kiểu dữ liệu và giá trị mặc định                            *
 ******************************************************************************/
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchOptions {
    headers?: Record<string, string>;
    body?: unknown;
    params?: Record<string, unknown>;
};

/******************************************************************************
 * Hàm request: Thực hiện gọi API với các method khác nhau                    *
 ******************************************************************************/
const request = async <T>(method: RequestMethod, endpoint: string, options: FetchOptions = {}): Promise<T> => {
    const { headers = {}, body, params } = options;

    /******************************************************************************
     * Xây dựng URL với query params nếu có                                       *
     ******************************************************************************/
    const url = new URL(`${VIVUDI_API_URL}${endpoint}`);
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.append(key, String(value));
            };
        });
    };

    /******************************************************************************
     * Thiết lập headers, đảm bảo có Content-Type là application/json             *
     ******************************************************************************/
    const finalHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...headers,
    };

    /******************************************************************************
     * Chuẩn bị fetchOptions                                                      *
     ******************************************************************************/
    const fetchOptions: RequestInit = {
        method,
        headers: finalHeaders,
    };

    /******************************************************************************
     * Nếu có body, chuyển đổi thành JSON và thêm vào fetchOptions               *
     ******************************************************************************/
    if (body) {
        fetchOptions.body = JSON.stringify(body);
    };

    try {
        const response = await fetch(url.toString(), fetchOptions);
        const contentType = response.headers.get('Content-Type') || '';

        /******************************************************************************
         * Kiểm tra xem response có thành công không (status 200-299)                *
         ******************************************************************************/
        if (!response.ok) {
            const errorText = contentType.includes('application/json')
                ? JSON.stringify(await response.json())
                : await response.text();
            throw new Error(errorText || `HTTP Error ${response.status}`);
        };

        /******************************************************************************
         * Nếu response là JSON, chuyển đổi và trả về kết quả                        *
         * Nếu không, trả về text thông thường                                         *
         ******************************************************************************/
        if (contentType.includes('application/json')) {
            return (await response.json()) as T;
        };

        const text = await response.text();
        return text as T;
    } catch (error: any) {
        throw error;
    };
};

/******************************************************************************
 * BaseApiService: Cung cấp các method gọi API                                *
 ******************************************************************************/
export const BaseApiService = {
    get: <T>(endpoint: string, options?: FetchOptions) =>
        request<T>('GET', endpoint, options),
    post: <T>(endpoint: string, options?: FetchOptions) =>
        request<T>('POST', endpoint, options),
    put: <T>(endpoint: string, options?: FetchOptions) =>
        request<T>('PUT', endpoint, options),
    delete: <T>(endpoint: string, options?: FetchOptions) =>
        request<T>('DELETE', endpoint, options),
};