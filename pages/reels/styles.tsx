import { appColors } from '@/settings';
import { Dimensions, StyleSheet } from 'react-native';

const TEXT_COLOR = '#1B1E28';
const LIGHT_TEXT_COLOR = '#7D848D';
const DOT_COLOR = '#9CA3AF';
const ACTIVE_DOT_COLOR = '#3B82F6';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#7D848D',
    },
    errorText: {
        fontSize: 16,
        color: '#FF3B30',
        textAlign: 'center',
        marginBottom: 12,
    },
    retryText: {
        fontSize: 16,
        color: appColors.primary,
        fontWeight: '600',
    },
    emptyText: {
        fontSize: 16,
        color: '#7D848D',
        textAlign: 'center',
    },
});