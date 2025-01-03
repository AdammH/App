import { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { users_notifications } from '../../DUMMY_CHAT_DATA/DUMMY_CHAT_DATA';
import Colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { SvgXml } from 'react-native-svg';
import FilterIcon from '../../assets/filter-icon-gray.svg';
import SmallRoundedButton from '../../components/UI/buttons/SmallRoundedButton';
import RoundedSelectUnderlineActive from '../../components/UI/RoundedSelectUnderlineActive';
import DropDownOptionsBox from '../../components/UI/DropDownOptionsBox';
import GradientBackground from '../../components/UI/GradientBackground';
import Timer from '../../components/UI/Timer';
import PartyAttendeeItem from '../../components/UI/PartyAttendee';
import SearchInput from '../../components/UI/inputs/SearchInput';

function AsCreatorScreen({ navigation }) {
  const [active, setActive] = useState({
    photos: {
      show: true,
    },
    people: {
      show: false,
    },
  });

  function activeSelectHandler(identifier) {
    setActive((current) => {
      return {
        ...current,
        photos: { show: identifier === 'photos' ? true : false },
        people: { show: identifier === 'people' ? true : false },
      };
    });
  }
  function goBackHandler() {
    navigation.goBack();
  }

  function peopleListHandler(itemData, index) {
    if (itemData) {
      return <PartyAttendeeItem itemData={itemData} />;
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <SmallRoundedButton onPress={goBackHandler} lightStyle={false}>
          <Ionicons name="chevron-back-outline" size={20} color={Colors.text_color} />
        </SmallRoundedButton>
        <RoundedSelectUnderlineActive>
          <Pressable style={[styles.select_text_box]} onPress={activeSelectHandler.bind(this, 'photos')}>
            <Text style={[styles.select_text, active.photos.show === true ? styles.active_text : null]}>Photos</Text>
            {active.photos.show === true ? <View style={styles.underline}></View> : null}
          </Pressable>
          <Pressable style={[styles.select_text_box]} onPress={activeSelectHandler.bind(this, 'people')}>
            <Text style={[styles.select_text, active.people.show === true ? styles.active_text : null]}>People</Text>
            {active.people.show === true ? <View style={styles.underline}></View> : null}
          </Pressable>
        </RoundedSelectUnderlineActive>
        <DropDownOptionsBox />
      </View>
      <Timer style={{  flex: 1, opacity: active.photos.show === true ? 1 : 0, position: active.photos.show === true ? 'relative' : 'absolute'}} />
      <View
        style={{
          flex: active.photos.show === true ? 0 : 1,
          opacity: active.photos.show === true ? 0 : 1,
          height: active.photos.show === true ? 0 : '100%',
          position: active.photos.show === true ? 'absolute' : 'relative',
        }}
      >
        <View style={{ position: 'relative', top: -165, alignItems: 'center', alignSelf: 'center', height: 195 }}>
          <Image source={require('../../assets/character_angela.png')} style={[styles.character_image, { height: 255 }]} />
          <Text style={styles.character_name_text}>Angela</Text>
        </View>
        <GradientBackground blur={false} style={{ flex: 1, width: '100%' }}>
          {!users_notifications && (
            <View style={styles.activity_container}>
              <ActivityIndicator size="large" color={Colors.aqua_green} />
            </View>
          )}
          {users_notifications && (
            <View style={{ width: '100%', height: 650 }}>
              <View style={styles.flashlist_top}>
                <View style={{ flex: 1 }}>
                  <SmallRoundedButton onPress={null} lightStyle={false}>
                    <SvgXml width={20} height={20} xml={FilterIcon} />
                  </SmallRoundedButton>
                </View>
                <View style={{ flex: 5 }}>
                  <SearchInput wide={true} />
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={styles.attendee_amount_text}>{users_notifications.length}</Text>
                </View>
              </View>
              <FlashList
                data={users_notifications}
                nestedScrollEnabled={true}
                renderItem={({ item, index }) => peopleListHandler(item, index)}
                estimatedItemSize={200}
                ListFooterComponent={<View style={styles.bottom} />}
              />
            </View>
          )}
        </GradientBackground>
      </View>
    </ScrollView>
  );
}

export default AsCreatorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background_color,
    position: 'relative',
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'relative',
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 20,
    zIndex: 1,
  },
  select_text_box: {
    height: '100%',
    position: 'relative',
    justifyContent: 'center',
  },
  select_text: {
    fontFamily: 'poppins-medium',
    fontSize: 15,
    color: Colors.gray_text_color,
    marginHorizontal: 10,
  },
  active_text: {
    color: Colors.light_green,
  },
  underline: {
    width: '100%',
    height: 2,
    borderRadius: 1,
    backgroundColor: Colors.light_green,
    position: 'absolute',
    bottom: 0,
  },
  character_image: {
    alignSelf: 'center',
    objectFit: 'contain',
    marginBottom: 12,
  },
  character_name_text: {
    fontFamily: 'poppins-medium',
    fontSize: 22,
    color: Colors.text_color,
  },
  flashlist_top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 15,
  },
  bottom: {
    height: 78,
  },
  attendee_amount_text: {
    fontFamily: 'poppins-medium',
    fontSize: 18,
    color: Colors.chevron_back_gray_color,
  },
});
