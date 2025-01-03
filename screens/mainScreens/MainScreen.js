import { useCallback, useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions, Platform, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import MapViewComponent from '../../components/MapViewComponent';
import SearchInput from '../../components/UI/inputs/SearchInput';
import { SvgXml } from 'react-native-svg';
import FilterIcon from '../../assets/filter-icon.svg';
import UserAvatarIcon from '../../assets/user-avatar-icon.svg';
import Colors from '../../constants/colors';
import GradientBackground from '../../components/UI/GradientBackground';
import EventItem from '../../components/EventItem';
import { FlashList } from '@shopify/flash-list';
import { markers } from '../../mapStyleSettings/DUMMY_DATA';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../../redux/features/eventsSlice';
import { fadeInFadeOutVisibilityElement } from '../../functions/animationFunctions';
import { useGetAllEventsQuery } from '../../redux/features/apiSlice';

function MainScreen({ navigation }) {
  const [showFullMap, setShowFullMap] = useState(false);
  const [showGoUpButton, setShowGoUpButton] = useState(false);
  const [goUpButtonPressed, setGoUpButtonPressed] = useState(false);
  const [goToLocation, setGoToLocation] = useState(null);
  const windowHeight = Dimensions.get('window').height;

  const { data, error, isLoading } = useGetAllEventsQuery('');

  const visibilityAnimIN = useRef(new Animated.Value(0)).current;

  const animationOpacityStyle = {
    opacity: visibilityAnimIN,
  };
  if (data) {
    fadeInFadeOutVisibilityElement(visibilityAnimIN);
  }

  function goToLocationHandler(location) {
    if (location) {
      setGoToLocation(location);
    }
    if (Platform.OS === 'android') {
      if (goUpButtonPressed === false) {
        setShowFullMap(true);
        setTimeout(() => {
          setShowGoUpButton(true);
        }, 200);
      }
      setGoUpButtonPressed(false);
    } else {
      setShowFullMap(true);
      setTimeout(() => {
        setShowGoUpButton(true);
      }, 200);
    }
  }

  const eventListHandler = useCallback(
    (itemData, index) => {
      return (
        <EventItem
          type={itemData.type}
          status={itemData.status}
          attendanceNumber={itemData.attendees.length}
          mapNavigation={true}
          onPress={goToLocationHandler.bind(this, markers[index] && markers[index].latlng)}
          partyHopButton={navigateToDestination.bind(this, 'DescriptionScreen')}
        />
      );
    },
    [data]
  );

  function navigateToDestination(destination) {
    navigation.navigate(destination);
  }

  return (
    <View style={styles.container}>
       <MapViewComponent
        goToLocation={goToLocation}
        onPress={goToLocationHandler}
        gpsHeight={showFullMap === false ? windowHeight * 0.55 + 10 : windowHeight * 0.14}
        setShowFullMap={setShowFullMap}
        setShowGoUpButton={setShowGoUpButton}
        showGoUpButton={showGoUpButton}
        setGoUpButtonPressed={Platform.OS==='android' ? setGoUpButtonPressed : null}
      />
      <View style={styles.header}>
        <SearchInput />
        <View style={styles.right_side_header}>
          <TouchableOpacity style={[styles.roundedButton]} onPress={navigateToDestination.bind(this, 'NotificationScreen')}>
            <LinearGradient style={[styles.roundedButton]} colors={[Colors.light_round_btn_green, Colors.dark_round_btn_green]} start={[0, 0]}>
              <Ionicons name="mail-open-outline" size={20} color={Colors.text_color} />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.avatar]} onPress={navigateToDestination.bind(this, 'FirstProfileScreen')}>
            <SvgXml xml={UserAvatarIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <GradientBackground
        blur={Platform.OS === 'android' ? false : true}
        showFullMapState={showFullMap}
        style={{ flex: 1, position: 'absolute', bottom: 0, left: 0, width: '100%', height: windowHeight * 0.55 }}
      >
        {isLoading && (
          <View style={styles.activity_container}>
            <ActivityIndicator size="large" color={Colors.aqua_green} />
          </View>
        )}
        {data && (
          <Animated.View style={[{ flex: 1 }, animationOpacityStyle]}>
            <View style={[styles.filter, styles.roundedButton]}>
              <SvgXml xml={FilterIcon} />
            </View>
            <FlashList data={data} renderItem={({ item, index }) => eventListHandler(item, index)} estimatedItemSize={15} ListFooterComponent={<View style={styles.bottom} />} />
          </Animated.View>
        )}
        {error && (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: Colors.aqua_green }}>Sorry, something went wrong!</Text>
          </View>
        )}
      </GradientBackground>
    </View>
  );
}

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  right_side_header: {
    flexDirection: 'row',
    columnGap: 20,
    alignItems: 'center',
  },
  activity_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    height: 78,
  },
  roundedButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnAbsolute: {
    position: 'absolute',
  },

  filter: {
    backgroundColor: Colors.light_opacity_green,
    borderColor: Colors.light_green,
    borderWidth: 1,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
