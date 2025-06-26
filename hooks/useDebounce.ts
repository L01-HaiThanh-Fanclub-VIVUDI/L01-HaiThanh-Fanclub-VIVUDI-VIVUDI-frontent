/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : useDebounce.ts                                              *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 26/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import { useEffect, useRef } from 'react';

/******************************************************************************
 * useDebounce: Gọi callback sau một khoảng delay nhất định                   *
 ******************************************************************************/
export const useDebounce = <T>(
    value: T,
    callback: (value: T) => void,
    delay = 500
) => {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => callback(value), delay);

        return () => {
            if (timer.current !== null) {
                clearTimeout(timer.current);
            };
        };
    }, [value, delay, callback]);
};