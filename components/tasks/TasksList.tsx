import { FlatList, StyleSheet, Text, View } from "react-native";
import TaskItem from "./TaskItem";
import { COLORS } from "../../utils/colors";
import { Tasks } from "../../types";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const TasksList = ({ tasks } : {tasks: Tasks}) => {
    return <GestureHandlerRootView>
        <FlatList 
            data={tasks}
            renderItem={({ item }) => <TaskItem task={item} />}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={() => <View style={styles.taskListEmptyBox}>
                <Text style={styles.taskListEmptyText}>No task to show</Text>   
            </View>} /> 
    </GestureHandlerRootView>;
};
export default TasksList;

const styles = StyleSheet.create({
    taskListEmptyBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskListEmptyText: {
        color: COLORS.textColor,
        opacity: .5,
        textAlign: 'center',
        marginVertical: 16
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.lightSecondary
    }
});