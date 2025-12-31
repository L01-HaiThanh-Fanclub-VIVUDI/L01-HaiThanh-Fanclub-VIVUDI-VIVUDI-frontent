/******************************************************************************
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : _layout.tsx                                                 *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 07/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
 ******************************************************************************/

import { Stack } from 'expo-router';
import { JSX } from 'react';

/******************************************************************************
 * PrivatesLayout: Stack navigation for private screens                      *
 * - general (tabs) is the initial route                                     *
 * - Other screens (post_detail, place_detail, etc.) stack on top            *
 ******************************************************************************/
const PrivatesLayout = (): JSX.Element => {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="general" />
			<Stack.Screen name="post_detail" options={{ presentation: 'card' }} />
			<Stack.Screen name="place_detail" />
			<Stack.Screen name="place_search" />
		</Stack>
	);
};

export default PrivatesLayout;