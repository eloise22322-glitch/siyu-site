import { Coordinates, RestaurantItem } from '../types/foodPicker';

export function formatDistance(distance: number): string {
  if (distance < 1000) {
    return `${Math.round(distance)} 米`;
  }

  return `${(distance / 1000).toFixed(1)} 公里`;
}

export function pickRandomRestaurant(restaurants: RestaurantItem[]): RestaurantItem | null {
  if (restaurants.length === 0) {
    return null;
  }

  const index = Math.floor(Math.random() * restaurants.length);
  return restaurants[index];
}

export function buildAmapNavigationUrl(target: RestaurantItem): string {
  const name = encodeURIComponent(target.name);
  return `https://uri.amap.com/navigation?to=${target.location.lng},${target.location.lat},${name}&mode=walk&coordinate=gaode&callnative=1`;
}

export function buildFallbackMapUrl(target: RestaurantItem): string {
  return `https://www.openstreetmap.org/?mlat=${target.location.lat}&mlon=${target.location.lng}#map=18/${target.location.lat}/${target.location.lng}`;
}

export function calculateDistance(from: Coordinates, to: Coordinates): number {
  const earthRadius = 6371000;
  const lat1 = degreesToRadians(from.lat);
  const lat2 = degreesToRadians(to.lat);
  const deltaLat = degreesToRadians(to.lat - from.lat);
  const deltaLng = degreesToRadians(to.lng - from.lng);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
}

function degreesToRadians(value: number): number {
  return (value * Math.PI) / 180;
}
