import { View,  Dimensions, Image, Animated, StyleSheet } from 'react-native';
import { useRef } from 'react';
import Colors from '../../constants/colors';
import { goUpDown } from '../../functions/animationFunctions';
import { LinearGradient } from 'expo-linear-gradient';


function QRCode() {
  const windowWidth = Dimensions.get('window').width;
  const heightAnim = useRef(new Animated.Value(windowWidth * 0.5 * 0.05)).current;
  const heightGradAnim = useRef(new Animated.Value(windowWidth * 0.5 * 0.05)).current;
  const bottomAnim = useRef(new Animated.Value(windowWidth * 0.5 * 0.05)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  goUpDown(heightAnim, windowWidth * 0.5 * 0.98, windowWidth * 0.5 * 0.92, windowWidth * 0.5 * 0.02, heightGradAnim, bottomAnim, rotateAnim);

  const animationUpDownLine = {
    height: heightAnim,
  };
  const animationUpDownGradient = {
    height: heightGradAnim,
    bottom: bottomAnim,
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  return (
    <View style={[styles.qr_box_wrapper, { width: windowWidth * 0.5, height: windowWidth * 0.5 }]}>
      <Image style={{ width: windowWidth * 0.5, height: windowWidth * 0.5 }} source={require('../../assets/qr_code.webp')} />
      <Animated.View style={[styles.linear_gradient_line, animationUpDownLine]}></Animated.View>
      <Animated.View style={[styles.linear_gradient_box, animationUpDownLine, animationUpDownGradient, { transform: [{ rotateX: spin }] }]}>
        <LinearGradient colors={[Colors.light_qr_code_grad, Colors.dark_qr_code_grad]} style={[styles.linear_gradient]} />
      </Animated.View>
    </View>
  );
}

export default QRCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: Colors.background_color,
  },

  activity_container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background_color,
    alignItems: 'center',
  },
  bottom: {
    height: 78,
  },
  header_text: {
    color: Colors.text_color,
    fontSize: 22,
    fontFamily: 'poppins-medium',
    flex: 5,
    textAlign: 'center',
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
  },
  grad_container: {
    flex: 1,
    marginHorizontal: 10,
  },
  change_text: {
    fontFamily: 'poppins-regular',
    fontSize: 16,
    color: Colors.light_green,
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 50,
  },
  qr_box_wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  linear_gradient_box: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    alignItems: 'center',
  },
  linear_gradient_line: {
    position: 'absolute',
    width: '95.5%',
    height: '100%',
    borderTopWidth: 3.5,
    borderTopColor: Colors.qr_code_border_color,
    bottom: 2,
  },
  linear_gradient: {
    bottom: 0,
    width: '95.5%',
    height: '100%',
    position: 'absolute',
    alignSelf: 'center',
  },
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
});
