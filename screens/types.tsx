import { FormMode, Task } from "../types";
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Timer: undefined,
  Settings: undefined,
  TaskForm: { mode: FormMode, data?: Task }, 
  TasksList: undefined
};

export type TaskFormScreenProps = NativeStackScreenProps<RootStackParamList, 'TaskForm'>;
export type TasksScreenProps = NativeStackScreenProps<RootStackParamList, 'TasksList'>;
export type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;