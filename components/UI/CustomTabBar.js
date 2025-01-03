import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../constants/colors";
import { StyleSheet } from "react-native";

function CustomTabBar() {
    return <LinearGradient colors={[Colors.dark_green, Colors.light_green]} start={[0, 0]} style={styles.container}></LinearGradient>;
}

export default CustomTabBar;

const styles = StyleSheet.create({
    container: {
        height: 80,
        width: "100%",
        borderTopStartRadius: 25,
        borderTopEndRadius: 25,
        backgroundColor:'red'
    },
});
