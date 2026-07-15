import { Phone, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { RestaurantItem } from '../../types/foodPicker';
import { buildAmapNavigationUrl } from '../../utils/foodPicker';
import { formatDistance } from '../../utils/foodPicker';

type RestaurantCardProps = {
  restaurant: RestaurantItem;
};

const AMAP_KEY = (import.meta.env.VITE_AMAP_KEY || '').trim();
const BAIDU_AK = (import.meta.env.VITE_BAIDU_AK || '').trim();

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const coverCandidates = useMemo(() => buildRestaurantCoverCandidates(restaurant), [restaurant]);
  const [coverCandidateIndex, setCoverCandidateIndex] = useState(0);
  const imageUrl = coverCandidates[Math.min(coverCandidateIndex, coverCandidates.length - 1)];
  const navigationUrl = buildAmapNavigationUrl(restaurant);

  return (
    <a
      href={navigationUrl}
      target="_blank"
      rel="noreferrer"
      className="block rounded-[24px] border-4 border-[#221b16] bg-white p-4 neo-shadow-sm transition hover:-translate-y-[1px]"
    >
      <div className="flex items-start gap-4">
        <div className="relative w-[124px] shrink-0 overflow-hidden rounded-[20px] border-3 border-[#221b16] bg-[#f7f1e8]">
          <img
            src={imageUrl}
            alt={`${restaurant.name} 实景封面`}
            className="h-[148px] w-full object-cover"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => {
              setCoverCandidateIndex((current) => {
                if (current >= coverCandidates.length - 1) {
                  return current;
                }
                return current + 1;
              });
            }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 space-y-2">
              <div className="inline-flex items-center gap-1 rounded-full border-2 border-[#221b16] bg-[#eef2ff] px-2.5 py-1 text-[10px] font-black text-[#312e81]">
                <Sparkles size={10} />
                {restaurant.category}
              </div>
              <h3 className="text-base font-black leading-snug text-[#221b16]">{restaurant.name}</h3>
            </div>
            <div className="shrink-0 rounded-2xl border-3 border-[#221b16] bg-[#fef08a] px-3 py-2 text-center text-[11px] font-black text-[#221b16]">
              {formatDistance(restaurant.distance)}
            </div>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-[#5b5148]">{restaurant.address}</p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-bold text-[#6b5d52]">
            <span className="rounded-full border-2 border-[#221b16] bg-[#f7f1e8] px-2.5 py-1">
              {restaurant.provider === 'amap' ? '高德' : '公开地图'}
            </span>
            {restaurant.rating ? (
              <span className="rounded-full border-2 border-[#221b16] bg-[#dcfce7] px-2.5 py-1">
                评分 {restaurant.rating}
              </span>
            ) : null}
            {restaurant.tel ? (
              <span className="inline-flex items-center gap-1 rounded-full border-2 border-[#221b16] bg-[#fff7ed] px-2.5 py-1">
                <Phone size={10} />
                可联系
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </a>
  );
}

function buildRestaurantCoverCandidates(restaurant: RestaurantItem): string[] {
  const candidates: string[] = [];

  if (restaurant.coverImageUrl) {
    candidates.push(restaurant.coverImageUrl);
  }

  if (BAIDU_AK) {
    candidates.push(buildBaiduPanoramaUrl(restaurant));
  }

  if (restaurant.provider === 'amap' && AMAP_KEY) {
    candidates.push(buildAmapStaticMapUrl(restaurant));
  } else {
    candidates.push(buildOsmStaticMapUrl(restaurant));
  }

  return candidates;
}

function buildBaiduPanoramaUrl(restaurant: RestaurantItem): string {
  const params = new URLSearchParams({
    ak: BAIDU_AK,
    width: '400',
    height: '480',
    location: `${restaurant.location.lng},${restaurant.location.lat}`,
    coordtype: 'gcj02',
    fov: '120',
    pitch: '10',
  });

  return `https://api.map.baidu.com/panorama/v2?${params.toString()}`;
}

function buildAmapStaticMapUrl(restaurant: RestaurantItem): string {
  const params = new URLSearchParams({
    key: AMAP_KEY,
    location: `${restaurant.location.lng},${restaurant.location.lat}`,
    zoom: '16',
    size: '400*480',
    markers: `mid,,A:${restaurant.location.lng},${restaurant.location.lat}`,
  });

  return `https://restapi.amap.com/v3/staticmap?${params.toString()}`;
}

function buildOsmStaticMapUrl(restaurant: RestaurantItem): string {
  const params = new URLSearchParams({
    center: `${restaurant.location.lat},${restaurant.location.lng}`,
    zoom: '16',
    size: '400x480',
    markers: `${restaurant.location.lat},${restaurant.location.lng},red-pushpin`,
  });

  return `https://staticmap.openstreetmap.de/staticmap.php?${params.toString()}`;
}
