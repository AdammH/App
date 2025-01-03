import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../constants/colors";

function ProgressBar({progress, bgColor}){
  return(
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <LinearGradient colors={[Colors.progress_light_green, Colors.progress_dark_green]} start={[0, 0]} style={[styles.progress, {width: progress + '%'}]}/>
    </View>
  )
}

export default ProgressBar;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginHorizontal: 10,
    height: 5,
    borderRadius: 60,
  },
  progress:{
    height: 5,
    borderRadius: 60,
  }
})