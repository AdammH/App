import { useState } from 'react';
import { View, Dimensions } from 'react-native';
import MainScreen from '../screens/mainScreens/MainScreen';
import NotificationScreen from '../screens/mainScreens/NotificationScreen';

function MainPage({ navigation }) {
  const [screen, setScreen] = useState('main');
  const windowHeight = Dimensions.get('window').height
  const windowWidth = Dimensions.get('window').width

  function navigateTo(destination) {
    setScreen(destination);
  }
  return (
    <>
      <View style={{flex: 1, width: windowWidth, height: windowHeight, position: 'absolute', top: 0, zIndex: screen==='main' ? 1 : -1}}>
        <MainScreen navigation={navigation} />
      </View>
      {screen==='notification' ? <View style={{flex: 1, width: windowWidth, height: windowHeight, position: 'absolute', top: 0, zIndex: screen!=='main' ? 1 : -1}}>
        <NotificationScreen navigation={navigation} />
      </View> : null}
      
    </>
  );
}

export default MainPage;
