/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 *******************************************************************************
 *  File        : useColorScheme.web.ts                                       *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 7/6/2025                                                    *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/******************************************************************************
 * useColorScheme: Lấy theme hiện tại (light/dark) cho web, hỗ trợ hydrate    *
 ******************************************************************************/
const useColorScheme = (): 'light' | 'dark' | null | undefined => {
	const [hasHydrated, setHasHydrated] = useState(false);

	useEffect(() => {
		setHasHydrated(true);
	}, []);

	const colorScheme = useRNColorScheme();

	if (hasHydrated) {
		return colorScheme;
	};

	return 'light';
};

export default useColorScheme;