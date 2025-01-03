import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/colors';

function BoxWithCheckbox({ strokeStatus, text }) {
  const [checkboxState, setCheckboxState] = useState(false);

  return (
    <TouchableOpacity style={[styles.container]} activeOpacity={0.7} onPress={() => setCheckboxState(!checkboxState)}>
      {strokeStatus === true ? <LinearGradient colors={[Colors.light_item_type_stroke_grad_green, Colors.dark_item_type_stroke_grad_green]} style={styles.box_gradient_stroke} /> : null}
      <LinearGradient colors={[Colors.light_rectangle_btn_grad, Colors.dark_rectangle_btn_grad]} start={[0, 0]} style={styles.box_gradient} />
      <View style={[styles.box_shadow, Platform.OS === 'ios' ? { shadowColor: Colors.rectangle_btn_stroke } : { shadowColor: Colors.grey_text_color, elevation: 5 }]}></View>
      <View style={styles.inner_box_row}>
        <Text style={styles.box_text}>{text}</Text>
        <View style={styles.checkbox}>
          {checkboxState === true ? (
            <LinearGradient colors={[Colors.dark_green, Colors.light_green]} start={[0, 0]} style={styles.checkbox}>
              <Ionicons name="checkmark-outline" size={15} color={Colors.text_color} />
            </LinearGradient>
          ) : (
            <View style={[styles.checkbox_inactive, styles.checkbox]}></View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default BoxWithCheckbox;

const styles = StyleSheet.create({
  container: {
    height: 56,
    width: '100%',
    borderRadius: 16,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  box_gradient: {
    position: 'absolute',
    height: 56,
    width: '99%',
    maxWidth: 165,
    borderRadius: 16,
  },
  box_shadow: {
    flex: 1,
    position: 'absolute',
    height: 56,
    width: '99%',
    maxWidth: 165,
    zIndex: -1,
    borderRadius: 16,
    backgroundColor: Colors.background_color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  box_gradient_stroke: {
    position: 'absolute',
    height: 58,
    width: '100%',
    maxWidth: 166,
    borderRadius: 16,
  },
  inner_box_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  box_text: {
    color: Colors.grey_text_color,
    fontFamily: 'poppins-regular',
    fontSize: 14,
    flex: 2,
    textAlign: 'center',
  },
  checkbox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 22,
    height: 22,
    borderRadius: 8,
    flex: 1,
  },
  checkbox_inactive: {
    backgroundColor: Colors.background_gray_color,
  },
});
