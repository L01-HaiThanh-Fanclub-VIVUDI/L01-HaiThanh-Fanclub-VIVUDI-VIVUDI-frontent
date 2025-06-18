import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import ThemedText from '@/components/atoms/themed_text';
import ThemedView from '@/components/atoms/themed_view';
import ParallaxScrollView from '@/components/ui/parallax_scroll_view';
import { useLanguage } from '@/languages/provider';
import { MSG_ID } from '@/languages/provider/types';

export default function HomeScreen() {
	const { t, getMessage } = useLanguage();
	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
			headerImage={
				<Image
					source={require('@/assets/images/adaptive-icon.png')}
					style={styles.reactLogo}
				/>
			}
			headerHeightValue={430}>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type="title">{t('authentication.login')}</ThemedText>
			</ThemedView>
			<ThemedView style={styles.stepContainer}>
				<ThemedText type="subtitle">Step 1: {getMessage(MSG_ID.MSG_REQUIRED, 'Hello', 'Hello1', 'Hello2', 'Hello 3')}</ThemedText>
				<ThemedText>
					Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
					Press{' '}
					<ThemedText type="defaultSemiBold">
						{Platform.select({
							ios: 'cmd + d',
							android: 'cmd + m',
							web: 'F12',
						})}
					</ThemedText>{' '}
					to open developer tools.
				</ThemedText>
			</ThemedView>
			<ThemedView style={styles.stepContainer}>
				<ThemedText type="subtitle">Step 2: Explore</ThemedText>
				<ThemedText>
					{`Tap the Explore tab to learn more about what's included in this starter app.`}
				</ThemedText>
			</ThemedView>
			<ThemedView style={styles.stepContainer}>
				<ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
				<ThemedText>
					{`When you're ready, run `}
					<ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
					<ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
					<ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
					<ThemedText type="defaultSemiBold">app-example</ThemedText>.
				</ThemedText>
			</ThemedView>
			<ThemedView style={styles.stepContainer}>
				<ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
				<ThemedText>
					{`When you're ready, run `}
					<ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
					<ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
					<ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
					<ThemedText type="defaultSemiBold">app-example</ThemedText>.
				</ThemedText>
			</ThemedView>
			<ThemedView style={styles.stepContainer}>
				<ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
				<ThemedText>
					{`When you're ready, run `}
					<ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
					<ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
					<ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
					<ThemedText type="defaultSemiBold">app-example</ThemedText>.
				</ThemedText>
			</ThemedView>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		height: 50,
		width: '100%',
		paddingHorizontal: 16,
	},
	reactLogo: {
		height: '100%',
	},
	stepContainer: {
		paddingHorizontal: 16,
		borderRadius: 8,
		marginTop: 8,
	},
});