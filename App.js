import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { store } from './redux/app/store';
import { Provider } from 'react-redux';
import { useCallback } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainTabBarButton from './components/UI/MainTabBarButton';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgXml } from 'react-native-svg';
import PartyIcon from './assets/tabBarIcons/party_icon.svg';
import ActivePartyIcon from './assets/tabBarIcons/active_party_icon.svg';
import ActiveGalleryIcon from './assets/tabBarIcons/active_gallery_icon.svg';
import ActivePeopleIcon from './assets/tabBarIcons/active_people_icon.svg';
import ActiveChatIcon from './assets/tabBarIcons/active_message_icon.svg';
import GalleryIcon from './assets/tabBarIcons/gallery_icon.svg';
import PeopleIcon from './assets/tabBarIcons/people_icon.svg';
import ChatIcon from './assets/tabBarIcons/message_icon.svg';
import BottomTabBarBG from './assets/bottom_tab_bar_2.svg';
import Colors from './constants/colors';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MainPage from './pages/MainPage';
import GroupPage from './pages/GroupPage';
import PartyScreen from './screens/partyScreens/PartyScreen';
import GalleryScreen from './screens/galleryScreens/GalleryScreen';
import ChatScreen from './screens/chatScreens/ChatScreen'
import DescriptionScreen from './screens/mainScreens/DescriptionScreen';
import MainScreen from './screens/mainScreens/MainScreen';
import NotificationScreen from './screens/mainScreens/NotificationScreen';
import AsCreatorScreen from './screens/partyScreens/AsCreatorScreen';
import AddFriendScreen from './screens/chatScreens/AddFriendScreen';
import FirstProfileScreen from './screens/mainScreens/profileScreens/1_ProfileScreen';
import PhotoCloseScreen from './screens/galleryScreens/PhotoCloseScreen';

SplashScreen.preventAutoHideAsync();

function App() {
  const Stack = createNativeStackNavigator();
  const BottomTabs = createBottomTabNavigator();

  const [fontsLoaded] = useFonts({
    'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'poppins-semi-bold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  function MainTabPage() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }

  function PartyPage(){
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="PartyScreen"
          component={PartyScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AsCreatorScreen"
          component={AsCreatorScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }

  function ApplicationLayout() {
    return (
      <BottomTabs.Navigator
        initialRouteName="MainTabPage"
        screenOptions={{
          tabBarBackground: () => {
            return (
              <>
                <MaskedView
                  style={styles.tab_container}
                  maskElement={
                    <View style={styles.maskWrapper}>
                      <SvgXml width={'100%'} height={88} xml={BottomTabBarBG} />
                    </View>
                  }
                >
                  <LinearGradient colors={[Colors.light_tab_grad_green, Colors.dark_tab_grad_green]} start={[0, 0]} style={styles.tab_container} />
                </MaskedView>
                <MaskedView
                  style={styles.tab_bg_grad_container}
                  maskElement={
                    <View style={styles.maskWrapper}>
                      <SvgXml width={'100%'} height={86} xml={BottomTabBarBG} />
                    </View>
                  }
                >
                  <LinearGradient
                    colors={[Colors.progress_light_green, Colors.background_opacity_0_color]}
                    locations={Platform.OS === 'ios' ? [0.47, 0.55] : [0.47, 0.52]}
                    style={styles.tab_bg_grad_container}
                  />
                </MaskedView>
              </>
            );
          },
          tabBarStyle: {
            height: 80,
            tabBarShowLabel: false,
            borderTopColor: 'transparent',
            position: 'absolute',
          },
          tabBarIconStyle: {
            marginHorizontal: 0,
            position: 'absolute',
            top: 45,
          },
        }}
      >
        <BottomTabs.Screen
          name="PartyPage"
          component={PartyPage}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaskedView
                  style={styles.icon_container}
                  maskElement={
                    <View style={{ with: 27, marginLeft: -1.5 }}>
                      <SvgXml xml={ActivePartyIcon} />
                    </View>
                  }
                >
                  <LinearGradient colors={[Colors.light_tab_icon_grad_green, Colors.dark_tab_icon_grad_green]} start={[0, 0]} style={{ width: 27, height: 24 }} />
                </MaskedView>
              ) : (
                <SvgXml xml={PartyIcon} />
              ),
            tabBarLabel: () => {
              return null;
            },
          }}
        />
        <BottomTabs.Screen
          name="GalleryScreen"
          component={GalleryScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaskedView
                  style={styles.icon_container}
                  maskElement={
                    <View style={{ with: 27, marginLeft: -2 }}>
                      <SvgXml xml={ActiveGalleryIcon} />
                    </View>
                  }
                >
                  <LinearGradient colors={[Colors.light_tab_icon_grad_green, Colors.dark_tab_icon_grad_green]} start={[0, 0]} style={styles.icon_container} />
                </MaskedView>
              ) : (
                <SvgXml xml={GalleryIcon} />
              ),
            tabBarLabel: () => {
              return null;
            },
          }}
        />
        <BottomTabs.Screen
          name="MainTabPage"
          component={MainTabPage}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (focused ? <MainTabBarButton icon="plus" /> : <MainTabBarButton icon="home" />),
            tabBarLabel: () => {
              return null;
            },
          }}
        />
        <BottomTabs.Screen
          name="GroupPage"
          component={GroupPage}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaskedView
                  style={styles.icon_container}
                  maskElement={
                    <View>
                      <SvgXml xml={ActivePeopleIcon} />
                    </View>
                  }
                >
                  <LinearGradient colors={[Colors.light_tab_icon_grad_green, Colors.dark_tab_icon_grad_green]} start={[0, 0]} style={styles.icon_container} />
                </MaskedView>
              ) : (
                <SvgXml xml={PeopleIcon} />
              ),
            tabBarLabel: () => {
              return null;
            },
          }}
        />
        <BottomTabs.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaskedView
                  style={styles.icon_container}
                  maskElement={
                    <View>
                      <SvgXml xml={ActiveChatIcon} />
                    </View>
                  }
                >
                  <LinearGradient colors={[Colors.light_tab_icon_grad_green, Colors.dark_tab_icon_grad_green]} start={[0, 0]} style={styles.icon_container} />
                </MaskedView>
              ) : (
                <SvgXml xml={ChatIcon} />
              ),
            tabBarLabel: () => {
              return null;
            },
          }}
        />
      </BottomTabs.Navigator>
    );
  }

  return (
    <>
      <Provider store={store}>
        <StatusBar style="light" />
        <SafeAreaProvider>
          <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="LoginPage"
                  component={LoginPage}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="SignUpPage"
                  component={SignUpPage}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="ApplicationLayout"
                  component={ApplicationLayout}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="DescriptionScreen"
                  component={DescriptionScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="AddFriendScreen"
                  component={AddFriendScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="FirstProfileScreen"
                  component={FirstProfileScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="PhotoCloseScreen"
                  component={PhotoCloseScreen}
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </Provider>
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background_color,
  },
  tab_container: {
    tabBarShowLabel: false,
    height: 88,
    zIndex: 2,
  },
  tab_bg_grad_container: {
    tabBarShowLabel: false,
    height: 200,
    bottom: 89,
    zIndex: 1,
  },
  maskedView: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
  },
  maskWrapper: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  icon_container: {
    width: 24,
    height: 24,
  },
});
