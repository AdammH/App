import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import ScreenHeaderLayout from '../../components/Layouts/ScreenHeader';
import { SvgXml } from 'react-native-svg';
import Colors from '../../constants/colors';
import ColorImage from '../../assets/favorite_color.svg';

function SecondSignUpScreen({ setUserInfo }) {
  const windowHeight = Dimensions.get('window').height;
  const [trainColor, setTrainColor] = useState('#16E779');
  const currentColor = ['#16E779', '#00887F', '#FF0E0E', '#FFFF01', '#4E3F3F', '#FFFFFF', '#3D0EFF', '#CDFF5F', '#F08566', '#E2982D'];

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
      <ScreenHeaderLayout mainHeader={'What color do I like'}>
        <View style={styles.color_box}>
          {currentColor.map((colorElement) => {
            return (
              <View style={styles.color_element} key={colorElement}>
                <TouchableOpacity onPress={() => setTrainColor(colorElement)} style={[styles.color_picker, { backgroundColor: colorElement }]}>
                  {colorElement === trainColor ? <View style={styles.active_dot}></View> : null}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <SvgXml xml={ColorImage} height={windowHeight / 3} style={{ marginTop: 60, color: trainColor }} />
      </ScreenHeaderLayout>
    </View>
  );
}

export default SecondSignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background_color,
  },
  color_box: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 24,
    justifyContent: 'space-between',
    width: '70%',
    height: 80,
    marginTop: 60,
  },
  color_element: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  color_picker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active_dot: {
    backgroundColor: Colors.background_color,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
