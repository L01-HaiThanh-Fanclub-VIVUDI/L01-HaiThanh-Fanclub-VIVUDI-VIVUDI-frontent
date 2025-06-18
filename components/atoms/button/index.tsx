/******************************************************************************
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : atoms/button/index.tsx                                      *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 16/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
 ******************************************************************************/

import React, { JSX, type FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { measure, runOnJS, useAnimatedRef, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ButtonProps } from './types';

/******************************************************************************
 * Button: Component hiệu ứng ripple khi nhấn                                 *
 ******************************************************************************/
const Button: FC<ButtonProps> = ({ onTap, children, style, ...rest }: ButtonProps): JSX.Element => {
    /******************************************************************************
     * Khởi tạo các shared value và animated ref                                  *
     ******************************************************************************/
    const centerX = useSharedValue(0);
    const centerY = useSharedValue(0);
    const scale = useSharedValue(0);
    const rippleOpacity = useSharedValue(0);
    const aRef = useAnimatedRef<View>();
    const rippleRadius = useSharedValue(0);

    /******************************************************************************
     * Gesture xử lý hiệu ứng ripple                                              *
     ******************************************************************************/
    const tapGesture = Gesture.Tap()
        .onStart((tapEvent) => {
            const layout = measure(aRef);
            if (!layout) return;

            const w = layout.width ?? 0;
            const h = layout.height ?? 0;
            const maxRadius = Math.sqrt(w ** 2 + h ** 2);

            centerX.value = tapEvent.x;
            centerY.value = tapEvent.y;
            rippleRadius.value = maxRadius;

            rippleOpacity.value = 0.2;
            scale.value = 0;

            scale.value = withTiming(1, { duration: 800 });
            rippleOpacity.value = withTiming(0, { duration: 800 });
        })
        .onEnd(() => {
            if (onTap) runOnJS(onTap)();
        });

    /******************************************************************************
     * Animated style cho hiệu ứng ripple                                         *
     ******************************************************************************/
    const rStyle = useAnimatedStyle(() => {
        const r = rippleRadius.value;

        return {
            width: r * 2,
            height: r * 2,
            borderRadius: r,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            opacity: rippleOpacity.value,
            position: 'absolute',
            transform: [
                { translateX: centerX.value - r },
                { translateY: centerY.value - r },
                { scale: scale.value },
            ],
        };
    });

    /******************************************************************************
     * Render component                                                           *
     ******************************************************************************/
    return (
        <View
            ref={aRef}
            {...rest}
            style={[{
                position: 'relative',
                overflow: 'hidden',
            }, style]}
        >
            <GestureDetector gesture={tapGesture}>
                <Animated.View style={StyleSheet.absoluteFill}>
                    <View style={[StyleSheet.absoluteFill, style]}>
                        {children}
                    </View>
                    <Animated.View style={rStyle} />
                </Animated.View>
            </GestureDetector>
        </View>
    );
};

export default Button;