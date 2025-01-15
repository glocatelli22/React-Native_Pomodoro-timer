import { StyleSheet, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Status } from "../../types";
import { COLORS } from "../../utils/colors";
import { Fragment } from "react";

interface StatusPickerProps { onChangeHandler: (value: Status) => void, defaultValue: Status };

const StatusPicker = ({ onChangeHandler, defaultValue } : StatusPickerProps) => {
    return <Fragment>
        <Text style={styles.label}>Status</Text>
        <View style={styles.pickerWrapper}>
            <Picker
                style={styles.picker}
                selectedValue={defaultValue}
                onValueChange={value => {  
                    onChangeHandler(value);
                }}>
                <Picker.Item label="Open" value={Status.open} color={COLORS.textColor}/>
                <Picker.Item label="Completed" value={Status.completed} color={COLORS.textColor}/>
            </Picker>
        </View>
    </Fragment>
};

export default StatusPicker;

const styles = StyleSheet.create({
    label: {
        color: COLORS.secondary,
        fontWeight: 'bold',
        marginBottom: 8
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: COLORS.lightSecondary,
        borderRadius: 16,
        width: '100%'
    },
    picker: {
        margin: -6,
        transform: [{scaleX: 0.85}, { scaleY: 0.85}]
    }
})