export type CoordsT = {
  latitude: number | undefined;
  longitude: number | undefined;
};

export interface MapState {
  coords: CoordsT | undefined;
  errorMassege: string | undefined;
  isLoading: boolean;
}

export type LeafletViewCoordsT = {
  lat: number;
  lng: number;
  id?: string;
  description?: string;
  title?: string;
  score?: number;
};
