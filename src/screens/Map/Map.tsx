import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
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
import FishFilter from './FishFilter';

const Map = () => {
  const navigation = useAppNavigation();
  const [location, setLocation] = useState<LeafletViewCoordsT | null>(null);
  const [markers, setMarkers] = useState<LeafletViewCoordsT[]>([]);
  const [viewAll, setViewAll] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(13);
  const { markerData } = useGetAllforMap();
  const [filterAll, setFilterAll] = useState<LeafletViewCoordsT[]>([]);

  useEffect(() => {
    markerData && setFilterAll(markerData);
  }, [markerData]);

  useEffect(() => {
    requestLocationPermission(setLocation);
  }, []);

  const handleMapClick = (event: any) => {
    console.log(event);
    if (event.event === 'onMapClicked') {
      const { lat, lng } = event.payload.touchLatLng;
      setMarkers([{ lat, lng }]);
      !viewAll && setZoom(15);
    }

    if (event.event === 'onMapMarkerClicked') {
      if (viewAll && filterAll) {
        const { mapMarkerID } = event.payload;
        if (mapMarkerID === 'OWN_POSTION_MARKER_ID') return;
        else mapMarkerID && navigation.navigate('Details', { id: mapMarkerID });
      } else {
        const { mapMarkerID } = event.payload;
        if (mapMarkerID === 'OWN_POSTION_MARKER_ID')
          location &&
            navigation.navigate('CreateFishing', { coords: location });
        else navigation.navigate('CreateFishing', { coords: markers[0] });
      }
    }
  };

  return (
    <FadeInView style={styles.container}>
      {location ? (
        <LeafletView
          zoom={zoom}
          zoomControl={false}
          mapCenterPosition={markers.length ? markers[0] : location}
          onMessageReceived={handleMapClick}
          mapMarkers={
            viewAll && filterAll
              ? markerAllFishing(filterAll)
              : markerSetFishing(markers)
          }
          ownPositionMarker={ownPositionMarker(location)}
        />
      ) : (
        <ActivityIndicator size={120} color={colors.ACCENT} />
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
          title={viewAll ? 'закрити' : 'всі мітки'}
        />
      </Flex>
      {markerData && viewAll && (
        <Flex center style={styles.filter}>
          <FishFilter allFishins={markerData} setFilterAll={setFilterAll} />
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
    right: 15,
  },
  filter: {
    position: 'absolute',
    bottom: 60,
    right: 10,
    width: 100,
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
