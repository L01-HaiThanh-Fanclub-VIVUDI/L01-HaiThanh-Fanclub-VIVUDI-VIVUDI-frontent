/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : stage_dots/index.tsx                                        *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 17/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import { FC, JSX } from 'react';
import { View } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming, } from 'react-native-reanimated';
import { styles } from './styles';
import { DotProps, StageDotsProps } from './types';

/******************************************************************************
 * Define các giá trị mặc định cho component                                  *
 ******************************************************************************/
const DEFAULT_HEIGHT_VALUE: number = 16; // Chiều cao mặc định cho dot
const DEFAULT_INACTIVE_COLOR_VALUE: string = '#CCC'; // Màu sắc cho dot không active
const DEFAULT_ACTIVE_COLOR_VALUE: string = '#3D85FF'; // Màu sắc cho dot active

/******************************************************************************
 * StageDots: Hiển thị các dot trạng thái                                     *
 ******************************************************************************/
const StageDots: FC<StageDotsProps> = ({ lengths, height = DEFAULT_HEIGHT_VALUE, activeIndex, inactiveColor = DEFAULT_INACTIVE_COLOR_VALUE, activeColor = DEFAULT_ACTIVE_COLOR_VALUE, activeExtraWidth = 8, style, }): JSX.Element => (
    <View style={[styles.container, style]}>
        {lengths.map((len, idx) => (
            <Dot
                key={idx}
                length={len}
                height={height}
                isActive={idx === activeIndex}
                inactiveColor={inactiveColor}
                activeColor={activeColor}
                activeExtraWidth={activeExtraWidth}
            />
        ))}
    </View>
);

/******************************************************************************
 * Dot: Dot đơn lẻ với hiệu ứng animated                                      *
 ******************************************************************************/
const Dot: FC<DotProps> = ({ length, height, isActive, inactiveColor, activeColor, activeExtraWidth, }): JSX.Element => {
    /******************************************************************************
     * 0 = inactive, 1 = active                                                   *
     ******************************************************************************/
    const progress = useDerivedValue(
        () => withTiming(isActive ? 1 : 0, { duration: 300 }),
        [isActive]
    );

    /******************************************************************************
     * Animated style cho dot                                                     *
     ******************************************************************************/
    const aStyle = useAnimatedStyle(() => {
        const animatedWidth = length + activeExtraWidth * progress.value;
        const animatedBackgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            [inactiveColor, activeColor]
        );
        const borderRadius = height / 2;
        const scale = progress.value === 1 ? withTiming(1.05, { duration: 200 }) : withTiming(1, { duration: 200 });

        return {
            width: animatedWidth,
            height,
            backgroundColor: animatedBackgroundColor,
            borderRadius,
            transform: [
                { scale },
            ],
        };
    }, [inactiveColor, activeColor, length, height, activeExtraWidth, isActive]);

    return <Animated.View style={[styles.dot, aStyle]} />;
};

export default StageDots;