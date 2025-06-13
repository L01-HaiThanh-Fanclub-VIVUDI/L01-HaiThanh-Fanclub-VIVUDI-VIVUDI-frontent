/******************************************************************************
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : _layout.tsx                                                 *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 07/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
 ******************************************************************************/

import ScreenWrapper from '@/components/ui/screen_wrapper';
import { ProviderInjection } from '@/providers';
import { stackScreenSettings } from '@/settings';
import { PAGE_ID } from '@/settings/navigation/page';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { JSX } from 'react';
import 'react-native-reanimated';

/******************************************************************************
 * RootLayout: Bọc toàn bộ app với provider, font, navigation stack           *
 * - Load custom fonts                                                        *
 * - Inject provider cho toàn bộ app                                          *
 * - Bọc navigation stack với ScreenWrapper                                   *
 ******************************************************************************/
const RootLayout = (): JSX.Element => {
	/******************************************************************************
	 * Load custom fonts                                                          *
	 ******************************************************************************/
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		GeoBT: require('../assets/fonts/Geo-BT-Regular.ttf'),
	});

	/******************************************************************************
	 * Nếu chưa load font, trả về rỗng để tránh lỗi render                        *
	 ******************************************************************************/
	if (!loaded) return <></>;

	return (
		<ProviderInjection>
			<ScreenWrapper>
				<Stack>
					<Stack.Screen name={PAGE_ID.PRIVATE_TABS} options={stackScreenSettings} />
					<Stack.Screen name="+not-found" />
				</Stack>
			</ScreenWrapper>
			<StatusBar style="auto" />
		</ProviderInjection>
	);
};

export default RootLayout;