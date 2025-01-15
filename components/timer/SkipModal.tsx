import { Modal, Pressable, Text, StyleSheet, View, StyleProp, ViewStyle } from "react-native"
import Container from "../ui/Container";
import { COLORS } from "../../utils/colors";
import { useAppDispatch } from "../../store/hook";
import { resetTomatoForLongPause, setIsPause, setTomatoBeforeLongPause } from "../../store/timer";
import { memo } from "react";

interface SkipModalProps { 
    show: boolean, 
    tomatoBeforeLongPause: number,
    skipModalToggle: () => void,
    resetTimer: () => void
};

interface MoadlButtonProps { 
    onPress: () => void, 
    label: string, 
    additionalStyle?: StyleProp<ViewStyle> 
};

const MoadlButton = memo(({ onPress, label, additionalStyle} : MoadlButtonProps ) => {
    return <Pressable 
        style={({pressed}) => [
            styles.modalButton, 
            additionalStyle ? additionalStyle : null,
            pressed ? styles.pressed : null
        ]} 
        onPress={onPress}>
        <Text style={styles.modalButtonText}>{label}</Text>
    </Pressable>
});

const SkipModal = ({ show, skipModalToggle, resetTimer, tomatoBeforeLongPause } : SkipModalProps) => {
    
    const dispatch = useAppDispatch();
    const modalButtonHandler = (type: 'focus' | 'pause' | 'longPause') => {
        resetTimer();
        if(tomatoBeforeLongPause === 0) {
            dispatch(resetTomatoForLongPause());
        }
        switch (type) {
            case 'focus':
                dispatch(setIsPause(false));
                break;
            case 'pause':
                dispatch(setIsPause(true));
                break;
            case 'longPause':
                dispatch(setIsPause(true));
                dispatch(setTomatoBeforeLongPause(0));
                break;
            default:
                break;
        }
        skipModalToggle();
    };

    return <Modal visible={show} animationType="fade" transparent={true}>
        <Pressable style={[StyleSheet.absoluteFill, styles.backdrop]} onPress={skipModalToggle}/>
        <Container additionalStyles={[styles.modalView]}>
            <View style={styles.modalContent}>
                <MoadlButton label="Focus" onPress={modalButtonHandler.bind(this, 'focus')} />
                <MoadlButton label="Pause" onPress={modalButtonHandler.bind(this, 'pause')} />
                <MoadlButton label="Long Pause" onPress={modalButtonHandler.bind(this, 'longPause')} />
                <MoadlButton label="Cancel" onPress={skipModalToggle} additionalStyle={styles.cancelButton} />
            </View>
        </Container>
    </Modal>
};

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    backdrop: {
        backgroundColor: COLORS.backdrop
    },
    modalContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: COLORS.tertiary,
        borderRadius: 16,
        minHeight: 150
    },
    modalButton: {
        flex: 1,
        minWidth: '100%',
        padding: 16,
        borderBottomWidth: .2,
        borderBottomColor: COLORS.lightSecondary
    },
    cancelButton: {
        borderBottomWidth: 0,
        opacity: .4
    },
    modalButtonText: {
        textAlign: 'center',
        color: COLORS.textColor,
        fontWeight: 'bold',
        fontSize: 14
    },
    pressed: {
        opacity: .5
    }
})

export default SkipModal;