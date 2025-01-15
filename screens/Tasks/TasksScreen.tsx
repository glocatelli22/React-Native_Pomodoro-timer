import { StyleSheet, View } from "react-native"
import { TasksScreenProps } from "../../screens/types";
import { useAppSelector } from "../../store/hook";
import { completedTasksSelector, openTasksSelector } from "../../store/tasks/selectors";
import TasksList from "../../components/tasks/TasksList";
import { useEffect, useState } from "react";
import { FormMode, Status } from "../../types";
import { COLORS } from "../../utils/colors";
import ActionButton from "../../components/ui/ActionButton";
import StatusPicker from "../../components/ui/StatusPicker";

const TasksScreen = ({ navigation }: TasksScreenProps) => {

    const openTasks = useAppSelector(openTasksSelector);
    const completedTasks = useAppSelector(completedTasksSelector);
    const [tasksStatusToShow, setTasksStatusToShow] = useState<Status>(Status.open);
    const tasksToShow = tasksStatusToShow === Status.open ? openTasks : completedTasks;

    return <View style={styles.container}>
        <View style={styles.headContainer}>
            <StatusPicker defaultValue={tasksStatusToShow} onChangeHandler={setTasksStatusToShow} />
        </View>
        <View style={styles.taskListWrapper}>
            <TasksList tasks={tasksToShow}></TasksList>
        </View>
        <View style={styles.buttonWrapper}>
            <ActionButton 
                type="primary"
                onPress={() => navigation.navigate(
                    'TaskForm', { 
                        mode: FormMode.add 
                    })
                }>
                Add new task
            </ActionButton>
        </View>
    </View>
   
};

export default TasksScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headContainer: {
        paddingTop: 16,
        paddingHorizontal: 16,
        paddingBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightSecondary
    },
    taskListTitle: {
       fontSize: 16,
       marginBottom: 16,
       fontWeight: 'bold',
    },
    taskListWrapper: {
        flex: 1,
        marginBottom: 20,
    },
    buttonWrapper: {
        paddingHorizontal: 16,
        marginVertical: 24
    }
});
