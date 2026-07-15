import { describe, expect, it, vi } from 'vitest';
import { buildAmapNavigationUrl, formatDistance, pickRandomRestaurant } from './foodPicker';
import { RestaurantItem } from '../types/foodPicker';

const mockRestaurant: RestaurantItem = {
  id: '1',
  name: '随机食堂',
  address: '上海市静安区测试路 1 号',
  distance: 128,
  category: '餐饮',
  provider: 'amap',
  location: {
    lng: 121.4737,
    lat: 31.2304,
  },
};

describe('foodPicker utils', () => {
  it('formats short distance in meters', () => {
    expect(formatDistance(128)).toBe('128 米');
  });

  it('formats long distance in kilometers', () => {
    expect(formatDistance(1380)).toBe('1.4 公里');
  });

  it('returns null when there is no restaurant', () => {
    expect(pickRandomRestaurant([])).toBeNull();
  });

  it('picks a restaurant from provided list', () => {
    vi.spyOn(Math, 'random').mockReturnValueOnce(0.1);
    const result = pickRandomRestaurant([mockRestaurant]);
    expect(result?.name).toBe('随机食堂');
  });

  it('builds amap navigation link', () => {
    const url = buildAmapNavigationUrl(mockRestaurant);
    expect(url).toContain('uri.amap.com/navigation');
    expect(url).toContain('121.4737,31.2304');
    expect(url).toContain(encodeURIComponent('随机食堂'));
  });
});
