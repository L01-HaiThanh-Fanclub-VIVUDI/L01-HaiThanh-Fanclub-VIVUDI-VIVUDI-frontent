/****************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                    *
 ****************************************************************************
 *  File        : Dùng define cho navigation của RN                         *
 *  Author      : Minh Nhat                                                 *
 *  Created     : 29/05/2025                                                *
 *  Updated by  :                                                           *
 *  Modified    :                                                           *
\****************************************************************************/

/****************************************************************************
 * Tổng hợp PAGE_ID của app                                                 *
 * PAGE_ID được dùng để định danh các trang trong ứng dụng                  *
 ****************************************************************************/
export enum PAGE_ID {
    /****************************************************************************
     * Trang giới thiệu khi người dùng vào app lần đầu tiên                     *
     ****************************************************************************/
    ON_BOARD = 'onboard',

    /****************************************************************************
     * Tabs auth chung                                                          *
     ****************************************************************************/
    AUTH_TABS = '(auth)',
    /****************************************************************************
     * Trang đăng nhập của người dùng                                           *
     ****************************************************************************/
    AUTH_LOGIN = 'login',
    /****************************************************************************
     * Trang đăng ký của người dùng                                             *
     ****************************************************************************/
    AUTH_SIGN_UP = 'sign-up',
    /****************************************************************************
     * Trang quên mật khẩu của người dùng                                       *
     ****************************************************************************/
    AUTH_FORGOT_PASSWORD = 'forgot-password',
    /****************************************************************************
     * Trang xác thực OTP của người dùng                                        *
     ****************************************************************************/
    AUTH_OTP_VERIFICATION = 'otp-verification',

    HOME_TABS = '(tabs)',
    HOME = 'home',
    SEARCH = 'search',
    PROFILE = 'profile',
    REELS = 'reels',
    MAP = 'map',

    NEW_REEL_TABS = '(post)',
    CONTENT = 'content',
    MEDIA = 'media',

    /****************************************************************************
     * Tabs private chung khi đăng nhập thành công (privates)                   *
     ****************************************************************************/
    PRIVATE_TABS = '(privates)',
    /****************************************************************************
     * Trang thông tin chung khi người dùng đăng nhập thành công                *
     ****************************************************************************/
    GENERAL = 'general',
    PLACE_DETAIL = 'place_detail',
    PLACE_SEARCH = 'place_search',
};

/****************************************************************************
 * Tổng hợp PAGE_TYPE của app                                               *
 * PAGE_TYPE được dùng để phân loại các trang là Public hay Private         *
 ****************************************************************************/
export enum PAGE_TYPE {
    PUBLIC = 'public',
    PRIVATE = 'private',
};

/****************************************************************************
 * Map từ PAGE_ID sang key tên hiển thị và phân loại trang                  *
 ****************************************************************************/
export const PageInfo: Partial<Record<PAGE_ID, { key: string; type: PAGE_TYPE }>> = {
    [PAGE_ID.ON_BOARD]: { key: 'onboard', type: PAGE_TYPE.PUBLIC },
    [PAGE_ID.AUTH_LOGIN]: { key: 'login', type: PAGE_TYPE.PUBLIC },
    [PAGE_ID.AUTH_SIGN_UP]: { key: 'sign-up', type: PAGE_TYPE.PUBLIC },
    [PAGE_ID.AUTH_FORGOT_PASSWORD]: { key: 'forgot-password', type: PAGE_TYPE.PUBLIC },
    [PAGE_ID.AUTH_OTP_VERIFICATION]: { key: 'otp-verification', type: PAGE_TYPE.PUBLIC },
    [PAGE_ID.HOME]: { key: 'home', type: PAGE_TYPE.PUBLIC },
    [PAGE_ID.PROFILE]: { key: 'profile', type: PAGE_TYPE.PRIVATE },
    [PAGE_ID.GENERAL]: { key: 'general', type: PAGE_TYPE.PRIVATE },
};