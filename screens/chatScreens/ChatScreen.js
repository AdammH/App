import { View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState } from 'react';
import SearchInput from '../../components/UI/inputs/SearchInput';
import GradientBackground from '../../components/UI/GradientBackground';
import RectangleButton from '../../components/UI/buttons/RectangleButton';
import PrimaryButton from '../../components/UI/buttons/PrimaryButton';
import ChatItem from '../../components/ChatItem';
import { FlashList } from '@shopify/flash-list';
import { users_chat } from '../../DUMMY_CHAT_DATA/DUMMY_CHAT_DATA';
import Colors from '../../constants/colors';
import ChatPersonIcon from '../../assets/chat-person-icon.svg';
import ChatPeopleIcon from '../../assets/people_icon.svg';
import ChatFriendsIcon from '../../assets/profile-user-icon2.svg';
import AddChatIcon from '../../assets/add-chat-icon.svg';
import { SvgXml } from 'react-native-svg';

function ChatScreen({navigation}) {
  const [chatOption, setChatOption] = useState('friends');

  function chatListHandler(itemData, index) {
    if (itemData) {
      return <ChatItem itemData={itemData} />;
    }
  }

  function navigationHandler() {
    navigation.navigate('AddFriendScreen');
  }
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', rowGap: 20, marginVertical: 20 }}>
          <View style={styles.header}>
            <SearchInput />
          </View>
          <View style={styles.options_wrapp}>
            <RectangleButton style={{ width: 66, height: 66, borderRadius: 20 }}>
              {chatOption === 'users' ? (
                <PrimaryButton sizeBtnStyle={{ width: 44, height: 44 }}>
                  <SvgXml xml={ChatPersonIcon} />
                </PrimaryButton>
              ) : (
                <TouchableOpacity onPress={() => setChatOption('users')} style={{ opacity: 0.5, width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
                  <SvgXml xml={ChatPersonIcon} />
                </TouchableOpacity>
              )}
            </RectangleButton>
            <RectangleButton style={{ width: 141, height: 66, borderRadius: 20 }}>
              {chatOption === 'friends' ? (
                <PrimaryButton sizeBtnStyle={{ width: 44, height: 44 }}>
                  <SvgXml xml={ChatFriendsIcon} />
                </PrimaryButton>
              ) : (
                <TouchableOpacity onPress={() => setChatOption('friends')} style={{ opacity: 0.5, width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
                  <SvgXml xml={ChatFriendsIcon} />
                </TouchableOpacity>
              )}
              <View style={{ width: 20 }}></View>
              {chatOption === 'group' ? (
                <PrimaryButton sizeBtnStyle={{ width: 44, height: 44 }}>
                  <SvgXml xml={ChatPeopleIcon} />
                </PrimaryButton>
              ) : (
                <TouchableOpacity onPress={() => setChatOption('group')} style={{ opacity: 0.5, width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
                  <SvgXml xml={ChatPeopleIcon} />
                </TouchableOpacity>
              )}
            </RectangleButton>
            <RectangleButton style={{ width: 66, height: 66, borderRadius: 20 }}>
              <TouchableOpacity onPress={navigationHandler} style={{ opacity: 0.5, width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
                <SvgXml xml={AddChatIcon} />
              </TouchableOpacity>
            </RectangleButton>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <GradientBackground blur={false} style={{ flex: 1, width: '100%', height: '65%' }}>
        {!users_chat && (
          <View style={styles.activity_container}>
            <ActivityIndicator size="large" color={Colors.aqua_green} />
          </View>
        )}
        {users_chat && (
          <>
            <FlashList data={users_chat} renderItem={({ item, index }) => chatListHandler(item, index)} estimatedItemSize={200} ListFooterComponent={<View style={styles.bottom} />} />
          </>
        )}
      </GradientBackground>
    </View>
  );
}

export default ChatScreen;

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
    height: 78,
  },
  header_text: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'poppins-medium',
    flex: 3,
    marginRight: 25,
  },
  header: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
  },
  round_btn_position: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  options_wrapp: {
    height: 72,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingHorizontal: 10,
  },
  date_toolgle_text: {
    fontSize: 16,
    fontFamily: 'poppins-regular',
    color: Colors.gray_color,
  },
  date_toogle_touchable_btn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
