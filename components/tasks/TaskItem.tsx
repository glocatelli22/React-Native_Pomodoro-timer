import { View, StyleSheet, Text, Pressable, Dimensions } from "react-native";
import { FormMode, Task as TaskType, Status } from "../../types";
import { COLORS } from "../../utils/colors";
import { useNavigation, ParamListBase, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import Swipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { deleteTask, setActiveTask } from "../../store/tasks";
import { useRef } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';


interface TaskProps { task: TaskType };
const TaskItem = ({ task }: TaskProps) => {

    const activeTaskId = useAppSelector(state => state.tasks.activeTaskId);
    const dispatch = useAppDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const route = useRoute()
    const isActive = activeTaskId === task.id;
    const deviceWidth = Dimensions.get('window').width;
    const swipeableRef = useRef<SwipeableMethods>(null);
    const navigationParent = route.name === 'Timer' ? 'Home' : 'Tasks'; 
   

    const swipeHandler = (direction: 'left' | 'right') => {
        if(direction === 'right') {
            dispatch(setActiveTask(!isActive ? task.id : null));
            swipeableRef.current?.close();
            return;
        }
        dispatch(deleteTask(task.id));
    };

    const leftAction = (_: SharedValue<number>, drag: SharedValue<number>) => {
        const styleAnimation = useAnimatedStyle(() => {
            return {
              transform: [{ translateX: -deviceWidth + drag.value }],
            };
        });
        return <Animated.View style={[styles.actionContainer, styles.leftAction, styleAnimation]}>
            <FontAwesome name="trash-o" size={18} color={styles.actionText.color} />
            <Text style={styles.actionText}>
                Delete
            </Text>
        </Animated.View>;
    };

    const rightAction = (_:SharedValue<number>, drag: SharedValue<number>) => {  

        if(task.status === Status.completed) return;

        const styleAnimation = useAnimatedStyle(() => {
            return {
              transform: [{ translateX: deviceWidth+drag.value }],
            };
        });
        
        const rightActionStyle = !isActive ? styles.rightActionActive : styles.rightActionInactive;
        const rightActionTextStyle = [styles.actionText, !isActive ? styles.rightActionTextActive: null];
        return <Animated.View style={[styles.actionContainer, rightActionStyle, styleAnimation]}>
            <FontAwesome 
                name="thumb-tack" 
                size={16} 
                color={!isActive ? styles.rightActionTextActive.color : styles.actionText.color} />
            <Text style={rightActionTextStyle}>
                {!isActive ?  'Mark as active' : 'Mark as inactive'}
            </Text>
        </Animated.View>;
    };

    return <Swipeable 
            ref={swipeableRef}
            onSwipeableOpen={swipeHandler}
            renderLeftActions={leftAction}
            renderRightActions={rightAction}>
            <Pressable onPress={() => navigation.navigate(navigationParent, { screen: 'TaskForm', params: { mode: FormMode.edit, data: task }})}>
                <View style={[styles.taskContainer, isActive ? styles.activeTask : null]}>
                    <View style={styles.taskRow}>
                        <Text style={styles.statusText}>
                            <Text style={styles.tomato}>{task.duration}</Text> pomodoro left
                        </Text>
                        {isActive && <Text style={styles.tomato}>Active</Text>}
                    </View>
                    <View style={styles.taskRow}>
                        <View>
                            <Text style={styles.title}>{task.title}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        </Swipeable>;

};

export default TaskItem;

const styles = StyleSheet.create({
    taskRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textColor
    },
    tomato: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 14
    },
    taskContainer: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    activeTask: {
        backgroundColor: COLORS.tertiary
    },
    statusText: {
        color: COLORS.textColor
    },
    actionContainer: {
        height: '100%',
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftAction: {
        backgroundColor: COLORS.lightSecondary,
        justifyContent: 'flex-end' 
    },
    rightActionActive: {
        backgroundColor: COLORS.tertiary
    },
    rightActionInactive: {
        backgroundColor: COLORS.grey
    },
    actionText: {
        color: COLORS.textColor,
        marginLeft: 8
    },
    rightActionTextActive: {
        color: COLORS.primary
    }
});