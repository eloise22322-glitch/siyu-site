import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data';
import { ProjectType } from '../types';
import { ArrowRight, Activity, Cpu, Sparkles, TrendingUp, Compass, FileText, CheckCircle2, ShieldAlert, X } from 'lucide-react';

export default function ProjectSection() {
  const [activeFilter, setActiveFilter] = useState<string>('全部');
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

  const filterOptions = ['全部', '小红书', '公众号'];

  const filteredProjects = activeFilter === '全部'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.platform === activeFilter);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-12 sm:space-y-16 animate-fade-in">
      
      {/* Editorial Title Block (Replicating Screenshot #6) */}
      <div className="text-center space-y-3">
        <span className="bg-[#3B82F6] text-white text-xs font-mono font-bold px-3 py-1 border-2 border-black rounded-md neo-shadow-sm inline-block">
          CLASSIC CASES
        </span>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-black">
          认真看看我的{' '}
          <span className="bg-[#FDCC0D] text-black px-2 py-0.5 border-2 border-black rounded-lg inline-block neo-shadow-sm transform rotate-[-1deg] transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:rotate-0">
            爆款实操案例库
          </span>
        </h2>
        <p className="text-gray-600 font-sans text-sm sm:text-base max-w-lg mx-auto">
          每一次爆破增长的背后，都是对用户心理需求的精准捕食与跨媒介裂变视觉排版的设计。
        </p>

        {/* Categories Tab Selector with Brutalist block buttons */}
        <div className="pt-3 flex flex-wrap justify-center gap-2 sm:gap-3">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setActiveFilter(opt)}
              className={`px-4 py-2 text-xs sm:text-sm font-display font-bold border-2 rounded-xl transition-all select-none cursor-pointer
                ${activeFilter === opt
                  ? 'bg-black text-white border-black neo-shadow-sm -translate-y-[1px]'
                  : 'bg-white text-gray-800 border-black hover:bg-yellow-100'
                }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List with custom vector visuals (Replicating Screenshot #6 layout) */}
      <div className="space-y-8 sm:space-y-10">
        {filteredProjects.map((p) => {
          return (
            <div 
              key={p.id}
              className="bg-[#FAF6F0] border-4 border-black rounded-3xl overflow-hidden neo-shadow-lg grid grid-cols-1 md:grid-cols-12 hover:-translate-y-[2px] transition-all"
            >
              {/* Left Column: Case details (7/12 cols) */}
              <div className="p-5 sm:p-8 md:col-span-7 flex flex-col justify-between space-y-5 sm:space-y-6">
                <div className="space-y-4">
                  
                  {/* Platform Indicator & Tags */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="bg-[#FDCC0D] text-black text-xs font-display font-black px-3 py-1 border-2 border-black rounded-lg neo-shadow-sm">
                      {p.platform}
                    </span>
                    {p.tags.slice(0, 3).map((t, tIdx) => (
                      <span 
                        key={tIdx}
                        className="border-2 border-black text-gray-700 bg-gray-50 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* Title & subtitle */}
                  <div className="space-y-1">
                    <h3 className="font-display font-black text-xl sm:text-2xl text-black select-none leading-tight">
                      {p.title}
                    </h3>
                    <p className="font-mono text-xs text-gray-500 font-bold">
                      {p.subtitle}
                    </p>
                  </div>

                  {/* Description Paragraph */}
                  <p className="text-gray-700 font-sans text-xs sm:text-sm leading-relaxed text-justify">
                    {p.description}
                  </p>

                  {/* Quick Highlight Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {p.metrics.slice(0, 2).map((m, mIdx) => (
                      <div key={mIdx} className="bg-gray-50 border-2 border-black rounded-xl p-3 neo-shadow-sm">
                        <span className="text-[10px] font-mono font-bold text-gray-500 uppercase block">{m.label}</span>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="font-display font-black text-base sm:text-lg text-black">{m.value}</span>
                          {m.growth && (
                            <span className="text-[9px] font-mono font-bold text-green-600 bg-green-50 px-1 border border-green-200 rounded">
                              {m.growth}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Arrow Action Button */}
                <button
                  onClick={() => setSelectedProject(p)}
                  className="bg-black text-white font-display font-medium text-xs sm:text-sm py-3 px-5 border-2 border-black rounded-xl neo-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-xs active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-fit"
                >
                  <span>查看深度案例解读</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Right Column: Custom Visual Flat Mock (5/12 cols - Replicating screenshot #6) */}
              <div className={`${p.bgColor} md:col-span-15 border-t-4 md:border-t-0 md:border-l-4 border-black p-3 sm:p-4 flex items-center justify-center min-h-[220px] md:col-span-5`}>
                
                {p.id === 'proj_01' || p.id === 'proj_01_copy' || p.id === 'proj_02' || p.id === 'proj_03' ? (
                  /* Three micro neobrutalist creator cards in a row with realistic showcase and avatar images */
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
                    {(p.id === 'proj_01' ? [
                      {
                        name: "设计师贝贝",
                        role: "北京本土设计师｜室内设计11年",
                        bgColor: "bg-[#FDCC0D]",
                        avatar: "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31nu3f4gpl20g5q7gm31dp6o5g76hub8?imageView2/2/w/540/format/webp%7CimageMogr2/strip2",
                        cover: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20interior%20renovation%20photography%2C%20Beijing%20old%20apartment%20makeover%2C%20clean%20white%20walls%2C%20warm%20oak%20wood%20floor%2C%20built-in%20storage%2C%20modern%20minimal%20style%2C%20natural%20daylight%2C%20magazine%20quality%2C%2035mm%20lens%2C%20no%20people%2C%20no%20text%2C%20no%20logo&image_size=landscape_4_3",
                        url: "https://www.xiaohongshu.com/user/profile/68f0b0c20000000037009b05",
                        stat: "老房/旧房改造",
                        tags: ["北京", "旧房翻新", "收纳动线"]
                      },
                      {
                        name: "初夏-原木设计",
                        role: "原木风95后设计师",
                        bgColor: "bg-[#FF6B6B]",
                        avatar: "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31nvo477a58005q60vm1mbvk4hi5ao7o?imageView2/2/w/540/format/webp%7CimageMogr2/strip2",
                        cover: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20interior%20photography%2C%20wabi-sabi%20japandi%20living%20room%2C%20warm%20oak%20wood%20furniture%2C%20cream%20walls%2C%20natural%20linen%20sofa%2C%20rattan%20details%2C%20soft%20morning%20sunlight%2C%20calm%20cozy%20mood%2C%20high-end%20magazine%20quality%2C%2035mm%20lens%2C%20no%20people%2C%20no%20text%2C%20no%20logo&image_size=landscape_4_3",
                        url: "https://www.xiaohongshu.com/user/profile/68c0fd83000000001901fe84",
                        stat: "治愈原木案例",
                        tags: ["原木", "侘寂", "奶油极简"]
                      },
                      {
                        name: "Rose极简设计",
                        role: "装修行业14年｜服务1200+家庭",
                        bgColor: "bg-[#A3E635]",
                        avatar: "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31nucud4vks605pmuovk7c409fi2v3g8?imageView2/2/w/540/format/webp%7CimageMogr2/strip2",
                        cover: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20interior%20photography%2C%20modern%20minimalist%20apartment%2C%20black%20white%20gray%20color%20palette%2C%20matte%20black%20cabinetry%2C%20white%20walls%2C%20polished%20concrete%20floor%2C%20clean%20lines%2C%20subtle%20architectural%20details%2C%20soft%20dramatic%20lighting%2C%20high-end%20architectural%20magazine%2C%2035mm%20lens%2C%20no%20people%2C%20no%20text%2C%20no%20logo&image_size=landscape_4_3",
                        url: "https://www.xiaohongshu.com/user/profile/66dec7e8000000001d021009",
                        stat: "现代简约空间",
                        tags: ["黑白灰", "硬装收口", "极简美学"]
                      }
                    ] : p.id === 'proj_01_copy' ? [
                      {
                        name: "溜溜梅",
                        role: "装修新人努力学习中",
                        bgColor: "bg-[#FDCC0D]",
                        avatar: "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31hlnq6q4js5g5or8l0anr98934a7lf8?imageView2/2/w/540/format/webp%7CimageMogr2/strip2",
                        cover: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20cozy%20home%20renovation%20diary%20scene%2C%20tools%20and%20material%20samples%20on%20a%20wooden%20table%2C%20warm%20ambient%20lighting%2C%20authentic%20lived-in%20feel%2C%20soft%20neutral%20colors%2C%2035mm%20lens%2C%20no%20people%2C%20no%20text%2C%20no%20logo&image_size=landscape_4_3",
                        url: "https://www.xiaohongshu.com/user/profile/6368a815000000001f01a509",
                        stat: "屋主避坑日记",
                        tags: ["真实屋主", "避坑", "好物清单"]
                      },
                      {
                        name: "小宇是乐宝",
                        role: "北京90后设计师宝妈｜装修日记",
                        bgColor: "bg-[#FF6B6B]",
                        avatar: "https://sns-avatar-qc.xhscdn.com/avatar/5f5361120000000001009b14.jpg?imageView2/2/w/540/format/webp%7CimageMogr2/strip2",
                        cover: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20small%20apartment%20renovation%20in%20progress%2C%20protective%20floor%20cover%2C%20paint%20roller%2C%20clean%20minimal%20space%2C%20warm%20indoor%20lighting%2C%20candid%20documentary%20style%2C%20no%20people%2C%20no%20text%2C%20no%20logo&image_size=landscape_4_3",
                        url: "https://www.xiaohongshu.com/user/profile/5f5361120000000001009b14",
                        stat: "素人硬核自装",
                        tags: ["自装", "翻车实录", "预算控制"]
                      },
                      {
                        name: "萌想改造家",
                        role: "室内改造分享｜萌萌小家",
                        bgColor: "bg-[#A3E635]",
                        avatar: "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31f8ac325m6005po92vv2u7qgkkcinoo?imageView2/2/w/540/format/webp%7CimageMogr2/strip2",
                        cover: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20creative%20home%20styling%20makeover%2C%20small%20space%20decor%2C%20soft%20pastel%20accents%2C%20cozy%20warm%20textures%2C%20natural%20daylight%2C%20magazine%20quality%2C%20no%20people%2C%20no%20text%2C%20no%20logo&image_size=landscape_4_3",
                        url: "https://www.xiaohongshu.com/user/profile/670917fe000000000b031f50",
                        stat: "空间翻新好物",
                        tags: ["软装", "老屋改造", "氛围灯"]
                      }
                    ] : p.id === 'proj_02' ? [
                      {
                        name: "秒可PPT学习教程",
                        role: "每天分享PPT实用技巧",
                        bgColor: "bg-[#FDCC0D]",
                        avatar: "https://sns-avatar-qc.xhscdn.com/avatar/62b95fabc053980001a4f376.jpg?imageView2/2/w/540/format/webp%7CimageMogr2/strip2",
                        cover: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20modern%20workspace%20photo%2C%20laptop%20showing%20presentation%20slide%20mockup%20with%20abstract%20shapes%2C%20clean%20desk%2C%20bright%20daylight%2C%20minimal%20office%20aesthetic%2C%20no%20readable%20text%2C%20no%20logo&image_size=landscape_4_3",
                        url: "https://www.xiaohongshu.com/user/profile/6075007b000000000100bf68",
                        stat: "PPT效率模板",
                        tags: ["版式", "模板", "演示表达"]
                      },
                      {
                        name: "秒可excel",
                        role: "分享Excel实用技能｜轻松办公",
                        bgColor: "bg-[#FF6B6B]",
                        avatar: "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31rkjb5qb2m005qb62qedt1hqevq0sm0?imageView2/2/w/540/format/webp%7CimageMogr2/strip2",
                        avatarFit: "contain",
                        cover: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20clean%20modern%20office%20desk%2C%20laptop%20displaying%20spreadsheet%20and%20charts%20interface%20with%20blurred%20cells%2C%20minimal%20workspace%2C%20bright%20daylight%2C%20productivity%20aesthetic%2C%20no%20readable%20text%2C%20no%20logo&image_size=landscape_4_3",
                        url: "https://www.xiaohongshu.com/user/profile/5f73272d000000000101ead3",
                        stat: "Excel提效神器",
                        tags: ["函数", "报表", "自动化"]
                      },
                      {
                        name: "秒可PPT学习教程",
                        role: "PPT提效｜AI办公干货",
                        bgColor: "bg-[#A3E635]",
                        avatar: "https://sns-avatar-qc.xhscdn.com/avatar/62b95fabc053980001a4f376.jpg?imageView2/2/w/540/format/webp%7CimageMogr2/strip2",
                        cover: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20AI%20productivity%20workspace%2C%20laptop%20and%20notebook%2C%20sticky%20notes%2C%20clean%20desk%2C%20presentation%20layout%20wireframes%20on%20screen%2C%20bright%20daylight%2C%20minimal%20office%20aesthetic%2C%20no%20readable%20text%2C%20no%20logo&image_size=landscape_4_3",
                        url: "https://www.xiaohongshu.com/user/profile/6075007b000000000100bf68",
                        stat: "一键生产力翻倍",
                        tags: ["提效", "工具流", "职场技能"]
                      }
                    ] : [
                      {
                        name: "Excel职场",
                        role: "Excel/PPT 职场提效",
                        bgColor: "bg-[#FDCC0D]",
                        avatar: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=clean%20flat%20icon%20illustration%20of%20a%20spreadsheet%20grid%20and%20chart%20on%20a%20white%20background%2C%20minimal%20design%2C%20high%20contrast%2C%20no%20text%2C%20no%20logo&image_size=square",
                        cover: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20modern%20office%20desk%20scene%2C%20laptop%20showing%20a%20spreadsheet%20dashboard%20with%20blurred%20cells%20and%20charts%2C%20sticky%20notes%2C%20clean%20lighting%2C%20editorial%20photography%2C%20no%20readable%20text%2C%20no%20logo&image_size=landscape_4_3",
                        url: "https://open.weixin.qq.com/qr/code?username=gh_0565395f61fb",
                        stat: "Excel提效体系",
                        tags: ["公众号", "Excel", "PPT"]
                      },
                      {
                        name: "秒可商业插画设计师",
                        role: "商业插画｜接单与作品集",
                        bgColor: "bg-[#FF6B6B]",
                        avatar: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=clean%20flat%20icon%20illustration%20of%20a%20drawing%20tablet%20stylus%20and%20color%20palette%2C%20minimal%2C%20high%20contrast%2C%20white%20background%2C%20no%20text%2C%20no%20logo&image_size=square",
                        cover: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20creative%20studio%20desk%2C%20drawing%20tablet%20with%20stylus%2C%20illustration%20color%20swatches%2C%20sketchbook%2C%20soft%20daylight%2C%20editorial%20photography%2C%20no%20readable%20text%2C%20no%20logo&image_size=landscape_4_3",
                        url: "https://open.weixin.qq.com/qr/code?username=gh_9202586124b5",
                        stat: "商业插画训练",
                        tags: ["插画", "接单", "作品集"]
                      },
                      {
                        name: "闯关学Excel",
                        role: "闯关练习｜公式与报表",
                        bgColor: "bg-[#A3E635]",
                        avatar: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=clean%20flat%20icon%20illustration%20of%20a%20checklist%20and%20spreadsheet%20grid%2C%20minimal%2C%20high%20contrast%2C%20white%20background%2C%20no%20text%2C%20no%20logo&image_size=square",
                        cover: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20study%20workspace%2C%20laptop%20showing%20a%20spreadsheet%20exercise%20with%20blurred%20cells%2C%20notebook%20with%20checklist%2C%20timer%20and%20pen%2C%20clean%20daylight%2C%20editorial%20photography%2C%20no%20readable%20text%2C%20no%20logo&image_size=landscape_4_3",
                        url: "https://open.weixin.qq.com/qr/code?username=gh_3950de212d5c",
                        stat: "通关练习题库",
                        tags: ["Excel", "练习", "进阶"]
                      }
                    ]).map((creator, cIdx) => (
                      (() => {
                        const isWeChatQr = creator.url.includes('open.weixin.qq.com/qr/code');
                        const actionLabel = isWeChatQr ? '扫码关注' : '去主页';
                        const bottomCta = isWeChatQr ? '扫码 ➔' : '主页 ➔';
                        const title = isWeChatQr ? `点击扫码关注 @${creator.name} 微信服务` : `点击跳转至 @${creator.name} 主页`;
                        return (
                      <a
                        key={cIdx}
                        href={creator.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${creator.bgColor} text-black border-2 border-black rounded-xl p-1.5 flex flex-col justify-between h-[205px] sm:h-[245px] md:h-[215px] xl:h-[245px] neo-shadow-sm hover:-translate-y-[2px] hover:shadow-md active:translate-y-0 active:shadow-xs transition-all cursor-pointer group`}
                        title={title}
                      >
                        <div className="flex flex-col space-y-1">
                          {/* Showcase Cover Picture */}
                          <div className="w-full h-16 sm:h-24 overflow-hidden rounded-lg border-2 border-black bg-white relative shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                            <img 
                              src={creator.cover} 
                              alt={creator.name} 
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-300 ease-out"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0 pointer-events-none"></div>
                            <div className="absolute bottom-1 left-1 right-1 flex items-center justify-between gap-1">
                              <span className="bg-white/90 text-black border border-black/80 rounded px-1 py-[1px] text-[7px] font-mono font-black truncate">
                                {creator.stat}
                              </span>
                              <span className="bg-black/80 text-white border border-black rounded px-1 py-[1px] text-[7px] font-mono font-black">
                                {isWeChatQr ? (
                                  <>
                                    <Cpu size={10} className="inline-block -mt-[1px]" /> {actionLabel}
                                  </>
                                ) : (
                                  <>
                                    <Compass size={10} className="inline-block -mt-[1px]" /> {actionLabel}
                                  </>
                                )}
                              </span>
                            </div>
                          </div>

                          {/* Profile Avatar & Name row */}
                          <div className="flex items-center gap-1 pt-1">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden bg-white border border-black flex-shrink-0">
                              <img 
                                src={creator.avatar} 
                                alt={creator.name} 
                                loading="lazy"
                                decoding="async"
                                className={`w-full h-full ${creator.avatarFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h5 className="font-display font-black text-[7.5px] sm:text-[9.5px] leading-tight truncate text-black">
                                @{creator.name}
                              </h5>
                            </div>
                          </div>
                          
                          {/* Role tag */}
                          <div className="text-[7px] sm:text-[8px] leading-tight text-gray-800 font-sans line-clamp-1 border-t border-dashed border-black/30 pt-1">
                            {creator.role}
                          </div>

                          {!!creator.tags?.length && (
                            <div className="flex flex-wrap gap-0.5 pt-0.5">
                              {creator.tags.slice(0, 3).map((tag, tagIdx) => (
                                <span
                                  key={tagIdx}
                                  className="bg-white border border-black rounded px-1 py-[1px] text-[7px] sm:text-[8px] font-mono font-black leading-none"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Card footer details */}
                        <div className="mt-1 space-y-0.5 w-full">
                          <div className="bg-white border border-black rounded py-[1px] px-1 text-center scale-[0.95] origin-bottom">
                            <span className="font-mono font-black text-[7px] leading-none block truncate text-black">
                              {creator.stat}
                            </span>
                          </div>
                          <div className="bg-black text-white text-center rounded py-[2px] text-[7px] font-bold tracking-tight scale-[0.95] origin-bottom">
                            {bottomCta}
                          </div>
                        </div>
                      </a>
                        );
                      })()
                    ))}
                  </div>
                ) : (
                  /* Embedded dynamic CSS/SVG Neobrutalism Computer Vector */
                  <div className="w-full max-w-[210px] bg-white border-3 border-black rounded-2xl p-3 neo-shadow-sm space-y-2 select-none transform rotate-[1deg] hover:rotate-0 transition-transform">
                    
                    {/* Title Bar inside vector browser window */}
                    <div className="flex justify-between items-center border-b-2 border-black pb-1.5">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400 border border-black"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-black"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400 border border-black"></div>
                      </div>
                      <span className="text-[8px] font-mono font-black text-gray-400">DATA_FLOW_V26</span>
                    </div>

                    {/* Chart representation container */}
                    <div className="bg-gray-50 border-2 border-black rounded-lg p-2 h-24 relative overflow-hidden flex flex-col justify-between">
                      {/* Tiny bar lines indicating data */}
                      <div className="flex gap-1 text-[8px] font-mono leading-none font-bold text-gray-400">
                        <span className="bg-yellow-300 text-black px-1 rounded">GROW: MAX</span>
                      </div>

                      {/* Linear line graph drawn programmatically */}
                      <svg viewBox="0 0 100 50" className="w-full h-12 overflow-visible">
                        {/* Grid guidelines */}
                        <line x1="0" y1="40" x2="100" y2="40" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3,3" />
                        <line x1="0" y1="20" x2="100" y2="20" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3,3" />
                        {/* Actual viral line trend */}
                        <path 
                          d="M 0,45 Q 25,48 40,25 T 80,10 L 100,5" 
                          fill="none" 
                          stroke="#000000" 
                          strokeWidth="3.5" 
                        />
                        <path 
                          d="M 0,45 Q 25,48 40,25 T 80,10 L 100,5" 
                          fill="none" 
                          stroke={p.id === 'proj_01' || p.id === 'proj_01_copy' ? '#FF6B6B' : '#3B82F6'} 
                          strokeWidth="2" 
                        />
                        {/* Circle target nodes */}
                        <circle cx="40" cy="25" r="4.5" fill="#FFF" stroke="#000" strokeWidth="2" />
                        <circle cx="80" cy="10" r="4.5" fill="#A3E635" stroke="#000" strokeWidth="2" />
                      </svg>

                      {/* Metrics footer */}
                      <div className="flex justify-between items-center text-[7px] font-mono font-black">
                        <span>IP_LAUNCH: OK</span>
                        <span className="bg-black text-white px-1 leading-none rounded">ROI +342%</span>
                      </div>
                    </div>

                    {/* Small block rows */}
                    <div className="space-y-1">
                      <div className="h-2 bg-black rounded-sm w-3/4"></div>
                      <div className="h-1.5 bg-gray-200 rounded-sm w-1/2"></div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

      {/* Case Breakout Detail Overlay Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/60 overflow-y-auto flex items-start justify-center p-4 sm:p-5">
          <div className="relative w-full max-w-3xl max-h-[calc(100vh-1.5rem)] sm:max-h-[calc(100vh-2.5rem)] bg-white border-4 border-black rounded-3xl neo-shadow-xl animate-scale-in overflow-hidden flex flex-col my-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-20 bg-red-400 border-2 border-black rounded-lg p-1 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow transition-all cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Modal Content */}
            <div className="p-5 sm:p-8 pr-14 border-b-2 border-dashed border-gray-200 shrink-0 bg-white">
              <div>
                <span className="bg-[#A3E635] text-black text-[10px] font-mono font-bold px-2 py-0.5 border-2 border-black rounded-md neo-shadow-sm inline-block">
                  {selectedProject.platform} 深度溯源
                </span>
                
                <h3 className="font-display font-black text-2xl sm:text-3xl text-black mt-2 leading-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-xs font-mono font-bold text-gray-500 mt-0.5">
                  {selectedProject.subtitle}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-5 sm:py-6 space-y-5 sm:space-y-6">

              {/* Long editorial description */}
              <div className="bg-gray-50 border-2 border-black rounded-xl p-4 sm:p-5 text-gray-700 text-xs sm:text-sm font-sans leading-relaxed text-justify whitespace-pre-wrap">
                <p>{selectedProject.longDescription}</p>
              </div>

              {/* Grid performance indicators */}
              <div className="space-y-2">
                <h4 className="font-display font-black text-xs text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  <Activity size={12} /> 方案指标监控 (METRICS BOARD)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {selectedProject.metrics.map((m, idx) => (
                    <div key={idx} className="bg-white border-2 border-black rounded-xl p-3 neo-shadow-sm text-center">
                      <span className="text-[9px] font-mono text-gray-500 font-bold block truncate">{m.label}</span>
                      <div className="font-display font-black text-sm sm:text-base text-black mt-0.5">{m.value}</div>
                      {m.growth && <span className="text-[8px] font-mono text-green-600 bg-green-50 px-1 border border-green-200 rounded inline-block mt-0.5">{m.growth}</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenges vs. Solutions split panels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Challenger block */}
                <div className="border-2 border-black bg-red-50 rounded-xl p-4 space-y-2 text-black">
                  <h4 className="font-display font-black text-xs uppercase tracking-wider flex items-center gap-1 text-red-700">
                    <ShieldAlert size={14} /> 项目痛点与困境
                  </h4>
                  <ul className="space-y-1.5 text-xs font-sans list-decimal list-inside leading-relaxed text-gray-800">
                    {selectedProject.challenges.map((c, idx) => (
                      <li key={idx}>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solution block */}
                <div className="border-2 border-black bg-green-50 rounded-xl p-4 space-y-2 text-black">
                  <h4 className="font-display font-black text-xs uppercase tracking-wider flex items-center gap-1 text-green-700">
                    <CheckCircle2 size={14} /> 我们采取的破局动作
                  </h4>
                  <ul className="space-y-1.5 text-xs font-sans list-decimal list-inside leading-relaxed text-gray-800 flex-shrink-0">
                    {selectedProject.solutions.map((s, idx) => (
                      <li key={idx}>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Achievements banner */}
              <div className="border-2 border-black bg-yellow-50 rounded-xl p-4 space-y-1.5">
                <h4 className="font-display font-black text-xs text-yellow-800 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={14} className="fill-yellow-600 text-yellow-600" /> 直接斩获的最终增长战绩
                </h4>
                <ul className="space-y-1 text-xs font-sans list-inside list-disc text-gray-800 leading-normal">
                  {selectedProject.achievements.map((a, idx) => (
                    <li key={idx}>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end pt-2 border-t-2 border-dashed border-gray-150 sticky bottom-0 bg-white pb-1">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-black text-white px-5 py-2.5 rounded-xl border-2 border-black font-display font-bold text-xs neo-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-xs cursor-pointer"
                >
                  关闭该案例报告
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
