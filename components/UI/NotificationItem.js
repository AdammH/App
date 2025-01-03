import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Colors from '../../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

function NotificationItem({ user_icon, user, message_text }) {
  return (
    <TouchableOpacity style={{ flex: 1, height: 100, justifyContent: 'center', alignItems: 'center',   marginHorizontal: 10 }}>
      <LinearGradient style={styles.container} colors={[Colors.light_notification_grad_green, Colors.dark_notification_grad_green]} start={[0.4,0]}>
        <View style={styles.icon}>
          <SvgXml xml={user_icon} width={42} height={42} />
        </View>
        <View style={styles.info_container}>
          <Text style={styles.name_text}>{user}</Text>
          <Text style={styles.message_text}>{message_text}</Text>
        </View>
        <View style={styles.box}>
          <Ionicons name='arrow-forward-outline' color={Colors.qr_code_border_color} size={25}/>
        </View>
      </LinearGradient>
      <View style={styles.drop_shadow}></View>
    </TouchableOpacity>
  );
}

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 79,
    padding: 16,
    borderRadius: 24,
    borderWidth: 2,
    justifyContent: 'space-between',
    borderColor: Colors.notification_item_border,
    position: 'absolute',
  
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
    rowGap: 4,
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
  box: {
    width: 40,
    height: 40,
    borderWidth: 1.2,
    borderColor: Colors.box_stroke_color,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
