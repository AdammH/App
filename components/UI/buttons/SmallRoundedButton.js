import { StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../../constants/colors';

function SmallRoundedButton({onPress, children, lightStyle}) {
  return (
    <TouchableOpacity style={[styles.roundedButton, lightStyle===false ? null : {borderWidth: 1, borderColor: Colors.text_color}]} onPress={onPress}>
      <LinearGradient style={[styles.roundedButton]} colors={lightStyle===false ? [Colors.light_round_btn_green, Colors.dark_round_btn_green] : [Colors.text_color_transparent, Colors.text_color_transparent]} start={[0, 0]}>
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default SmallRoundedButton;

const styles = StyleSheet.create({
  roundedButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
})