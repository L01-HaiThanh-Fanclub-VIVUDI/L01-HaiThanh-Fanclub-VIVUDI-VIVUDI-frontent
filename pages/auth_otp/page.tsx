import Button from '@/components/atoms/button';
import ThemedView from '@/components/atoms/themed_view';
import { useLanguage } from '@/languages/provider';
import { MSG_API_ID, MSG_ID } from '@/languages/provider/types';
import { ApiResponse } from '@/models/api_response';
import { ResetPasswordDto } from '@/models/auth_verify_otp.dto';
import { useLoading } from '@/providers/loading_provider';
import { useScreenWrapper } from '@/providers/screen_wrapper_provider';
import { authService } from '@/services/auth.service';
import { PAGE_ID } from '@/settings/navigation/page';
import { AppStackNavigation } from '@/settings/navigation/route_params';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FC, JSX, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NativeSyntheticEvent, Text, TextInput, TextInputKeyPressEventData, useColorScheme, View } from 'react-native';
import { styles } from './styles';

const AuthOtpPage: FC = (): JSX.Element => {
    const OTP_LENGTH = 4;
    const COUNTDOWN_START = 60;

    const theme = useColorScheme() ?? 'light';
    const statusBarStyle = useMemo(() => (theme === 'dark' ? 'light' : 'dark'), [theme]);

    const { show, hide } = useLoading();

    const { t, getMessage, getAPIMessage } = useLanguage();

    const { setConfig } = useScreenWrapper();

    const navigation = useNavigation<AppStackNavigation>();

    const { email } = useLocalSearchParams<{ email: string }>();

    const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(''));
    const [fieldError, setFieldError] = useState<MSG_ID | undefined>();
    const [apiError, setApiError] = useState<MSG_API_ID | undefined>();

    const [countdown, setCountdown] = useState(COUNTDOWN_START);
    const timerInterval = useRef<number | null>(null);

    const otpInputRefs = useRef<(TextInput | null)[]>([]);

    const handleGoback = () => navigation.goBack();

    const startCountdown = useCallback(() => {
        setCountdown(COUNTDOWN_START);
        if (timerInterval.current) clearInterval(timerInterval.current);

        timerInterval.current = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timerInterval.current!);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, []);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        startCountdown();
        return () => {
            if (timerInterval.current) clearInterval(timerInterval.current);
        };
    }, [startCountdown]);


    const getErrorMessage = useCallback((): string | undefined => {
        if (apiError) {
            // return getAPIMessage(MSG_ID.MSG_AUTH_OTP_VERIFICATION, apiError, 'OTP');
            return "Mã OTP không hợp lệ hoặc đã hết hạn"; // Placeholder
        }
        if (fieldError) {
            return getMessage(fieldError, 'OTP');
        }
        return undefined;
    }, [apiError, fieldError, getMessage]);

    const handleApiResponse = useCallback((response: ApiResponse<any | null>) => {
        switch (response.statusCode) {
            case 0:
                navigation.replace(PAGE_ID.HOME_TABS, { screen: PAGE_ID.HOME });
                break;
            case 104:
            case 105:
                setApiError(response.statusCode);
                setOtp(new Array(OTP_LENGTH).fill(''));
                otpInputRefs.current[0]?.focus();
                break;
            default:
                break;
        };
    }, [navigation]);

    const handleVerifyOtp = useCallback(async () => {
        const fullOtp = otp.join('');
        if (fullOtp.length < OTP_LENGTH) {
            // setFieldError(MSG_ID.MSG_OTP_INCOMPLETE);
            return;
        }
        show();
        try {
            const verifyOtpDTO: ResetPasswordDto = { otp: fullOtp };
            const response = await authService.verifyOtp(verifyOtpDTO);
            response.statusCode = 0;
            handleApiResponse(response);
        } catch (error) {
            // setApiError(MSG_API_ID.API_ERROR);
        } finally {
            hide();
        };
    }, [handleApiResponse, hide, otp, show]);

    const handleResendOtp = useCallback(async () => {
        if (countdown > 0) return;

        show();
        console.log('Resending OTP for:', email);
        // try {
        //     await authService.resendOtp({ email });
        //     startCountdown(); // Bắt đầu lại bộ đếm
        // } catch (error) {
        //     // Xử lý lỗi
        // } finally {
        //     hide();
        // }
        setTimeout(() => {
            hide();
            startCountdown(); 
        }, 1000);
    }, [email, show, hide, startCountdown, countdown]);

    const handleOtpChange = (text: string, index: number) => {
        const digit = text.slice(-1);
        const newOtp = [...otp];
        newOtp[index] = digit;
        setOtp(newOtp);

        setFieldError(undefined);
        setApiError(undefined);

        if (digit && index < OTP_LENGTH - 1) {
            otpInputRefs.current[index + 1]?.focus();
        }
    };

    const handleBackspace = (
        event: NativeSyntheticEvent<TextInputKeyPressEventData>,
        index: number
    ) => {
        if (event.nativeEvent.key === 'Backspace') {
            if (!otp[index] && index > 0) {
                otpInputRefs.current[index - 1]?.focus();
            }
        }
    };

    useEffect(() => {
        const fullOtp = otp.join('');
        if (fullOtp.length === OTP_LENGTH) {
            handleVerifyOtp();
        }
    }, [otp, handleVerifyOtp]);

    useEffect(() => {
        setConfig({
            disableDefaultGobackAction: true,
            handleGoback: handleGoback,
        }, PAGE_ID.AUTH_OTP_VERIFICATION);
    }, []);

    return (
        <ThemedView style={styles.container}>
            <StatusBar style={statusBarStyle} />

            <ThemedView style={styles.headerContainer}>
                <ThemedView style={styles.titleContainer}>
                    <Text style={styles.title}>
                        OTP Verification
                    </Text>
                </ThemedView>

                <ThemedView style={styles.subtitleContainer}>
                    <Text style={styles.subtitle}>
                        Please check your email to see the
                        verification code
                    </Text>
                </ThemedView>
            </ThemedView>

            <Text style={styles.otpLabel}>OTP Code</Text>

            <ThemedView style={styles.otpContainer}>
                {new Array(OTP_LENGTH).fill(0).map((_, index) => (
                    <TextInput
                        key={index}
                        ref={(el) => { otpInputRefs.current[index] = el; }}
                        style={[
                            styles.otpInput,
                            (!!fieldError || !!apiError) && styles.otpInputError
                        ]}
                        keyboardType="number-pad"
                        maxLength={1}
                        onChangeText={(text) => handleOtpChange(text, index)}
                        onKeyPress={(e) => handleBackspace(e, index)}
                        value={otp[index]}
                        selectTextOnFocus
                    />
                ))}
            </ThemedView>

            {getErrorMessage() && (
                <Text style={styles.errorMessage}>
                    {getErrorMessage()}
                </Text>
            )}

            <Button style={styles.verifyButton} onTap={handleVerifyOtp}>
                <Text style={styles.verifyButtonText}>
                    Verify
                </Text>
            </Button>

            <ThemedView style={styles.resendContainer}>
                <Text style={styles.resendText}>
                    Resend code to
                </Text>

                {countdown > 0 ? (
                    <Text style={styles.timerText}>{formatTime(countdown)}</Text>
                ) : (
                    <Text style={styles.resendButton} onPress={handleResendOtp}>
                        Resend
                    </Text>
                )}
            </ThemedView>
        </ThemedView>
    );
};

export default AuthOtpPage;