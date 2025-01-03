import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import BlueAttendeeIcon from '../../assets/blue-attendee.svg';
import RedAttendeeIcon from '../../assets/red-attendee.svg';
import GreenAttendeeIcon from '../../assets/green-attendee.svg';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
function GalleryLayout({ images }) {
  const navigation = useNavigation()
  function navigateToHandler(data){
    navigation.navigate('PhotoCloseScreen', {
      userIcon: data.icon,
      image: data.image
    })
  }

  return (
    <>
      {images[0] && (
        <View style={[styles.first_row, styles.row]}>
          <TouchableOpacity style={styles.first_row_left} onPress={navigateToHandler.bind(this, {image: images[0].profile_photo_close, icon: BlueAttendeeIcon})}>
            <SvgXml xml={BlueAttendeeIcon} width={42} height={42} style={{ position: 'absolute', zIndex: 1, right: 122 / 10, top: 0 }} />
            {/* <Image source={{ uri: event_photo_gallery[iteration * 8 - 8].profile_photo }} style={{ width: '100%', height: '100%', borderRadius: windowWidth }} /> */}
            <Image source={images[0].profile_photo} style={{ width: '100%', height: '100%', borderRadius: windowWidth }} />
            <Image source={require('../../assets/gallery_views.png')} style={styles.views_icon} />
          </TouchableOpacity>
          {images[1] && (
            <TouchableOpacity style={styles.first_row_right} onPress={navigateToHandler.bind(this, {image: images[1].profile_photo_close, icon: RedAttendeeIcon})}>
              <SvgXml xml={RedAttendeeIcon} width={42} height={42} style={{ position: 'absolute', zIndex: 1, right: 150 / 10, top: 0 }} />
              <Image source={images[1].profile_photo} style={{ width: '100%', height: '100%', borderRadius: windowWidth }} />
              <Image source={require('../../assets/gallery_views.png')} style={styles.views_icon} />
            </TouchableOpacity>
          )}
        </View>
      )}
      {images[2] && (
        <View style={[styles.second_row, styles.row]}>
          <TouchableOpacity style={styles.second_row_left} onPress={navigateToHandler.bind(this,  {image: images[2].profile_photo_close, icon: GreenAttendeeIcon})}>
            <SvgXml xml={GreenAttendeeIcon} width={42} height={42} style={{ position: 'absolute', zIndex: 1, right: 100 / 10, top: -10 }} />
            <Image source={images[2].profile_photo} style={{ width: '100%', height: '100%', borderRadius: windowWidth }} />
            <Image source={require('../../assets/gallery_views.png')} style={{ width: 40, height: 30, objectFit: 'contain', position: 'relative', left: '30%', bottom: 4, zIndex: 2 }} />
          </TouchableOpacity>

          {images[3] && (
            <TouchableOpacity style={styles.second_row_right} onPress={navigateToHandler.bind(this,  {image: images[3].profile_photo_close, icon: BlueAttendeeIcon})}>
              <SvgXml xml={BlueAttendeeIcon} width={42} height={42} style={{ position: 'absolute', zIndex: 1, right: 116 / 10, top: 0 }} />
              <Image source={images[3].profile_photo} style={{ width: '100%', height: '100%', borderRadius: windowWidth }} />
              <Image source={require('../../assets/gallery_views.png')} style={styles.views_icon} />
            </TouchableOpacity>
          )}
        </View>
      )}
      {images[4] && (
        <View style={[styles.third_row, styles.row]}>
          <TouchableOpacity style={styles.third_row_left} onPress={navigateToHandler.bind(this,  {image: images[4].profile_photo_close, icon: RedAttendeeIcon})}>
            <SvgXml xml={RedAttendeeIcon} width={42} height={42} style={{ position: 'absolute', zIndex: 1, right: 122 / 10, top: 0 }} />
            <Image source={images[4].profile_photo} style={{ width: '100%', height: '100%', borderRadius: windowWidth }} />
            <Image source={require('../../assets/gallery_views.png')} style={styles.views_icon} />
          </TouchableOpacity>

          {images[5] && (
            <TouchableOpacity style={styles.third_row_right} onPress={navigateToHandler.bind(this, {image: images[5].profile_photo_close, icon: RedAttendeeIcon})}>
              <SvgXml xml={RedAttendeeIcon} width={42} height={42} style={{ position: 'absolute', zIndex: 1, right: 150 / 10, top: 0 }} />
              <Image source={images[5].profile_photo} style={{ width: '100%', height: '100%', borderRadius: windowWidth }} />
              <Image source={require('../../assets/gallery_views.png')} style={styles.views_icon} />
            </TouchableOpacity>
          )}
        </View>
      )}
      {images[6] && (
        <View style={[styles.fourth_row, styles.row]}>
          <TouchableOpacity style={styles.fourth_row_left} onPress={navigateToHandler.bind(this, {image: images[6].profile_photo_close, icon: GreenAttendeeIcon})}>
            <SvgXml xml={GreenAttendeeIcon} width={42} height={42} style={{ position: 'absolute', zIndex: 1, right: 122 / 10, top: 0 }} />
            <Image source={images[6].profile_photo} style={{ width: '100%', height: '100%', borderRadius: windowWidth }} />
            <Image source={require('../../assets/gallery_views.png')} style={styles.views_icon} />
          </TouchableOpacity>

          {images[7] && (
            <TouchableOpacity style={styles.fourth_row_right} onPress={navigateToHandler.bind(this, {image: images[7].profile_photo_close, icon: RedAttendeeIcon})}>
              <SvgXml xml={RedAttendeeIcon} width={42} height={42} style={{ position: 'absolute', zIndex: 1, right: 5, top: -8 }} />
              <Image source={images[7].profile_photo} style={{ width: '100%', height: '100%', borderRadius: windowWidth }} />
              <Image source={require('../../assets/gallery_views.png')} style={styles.views_icon} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );
}

export default GalleryLayout;

const styles = StyleSheet.create({
  views_icon: { 
    width: 40,
    height: 30, 
    objectFit: 'contain', 
    position: 'relative',
    left: '30%', 
    bottom: 4, 
    zIndex: 2 },
  row: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 30,
  },
  first_row: {
    height: windowWidth * 0.37,
    columnGap: 40,
    justifyContent: 'center',
  },
  first_row_left: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    alignSelf: 'flex-end',
  },
  first_row_right: {
    width: windowWidth * 0.35,
    height: windowWidth * 0.35,
    alignSelf: 'flex-start',
  },
  second_row: {
    height: windowWidth * 0.29,
    columnGap: 22,
    marginTop: 20,
  },
  second_row_left: {
    width: windowWidth * 0.24,
    height: windowWidth * 0.24,
    alignSelf: 'flex-end',
  },
  second_row_right: {
    width: windowWidth * 0.28,
    height: windowWidth * 0.28,
    alignSelf: 'flex-start',
  },
  third_row: {
    height: 193,
    columnGap: 55,
    marginTop: -10,
    justifyContent: 'flex-end',
  },
  third_row_left: {
    width: windowWidth * 0.38,
    height: windowWidth * 0.38,
    alignSelf: 'flex-end',
  },
  third_row_right: {
    width: windowWidth * 0.32,
    height: windowWidth * 0.32,
    alignSelf: 'flex-start',
    right: 0,
  },
  fourth_row: {
    height: 200,
    columnGap: 30,
    marginTop: -20,
    justifyContent: 'center',
  },
  fourth_row_left: {
    width: windowWidth * 0.32,
    height: windowWidth * 0.32,
    alignSelf: 'flex-end',
  },
  fourth_row_right: {
    width: windowWidth * 0.24,
    height: windowWidth * 0.24,
    alignSelf: 'flex-start',
    right: 0,
  },
});
