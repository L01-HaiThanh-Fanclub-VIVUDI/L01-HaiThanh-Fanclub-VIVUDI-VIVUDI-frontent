/******************************************************************************
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : loading_screen/index.tsx                                    *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 14/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
 ******************************************************************************/

import ThemedView from '@/components/atoms/themed_view';
import type { FC, JSX } from 'react';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, Image, View } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';
import { styles } from './styles';

/******************************************************************************
 * LoadingScreen: Hiển thị màn hình loading động                              *
 ******************************************************************************/
const LoadingScreen: FC = (): JSX.Element => {
    /******************************************************************************
     * Khởi tạo các giá trị animation                                             *
     ******************************************************************************/
    const bounceAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    /******************************************************************************
     * Khởi động loop animation                                                   *
     ******************************************************************************/
    // Dùng useCallback để tạo hàm startAnimation
    const startAnimation = useCallback(() => {
        // Bounce lên xuống (0→1→0) lặp vô hạn
        const bounceLoop = Animated.loop(
            Animated.sequence([
                Animated.timing(bounceAnim, {
                    toValue: 1,
                    duration: 350,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(bounceAnim, {
                    toValue: 0,
                    duration: 350,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        );
        // Xoay tròn liên tục (0→1) thành 0→360°
        const rotateLoop = Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 2000, // 1 vòng xoay mất 2s
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );
        bounceLoop.start();
        rotateLoop.start();

        // Cleanup khi unmount
        return () => {
            bounceLoop.stop();
            rotateLoop.stop();
        };
    }, [bounceAnim, rotateAnim]);

    useEffect(() => {
        const cleanup = startAnimation();
        return cleanup;
    }, [startAnimation]);

    /******************************************************************************
     * Interpolate giá trị cho các transform                                      *
     ******************************************************************************/
    // Dùng useMemo để memoize các giá trị interpolate
    // Nhảy từ 0 → 18 → 0
    const translateY = useMemo(
        () =>
            bounceAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 18],
            }),
        [bounceAnim]
    );
    // Scale X cho shadow theo nhịp bounce
    const shadowScaleX = useMemo(
        () =>
            bounceAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.2],
            }),
        [bounceAnim]
    );
    // Xoay tròn 360° từ rotateAnim
    const rotate = useMemo(
        () =>
            rotateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
            }),
        [rotateAnim]
    );

    /******************************************************************************
     * Render component                                                           *
     ******************************************************************************/
    return (
        <ThemedView style={styles.overlay} pointerEvents="auto">
            <ThemedView style={styles.container}>
                <View style={styles.loaderWrapper}>
                    <Animated.View
                        style={[{ transform: [{ scaleX: shadowScaleX }] }, styles.shadow]}
                    >
                        <Svg height={7} width={70}>
                            <Ellipse
                                cx="35"
                                cy="3.5"
                                rx="35"
                                ry="3.5"
                                fill="#FF678B50" // bạn có thể chỉnh màu tùy theme
                            />
                        </Svg>
                    </Animated.View>

                    {/* Box: nhảy lên xuống + xoay tròn */}
                    <Animated.View
                        style={[
                            styles.box,
                            {
                                transform: [
                                    { translateY },
                                    { rotate },
                                ],
                            },
                        ]}
                    >
                        {/* Logo nằm giữa hộp */}
                        <Image
                            source={require('@/assets/images/adaptive-icon.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </Animated.View>
                </View>
            </ThemedView>
        </ThemedView>
    );
};

export default LoadingScreen;