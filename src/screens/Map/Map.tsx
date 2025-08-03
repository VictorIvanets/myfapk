import React, { useEffect, useState } from 'react';
import { Alert, PermissionsAndroid, Platform, StyleSheet } from 'react-native';
import FadeInView from 'src/components/FadeInView';
import { colors } from '../../theme/colors';
import { AnimationType, LeafletView } from 'react-native-leaflet-view';
import Geolocation from 'react-native-geolocation-service';
import Flex from 'src/components/Flex';

const Map = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert('Permission denied');
            return;
          }
        }
        Geolocation.getCurrentPosition(
          pos => {
            const { latitude, longitude } = pos.coords;
            console.log(pos.coords);
            setLocation({ latitude, longitude });
          },
          error => {
            console.error(error);
            Alert.alert('Error', error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();
  }, []);

  const handleMapClick = (event: any) => {
    if (event.event === 'onMapClicked') {
      const { lat, lng } = event.payload.touchLatLng;
      console.log('setMarkers:', [{ lat, lng }]);
      setMarkers([{ lat, lng }]);
    }

    if (event.event === 'onMapMarkerClicked') {
      console.log(markers);
      console.log('click');
      // const { lat, lng } = event.payload.touchLatLng;
      // Alert.alert('Натиснуто на мітку', `lat: ${lat}\nlng: ${lng}`);
    }
  };

  return (
    <FadeInView style={styles.container}>
      {location && (
        <LeafletView
          zoom={13}
          zoomControl={false}
          mapCenterPosition={{
            lat: location.latitude,
            lng: location.longitude,
          }}
          onMessageReceived={handleMapClick}
          mapMarkers={markers.map((marker, index) => ({
            id: `marker-${index}`,
            position: marker,
            icon: '🔵',
            size: [30, 30],
          }))}
          ownPositionMarker={{
            animation: {
              type: AnimationType.FADE,
              duration: 20,
            },
            icon: '📍',
            position: { lat: location.latitude, lng: location.longitude },
            size: [25, 25],
            title: '',
          }}
        />
      )}
      <Flex style={styles.box}>
        <></>
      </Flex>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.MAIN,
    position: 'relative',
  },
  box: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 100,
    height: 300,
    backgroundColor: colors.MAIN50,
  },
});

export default Map;

// <Flex center flex>
//   <Text size="h1" style={styles.text}>
//     Main
//   </Text>
//   <Text color="ACCENT" size="Bh1" style={styles.text}>
//     Main
//   </Text>
//   {/* <Text size="h2" style={styles.text}>
//     Main
//   </Text>
//   <Text size="h3" style={styles.text}>
//     Main
//   </Text>
//   <Text size="h4" style={styles.text}>
//     Main
//   </Text>
//   <Text style={styles.text}>Main</Text>
//   <Button view="small" title="small" />
//   <Button view="max" title="Maximum" /> */}
// </Flex>
// <InputText />
// <Button onPress={() => navigation.navigate('Login')} title="Login" />
// <Button
//   title="Перейти на Home"
//   onPress={() => navigation.navigate('Home')}
// />
// <Button
//   title="Details"
//   onPress={() => navigation.navigate('Details', data)}
// />

// <Loader />
