import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../constants/colors";
import { StyleSheet, View } from "react-native";
import { SvgXml } from "react-native-svg";
import AddIcon from "../../assets/tabBarIcons/add_icon.svg";
import HomeIcon from "../../assets/tabBarIcons/home_icon.svg";

function MainTabBarButton({ icon }) {
    return (
        <View style={styles.btn_container}>

        <LinearGradient colors={[Colors.progress_light_green, Colors.progress_dark_green]} start={[0, 0]} style={styles.container}>
            {icon === "plus" && <SvgXml xml={AddIcon} />}
            {icon === "home" && <SvgXml xml={HomeIcon} />}
        </LinearGradient>
        <View style={styles.shadow_component}/>
        </View>
    );
}

export default MainTabBarButton;

const styles = StyleSheet.create({
    btn_container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width:'100%',
        height: '100%'
    },
    shadow_component:{
        position: 'absolute',
        backgroundColor: Colors.drop_shadow_green,
        zIndex: -1,
        width: 56,
        height: 56,
        borderRadius: 28,
        shadowColor: Colors.drop_shadow_green,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 8,
    },
    container: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
      
    },
});
