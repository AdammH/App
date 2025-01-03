import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Colors from '../../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

function PartyAttendeeItem({ itemData }) {
  return (
    <TouchableOpacity style={{ flex: 1, height: 100, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 }}>
      <LinearGradient
        style={[styles.container, itemData.user_status !== 'attendee' ? null : { borderColor: Colors.notification_item_border, borderWidth: 2 }]}
        colors={[itemData.user_status === 'toastee' ? Colors.dark_green_grad : Colors.dark_notification_grad_green, Colors.dark_notification_grad_green]}
        start={[0.4, 0]}
      >
        <View style={styles.icon}>
          <SvgXml xml={itemData.user_icon} width={42} height={42} />
        </View>
        <View style={styles.info_container}>
          <Text style={styles.name_text}>{itemData.user}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', columnGap: 32 }}>
          {itemData.user_status === 'toastee' ? <Image source={require('../../assets/birthday.png')} style={styles.event_icon} /> : <View style={styles.event_icon}></View>}
          <View style={styles.circle}></View>
        </View>
      </LinearGradient>
      {itemData.user_status === 'toastee' ? (
        <LinearGradient
          style={{ height: 86, width: '102%', borderRadius: 25, borderWidth: 2, position: 'absolute', zIndex: 0 }}
          colors={[Colors.light_grad_party_attendee_active_border, Colors.dark_grad_party_attendee_active_border]}
          start={[0.4, 0]}
        />
      ) : null}

      
    </TouchableOpacity>
  );
}

export default PartyAttendeeItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 79,
    padding: 16,
    borderRadius: 24,
    justifyContent: 'space-between',
    position: 'absolute',
    alignItems: 'center',
    zIndex: 1,
  },
  drop_shadow: {
    width: '100%',
    height: 79,
    borderRadius: 24,
    backgroundColor: Colors.background_color,
    shadowColor: Colors.notification_item_drop_shadow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 8,
    position: 'absolute',
    zIndex: -1,
  },
  icon: {
    flex: 1,
  },
  info_container: {
    flex: 3,
    height: 60,
    justifyContent: 'center',
  },
  name_text: {
    fontSize: 16,
    fontFamily: 'poppins-medium',
    color: Colors.text_color,
  },
  message_text: {
    fontSize: 12,
    fontFamily: 'poppins-regular',
    color: Colors.darker_grey_text_color,
  },
  circle: {
    alignItems: 'flex-end',
    width: 28,
    height: 28,
    borderWidth: 1.2,
    borderColor: Colors.progress_light_green,
    borderRadius: 14,
    backgroundColor: Colors.party_circle_bg_color,
  },
  event_icon: {
    width: 30,
    height: 30,
    objectFit: 'contain',
  },
});
