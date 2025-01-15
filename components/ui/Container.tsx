import { ReactNode } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

interface ContainerStyles { children: ReactNode, additionalStyles?:  StyleProp<ViewStyle>[] };
const Container = ({ children, additionalStyles } : ContainerStyles ) => {
    return <View style={[styles.container, additionalStyles ? [...additionalStyles] : null]}>
        {children}
    </View>;
};

export default Container;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1
    }
});