import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Animated, StyleSheet, ActivityIndicator, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import Colors from '../../constants/colors';
import { useGetAllEventsQuery } from '../../redux/features/apiSlice';
import SearchInput from '../../components/UI/inputs/SearchInput';
import EventItem from '../../components/EventItem';
import GradientBackground from '../../components/UI/GradientBackground';
import PrimaryButton from '../../components/UI/buttons/PrimaryButton';
import { setVisibilityElement, fadeInFadeOutVisibilityElement } from '../../functions/animationFunctions';

function PartyScreen({ navigation }) {
  const {data, error, isLoading} = useGetAllEventsQuery('')
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [historyEvents, setHistoryEvents] = useState([])
  const [filterEvents, setFilterEvents] = useState({
    upcoming: {
      show: true,
    },
    history: {
      show: false,
    },
  });



  const visibilityAnim = useRef(new Animated.Value(22)).current;
  const visibilityAnimIN = useRef(new Animated.Value(0)).current;

  function visibilityHeaderTextHandler(wideInput) {
    setVisibilityElement(visibilityAnim, wideInput === false ? 1 : 22);
  }

  const animationStyle = {
    fontSize: visibilityAnim,
    opacity: visibilityAnim.interpolate({
      inputRange: [1, 22],
      outputRange: [0, 1],
    }),
  };

  const animationOpacityStyle = {
    opacity: visibilityAnimIN
  };

  useEffect(() => {
    const currentDate2 = new Date('2023-12-31');
    let upcomingEvents = data.map((event) => {
      if (new Date(event.date_start) >= currentDate2) {
        return event;
      }
    });
    let historyEvents = data.map((event) => {
      if (new Date(event.date_start) <= currentDate2) {
        return event;
      }
    })
    setUpcomingEvents(upcomingEvents)
    setHistoryEvents(historyEvents)
    if(data){
      fadeInFadeOutVisibilityElement(visibilityAnimIN);
    }
  }, [isLoading])



  function formatDateWithSuffix(date) {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    // Funkcia pre získanie poradia dňa s príponou
    function getDayWithSuffix(day) {
      if (day >= 11 && day <= 13) {
        return day + 'th';
      }
      switch (day % 10) {
        case 1:
          return day + 'st';
        case 2:
          return day + 'nd';
        case 3:
          return day + 'rd';
        default:
          return day + 'th';
      }
    }

    const formattedDate = `${getDayWithSuffix(day)} ${month} ${year}`;
    return formattedDate;
  }

  const currentDate = new Date();
  const formattedDate = formatDateWithSuffix(currentDate);

  function eventListHandler(itemData, index) {
    if (itemData) {
      const eventDate = new Date(itemData.date_start).toLocaleString('default', { weekday: 'short' }).split(',');
      return (
        <EventItem
          type={itemData.type}
          status={itemData.status}
          attendanceNumber={itemData.attendees.length}
          mapNavigation={false}
          eventDate={eventDate}
          partyHopButton={navigateToDescription.bind(this, 'AsCreatorScreen')}
          key={index}
        />
      );
    }
  }

  function navigateToDescription(destination) {
    navigation.navigate(destination);
  }

  function dateEventHandler() {
    setFilterEvents((current) => {
      return {
        ...current,
        history: { show: !current.history.show },
        upcoming: { show: !current.upcoming.show },
      };
    });
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', rowGap: 20, marginVertical: 20 }}>
          <View style={styles.header}>
            <View style={{ flex: 1 }}></View>
            <Animated.Text style={[styles.header_text, animationStyle]}>{formattedDate}</Animated.Text>
            <SearchInput headerFunction={visibilityHeaderTextHandler} />
          </View>
          <View style={styles.date_toggle_wrap}>
            {filterEvents.upcoming.show === true ? (
              <View style={styles.date_toggle_touchable_btn}>
                <PrimaryButton text="Upcoming" sizeBtnStyle={{ width: '100%', height: '100%' }} />
              </View>
            ) : (
              <TouchableOpacity onPress={dateEventHandler} style={styles.date_toggle_touchable_btn}>
                <Text style={styles.date_toggle_text}>Upcoming</Text>
              </TouchableOpacity>
            )}
            {filterEvents.history.show === true ? (
              <View style={styles.date_toggle_touchable_btn}>
                <PrimaryButton text="History" sizeBtnStyle={{ width: '100%', height: '100%' }} />
              </View>
            ) : (
              <TouchableOpacity onPress={dateEventHandler} style={styles.date_toggle_touchable_btn}>
                <Text style={styles.date_toggle_text}>History</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>

      <GradientBackground blur={false} style={{ flex: 1, width: '100%' }}>
        {isLoading && (
          <View style={styles.activity_container}>
            <ActivityIndicator size="large" color={Colors.aqua_green} />
          </View>
        )}
        {data && (
          <Animated.View style={[{flex: 1}, animationOpacityStyle]}>
            <View
              style={{
                position: 'absolute',
                flex: 1,
                width: '100%',
                minHeight: 5,
                height: '100%',
                top: 32,
                left: 0,
                zIndex: filterEvents.upcoming.show === true ? 1 : -1,
                opacity: filterEvents.upcoming.show === true ? 1 : 0,
              }}
            >
              <FlashList data={upcomingEvents}  keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) => eventListHandler(item, index)} estimatedItemSize={15} ListFooterComponent={<View style={styles.bottom} />} />
            </View>
            <View
              style={{
                position: 'absolute',
                flex: 1,
                width: '100%',
                minHeight: 5,
                height: '100%',
                top: 32,
                left: 0,
                zIndex: filterEvents.history.show === true ? 1 : -1,
                opacity: filterEvents.history.show === true ? 1 : 0,
              }}
            >
              <FlashList  data={historyEvents}  keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) => eventListHandler(item, index)}  estimatedItemSize={15} ListFooterComponent={<View style={styles.bottom} />} />
            </View>
          </Animated.View>
        )}
      </GradientBackground>
    </View>
  );
}

export default PartyScreen;

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
    height: 100
  },
  header_text: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'poppins-medium',
    flex: 4,
    marginRight: 25,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
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
