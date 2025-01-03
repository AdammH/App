import { StyleSheet, Image, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

function DropDownPhotoInfoBox() {
  return (
    <LinearGradient style={styles.container} colors={[Colors.light_grad_drop_photo_bg, Colors.dark_grad_drop_photo_bg]}>
      <View style={styles.info_box}>
        <Image source={require('../../assets/icons/like_btn_icon.png')} style={styles.icon} />
        <Text style={styles.text}>101k</Text>
      </View>
      <View style={styles.info_box}>
        <Ionicons name='chatbubble-ellipses-outline' size={24} color={Colors.icon_light_gray_color}/>
        <Text style={styles.text}>12k</Text>
      </View>
      <View style={styles.info_box}>
      <Ionicons name="arrow-redo-outline" size={24} color={Colors.icon_light_gray_color} />
        <Text style={styles.text}>500</Text>
      </View>
    </LinearGradient>
  );
}

export default DropDownPhotoInfoBox;

const styles = StyleSheet.create({
  container: {
    width: 62,
    paddingVertical: 24,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 24,
    borderWidth: 1.5,
    borderColor: Colors.light_opacity_green
  },
  icon: {
    width: 24,
    height: 24,
    objectFit: 'contain',
  },
  info_box: {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 8
  },
  text: {
    fontFamily: 'poppins-regular',
    fontSize: 14,
    color: Colors.icon_light_gray_color,
  },
});
