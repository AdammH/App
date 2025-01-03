import { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Text } from 'react-native';
import Colors from '../../constants/colors';
import { animateRotation } from '../../functions/animationFunctions';
import MaskedView from '@react-native-masked-view/masked-view';

import { LinearGradient } from 'expo-linear-gradient';

function Timer({style}) {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateRotation(rotateAnim);
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.time_container, style]}>
      <View style={{ alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <MaskedView style={[styles.time_box_mask]} maskElement={<View style={styles.maskWrapper}></View>}>
          <View style={styles.time_box}>
            <Animated.View style={[styles.triangle_wrapper, { transform: [{ rotate: spin }] }]}>
              <View style={styles.triangle}></View>
            </Animated.View>
          </View>
        </MaskedView>
        <LinearGradient style={styles.innerWrapper} colors={[Colors.light_grad_time_box, Colors.dark_grad_time_box]} start={[0.4, 0]}>
          <Text style={styles.time_text}>10</Text>
          <Text style={styles.time_text}>:</Text>
          <Text style={styles.time_text}>32</Text>
          <Text style={styles.time_text}>:</Text>
          <Text style={styles.time_text}>15</Text>
        </LinearGradient>
        <View style={styles.time_box_stroke}></View>
      </View>
      <View style={styles.time_naming}>
        <Text style={styles.time_naming_text}>Days</Text>
        <Text style={styles.time_naming_text}>Hours</Text>
        <Text style={styles.time_naming_text}>Mins</Text>
      </View>
    </View>
  );
}

export default Timer;

const styles = StyleSheet.create({
  time_container: {
    flex: 1,
    paddingTop: '20%',
  },
  time_box: {
    width: 268,
    height: 72,
    position: 'relative',
    alignSelf: 'center',
  },
  time_box_mask: {
    width: 266,
    height: 70,
  },
  rectangle_horizon: {
    width: 266,
    height: 15,
    backgroundColor: Colors.activity_color,
    position: 'absolute',
  },
  rectangle_vertical: {
    height: 70,
    width: 15,
    backgroundColor: Colors.activity_color,
    position: 'absolute',
  },
  maskWrapper: {
    width: 266,
    height: 70,
    borderRadius: 22,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerWrapper: {
    width: 261,
    height: 65,
    borderRadius: 22,
    backgroundColor: Colors.background_color,
    borderWidth: 1.5,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  time_box_stroke: {
    width: 268,
    height: 70,
    borderRadius: 22,
    backgroundColor: Colors.background_color,
    borderWidth: 1.5,
    position: 'absolute',
    borderWidth: 3,
    borderColor: Colors.gray_green_stroke_color,
    zIndex: -1,
  },
  triangle_wrapper: {
    position: 'relative',
    top: -115,
    transform: [{ rotate: '90deg' }],
    height: 300,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 400,
    borderRightWidth: 400,
    borderBottomWidth: 150,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.activity_color,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
  },
  time_text: {
    fontFamily: 'poppins-medium',
    fontSize: 21,
    color: Colors.activity_color,
  },
  time_naming: {
    width: 268,
    height: 70,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  time_naming_text: {
    fontFamily: 'poppins-regular',
    fontSize: 16,
    color: Colors.activity_color,
  },
});
