/******************************************************************************
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : _layout.tsx                                                 *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 17/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
 ******************************************************************************/

import { PAGE_ID } from '@/settings/navigation/page';
import { Tabs } from 'expo-router';
import { JSX } from 'react';

/******************************************************************************
 * AuthLayout: Cấu hình auth tab cho app                                      *
 * - Ẩn header và tab bar                                                     *
 ******************************************************************************/
const AuthLayout = (): JSX.Element => {
	return (
		<Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
			<Tabs.Screen name={PAGE_ID.AUTH_LOGIN} />
		</Tabs>
	);
};

export default AuthLayout;