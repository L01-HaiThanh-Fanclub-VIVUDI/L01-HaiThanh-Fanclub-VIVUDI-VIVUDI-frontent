/****************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                    *
 ****************************************************************************
 *  File        : Dùng define cho navigation của RN                         *
 *  Author      : Minh Nhat                                                 *
 *  Created     : 29/05/2025                                                *
 *  Updated by  :                                                           *
 *  Modified    :                                                           *
\****************************************************************************/

import { CreatePostParams } from "@/pages/new_post/step2";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PAGE_ID } from "./page";

/****************************************************************************
 * RootStackParamList: Các màn hình được stack toàn cục trong ứng dụng      *
 ****************************************************************************/
export type RootStackParamList = {
    [PAGE_ID.PRIVATE_TABS]: NavigatorScreenParams<PrivateTabParamList>;
    [PAGE_ID.ON_BOARD]: undefined;
    [PAGE_ID.AUTH_TABS]: NavigatorScreenParams<AuthTabParamList>;
    [PAGE_ID.NEW_REEL_TABS]: NavigatorScreenParams<NewReelTabParamList>;
    [PAGE_ID.HOME_TABS]: NavigatorScreenParams<HomeTabParamList>;
};

/****************************************************************************
 * PrivateTabParamList: Các màn hình chính thuộc private tab navigator      *
 ****************************************************************************/
export type PrivateTabParamList = {
    [PAGE_ID.GENERAL]: undefined;
    [PAGE_ID.PLACE_DETAIL]: { id: string } | undefined;
};

/****************************************************************************
 * AuthTabParamList: Các màn hinh chính thuộc auth tab navigator            *
 ****************************************************************************/
export type AuthTabParamList = {
    [PAGE_ID.AUTH_LOGIN]: undefined;
    [PAGE_ID.AUTH_SIGN_UP]: undefined;
    [PAGE_ID.AUTH_FORGOT_PASSWORD]: undefined;
    [PAGE_ID.AUTH_OTP_VERIFICATION]: undefined;
};

export type HomeTabParamList = {
    [PAGE_ID.HOME]: undefined;
    [PAGE_ID.PROFILE]: undefined;
    [PAGE_ID.SEARCH]: undefined;
    [PAGE_ID.REELS]: undefined;
    [PAGE_ID.MAP]: { destination?: string } | undefined;
};

export type NewReelTabParamList = {
    [PAGE_ID.MEDIA]: undefined;
    [PAGE_ID.CONTENT]: CreatePostParams;
};

/****************************************************************************
 * AppStackNavigation: Navigation cho root stack                            *
 ****************************************************************************/
export type AppStackNavigation<
    T extends keyof RootStackParamList = keyof RootStackParamList
> = StackNavigationProp<RootStackParamList, T>;

/****************************************************************************
 * TabNavigationProp: Navigation cho tab navigator                          *
 * Có kết hợp với Stack để dùng được ở bất cứ đâu trong tab                 *
 * @example: const navigation = useNavigation<TabNavigationProp>();         *
 * const navigation = useNavigation<TabNavigationProp<PAGE_ID.HOME>();      *
 ****************************************************************************/
export type TabNavigationProp<
    T extends keyof PrivateTabParamList = keyof PrivateTabParamList
> = CompositeNavigationProp<
    BottomTabNavigationProp<PrivateTabParamList, T>,
    StackNavigationProp<RootStackParamList>
>;

/****************************************************************************
 * AuthTabNavigationProp: Navigation cho auth tab navigator                 *
 * Có kết hợp với Stack để dùng được ở bất cứ đâu trong auth tab            *
 * @example: const navigation = useNavigation<AuthTabNavigationProp>();     *
 ****************************************************************************/
export type AuthTabNavigationProp<
    T extends keyof AuthTabParamList = keyof AuthTabParamList
> = CompositeNavigationProp<
    BottomTabNavigationProp<AuthTabParamList, T>,
    StackNavigationProp<RootStackParamList>
>;

/****************************************************************************
 * Ví dụ sử dụng trong các thành phần                                       *
 ****************************************************************************/
// Trong OnBoardScreen (ngoài AuthTab)
// const navigation = useNavigation<AppStackNavigation>();
// navigation.navigate(PAGE_ID.AUTH_TABS, {
//   screen: PAGE_ID.AUTH_LOGIN,
// });

// Trong LoginScreen (AuthTab)
// const navigation = useNavigation<AuthTabNavigationProp>();
// navigation.navigate(PAGE_ID.AUTH_SIGN_UP);

// Trong ProfileScreen (PrivateTab)
// const navigation = useNavigation<TabNavigationProp>();
// navigation.navigate(PAGE_ID.GENERAL);