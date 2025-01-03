import { useEffect, useState } from 'react'
import * as Location from 'expo-location';


export function locationFunctionHandler(){
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
  return location
}
