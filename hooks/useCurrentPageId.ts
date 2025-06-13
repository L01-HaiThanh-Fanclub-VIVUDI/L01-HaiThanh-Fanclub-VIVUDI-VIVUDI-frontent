/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : useCurrentPageId.ts                                         *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 12/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import { PAGE_ID } from '@/settings/navigation/page';
import { useSegments } from 'expo-router';

/******************************************************************************
 * useCurrentPageId: Lấy PAGE_ID hiện tại dựa trên segments của router        *
 * - Bỏ qua các group layout (folder bắt đầu bằng '(')                        *
 ******************************************************************************/
const useCurrentPageId = (): PAGE_ID | undefined => {
    const segments = useSegments();
    const filtered = segments.filter((s) => !s.startsWith('('));
    const current = filtered[filtered.length - 1];

    return Object.values(PAGE_ID).find(
        (id) => id.replace('/', '') === current
    );
};

export default useCurrentPageId;