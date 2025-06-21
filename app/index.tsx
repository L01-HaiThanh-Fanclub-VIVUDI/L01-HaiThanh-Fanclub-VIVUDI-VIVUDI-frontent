/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 *******************************************************************************
 *  File        : index.tsx                                                   *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 21/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import useIsFirstLaunch from '@/hooks/useIsFirstLaunch';
import { PAGE_ID } from '@/settings/navigation/page';
import { Redirect } from 'expo-router';
import { JSX } from 'react';

/******************************************************************************
 * Trang root index của ứng dụng                                              *
 * - Trang này sẽ được truy cập khi người dùng mở app từ đường dẫn "/"        *
 * - Dùng Redirect để điều hướng sang trang phù hợp theo trạng thái launch    *
 ******************************************************************************/
const Index = (): JSX.Element | null => {
    const isFirstLaunch = useIsFirstLaunch();

    /******************************************************************************
     * Khi `isFirstLaunch` chưa xác định (đang loading), trả về null để chờ       *
     * Tránh redirect sớm gây lỗi route trên iOS                                  *
     ******************************************************************************/
    if (isFirstLaunch === null) return null;

    /******************************************************************************
     * Điều hướng người dùng:                                                     *
     * - Nếu lần đầu mở app → chuyển sang trang Onboard                           *
     * - Nếu không phải → chuyển sang Auth Tabs                                   *
     ******************************************************************************/
    return <Redirect href={isFirstLaunch ? `/${PAGE_ID.ON_BOARD}` : `/${PAGE_ID.AUTH_TABS}/${PAGE_ID.AUTH_LOGIN}`} />;
};

export default Index;