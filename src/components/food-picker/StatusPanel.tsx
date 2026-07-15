import { Map, TriangleAlert } from 'lucide-react';

type StatusPanelProps = {
  resolvedAddress: string;
  providerLabel: string | null;
  error: string | null;
};

export default function StatusPanel({ resolvedAddress, providerLabel, error }: StatusPanelProps) {
  if (error) {
    return (
      <div className="rounded-[24px] border-4 border-[#221b16] bg-[#fee2e2] p-4 neo-shadow-sm">
        <div className="flex items-start gap-3">
          <TriangleAlert size={18} className="mt-0.5 shrink-0 text-[#991b1b]" />
          <div>
            <h3 className="text-sm font-black text-[#7f1d1d]">这次没有顺利查到附近餐厅</h3>
            <p className="mt-1 text-sm leading-relaxed text-[#7f1d1d]">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!resolvedAddress) {
    return (
      <div className="rounded-[24px] border-4 border-dashed border-[#221b16] bg-[#fffaf2] p-4">
        <p className="text-sm leading-relaxed text-[#6b5d52]">
          输入一个商圈、小区、写字楼或街道地址后，我会帮你抓出 500 米内的餐厅，再随机选一家。
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[24px] border-4 border-[#221b16] bg-[#fffaf2] p-4 neo-shadow-sm">
      <div className="flex items-start gap-3">
        <Map size={18} className="mt-0.5 shrink-0 text-[#2563eb]" />
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2563eb]">当前搜索基准点</p>
          <h3 className="mt-2 text-sm font-black leading-relaxed text-[#221b16]">{resolvedAddress}</h3>
          <p className="mt-1 text-xs font-bold text-[#6b5d52]">数据来源：{providerLabel || '地图服务'}</p>
        </div>
      </div>
    </div>
  );
}
