/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : ScreenWrapper.tsx                                           *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 29/05/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import { useScreenWrapper } from '@/providers/screen_wrapper_provider';
import { AppNavigationProp } from '@/settings/navigation/route_params';
import { FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { JSX, useCallback } from 'react';
import { BackHandler, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';

/******************************************************************************
 * ScreenWrapper: Bọc màn hình với header tuỳ biến, hỗ trợ back, search, v.v. *
 * - Hiển thị nút back, tiêu đề, search box, action bên phải header.          *
 * - Xử lý sự kiện back mềm/cứng, cho phép tuỳ chỉnh.                         *
 ******************************************************************************/
const ScreenWrapper = ({ children }: { children: React.ReactNode }): JSX.Element => {
    /******************************************************************************
     * Lấy cấu hình từ context ScreenWrapperProvider                              *
     ******************************************************************************/
    const {
        config: {
            style,
            disableDefaultGobackAction = false,
            handleGoback,
            showScreenName = false,
            rightActions,
            searchValue,
            setSearchValue,
            searchPlaceholder = 'Tìm kiếm',
        },
    } = useScreenWrapper();

    /******************************************************************************
     * Khởi tạo navigation và route để lấy thông tin màn hình hiện tại            *
     ******************************************************************************/
    const navigation = useNavigation<AppNavigationProp>();
    const route = navigation.getState().routes[navigation.getState().index];

    /******************************************************************************
     * Lấy tên màn hình hiện tại                                                  *
     ******************************************************************************/
    const screenName = showScreenName ? route.name : null;

    /******************************************************************************
     * Lấy insets an toàn để điều chỉnh padding cho header và content             *
     ******************************************************************************/
    const insets = useSafeAreaInsets();

    /******************************************************************************
     * Chuẩn hoá rightActions thành mảng                                          *
     ******************************************************************************/
    const rightActionsArr = rightActions
        ? Array.isArray(rightActions)
            ? rightActions
            : [rightActions]
        : [];

    /******************************************************************************
     * Tính toán số lượng action để xác định style                                *
     ******************************************************************************/
    const actionCount = (handleGoback ? 1 : 0) + rightActionsArr.length;

    /******************************************************************************
     * Style cho search box và tiêu đề dựa trên số action                         *
     ******************************************************************************/
    const searchBoxWidth =
        actionCount === 2
            ? styles.searchBoxWidthThreeActions
            : actionCount === 1
                ? styles.searchBoxWidthTwoActions
                : styles.searchBoxWidthDefault;

    const screenNameText =
        actionCount === 2
            ? styles.screenTitleWithTwoActions
            : rightActionsArr.length
                ? styles.screenTitleWithRightAction
                : handleGoback
                    ? styles.screenTitleWithBack
                    : styles.screenTitle;

    /******************************************************************************
     * Xử lý back event                                                           *
     ******************************************************************************/
    const handleBack = () => {
        if (handleGoback) handleGoback();
        if (!disableDefaultGobackAction) navigation.goBack();
    };

    useFocusEffect(
        useCallback(() => {
            const unsubNav = navigation.addListener('beforeRemove', (e: { preventDefault: () => void }) => {
                if (disableDefaultGobackAction) {
                    e.preventDefault();
                    if (handleGoback) handleGoback();
                };
            });

            const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                if (disableDefaultGobackAction) {
                    if (handleGoback) handleGoback();
                    return true;
                };
                return false;
            });

            return () => {
                unsubNav();
                backHandler.remove();
            };
        }, [navigation, disableDefaultGobackAction, handleGoback])
    );

    /******************************************************************************
     * Render header content                                                      *
     ******************************************************************************/
    const renderHeader = () => (
        <View style={[{ top: insets.top }, styles.headerContainer]}>
            {handleGoback && (
                <View style={styles.backButtonContainer}>
                    <FontAwesome5 name="angle-left" size={23} color="#111827" onPress={handleBack} />
                </View>
            )}

            {searchValue !== null && searchValue !== undefined && !screenName && (
                <View style={styles.searchHeaderContainer}>
                    <View style={[styles.searchBoxContainer, searchBoxWidth]}>
                        <FontAwesome5 name="search" size={16} color="#9ca3af" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            value={searchValue}
                            onChangeText={setSearchValue}
                            placeholder={searchPlaceholder}
                            placeholderTextColor="#9ca3af"
                            cursorColor="#6b7280"
                        />
                    </View>
                </View>
            )}

            {screenName && (
                <Text style={[styles.screenTitle, screenNameText]}>{screenName}</Text>
            )}

            {rightActionsArr.map((action, idx) => (
                <TouchableOpacity key={idx} style={styles.actionButton} onPress={action.onPress}>
                    {action.icon}
                </TouchableOpacity>
            ))}
        </View>
    );

    /******************************************************************************
     * Render search box dưới header nếu có cả searchValue và screenName          *
     ******************************************************************************/
    const renderSearchBelowHeader = () =>
        searchValue !== null && searchValue !== undefined && screenName && (
            <View style={styles.searchHeaderWrapper}>
                <View style={styles.searchHeaderContainer}>
                    <View style={[styles.searchBoxContainer, styles.searchBoxWidthDefault]}>
                        <FontAwesome5 name="search" size={16} color="#9ca3af" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            value={searchValue}
                            onChangeText={setSearchValue}
                            placeholder={searchPlaceholder}
                            placeholderTextColor="#9ca3af"
                            cursorColor="#6b7280"
                        />
                    </View>
                </View>
            </View>
        );

    return (
        <View style={[styles.root, style, { paddingBottom: insets.bottom }]}>
            {renderHeader()}
            {renderSearchBelowHeader()}
            <View style={styles.contentContainer}>{children}</View>
        </View>
    );
};

export default ScreenWrapper;