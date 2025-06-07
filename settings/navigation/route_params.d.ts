/****************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                    *
 ****************************************************************************
 *  File        : Dùng define cho navigation của RN                         *
 *  Author      : Minh Nhat                                                 *
 *  Created     : 29/05/2025                                                *
 *  Updated by  :                                                           *
 *  Modified    :                                                           *
\****************************************************************************/

import { PAGE_ID } from "./page";

/****************************************************************************
 * RootStackParamList: Danh sách các tham số cho từng trang trong           *
 * Stack Navigator                                                          *
 ****************************************************************************/
export type RootStackParamList = {
    [PAGE_ID.HOME]: undefined;
    [PAGE_ID.PROFILE]: undefined;
    [PAGE_ID.AUTH_LOGIN]: undefined;
    [PAGE_ID.PRODUCT__ID__]: { id: string };
};

/****************************************************************************
 * AppNavigationProp: Kiểu định danh cho navigation của ứng dụng            *
 * Dùng để xác định kiểu navigation cho từng trang trong RootStackParamList *
 ****************************************************************************/
export type AppNavigationProp<T extends keyof RootStackParamList = keyof RootStackParamList> =
    StackNavigationProp<RootStackParamList, T>;