/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : on_board/page.tsx                                           *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 18/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import Button from '@/components/atoms/button';
import StageDots from '@/components/atoms/stage_dots';
import ThemedText from '@/components/atoms/themed_text';
import ThemedView from '@/components/atoms/themed_view';
import { useScreenWrapper } from '@/providers/screen_wrapper_provider';
import { PAGE_ID } from '@/settings/navigation/page';
import { AppStackNavigation } from '@/settings/navigation/route_params';
import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { FC, JSX, useEffect, useState } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ArcLens from './arc_lens';
import { styles } from './styles';
import { Slide } from './types';

/******************************************************************************
 * Định nghĩa hằng số cho chiều rộng màn hình                                 *
 ******************************************************************************/
const { width: SCREEN_WIDTH_VALUE } = Dimensions.get('window');

/******************************************************************************
 * Danh sách các slide                                                        *
 ******************************************************************************/
const SLIDES: Slide[] = [
    {
        key: '1',
        image: require('@/assets/images/on_board/image_1.png'),
        title: ['Life is short and the world is ', 'wide'],
        highlightColor: '#FF7029',
        description:
            'At Friends tours and travel, we customize reliable and trustworthy educational tours to destinations all over the world',
        buttonColor: '#24BAEC',
        dotLength: [25, 13, 6],
        curveLeftPosition: -4,
        inactiveColor: '#CAEAFF',
    },
    {
        key: '2',
        image: require('@/assets/images/on_board/image_2.png'),
        title: ['People don’t take trips, trips take ', 'people'],
        highlightColor: '#1EB980',
        description:
            'To get the best of your adventure you just need to leave and go where we like, we are waiting for you',
        buttonColor: '#24BAEC',
        dotLength: [13.001, 25, 6],
        curveLeftPosition: 9,
        inactiveColor: '#CAEAFF',
    },
    {
        key: '3',
        image: require('@/assets/images/on_board/image_3.png'),
        title: ['It’s a big world out there go ', 'explore'],
        highlightColor: '#FF5680',
        description:
            'To get the best of your adventure you just need to leave and go where you like, we are waiting for you',
        buttonColor: '#FF678B',
        dotLength: [13, 6, 25],
        curveLeftPosition: 12,
        inactiveColor: '#FF9DB0',
    },
];

/******************************************************************************
 * OnBoardPage: Màn hình onboarding với hiệu ứng slide                        *
 ******************************************************************************/
const OnBoardPage: FC = (): JSX.Element => {
    /******************************************************************************
     * State và shared value cho animation                                        *
     ******************************************************************************/
    const { setConfig } = useScreenWrapper();
    const [active, setActive] = useState(0);
    const translateX = useSharedValue(0);

    /******************************************************************************
     * Lấy navigation                                                             *
     ******************************************************************************/
    const navigation = useNavigation<AppStackNavigation>();

    /******************************************************************************
     * Lấy insets an toàn để điều chỉnh padding cho header và content             *
     ******************************************************************************/
    const insets = useSafeAreaInsets();

    /******************************************************************************
     * Thiết lập cấu hình màn hình khi mount                                      *
     ******************************************************************************/
    useEffect(() => {
        setConfig({ disableDefaultGobackAction: true }, PAGE_ID.ON_BOARD);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /******************************************************************************
     * Khi active thay đổi, chạy animation                                        *
     ******************************************************************************/
    useEffect(() => {
        translateX.value = withTiming(-active * SCREEN_WIDTH_VALUE, { duration: 500 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    /******************************************************************************
     * Hàm chuyển sang slide tiếp theo hoặc kết thúc                              *
     ******************************************************************************/
    const goNext = () => {
        if (active < SLIDES.length - 1) setActive(active + 1);
        else {
            navigation.navigate(PAGE_ID.AUTH_TABS, {
                screen: PAGE_ID.AUTH_LOGIN,
            });
        };
    };

    /******************************************************************************
     * Hàm bỏ qua onboarding                                                      *
     ******************************************************************************/
    const onSkip = () => {
        navigation.navigate(PAGE_ID.AUTH_TABS, {
            screen: PAGE_ID.AUTH_LOGIN,
        });
    };

    /******************************************************************************
     * Lấy thông tin slide hiện tại                                               *
     ******************************************************************************/
    const {
        title, description, highlightColor, buttonColor, curveLeftPosition, inactiveColor,
    } = SLIDES[active];

    /******************************************************************************
     * Animated style cho row trượt                                               *
     ******************************************************************************/
    const rowStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    /******************************************************************************
     * Text cho button                                                            *
     ******************************************************************************/
    const buttonText = active === SLIDES.length - 1 ? 'Get Started' : 'Next';

    /******************************************************************************
     * Render component                                                           *
     ******************************************************************************/
    return (
        <ThemedView style={styles.root}>

            {/* StatusBar với style sáng */}
            <StatusBar style="light" />

            {/* Header với overflow hidden */}
            <View style={styles.imgContainer}>
                {/* Nút bấm bỏ qua */}
                <View style={[styles.skipBtnWrapper, { top: insets.top + 12 }]}>
                    <Button style={styles.skipBtn} onTap={onSkip}>
                        <Text style={styles.skipTxt}>Skip</Text>
                    </Button>
                </View>

                {/* Animated View cho slide ảnh */}
                <Animated.View style={[styles.imageAnimated, { width: SCREEN_WIDTH_VALUE * SLIDES.length }, rowStyle]}>
                    {SLIDES.map(slide => (
                        <View key={slide.key} style={[styles.imageWrapper, { width: SCREEN_WIDTH_VALUE }]}>
                            <Image
                                source={slide.image}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        </View>
                    ))}
                </Animated.View>
            </View>

            {/* Content */}
            <ThemedView style={styles.content}>
                <View style={styles.textContainer}>
                    <ThemedText style={styles.title}>
                        {title[0]}
                        <View style={styles.highlightContainer}>
                            <Text style={[styles.highlightText, { color: highlightColor }]}>
                                {title[1]}
                            </Text>

                            <ArcLens
                                height={10} width={70}
                                color={highlightColor}
                                style={[styles.arcLens, { left: curveLeftPosition }]}
                            />
                        </View>
                    </ThemedText>
                </View>

                <Text style={styles.desc}>{description}</Text>

                <StageDots
                    height={7} activeIndex={active} inactiveColor={inactiveColor}
                    activeColor={buttonColor} style={styles.dots} lengths={SLIDES[active].dotLength}
                />

                <Button onTap={goNext} style={[styles.btn, { backgroundColor: buttonColor }]}>
                    <Text style={styles.btnTxt}>
                        {buttonText}
                    </Text>
                </Button>
            </ThemedView>
        </ThemedView>
    );
};

export default OnBoardPage;