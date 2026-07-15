export type Coordinates = {
  lng: number;
  lat: number;
};

export type MapProvider = 'amap' | 'osm';
export type SearchRadius = 300 | 500 | 1000;

export type RestaurantItem = {
  id: string;
  name: string;
  address: string;
  distance: number;
  category: string;
  coverImageUrl?: string;
  tel?: string;
  rating?: number;
  provider: MapProvider;
  location: Coordinates;
};

export type SearchResult = {
  resolvedAddress: string;
  center: Coordinates;
  restaurants: RestaurantItem[];
  provider: MapProvider;
};
