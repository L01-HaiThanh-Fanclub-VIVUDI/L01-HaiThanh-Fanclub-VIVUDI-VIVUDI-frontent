/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : auth_register/page.tsx                                      *
 *  Author      : AI Assistant                                                *
 *  Created     : 28/12/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import Button from '@/components/atoms/button';
import RegexInput from '@/components/atoms/regex_input';
import ThemedView from '@/components/atoms/themed_view';
import { useLanguage } from '@/languages/provider';
import { MSG_API_ID, MSG_ID } from '@/languages/provider/types';
import { ApiResponse } from '@/models/api_response';
import { RegisterDto, RegisterResponseDTO } from '@/models/auth_register.dto';
import { useLoading } from '@/providers/loading_provider';
import { useScreenWrapper } from '@/providers/screen_wrapper_provider';
import { authService } from '@/services/auth.service';
import { PAGE_ID } from '@/settings/navigation/page';
import { AppStackNavigation } from '@/settings/navigation/route_params';
import { REGEX } from '@/settings/regex';
import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FC, JSX, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, ImageSourcePropType, Text, TextInput, useColorScheme, View } from 'react-native';
import { styles } from './styles';

/******************************************************************************
 * SocialButton: Định nghĩa kiểu cho nút social button                        *
 * Mỗi nút sẽ có một khóa duy nhất và ảnh hiển thị                            *
 ******************************************************************************/
export type SocialButton = {
    key: string;
    image: ImageSourcePropType;
};

/******************************************************************************
 * AuthRegisterPage: Màn hình đăng ký của ứng dụng                           *
 ******************************************************************************/
const AuthRegisterPage: FC = (): JSX.Element => {
    /******************************************************************************
     * Danh sách các nút social button với ảnh tương ứng                          *
     ******************************************************************************/
    const SOCIAL_BUTTONS: SocialButton[] = [
        {
            key: 'google',
            image: require('@/assets/images/auth/facebook.webp'),
        },
        {
            key: 'facebook',
            image: require('@/assets/images/auth/instagram.png'),
        },
        {
            key: 'apple',
            image: require('@/assets/images/auth/twitter.webp'),
        },
    ];

    /******************************************************************************
     * Lấy theme hiện tại                                                         *
     ******************************************************************************/
    const theme = useColorScheme() ?? 'light';
    const statusBarStyle = useMemo(() => (theme === 'dark' ? 'light' : 'dark'), [theme]);

    /******************************************************************************
     * Lấy các action liên quan đến loading từ context                            *
     ******************************************************************************/
    const { show, hide } = useLoading();

    /******************************************************************************
     * Lấy useLanguage                                                            *
     ******************************************************************************/
    const { t, getMessage, getAPIMessage } = useLanguage();

    /******************************************************************************
     * State và shared value cho animation                                        *
     ******************************************************************************/
    const { setConfig } = useScreenWrapper();

    /******************************************************************************
     * Lấy navigation                                                             *
     ******************************************************************************/
    const navigation = useNavigation<AppStackNavigation>();

    /******************************************************************************
     * State lưu field error và id message                                        *
     ******************************************************************************/
    const [fieldError, setFieldError] = useState<Partial<Record<'email' | 'phone_number' | 'password', MSG_ID>>>();

    /******************************************************************************
     * State lưu field error và id api message                                    *
     ******************************************************************************/
    const [apiFieldError, setApiFieldError] = useState<Partial<Record<'email' | 'phone_number' | 'password', MSG_API_ID>>>();

    /******************************************************************************
     * State cho các trường nhập liệu                                             *
     ******************************************************************************/
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    /******************************************************************************
     * Ref cho các trường trên                                                    *
     ******************************************************************************/
    const emailRef = useRef<TextInput>(null);
    const phoneRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);

    /******************************************************************************
     * handleGoback: hàm override nút go back trên header                         *
     ******************************************************************************/
    const handleGoback = () => navigation.goBack();

    /******************************************************************************
     * Focus các field                                                            *
     ******************************************************************************/
    const focusEmail = () => emailRef.current?.focus();
    const focusPhone = () => phoneRef.current?.focus();
    const focusPassword = () => passwordRef.current?.focus();

    /******************************************************************************
     * validateEmail: Kiểm tra tính hợp lệ của email                              *
     ******************************************************************************/
    const validateEmail = useMemo(() => {
        return (): boolean => {
            if (!email) { focusEmail(); setFieldError({ email: MSG_ID.MSG_REQUIRED }); return false; }
            if (!REGEX.REGEX_EMAIL.test(email)) { focusEmail(); setFieldError({ email: MSG_ID.MSG_REGEX }); return false; }
            setFieldError((prev) => ({ ...prev, email: undefined }));
            return true;
        };
    }, [email]);

    /******************************************************************************
     * validatePhone: Kiểm tra tính hợp lệ của phone_number                       *
     ******************************************************************************/
    const validatePhone = useMemo(() => {
        return (): boolean => {
            if (!phoneNumber) { focusPhone(); setFieldError({ phone_number: MSG_ID.MSG_REQUIRED }); return false; }
            if (!REGEX.REGEX_PHONE.test(phoneNumber)) { focusPhone(); setFieldError({ phone_number: MSG_ID.MSG_REGEX }); return false; }
            setFieldError((prev) => ({ ...prev, phone_number: undefined }));
            return true;
        };
    }, [phoneNumber]);

    /******************************************************************************
     * validatePassword: Kiểm tra tính hợp lệ của password                        *
     ******************************************************************************/
    const validatePassword = useMemo(() => {
        return (): boolean => {
            if (!password) { focusPassword(); setFieldError({ password: MSG_ID.MSG_REQUIRED }); return false; }
            if (!REGEX.REGEX_PASSWORD.test(password)) { focusPassword(); setFieldError({ password: MSG_ID.MSG_REGEX }); return false; }
            return true;
        };
    }, [password]);

    /******************************************************************************
     * validateFields: Kiểm tra tính hợp lệ của tất cả các trường                 *
     ******************************************************************************/
    const validateFields = useMemo(() => {
        return (): boolean => {
            if (!validateEmail()) return false;
            if (!validatePhone()) return false;
            if (!validatePassword()) return false;
            return true;
        };
    }, [validateEmail, validatePhone, validatePassword]);

    /******************************************************************************
     * getMessageByID: Hàm lấy message theo ID của field error                    *
     ******************************************************************************/
    const getMessageByID = useCallback((field: 'email' | 'phone_number' | 'password'): string | undefined => {
        const messageId = fieldError?.[field];
        if (messageId === undefined) return undefined;
        const fieldName = t(`authentication.${field === 'phone_number' ? 'phoneField' : field + 'Field'}`);
        return getMessage(messageId, fieldName);
    }, [fieldError, getMessage, t]);

    /******************************************************************************
     * getAPIMessageByID: Hàm lấy message theo ID của apiFieldError               *
     ******************************************************************************/
    const getAPIMessageByID = useCallback((field: 'email' | 'phone_number' | 'password'): string | undefined => {
        const apiMessageId = apiFieldError?.[field];
        if (apiMessageId === undefined) return undefined;
        const fieldName = t(`authentication.${field === 'phone_number' ? 'phoneField' : field + 'Field'}`);
        return getAPIMessage(MSG_ID.MSG_AUTH_REGISTER, apiMessageId, fieldName);
    }, [apiFieldError, getAPIMessage, t]);

    /******************************************************************************
     * handleApiResponse: Xử lý phản hồi từ API                                   *
     ******************************************************************************/
    const handleApiResponse = useCallback((response: ApiResponse<RegisterResponseDTO | null>) => {
        switch (response.statusCode) {
            case 0:
                // Nếu đăng ký thành công, điều hướng đến trang privates
                navigation.replace(PAGE_ID.PRIVATE_TABS, { screen: PAGE_ID.GENERAL });
                break;
            case 100:
                // Email đã tồn tại
                setApiFieldError({ email: response.statusCode });
                focusEmail();
                break;
            case 101:
                // Số điện thoại đã tồn tại
                setApiFieldError({ phone_number: response.statusCode });
                focusPhone();
                break;
            case 102:
                // Email không hợp lệ
                setApiFieldError({ email: response.statusCode });
                focusEmail();
                break;
            case 103:
                // Số điện thoại không hợp lệ
                setApiFieldError({ phone_number: response.statusCode });
                focusPhone();
                break;
            case 104:
                // Mật khẩu không đủ mạnh
                setPassword('');
                setApiFieldError({ password: response.statusCode });
                focusPassword();
                break;
            default:
            // Xử lý các mã lỗi khác nếu cần
        };
    }, [navigation]);

    /******************************************************************************
     * handleSignUp: Hàm thực hiện đăng ký                                        *
     ******************************************************************************/
    const handleSignUp = useCallback(async () => {
        // Kiểm tra tính hợp lệ của các trường
        if (!validateFields()) {
            return;
        };
        // Hiển thị loading
        show();

        try {
            // Tạo đối tượng DTO cho đăng ký
            const registerDTO: RegisterDto = {
                email: email.trim(),
                phone_number: phoneNumber.trim(),
                password: password.trim(),
            };

            // Gọi service đăng ký
            const response = await authService.register(registerDTO);
            // Xử lý phản hồi từ API
            handleApiResponse(response);

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            // Nếu có lỗi từ API
        } finally {
            // Ẩn loading sau khi hoàn thành
            hide();
        };
    }, [email, phoneNumber, password, validateFields, show, hide, handleApiResponse]);

    /******************************************************************************
     * Xử lý sự kiện khi nhấn Enter trên các trường                               *
     ******************************************************************************/
    const onSubmitEditingEmail = useCallback(() => {
        if (validateEmail()) {
            focusPhone();
        };
    }, [validateEmail]);

    const onSubmitEditingPhone = useCallback(() => {
        if (validatePhone()) {
            focusPassword();
        };
    }, [validatePhone]);

    const onSubmitEditingPassword = useCallback(() => {
        if (validatePassword()) {
            handleSignUp();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [validatePassword]);

    /******************************************************************************
     * Xử lý thay đổi text cho các trường                                         *
     ******************************************************************************/
    const handleEmailChange = (text: string) => {
        setEmail(text);
        setFieldError((prev) => ({ ...prev, email: undefined }));
        setApiFieldError((prev) => ({ ...prev, email: undefined }));
    };

    const handlePhoneChange = (text: string) => {
        setPhoneNumber(text);
        setFieldError((prev) => ({ ...prev, phone_number: undefined }));
        setApiFieldError((prev) => ({ ...prev, phone_number: undefined }));
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        setFieldError((prev) => ({ ...prev, password: undefined }));
        setApiFieldError((prev) => ({ ...prev, password: undefined }));
    };

    /******************************************************************************
     * Thiết lập cấu hình màn hình khi mount                                      *
     ******************************************************************************/
    useEffect(() => {
        setConfig({
            disableDefaultGobackAction: false,
            handleGoback: handleGoback,
        }, PAGE_ID.AUTH_REGISTER);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /******************************************************************************
     * Render component                                                           *
     ******************************************************************************/
    return (
        <ThemedView style={styles.container}>
            {/* StatusBar với style phù hợp */}
            <StatusBar style={statusBarStyle} />

            <ThemedView style={styles.innerContainer}>
                {/* Header với tiêu đề và phụ đề */}
                <ThemedView style={styles.headerContainer}>
                    <ThemedView style={styles.titleContainer}>
                        <Text style={styles.title}>
                            {t('authentication.signUpTitle')}
                        </Text>
                    </ThemedView>

                    <ThemedView style={styles.subtitleContainer}>
                        <Text style={styles.subtitle}>
                            {t('authentication.signUpSubtitle')}
                        </Text>
                    </ThemedView>
                </ThemedView>

                <RegexInput
                    style={styles.input}
                    ref={emailRef}
                    value={email}
                    onChangeText={handleEmailChange}
                    regexChecks={['email', 'noWhitespace']}
                    inputType="text"
                    inputName={t('authentication.emailField')}
                    placeholder="example@gmail.com"
                    errorMessage={getMessageByID('email') || getAPIMessageByID('email')}
                    returnKeyType="next"
                    onSubmitEditing={onSubmitEditingEmail}
                />

                <RegexInput
                    style={styles.phoneInput}
                    ref={phoneRef}
                    value={phoneNumber}
                    onChangeText={handlePhoneChange}
                    regexChecks={['noWhitespace']}
                    inputType="text"
                    inputName={t('authentication.phoneField')}
                    placeholder={t('authentication.phonePlaceholder')}
                    errorMessage={getMessageByID('phone_number') || getAPIMessageByID('phone_number')}
                    returnKeyType="next"
                    onSubmitEditing={onSubmitEditingPhone}
                />

                <RegexInput
                    style={styles.passwordInput}
                    ref={passwordRef}
                    value={password}
                    onChangeText={handlePasswordChange}
                    regexChecks={['length', 'upper', 'lower', 'digit', 'special', 'noWhitespace']}
                    inputType="password"
                    inputName={t('authentication.passwordField')}
                    placeholder={t('authentication.passwordPlaceholder')}
                    errorMessage={getMessageByID('password') || getAPIMessageByID('password')}
                    returnKeyType="done"
                    onSubmitEditing={onSubmitEditingPassword}
                />
            </ThemedView>

            {/* Nút đăng ký và các nút social button */}
            <ThemedView style={styles.footerContainer}>
                <Button style={styles.signUpButton} onTap={handleSignUp}>
                    <Text style={styles.signUpButtonText}>
                        {t('authentication.signUpButton')}
                    </Text>
                </Button>

                <ThemedView style={styles.signInRow}>
                    <Text style={styles.signInText}>
                        {t('authentication.alreadyHaveAccount')}
                    </Text>
                    <Text style={styles.signInButton} onPress={() => navigation.goBack()}>
                        {t('authentication.signInLink')}
                    </Text>
                </ThemedView>

                <ThemedView style={styles.connectRow}>
                    <View style={styles.connectLine} />

                    <Text style={styles.connectText}>
                        {t('authentication.connectMessage')}
                    </Text>

                    <View style={styles.connectLine} />
                </ThemedView>

                <ThemedView style={styles.socialRow}>
                    {SOCIAL_BUTTONS.map((button) => (
                        <Button
                            key={button.key}
                            style={styles.socialButton}
                            onTap={() => { }}
                        >
                            <Image
                                source={button.image}
                                style={styles.socialImage}
                                resizeMode="cover"
                            />
                        </Button>
                    ))}
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
};

export default AuthRegisterPage;
