/******************************************************************************
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : parallax_scroll_view/index.tsx                              *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 13/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
 ******************************************************************************/

import ThemedView from '@/components/atoms/themed_view';
import { useColorScheme } from '@/hooks/useColorScheme';
import type { JSX, PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import { DEFAULT_HEADER_HEIGHT_VALUE, styles } from './styles';

/******************************************************************************
 * Định nghĩa Props cho ParallaxScrollView                                    *
 ******************************************************************************/
type Props = PropsWithChildren<{
	headerImage: ReactElement;
	headerBackgroundColor: { dark: string; light: string };
}>;

/******************************************************************************
 * ParallaxScrollView: ScrollView với hiệu ứng parallax cho header            *
 ******************************************************************************/
const ParallaxScrollView = ({ children, headerImage, headerBackgroundColor }: Props): JSX.Element => {
	/******************************************************************************
	 * Lấy theme hiện tại                                                         *
	 ******************************************************************************/
	const colorScheme = useColorScheme() ?? 'light';

	/******************************************************************************
	 * Khởi tạo animated ref và scroll offset                                     *
	 ******************************************************************************/
	const scrollRef = useAnimatedRef<Animated.ScrollView>();
	const scrollOffset = useScrollViewOffset(scrollRef);

	/******************************************************************************
	 * Animated style cho header                                                  *
	 ******************************************************************************/
	const headerAnimatedStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateY: interpolate(
					scrollOffset.value,
					[-DEFAULT_HEADER_HEIGHT_VALUE, 0, DEFAULT_HEADER_HEIGHT_VALUE],
					[-DEFAULT_HEADER_HEIGHT_VALUE / 2, 0, DEFAULT_HEADER_HEIGHT_VALUE * 0.75]
				),
			},
			{
				scale: interpolate(
					scrollOffset.value,
					[-DEFAULT_HEADER_HEIGHT_VALUE, 0, DEFAULT_HEADER_HEIGHT_VALUE],
					[2, 1, 1]
				),
			},
		],
	}));

	/******************************************************************************
	 * Render component                                                           *
	 ******************************************************************************/
	return (
		<ThemedView style={styles.container}>
			<Animated.ScrollView
				ref={scrollRef}
				scrollEventThrottle={16}
				scrollIndicatorInsets={{ bottom: 0 }}
				contentContainerStyle={{ paddingBottom: 0 }}
			>
				<Animated.View
					style={[
						styles.header,
						{ backgroundColor: headerBackgroundColor[colorScheme] },
						headerAnimatedStyle,
					]}
				>
					{headerImage}
				</Animated.View>
				<ThemedView style={styles.content}>{children}</ThemedView>
			</Animated.ScrollView>
		</ThemedView>
	);
};

export default ParallaxScrollView;