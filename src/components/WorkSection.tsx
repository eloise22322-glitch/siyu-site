import React, { useState } from 'react';
import { WORKS_DATA } from '../data';
import { WorkPost } from '../types';
import { Share2, Heart, Bookmark, MessageSquare, BarChart2, Eye, EyeOff, LayoutTemplate, HelpCircle, PenTool, Sparkles } from 'lucide-react';

export default function WorkSection() {
  const [activeTab, setActiveTab] = useState<'小红书' | '公众号' | '知乎' | '全部'>('全部');
  const [expandedWork, setExpandedWork] = useState<string | null>(null);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Xiaohongshu': return <span className="bg-[#FF6B6B] text-white px-2 py-0.5 rounded border border-black font-display text-[10px] uppercase font-black">小红书 RED</span>;
      case 'WeChat': return <span className="bg-[#A3E635] text-black px-2 py-0.5 rounded border border-black font-display text-[10px] uppercase font-black">公众号 WX</span>;
      case 'Zhihu': return <span className="bg-[#0066FF] text-white px-2 py-0.5 rounded border border-black font-display text-[10px] uppercase font-black">知乎 ZH</span>;
      case 'Douyin': return <span className="bg-black text-white px-2 py-0.5 rounded border border-white font-display text-[10px] uppercase font-black">抖音 DY</span>;
      default: return null;
    }
  };

  const platformOrder: Record<string, number> = {
    Xiaohongshu: 1,
    WeChat: 2,
    Zhihu: 3,
    Douyin: 3
  };

  const filteredWorks = WORKS_DATA
    .filter((w) => {
      if (activeTab === '全部') return true;
      if (activeTab === '小红书') return w.platform === 'Xiaohongshu';
      if (activeTab === '公众号') return w.platform === 'WeChat';
      if (activeTab === '知乎') return w.platform === 'Zhihu' || w.platform === 'Douyin';
      return true;
    })
    .sort((a, b) => {
      if (activeTab !== '全部') return 0;
      const aOrder = platformOrder[a.platform] ?? 99;
      const bOrder = platformOrder[b.platform] ?? 99;
      return aOrder - bOrder;
    });

  const toggleExpand = (id: string) => {
    setExpandedWork(expandedWork === id ? null : id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-12 sm:space-y-16 animate-fade-in">
      
      {/* Page Title & Philosophy */}
      <div className="text-center space-y-3">
        <span className="bg-[#A3E635] text-black text-xs font-mono font-bold px-3 py-1 border-2 border-black rounded-md neo-shadow-sm inline-block">
          LIVE WORK SHOWCASE
        </span>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-black">
          部分精选{' '}
          <span className="bg-[#FF6B6B] text-white px-2 py-0.5 border-2 border-black rounded-lg inline-block neo-shadow-sm transform rotate-[1deg] transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:rotate-0">
            图文文案与爆款作品
          </span>
        </h2>
        <p className="text-gray-600 font-sans text-sm sm:text-base max-w-lg mx-auto">
          在这里，你可以直接拆阅爆款文案的真实写法。点击对应的展开卡片，即可调阅主理人私藏的「爆文公式配比」。
        </p>

        {/* Filters */}
        <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-md mx-auto">
          {(['全部', '小红书', '公众号', '知乎'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setExpandedWork(null);
              }}
              className={`px-4 py-1.5 text-xs font-display font-bold border-2 rounded-xl transition-all cursor-pointer select-none
                ${activeTab === tab
                  ? 'bg-black text-white border-black neo-shadow-sm -translate-y-[1px]'
                  : 'bg-white text-gray-800 border-black hover:bg-red-50'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Works Cards Stack Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
        {filteredWorks.map((work) => {
          const isExpanded = expandedWork === work.id;
          const isWeChat = work.platform === 'WeChat';
          return (
            <div 
              key={work.id}
              className={`w-full bg-[#FAF6F0] border-4 border-black rounded-3xl overflow-hidden neo-shadow-lg flex flex-col hover:translate-y-[-2px] transition-all ${isWeChat ? 'md:col-span-2 md:flex-row md:justify-start' : 'justify-between'}`}
            >
              {/* Image Banner Core (With dark overlay details) */}
              <div className={`relative h-44 border-b-4 border-black bg-gray-100 overflow-hidden group ${isWeChat ? 'md:h-auto md:w-5/12 md:border-b-0 md:border-r-4' : ''}`}>
                <img 
                  src={work.coverImage} 
                  alt={work.title} 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className={`w-full h-full object-cover transform-gpu group-hover:scale-[1.06] group-hover:brightness-[1.05] transition-[transform,filter] duration-500 ease-out ${work.sourceUrl ? 'cursor-pointer' : ''}`}
                />
                {work.sourceUrl && (
                  <a
                    href={work.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`打开 ${work.title} 原文`}
                    className="absolute inset-0 z-[1]"
                    title={`点击打开 ${work.title} 原文`}
                  />
                )}
                {/* Platform tag floating */}
                <div className="absolute top-3 left-3 z-10">
                  {getPlatformIcon(work.platform)}
                </div>
                {work.sourceUrl && (
                  <a
                    href={work.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 z-10 bg-white/95 border-2 border-black rounded-lg p-1.5 neo-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-xs transition-all cursor-pointer"
                    title="打开原笔记"
                  >
                    <Share2 size={14} className="text-black" />
                  </a>
                )}
                {/* Date sticker floating */}
                <div className="absolute bottom-3 right-3 bg-white border-2 border-black rounded px-2 py-0.5 text-[9px] font-mono font-bold leading-none neo-shadow-sm">
                  {work.publishDate}
                </div>
              </div>

              {isWeChat ? (
                <div className="md:w-7/12 flex flex-col w-full min-w-0">
                  <div className="p-4 sm:p-5 flex-grow space-y-4 w-full">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono font-bold text-gray-400 block uppercase">
                        分类: {work.category}
                      </span>
                      <h3 className="font-display font-black text-base sm:text-lg text-black leading-tight hover:text-red-500 transition-colors select-none">
                        {work.title}
                      </h3>
                    </div>

                    <p className="text-xs text-gray-600 font-sans leading-normal">
                      {work.summary}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 text-center pt-2 border-t border-dashed border-gray-200 w-full">
                      <div className="bg-gray-50 border border-black p-1.5 rounded-lg">
                          <span className="text-[8px] font-mono text-gray-400 block font-bold leading-none">点赞/LIKE</span>
                        <span className="font-display font-black text-xs sm:text-sm text-black inline-block mt-1">{work.likes}</span>
                      </div>
                      <div className="bg-gray-50 border border-black p-1.5 rounded-lg">
                        <span className="text-[8px] font-mono text-gray-400 block font-bold leading-none">收藏/COLLECT</span>
                        <span className="font-display font-black text-xs sm:text-sm text-black inline-block mt-1">{work.collects}</span>
                      </div>
                      <div className="bg-gray-50 border border-black p-1.5 rounded-lg">
                        <span className="text-[8px] font-mono text-gray-400 block font-bold leading-none">评论/COMM</span>
                        <span className="font-display font-black text-xs sm:text-sm text-black inline-block mt-1">{work.comments}</span>
                      </div>
                      <div className="bg-gray-50 border border-black p-1.5 rounded-lg">
                        <span className="text-[8px] font-mono text-gray-400 block font-bold leading-none">点击率/CTR</span>
                        <span className="font-display font-black text-xs sm:text-sm text-blue-600 inline-block mt-1">{work.clicks}</span>
                      </div>
                    </div>

                    {isExpanded && work.richContent && (
                      <div className="bg-[#F8FAFC] border-2 border-black rounded-lg p-3 sm:p-4 mt-4 space-y-3.5 text-xs text-black animate-slide-down w-full">
                        <div className="flex items-center gap-1.5 border-b border-black/10 pb-1.5">
                          <PenTool size={12} className="text-red-500" />
                          <span className="font-mono font-black text-[10px] uppercase tracking-wider text-black">
                            CREATIVE STRATEGY / 创作配方
                          </span>
                        </div>

                        <div className="space-y-2 text-gray-700 font-sans leading-relaxed">
                          {work.richContent.paragraphs.map((pText, pIdx) => (
                            <p key={pIdx}>{pText}</p>
                          ))}
                        </div>

                        {work.richContent.tips && (
                          <div className="bg-yellow-50 border border-yellow-300 rounded-md p-2.5 space-y-1.5">
                            <span className="font-display font-black text-[9px] text-yellow-800 uppercase tracking-widest block">
                              ✦ 司予划重点 (AIGC & OPS TIPS)
                            </span>
                            <ul className="space-y-1 text-[11px] text-gray-800 font-sans list-disc list-inside">
                              {work.richContent.tips.map((tip, tIdx) => (
                                <li key={tIdx} className="leading-snug">
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="p-4 sm:p-5 pt-0 w-full">
                    <button
                      onClick={() => toggleExpand(work.id)}
                      className={`w-full font-display font-bold text-xs py-2.5 rounded-xl border-2 border-black neo-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer
                        ${isExpanded 
                          ? 'bg-black text-white' 
                          : 'bg-white text-black hover:bg-slate-50'
                        }`}
                    >
                      {isExpanded ? (
                        <>
                          <EyeOff size={14} />
                          <span>合拢创作底细</span>
                        </>
                      ) : (
                        <>
                          <Eye size={14} />
                          <span>展开原创运营拆解</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-4 sm:p-5 flex-grow space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono font-bold text-gray-400 block uppercase">
                        分类: {work.category}
                      </span>
                      <h3 className="font-display font-black text-base sm:text-lg text-black leading-tight hover:text-red-500 transition-colors select-none">
                        {work.title}
                      </h3>
                    </div>

                    <p className="text-xs text-gray-600 font-sans leading-normal">
                      {work.summary}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 text-center pt-2 border-t border-dashed border-gray-200">
                      <div className="bg-gray-50 border border-black p-1.5 rounded-lg">
                        <span className="text-[8px] font-mono text-gray-400 block font-bold leading-none">点赞/LIKE</span>
                        <span className="font-display font-black text-xs sm:text-sm text-black inline-block mt-1">{work.likes}</span>
                      </div>
                      <div className="bg-gray-50 border border-black p-1.5 rounded-lg">
                        <span className="text-[8px] font-mono text-gray-400 block font-bold leading-none">收藏/COLLECT</span>
                        <span className="font-display font-black text-xs sm:text-sm text-black inline-block mt-1">{work.collects}</span>
                      </div>
                      <div className="bg-gray-50 border border-black p-1.5 rounded-lg">
                        <span className="text-[8px] font-mono text-gray-400 block font-bold leading-none">评论/COMM</span>
                        <span className="font-display font-black text-xs sm:text-sm text-black inline-block mt-1">{work.comments}</span>
                      </div>
                      <div className="bg-gray-50 border border-black p-1.5 rounded-lg">
                        <span className="text-[8px] font-mono text-gray-400 block font-bold leading-none">点击率/CTR</span>
                        <span className="font-display font-black text-xs sm:text-sm text-blue-600 inline-block mt-1">{work.clicks}</span>
                      </div>
                    </div>

                    {isExpanded && work.richContent && (
                      <div className="bg-[#F8FAFC] border-2 border-black rounded-lg p-3 sm:p-4 mt-4 space-y-3.5 text-xs text-black animate-slide-down">
                        <div className="flex items-center gap-1.5 border-b border-black/10 pb-1.5">
                          <PenTool size={12} className="text-red-500" />
                          <span className="font-mono font-black text-[10px] uppercase tracking-wider text-black">
                            CREATIVE STRATEGY / 创作配方
                          </span>
                        </div>

                        <div className="space-y-2 text-gray-700 font-sans leading-relaxed">
                          {work.richContent.paragraphs.map((pText, pIdx) => (
                            <p key={pIdx}>{pText}</p>
                          ))}
                        </div>

                        {work.richContent.tips && (
                          <div className="bg-yellow-50 border border-yellow-300 rounded-md p-2.5 space-y-1.5">
                            <span className="font-display font-black text-[9px] text-yellow-800 uppercase tracking-widest block">
                              ✦ 司予划重点 (AIGC & OPS TIPS)
                            </span>
                            <ul className="space-y-1 text-[11px] text-gray-800 font-sans list-disc list-inside">
                              {work.richContent.tips.map((tip, tIdx) => (
                                <li key={tIdx} className="leading-snug">
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="p-4 sm:p-5 pt-0">
                    <button
                      onClick={() => toggleExpand(work.id)}
                      className={`w-full font-display font-bold text-xs py-2.5 rounded-xl border-2 border-black neo-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer
                        ${isExpanded 
                          ? 'bg-black text-white' 
                          : 'bg-white text-black hover:bg-slate-50'
                        }`}
                    >
                      {isExpanded ? (
                        <>
                          <EyeOff size={14} />
                          <span>合拢创作底细</span>
                        </>
                      ) : (
                        <>
                          <Eye size={14} />
                          <span>展开原创运营拆解</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
}
