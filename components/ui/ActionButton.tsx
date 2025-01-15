import { Pressable, View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";
import { ReactNode } from "react";

interface ActionButtonProps { 
    children: ReactNode, 
    onPress: () => void, 
    type?: 'primary' | 'secondary' | 'delete',
    disabled?: boolean
};

const ActionButton = ({ children, onPress, type = 'primary', disabled = false } : ActionButtonProps) => {

    const bgColorMap = { 
        primary: COLORS.primary, 
        secondary: COLORS.tertiary,
        tertiary: COLORS.secondary,
        delete: COLORS.lightSecondary
    };

    const buttonStyles = [styles.buttonInnerContainer, { backgroundColor: bgColorMap[type] }, disabled ? styles.disabled : null];
    
    return <View style={[styles.buttonOuterContainer]}>
        <Pressable 
            disabled={disabled}
            onPress={onPress} 
            style={({ pressed }) =>  
                pressed ? [...buttonStyles, styles.pressed] : 
                buttonStyles
            }>
            <Text style={styles.label}>{children}</Text>
        </Pressable>
    </View>
};

export default ActionButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 16,
        overflow: 'hidden',
        width: '100%'
    },
    buttonInnerContainer: {
        borderRadius: 32,
        paddingVertical: 12,
        paddingHorizontal: 16,
        justifyContent: 'space-between'
    },
    pressed: {
        opacity: .7
    },
    label: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textColor
    },
    disabled: {
        opacity: .5
    }
});
