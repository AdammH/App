import { StyleSheet, View, Dimensions, Text } from 'react-native';
import BoxWithCheckbox from '../../components/UI/buttons/BoxWithCheckbox';
import ScreenHeaderLayout from '../../components/Layouts/ScreenHeader';
import Colors from '../../constants/colors';
import { SvgXml } from 'react-native-svg';
import MusicImage from '../../assets/favorite_music_image.svg';
import { useEffect } from 'react';

function ThirdSignUpScreen({ setUserInfo }) {
  const windowWidth = Dimensions.get('window').width;
  function inputHandler(inputIdentifier, enteredValue) {
    setUserInfo((current) => {
      return {
        ...current,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  // predpriprava na setovanie checkoboxov
  /* setCurrentColor((current) => {
      Object.values(current).map((color) => (color.active = false));
      return {
        ...current,
        [inputIdentifier]: { color: inputIdentifier, active: true },
      };
    }); */

  return (
    <View style={styles.container}>
      <ScreenHeaderLayout mainHeader={'Favorite music'}>
        <View style={styles.checkbox_wrapper}>
          <View style={[styles.checkbox_row, { marginLeft: windowWidth * 0.5 }]}>
            <BoxWithCheckbox strokeStatus={true} text="Rock" />
          </View>
          <View style={[styles.checkbox_row, { marginLeft: windowWidth * 0.3 }]}>
            <BoxWithCheckbox strokeStatus={true} text="Techno" />
          </View>
          <View style={[styles.checkbox_row, { marginLeft: windowWidth * 0.15 }]}>
            <BoxWithCheckbox strokeStatus={true} text="Rap" />
          </View>
          <View style={[styles.checkbox_row, { marginLeft: windowWidth * 0.02 }]}>
            <BoxWithCheckbox strokeStatus={true} text="Pop" />
          </View>
          <View style={[styles.checkbox_row, { marginLeft: windowWidth * 0.08 }]}>
            <BoxWithCheckbox strokeStatus={true} text="Country" />
          </View>
          <View style={[styles.checkbox_row, { marginLeft: windowWidth * 0.2 }]}>
            <BoxWithCheckbox strokeStatus={true} text="House" />
          </View>
        </View>
        <SvgXml xml={MusicImage} style={styles.image} />
      </ScreenHeaderLayout>
    </View>
  );
}

export default ThirdSignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background_color,
  },
  image: {
    position: 'absolute',
    marginTop: 10,
    zIndex: -1,
  },
  checkbox_wrapper: {
    position: 'relative',
    width: '100%',
    marginTop: 32,
  },
  checkbox_row: {
    width: '40%',
  },
});
