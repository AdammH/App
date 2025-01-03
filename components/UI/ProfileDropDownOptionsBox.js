import { StyleSheet, Image, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/colors';

function ProfileDropDownOptionsBox() {
  return (
    <LinearGradient style={styles.container} colors={[Colors.light_profile_drop_grad_green, Colors.dark_profile_drop_grad_green]} start={[0.4, 0]}>
      <View style={styles.drop_box}>
        <Image source={require('../../assets/icons/disco_ball.png')} style={styles.icon} />
        <Text style={styles.text}>Party Club</Text>
      </View>
      <View style={styles.drop_box}>
        <Image source={require('../../assets/icons/football.png')} style={styles.icon} />
        <Text style={styles.text}>Soccer team</Text>
      </View>
      <View style={styles.drop_box}>
        <Image source={require('../../assets/icons/microphone.png')} style={styles.icon} />
        <Text style={styles.text}>Rap Party</Text>
      </View>
      <View style={styles.drop_box}>
        <Image source={require('../../assets/icons/joystick.png')} style={styles.icon} />
        <Text style={styles.text}>Games</Text>
      </View>
    </LinearGradient>
  );
}

export default ProfileDropDownOptionsBox;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 8,
    minWidth: 79,
    minHeight: 270,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 15,
  },
  drop_box: {
    alignItems: 'center',
    rowGap: 8,
  },
  icon: {
    width: 25,
    height: 25,
    objectFit: 'contain',
  },
  text: {
    fontFamily: 'poppins-regular',
    fontSize: 10,
    color: Colors.profile_drop_text_color,
  },
});
