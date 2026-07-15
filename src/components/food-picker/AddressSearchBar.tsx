import { LoaderCircle, MapPin, Search } from 'lucide-react';

type AddressSearchBarProps = {
  value: string;
  loading: boolean;
  locating: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onLocate: () => void;
};

export default function AddressSearchBar({
  value,
  loading,
  locating,
  onChange,
  onSubmit,
  onLocate,
}: AddressSearchBarProps) {
  return (
    <div className="flex items-center gap-3 rounded-[22px] border-3 border-[#221b16] bg-white px-4 py-3">
      <button
        type="button"
        onClick={onLocate}
        disabled={loading || locating}
        className="shrink-0 rounded-[14px] border-3 border-[#221b16] bg-white p-2 text-[#f97316] neo-shadow-sm transition hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
        aria-label="获取定位"
      >
        {locating ? <LoaderCircle size={16} className="animate-spin" /> : <MapPin size={16} />}
      </button>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onSubmit();
          }
        }}
        placeholder="输入地址，比如“静安寺”或“望京SOHO”"
        className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[#221b16] outline-none placeholder:text-[#8c7d70]"
      />
      <button
        type="button"
        onClick={onSubmit}
        disabled={loading}
        className="shrink-0 rounded-[18px] border-3 border-[#221b16] bg-[#facc15] px-4 py-2 text-xs font-black text-[#221b16] neo-shadow-sm transition hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="inline-flex items-center gap-1.5">
          {loading ? <LoaderCircle size={14} className="animate-spin" /> : <Search size={14} />}
          搜索
        </span>
      </button>
    </div>
  );
}
