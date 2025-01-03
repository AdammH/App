import { useState} from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import Colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { users_notifications } from '../../DUMMY_CHAT_DATA/DUMMY_CHAT_DATA';
import SearchInput from '../../components/UI/inputs/SearchInput';
import SmallRoundedButton from '../../components/UI/buttons/SmallRoundedButton';
import GradientBackground from '../../components/UI/GradientBackground';
import PrimaryButton from '../../components/UI/buttons/PrimaryButton';
import NotificationItem from '../../components/UI/NotificationItem';


function NotificationScreen({ navigation }) {
  const [filterNotification, setFilterNotification] = useState('notifications_message');

  function notificationListHandler(itemData, index) {
    if (itemData) {
      return <NotificationItem user_icon={itemData.user_icon} user={itemData.user} message_text={itemData[filterNotification]} />;
    }
  }

  function notificationsHandler(identifier, value) {
    shuffle();
    setFilterNotification(identifier);
  }

  function goBackHandler() {
    navigation.goBack();
  }

  /*  potom dat prec tuto cast  */

  function shuffle() {
    users_notifications.sort(() => Math.random() - 0.8);
  }
  


  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', rowGap: 20, marginVertical: 20 }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={goBackHandler} style={styles.icon_container}>
              <Ionicons name="chevron-back-outline" color={Colors.chevron_back_gray_color} size={30} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', columnGap: 12 }}>
              <SearchInput />
              <SmallRoundedButton
                onPress={() => {
                  console.log('click');
                }}
                lightStyle={false}
              >
                <Ionicons name="notifications-outline" size={20} color={Colors.icon_gray_color} />
              </SmallRoundedButton>
            </View>
          </View>
          <View style={styles.date_toggle_wrap}>
            {filterNotification === 'notifications_message' ? (
              <View style={styles.date_toggle_touchable_btn}>
                <PrimaryButton text="Notifications" sizeBtnStyle={{ width: '100%', height: '100%' }} />
              </View>
            ) : (
              <TouchableOpacity onPress={notificationsHandler.bind(this, 'notifications_message')} style={styles.date_toggle_touchable_btn}>
                <Text style={styles.date_toggle_text}>Notifications</Text>
              </TouchableOpacity>
            )}
            {filterNotification === 'invites_message' ? (
              <View style={styles.date_toggle_touchable_btn}>
                <PrimaryButton text="Invites" sizeBtnStyle={{ width: '100%', height: '100%' }} />
              </View>
            ) : (
              <TouchableOpacity onPress={notificationsHandler.bind(this, 'invites_message')} style={styles.date_toggle_touchable_btn}>
                <Text style={styles.date_toggle_text}>Invites</Text>
              </TouchableOpacity>
            )}
            {filterNotification === 'joiners_message' ? (
              <View style={styles.date_toggle_touchable_btn}>
                <PrimaryButton text="Joiners" sizeBtnStyle={{ width: '100%', height: '100%' }} />
              </View>
            ) : (
              <TouchableOpacity onPress={notificationsHandler.bind(this, 'joiners_message')} style={styles.date_toggle_touchable_btn}>
                <Text style={styles.date_toggle_text}>Joiners</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>

      <GradientBackground blur={false} style={{ flex: 1, width: '100%' }}>
        {!users_notifications && (
          <View style={styles.activity_container}>
            <ActivityIndicator size="large" color={Colors.aqua_green} />
          </View>
        )}
        {users_notifications && (
          <>
            <FlashList data={users_notifications} renderItem={({ item, index }) => notificationListHandler(item, index)} estimatedItemSize={200}  ListFooterComponent={<View style={styles.bottom}/>}/>
          </>
        )}
      </GradientBackground>
    </View>
  );
}

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: Colors.background_color,
  },

  activity_container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background_color,
    alignItems: 'center',
  },
  bottom: {
    height: 88,
  },
  header_text: {
    color: 'white',

    fontFamily: 'poppins-medium',
    flex: 4,
    marginRight: 25,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    width: '100%',
  },
  round_btn_position: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  date_toggle_wrap: {
    height: 72,
    width: '95%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border_event_date_toggle,
    alignSelf: 'center',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  date_toggle_text: {
    fontSize: 16,
    fontFamily: 'poppins-regular',
    color: Colors.gray_color,
  },
  date_toggle_touchable_btn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
