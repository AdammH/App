import { StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/colors';

function DropDownOptionsBox(){
  return (
    <LinearGradient style={styles.container} colors={[Colors.light_item_grad_green, Colors.dark_item_grad_green]} start={[0.4, 0]}>
       <Image source={require('../../assets/icons/settings.png')} style={styles.icon} />
       <Image source={require('../../assets/icons/qr_code.png')} style={styles.icon} />
       <Image source={require('../../assets/icons/photo_options.png')} style={styles.icon} />
       <Image source={require('../../assets/icons/clock.png')} style={styles.icon} />
    </LinearGradient>
  )
}

export default DropDownOptionsBox;

const styles = StyleSheet.create({
  container:{
    width: 70,
    height: 257,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 30,
    
  },
  icon:{
    width: 32,
    height: 32,
    objectFit: 'contain'
  }
})