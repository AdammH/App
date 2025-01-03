import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { goUp, goDown } from '../../functions/animationFunctions';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/colors';
import { SvgXml } from 'react-native-svg';
import RedAttendeeIcon from '../../assets/red-attendee.svg';
import PrivateEventIcon from '../../assets/private-event.svg';
import { BlurView } from 'expo-blur';
import { useEffect, useRef, useState } from 'react';

function GradientBackground({ blur, showFullMapState, style, topIconBoxVisible, children }) {
  const windowHeight = Dimensions.get('window').height;
  const [blurEffect, setBlur] = useState(false);
  const bottomAnim = useRef(new Animated.Value(0)).current;
  const animationStyle = {
    bottom: bottomAnim,
  };

  useEffect(() => {
    if (showFullMapState != undefined) {
      if (showFullMapState === true) {
        goDown(bottomAnim, -windowHeight * 0.6);
      } else if (showFullMapState === false) {
        goUp(bottomAnim, 0);
      }
    }
    if (blurEffect === false) {
      if (blur === true)
        setTimeout(() => {
          setBlur(true);
        }, 100);
    }
  }, [showFullMapState]);

  return (
    <Animated.View style={[style, animationStyle]}>
      {topIconBoxVisible === true ? (
        <View style={styles.top_icons_box}>
          <View style={styles.top_icons_box_circle}><SvgXml xml={PrivateEventIcon} width={26} height={26} /></View>
          <View style={styles.top_icons_box_circle}><SvgXml xml={RedAttendeeIcon} width={30} height={30} /></View>
        </View>
      ) : null}
      <LinearGradient
        colors={[Colors.light_info_container_opacity_gradient, Colors.dark_info_container_opacity_gradient, Colors.background_color]}
        locations={[0, 0.1, 0.8]}
        style={styles.info_container}
      >
        {children}
      </LinearGradient>
      <LinearGradient colors={[Colors.info_container_border, Colors.background_color]} style={styles.info_container_back}></LinearGradient>
      {blurEffect === true && (
        <View style={styles.blurContainer}>
          <BlurView intensity={20} tint="light" style={styles.blurContainer} />
        </View>
      )}
    </Animated.View>
  );
}

export default GradientBackground;

const styles = StyleSheet.create({
  top_icons_box: {
    position: 'absolute',
    flexDirection: 'row',
    height: 50,
    columnGap: 8,
    top: -30,
    left: 20,
    zIndex: 1000,
    alignItems: 'center',
  },
  top_icons_box_circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.gray_stroke_color,
    backgroundColor: Colors.light_info_container_opacity_gradient,
    alignItems: 'center',
    justifyContent: 'center'
  },
  info_container: {
    flex: 1,
    paddingTop: 20,
    borderRadius: 24,
    rowGap: 16,
  },
  info_container_back: {
    flex: 1,
    paddingTop: 50,
    borderRadius: 24,
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: -1,
    top: -2,
    opacity: 0.5,
  },
  blurContainer: {
    flex: 1,
    borderRadius: 24,
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: -1,
    top: -3,
    overflow: 'hidden',
  },
});
