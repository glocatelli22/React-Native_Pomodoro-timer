import { Alert, StyleSheet, TextInputProps, View } from "react-native"
import Container from "../../components/ui/Container";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { useMemo } from "react";
import { SettingsFormState } from "../../types";
import Input from "../../components/ui/Input";
import ActionButton from "../../components/ui/ActionButton";
import { setTimerSettings, setTomatoBeforeLongPause } from "../../store/timer";
import { SettingsScreenProps } from "../../screens/types";
import { useForm } from "../../hooks/form";



const MINUTE = 60000;

const SettingsScreen = ({ navigation } : SettingsScreenProps) => {

    const {
        longPauseLength, 
        shortPauseLength, 
        timerLength, 
        tomatoForLongPause,
        isTimerRunning
    } = useAppSelector(state => state.timer);

    const dispatch = useAppDispatch();

    const [ formState, handleInputChange ] = useForm<SettingsFormState, string>({
        longPauseLength: longPauseLength/MINUTE,
        shortPauseLength: shortPauseLength/MINUTE,
        timerLength: timerLength/MINUTE,
        tomatoForLongPause: tomatoForLongPause
    });

    const submitHandler = () => {
        
        const settingsSubmission = () => {
            dispatch(setTimerSettings({
                longPauseLength: formState.longPauseLength*MINUTE,
                shortPauseLength: formState.shortPauseLength*MINUTE,
                timerLength: formState.timerLength*MINUTE,
                tomatoForLongPause: formState.tomatoForLongPause,
                resetTimer: Math.random()
            }));
            dispatch(setTomatoBeforeLongPause(formState.tomatoForLongPause));
            navigation.goBack();
        };

        if(isTimerRunning) {
            Alert.alert(
                'Adjusting settings will reset current active timer', '', 
                [
                    { text: 'Proceed', onPress: settingsSubmission}, { text: 'Undo' } 
                ]
            )
            return;
        }

        settingsSubmission();
    };

    const commonSettings = useMemo<TextInputProps>(() => ({
        maxLength: 2,
        keyboardType: 'numeric'
    }), []);

    const isFormValid = Object.values(formState).every(v => v > 0);

    return <SafeAreaView style={styles.container}>
        <Container>
            <View>
                <Input 
                    label="Focus time length"
                    onChangeHandler={handleInputChange.bind(this, 'timerLength')}
                    value={formState.timerLength.toString()}
                    settings={commonSettings} 
                    isValid={formState.timerLength > 0}
                    validationMsg="Focus time length must be greater than 0"/>
            </View>
            <Input 
                label="Short pause length"
                onChangeHandler={handleInputChange.bind(this, 'shortPauseLength')}
                value={formState.shortPauseLength.toString()}
                settings={commonSettings} 
                isValid={formState.shortPauseLength > 0}
                validationMsg="Short pause length must be greater than 0"/>
            <Input 
                label="Long pause length"
                onChangeHandler={handleInputChange.bind(this, 'longPauseLength')}
                value={formState.longPauseLength.toString()}
                settings={commonSettings} 
                isValid={formState.longPauseLength > 0}
                validationMsg="Long pause length must be greater than 0"/>
            <Input 
                label="Pomodoro before long pause"
                onChangeHandler={handleInputChange.bind(this, 'tomatoForLongPause')}
                value={formState.tomatoForLongPause.toString()}
                settings={commonSettings} 
                isValid={formState.tomatoForLongPause > 0}
                validationMsg="Pomodoro before must be greater than 0"/>
            <View style={styles.buttonWrapper}>
                <ActionButton onPress={submitHandler} disabled={!isFormValid}>
                   Save 
                </ActionButton>
            </View>
        </Container>
    </SafeAreaView>
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    taskListTitle: {
       fontSize: 16,
       marginBottom: 16,
       fontWeight: 'bold'
    },
    taskListWrapper: {
        flex: 1,
        marginBottom: 20,
        maxHeight: '40%'
    },
    buttonWrapper: {
        marginVertical: 40
    }
});
