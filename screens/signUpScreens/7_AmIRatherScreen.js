import { useState, useRef } from 'react';
import { StyleSheet, View, Dimensions, Animated } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Colors from '../../constants/colors';
import AloneImage from '../../assets/rather_alone_image.svg';
import SociableImage from '../../assets/rather_sociable_image.svg';
import { setVisibilityElement } from '../../functions/animationFunctions';
import ToggleGreenBGButtons from '../../components/UI/buttons/ToggleGreenBGButtons';
import ScreenHeaderLayout from '../../components/Layouts/ScreenHeader';

function SeventhSignUpScreen({ setUserInfo }) {
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
      <ScreenHeaderLayout mainHeader={'Am I rather'} style={{ height: windowHeight * 0.65 }}>
        <Animated.View style={[animationAloneStyle, { alignItems: 'center' }]}>
          <SvgXml xml={AloneImage} height={windowHeight / 2} style={{ marginTop: 19, position: 'absolute' }} />
        </Animated.View>
        <Animated.View style={[animationSociableStyle, { alignItems: 'center' }]}>
          <SvgXml xml={SociableImage} height={windowHeight / 2} style={{ marginTop: 19, position: 'absolute' }} />
        </Animated.View>
      </ScreenHeaderLayout>
      <ToggleGreenBGButtons onPress={chooseMoodHandler} pressed={pressed} textButtonOne={'Alone'} textButtonTwo={'Sociable'} />
    </View>
  );
}

export default SeventhSignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background_color,
  }
});
