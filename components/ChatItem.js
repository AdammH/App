import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Colors from '../constants/colors';

function ChatItem({ itemData }) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.icon}>
        {itemData.status === 'online' ? <View style={styles.online_dot}></View> : null}
        <SvgXml xml={itemData.user_icon} width={42} height={42} />
      </View>
      <View style={styles.info_container}>
        <Text style={styles.name_text}>{itemData.user}</Text>
        <Text style={styles.message_text}>{itemData.last_message}</Text>
      </View>
      <View style={styles.time_box}>
        <Text style={styles.message_text}>{itemData.last_message_time}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default ChatItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 74,
    marginBottom: 16,
    padding: 16,
    borderRadius: 24,
    borderWidth: 2,
    justifyContent: 'space-between',
    borderColor: Colors.chat_item_border,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  icon: {
    flex: 1,
    position: 'relative',
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
  time_box: {
    flex: 1,
    alignItems: 'flex-end',
  },
  online_dot: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.online_dot_color,
    borderWidth: 1.2,
    borderColor: Colors.online_dot_stoke_color,
    zIndex: 1,
    left: -2,
    top: -2
  },
});
