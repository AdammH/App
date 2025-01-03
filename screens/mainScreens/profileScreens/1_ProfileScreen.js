import { useCallback, useRef, useState } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, ScrollView, Animated } from 'react-native';
import Colors from '../../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { fadeInFadeOutVisibilityElement } from '../../../functions/animationFunctions';
import SmallRoundedButton from '../../../components/UI/buttons/SmallRoundedButton';
import ProfileDropDownOptionsBox from '../../../components/UI/ProfileDropDownOptionsBox';
import GradientBackground from '../../../components/UI/GradientBackground';
import RectangleButton from '../../../components/UI/buttons/RectangleButton';
import PrimaryButton from '../../../components/UI/buttons/PrimaryButton';
import ProfileVideoBox from '../../../components/UI/ProfileVideoBox';
import { useGetAllEventPhotosQuery } from '../../../redux/features/apiSlice';


function FirstProfileScreen({ navigation }) {
  /* const { data, error, isLoading } = useGetAllEventPhotosQuery(); */
  const [limit, setLimit] = useState(16);
  const [isLoaded, setIsLoaded] = useState(false);
  const { data, error, isLoading, isFetching } = useGetAllEventPhotosQuery({ limit });

  function goBackHandler() {
    navigation.goBack();
  }

  const loadMoreData = () => {
    if (data) {
      if (isLoaded) {
        setTimeout(() => {
          setLimit((current) => current + 16);
        }, 200);
       
      }
    }
  };

  if (data) {
    setTimeout(() => {
      setIsLoaded(true);
    }, 200);
  }

  const flashListItemFunction = useCallback((itemData, index) => {
    if (itemData) {
      return <ProfileVideoBox image={itemData.profile_photo} blurEffect={true} />;
    }
  });

  const visibilityAnimIN = useRef(new Animated.Value(0)).current;
  const animationOpacityStyle = {
    opacity: visibilityAnimIN,
  };
  if (data) {
    fadeInFadeOutVisibilityElement(visibilityAnimIN);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <SmallRoundedButton onPress={goBackHandler} lightStyle={false}>
          <Ionicons name="chevron-back-outline" size={20} color={Colors.text_color} />
        </SmallRoundedButton>
        <Text style={[styles.character_name_text, { flex: 4 }]}>Angela</Text>
        <SmallRoundedButton
          onPress={() => {
            console.log('click');
          }}
          lightStyle={false}
        >
          <Ionicons name="settings-outline" size={20} color={Colors.icon_gray_color} />
        </SmallRoundedButton>
      </View>

      <View style={{ position: 'relative', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', height: 255, marginTop: 24, marginBottom: 30, marginHorizontal: 10 }}>
        <View style={{ flex: 1 }}></View>
        <Image source={require('../../../assets/character_angela.png')} style={[styles.character_image, { height: 255 }]} />
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <ProfileDropDownOptionsBox />
        </View>
      </View>
      <View style={styles.follow_button_wrapper}>
        <RectangleButton style={{ width: '100%', height: 66, borderRadius: 20, flex:1 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', rowGap: 8 }}>
            <Text style={styles.button_wrapper_text_number}>50</Text>
            <Text style={styles.button_wrapper_text}>Partys</Text>
          </View>
        </RectangleButton>
       {/*  <PrimaryButton
          sizeBtnStyle={{ width: 141, height: 52, alignSelf: 'flex-start' }}
          onPress={() => {
            null;
          }}
          text="Follow"
        /> */}
        <RectangleButton style={{ width: '100%', height: 66, borderRadius: 20, flex:1 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', rowGap: 8 }}>
            <Text style={styles.button_wrapper_text_number}>100</Text>
            <Text style={styles.button_wrapper_text}>Followers</Text>
          </View>
        </RectangleButton>
      </View>
      <GradientBackground blur={false} style={{ flex: 1, width: '100%' }}>
        {isLoading && (
          <View style={styles.activity_container}>
            <ActivityIndicator size="large" color={Colors.aqua_green} />
          </View>
        )}
        {data && (
          <Animated.View style={[{ width: '100%', height: 650, marginHorizontal: 10 }, animationOpacityStyle]}>
            <FlashList
              onEndReached={loadMoreData}
              onEndReachedThreshold={0}
              nestedScrollEnabled={true}
              data={data}
              renderItem={({ item, index }) => flashListItemFunction(item, index)}
              estimatedItemSize={9}
              numColumns={3}
              ListFooterComponent={<View style={styles.bottom}></View>}
            />
          </Animated.View>
        )}
        {error && (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: Colors.aqua_green }}>Sorry, something went wrong!</Text>
          </View>
        )}
      </GradientBackground>
    </ScrollView>
  );
}

export default FirstProfileScreen;

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
  character_image: {
    alignSelf: 'center',
    objectFit: 'contain',
    marginBottom: 12,
    flex: 1,
  },
  character_name_text: {
    fontFamily: 'poppins-medium',
    fontSize: 22,
    color: Colors.text_color,
    marginLeft: 24,
  },
  follow_button_wrapper: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 34,
    columnGap: 16
  },
  button_wrapper_text_number: {
    fontFamily: 'poppins-regular',
    fontSize: 15,
    color: Colors.gray_text_color,
  },
  button_wrapper_text: {
    fontFamily: 'poppins-regular',
    fontSize: 12,
    color: Colors.gray_text_color,
  },
  flashlist_top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 15,
  },
  bottom: {
    height: 20,
  },
  attendee_amount_text: {
    fontFamily: 'poppins-medium',
    fontSize: 18,
    color: Colors.chevron_back_gray_color,
  },
  bottom: {
    height: 120,
  },
});
