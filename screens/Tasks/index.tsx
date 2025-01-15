import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { COLORS } from '../../utils/colors';
import TaskFormScreen from './TaskFormScreen';
import TasksScreen from './TasksScreen';
import { headerStyles } from '../../App';
import { FormMode } from '../../types';
import { Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator<RootStackParamList>();

const TasksStack = () => {
    return <Stack.Navigator screenOptions={{
		...headerStyles,
		contentStyle: {
			backgroundColor: COLORS.background
		}}}>
		<Stack.Screen 
			name="TasksList" 
			component={TasksScreen} options={({ navigation }) => ({ 
				title: 'Tasks',
				headerRight (props) {
					return <Pressable onPress={() => navigation.navigate('TaskForm', { mode: FormMode.add })}>
						<MaterialIcons name="add" size={26} color={props.tintColor} />
					</Pressable>;
				} 
			})} />
		<Stack.Screen 
    		name="TaskForm" component={TaskFormScreen} 
			options={({ route }) => {
        		return {  
					title: route.params.mode === FormMode.edit ? 'Edit Task' : 'Add task'
				}
      		}}/>
    </Stack.Navigator>
};
  
export default TasksStack;