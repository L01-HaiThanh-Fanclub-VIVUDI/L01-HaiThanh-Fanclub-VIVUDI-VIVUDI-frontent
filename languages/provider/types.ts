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
    // Thông báo bắt buộc nhập
    MSG_REQUIRED = 0,
    // Thông báo sai định dạng
    MSG_REGEX = 1,
    // Thông báo độ dài tối thiểu
    MSG_MIN_LENGTH = 2,

    // ID cha của các message liên quan đến đăng nhập
    MSG_AUTH_LOGIN = 1000,
};

/******************************************************************************
 * Mã các msg liên quan đến API                                               *
 * 0 - 99: Các mã này sẽ được sử dụng để định danh success response           *
 * 99 - 199: Các mã này sẽ được sử dụng để định danh error response           *
 ******************************************************************************/
type NumRange<Start extends number, End extends number, R extends number[] = []> =
    R['length'] extends End
    ? Start | R[number]
    : NumRange<Start, End, [...R, R['length']]>;

export type MSG_API_ID = NumRange<0, 200>;

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