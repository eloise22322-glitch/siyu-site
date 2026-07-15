import React from 'react';

interface MarqueeProps {
  items?: string[];
  speed?: number; // duration in seconds
  bgColor?: string;
  textColor?: string;
  rotateDegrees?: string; // e.g. "-rotate-2"
}

export default function Marquee({
  items = [
    "内容增长 × 产品运营",
    "小红书矩阵运营",
    "公众号转化闭环",
    "选题/脚本/封面 A/B",
    "GMV 单月 +1028%",
    "200万+ 视频播放",
    "100万+ 图文曝光",
    "AIGC 提效工作流",
    "RPA-GPT-Python 自动化",
    "产品体验评测与迭代",
    "投放复盘与关键词策略",
    "可复用方法论交付"
  ],
  speed = 25,
  bgColor = "bg-black",
  textColor = "text-white",
  rotateDegrees = "-rotate-2"
}: MarqueeProps) {
  
  // Repeating the array to ensure seamless infinite looping scroll
  const doubledItems = [...items, ...items, ...items];
  const starClass = textColor.includes('text-black') ? 'text-black' : 'text-yellow-400';

  return (
    <div className={`relative w-full ${bgColor} ${textColor} py-4 overflow-hidden border-t-4 border-b-4 border-[#1a1a1a] font-display font-bold uppercase tracking-wider select-none transform ${rotateDegrees} z-10 neo-shadow`}>
      {/* Dynamic Keyframes injected locally so it's fully autonomous! */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee-loop {
          display: flex;
          width: max-content;
          animation: marquee ${speed}s linear infinite;
        }
      `}</style>
      
      <div className="animate-marquee-loop flex items-center gap-12 text-sm sm:text-lg">
        {doubledItems.map((item, index) => (
          <div key={index} className="flex items-center gap-4 py-1">
            <span>{item}</span>
            <span className={`${starClass} text-xl font-black`}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
