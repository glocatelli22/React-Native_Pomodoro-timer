import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import TasksList from "../../components/tasks/TasksList";
import Timer from "../../components/timer";
import { useAppSelector } from "../../store/hook";
import { activeTaskSelector, openTasksSelector } from "../../store/tasks/selectors";
import { COLORS } from "../../utils/colors";
import { Fragment } from "react";

const TimerScreen = () => {
    
    const openTasks = useAppSelector(openTasksSelector);
    const activeTask = useAppSelector(activeTaskSelector);
    const { isLoading } = useAppSelector(state => state.tasks);

    const taskCmp = !isLoading ? 
        <TasksList tasks={openTasks} /> : <ActivityIndicator size="large" color={COLORS.primary}/>;

    return <View style={styles.container}>
        <Timer />
        <View style={styles.tasksContainer}>
            <View style={styles.stausWrapper}>
                {activeTask ? 
                    <Fragment>
                        <Text style={styles.tomato}>{activeTask.duration}  </Text>
                        <Text style={styles.statusText}>
                            pomodoro left for active task
                        </Text>
                    </Fragment>
                    : <Text style={styles.statusText}>No active tasks </Text>
                }
            </View> 
            { taskCmp }
        </View>
    </View>
};

export default TimerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tasksContainer: {
        flex: 1,
        minHeight: '20%',
        backgroundColor: COLORS.background,
    },
    stausWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16
    },
    statusText: {
        fontSize: 14,
        textAlign: 'center',
        color: COLORS.textColor
    },
    tomato: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 16
    }
});
