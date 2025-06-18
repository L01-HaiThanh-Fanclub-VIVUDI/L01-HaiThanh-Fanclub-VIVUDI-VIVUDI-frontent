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
import type { FC, JSX } from 'react';
import React, { useMemo } from 'react';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import TopCurveView from './concave_header';
import { styles } from './styles';
import { ParallaxScrollViewProps } from './types';

/******************************************************************************
 * Định nghĩa hằng số cho chiều cao header                                    *
 ******************************************************************************/
const DEFAULT_HEADER_HEIGHT_VALUE: number = 430;

/******************************************************************************
 * ParallaxScrollView: ScrollView với hiệu ứng parallax cho header            *
 ******************************************************************************/
const ParallaxScrollView: FC<ParallaxScrollViewProps> = ({ children, headerImage, headerBackgroundColor, headerHeightValue = DEFAULT_HEADER_HEIGHT_VALUE, contentStyle }: ParallaxScrollViewProps): JSX.Element => {
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
					[-headerHeightValue, 0, headerHeightValue],
					[-headerHeightValue / 2, 0, headerHeightValue * 0.75]
				),
			},
			{
				scale: interpolate(
					scrollOffset.value,
					[-headerHeightValue, 0, headerHeightValue],
					[2, 1, 1]
				),
			},
		],
	}));

	/******************************************************************************
	 * Tính toán style cho header container                                        *
	 * - Kết hợp chiều cao, màu nền và animated style                             *
	 ******************************************************************************/
	const headerContainerStyle = useMemo(
		() => [
			{ height: headerHeightValue, backgroundColor: headerBackgroundColor[colorScheme] },
			styles.header,
			headerAnimatedStyle,
		],
		[headerHeightValue, headerBackgroundColor, colorScheme, headerAnimatedStyle]
	);

	/******************************************************************************
	 * Render component                                                           *
	 ******************************************************************************/
	return (
		<ThemedView style={styles.container}>
			<Animated.ScrollView
				ref={scrollRef}
				scrollEventThrottle={16}
				scrollIndicatorInsets={styles.indicator}
				contentContainerStyle={styles.contentContainer}
			>
				<Animated.View
					style={headerContainerStyle}
				>
					{headerImage}
				</Animated.View>

				<TopCurveView />

				<ThemedView style={[styles.contentWrapper, contentStyle]}>
					<ThemedView style={styles.content}>
						{children}
					</ThemedView>
				</ThemedView>
			</Animated.ScrollView>
		</ThemedView>
	);
};

export default ParallaxScrollView;