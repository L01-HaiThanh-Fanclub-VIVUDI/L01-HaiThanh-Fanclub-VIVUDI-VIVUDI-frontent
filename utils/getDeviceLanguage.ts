/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : getDeviceLanguage.ts                                        *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 14/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import { AppLanguage } from '@/languages/provider/types';

/******************************************************************************
 * getDeviceLanguage: Lấy ngôn ngữ thiết bị hiện tại                          *
 * - Trả về 'vi' nếu ngôn ngữ là tiếng Việt, ngược lại trả về 'en'            *
 ******************************************************************************/
const getDeviceLanguage = (): AppLanguage => {
    if (typeof navigator !== 'undefined') {
        const lang = navigator.language || (navigator as any).userLanguage || 'en';
        return lang.startsWith('vi') ? 'vi' : 'en';
    };

    return 'en';
};

export default getDeviceLanguage;