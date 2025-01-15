import { Text, TextInput, StyleSheet, TextInputProps, StyleProp, TextStyle, View } from "react-native";
import { COLORS } from "../../utils/colors";

interface InputProps { 
    value?: string, 
    label: string,
    settings?: TextInputProps,
    additionalStyle?: StyleProp<TextStyle>
    onChangeHandler: (v: string) => void,
    isValid?: boolean,
    validationMsg?: string
};

const Input = ({ value, onChangeHandler, label, settings, additionalStyle, isValid, validationMsg } : InputProps) => {
    return <View style={styles.inputWrapper}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            {...settings}
            style={[styles.input, additionalStyle, isValid === false ? styles.invalid : null]} 
            value={value} 
            onChangeText={onChangeHandler}/>
        {(validationMsg && isValid === false) && 
            <Text style={styles.validationMessage}>
                {validationMsg}
            </Text>
        }
    </View>
};

const styles = StyleSheet.create({
    inputWrapper: {
        marginBottom: 22,
    },
    label: {
        color: COLORS.secondary,
        fontWeight: 'bold',
        marginBottom: 8
    },
    input: {
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        borderWidth: .5,
        color: COLORS.textColor,
        borderColor: COLORS.lightSecondary,
        backgroundColor: COLORS.background,
        lineHeight: 24,
        marginBottom: 2
    },
    invalid: {
        borderColor: COLORS.danger
    },
    validationMessage: {
        color: COLORS.danger,
        fontSize: 10,
        position: 'absolute',
        bottom: -16
    }
});

export default Input;