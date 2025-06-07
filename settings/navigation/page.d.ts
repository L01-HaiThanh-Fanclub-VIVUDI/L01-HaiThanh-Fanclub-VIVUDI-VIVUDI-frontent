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
    HOME = '/home',
    PROFILE = '/profile',
    AUTH_LOGIN = '/auth/login',
    PRODUCT__ID__ = '/product/[id]',
};

/****************************************************************************
 * Tổng hợp PAGE_TYPE của app                                               *
 * PAGE_TYPE được dùng để phân loại các trang là Public hay Private         *
 ****************************************************************************/
export enum PAGE_TYPE {
    PUBLIC = 'Public',
    PRIVATE = 'Private',
};

/****************************************************************************
 * Map từ PAGE_ID sang key tên hiển thị và phân loại trang                  *
 ****************************************************************************/
export const PageInfo: Record<PAGE_ID, { key: string; type: PAGE_TYPE }> = {
    [PAGE_ID.HOME]: { key: 'home', type: PAGE_TYPE.PRIVATE },
    [PAGE_ID.PROFILE]: { key: 'profile', type: PAGE_TYPE.PRIVATE },
    [PAGE_ID.AUTH_LOGIN]: { key: 'login', type: PAGE_TYPE.PUBLIC },
    [PAGE_ID.PRODUCT__ID__]: { key: 'product__id__', type: PAGE_TYPE.PRIVATE },
};