import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Colors from '../../../constants/colors';

function ToggleGreenBGButtons({onPress, pressed, textButtonOne, textButtonTwo}){
  return(
    <View style={styles.date_toggle_wrap}>
    <TouchableOpacity onPress={onPress} style={[styles.date_toggle_touchable_btn, pressed === true ? styles.button_border : null]}>
      <Text style={[styles.date_toggle_text, pressed === true ? { color: Colors.text_color } : null]}>{textButtonOne}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPress} style={[styles.date_toggle_touchable_btn, pressed === false ? styles.button_border : null]}>
      <Text style={[styles.date_toggle_text, pressed === false ? { color: Colors.text_color } : null]}>{textButtonTwo}</Text>
    </TouchableOpacity>
  </View>
  )
}
export default ToggleGreenBGButtons;

const styles = StyleSheet.create({
  date_toggle_wrap: {
    height: 52,
    width: '95%',
    borderRadius: 18,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark_green_toggle_background,
    shadowColor: Colors.drop_shadow_toggle_bg,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 8,
  },
  date_toggle_touchable_btn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: '100%',
  },
  button_border: {
    borderWidth: 1,
    borderRadius: 18,
    borderColor: Colors.light_green,
  },
  date_toggle_text: {
    fontSize: 16,
    fontFamily: 'poppins-semi-bold',
    color: Colors.gray_color,
  },
})