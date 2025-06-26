/*****************************************************************************\
*                   © ViVuDi 2025. All rights reserved.                      *
******************************************************************************
*  File        : loading_screen/index.tsx                                    *
*  Author      : Minh Nhat                                                   *
*  Created     : 14/06/2025                                                  *
*  Updated by  :                                                             *
*  Modified    :                                                             *
\******************************************************************************/

import ThemedView from '@/components/atoms/themed_view';
import type { FC, JSX } from 'react';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Dimensions, Easing, Image, View } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';
import { styles } from './styles';
import { LoadingScreenProps } from './types';

/*******************************************************************************
 * LoadingScreen: Animated in/out from bottom to top with dynamic loader       *
 ******************************************************************************/
const LoadingScreen: FC<LoadingScreenProps> = ({ isVisible, onHidden }): JSX.Element => {
    const { height } = Dimensions.get('window');

    /*****************************************************************************
     * Khởi tạo các giá trị animation                                            *
     ******************************************************************************/
    const slideAnim = useRef(new Animated.Value(height)).current; // Wrapper slide
    const bounceAnim = useRef(new Animated.Value(0)).current;    // Bounce giá trị
    const rotateAnim = useRef(new Animated.Value(0)).current;    // Rotate giá trị

    /*****************************************************************************
     * startEntry: Thực hiện entry animation và khởi động loop                   *
     *****************************************************************************/
    const startEntry = useCallback(() => {
        // Slide-in từ dưới lên
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 400,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();

        // Bounce loop sequence
        const bounceLoop = Animated.loop(
            Animated.sequence([
                Animated.timing(bounceAnim, { toValue: 1, duration: 350, easing: Easing.linear, useNativeDriver: true }),
                Animated.timing(bounceAnim, { toValue: 0, duration: 350, easing: Easing.linear, useNativeDriver: true }),
            ]),
        );

        // Rotate loop
        const rotateLoop = Animated.loop(
            Animated.timing(rotateAnim, { toValue: 1, duration: 2000, easing: Easing.linear, useNativeDriver: true }),
        );

        bounceLoop.start();  // Bắt đầu bounce loop
        rotateLoop.start();  // Bắt đầu rotate loop

        return { bounceLoop, rotateLoop };
    }, [bounceAnim, rotateAnim, slideAnim]);

    /*****************************************************************************
     * startExit: Thực hiện exit animation và dọn dẹp loop khi hoàn thành        *
     *****************************************************************************/
    const startExit = useCallback(
        (loops: { bounceLoop: Animated.CompositeAnimation; rotateLoop: Animated.CompositeAnimation }) => {
            // Slide-out xuống dưới
            Animated.timing(slideAnim, {
                toValue: height,
                duration: 400,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }).start(({ finished }) => {
                if (finished) {
                    // Dừng các loop khi exit hoàn thành
                    loops.bounceLoop.stop();
                    loops.rotateLoop.stop();
                    onHidden();  // Báo về để unmount component
                };
            });
        },
        [height, slideAnim, onHidden],
    );

    /*****************************************************************************
     * useEffect: Khởi chạy entry/exit dựa trên prop isVisible                   *
     *****************************************************************************/
    useEffect(() => {
        const loops = startEntry();      // Chạy entry animation
        if (!isVisible) {
            startExit(loops);             // Nếu isVisible=false, chạy exit
        };
    }, [isVisible, startEntry, startExit]);

    /*****************************************************************************
     * Tạo giá trị transform dựa trên bounceAnim và rotateAnim                   *
     *****************************************************************************/
    const translateY = useMemo(
        () => bounceAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 18] }),
        [bounceAnim],
    );
    const shadowScaleX = useMemo(
        () => bounceAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.2] }),
        [bounceAnim],
    );
    const rotate = useMemo(
        () => rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }),
        [rotateAnim],
    );

    /*****************************************************************************
     * Render component                                                          *
     *****************************************************************************/
    return (
        <Animated.View
            style={[styles.overlay, { transform: [{ translateY: slideAnim }] }]}
            pointerEvents="auto"
        >
            <ThemedView style={styles.container}>
                <View style={styles.loaderWrapper}>
                    <Animated.View style={[{ transform: [{ scaleX: shadowScaleX }] }, styles.shadow]}>
                        <Svg height={7} width={70}>
                            <Ellipse cx="35" cy="3.5" rx="35" ry="3.5" fill="#FF678B50" />
                        </Svg>
                    </Animated.View>

                    <Animated.View
                        style={[
                            styles.box,
                            { transform: [{ translateY }, { rotate }] },
                        ]}
                    >
                        <Image
                            source={require('@/assets/images/adaptive-icon.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </Animated.View>
                </View>
            </ThemedView>
        </Animated.View>
    );
};

export default LoadingScreen;