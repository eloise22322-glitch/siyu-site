import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ChevronDown, Dices, MapPinned } from 'lucide-react';
import AddressSearchBar from '../components/food-picker/AddressSearchBar';
import RandomResultSheet from '../components/food-picker/RandomResultSheet';
import RestaurantCard from '../components/food-picker/RestaurantCard';
import StatusPanel from '../components/food-picker/StatusPanel';
import { useFoodPickerStore } from '../store/useFoodPickerStore';
import { RestaurantItem } from '../types/foodPicker';

const radiusOptions = [300, 500, 1000] as const;

export default function FoodPickerPage() {
  // #region debug-point fp-loc-1
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
  // #endregion debug-point fp-loc-1

  const [isRadiusMenuOpen, setIsRadiusMenuOpen] = useState(false);
  const [isPicking, setIsPicking] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [rollingRestaurant, setRollingRestaurant] = useState<RestaurantItem | null>(null);
  const radiusMenuRef = useRef<HTMLDivElement | null>(null);
  const rollingIntervalRef = useRef<number | null>(null);
  const rollingTimeoutRef = useRef<number | null>(null);
  const {
    keyword,
    radius,
    loading,
    restaurants,
    selectedRestaurant,
    resolvedAddress,
    providerLabel,
    error,
    setKeyword,
    setRadius,
    searchNearby,
    searchNearbyByCoordinates,
    randomPick,
    clearSelection,
    setError,
  } = useFoodPickerStore();

  useEffect(() => {
    document.title = '等会儿吃什么';
  }, []);

  // #region debug-point fp-loc-2
  useEffect(() => {
    debugReport({
      hypothesisId: 'A',
      msg: 'food-picker mounted',
      href: window.location.href,
      ua: navigator.userAgent,
      hasGeolocation: 'geolocation' in navigator,
    });
  }, []);
  // #endregion debug-point fp-loc-2

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!radiusMenuRef.current?.contains(event.target as Node)) {
        setIsRadiusMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (rollingIntervalRef.current !== null) {
        window.clearInterval(rollingIntervalRef.current);
      }
      if (rollingTimeoutRef.current !== null) {
        window.clearTimeout(rollingTimeoutRef.current);
      }
    };
  }, []);

  function stopPickingAnimation() {
    if (rollingIntervalRef.current !== null) {
      window.clearInterval(rollingIntervalRef.current);
      rollingIntervalRef.current = null;
    }
    if (rollingTimeoutRef.current !== null) {
      window.clearTimeout(rollingTimeoutRef.current);
      rollingTimeoutRef.current = null;
    }
  }

  function handleRandomPick() {
    if (restaurants.length === 0 || loading || isPicking) {
      return;
    }

    stopPickingAnimation();
    clearSelection();
    setIsPicking(true);

    let currentIndex = Math.floor(Math.random() * restaurants.length);
    setRollingRestaurant(restaurants[currentIndex]);

    rollingIntervalRef.current = window.setInterval(() => {
      currentIndex = (currentIndex + 1 + Math.floor(Math.random() * restaurants.length)) % restaurants.length;
      setRollingRestaurant(restaurants[currentIndex]);
    }, 120);

    rollingTimeoutRef.current = window.setTimeout(() => {
      stopPickingAnimation();
      setIsPicking(false);
      setRollingRestaurant(null);
      randomPick();
    }, 1800);
  }

  function handleCloseRandomSheet() {
    stopPickingAnimation();
    setIsPicking(false);
    setRollingRestaurant(null);
    clearSelection();
  }

  function handleLocate() {
    if (loading || isLocating) {
      // #region debug-point fp-loc-3
      debugReport({
        hypothesisId: 'C',
        msg: 'locate click ignored (busy)',
        loading,
        isLocating,
      });
      // #endregion debug-point fp-loc-3
      return;
    }

    if (!('geolocation' in navigator)) {
      // #region debug-point fp-loc-4
      debugReport({
        hypothesisId: 'B',
        msg: 'geolocation not supported',
      });
      // #endregion debug-point fp-loc-4
      setError('当前浏览器不支持定位，请手动输入地址');
      return;
    }

    // #region debug-point fp-loc-5
    debugReport({
      hypothesisId: 'C',
      msg: 'locate start',
    });
    // #endregion debug-point fp-loc-5

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const center = {
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        };
        // #region debug-point fp-loc-6
        debugReport({
          hypothesisId: 'C',
          msg: 'geolocation success',
          lat: center.lat,
          lng: center.lng,
          accuracy: position.coords.accuracy,
        });
        // #endregion debug-point fp-loc-6
        setError(null);
        setIsLocating(false);
        void searchNearbyByCoordinates(center);
      },
      (geoError) => {
        // #region debug-point fp-loc-7
        debugReport({
          hypothesisId: 'B',
          msg: 'geolocation error',
          code: geoError.code,
          message: geoError.message,
        });
        // #endregion debug-point fp-loc-7
        setIsLocating(false);
        if (geoError.code === geoError.PERMISSION_DENIED) {
          setError('你拒绝了定位授权，请在浏览器设置中允许定位，或手动输入地址');
          return;
        }
        if (geoError.code === geoError.POSITION_UNAVAILABLE) {
          setError('暂时无法获取你的定位信息，请稍后再试或手动输入地址');
          return;
        }
        if (geoError.code === geoError.TIMEOUT) {
          setError('获取定位超时，请再试一次或手动输入地址');
          return;
        }
        setError('定位失败，请手动输入地址');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }

  return (
    <div className="min-h-screen bg-[#f6ead8] text-[#221b16]">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-28 pt-4">
        <header className="space-y-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                window.location.href = '/';
              }}
              className="inline-flex items-center gap-2 rounded-full border-3 border-[#221b16] bg-white px-3 py-2 text-xs font-black neo-shadow-sm"
            >
              <ArrowLeft size={14} />
              返回主页
            </button>
            <span className="rounded-full border-3 border-[#221b16] bg-[#facc15] px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] neo-shadow-sm">
              What To Eat
            </span>
          </div>

          <AddressSearchBar
            value={keyword}
            loading={loading}
            locating={isLocating}
            onChange={setKeyword}
            onSubmit={() => {
              void searchNearby();
            }}
            onLocate={handleLocate}
          />

          <StatusPanel resolvedAddress={resolvedAddress} providerLabel={providerLabel} error={error} />
        </header>

        <main className="mt-6 flex-1 space-y-4">
          <div className="flex items-center justify-between px-1">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f97316]">附近餐厅</p>
              <h2 className="mt-1 text-lg font-black">当前共找到 {restaurants.length} 家</h2>
            </div>
            <div ref={radiusMenuRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsRadiusMenuOpen((current) => !current);
                }}
                className="flex items-center gap-2 rounded-[20px] border-3 border-[#221b16] bg-white px-3.5 py-2.5 text-[11px] font-black text-[#221b16] neo-shadow-sm transition hover:-translate-y-[1px]"
                aria-haspopup="listbox"
                aria-expanded={isRadiusMenuOpen}
              >
                <span>{radius} 米</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${isRadiusMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isRadiusMenuOpen ? (
                <div className="absolute right-0 top-[calc(100%+10px)] z-20 w-[116px] rounded-[22px] border-3 border-[#221b16] bg-white p-2 neo-shadow">
                  <div className="space-y-1" role="listbox" aria-label="选择搜索范围">
                    {radiusOptions.map((option) => {
                      const isActive = radius === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setIsRadiusMenuOpen(false);
                            void setRadius(option);
                          }}
                          className={`flex w-full items-center justify-center rounded-full border-2 px-3 py-2 text-[11px] font-black transition ${
                            isActive
                              ? 'border-[#221b16] bg-[#facc15] text-[#221b16]'
                              : 'border-transparent bg-transparent text-[#6b5d52] hover:bg-[#f7f1e8]'
                          }`}
                        >
                          {option} 米
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className="h-[132px] animate-pulse rounded-[24px] border-4 border-[#221b16] bg-white/70"
                />
              ))}
            </div>
          ) : restaurants.length > 0 ? (
            <div className="space-y-3">
              {restaurants.map((restaurant) => (
                <div key={restaurant.id}>
                  <RestaurantCard restaurant={restaurant} />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border-4 border-dashed border-[#221b16] bg-[#fffaf2] p-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#221b16] bg-[#fef08a]">
                <MapPinned size={24} />
              </div>
              <h3 className="mt-4 text-lg font-black">还没开始选餐厅</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6b5d52]">
                先搜一个地址，我会帮你把附近餐厅都捞出来。
              </p>
            </div>
          )}
        </main>

        <div className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-md px-4 pb-4 pt-3">
          <div className="rounded-[30px] border-4 border-[#221b16] bg-white/90 p-3 backdrop-blur-sm neo-shadow-lg">
            <button
              type="button"
              onClick={handleRandomPick}
              disabled={restaurants.length === 0 || loading || isPicking}
              className="flex w-full items-center justify-center gap-3 rounded-[24px] border-4 border-[#221b16] bg-gradient-to-r from-[#f97316] via-[#fb7185] to-[#8b5cf6] px-5 py-4 text-base font-black text-white transition hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Dices size={18} />
              {isPicking ? '抽签中...' : '帮我随机选一家'}
            </button>
          </div>
        </div>
      </div>

      <RandomResultSheet
        restaurant={selectedRestaurant}
        previewRestaurant={rollingRestaurant}
        isPicking={isPicking}
        onClose={handleCloseRandomSheet}
        onRepick={handleRandomPick}
      />
    </div>
  );
}
