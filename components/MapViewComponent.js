import { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, StyleSheet, View, TouchableOpacity, Animated, Dimensions, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { goUp, goDown } from '../functions/animationFunctions';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { decode } from '@mapbox/polyline';
import OwnersMarker from './UI/OwnersMarker';
import Colors from '../constants/colors';
import { mapStyle } from '../mapStyleSettings/mapStyle';
import * as Location from 'expo-location';
import { markers } from '../mapStyleSettings/DUMMY_DATA';
import SportMapIcon from '../assets/mapIcons/sport_map_icon.svg';
import PartyMapIcon from '../assets/mapIcons/party_map_icon.svg';
import GameMapIcon from '../assets/mapIcons/game_map_icon.svg';
import PhotoMapIcon from '../assets/mapIcons/photo_map_icon.svg';
import { SvgXml } from 'react-native-svg';

//spravit useMemo pri setovani location, ak bude stale rovnaka tak aby sa zbytocne nesetovala

function MapViewComponent({ goToLocation, onPress, gpsHeight, setShowFullMap, setShowGoUpButton, showGoUpButton, setGoUpButtonPressed }) {
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coords, setCoords] = useState([]);
  const [markerCoords, setMarkerCoords] = useState({});
  const mapRef = useRef(null);
  const bottomAnim = useRef(new Animated.Value(gpsHeight)).current;
  const windowHeight = Dimensions.get('window').height;

  const animationStyle = {
    bottom: bottomAnim,
  };
  
  useEffect(() => {
    let isMounted = true;
    const startLocationUpdates = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        setPermissionStatus(status);
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        setInterval(async () => {
          const newLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
          });
          if (isMounted) {
            setLocation(newLocation);
          }
        }, 5000);
      } catch (error) {
        console.error('Chyba pri získavaní polohy:', error);
      }
    };

    startLocationUpdates();

    return () => {
      isMounted = false;
    };
  }, []);

  async function getDirections(startLoc, destinationLoc) {
    try {
      //const KEY = process.env.REACT_APP_DIRECTION_API_KEY //put your API key here.
      //otherwise, you'll have an 'unauthorized' error.
      let response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${process.env.REACT_APP_DIRECTION_API_KEY}`);
      let responseJson = await response.json();
      let points = decode(responseJson.routes[0].overview_polyline.points);

      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });
      return coords;
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    if (gpsHeight != undefined) {
      if (gpsHeight === windowHeight * 0.155) {
        goDown(bottomAnim, gpsHeight);
      } else {
        goUp(bottomAnim, gpsHeight);
      }
    }
  }, [gpsHeight]);

  useEffect(() => {
    if (goToLocation) {
      goToTokyo();
    }
  }, [goToLocation]);

  function goToTokyo() {
    mapRef.current.animateToRegion(goToLocation, 200);
  }

  handleMarkerPress = (event) => {
    const { coordinate } = event.nativeEvent;

    setMarkerCoords({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
  };

  function findDirectionHandler() {
    getDirections(`${location.coords.latitude}, ${location.coords.longitude}`, `${markerCoords.latitude}, ${markerCoords.longitude}`)
      .then((coords) => setCoords(coords))
      .catch((err) => console.log('Something went wrong'));
  }

  return (
    <>
      {location ? (
        <View style={{ flex: 1 }}>
          <Animated.View style={[styles.roundedButton, { rowGap: 8 }, styles.btnAbsolute, styles.gps, animationStyle]} >
            <TouchableOpacity onPress={markerCoords && findDirectionHandler}>
              <LinearGradient style={[styles.roundedButton]} colors={[Colors.light_round_btn_green, Colors.dark_round_btn_green]} start={[0, 0]}>
                <Ionicons name="locate-outline" size={20} color={Colors.text_color} />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.goUpButton, styles.roundedButton, showGoUpButton === true ? { opacity: 1 } : { opacity: 0, position: 'absolute' }]}
              onPress={(event) => {
                setShowFullMap(false);
                setShowGoUpButton(false);
                Platform.OS==='android' && setGoUpButtonPressed(true);
              }}
            >
              <LinearGradient style={[styles.roundedButton, styles.btnAbsolute]} colors={[Colors.dark_green, Colors.light_green]} start={[0, 0]}>
                <Ionicons name="chevron-up-outline" size={20} color={Colors.text_color} />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapStyle}
            style={{ flex: 1 }}
            onPress={(event) => {
              onPress();
            }}
            initialRegion={{
              latitude: 48.14453369985377,
              longitude: 17.121221371507513,
             /*  latitude: location.coords.latitude,
              longitude: location.coords.longitude, */
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            /* showsUserLocation={true}
                            followsUserLocation={true} */
          >
            <Marker
              anchor={{ x: 0.5, y: 0.5 }}
              coordinate={{
                latitude: 48.14453369985377,
                longitude: 17.121221371507513,
                /* latitude: location.coords.latitude,
                longitude: location.coords.longitude, */
              }}
            >
              <OwnersMarker />
            </Marker>

            {markers.map((marker, index) => (
              <Marker key={index} coordinate={marker.latlng} title={marker.title} description={marker.description} onPress={this.handleMarkerPress}>
                {marker.activity === 'sport' && <SvgXml xml={SportMapIcon} />}
                {marker.activity === 'game' && <SvgXml xml={GameMapIcon} />}
                {marker.activity === 'photo' && <SvgXml xml={PhotoMapIcon} />}
                {marker.activity === 'party' && <SvgXml xml={PartyMapIcon} />}
              </Marker>
            ))}
            {coords.length > 0 && <Polyline coordinates={coords} strokeWidth={6} strokeColor={Colors.light_green} />}
          </MapView>
        </View>
      ) : (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors.aqua_green} />
        </View>
      )}
    </>
  );
}

export default MapViewComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '35%',
    backgroundColor: Colors.background_color,
    alignItems: 'center',
  },
  gps: {
    alignSelf: 'flex-end',
    right: 10,
    zIndex: 1,
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
  goUpButton: {
    zIndex: 12,
  },
});
