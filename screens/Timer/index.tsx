import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { ActivityIndicator, Pressable } from 'react-native';
import { COLORS } from '../../utils/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import TimerScreen from './TimerScreen';
import TaskFormScreen from '../Tasks/TaskFormScreen';
import SettingsScreen from './Settings';
import { headerStyles } from '../../App';
import { FormMode } from '../../types';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hook';
import { loadTasks } from '../../store/tasks/thunks';

const Stack = createNativeStackNavigator<RootStackParamList>();

const TimerStack = () => {

	const dispatch = useAppDispatch();
    
	useEffect(() => {
        const promise = dispatch(loadTasks());   
        return () => {
            promise.abort();
        }
    }, []);
	
    return <Stack.Navigator 
			initialRouteName='Timer'
			screenOptions={{
			...headerStyles,
			contentStyle: {
				backgroundColor: COLORS.background
			}
		}}>
      	<Stack.Screen name="Timer" component={TimerScreen} options={({ navigation }) => ({
			headerRight(props) {
				return <Pressable onPress={() => navigation.navigate('Settings')}>
					<MaterialIcons name="settings" size={26} color={props.tintColor} />
				</Pressable>;
			}
		})} />
        <Stack.Screen 
        	name="TaskForm" 
			component={TaskFormScreen} 
			options={({ route }) => {
				return { title: route.params.mode === FormMode.edit ? 'Edit Task' : 'Add Task' }
			}}/>
        <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
};

export default TimerStack;