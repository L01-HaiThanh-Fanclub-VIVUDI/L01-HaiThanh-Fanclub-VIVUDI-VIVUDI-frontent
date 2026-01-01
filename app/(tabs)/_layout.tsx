import { appColors } from '@/settings';
import { PAGE_ID } from '@/settings/navigation/page';
import { AppStackNavigation } from '@/settings/navigation/route_params';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigationState } from '@react-navigation/native';
import { Tabs, useNavigation } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function TabsLayout() {
    const navigation = useNavigation<AppStackNavigation>();

    const tabBarButton = () => {
        const state = useNavigationState(state => state);
        const activeRouteName = state ? state.routes[state.index].name : '';
        const isReelsActive = activeRouteName === PAGE_ID.REELS;

        const handlePress = () => {
            if (isReelsActive) {
                navigation.push(PAGE_ID.NEW_REEL_TABS, { screen: PAGE_ID.MEDIA });
            } else {
                navigation.push(PAGE_ID.PRIVATE_TABS, { screen: PAGE_ID.PLACE_SEARCH });
            }
        };
        return <CustomTabBarButton
            onPress={handlePress}
            iconName={isReelsActive ? "plus" : "search"}
        />;
    };

    const CustomTabBarButton = ({ onPress, iconName }: { onPress?: () => void, iconName: string }) => (
        <View style={styles.middleButtonContainer}>
            <TouchableOpacity
                style={styles.middleButton}
                onPress={onPress}
            >
                <Feather name={iconName as any} size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
    );

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: appColors.tabActive,
                tabBarInactiveTintColor: appColors.tabInactive,
                tabBarStyle: {
                    position: 'absolute',
                    left: 20,
                    right: 20,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: 70,
                    backgroundColor: 'white',
                    borderTopWidth: 0,
                    ...shadowStyle,
                },
                tabBarLabelStyle: {
                    fontFamily: 'SFUISemibold',
                    fontSize: 12,
                    marginTop: -5,
                },
                tabBarIconStyle: {
                    marginTop: 5,
                }
            }}
        >
            <Tabs.Screen
                name={PAGE_ID.HOME}
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "home" : "home-outline"}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name={PAGE_ID.REELS}
                options={{
                    title: 'Reels',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "film" : "film-outline"}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name={PAGE_ID.SEARCH}
                options={{
                    tabBarButton: tabBarButton,
                }}
            />
            <Tabs.Screen
                name={PAGE_ID.MAP}
                options={{
                    title: 'Map',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "map" : "map-outline"}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name={PAGE_ID.PROFILE}
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "person" : "person-outline"}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />

        </Tabs>
    );
}

const shadowStyle = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
};

const styles: any = StyleSheet.create({
    middleButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: appColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...shadowStyle,
    },
    shadow: shadowStyle,
});