/******************************************************************************
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : _layout.tsx                                                 *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 07/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
 ******************************************************************************/

import { PAGE_ID } from '@/settings/navigation/page';
import { Tabs } from 'expo-router';
import { JSX } from 'react';

/******************************************************************************
 * TabLayout: Cấu hình tab bar cho app                                        *
 * - Ẩn header và tab bar                                                     *
 ******************************************************************************/
const TabLayout = (): JSX.Element => {
	return (
		<Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
			<Tabs.Screen name={PAGE_ID.MAP} />
		</Tabs>
	);
};

export default TabLayout;