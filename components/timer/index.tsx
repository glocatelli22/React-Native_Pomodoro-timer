import { View,Text, StyleSheet, Alert } from "react-native";
import { useTimer } from "../../hooks/timer";
import Container from "../ui/Container";
import { useAppSelector } from "../../store/hook";
import Clock from "./Clock";
import { contextTimerSelector } from "../../store/tasks/selectors";
import { COLORS } from "../../utils/colors";
import Controls from "./Controls";
import { useCallback, useEffect, useRef, useState } from "react";
import SkipModal from "./SkipModal";


const Timer = () => {

    const [displaySkipModal, setDisplaySkipModal] = useState(false);
    const { isPause, isTimerRunning, tomatoBeforeLongPause } = useAppSelector(state => state.timer);
    const contextTimerLength = useAppSelector(contextTimerSelector);
    const [startTimer, stopTimer, resetTimer, remainingMs] = useTimer(contextTimerLength);
    const pauseText = tomatoBeforeLongPause === 0 && isPause ? 'Long pause' : `Pause`;
    const timerText = isPause ? pauseText : 'Focus';
    const skipModalHandler = useCallback(() => setDisplaySkipModal(prevState => !prevState), []);

   

    return (
        <Container additionalStyles={[styles.container]}>
            <View style={styles.timerContainer}>
                <View style={styles.statusBox}>
                    <Text style={styles.statusText}>
                        {timerText}
                    </Text>
                </View>
                <Clock 
                    totalMs={contextTimerLength} 
                    remainingMs={remainingMs}
                    isTimerRunning={isTimerRunning} />
                <Controls 
                    isTimerRunning={isTimerRunning}
                    startTimer={startTimer}
                    stopTimer={stopTimer}
                    resetTimer={resetTimer} 
                    skipModalToggle={skipModalHandler}/>
                {tomatoBeforeLongPause > 0 &&  
                    <Text style={styles.statusText}>
                        Long pause in {tomatoBeforeLongPause}
                    </Text>
                }
            </View>
            <SkipModal 
                show={displaySkipModal} 
                skipModalToggle={skipModalHandler}
                tomatoBeforeLongPause={tomatoBeforeLongPause}
                resetTimer={resetTimer} />
        </Container>
    );
};

const styles = StyleSheet.create({
    statusBox: {
        marginVertical: 16,
        borderWidth: 2,
        borderColor: COLORS.secondary,
        backgroundColor: COLORS.tertiary,
        paddingVertical: 4,
        paddingHorizontal: 16,
        borderRadius: 16
    },
    statusText: {
        fontSize: 14,
        lineHeight: 16,
        fontWeight: 'bold',
        color: COLORS.secondary
    },
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 2
    },
    timerContainer: {
        alignItems: 'center'
    }
});

export default Timer; 