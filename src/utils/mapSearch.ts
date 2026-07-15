import { Coordinates, RestaurantItem, SearchRadius, SearchResult } from '../types/foodPicker';
import { calculateDistance } from './foodPicker';

const AMAP_KEY = (import.meta.env.VITE_AMAP_KEY || '').trim();

type AmapGeocodeResponse = {
  status: string;
  geocodes?: Array<{
    formatted_address: string;
    location: string;
  }>;
};

type AmapAroundResponse = {
  status: string;
  pois?: Array<{
    id: string;
    name: string;
    address?: string;
    type?: string;
    tel?: string;
    location: string;
    distance?: string;
    business?: {
      rating?: string | number;
    };
  }>;
};

type AmapDetailResponse = {
  status: string;
  pois?: {
    poi?: unknown;
  };
};

type OsmSearchItem = {
  lat: string;
  lon: string;
  display_name: string;
};

type OverpassResponse = {
  elements: Array<{
    id: number;
    lat?: number;
    lon?: number;
    center?: {
      lat: number;
      lon: number;
    };
    tags?: {
      name?: string;
      amenity?: string;
      cuisine?: string;
      addr_full?: string;
      'addr:street'?: string;
      'addr:housenumber'?: string;
      phone?: string;
      image?: string;
      website?: string;
    };
  }>;
};

export async function searchRestaurantsByAddress(address: string, radius: SearchRadius): Promise<SearchResult> {
  const keyword = address.trim();
  if (!keyword) {
    throw new Error('请输入想搜索的地址');
  }

  if (AMAP_KEY) {
    try {
      return await searchWithAmap(keyword, radius);
    } catch {
      return searchWithOsm(keyword, radius);
    }
  }

  return searchWithOsm(keyword, radius);
}

export async function searchRestaurantsByCoordinates(center: Coordinates, radius: SearchRadius): Promise<SearchResult> {
  if (AMAP_KEY) {
    try {
      return await searchWithAmapCoordinates(center, radius);
    } catch {
      return searchWithOsmCoordinates(center, radius);
    }
  }

  return searchWithOsmCoordinates(center, radius);
}

async function searchWithAmap(address: string, radius: SearchRadius): Promise<SearchResult> {
  const geocodeResponse = await fetchJson<AmapGeocodeResponse>(
    `https://restapi.amap.com/v3/geocode/geo?key=${AMAP_KEY}&address=${encodeURIComponent(address)}&output=JSON`
  );

  const geocode = geocodeResponse.geocodes?.[0];
  if (!geocode?.location) {
    throw new Error('未能解析该地址，请换个更具体的地址试试');
  }

  const center = parseLngLat(geocode.location);
  const aroundResponse = await fetchJson<AmapAroundResponse>(
    `https://restapi.amap.com/v5/place/around?key=${AMAP_KEY}&location=${center.lng},${center.lat}&radius=${radius}&sortrule=distance&types=050000&show_fields=business&page_size=25&page_num=1`
  );

  const restaurants = (aroundResponse.pois ?? [])
    .map((item) => normalizeAmapRestaurant(item))
    .filter(Boolean) as RestaurantItem[];
  const restaurantsWithPhotos = await attachAmapRestaurantPhotos(restaurants);

  return {
    resolvedAddress: geocode.formatted_address || address,
    center,
    restaurants: restaurantsWithPhotos.slice(0, 25),
    provider: 'amap',
  };
}

type AmapReverseGeocodeResponse = {
  status: string;
  regeocode?: {
    formatted_address?: string;
  };
};

async function searchWithAmapCoordinates(center: Coordinates, radius: SearchRadius): Promise<SearchResult> {
  const aroundResponse = await fetchJson<AmapAroundResponse>(
    `https://restapi.amap.com/v5/place/around?key=${AMAP_KEY}&location=${center.lng},${center.lat}&radius=${radius}&sortrule=distance&types=050000&show_fields=business&page_size=25&page_num=1`
  );

  const restaurants = (aroundResponse.pois ?? [])
    .map((item) => normalizeAmapRestaurant(item))
    .filter(Boolean) as RestaurantItem[];
  const restaurantsWithPhotos = await attachAmapRestaurantPhotos(restaurants);

  let resolvedAddress = `当前位置（${center.lat.toFixed(4)}, ${center.lng.toFixed(4)}）`;
  try {
    const reverse = await fetchJson<AmapReverseGeocodeResponse>(
      `https://restapi.amap.com/v3/geocode/regeo?key=${AMAP_KEY}&location=${center.lng},${center.lat}&radius=200&extensions=base&output=JSON`
    );
    resolvedAddress = reverse.regeocode?.formatted_address?.trim() || resolvedAddress;
  } catch {
    resolvedAddress = resolvedAddress;
  }

  return {
    resolvedAddress,
    center,
    restaurants: restaurantsWithPhotos.slice(0, 25),
    provider: 'amap',
  };
}

async function searchWithOsm(address: string, radius: SearchRadius): Promise<SearchResult> {
  const geocodeResponse = await fetchJson<OsmSearchItem[]>(
    `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(address)}`,
    {
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'zh-CN,zh;q=0.9',
      },
    }
  );

  const location = geocodeResponse[0];
  if (!location) {
    throw new Error('未能找到这个地址，请换个更完整的地址试试');
  }

  const center = {
    lng: Number(location.lon),
    lat: Number(location.lat),
  };

  const query = `
    [out:json][timeout:25];
    (
      node["amenity"~"restaurant|fast_food|cafe|food_court"](around:${radius},${center.lat},${center.lng});
      way["amenity"~"restaurant|fast_food|cafe|food_court"](around:${radius},${center.lat},${center.lng});
      relation["amenity"~"restaurant|fast_food|cafe|food_court"](around:${radius},${center.lat},${center.lng});
    );
    out center 30;
  `;

  const nearbyResponse = await fetchJson<OverpassResponse>('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
    },
    body: query,
  });

  const restaurants = nearbyResponse.elements
    .map((item) => normalizeOsmRestaurant(item, center))
    .filter(Boolean) as RestaurantItem[];

  restaurants.sort((a, b) => a.distance - b.distance);

  return {
    resolvedAddress: location.display_name,
    center,
    restaurants: restaurants.slice(0, 25),
    provider: 'osm',
  };
}

type OsmReverseItem = {
  display_name?: string;
};

async function searchWithOsmCoordinates(center: Coordinates, radius: SearchRadius): Promise<SearchResult> {
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"~"restaurant|fast_food|cafe|food_court"](around:${radius},${center.lat},${center.lng});
      way["amenity"~"restaurant|fast_food|cafe|food_court"](around:${radius},${center.lat},${center.lng});
      relation["amenity"~"restaurant|fast_food|cafe|food_court"](around:${radius},${center.lat},${center.lng});
    );
    out center 30;
  `;

  const nearbyResponse = await fetchJson<OverpassResponse>('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
    },
    body: query,
  });

  const restaurants = nearbyResponse.elements
    .map((item) => normalizeOsmRestaurant(item, center))
    .filter(Boolean) as RestaurantItem[];

  restaurants.sort((a, b) => a.distance - b.distance);

  let resolvedAddress = `当前位置（${center.lat.toFixed(4)}, ${center.lng.toFixed(4)}）`;
  try {
    const reverse = await fetchJson<OsmReverseItem>(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${center.lat}&lon=${center.lng}`,
      {
        headers: {
          Accept: 'application/json',
          'Accept-Language': 'zh-CN,zh;q=0.9',
        },
      }
    );
    resolvedAddress = reverse.display_name?.trim() || resolvedAddress;
  } catch {
    resolvedAddress = resolvedAddress;
  }

  return {
    resolvedAddress,
    center,
    restaurants: restaurants.slice(0, 25),
    provider: 'osm',
  };
}

function normalizeAmapRestaurant(item: AmapAroundResponse['pois'][number]): RestaurantItem | null {
  if (!item.name || !item.location) {
    return null;
  }

  const location = parseLngLat(item.location);
  const rating = item.business?.rating ? Number(item.business.rating) : undefined;

  return {
    id: item.id || `${item.name}-${item.location}`,
    name: item.name,
    address: item.address || '暂无详细地址',
    distance: item.distance ? Number(item.distance) : 0,
    category: item.type?.split(';')[0] || '餐饮',
    tel: item.tel || undefined,
    rating: Number.isFinite(rating) ? rating : undefined,
    provider: 'amap',
    location,
  };
}

function normalizeOsmRestaurant(
  item: OverpassResponse['elements'][number],
  center: Coordinates
): RestaurantItem | null {
  const lat = item.lat ?? item.center?.lat;
  const lng = item.lon ?? item.center?.lon;
  const name = item.tags?.name;

  if (!lat || !lng || !name) {
    return null;
  }

  const location = { lng, lat };
  return {
    id: `osm-${item.id}`,
    name,
    address: buildOsmAddress(item.tags),
    distance: calculateDistance(center, location),
    category: item.tags?.cuisine || item.tags?.amenity || '餐饮',
    tel: item.tags?.phone,
    provider: 'osm',
    location,
    coverImageUrl: normalizeOsmImageUrl(item.tags?.image),
  };
}

function buildOsmAddress(tags?: OverpassResponse['elements'][number]['tags']): string {
  if (!tags) {
    return '暂无详细地址';
  }

  if (tags.addr_full) {
    return tags.addr_full;
  }

  const street = tags['addr:street'] || '';
  const houseNumber = tags['addr:housenumber'] || '';
  const fallback = `${street}${houseNumber}`.trim();

  return fallback || '暂无详细地址';
}

function parseLngLat(value: string): Coordinates {
  const [lng, lat] = value.split(',').map(Number);
  return { lng, lat };
}

function normalizeOsmImageUrl(value?: string): string | undefined {
  const normalized = value?.trim();
  if (!normalized) {
    return undefined;
  }

  if (normalized.startsWith('https://') || normalized.startsWith('http://')) {
    return normalized;
  }

  return undefined;
}

async function attachAmapRestaurantPhotos(restaurants: RestaurantItem[]): Promise<RestaurantItem[]> {
  if (!AMAP_KEY) {
    return restaurants;
  }

  const ids = restaurants.map((restaurant) => restaurant.id).filter(Boolean);
  if (ids.length === 0) {
    return restaurants;
  }

  const batches = chunk(ids, 10);
  const responses = await Promise.all(
    batches.map((batch) =>
      fetchJson<AmapDetailResponse>(
        `https://restapi.amap.com/v5/place/detail?key=${AMAP_KEY}&id=${batch.map(encodeURIComponent).join('|')}&show_fields=photos&output=JSON`
      ).catch(() => ({ status: '0' } as AmapDetailResponse))
    )
  );

  const photoMap = new Map<string, string>();
  for (const response of responses) {
    const poiContainer = response.pois?.poi;
    const pois = Array.isArray(poiContainer) ? poiContainer : poiContainer ? [poiContainer] : [];
    for (const poi of pois) {
      const id = extractAmapPoiId(poi);
      const photoUrl = extractAmapPoiPhotoUrl(poi);
      if (id && photoUrl) {
        photoMap.set(id, photoUrl);
      }
    }
  }

  return restaurants.map((restaurant) => {
    const coverImageUrl = photoMap.get(restaurant.id);
    if (!coverImageUrl) {
      return restaurant;
    }
    return { ...restaurant, coverImageUrl };
  });
}

function extractAmapPoiId(poi: unknown): string | undefined {
  if (!poi || typeof poi !== 'object') {
    return undefined;
  }

  const value = (poi as { id?: unknown }).id;
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function extractAmapPoiPhotoUrl(poi: unknown): string | undefined {
  if (!poi || typeof poi !== 'object') {
    return undefined;
  }

  const candidate =
    (poi as { photos?: unknown }).photos ??
    (poi as { business?: { indoor?: { navi?: { photos?: unknown } } } }).business?.indoor?.navi?.photos;

  if (!candidate) {
    return undefined;
  }

  if (Array.isArray(candidate)) {
    for (const entry of candidate) {
      const url = extractPhotoUrl(entry);
      if (url) {
        return url;
      }
    }
    return undefined;
  }

  return extractPhotoUrl(candidate);
}

function extractPhotoUrl(value: unknown): string | undefined {
  if (!value || typeof value !== 'object') {
    return undefined;
  }

  const url = (value as { url?: unknown }).url;
  return typeof url === 'string' && url.trim() ? url.trim() : undefined;
}

function chunk<T>(items: T[], size: number): T[][] {
  const batches: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    batches.push(items.slice(index, index + size));
  }
  return batches;
}

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('地图服务请求失败');
  }

  return response.json() as Promise<T>;
}
