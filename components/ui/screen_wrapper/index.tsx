/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : ScreenWrapper.tsx                                           *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 29/05/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import useCurrentPageId from '@/hooks/useCurrentPageId';
import { useScreenWrapper } from '@/providers/screen_wrapper_provider';
import { PAGE_ID } from '@/settings/navigation/page';
import { AppStackNavigation } from '@/settings/navigation/route_params';
import { FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { JSX, useCallback, useEffect, useState } from 'react';
import { BackHandler, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';

/******************************************************************************
 * Define các giá trị mặc định cho component                                  *
 ******************************************************************************/
const DEFAULT_DISABLE_DEFAULT_GOBACK_ACTION_VALUE: boolean = false;
const DEFAULT_SHOW_SCREEN_NAME_VALUE: boolean = false;

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
            disableDefaultGobackAction = DEFAULT_DISABLE_DEFAULT_GOBACK_ACTION_VALUE,
            handleGoback,
            showScreenName = DEFAULT_SHOW_SCREEN_NAME_VALUE,
            rightActions,
        },
    } = useScreenWrapper();

    /******************************************************************************
     * Khởi tạo navigation và route để lấy thông tin màn hình hiện tại            *
     ******************************************************************************/
    const navigation = useNavigation<AppStackNavigation>();

    /******************************************************************************
     * Lấy tên màn hình hiện tại                                                  *
     ******************************************************************************/
    const currentPageId = useCurrentPageId();
    const [currentScreenId, setCurrentScreenId] = useState<PAGE_ID>(PAGE_ID.GENERAL);
    const screenName = showScreenName ? currentScreenId : null;

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
     * Style cho tiêu đề dựa trên số action                                       *
     ******************************************************************************/
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
     * Câp nhật currentScreenId khi currentPageId thay đổi                        *
     ******************************************************************************/
    useEffect(() => {
        if (currentPageId) {
            setCurrentScreenId(currentPageId);
        };
    }, [currentPageId]);

    return (
        <View style={[styles.root, style, { paddingBottom: insets.bottom }]}>
            {renderHeader()}
            <View style={styles.contentContainer}>{children}</View>
        </View>
    );
};

export default ScreenWrapper;