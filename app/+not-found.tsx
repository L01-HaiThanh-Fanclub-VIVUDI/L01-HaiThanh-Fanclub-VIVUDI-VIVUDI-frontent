/******************************************************************************
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : Trang notfound                                              *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 07/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
 ******************************************************************************/

import ThemedText from '@/components/atoms/themed_text';
import ThemedView from '@/components/atoms/themed_view';
import { Link, Stack } from 'expo-router';
import { JSX } from 'react';
import { StyleSheet } from 'react-native';

/******************************************************************************
 * NotFoundScreen: Hiển thị khi truy cập route không tồn tại                  *
 * - Hiển thị thông báo lỗi                                                   *
 * - Cung cấp link quay về trang chủ                                          *
 ******************************************************************************/
const NotFoundScreen = (): JSX.Element => {
	return (
		<>
			{/* Đặt tiêu đề cho màn hình lỗi */}
			<Stack.Screen options={{ title: 'Oops!' }} />
			<ThemedView style={styles.container}>
				<ThemedText type="title">
					This screen does not exist.
				</ThemedText>
				<Link href="/" style={styles.link}>
					<ThemedText type="link">
						Go to home screen!
					</ThemedText>
				</Link>
			</ThemedView>
		</>
	);
};

/******************************************************************************
 * styles: Định nghĩa style cho màn hình not found                            *
 ******************************************************************************/
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
});

export default NotFoundScreen;