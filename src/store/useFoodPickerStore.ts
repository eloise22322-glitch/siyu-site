import { create } from 'zustand';
import { RestaurantItem, SearchRadius } from '../types/foodPicker';
import { pickRandomRestaurant } from '../utils/foodPicker';
import { searchRestaurantsByAddress, searchRestaurantsByCoordinates } from '../utils/mapSearch';

// #region debug-point fp-loc-store-1
const DEBUG_SERVER_URL = 'http://127.0.0.1:7777/event';
const DEBUG_SESSION_ID = 'food-picker-location-bug';
const DEBUG_RUN_ID = 'pre-fix';
const debugReport = (payload: Record<string, unknown>) => {
  if (!import.meta.env.DEV) {
    return;
  }
  void fetch(DEBUG_SERVER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    body: JSON.stringify({
      sessionId: DEBUG_SESSION_ID,
      runId: DEBUG_RUN_ID,
      ts: Date.now(),
      ...payload,
    }),
  }).catch(() => undefined);
};
// #endregion debug-point fp-loc-store-1

type FoodPickerState = {
  keyword: string;
  radius: SearchRadius;
  resolvedAddress: string;
  restaurants: RestaurantItem[];
  selectedRestaurant: RestaurantItem | null;
  loading: boolean;
  error: string | null;
  providerLabel: string | null;
  setKeyword: (value: string) => void;
  setError: (value: string | null) => void;
  setRadius: (value: SearchRadius) => Promise<void>;
  searchNearby: () => Promise<void>;
  searchNearbyByCoordinates: (center: { lng: number; lat: number }) => Promise<void>;
  randomPick: () => void;
  clearSelection: () => void;
};

export const useFoodPickerStore = create<FoodPickerState>((set, get) => ({
  keyword: '',
  radius: 500,
  resolvedAddress: '',
  restaurants: [],
  selectedRestaurant: null,
  loading: false,
  error: null,
  providerLabel: null,
  setKeyword: (value) => set({ keyword: value }),
  setError: (value) => set({ error: value }),
  setRadius: async (value) => {
    set({ radius: value });
    if (get().keyword.trim()) {
      await get().searchNearby();
    }
  },
  searchNearby: async () => {
    const { keyword: rawKeyword, radius } = get();
    const keyword = rawKeyword.trim();
    if (!keyword) {
      set({ error: '先输入一个你附近的地址，比如“上海静安寺”', restaurants: [], selectedRestaurant: null });
      return;
    }

    set({ loading: true, error: null, selectedRestaurant: null });

    try {
      const result = await searchRestaurantsByAddress(keyword, radius);
      set({
        loading: false,
        resolvedAddress: result.resolvedAddress,
        restaurants: result.restaurants,
        selectedRestaurant: null,
        providerLabel: result.provider === 'amap' ? '高德地图' : '公开地图数据',
        error: result.restaurants.length === 0 ? `这个地址 ${radius} 米内暂时没有检索到餐厅` : null,
      });
    } catch (error) {
      set({
        loading: false,
        restaurants: [],
        selectedRestaurant: null,
        error: error instanceof Error ? error.message : '搜索失败，请稍后再试',
      });
    }
  },
  searchNearbyByCoordinates: async (center) => {
    const { radius } = get();
    // #region debug-point fp-loc-store-2
    debugReport({
      hypothesisId: 'D',
      msg: 'searchNearbyByCoordinates start',
      radius,
      lat: center.lat,
      lng: center.lng,
    });
    // #endregion debug-point fp-loc-store-2
    set({ loading: true, error: null, selectedRestaurant: null });

    try {
      const result = await searchRestaurantsByCoordinates(center, radius);
      // #region debug-point fp-loc-store-3
      debugReport({
        hypothesisId: 'D',
        msg: 'searchNearbyByCoordinates success',
        provider: result.provider,
        restaurantsCount: result.restaurants.length,
        resolvedAddress: result.resolvedAddress,
      });
      // #endregion debug-point fp-loc-store-3
      set({
        loading: false,
        keyword: result.resolvedAddress,
        resolvedAddress: result.resolvedAddress,
        restaurants: result.restaurants,
        selectedRestaurant: null,
        providerLabel: result.provider === 'amap' ? '高德地图' : '公开地图数据',
        error: result.restaurants.length === 0 ? `当前位置 ${radius} 米内暂时没有检索到餐厅` : null,
      });
    } catch (error) {
      // #region debug-point fp-loc-store-4
      debugReport({
        hypothesisId: 'D',
        msg: 'searchNearbyByCoordinates error',
        error: error instanceof Error ? error.message : String(error),
      });
      // #endregion debug-point fp-loc-store-4
      set({
        loading: false,
        restaurants: [],
        selectedRestaurant: null,
        error: error instanceof Error ? error.message : '定位搜索失败，请稍后再试',
      });
    }
  },
  randomPick: () => {
    const restaurant = pickRandomRestaurant(get().restaurants);
    set({
      selectedRestaurant: restaurant,
      error: restaurant ? null : '当前没有可随机选择的餐厅，请先搜索地址',
    });
  },
  clearSelection: () => set({ selectedRestaurant: null }),
}));
