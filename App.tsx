import { Provider } from 'react-redux';
import store from './store';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { RootStackParamList } from './screens/types';
import TimerStack from './screens/Timer';
import TasksStack from './screens/Tasks';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { COLORS } from './utils/colors';
import { useMemo } from 'react';
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
    handleNotification: async () => {
        return { 
            shouldPlaySound: true,
            shouldSetBadge: false,
            shouldShowAlert: true
        }
    }
});

type BottomTabsParamList = {
    Home: NavigatorScreenParams<RootStackParamList>,
    Tasks: NavigatorScreenParams<RootStackParamList>
};  

const BottomTabs = createBottomTabNavigator<BottomTabsParamList>();

export const headerStyles = {
    headerTintColor: COLORS.textColor,
    headerShadowVisible: false,
    headerStyle: {
        backgroundColor: COLORS.background
    }
};

export default function App() {
	
    const screenOptions = useMemo<BottomTabNavigationOptions>(() => ({
		headerShown: false,
		tabBarInactiveTintColor: COLORS.lightSecondary,
		tabBarActiveTintColor: COLORS.textColor,
		tabBarActiveBackgroundColor: COLORS.background,
		tabBarInactiveBackgroundColor: COLORS.background,
        tabBarHideOnKeyboard: true,
		tabBarLabelPosition: 'beside-icon',
            ...headerStyles,
            tabBarLabelStyle: {
                fontSize: 16,
		    },
            sceneStyle: {
                backgroundColor: COLORS.background
            },
            tabBarStyle: {
                backgroundColor: COLORS.background,
                height: 64,
                borderTopWidth: 0
            }
        }
    ), []);
	
	return (
		<Provider store={store}>
			<NavigationContainer>
				<BottomTabs.Navigator 
                        backBehavior='history'
                        screenOptions={screenOptions}>
					<BottomTabs.Screen 
					    component={TimerStack} 
                        name="Home" 
                        options={{
                            title: 'Timer',
                            tabBarIcon: ({ color }) => <MaterialIcons name="timelapse" size={24} color={color} />
                        }}/>
					<BottomTabs.Screen 
                        component={TasksStack} 
                        name="Tasks" 
                        options={{
                            tabBarIcon: ({ color }) => <MaterialIcons name="assignment" size={24} color={color} />
                        }}/>
				</BottomTabs.Navigator>
			</NavigationContainer>
		</Provider>
	);
};