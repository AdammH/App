import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SvgXml } from 'react-native-svg';
import Colors from '../constants/colors.js';
import FriendsSvg from '../assets/friends.svg';
import FacebookIcon from '../assets/facebook-icon.svg';
import GoogleIcon from '../assets/google-icon.svg';
import Input from '../components/UI/inputs/Input';
import PrimaryButton from '../components/UI/buttons/PrimaryButton.js';
import { fetchEvents } from '../redux/features/eventsSlice';
import { fetchGroups } from '../redux/features/groupsSlice';

function LoginScreen({ navigation }) {
  const [passVisibility, setPassVisibility] = useState(true);
  const dispatch = useDispatch();

  function showPasswordHandler() {
    setPassVisibility(!passVisibility);
  }

  async function navigationHandler(page) {
    if (page === 'ApplicationLayout') {
     
    }

    navigation.navigate(page);
  }
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={styles.image_container}>
            <SvgXml xml={FriendsSvg} />
          </View>
          <View style={styles.info_container}>
            <Text style={styles.text}>Welcome back</Text>
            <View style={styles.inputs_container}>
              <Input label="Email" inputConfig={{ autoCorrect: false, autoCapitalize: 'none', keyboardType: 'email-address' }} />
              <Input label="Password" onPress={showPasswordHandler} icon="eyeIcon" forgotPassword={true} passVisibility={passVisibility} inputConfig={{ secureTextEntry: passVisibility }} />
            </View>
            <PrimaryButton text="Log in" textTransformation="uppercase" onPress={navigationHandler.bind(this, 'ApplicationLayout')} />
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
            <Pressable style={styles.sign_up_link} onPress={navigationHandler.bind(this, 'SignUpPage')}>
              <Text style={[styles.small_text, { color: Colors.light_green }]}>Don't have an account? Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background_color,
  },
  image_container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    flex: 1,
  },
  info_container: {
    flex: 1,

    rowGap: 16,
  },
  inputs_container: {
    height: 200,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 10,
    flex: 1,
  },
  media_icon: {
    marginRight: 12,
  },
  link_text: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'poppins-medium',
  },
});
