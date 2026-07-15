import { MapPinned, RefreshCcw, Sparkles, X } from 'lucide-react';
import { RestaurantItem } from '../../types/foodPicker';
import { buildAmapNavigationUrl, buildFallbackMapUrl, formatDistance } from '../../utils/foodPicker';

type RandomResultSheetProps = {
  restaurant: RestaurantItem | null;
  previewRestaurant: RestaurantItem | null;
  isPicking: boolean;
  onClose: () => void;
  onRepick: () => void;
};

export default function RandomResultSheet({
  restaurant,
  previewRestaurant,
  isPicking,
  onClose,
  onRepick,
}: RandomResultSheetProps) {
  const activeRestaurant = restaurant ?? previewRestaurant;

  if (!activeRestaurant) {
    return null;
  }

  const primaryUrl = buildAmapNavigationUrl(activeRestaurant);
  const fallbackUrl = buildFallbackMapUrl(activeRestaurant);
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-[#221b16]/30 px-4 pb-4 pt-12">
      <div className="w-full max-w-md mx-auto rounded-[32px] border-4 border-[#221b16] bg-[#fff7d6] p-5 neo-shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f97316]">
              {isPicking ? '命运抽签中' : '今晚吃它'}
            </p>
            <h3 className="mt-2 text-2xl font-black leading-tight text-[#221b16]">
              {isPicking ? `锁定中：${activeRestaurant.name}` : activeRestaurant.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border-3 border-[#221b16] bg-white p-2 text-[#221b16] neo-shadow-sm"
            aria-label="关闭随机结果"
          >
            <X size={16} />
          </button>
        </div>

        {isPicking ? (
          <div className="mt-4 rounded-[24px] border-3 border-[#221b16] bg-white p-4">
            <div className="rounded-[20px] border-3 border-[#221b16] bg-gradient-to-r from-[#fde68a] via-[#fdba74] to-[#fca5a5] p-4 text-center animate-result-pop">
              <div className="flex items-center justify-center gap-1.5 text-[#7c2d12]">
                <Sparkles size={14} />
                <p className="text-[11px] font-black uppercase tracking-[0.18em]">本轮候选</p>
              </div>
              <p className="mt-2 text-xl font-black text-[#221b16]">{activeRestaurant.name}</p>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs font-black text-[#5b5148]">
                <span className="rounded-full border-2 border-[#221b16] bg-white px-3 py-1">
                  {activeRestaurant.category}
                </span>
                <span>{formatDistance(activeRestaurant.distance)}</span>
              </div>
            </div>

            <div className="mt-4 rounded-[20px] border-3 border-[#221b16] bg-[#fff7d6] p-4">
              <p className="text-center text-[11px] font-black uppercase tracking-[0.18em] text-[#7c2d12]">
                候选地址
              </p>
              <p className="mt-2 text-center text-sm font-bold leading-relaxed text-[#5b5148]">
                {activeRestaurant.address}
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-[24px] border-3 border-[#221b16] bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full border-2 border-[#221b16] bg-[#e0f2fe] px-3 py-1 text-[11px] font-black text-[#0f172a]">
                {activeRestaurant.category}
              </span>
              <span className="text-xs font-black text-[#5b5148]">{formatDistance(activeRestaurant.distance)}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#5b5148]">{activeRestaurant.address}</p>
          </div>
        )}

        {isPicking ? (
          <div className="mt-4 rounded-[20px] border-3 border-[#221b16] bg-[#221b16] px-4 py-3 text-center text-sm font-black text-white">
            抽签进行中，马上为你揭晓这一顿
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <a
              href={primaryUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-[20px] border-3 border-[#221b16] bg-[#221b16] px-4 py-3 text-sm font-black text-white neo-shadow-sm transition hover:-translate-y-[1px]"
            >
              <MapPinned size={16} />
              立即导航
            </a>
            <button
              type="button"
              onClick={onRepick}
              className="inline-flex items-center justify-center gap-2 rounded-[20px] border-3 border-[#221b16] bg-white px-4 py-3 text-sm font-black text-[#221b16] neo-shadow-sm transition hover:-translate-y-[1px]"
            >
              <RefreshCcw size={16} />
              重新抽
            </button>
          </div>
        )}

        {!isPicking ? (
          <a
            href={fallbackUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 block text-center text-xs font-bold text-[#6b5d52] underline decoration-dotted"
          >
            如果高德没拉起，点这里用网页地图查看
          </a>
        ) : null}
      </div>
    </div>
  );
}
