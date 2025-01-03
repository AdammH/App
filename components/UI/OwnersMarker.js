import { View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

function OwnersMarker() {
    return (
        <View style={styles.outerCircle}>
            <View style={styles.innerCircle} />
        </View>
    );
}

export default OwnersMarker;

const styles = StyleSheet.create({
    outerCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: Colors.light_green,
        borderWidth: 1,
        backgroundColor: Colors.light_opacity_green,
        alignItems: "center",
        justifyContent: "center",
    },
    innerCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderColor: Colors.light_green,
        borderWidth: 7,
        backgroundColor: Colors.light_opacity_green,
    },
});
