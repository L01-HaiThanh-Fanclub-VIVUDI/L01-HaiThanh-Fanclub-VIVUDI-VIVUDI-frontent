/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : useIsFirstLaunch.ts                                         *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 12/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import { FIRST_LAUNCH_KEY } from '@/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

/******************************************************************************
 * useIsFirstLaunch: Kiểm tra xem app có phải lần đầu được mở không           *
 ******************************************************************************/
const useIsFirstLaunch = (): boolean | null => {
    const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

    useEffect(() => {
        const checkFirstLaunch = async () => {
            try {
                const hasLaunched = await AsyncStorage.getItem(FIRST_LAUNCH_KEY);
                if (hasLaunched === null) {
                    await AsyncStorage.setItem(FIRST_LAUNCH_KEY, 'true');
                    setIsFirstLaunch(true);
                } else {
                    setIsFirstLaunch(false);
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                setIsFirstLaunch(false);
            };
        };

        checkFirstLaunch();
    }, []);

    return isFirstLaunch;
};

export default useIsFirstLaunch;