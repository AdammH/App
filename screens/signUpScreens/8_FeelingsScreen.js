import { useState, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, Animated } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Colors from '../../constants/colors';
import HappyImage from '../../assets/happy_feeling_image.svg';
import UnhappyImage from '../../assets/unhappy_feeling_image.svg';
import { setVisibilityElement } from '../../functions/animationFunctions';
import ToggleGreenBGButtons from '../../components/UI/buttons/ToggleGreenBGButtons';
import ScreenHeaderLayout from '../../components/Layouts/ScreenHeader';

function EightSignUpScreen({ setUserInfo }) {
  const windowHeight = Dimensions.get('window').height;
  const [pressed, setPressed] = useState(true);
  const visibilityAloneImage = useRef(new Animated.Value(1)).current;
  const visibilitySociableImage = useRef(new Animated.Value(0)).current;

  function chooseMoodHandler() {
    setPressed(!pressed);
    if (pressed === true) {
      setVisibilityElement(visibilityAloneImage, 0);
      setVisibilityElement(visibilitySociableImage, 1);
    } else {
      setVisibilityElement(visibilityAloneImage, 1);
      setVisibilityElement(visibilitySociableImage, 0);
    }
  }

  const animationAloneStyle = {
    scale: visibilityAloneImage,
    opacity: visibilityAloneImage.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };
  const animationSociableStyle = {
    scale: visibilitySociableImage,
    opacity: visibilitySociableImage.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  return (
    <View style={styles.container}>
      <ScreenHeaderLayout mainHeader={'How do I feel'} style={{ height: windowHeight * 0.65 }}>
        <Animated.View style={[animationAloneStyle, { alignItems: 'center' }]}>
          <SvgXml xml={HappyImage} height={windowHeight / 2} style={{ marginTop: 19, position: 'absolute' }} />
        </Animated.View>
        <Animated.View style={[animationSociableStyle, { alignItems: 'center' }]}>
          <SvgXml xml={UnhappyImage} height={windowHeight / 2} style={{ marginTop: 19, position: 'absolute' }} />
        </Animated.View>
      </ScreenHeaderLayout>
      <ToggleGreenBGButtons onPress={chooseMoodHandler} pressed={pressed} textButtonOne={'Happy'} textButtonTwo={'Unhappy'} />
    </View>
  );
}

export default EightSignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background_color,
  },
  image_container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 10,
    position: 'relative',
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
