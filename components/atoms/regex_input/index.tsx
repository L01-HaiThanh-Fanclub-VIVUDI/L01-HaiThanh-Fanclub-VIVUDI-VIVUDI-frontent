/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 *******************************************************************************
 *  File        : regex_input/index.tsx                                       *
 *  Author      : Minh Nhật                                                   *
 *  Created     : 19/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import { useDebounce } from '@/hooks/useDebounce';
import { useLanguage } from '@/languages/provider';
import { MSG_ID } from '@/languages/provider/types';
import { useScreenWrapper } from '@/providers/screen_wrapper_provider';
import { ScreenWrapperConfig } from '@/providers/screen_wrapper_provider/types';
import { REGEX } from '@/settings/regex';
import { RegexMsgMap } from '@/settings/regex/types';
import { MaterialIcons } from '@expo/vector-icons';
import React, { ForwardedRef, forwardRef, JSX, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Animated, StyleProp, Text, TextInput, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import Button from '../button';
import { styles } from './styles';
import { RegexInputCheckType, RegexInputProps, RegexInputType } from './types';

/******************************************************************************
 * Define các giá trị mặc định cho component                                  *
 ******************************************************************************/
const DEFAULT_CHECKLIST_PADDING_VALUE: number = 10;
const DEFAULT_INPUT_TYPE_VALUE: RegexInputType = 'text';
const DEFAULT_REGEX_CHECKS_VALUE: RegexInputCheckType[] = [];

/******************************************************************************
 * Map các regex sang message ID để hiển thị thông báo tương ứng              *
 ******************************************************************************/
const REGEX_MSG_MAP: RegexMsgMap = {
    REGEX_MIN_LENGTH: MSG_ID.MSG_REGEX_MIN_LENGTH,
    REGEX_ONE_UPPER: MSG_ID.MSG_REGEX_ONE_UPPER,
    REGEX_ONE_LOWER: MSG_ID.MSG_REGEX_ONE_LOWER,
    REGEX_ONE_DIGIT: MSG_ID.MSG_REGEX_ONE_DIGIT,
    REGEX_ONE_SPECIAL: MSG_ID.MSG_REGEX_ONE_SPECIAL,
    REGEX_NO_WHITESPACE: MSG_ID.MSG_REGEX_NO_WHITESPACE,
    REGEX_EMAIL: MSG_ID.MSG_REGEX_EMAIL,
};

/******************************************************************************
 * RegexInput: Input có overlay checklist kiểm tra regex                      *
 ******************************************************************************/
const RegexInput = forwardRef<TextInput, RegexInputProps>(({
    placeholder, style, value: propValue, onChangeText, regexChecks = DEFAULT_REGEX_CHECKS_VALUE, inputType = DEFAULT_INPUT_TYPE_VALUE, inputName, errorMessage, ...rest
}, ref: ForwardedRef<TextInput>): JSX.Element => {
    /******************************************************************************
     * State và ref                                                               *
     ******************************************************************************/
    const fallbackRef = useRef<TextInput>(null);
    // Sử dụng ref từ props hoặc fallbackRef nếu không có
    const inputRef = (ref as React.RefObject<TextInput>) || fallbackRef;
    // Giá trị của input, sử dụng propValue nếu có, nếu không thì sử dụng state internalValue
    const [internalValue, setInternalValue] = useState('');
    // Nếu propValue được cung cấp, sử dụng nó làm giá trị ban đầu
    const value = propValue !== undefined ? propValue : internalValue;
    // State để quản lý hiển thị toggle xem/ẩn password
    const [showPassword, setShowPassword] = useState(false);
    // State để quản lý focus của input
    const [focused, setFocused] = useState(false);
    // State để quản lý layout của input và checklist
    const [inputLayout, setInputLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
    // State để quản lý chiều cao của checklist
    const [checkHeight, setCheckHeight] = useState(0);
    // State để quản lý việc hiển thị checklist overlay
    const [shouldShowChecklist, setShouldShowChecklist] = useState(false);
    // Tính toán zIndex cho input dựa trên trạng thái focus
    const inputZIndex = useMemo(() => focused ? 3 : 0, [focused]);
    // Lấy hàm getMessage từ useLanguage để lấy thông điệp dựa trên MSG_ID
    const { getMessage } = useLanguage();
    // Lấy config từ ScreenWrapperProvider
    const { config, setConfig, screenId } = useScreenWrapper();
    // State để lưu cấu hình đã lưu khi input bị blur
    // Điều này giúp khôi phục cấu hình ban đầu khi input được focus lại
    const [storedConfig, setStoredConfig] = useState<ScreenWrapperConfig>({});

    /******************************************************************************
     * Sử dụng useRef để tạo các giá trị animated cho opacity và translate Y      *
     ******************************************************************************/
    const opacity = useRef(new Animated.Value(0)).current;
    const checkTranslate = useRef(new Animated.Value(10)).current;

    /******************************************************************************
     * Sử dụng useImperativeHandle để expose ref cho component cha                *
     ******************************************************************************/
    useImperativeHandle(ref, () => inputRef.current as TextInput, [inputRef]);

    /******************************************************************************
     * Memo hóa kết quả kiểm tra regex                                            *
     ******************************************************************************/
    const checks = useMemo(() => ({
        length: REGEX.REGEX_MIN_LENGTH.test(value),
        upper: REGEX.REGEX_ONE_UPPER.test(value),
        lower: REGEX.REGEX_ONE_LOWER.test(value),
        digit: REGEX.REGEX_ONE_DIGIT.test(value),
        special: REGEX.REGEX_ONE_SPECIAL.test(value),
        noWhitespace: REGEX.REGEX_NO_WHITESPACE.test(value),
        email: REGEX.REGEX_EMAIL.test(value),
    }), [value]);

    /******************************************************************************
     * Xử lý focus/blur và animation                                              *
     ******************************************************************************/
    const handleFocus = useCallback(() => {
        setTimeout(() => {
            (inputRef.current as TextInput)?.measure?.((_x, _y, width, height, pageX, pageY) => {
                setInputLayout({ x: pageX, y: pageY, width, height });
                setFocused(true);
                setShouldShowChecklist(true);

                Animated.parallel([
                    Animated.timing(opacity, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: false
                    }),
                    Animated.timing(checkTranslate, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: false
                    }),
                ]).start();
            });
        }, 50);
    }, [opacity, checkTranslate, inputRef]);

    /******************************************************************************
     * Xử lý blur và ẩn checklist overlay                                         *
     ******************************************************************************/
    const handleBlur = useCallback(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false
            }),
            Animated.timing(checkTranslate, {
                toValue: 10,
                duration: 200,
                useNativeDriver: false
            }),
        ]).start(() => {
            setFocused(false);
            setShouldShowChecklist(false);
        });
    }, [opacity, checkTranslate]);

    /******************************************************************************
     * Xử lý sự kiện nhấn vào overlay để blur input                               *
     ******************************************************************************/
    const handleBlurOverlayPress = useCallback(() => {
        (inputRef.current as TextInput)?.blur();
    }, [inputRef]);

    /******************************************************************************
     * Cleanup khi component unmount                                              *
     ******************************************************************************/
    useEffect(() => {
        return () => {
            opacity.setValue(0);
            checkTranslate.setValue(10);
        };
    }, [opacity, checkTranslate]);

    /******************************************************************************
     * Thiết lập cấu hình khi input được focus / unfocus                          *
     ******************************************************************************/
    useEffect(() => {
        if (focused) {
            // Lưu cấu hình hiện tại để khôi phục sau khi blur
            setStoredConfig(config);
            // Thiết lập cấu hình mới khi input được focus
            setConfig({
                disableDefaultGobackAction: true,
                handleGoback: () => {
                    (inputRef.current as TextInput)?.blur();
                    setFocused(false);
                },
            }, screenId);
        } else {
            // Khôi phục cấu hình đã lưu khi input bị blur
            if (storedConfig) {
                setConfig(storedConfig, screenId);
            };

            setStoredConfig({});
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focused]);

    /******************************************************************************
     * Tính toán vị trí checklist overlay                                         *
     ******************************************************************************/
    const { x, y, width } = inputLayout;
    const checkTopY = y - checkHeight - DEFAULT_CHECKLIST_PADDING_VALUE;

    /******************************************************************************
     * Tạo checklist items với các regex checks đã chọn                           *
     ******************************************************************************/
    const CHECK_ITEMS = useMemo<{ key: RegexInputCheckType; msgKey: MSG_ID }[]>(() => [
        { key: 'length', msgKey: REGEX_MSG_MAP.REGEX_MIN_LENGTH! },
        { key: 'upper', msgKey: REGEX_MSG_MAP.REGEX_ONE_UPPER! },
        { key: 'lower', msgKey: REGEX_MSG_MAP.REGEX_ONE_LOWER! },
        { key: 'digit', msgKey: REGEX_MSG_MAP.REGEX_ONE_DIGIT! },
        { key: 'special', msgKey: REGEX_MSG_MAP.REGEX_ONE_SPECIAL! },
        { key: 'noWhitespace', msgKey: REGEX_MSG_MAP.REGEX_NO_WHITESPACE! },
        { key: 'email', msgKey: REGEX_MSG_MAP.REGEX_EMAIL! },
    ], []);

    const renderChecklist = useCallback(() => {
        if (!focused || !shouldShowChecklist || (regexChecks.length === 0 && !errorMessage)) return null;
        /******************************************************************************
         * Render checklist overlay                                                   *
         ******************************************************************************/
        return (
            <Animated.View
                onLayout={e => setCheckHeight(e.nativeEvent.layout.height)}
                style={[
                    styles.checklist,
                    errorMessage && styles.errorContainer,
                    {
                        top: Math.max(checkTopY, DEFAULT_CHECKLIST_PADDING_VALUE),
                        left: x,
                        width,
                        opacity,
                        transform: [{ translateY: checkTranslate }],
                    },
                ]}
                pointerEvents="none"
            >
                {/* Nếu có inputName, hiển thị tiêu đề checklist */}
                {inputName && <Text style={styles.checkTitle}>{getMessage(MSG_ID.MSG_REGEX_INPUT, inputName)}</Text>}

                {CHECK_ITEMS.filter(item => regexChecks.includes(item.key)).map(item => (
                    <Text
                        key={item.key}
                        style={[
                            styles.checkItem,
                            checks[item.key] && styles.pass
                        ]}
                    >
                        • {getMessage(item.msgKey!)}
                    </Text>
                ))}

                {/* Hiển thị thông báo lỗi nếu có */}
                {errorMessage && (
                    <Text style={styles.errorMessage}>
                        {errorMessage}
                    </Text>
                )}
            </Animated.View>
        );
    }, [focused, shouldShowChecklist, checkTopY, x, width, opacity, checkTranslate, checks, getMessage, regexChecks, CHECK_ITEMS, inputName, errorMessage]);

    /******************************************************************************
     * Render blur overlay                                                        *
     ******************************************************************************/
    const renderBlurOverlay = useCallback(() => {
        if (!focused || !shouldShowChecklist) return null;
        return (
            <TouchableWithoutFeedback onPress={handleBlurOverlayPress}>
                <Animated.View style={[styles.blurOverlay, { opacity }]} />
            </TouchableWithoutFeedback>
        );
    }, [focused, shouldShowChecklist, handleBlurOverlayPress, opacity]);

    /******************************************************************************
     * Render input                                                               *
     ******************************************************************************/
    const [debouncedText, setDebouncedText] = useState(value);

    const handleChangeText = (text: string) => {
        // Cập nhật giá trị của input ngay lập tức (không loại bỏ ký tự đặc biệt)
        if (onChangeText) {
            onChangeText(text);
        };

        if (propValue === undefined) {
            setInternalValue(text);
        };

        setDebouncedText(text);
    };

    useDebounce(
        debouncedText,
        (text) => {
            let processedText = text;
            if (regexChecks.includes('noWhitespace')) {
                processedText = processedText.replace(/\s+/g, '');
            };
            // Loại bỏ ký tự không phải ASCII
            processedText = processedText.replace(/[^ -~]/g, '');

            // Nếu đã thay đổi so với text ban đầu thì cập nhật lại
            if (processedText !== text) {
                if (onChangeText) {
                    onChangeText(processedText);
                };

                if (propValue === undefined) {
                    setInternalValue(processedText);
                };
            };
        },
        1000
    );

    return (
        <>
            {renderBlurOverlay()}
            {renderChecklist()}

            <Animated.View style={[styles.inputContainer, { zIndex: inputZIndex }, style as StyleProp<ViewStyle>]} onLayout={e => setInputLayout(e.nativeEvent.layout)}>
                <TextInput
                    ref={inputRef}
                    style={[style, styles.input, { paddingRight: inputType === 'password' ? 40 : undefined }, errorMessage ? styles.errorContainer : {}]}
                    placeholder={placeholder}
                    secureTextEntry={inputType === 'password' && !showPassword}
                    value={value}
                    onChangeText={handleChangeText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    cursorColor={errorMessage ? '#ef4444' : '#bbb'}
                    placeholderTextColor={errorMessage ? '#ef4444' : '#bbb'}
                    {...rest}
                />

                {/* Render nút hiển thị/ẩn password nếu inputType là 'password' */}
                {inputType === 'password' && (
                    <Animated.View style={[styles.passwordEye, { zIndex: inputZIndex + 1 }]}>
                        <Button style={styles.passwordEyeButton} onTap={() => setShowPassword(!showPassword)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                            <MaterialIcons
                                name={showPassword ? 'visibility' : 'visibility-off'}
                                size={20}
                                color={errorMessage ? '#ef4444' : '#7D848D'}
                            />
                        </Button>
                    </Animated.View>
                )}
            </Animated.View>
        </>
    );
});

// Đặt tên cho component để dễ dàng nhận diện trong React DevTools
RegexInput.displayName = "RegexInput";

export default RegexInput;