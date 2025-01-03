import { StyleSheet, View, Text, Pressable } from 'react-native';
import Colors from '../../constants/colors';

function DatePickerInput({ label, value, onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.inputContainer} onPress={onPress}>
        <Text style={styles.date_style}>{value.length ? value : value.format('DD/MM/YYYY')}</Text>
      </Pressable>
    </View>
  );
}

export default DatePickerInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontFamily: 'poppins-regular',
    marginBottom: 7,
    color: Colors.gray_color,
  },
  inputContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: Colors.input_bg_color,
    borderColor: Colors.input_border_color,
    height: 56,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  date_style: {
    color: Colors.text_color,
    fontSize: 16,
  },
});
