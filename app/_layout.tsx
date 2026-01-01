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
import useIsFirstLaunch from '@/hooks/useIsFirstLaunch';
import { ProviderInjection } from '@/providers';
import { useLoading } from '@/providers/loading_provider';
import { stackScreenSettings } from '@/settings';
import { PAGE_ID } from '@/settings/navigation/page';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { JSX, useEffect, useState } from 'react';
import 'react-native-gesture-handler';
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
	const [hasToken, setHasToken] = useState<boolean | null>(null);

	/******************************************************************************
	 * Check for stored auth token on mount
	 ******************************************************************************/
	useEffect(() => {
		const checkToken = async () => {
			try {
				const AsyncStorage = await import('@react-native-async-storage/async-storage');
				const token = await AsyncStorage.default.getItem('auth_token');
				setHasToken(!!token);
				console.log('Auth token check:', token ? 'Found' : 'Not found');
			} catch (error) {
				console.error('Error checking token:', error);
				setHasToken(false);
			}
		};
		checkToken();
	}, []);

	/******************************************************************************
	 * Global error handler to suppress known Expo Go limitations
	 * - expo-keep-awake error on Android (known Expo Go issue)
	 ******************************************************************************/
	useEffect(() => {
		const errorHandler = (error: ErrorEvent) => {
			const errorMessage = error.message || String(error);

			// Suppress "Unable to activate keep awake" error (Expo Go limitation)
			if (errorMessage.includes('Unable to activate keep awake')) {
				console.warn('⚠️ Suppressed keep-awake error (Expo Go limitation)');
				error.preventDefault?.();
				return true;
			}
			return false;
		};

		// Add error listener
		const originalHandler = ErrorUtils.getGlobalHandler();
		ErrorUtils.setGlobalHandler((error, isFatal) => {
			const errorMessage = String(error);
			if (!errorMessage.includes('Unable to activate keep awake')) {
				originalHandler(error, isFatal);
			} else {
				console.warn('⚠️ Suppressed keep-awake error (Expo Go limitation)');
			}
		});

		return () => {
			ErrorUtils.setGlobalHandler(originalHandler);
		};
	}, []);

	/******************************************************************************
	 * Đặt tên route mặc định cho navigation stack                                *
	 * - Nếu là lần đầu, hiển thị onboard                                         *
	 * - Nếu có token, hiển thị home                                              *
	 * - Nếu không có token, hiển thị login                                       *
	 ******************************************************************************/
	const initialRouteName = isFirstLaunch
		? PAGE_ID.ON_BOARD
		: hasToken
			? PAGE_ID.HOME_TABS
			: PAGE_ID.AUTH_TABS;

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
	 * Nếu chưa load font hoặc chưa check token, trả về rỗng                      *
	 ******************************************************************************/
	if (!loaded || isFirstLaunch == null || hasToken === null) return <></>;

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