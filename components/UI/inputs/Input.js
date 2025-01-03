import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import Colors from '../../../constants/colors';
import EyeIconSvg from '../../../assets/eye-icon.svg';
import { SvgXml } from 'react-native-svg';
import { useState } from 'react';

function Input({ label, onPress, icon, forgotPassword, passVisibility, inputConfig, value }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, isFocused ? styles.focusedInput : styles.blurredInput]}
          value={value && value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...inputConfig}
        />
        {icon === 'eyeIcon' && (
          <Pressable onPress={onPress} style={passVisibility === false ? styles.icon : [styles.icon, styles.pressed]}>
            <SvgXml xml={EyeIconSvg} />
          </Pressable>
        )}
      </View>
      {forgotPassword && (
        <Pressable>
          <Text style={styles.forgotPass}>Forgot Password?</Text>
        </Pressable>
      )}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 80,
  },
  label: {
    fontSize: 14,
    fontFamily: 'poppins-regular',
    marginBottom: 7,
    color: Colors.gray_color,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: Colors.input_bg_color,
    borderColor: Colors.input_border_color,
    height: 56,
    paddingHorizontal: 24,
    color: Colors.gray_color,
    fontSize: 18,
  },
  focusedInput: {
    backgroundColor: Colors.input_bg_focused_color,
  },
  blurredInput: {
    backgroundColor: Colors.input_bg_color,
  },
  icon: {
    flex: 1,
    position: 'absolute',
    right: 0,
    marginRight: 25,
  },
  pressed: {
    opacity: 0.5,
  },
  forgotPass: {
    fontFamily: 'poppins-semi-bold',
    color: Colors.aqua_green,
    fontSize: 12,
    bottom: -6,
    alignSelf: 'flex-end',
  },
});
