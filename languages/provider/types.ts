/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : Chứa type sử dụng cho ngôn ngữ và dịch thuật                *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 29/05/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

/****************************************************************************
 * Các ngôn ngữ hỗ trợ trong ứng dụng.                                      *
 * - 'vi': Tiếng Việt                                                       *
 * - 'en': Tiếng Anh                                                        *
 ****************************************************************************/
export type AppLanguage = 'vi' | 'en';

/****************************************************************************
 * Kiểu cho key dùng để dịch (i18n).                                        *
 ****************************************************************************/
export type TranslationKey = string;

/****************************************************************************
 * Kiểu context cho ngôn ngữ ứng dụng.                                      *
 ****************************************************************************/
export type AppLanguageContextType = {
    /****************************************************************************
     * Ngôn ngữ hiện tại.                                                       *
     ****************************************************************************/
    lang: AppLanguage;
    /****************************************************************************
     * Hàm thay đổi ngôn ngữ.                                                   *
     * @param lang Ngôn ngữ mới                                                 *
     ****************************************************************************/
    setLang: (lang: AppLanguage) => void;
    /****************************************************************************
     * Hàm dịch theo key.                                                       *
     * @param key Key dịch                                                      *
     * @returns Chuỗi đã dịch                                                   *
     ****************************************************************************/
    t: (key: TranslationKey) => string;
    /****************************************************************************
     * Hàm lấy message theo MSG_ID và truyền tham số động.                      *
     * @param messageId Mã message type MSG_ID                                  *
     * @param params Tham số truyền vào message                                 *
     * @returns Chuỗi message đã format                                         *
     ****************************************************************************/
    getMessage: (messageId: MSG_ID, ...params: (string | number)[]) => string;
    /****************************************************************************
     * Hàm lấy message theo MSG_API_ID và truyền tham số động.                   *
     * @param messageId Mã message type MSG_ID                                   *
     * @param apiMessageId Mã message API type MSG_API_ID                        *
     * @param params Tham số truyền vào message                                  *
     * @returns Chuỗi message đã format                                          *
     ****************************************************************************/
    getAPIMessage: (messageId: MSG_ID, apiMessageId: MSG_API_ID, ...params: (string | number)[]) => string;
};

/******************************************************************************
 * Enum định nghĩa các mã message dùng chung.                                 *
 ******************************************************************************/
export enum MSG_ID {
    // Thông báo bắt buộc nhập (chỉ 1 field)
    MSG_REQUIRED = 0,
    // Thông báo bắt buộc nhập (nhiều field)
    MSG_REQUIRED_MULTI = 1,
    // Thông báo sai định dạng
    MSG_REGEX = 2,
    // Thông báo độ dài tối thiểu
    MSG_MIN_LENGTH = 3,
    // Thông báo độ dài tối thiểu 8 ký tự
    MSG_REGEX_MIN_LENGTH = 4,
    // Thông báo ít nhất một chữ cái viết hoa
    MSG_REGEX_ONE_UPPER = 5,
    // Thông báo ít nhất một chữ cái viết thường
    MSG_REGEX_ONE_LOWER = 6,
    // Thông báo ít nhất một chữ số
    MSG_REGEX_ONE_DIGIT = 7,
    // Thông báo ít nhất một ký tự đặc biệt
    MSG_REGEX_ONE_SPECIAL = 8,
    // Thông báo không cho phép khoảng trắng
    MSG_REGEX_NO_WHITESPACE = 9,
    // Thông báo định dạng email
    MSG_REGEX_EMAIL = 10,
    // Thông báo dùng cho regex input
    MSG_REGEX_INPUT = 11,

    // ID cha của các message liên quan đến đăng nhập
    MSG_AUTH_LOGIN = 1000,
    // ID cha của các message liên quan đến đăng ký
    MSG_AUTH_REGISTER = 1100,
};

/******************************************************************************
 * Mã các msg liên quan đến API                                               *
 * 0 - 99: Các mã này sẽ được sử dụng để định danh success response           *
 * 99 - 199: Các mã này sẽ được sử dụng để định danh error response           *
 * 200: Mã lỗi chung do đường truyền mạng, không thể kết nối đến server.      *
 ******************************************************************************/
type NumRange<Start extends number, End extends number, R extends number[] = []> =
    R['length'] extends End
    ? Start | R[number]
    : NumRange<Start, End, [...R, R['length']]>;

export type MSG_API_SUCCESS_RESPONSE_ID = NumRange<0, 99>;
export type MSG_API_ERROR_RESPONSE_ID = NumRange<100, 199>;
export type MSG_API_ID = MSG_API_SUCCESS_RESPONSE_ID | MSG_API_ERROR_RESPONSE_ID;

/******************************************************************************
 * Kiểu object chứa các message theo MSG_API_ID, chỉ cho phép key từ 0-199.  *
 ******************************************************************************/
export type ApiMessageObject = {
    [key in MSG_API_ID]?: string;
};

/******************************************************************************
 * Kiểu object chứa các message theo MSG_ID.                                  *
 ******************************************************************************/
export type MessageObject = {
    [key in MSG_ID]?: string | ApiMessageObject;
};