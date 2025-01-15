import { View,  Text, StyleSheet, StyleProp, ViewStyle, Pressable } from "react-native";
import { COLORS } from '../../utils/colors';

interface ClockProps { 
    remainingMs: number, 
    totalMs: number, 
    isTimerRunning: boolean
};

const MINUTE = 60000;
const SECONDS = 1000;

const Clock = ({ remainingMs, totalMs } : ClockProps) => {
    
    const percentage = remainingMs/totalMs*100;
    const remainingMinutes = Math.floor(remainingMs / MINUTE);
    const remainingSeconds = Math.floor((remainingMs % MINUTE)/SECONDS);
    const minString = remainingMinutes >= 0 ? remainingMinutes.toLocaleString('en-US', { minimumIntegerDigits: 2 }) : '00';
    const secString = remainingSeconds >= 0 ? remainingSeconds.toLocaleString('en-US', { minimumIntegerDigits: 2 }) : '00';
    const clockText = `${minString}:${secString}`;
    return <Pressable>
        <View>
            <View>
                <Text style={styles.clockText}>{clockText}</Text>
            </View>
        </View>
    </Pressable>;
};

export default Clock;

const styles = StyleSheet.create({
    clockText: {
        color: COLORS.secondary,
        fontSize: 56,
        fontWeight: 'bold',
        marginVertical: 16,
        lineHeight: 56
    }
});