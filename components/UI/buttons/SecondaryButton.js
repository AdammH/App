import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { useState } from 'react';
import Colors from "../../../constants/colors";

// for expample Party Hop button
// style - green border,  white text in the middle, bg color green wit opacity

function SecondaryButton({text, onPress}){
  return(
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>
      {text}
      </Text>
    </TouchableOpacity>
  )
}

export default SecondaryButton;

const styles = StyleSheet.create({
  container:{
    width: 76,
    height: 28,
    borderRadius: 10,
    backgroundColor: Colors.light_opacity_green,
    borderWidth: 1,
    borderColor: Colors.border_green,
    justifyContent: 'center'
  },
  text:{
    fontSize: 10,
    fontFamily: 'poppins-medium',
    color: Colors.text_color,
    textAlign: 'center'
  }
})