/******************************************************************************
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : _layout.tsx                                                 *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 07/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
 ******************************************************************************/

import IconSymbol from '@/components/atoms/icon_symbol';
import { PAGE_ID } from '@/settings/navigation/page';
import { Tabs } from 'expo-router';
import { JSX } from 'react';

/******************************************************************************
 * TabLayout: Cấu hình tab bar cho app                                        *
 * - Ẩn header và tab bar                                                     *
 * - Định nghĩa icon cho từng tab                                             *
 ******************************************************************************/
const TabLayout = (): JSX.Element => {
	return <Tabs
		screenOptions={{
			headerShown: false,
			tabBarStyle: { display: 'none' },
		}}
	>
		<Tabs.Screen
			name={PAGE_ID.GENERAL}
			options={{
				title: 'Home',
				tabBarIcon: ({ color }) => (
					<IconSymbol size={28} name="house.fill" color={color} />
				),
			}}
		/>
	</Tabs>
};

export default TabLayout;