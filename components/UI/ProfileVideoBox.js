import { useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

function ProfileVideoBox({ image, blurEffect }) {
  useEffect(() => {
    if (blurEffect === false) {
      if (blur === true)
        setTimeout(() => {
          setBlur(true);
        }, 100);
    }
  }, []);

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <Image source={image} style={styles.image} />
      <LinearGradient colors={[Colors.background_opacity_40_color, Colors.background_opacity_0_color]} style={[styles.dark_overlay]}>
      <Image source={require('../../assets/gallery_views.png')} style={styles.views_icon} />
        <View style={styles.play_button}>
          <Ionicons name="caret-forward-outline" color={Colors.white} size={18} style={{zIndex: 1, marginLeft: 3.2}}/>
          {blurEffect === true && (
            <View style={styles.blur}>
              <BlurView intensity={20} tint="light" style={styles.blur} />
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default ProfileVideoBox;

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 120,
    borderRadius: 22,
    position: 'relative',
    backgroundColor: Colors.background_color,
    overflow: 'hidden',
    marginBottom: 8
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dark_overlay: {
    width: 110,
    height: 120,
    borderRadius: 22,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  play_button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.white,
    backgroundColor: Colors.white_opacity_47,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  views_icon:{
    position: 'absolute',
    width: 50,
    height: 30, 
    objectFit: 'contain', 
    top: 0,
    right: 8,
  }
});
