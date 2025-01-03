import { useCallback, useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, Animated, ActivityIndicator, Text, Dimensions } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView, State } from 'react-native-gesture-handler';
import SearchInput from '../../components/UI/inputs/SearchInput';
import GalleryLayout from '../../components/Layouts/GalleryLayout';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgXml } from 'react-native-svg';
import FilterIcon from '../../assets/filter-icon-gray.svg';
import Colors from '../../constants/colors';
import { FlashList } from '@shopify/flash-list';
import { fadeInFadeOutVisibilityElement } from '../../functions/animationFunctions';
import {  useGetAllEventPhotosGalleryQuery } from '../../redux/features/apiSlice';

function GalleryScreen({navigation}) {
  const [limit, setLimit] = useState(2);
  const [isLoaded, setIsLoaded] = useState(false);
  const { data, error, isLoading, isFetching } = useGetAllEventPhotosGalleryQuery({ limit });
  const windowHeight = Dimensions.get('window').height;
  const flashListRef = useRef(null);
  const mainContainer = useRef(null);
  const visibilityAnimIN = useRef(new Animated.Value(0)).current;
  const animationOpacityStyle = {
    opacity: visibilityAnimIN,
  };
  if (data) {
    fadeInFadeOutVisibilityElement(visibilityAnimIN);
  }
  const loadMoreData = () => {
    if (data) {
      if (isLoaded) {
        setTimeout(() => {
          setLimit((current) => current + 2);
        }, 200);
       
      }
    }
  };

  if (data) {
    setTimeout(() => {
      setIsLoaded(true);
    }, 800);
  }


  /*   function scrollHandler(translation){
    setInterval(() => {
      flashListRef.current?.scrollToOffset({ offset: x + translation, animated: true });
      x += 5;
    }, 100);
    return () => clearInterval(intervalId);
  }

  scrollHandler()


    const handlePanGesture = event => {
      const { state, x, y, absoluteX, absoluteY, translationX, translationY } = event.nativeEvent;
      scrollHandler(translationY)
   
   mainContainer.current.measure((x, y, width, height, pageX, pageY) => {
      console.log(pageY)
    }) 
  } */

  const Galley = useCallback(
    (itemData, index) => {
      return (
        <Animated.View key={index} style={[{ flex: 5, width: '100%', height: '65%' }, animationOpacityStyle]}>
          <View style={styles.gallery_container} ref={mainContainer}>
            {isFetching && (
              <View style={styles.activity_container}>
                <ActivityIndicator size="large" color={Colors.aqua_green} />
              </View>
            )}
            {!isFetching && <GalleryLayout key={Math.random()} images={itemData} navigation={navigation}/>}
          </View>
        </Animated.View>
      );
    },
  );

  return (
    /*  <GestureHandlerRootView style={{flex: 1}}>
      <PanGestureHandler onHandlerStateChange={handlePanGesture}> */
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', rowGap: 20, marginVertical: 20 }}>
          <View style={[styles.options_wrap, { columnGap: 5 }]}>
            <View>
              <SearchInput wide={true} />
            </View>
            <View>
              <TouchableOpacity style={styles.roundedButton}>
                <LinearGradient style={styles.roundedButton} colors={[Colors.light_round_btn_green, Colors.dark_round_btn_green]} start={[0, 0]}>
                  <SvgXml xml={FilterIcon} width={20} height={20} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {isLoading && (
        <View style={styles.activity_container}>
          <ActivityIndicator size="large" color={Colors.aqua_green} />
        </View>
      )}
      {data && (
        <FlashList
          onEndReached={loadMoreData}
          onEndReachedThreshold={0}
          data={data}
          ref={flashListRef}
          renderItem={({ item, index }) => Galley(item, index)}
          estimatedItemSize={2}
          ListFooterComponent={
            <View style={[styles.bottom, { height: windowHeight/2 }]}>
               <View style={styles.activity_container}>
                <ActivityIndicator size="large" color={Colors.aqua_green} />
              </View>
            </View>
          }
        />
      )}
      {error && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: Colors.aqua_green }}>Sorry, something went wrong!</Text>
        </View>
      )}
    </View>
    /*    </PanGestureHandler>
    </GestureHandlerRootView> */
  );
}

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: Colors.background_color,
  },
  options_wrap: {
    height: 72,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 0,
    paddingHorizontal: 20,
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
  roundedButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gallery_container: {
    flex: 1,
  },
});
