import { View, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../../constants/colors";


function RectangleButton({ style, children, status, colorVariant }) {
    return (
        <View style={style}>
            <LinearGradient colors={colorVariant !== 'light' ? [Colors.light_rectangle_btn_grad, Colors.dark_rectangle_btn_grad] : [Colors.lighter_rectangle_btn_grad, Colors.darker_rectangle_btn_grad]} style={[style, styles.container]}>
                {children}
            </LinearGradient>
            <View style={[style, styles.stroke]}></View>
        </View>
    );
}

export default RectangleButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
    },
    stroke: {
        backgroundColor: Colors.rectangle_btn_stroke,
        zIndex: -1,
        position: "absolute",
        bottom: 1,
        right: 0,
    },
});
