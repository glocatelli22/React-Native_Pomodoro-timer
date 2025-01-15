import { StyleSheet, View } from "react-native";
import ActionButton from "../ui/ActionButton";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { COLORS } from "../../utils/colors";

type ControlsProps = { 
    isTimerRunning: boolean, 
    startTimer: () => void, 
    stopTimer: () => void, 
    resetTimer: () => void,
    skipModalToggle: () => void
};

const Controls = ({ 
    isTimerRunning, 
    startTimer, 
    stopTimer, 
    resetTimer,
    skipModalToggle
} : ControlsProps) => {

    const playPauseIconProps = {
        color: COLORS.secondary,
        size: 32
    };

    return  <View style={styles.timerControlsWrapper}>
        <View style={styles.sideControlsWrapper}>
            <ActionButton onPress={resetTimer} type="secondary">
                <MaterialIcons name="refresh" color={COLORS.secondary} size={16} />
            </ActionButton>
        </View>
        <View style={styles.timerControlWrapper}>
            <ActionButton onPress={!isTimerRunning ? startTimer : stopTimer}>
                {isTimerRunning ? 
                    <MaterialIcons name="pause" {...playPauseIconProps} /> : 
                    <MaterialIcons name="play-arrow" {...playPauseIconProps } />
                }
            </ActionButton>
        </View>
        <View style={styles.sideControlsWrapper}>
            <ActionButton onPress={skipModalToggle} type="secondary">
                <MaterialIcons name="fast-forward" color={COLORS.secondary} size={16} />
            </ActionButton>
        </View>
    </View>;
};

const styles = StyleSheet.create({
    timerControlsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 16
    },
    sideControlsWrapper: {
        width: 48,
        height: 40,
        marginHorizontal: 8
    },
    timerControlWrapper: {
        width: 88
    }
});
export default Controls;