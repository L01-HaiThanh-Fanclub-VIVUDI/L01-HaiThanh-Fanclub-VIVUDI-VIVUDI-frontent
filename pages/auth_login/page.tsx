/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : auth_login/page.tsx                                         *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 17/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import Button from '@/components/atoms/button';
import RegexInput from '@/components/atoms/regex_input';
import ThemedView from '@/components/atoms/themed_view';
import { useLanguage } from '@/languages/provider';
import { MSG_API_ID, MSG_ID } from '@/languages/provider/types';
import { ApiResponse } from '@/models/api_response';
import { LoginDTO, LoginResponseDTO } from '@/models/auth_login.dto';
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
    /****************************************************************************
     * Khóa định danh duy nhất cho SocialButton                                 *
     ****************************************************************************/
    key: string;
    /****************************************************************************
     * Ảnh hiển thị trên button                                                 *
     ****************************************************************************/
    image: ImageSourcePropType;
};

/******************************************************************************
 * AuthLoginPage: Màn hình login của ứng dụng                                 *
 ******************************************************************************/
const AuthLoginPage: FC = (): JSX.Element => {
    /******************************************************************************
     * Danh sách các nút social button với ảnh tương ứng                          *
     * Mỗi nút sẽ có một khóa duy nhất và ảnh hiển thị                            *
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
    const [fieldError, setFieldError] = useState<Partial<Record<'email' | 'password', MSG_ID>>>();

    /******************************************************************************
     * State lưu field error và id api message                                    *
     ******************************************************************************/
    const [apiFieldError, setApiFieldError] = useState<Partial<Record<'email' | 'password', MSG_API_ID>>>();

    /******************************************************************************
     * State cho trường email và password                                         *
     ******************************************************************************/
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    /******************************************************************************
     * Ref cho 2 trường trên                                                      *
     ******************************************************************************/
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);

    /******************************************************************************
     * handleGoback: hàm override nút go back trên header                         *
     ******************************************************************************/
    const handleGoback = () => navigation.replace(PAGE_ID.ON_BOARD);

    /******************************************************************************
     * Focus email: thực hiện focus vào field email                               *
     ******************************************************************************/
    const focusEmail = () => emailRef.current?.focus();

    /******************************************************************************
     * Focus password: thực hiện focus vào field password                         *
     ******************************************************************************/
    const focusPassword = () => passwordRef.current?.focus();

    /******************************************************************************
     * validateEmail: Kiểm tra tính hợp lệ của email                              *
     * - Nếu email rỗng, focus vào trường email và set lỗi field error            *
     * - Nếu email không hợp lệ theo regex, focus vào trường email và set lỗi    *
     * - Trả về true nếu email hợp lệ                                             *
     ******************************************************************************/
    const validateEmail = useMemo(() => {
        return (): boolean => {
            // Kiểm tra email có rỗng hay không
            if (!email) { focusEmail(); setFieldError({ email: MSG_ID.MSG_REQUIRED }); return false; }
            // Kiểm tra email có hợp lệ theo regex hay không
            if (!REGEX.REGEX_EMAIL.test(email)) { focusEmail(); setFieldError({ email: MSG_ID.MSG_REGEX }); return false; }
            // Nếu email hợp lệ, xoá lỗi field error
            setFieldError((prev) => ({ ...prev, email: undefined }));
            return true;
        };
    }, [email]);

    /******************************************************************************
     * validatePassword: Kiểm tra tính hợp lệ của password                        *
     * - Nếu password rỗng, focus vào trường password và set lỗi field error      *
     * - Nếu password không hợp lệ theo regex, focus vào trường và set lỗi        *
     * - Trả về true nếu password hợp lệ                                          *
     ******************************************************************************/
    const validatePassword = useMemo(() => {
        return (): boolean => {
            // Kiểm tra password có rỗng hay không
            if (!password) { focusPassword(); setFieldError({ password: MSG_ID.MSG_REQUIRED }); return false; }
            // Kiểm tra password có hợp lệ theo regex hay không
            if (!REGEX.REGEX_PASSWORD.test(password)) { focusPassword(); setFieldError({ password: MSG_ID.MSG_REGEX }); return false; }
            return true;
        };
    }, [password]);

    /******************************************************************************
     * validateFields: Kiểm tra tính hợp lệ của email và password                 *
     * - Nếu email không hợp lệ, focus vào trường email                           *
     * - Nếu password không hợp lệ, focus vào trường password                     *
     * - Trả về true nếu tất cả đều hợp lệ                                        *
     ******************************************************************************/
    const validateFields = useMemo(() => {
        return (): boolean => {
            // Kiểm tra tính hợp lệ của email
            if (!validateEmail()) return false; // Nếu email không hợp lệ, dừng lại
            // Kiểm tra tính hợp lệ của password
            if (!validatePassword()) return false; // Nếu password không hợp lệ, dừng lại

            return true;
        };
    }, [validateEmail, validatePassword]);

    /******************************************************************************
     * getMessageByID: Hàm lấy message theo ID của field error                    *
     * - Trả về chuỗi rỗng nếu không có lỗi                                       *
     * - Trả về message đã dịch nếu có lỗi                                        *
     ******************************************************************************/
    const getMessageByID = useCallback((field: 'email' | 'password'): string | undefined => {
        const messageId = fieldError?.[field];
        if (messageId === undefined) return undefined;
        const fieldName = t(`authentication.${field}Field`);
        return getMessage(messageId, fieldName);
    }, [fieldError, getMessage, t]);

    /******************************************************************************
     * getAPIMessageByID: Hàm lấy message theo ID của apiFieldError               *
     * - Trả về chuỗi rỗng nếu không có lỗi                                       *
     * - Trả về message đã dịch nếu có lỗi                                        *
     ******************************************************************************/
    const getAPIMessageByID = useCallback((field: 'email' | 'password'): string | undefined => {
        const apiMessageId = apiFieldError?.[field];
        if (apiMessageId === undefined) return undefined;
        const fieldName = t(`authentication.${field}Field`);
        return getAPIMessage(MSG_ID.MSG_AUTH_LOGIN, apiMessageId, fieldName);
    }, [apiFieldError, getAPIMessage, t]);

    /******************************************************************************
     * handleApiResponse: Xử lý phản hồi từ API                                   *
     * - Nếu đăng nhập thành công, điều hướng đến trang chính                     *
     * - Nếu có lỗi, cập nhật apiFieldError với mã lỗi                            *
     ******************************************************************************/
    const handleApiResponse = useCallback((response: ApiResponse<LoginResponseDTO | null>) => {
        switch (response.statusCode) {
            case 0:
                // Nếu đăng nhập thành công, điều hướng đến trang privates
                navigation.replace(PAGE_ID.PRIVATE_TABS, { screen: PAGE_ID.GENERAL });
                break;
            case 100:
            case 101:
                // Nếu email gây lỗi, cập nhật apiFieldError
                setApiFieldError({ email: response.statusCode });
                focusEmail(); // Focus vào trường email nếu có lỗi
                break;
            case 102:
            case 103:
                // Clear input password nếu có lỗi
                setPassword('');
                // Nếu mật khẩu gây lỗi, cập nhật apiFieldError
                setApiFieldError({ password: response.statusCode });
                focusPassword(); // Focus vào trường password nếu có lỗi
                break;
            default:
            // Xử lý các mã lỗi khác nếu cần
        };
    }, [navigation]);

    /******************************************************************************
     * handleSignIn: Hàm thực hiện đăng nhập                                      *
     * - Kiểm tra tính hợp lệ của các trường                                      *
     * - Hiển thị loading                                                         *
     * - Tạo đối tượng DTO cho đăng nhập                                          *
     * - Gọi service đăng nhập và xử lý phản hồi                                  *
     ******************************************************************************/
    const handleSignIn = useCallback(async () => {
        navigation.push(PAGE_ID.AUTH_TABS, { screen: PAGE_ID.AUTH_OTP_VERIFICATION });

        // Kiểm tra tính hợp lệ của các trường
        if (!validateFields()) {
            return; // Nếu không hợp lệ, dừng lại
        };
        // Hiển thị loading
        show();

        // Hiện thực đăng nhập
        try {
            // Tạo đối tượng DTO cho đăng nhập
            const loginDTO: LoginDTO = {
                email: email.trim(),
                password: password.trim(),
            };

            // Gọi service đăng nhập
            const response = await authService.login(loginDTO);
            response.statusCode = 0;
            // Xử lý phản hồi từ API
            handleApiResponse(response);

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            // Nếu có lỗi từ API, cập nhật apiFieldError
            // setApiFieldError({ email: MSG_API_ID.API_ERROR });
        } finally {
            // Ẩn loading sau khi hoàn thành
            hide();
        };
    }, [email, password, validateFields, show, hide, handleApiResponse]);

    /******************************************************************************
     * Xử lý sự kiện khi nhấn Enter trên trường email                             *
     * - Nếu email hợp lệ, focus vào trường password                              *
     ******************************************************************************/
    const onSubmitEditingEmail = useCallback(() => {
        // Kiểm tra tính hợp lệ của email khi nhấn Enter
        if (validateEmail()) {
            focusPassword(); // Nếu hợp lệ, focus vào trường password
        };
    }, [validateEmail]);

    /******************************************************************************
     * Xử lý sự kiện khi nhấn Enter trên trường password                          *
     * - Nếu password hợp lệ, thực hiện đăng nhập                                 *
     ******************************************************************************/
    const onSubmitEditingPassword = useCallback(() => {
        // Kiểm tra tính hợp lệ của password khi nhấn Enter
        if (validatePassword()) {
            handleSignIn(); // Nếu hợp lệ, thực hiện đăng nhập
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [validatePassword]);

    /******************************************************************************
     * Xử lý thay đổi text cho trường email                                       *
     * - Cập nhật state email                                                     *
     * - Xoá lỗi field error và apiFieldError nếu có                              *
     ******************************************************************************/
    const handleEmailChange = (text: string) => {
        setEmail(text);
        setFieldError((prev) => ({ ...prev, email: undefined }));
        setApiFieldError((prev) => ({ ...prev, email: undefined }));
    };

    /******************************************************************************
     * Xử lý thay đổi text cho trường password                                    *
     * - Cập nhật state password                                                  *
     * - Xoá lỗi field error và apiFieldError nếu có                              *
     ******************************************************************************/
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
            disableDefaultGobackAction: true,
            handleGoback: handleGoback,
        }, PAGE_ID.AUTH_LOGIN);
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
                            {t('authentication.signInTitle')}
                        </Text>
                    </ThemedView>

                    <ThemedView style={styles.subtitleContainer}>
                        <Text style={styles.subtitle}>
                            {t('authentication.signInSubtitle')}
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

                {/* Nút quên mật khẩu */}
                <ThemedView style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPassword}>
                        {t('authentication.forgotPassword')}?
                    </Text>
                </ThemedView>
            </ThemedView>

            {/* Nút đăng nhập và các nút social button */}
            <ThemedView style={styles.footerContainer}>
                <Button style={styles.signInButton} onTap={handleSignIn}>
                    <Text style={styles.signInButtonText}>
                        {t('authentication.signInButton')}
                    </Text>
                </Button>

                <ThemedView style={styles.signUpRow}>
                    <Text style={styles.signUpText}>
                        {t('authentication.dontHaveAccount')}
                    </Text>
                    <Text style={styles.signUpButton} onPress={() => { }}>
                        {t('authentication.signUpButton')}
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

export default AuthLoginPage;