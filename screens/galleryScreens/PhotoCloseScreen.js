import { useState, useRef } from 'react';
import { StyleSheet, View, Image, Text, Pressable, Animated } from 'react-native';
import Colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { fadeOutScale, setToStart } from '../../functions/animationFunctions';
import { LinearGradient } from 'expo-linear-gradient';
import SmallRoundedButton from '../../components/UI/buttons/SmallRoundedButton';
import DropDownPhotoInfoBox from '../../components/UI/DropDownPhotoInfoBox';

function PhotoCloseScreen({ navigation, route }) {
  const [like, setLike] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(1)
  function goBackHandler() {
    navigation.goBack();
  }
  function likeBtnToggle() {
    if(like===false){
      fadeOutScale(opacityAnim)
    }
    if(like===true){
      setToStart(opacityAnim)
    }
    setLike(!like);
  }
 
  const opacityAnim = useRef(new Animated.Value(animatedValue)).current;

  const scale = opacityAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 0],
  });
  const translateX = opacityAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -5],
  });
  const translateY = opacityAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -40],
  });


  const animatedImageStyle = {
    opacity: opacityAnim,
    transform: [{ scale: scale }, {translateX: translateX}, {translateY: translateY}]
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SmallRoundedButton onPress={goBackHandler} lightStyle={true}>
          <Ionicons name="chevron-back-outline" size={20} color={Colors.text_color} />
        </SmallRoundedButton>
      </View>
      <Image source={route.params.image} style={styles.image} />
      <LinearGradient colors={[Colors.background_opacity_0_color, Colors.background_opacity_40_color]} start={[0, 0]} style={[styles.dark_overlay]}></LinearGradient>
      <View style={styles.drop_down_box}>
        <DropDownPhotoInfoBox />
      </View>
      <View style={styles.bottom_wrapper}>
        <SvgXml width={40} height={40} xml={route.params.userIcon} />
        <View style={styles.bottom_wrapper_right}>
          <Text style={styles.text}>Huge Party</Text>
          <Pressable onPress={likeBtnToggle} style={({ pressed }) => [pressed && styles.pressed]}>
            <Image source={like === true ? require('../../assets/like.png') : require('../../assets/inactive_like.png')} style={styles.likes_image} />
            <Animated.Image source={require('../../assets/icons/heart_like_icon.png')} style={[{position: 'absolute', top: -5, right: 8},animatedImageStyle]}></Animated.Image>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default PhotoCloseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'relative',
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 20,
    zIndex: 1,
  },
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -2,
  },
  dark_overlay: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  bottom_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 24,
  },
  bottom_wrapper_right: {
    alignItems: 'center',
    rowGap: 8,
  },
  text: {
    fontFamily: 'poppins-medium',
    fontSize: 18,
    color: Colors.grey_text_color,
  },
  likes_image: {
    width: 88,
    height: 36,
    borderRadius: 10,
  },
  drop_down_box: {
    alignSelf: 'flex-end',
    marginHorizontal: 10,
    flex: 4,
    justifyContent: 'flex-end',
    paddingVertical: 40,
  },
  pressed: {
    transform: [{scale: 1.1}]
  }
});
