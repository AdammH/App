import { StyleSheet, View, Text, Pressable } from 'react-native';
import Colors from '../../constants/colors';
import FacebookIcon from '../../assets/facebook-icon.svg';
import GoogleIcon from '../../assets/google-icon.svg';
import Input from '../../components/UI/inputs/Input';
import PrimaryButton from '../../components/UI/buttons/PrimaryButton';
import { SvgXml } from 'react-native-svg';
import { useState } from 'react';

function LastSignUpScreen({ navigation, setUserInfo, userInfo }) {
  const [passVisibility, setPassVisibility] = useState(true);
  function showPasswordHandler() {
    setPassVisibility(!passVisibility);
  }

  function navigationHandler() {
    navigation.navigate('LoginPage');
  }

  function inputHandler(inputIdentifier, enteredValue) {
    setUserInfo((current) => {
      return {
        ...current,
        [inputIdentifier]: enteredValue,
      };
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.info_container}>
        <View style={styles.header_container}>
          <Text style={styles.header}>Sign Up</Text>
        </View>
        <View style={styles.inputs_container}>
          <Input
            label="Email"
            inputConfig={{
              autoCorrect: false,
              autoCapitalize: 'none',
              keyboardType: 'email-address',
              onChangeText: inputHandler.bind(this, 'email'),
            }}
            value={userInfo.email}
          />
          <Input
            label="Password"
            onPress={showPasswordHandler}
            icon="eyeIcon"
            forgotPassword={false}
            passVisibility={passVisibility}
            inputConfig={{ secureTextEntry: passVisibility, onChangeText: inputHandler.bind(this, 'password') }}
            value={userInfo.password}
          />
          <Input
            label="Confirm password"
            onPress={showPasswordHandler}
            forgotPassword={false}
            passVisibility={passVisibility}
            inputConfig={{ secureTextEntry: passVisibility, onChangeText: inputHandler.bind(this, 'repeatedPassword') }}
            value={userInfo.repeatedPassword}
          />
        </View>
        <PrimaryButton text="Create" />
        <Text style={[styles.small_text, { color: Colors.gray_color }]}>or connect with</Text>
        <View style={styles.row_links}>
          <Pressable style={styles.row_links}>
            <SvgXml xml={FacebookIcon} />
            <Text style={styles.link_text}>Facebook</Text>
          </Pressable>
          <Pressable style={styles.row_links}>
            <SvgXml xml={GoogleIcon} />
            <Text style={styles.link_text}>Google</Text>
          </Pressable>
        </View>
        <Pressable style={styles.sign_up_link} onPress={navigationHandler}>
          <Text style={[styles.small_text, { color: Colors.light_green }]}>Already have an account? Login here</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default LastSignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background_color,
  },
  info_container: {
    flex: 1,

    rowGap: 16,
  },
  inputs_container: {
    height: 300,
    paddingHorizontal: 10,
  },
  text: {
    color: Colors.text_color,
    fontFamily: 'poppins-semi-bold',
    fontSize: 30,
    textAlign: 'center',
  },
  small_text: {
    fontFamily: 'poppins-regular',
    fontSize: 14,
    textAlign: 'center',
  },
  row_links: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    columnGap: 10,
    flex: 1
},
  media_icon: {
    marginRight: 12,
  },
  link_text: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'poppins-medium',
  },
  header_container: {
    marginTop: 30,
    justifyContent: 'center',
    zIndex: 1000,
  },
  header: {
    color: Colors.text_color,
    fontFamily: 'poppins-semi-bold',
    fontSize: 24,
    textAlign: 'center',
  },
});
