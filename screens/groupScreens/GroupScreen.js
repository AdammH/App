import { useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, ActivityIndicator, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import GradientBackground from '../../components/UI/GradientBackground';
import GroupItem from '../../components/GroupItem';
import SearchInput from '../../components/UI/inputs/SearchInput';
import { FlashList } from '@shopify/flash-list';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgXml } from 'react-native-svg';
import GroupIcon from '../../assets/tabBarIcons/people_icon.svg';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import { event_photo_groups } from '../../constants/DUMMY/DUMMY_PHOTO';
import { fetchGroups } from '../../redux/features/groupsSlice';
import { fadeInFadeOutVisibilityElement } from '../../functions/animationFunctions';
import { useGetAllGroupsQuery } from '../../redux/features/apiSlice';

function GroupScreen() {
  const visibilityAnimIN = useRef(new Animated.Value(0)).current;
  const animationOpacityStyle = {
    opacity: visibilityAnimIN,
  };
  const { data, error, isLoading } = useGetAllGroupsQuery('');

  fadeInFadeOutVisibilityElement(visibilityAnimIN);

  function groupListHandler(itemData, index) {
    if (itemData) {
      return <GroupItem name={itemData.name} image={itemData.profile_photo} status={itemData.is_open} type={itemData.type} />;
    }
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', rowGap: 20, marginVertical: 20 }}>
          <View style={styles.options_wrap}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity style={styles.roundedButton}>
                <LinearGradient style={styles.roundedButton} colors={[Colors.light_round_btn_green, Colors.dark_round_btn_green]} start={[0, 0]}>
                  <Ionicons name="add-circle-outline" size={20} color={Colors.icon_gray_color} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 3 }}>
              <SearchInput wide={true} />
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <TouchableOpacity style={styles.roundedButton}>
                <LinearGradient style={styles.roundedButton} colors={[Colors.light_round_btn_green, Colors.dark_round_btn_green]} start={[0, 0]}>
                  <SvgXml xml={GroupIcon} width={20} height={20} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <GradientBackground blur={false} style={{ flex: 1, width: '100%', height: '65%' }}>
        {isLoading && (
          <View style={styles.activity_container}>
            <ActivityIndicator size="large" color={Colors.aqua_green} />
          </View>
        )}
        {data && (
          <Animated.View style={[{ flex: 1 }, animationOpacityStyle]}>
            <FlashList data={event_photo_groups} renderItem={({ item, index }) => groupListHandler(item, index)} estimatedItemSize={20} ListFooterComponent={<View style={styles.bottom} />} />
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

export default GroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: Colors.background_color,
  },
  bottom: {
    height: 78,
  },
  options_wrap: {
    height: 72,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  activity_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundedButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
