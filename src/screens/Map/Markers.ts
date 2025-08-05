import {
  AnimationType,
  type MapMarker,
  type OwnPositionMarker,
} from 'react-native-leaflet-view';
import type { LeafletViewCoordsT } from 'src/types/map.types';

export const markerSetFishing = (
  initMarkers: LeafletViewCoordsT[],
): MapMarker[] | undefined => {
  return initMarkers.map(marker => ({
    position: marker,
    icon: '🔵',
    size: [30, 30],
  }));
};

export const markerAllFishing = (
  all: LeafletViewCoordsT[],
): MapMarker[] | undefined => {
  return all.map(marker => ({
    id: marker.id,
    position: marker,
    icon: `🟢 ${marker.title}`,
    size: [20, 20],
    iconAnchor: [0, 0],
  }));
};

export const ownPositionMarker = (
  location: LeafletViewCoordsT,
): OwnPositionMarker | undefined => {
  return {
    animation: {
      type: AnimationType.FADE,
      duration: 20,
    },
    icon: '🔴',
    position: location,
    size: [10, 10],
    title: '',
  };
};
