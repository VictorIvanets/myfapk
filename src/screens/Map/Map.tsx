import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import FadeInView from 'src/components/FadeInView';
import { colors } from '../../theme/colors';
import { LeafletView } from 'react-native-leaflet-view';
import Flex from 'src/components/Flex';
import type { LeafletViewCoordsT } from 'src/types/map.types';
import useGetAllforMap from 'src/hooks/useGetAllforMap';
import Button from 'src/components/Button';
import {
  markerAllFishing,
  markerSetFishing,
  ownPositionMarker,
} from './Markers';
import { requestLocationPermission } from './requestLocationPermission';
import { useAppNavigation } from 'src/hooks/useAppNavigation';

const Map = () => {
  const navigation = useAppNavigation();
  const [location, setLocation] = useState<LeafletViewCoordsT | null>(null);
  const [markers, setMarkers] = useState<LeafletViewCoordsT[]>([]);
  const [viewAll, setViewAll] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(13);
  const { markerData } = useGetAllforMap();

  useEffect(() => {
    requestLocationPermission(setLocation);
  }, []);

  const handleMapClick = (event: any) => {
    // console.log(event.event);
    if (event.event === 'onMapClicked') {
      const { lat, lng } = event.payload.touchLatLng;
      setMarkers([{ lat, lng }]);
      !viewAll && setZoom(15);
    }

    if (event.event === 'onMapMarkerClicked') {
      if (viewAll && markerData) {
        const { mapMarkerID } = event.payload;
        navigation.navigate('Details', { id: mapMarkerID });
      } else {
        navigation.navigate('CreateFishing', { coords: markers[0] });
        console.log('setFishinf', markers[0]);
      }
    }
  };

  return (
    <FadeInView style={styles.container}>
      {location && (
        <LeafletView
          zoom={zoom}
          zoomControl={false}
          mapCenterPosition={markers.length ? markers[0] : location}
          onMessageReceived={handleMapClick}
          mapMarkers={
            viewAll && markerData
              ? markerAllFishing(markerData)
              : markerSetFishing(markers)
          }
          ownPositionMarker={ownPositionMarker(location)}
        />
      )}
      <Flex center style={styles.box}>
        <Button
          onPress={() => {
            viewAll ? setZoom(13) : setZoom(11);
            setViewAll(!viewAll);
            !viewAll && setLocation(location);
            !viewAll && setMarkers([]);
          }}
          view="small"
          title="всі мітки"
        />
      </Flex>
      {viewAll && (
        <Flex center style={styles.filter}>
          <Button outline view="small" title="Короп" />
          <Button outline view="small" title="Карась" />
          <Button outline view="small" title="Амур" />
          <Button outline view="small" title="Щука" />
        </Flex>
      )}
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
  },
  filter: {
    position: 'absolute',
    bottom: 60,
    right: 10,
    width: 90,
    // backgroundColor: colors.MAIN50,
    borderRadius: 10,
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
