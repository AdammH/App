import { useState, useRef, useEffect } from 'react';
import { View, Pressable, StyleSheet, ScrollView, Dimensions, Animated } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ProgressBar from '../components/UI/ProgressBar';
import PrimaryButton from '../components/UI/buttons/PrimaryButton';
import FirstSignUpScreen from '../screens/signUpScreens/1_WhoAmIScreen';
import SecondSignUpScreen from '../screens/signUpScreens/2_WhatColorScreen';
import ThirdSignUpScreen from '../screens/signUpScreens/3_FavoriteMusicScreen';
import FourthSignUpScreen from '../screens/signUpScreens/4_FavoriteFoodScreen';
import FifthSignUpScreen from '../screens/signUpScreens/5_FavoritePlaceScreen';
import SeventhSignUpScreen from '../screens/signUpScreens/7_AmIRatherScreen';
import EightSignUpScreen from '../screens/signUpScreens/8_FeelingsScreen';
import SixthSignUpScreen from '../screens/signUpScreens/6_MyInterestsScreen';
import LastSignUpScreen from '../screens/signUpScreens/LastScreen';
import { fadeInFadeOutVisibilityElement } from '../functions/animationFunctions';
import MainLayout from '../components/Layouts/MainLayout';
import dayjs from 'dayjs';
import DateTimePicker from 'react-native-ui-datepicker';
import Colors from '../constants/colors';

function SignUpPage({ navigation }) {
  const numOfScreens = 9;
  const windowHeight = Dimensions.get('window').height;
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState(dayjs());
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: '',
    gender: '',
    country: '',
    birthrate: new Date(value),
    email: '',
    password: '',
    repeatedPassword: '',
  });
  

  function continueButtonHandler() {
    if(datePickerOpen===true){
      setDatePickerOpen(false)
    }
    setCurrentPage((current) => {
      return current + 1;
    });
  }

  function goBackHandler() {
    if (currentPage === 1) {
      navigation.goBack();
    } else {
      setCurrentPage((current) => {
        return current - 1;
      });
    }
  }

  function dateHandler(date) {
    setValue(date);
    setUserInfo((current) => {
      return {
        ...current,
        birthrate: date,
      };
    });
    setDatePickerOpen(false)
  }

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <KeyboardAwareScrollView behavior="position">
        <MainLayout onPress={goBackHandler}>
          {currentPage != numOfScreens && <ProgressBar progress={(currentPage / (numOfScreens - 1)) * 100} bgColor={Colors.progress_bg} />}
          <View style={[styles.content_container, { minHeight: windowHeight/1.45  }]}>
            {currentPage === 1 && <FirstSignUpScreen setUserInfo={setUserInfo} style={styles.children_component} value={value} userInfo={userInfo} onPress={() => setDatePickerOpen(true)} />}
            {currentPage === 2 && <SecondSignUpScreen navigation={navigation} style={styles.children_component} setUserInfo={setUserInfo} userInfo={userInfo} />}
            {currentPage === 3 && <ThirdSignUpScreen navigation={navigation} style={styles.children_component} setUserInfo={setUserInfo} userInfo={userInfo} />}
            {currentPage === 4 && <FourthSignUpScreen navigation={navigation} style={styles.children_component} setUserInfo={setUserInfo} userInfo={userInfo} />}
            {currentPage === 5 && <FifthSignUpScreen navigation={navigation} style={styles.children_component} setUserInfo={setUserInfo} userInfo={userInfo} />}
            {currentPage === 6 && <SixthSignUpScreen navigation={navigation} style={styles.children_component} setUserInfo={setUserInfo} userInfo={userInfo} />}
            {currentPage === 7 && <SeventhSignUpScreen navigation={navigation} style={styles.children_component} setUserInfo={setUserInfo} userInfo={userInfo} />}
            {currentPage === 8 && <EightSignUpScreen navigation={navigation} style={styles.children_component} setUserInfo={setUserInfo} userInfo={userInfo} />}
            {currentPage === numOfScreens && <LastSignUpScreen navigation={navigation} style={styles.children_component} setUserInfo={setUserInfo} userInfo={userInfo} />}
            {datePickerOpen && (
              <Pressable style={styles.date_outer_container} onPress={() => setDatePickerOpen(false)}>
                <View style={styles.date_container}>
                  <DateTimePicker mode={'date'} value={value} onValueChange={(date) => dateHandler(date)} />
                </View>
              </Pressable>
            )}
          </View>
          {currentPage != numOfScreens && (
            <View style={styles.btn_container}>
              <PrimaryButton onPress={continueButtonHandler} text="Continue" />
            </View>
          )}
        </MainLayout>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}
export default SignUpPage;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background_color,
  },
  content_container: {
    flex: 1,
    zIndex: 0,
    paddingBottom: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
  btn_container: {
    position: 'relative',
    paddingVertical: 20,
  },
  date_outer_container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.date_container_bg,
  },
  date_container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#F5FCFF',
    width: '80%',
    height: 320,
    borderRadius: 16,
  },
  animated_overlay: {
    flex: 1,
    width: '100%',
    height: '88%',
    backgroundColor: Colors.background_color,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
