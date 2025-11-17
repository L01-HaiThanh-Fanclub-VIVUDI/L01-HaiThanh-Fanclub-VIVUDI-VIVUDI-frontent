import { PAGE_ID } from '@/settings/navigation/page';
import { Tabs } from 'expo-router';
import { JSX } from 'react';

const TabLayout = (): JSX.Element => {
	return (
		<Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
			<Tabs.Screen name={PAGE_ID.MEDIA} />
			<Tabs.Screen name={PAGE_ID.CONTENT} />
		</Tabs>
	);
};

export default TabLayout;