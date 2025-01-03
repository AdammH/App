import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../../constants/colors";

function PrimaryButton({ text, onPress, sizeBtnStyle, children, textTransformation}) {

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.container, !sizeBtnStyle ? {width: 200, height: 52} : sizeBtnStyle]}>
            <LinearGradient colors={[Colors.dark_green, Colors.light_green]} start={[0, 0]} style={[styles.container, !sizeBtnStyle ? {width: 200, height: 52} : sizeBtnStyle]}>
                {text ? <Text style={[styles.text, textTransformation ==="uppercase" && {textTransform: "uppercase"} ]}>{text}</Text> : children} 
            </LinearGradient>
        </TouchableOpacity>
    );
}

export default PrimaryButton;

const styles = StyleSheet.create({
    container: {
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center"
    },
    text: {
        fontFamily: "poppins-semi-bold",
        color: "white",
        fontSize: 16,
    },
});
