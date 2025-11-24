/******************************************************************************
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : _layout.tsx                                                 *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 07/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
 ******************************************************************************/

import 'react-native-gesture-handler';
import ScreenWrapper from '@/components/ui/screen_wrapper';
import useIsFirstLaunch from '@/hooks/useIsFirstLaunch';
import { ProviderInjection } from '@/providers';
import { useLoading } from '@/providers/loading_provider';
import { stackScreenSettings } from '@/settings';
import { PAGE_ID } from '@/settings/navigation/page';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { JSX, useEffect } from 'react';
import 'react-native-reanimated';

/******************************************************************************
 * AppStack: Bọc toàn bộ app với navigation stack                             *
 * - Sử dụng Stack từ expo-router để quản lý navigation stack                 *
 * - Đặt ScreenWrapper để bọc toàn bộ stack với các provider và theme         *
 * - Đặt StatusBar để quản lý trạng thái thanh trạng thái của ứng dụng        *
 ******************************************************************************/
const AppStack = (): JSX.Element => {
	/******************************************************************************
	 * Sử dụng useIsFirstLaunch để kiểm tra lần mở ứng dụng đầu tiên              *
	 * - Nếu là lần đầu, hiển thị trang onboard                                   *
	 ******************************************************************************/
	const isFirstLaunch = useIsFirstLaunch();

	/******************************************************************************
	 * Đặt tên route mặc định cho navigation stack                                *
	 * - Nếu là lần đầu, sử dụng PAGE_ID.ON_BOARD để hiển thị trang onboard       *
	 * - Nếu không, sử dụng PAGE_ID.PRIVATE_TABS để hiển thị tab riêng tư         *
	 ******************************************************************************/
	const initialRouteName = isFirstLaunch ? PAGE_ID.ON_BOARD : PAGE_ID.AUTH_TABS;

	/******************************************************************************
	 * Lấy hàm hide từ context LoadingProvider để ẩn loading sau khi load font    *
	 ******************************************************************************/
	const { hide } = useLoading();

	/******************************************************************************
	 * Sử dụng useFonts để load các font tùy chỉnh                                *
	 * - SpaceMono: Font monospace cho code, thường dùng trong terminal           *
	 * - GeoBT: Font sans-serif hiện đại, thường dùng cho giao diện người dùng    *
	 ******************************************************************************/
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		GeoBT: require('../assets/fonts/Geo-BT-Regular.ttf'),
		GilMT: require('../assets/fonts/Gilsan-MT-Regular.ttf'),
		SFUISemibold: require('../assets/fonts/SF-UI-Semibold.ttf'),
	});

	/******************************************************************************
	 * Hiển thị loading khi chưa load font, ẩn loading khi đã load xong           *
	 * - Sử dụng useEffect để ẩn loading sau khi font đã load                     *
	 * - Tránh lỗi render khi chưa load font                                      *
	 ******************************************************************************/
	useEffect(() => {
		if (loaded) hide();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loaded]);

	/******************************************************************************
	 * Nếu chưa load font, trả về rỗng để tránh lỗi render                        *
	 * Nếu isFirstLaunch là null, cũng trả về rỗng để tránh lỗi render            *
	 ******************************************************************************/
	if (!loaded || isFirstLaunch == null) return <></>;

	return (
		<>
			<ScreenWrapper>
				<Stack initialRouteName={initialRouteName}>
					<Stack.Screen name={PAGE_ID.ON_BOARD} options={stackScreenSettings} />
					<Stack.Screen name={PAGE_ID.AUTH_TABS} options={stackScreenSettings} />
					<Stack.Screen name={PAGE_ID.HOME_TABS} options={stackScreenSettings} />
					<Stack.Screen name={PAGE_ID.NEW_REEL_TABS} options={stackScreenSettings} />
					<Stack.Screen name={PAGE_ID.PRIVATE_TABS} options={stackScreenSettings} />
					<Stack.Screen name="+not-found" />
				</Stack>
			</ScreenWrapper>
			<StatusBar style="auto" />
		</>
	)
};

/******************************************************************************
 * RootLayout: Bọc toàn bộ app với provider, font, navigation stack           *
 * - Load custom fonts                                                        *
 * - Inject provider cho toàn bộ app                                          *
 * - Bọc navigation stack với ScreenWrapper                                   *
 ******************************************************************************/
const RootLayout = (): JSX.Element => {
	return (
		<ProviderInjection>
			<AppStack />
		</ProviderInjection>
	);
};

export default RootLayout;