import { Tabs, useNavigation } from 'expo-router';
import { PAGE_ID } from '@/settings/navigation/page';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { AppStackNavigation } from '@/settings/navigation/route_params';

const ACTIVE_COLOR = '#24BAEC';
const INACTIVE_COLOR = '#7D848D';
const MIDDLE_BUTTON_COLOR = '#FF678B';

const CustomTabBarButton = ({ onPress }: { onPress?: () => void }) => (
    <View style={styles.middleButtonContainer}>
        <TouchableOpacity
            style={styles.middleButton}
            onPress={onPress}
        >
            <Feather name="search" size={24} color="#FFF" />
        </TouchableOpacity>
    </View>
);

export default function TabsLayout() {
    const navigation = useNavigation<AppStackNavigation>();

    return (<Tabs
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: true,
            tabBarActiveTintColor: ACTIVE_COLOR,
            tabBarInactiveTintColor: INACTIVE_COLOR,
            tabBarStyle: {
                position: 'absolute',
                left: 20,
                right: 20,
                borderRadius: 20,
                height: 70,
                backgroundColor: 'white',
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
            name={PAGE_ID.SEARCH}
            options={{
                tabBarButton: (props) => (
                    <CustomTabBarButton
                    onPress={
                        () => {navigation.navigate(PAGE_ID.PRIVATE_TABS, { screen: PAGE_ID.MAP });}
                    }
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
        height: 4,
    },
    shadowOpacity: 0.1,
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
        backgroundColor: MIDDLE_BUTTON_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        ...shadowStyle,
    },
    shadow: shadowStyle,
});