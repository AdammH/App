import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Text } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import Colors from '../../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../../components/UI/inputs/Input';
import PrimaryButton from '../../components/UI/buttons/PrimaryButton';

function QRCodeInputBox() {
  const [codeValue, setCodeValue] = useState('');
  const inputRef = useRef();

  function inputHandler(text){
    setCodeValue(text)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient colors={[Colors.light_grad_code_input_bg, Colors.dark_grad_code_input_bg]} start={[0, 0]} style={styles.insert_code_box}>
        <Text style={styles.grey_code_text}>Add friend by special code</Text>
        <Input
          inputConfig={{
            autoCorrect: false,
            autoCapitalize: 'none',
            onChangeText: inputHandler,
          }}
          value={codeValue}
        />
        <View style={{ alignSelf: 'center', alignItems: 'center', columnGap: 16, flexDirection: 'row', marginBottom: 25, marginTop: 21 }}>
          <View style={{ width: 60, height: 1, backgroundColor: Colors.background_gray_color }}></View>
          <Text style={styles.or_text}>Or</Text>
          <View style={{ width: 60, height: 1, backgroundColor: Colors.background_gray_color }}></View>
        </View>
        <PrimaryButton
          onPress={() => {
            null;
          }}
          text="Scan QR"
        />
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

export default QRCodeInputBox;

const styles = StyleSheet.create({
  grey_code_text: {
    color: Colors.gray_text_color,
    fontSize: 15,
    fontFamily: 'poppins-medium',
  },
  code_text_box: {
    width: '80%',
    height: 56,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.code_text_box_bg,
    borderWidth: 1.5,
    borderColor: Colors.light_green,
    borderRadius: 18,
    marginBottom: 38,
  },
  code_text: {
    color: Colors.light_green,
    fontSize: 16,
    fontFamily: 'poppins-medium',
  },
  insert_code_box: {
    width: '100%',
    height: 264,
    alignSelf: 'center',
    paddingVertical: 31,
    paddingHorizontal: 24,
    borderRadius: 18,
  },
  or_text: {
    color: Colors.gray_text_color,
    fontSize: 13,
    fontFamily: 'poppins-regular',
  },
});
