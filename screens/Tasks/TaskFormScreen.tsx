import { StyleSheet, Text, Alert, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { TaskFormScreenProps } from "../../screens/types";
import Container from "../../components/ui/Container";
import { COLORS } from "../../utils/colors";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { addTask, deleteTask, setActiveTask, updateTask } from "../../store/tasks";
import { FormMode, Status } from "../../types";
import { FormState } from "../../types";
import TaskForm from "../../components/tasks/TaskForm";

const TaskFormScreen = ({ route, navigation }: TaskFormScreenProps) => {
    
    const mode = route.params.mode;
    const isEdit = mode === FormMode.edit;
    const taskId = isEdit ? route.params.data?.id! : new Date().getMilliseconds().toString();
    const activeTaskId = useAppSelector(state => state.tasks.activeTaskId); 
    const isActive = activeTaskId === taskId;
    
    const dispatch = useAppDispatch();
   
    const markAsActiveHandler = () => {
        dispatch(setActiveTask(taskId));
    };

    const submitHandler = (formState: FormState) => {

        if(!formState.title.trim() || parseInt(formState.duration) <= 0) {
            Alert.alert('Incomplete Task Data', 'Please provide correct title and duration (> 0)');
            return;
        }
        const task = {
            ...formState,
            duration: +formState.duration,
            id: taskId,
        };

        if(!isEdit) {
            dispatch(addTask(task));
        } else {
            dispatch(updateTask(task));
        }

        navigation.goBack();
    };

    const deleteHandler = () => {
        Alert.alert('Are you sure?', 'You\'re about to delete this task', [
            { 
                text: 'Ok', 
                onPress: () => {
                    dispatch(deleteTask(taskId));
                    navigation.goBack();
                }
            },
            { text: 'Keep task'}
        ], {  cancelable: true });
    };

    return <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={styles.container}>
                <Container>
                    { isActive && <Text style={styles.activeText}> Active task </Text> }
                    <TaskForm
                        taskData={route.params?.data}
                        submitHandler={submitHandler}
                        markAsActiveHandler={markAsActiveHandler}
                        deleteHandler={deleteHandler}
                        isEdit={isEdit}
                        isActiveTask={isActive}
                    />
                </Container>
            </ScrollView>
    </KeyboardAvoidingView>;
   
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    activeText: {
        marginBottom: 24,
        fontWeight: 'bold',
        fontSize: 16,
        color: COLORS.primary
    }
});

export default TaskFormScreen;