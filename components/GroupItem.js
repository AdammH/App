import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import GroupImage from '../assets/groups/skaters.jpg';
import { SvgXml } from 'react-native-svg';
import Colors from '../constants/colors';
import PrivateEventIcon from '../assets/private-event.svg';
import PublicEventIcon from '../assets/public-event.svg';
import RectangleButton from './UI/buttons/RectangleButton';

function GroupItem({ name, image, status, type }) {
  return (
    <TouchableOpacity style={styles.container}>
      <LinearGradient style={styles.container} colors={[Colors.light_group_item_grad, Colors.dark_group_item_grad]}>
        <View style={styles.image_container}>{image ? <Image source={image} style={styles.image} /> : <Ionicons name="camera-outline" color={Colors.gray_color} size={30} />}</View>
        <View style={styles.info_row}>
          <RectangleButton style={{ width: 42, height: 42, borderRadius: 14 }} colorVariant="light">
            {status === false && <SvgXml xml={PrivateEventIcon} width={24} height={24} />}
            {status === true && <SvgXml xml={PublicEventIcon} width={24} height={24} />}
          </RectangleButton>
          <Text style={styles.group_name}>{name}</Text>
          <RectangleButton style={{ width: 42, height: 42, borderRadius: 14 }} colorVariant="light">
            {type.includes('Social') && <Ionicons name="share-social-outline" size={24} color={Colors.group_type_icon_color}/>}
            {type.includes('Sport') && <Ionicons name="football-outline" size={24} color={Colors.group_type_icon_color}/>}
            {type.includes('Movies') && <Ionicons name="videocam-outline" size={24} color={Colors.group_type_icon_color}/>}
            {type.includes('Tech') && <Ionicons name="airplane-outline" size={24} color={Colors.group_type_icon_color}/>}
          </RectangleButton>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default GroupItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 220,
    padding: 12,
    borderRadius: 18,
    rowGap: 17,
    marginBottom: 20,
  },
  image_container: {
    width: '100%',
    height: 131,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.gray_color,
    borderWidth: 2,
    backgroundColor: Colors.light_opacity_green,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  group_name: {
    fontSize: 17,
    fontFamily: 'poppins-medium',
    color: Colors.grey_text_color,
  },
  info_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
