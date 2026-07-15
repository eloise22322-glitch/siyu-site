import React from 'react';
import { ArrowRight, Mail, Layers, Sparkles, Flame, Zap, User, Play } from 'lucide-react';
import Avatar from './Avatar';
import Marquee from './Marquee';
import { Tab } from '../types';

interface HomeSectionProps {
  onNavigate: (tab: Tab) => void;
  onOpenContact: () => void;
}

export default function HomeSection({ onNavigate, onOpenContact }: HomeSectionProps) {
  return (
    <div className="w-full py-6 sm:py-12 animate-fade-in">
      
      {/* 1. Hero Section (Replicating Vercel Paperfolio Layout - Screenshot #3) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-8 sm:pb-14">
        <div className="grid grid-cols-[minmax(0,1fr)_132px] sm:grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 md:gap-10 items-start md:items-center">
          
          {/* Left Text Column */}
          <div className="md:col-span-7 space-y-4 sm:space-y-8 min-w-0">
            <div className="inline-flex items-center gap-1.5 bg-white border-2 border-black px-3.5 py-1 rounded-full neo-shadow-sm rotate-[-1deg] w-fit">
              <Flame size={14} className="text-[#FF6B6B] fill-[#FF6B6B]" />
              <span className="font-mono text-[11px] font-black uppercase text-black tracking-wider animate-pulse">
                AIGC × GROWTH OPERATOR
              </span>
            </div>

            {/* Title formatted in 3 clean rows with beautiful neobrutalist highlighting */}
            <h1 className="font-display font-black text-[1.48rem] sm:text-5xl md:text-5xl text-black leading-[1.06] sm:leading-tight flex flex-col gap-2 sm:gap-4">
              <span className="block text-[#1a1a1a]">
                我是{' '}
                <span className="mt-1 sm:mt-0 bg-[#FF6B6B] text-white px-2 sm:px-3 py-1 sm:py-1.5 inline-block border-4 border-black neo-shadow-sm rounded-2xl transform rotate-[1deg] mx-0.5 sm:mx-1 transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:rotate-0">
                  司予 Eloise
                </span>
              </span>
              <span className="block text-[#1a1a1a]">
                一名{' '}
                <span className="mt-1 sm:mt-0 bg-[#A3E635] text-black px-2 sm:px-3 py-1 sm:py-1.5 inline-block border-4 border-black neo-shadow-sm rounded-2xl transform rotate-[-0.5deg] mx-0.5 sm:mx-1 transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:rotate-0">
                  增长型运营
                </span>
              </span>
              <span className="block text-[#1a1a1a]">
                专注{' '}
                <span className="mt-1 sm:mt-0 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white px-2 sm:px-3 py-1 sm:py-1.5 inline-block border-4 border-black neo-shadow-sm rounded-2xl transform rotate-[1deg] mx-0.5 sm:mx-1 transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:rotate-0">
                  AIGC 内容增长
                </span>
              </span>
            </h1>

            <p className="text-gray-700 font-sans text-[13px] sm:text-base leading-relaxed max-w-xl">
              以 <b className="text-black font-extrabold underline decoration-[#FDCC0D] decoration-3">「AIGC 智能提效（MJ/SD/LLMs） × 增长实验（选题/脚本/封面/转化）」</b> 为方法论底座，把内容当作增长入口，把产品体验当作承接闭环。追求可复用的策略、可量化的结果和可规模化的交付效率。
            </p>

            {/* Primary Action Buttons */}
            <div className="hidden sm:flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1 sm:pt-2">
              <button
                onClick={onOpenContact}
                className="bg-black text-white w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 border-4 border-black rounded-[20px] font-sans font-black neo-shadow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-xs active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Mail size={16} />
                <span>联系我</span>
              </button>
              
              <button
                onClick={() => onNavigate('projects')}
                className="bg-white text-black w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 border-4 border-black rounded-[20px] font-sans font-black neo-shadow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-xs active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Layers size={16} />
                <span>我的项目案例</span>
              </button>
            </div>
          </div>

          {/* Right Avatar Column */}
          <div className="md:col-span-5 flex justify-end sm:justify-center pt-7 sm:pt-0">
            <div className="group relative w-full max-w-[132px] sm:max-w-[300px] md:max-w-[360px]">
              <div className="absolute inset-0 bg-[#FDCC0D] border-4 border-black rounded-[26px] sm:rounded-[36px] md:rounded-[44px] translate-x-2 sm:translate-x-3 md:translate-x-4 translate-y-2 sm:translate-y-3 md:translate-y-4 z-0 transition-transform duration-300 ease-out group-hover:translate-x-3 sm:group-hover:translate-x-4 md:group-hover:translate-x-5 group-hover:translate-y-3 sm:group-hover:translate-y-4 md:group-hover:translate-y-5"></div>

              <div className="relative z-10 bg-white border-4 border-black rounded-[26px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden neo-shadow-sm flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:-rotate-[0.75deg]">
                <div className="p-2 sm:p-4 md:p-6">
                  <div className="bg-white border-4 border-black rounded-[18px] sm:rounded-[28px] md:rounded-[34px] p-2 sm:p-3 md:p-4 shadow-[6px_6px_0_0_#111111] transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:-rotate-1 group-hover:shadow-[8px_8px_0_0_#111111]">
                    <div className="relative aspect-square rounded-[14px] sm:rounded-[22px] md:rounded-[28px] border-4 border-black bg-[#F7F6F2] overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-[10%] rounded-full bg-[#FF6B6B] border-4 border-black"></div>
                      <div className="relative z-10">
                        <div className="block sm:hidden">
                          <Avatar size={96} variant="circle" showInfo={false} frame={false} />
                        </div>
                        <div className="hidden sm:block">
                          <Avatar size={200} variant="circle" showInfo={false} frame={false} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white h-4 sm:h-9 md:h-14"></div>
              </div>
            </div>
          </div>

          <div className="col-span-2 flex sm:hidden flex-col gap-3 pt-1">
            <button
              onClick={onOpenContact}
              className="bg-black text-white w-full px-5 py-3 border-3 border-black rounded-[16px] font-sans font-extrabold neo-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-xs active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer text-[13px]"
            >
              <Mail size={15} />
              <span>联系我</span>
            </button>

            <button
              onClick={() => onNavigate('projects')}
              className="bg-white text-black w-full px-5 py-3 border-3 border-black rounded-[16px] font-sans font-extrabold neo-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-xs active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer text-[13px]"
            >
              <Layers size={15} />
              <span>我的项目案例</span>
            </button>
          </div>

        </div>
      </div>

      {/* Modern Sliding Divider Marquee Strip */}
      <div className="mt-2">
        <Marquee speed={20} rotateDegrees="rotate-1" bgColor="bg-[#FDCC0D]" textColor="text-black" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-16 sm:space-y-20">
        
        {/* 2. Intro Showcase (Who's behind all this - Screenshot #2) */}
        <section className="grid grid-cols-[112px_minmax(0,1fr)] sm:grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 md:gap-10 items-start md:items-center">
          
          {/* Left Hand: Red Circle Avatar precisely representing the circular layout */}
          <div className="md:col-span-5 flex justify-start sm:justify-center order-first md:order-first pt-1 sm:pt-0">
            <div className="group relative w-full max-w-[112px] sm:max-w-[240px] md:max-w-[280px]">
              <div className="absolute inset-0 bg-[#FF6B6B] border-4 border-black rounded-full translate-x-2 translate-y-2 sm:translate-x-2.5 sm:translate-y-2.5 z-0 transition-transform duration-300 ease-out group-hover:translate-x-3 group-hover:translate-y-3 sm:group-hover:translate-x-3.5 sm:group-hover:translate-y-3.5"></div>
              <div className="relative z-10 bg-white border-4 border-black rounded-full overflow-hidden p-1.5 sm:p-2 neo-shadow-sm flex items-center justify-center aspect-square transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-[1.03] group-hover:-rotate-[1deg]">
                <div className="block sm:hidden">
                  <Avatar size={96} variant="circle" showInfo={false} frame={false} />
                </div>
                <div className="hidden sm:block">
                  <Avatar size={220} variant="circle" showInfo={false} frame={false} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Hand Details */}
          <div className="md:col-span-7 space-y-4 sm:space-y-6 min-w-0">
            <h2 className="font-display font-black text-[1.55rem] sm:text-4xl text-black leading-[1.08] sm:leading-tight">
              谁在操盘本主页的{' '}
              <span className="bg-[#3B82F6] text-white px-2.5 sm:px-3.5 py-1 sm:py-1.5 mt-1.5 sm:mt-2 inline-block border-4 border-black neo-shadow-sm rounded-2xl transform rotate-[1deg] uppercase text-[1.2rem] sm:text-3xl transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:rotate-0">
                爆款神话？
              </span>
            </h2>
            
            <p className="text-gray-700 font-sans text-[13px] sm:text-base leading-relaxed">
              我覆盖 <b className="text-black font-extrabold">小红书/微信/知乎</b> 等内容生态，擅长从定位、选题、内容生产到转化承接的全链路操盘；同时将 <b className="text-black font-extrabold">AIGC 与自动化</b> 深度融入工作流，提升内容产能与验证速度。我坚持 <b className="text-[#1a1a1a] font-black">「可验证增长 · 可复用方法 · 可规模交付」</b> 的交付标准。
            </p>

            {/* Custom Neobrutalist Bullet Points */}
            <div className="space-y-3 sm:space-y-5">
              
              {/* Stat Item 1 */}
              <div className="flex gap-3 sm:gap-4 items-start">
                {/* Indigo bullet square box */}
                <div className="w-6 h-6 sm:w-7 sm:h-7 border-3 border-black bg-[#3B82F6] flex-shrink-0 mt-0.5 rounded-[8px] neo-shadow-sm"></div>
                <div>
                  <h4 className="font-sans font-black text-black text-[14px] sm:text-base leading-none">
                    4 年新媒体内容与产品运营经验
                  </h4>
                  <p className="text-xs sm:text-xs text-gray-500 font-sans mt-1.5 leading-relaxed">
                    深耕小红书生态，具备从 0 到 1 搭建账号矩阵、内容方法论沉淀与 AIGC 驱动提效的实战经验，覆盖职教、营养健康与家装 AI 等业务场景。
                  </p>
                </div>
              </div>

              {/* Stat Item 2 */}
              <div className="flex gap-3 sm:gap-4 items-start">
                {/* Coral bullet square box */}
                <div className="w-6 h-6 sm:w-7 sm:h-7 border-3 border-black bg-[#FF6B6B] flex-shrink-0 mt-0.5 rounded-[8px] neo-shadow-sm"></div>
                <div>
                  <h4 className="font-sans font-black text-black text-[14px] sm:text-base leading-none">
                    推动 GMV 单月增长 1028%
                  </h4>
                  <p className="text-xs sm:text-xs text-gray-500 font-sans mt-1.5 leading-relaxed">
                    熟练运用 AIGC、Prompt 优化与自动化工作流，搭建可复用的选题、脚本与转化链路，并结合投放优化与数据复盘，持续提升内容曝光效率与商业转化表现。
                  </p>
                </div>
              </div>

            </div>

            <button
              onClick={() => onNavigate('about')}
              className="hidden sm:flex bg-black text-white text-xs sm:text-sm font-sans font-extrabold py-3 sm:py-3.5 px-4 sm:px-6 rounded-[16px] border-3 border-black neo-shadow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all items-center justify-center gap-2 cursor-pointer w-full sm:w-fit mt-3 sm:mt-4"
            >
              <User size={14} className="text-white" />
              <span>更深一步了解我</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="col-span-2 sm:hidden">
            <button
              onClick={() => onNavigate('about')}
              className="bg-black text-white text-[13px] font-sans font-extrabold py-3 px-4 rounded-[16px] border-3 border-black neo-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer w-full"
            >
              <User size={14} className="text-white" />
              <span>更深一步了解我</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </section>

        {/* 3. Service Stack (Our Services Grid - Screenshot #1) */}
        <section className="space-y-8 sm:space-y-10 relative">
          <div className="text-center space-y-3">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#1a1a1a]">
              我主导过的 <span className="bg-[#E63946] text-white px-3.5 py-1 inline-block border-3 border-black rounded-xl neo-shadow-sm transform rotate-[-1deg] transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:rotate-0">增长与内容运营作品</span>
            </h2>
            <p className="text-gray-600 font-sans text-sm sm:text-base max-w-xl mx-auto">
              从小红书 KOS 冷启动、公众号爆文转化，到 AIGC 提示词工程与 AI 产品原型落地，每一项作品都对应真实场景、明确目标与可复用的方法论。
            </p>
          </div>

          {/* Service Cards Grid - Premium Wireframe Vector Mockups */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            
            {/* Service 1: Little Red Book (Web style wireframe) */}
            <div className="bg-[#FAF9F6] border-4 border-black rounded-[24px] overflow-hidden neo-shadow flex flex-col justify-between hover:translate-y-[-6px] transition-all duration-300">
              {/* Category tag & index bar */}
              <div className="bg-[#FFF1F2] px-4 py-2 border-b-3 border-black flex justify-between items-center text-[10px] font-mono font-black text-[#E63946]">
                <span>01 / KOS人设打造</span>
                <span>RED BOOK</span>
              </div>
              {/* Toolbar wireframe block */}
              <div className="bg-[#FFE4E6] h-36 sm:h-40 border-b-3 border-black relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '12px 12px' }}></div>
                <div className="bg-white border-3 border-black rounded-xl p-2.5 w-44 h-26 relative shadow-[3px_3px_0px_rgba(0,0,0,1)] flex flex-col justify-between z-10">
                  {/* Miniature feed mockup with red accent */}
                  <div className="flex items-center gap-1.5 border-b-2 border-gray-100 pb-1.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#E63946] border-2 border-black flex-shrink-0 animate-pulse"></div>
                    <div className="w-12 h-2 bg-black rounded"></div>
                  </div>
                  <div className="bg-[#FFE4E6] border-2 border-black rounded-md h-9 w-full flex items-center justify-center">
                    <span className="text-[10px] font-mono text-[#E63946] font-black">设牛 DECOR AI</span>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-1 bg-gray-200 rounded"></div>
                    <div className="w-3/4 h-1 bg-gray-200 rounded"></div>
                  </div>
                </div>
                {/* Abstract grid wires */}
                <div className="absolute right-2 top-2 w-8 h-8 rounded-full border-2 border-dashed border-gray-400/50"></div>
              </div>
              <div className="p-5 sm:p-6 space-y-4 bg-white flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-sans font-black text-lg text-[#1a1a1a] mb-2 flex items-center gap-1.5 leading-tight">
                    <span className="text-[#E63946]">✦</span>
                    小红书 KOS 账号打造 (装修 AI 宣发)
                  </h4>
                  <p className="text-[13px] text-gray-600 font-sans leading-relaxed">
                    从 0 到 1 极致搭建设计师人设 KOS 账号（如「设牛」等极客标杆），首周视频曝光量 50w+，累计获得 500w+ 精准流量触达。为实景空间渲染及 AIGC 装修 AI 产品精准引流、引爆全域心智和高黏性裂变转化。
                  </p>
                </div>
              </div>
            </div>

            {/* Service 2: WeChat Account (Bezier Spline curves matching Screenshot #1 Card 1) */}
            <div className="bg-[#FAF9F6] border-4 border-black rounded-[24px] overflow-hidden neo-shadow flex flex-col justify-between hover:translate-y-[-6px] transition-all duration-300">
              {/* Category tag & index bar */}
              <div className="bg-[#ECFDF5] px-4 py-2 border-b-3 border-black flex justify-between items-center text-[10px] font-mono font-black text-[#10B981]">
                <span>02 / 微信生态图文</span>
                <span>WECHAT PUBLIC</span>
              </div>
              {/* curve drawing wireframe */}
              <div className="bg-[#D1FAE5] h-36 sm:h-40 border-b-3 border-black relative flex items-center justify-center">
                <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '12px 12px' }}></div>
                <div className="flex flex-col items-center z-10">
                  <svg className="w-40 h-20" viewBox="0 0 160 80">
                    <line x1="10" y1="65" x2="150" y2="65" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="3 3" />
                    {/* curve showing open-rate upward or extreme scale change */}
                    <path d="M 15,65 L 60,55 L 105,45 L 145,15" fill="none" stroke="#10B981" strokeWidth="3" />
                    <circle cx="15" cy="65" r="4" fill="white" stroke="black" strokeWidth="2" />
                    <circle cx="60" cy="55" r="4" fill="white" stroke="black" strokeWidth="2" />
                    <circle cx="105" cy="45" r="4" fill="white" stroke="black" strokeWidth="2" />
                    <circle cx="145" cy="15" r="5.5" fill="#A3E635" stroke="black" strokeWidth="2.5" />
                  </svg>
                  <span className="text-[9px] font-mono font-black bg-white border border-black px-1.5 py-[2px] rounded mt-1.5 text-black shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                    CONVERSION 3.7% ➔ 71.43%
                  </span>
                </div>
              </div>
              <div className="p-5 sm:p-6 space-y-4 bg-white flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-sans font-black text-lg text-[#1a1a1a] mb-2 flex items-center gap-1.5 leading-tight">
                    <span className="text-[#10B981]">✦</span>
                    公众号 Excel 与插画矩阵运营
                  </h4>
                  <p className="text-[13px] text-gray-600 font-sans leading-relaxed">
                    独立产出多篇 10w+ 级干货爆文，深耕插画矩阵。重构首焦关注链路与课程营销文案，将新粉成交转化率极限拉高至惊人的 71.43%。
                  </p>
                </div>
              </div>
            </div>

            {/* Service 3: Little Red Book Education Matrix */}
            <div className="bg-[#FAF9F6] border-4 border-black rounded-[24px] overflow-hidden neo-shadow flex flex-col justify-between hover:translate-y-[-6px] transition-all duration-300">
              {/* Category tag & index bar */}
              <div className="bg-[#FFFBEB] px-4 py-2 border-b-3 border-black flex justify-between items-center text-[10px] font-mono font-black text-[#D97706]">
                <span>03 / 职场高效增粉</span>
                <span>EDU MATRIX</span>
              </div>
              <div className="bg-[#FEF3C7] h-36 sm:h-40 border-b-3 border-black relative flex items-center justify-center">
                <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '12px 12px' }}></div>
                {/* 3 mini accounts matrix stacked wireframes */}
                <div className="flex gap-2.5 z-10">
                  <div className="bg-white border-2 border-black rounded-xl p-1.5 w-18 h-22 shadow-[2px_2px_0px_rgba(0,0,0,1)] flex flex-col justify-between items-center text-center">
                    <div className="w-5 h-5 rounded-full bg-[#FDCC0D] border border-black flex items-center justify-center text-[10px]">📊</div>
                    <span className="text-[7.5px] font-display font-black leading-none block truncate w-full text-black">秒可Excel</span>
                    <span className="text-[6.5px] text-green-600 font-mono font-bold scale-[0.9] block leading-none">200w播放</span>
                  </div>
                  <div className="bg-white border-2 border-black rounded-xl p-1.5 w-18 h-22 shadow-[2px_2px_0px_rgba(0,0,0,1)] flex flex-col justify-between items-center text-center">
                    <div className="w-5 h-5 rounded-full bg-[#FF6B6B] border border-black flex items-center justify-center text-[10px]">💻</div>
                    <span className="text-[7.5px] font-display font-black leading-none block truncate w-full text-black">秒可PPT</span>
                    <span className="text-[6.5px] text-green-600 font-mono font-bold scale-[0.9] block leading-none">粉40w+</span>
                  </div>
                  <div className="bg-white border-2 border-black rounded-xl p-1.5 w-18 h-22 shadow-[2px_2px_0px_rgba(0,0,0,1)] flex flex-col justify-between items-center text-center animate-pulse">
                    <div className="w-5 h-5 rounded-full bg-[#A3E635] border border-black flex items-center justify-center text-[10px]">💡</div>
                    <span className="text-[7.5px] font-display font-black leading-none block truncate w-full text-black">职场矩阵</span>
                    <span className="text-[6.5px] text-black font-mono font-bold scale-[0.9] block leading-none">0成本流</span>
                  </div>
                </div>
                <div className="absolute right-3 top-3 bg-[#3B82F6] text-white border-2 border-black px-1.5 py-0.5 rounded text-[8px] font-mono font-black rotate-12 shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
                  EDUCATION
                </div>
              </div>
              <div className="p-5 sm:p-6 space-y-4 bg-white flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-sans font-black text-lg text-[#1a1a1a] mb-2 flex items-center gap-1.5 leading-tight">
                    <span className="text-[#D97706]">✦</span>
                    小红书职场教育账号矩阵
                  </h4>
                  <p className="text-[13px] text-gray-600 font-sans leading-relaxed">
                    从 0 到 1 全案运营“秒可PPT”、“秒可Excel”等教育爆款矩阵账户。零广告费增粉超 40w+，引爆全网图文与视频总计超 300w+ 播放热潮。
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
