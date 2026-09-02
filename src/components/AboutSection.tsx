import React, { useState } from 'react';
import { EXPERIENCES_DATA, SKILLS_DATA } from '../data';
import { Award, GraduationCap, Laptop, Sparkles, Sliders, Check, Settings, Briefcase, RefreshCw } from 'lucide-react';

export default function AboutSection() {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(0);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-12 sm:space-y-16 animate-fade-in">
      
      {/* 1. Experiences Timeline Section (Directly Replicating Screenshot #5) */}
      <section className="bg-black text-white border-4 border-black rounded-3xl p-5 sm:p-10 lg:p-12 neo-shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
        
        {/* Left column (Title Block) */}
        <div className="lg:col-span-5 space-y-5">
          <span className="bg-[#A3E635] text-black text-xs font-mono font-bold px-2.5 py-1 border-2 border-black rounded-md neo-shadow-sm inline-block">
            EXPERIENCE
          </span>
          
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white leading-tight">
            <span className="bg-[#6366F1] text-white px-3 py-1 mt-1.5 inline-block border-2 border-white neo-shadow-sm rounded-lg transform rotate-[-1.5deg]">
              增长 × 产品运营经历
            </span>
          </h2>
          
          <p className="text-gray-400 font-sans text-xs sm:text-sm leading-relaxed max-w-md">
            4 年+ 新媒体与产品运营经验，覆盖职教、营养健康、家装 AI 等业务场景。擅长以内容为增长入口、以产品体验承接转化闭环，并将 AIGC 与自动化融入工作流提升交付效率。
          </p>

          {/* Core operating principles */}
          <div className="bg-zinc-900 border-2 border-zinc-800 rounded-2xl p-4 space-y-3 mt-4 neo-border-sm">
            <h4 className="font-display font-bold text-xs text-yellow-400 uppercase tracking-widest flex items-center gap-1">
              <Sparkles size={12} /> 我的核心运营价值观
            </h4>
            <ul className="space-y-2 text-xs font-sans text-gray-300">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-green-500" />
                <span>以用户路径与关键指标做决策，优先解决“能转化”的问题。</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-green-500" />
                <span>用增长实验驱动迭代：选题、封面、脚本、落地页到复盘闭环。</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-green-500" />
                <span>把 AIGC 与自动化变成生产力，让验证速度和产能都可规模化。</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right column (Experience Cards List - Connected Three-Stage Timeline) */}
        <div className="lg:col-span-7 relative space-y-5 sm:space-y-6 pl-5 sm:pl-8">
          {/* Vertical timeline connector line */}
          <div className="absolute left-2 sm:left-3 top-6 bottom-6 w-1 bg-white/15 rounded-full z-0"></div>
          
          {EXPERIENCES_DATA.map((exp, idx) => {
            const nodeColors = ['bg-[#FF6B6B]', 'bg-[#FDCC0D]', 'bg-[#3B82F6]'];
            const activeNodeColor = nodeColors[idx % nodeColors.length];
            return (
              <div key={exp.id} className="relative animate-fade-in" style={{ animationDelay: `${idx * 150}ms` }}>
                {/* Connected timeline node dot precisely centered on the vertical line */}
                <div className={`absolute left-[-17px] sm:left-[-23px] top-6 w-[18px] h-[18px] rounded-full border-3 border-black ${activeNodeColor} neo-shadow-sm flex items-center justify-center z-20`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                </div>

                <div
                  className="bg-[#FAF6F0] text-black border-4 border-black rounded-2xl p-5 sm:p-6 neo-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-default relative z-10"
                >
                  {/* Card Header */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b-2 border-dashed border-gray-200 pb-3 mb-4">
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-mono font-black border-2 border-black px-1.5 py-0.5 rounded bg-[#FAF9F6] neo-shadow-sm">
                        STAGE 0{idx + 1}
                      </span>
                      <div className={`w-8 h-8 rounded-full border-2 border-black ${activeNodeColor} flex items-center justify-center neo-shadow-sm`}>
                        <RefreshCw size={14} className="text-black animate-spin-slow" />
                      </div>
                    </div>

                    <h3 className="font-display font-black text-lg sm:text-xl text-black leading-snug">
                      {exp.role}
                    </h3>

                    <p className="font-mono text-xs text-gray-500 font-bold sm:ml-auto">
                      @{exp.company}
                    </p>
                  </div>

                  {(() => {
                    const items = exp.description
                      .split(/；\s*/g)
                      .map((s) => s.trim())
                      .filter(Boolean);
                    if (items.length <= 1) {
                      return (
                        <p className="text-xs sm:text-sm text-gray-700 font-sans mt-3 leading-relaxed">
                          {exp.description}
                        </p>
                      );
                    }
                    return (
                      <ul className="mt-3 space-y-2 text-xs sm:text-sm text-gray-700 font-sans leading-relaxed list-disc pl-5">
                        {items.map((t, tIdx) => (
                          <li key={tIdx}>{t}</li>
                        ))}
                      </ul>
                    );
                  })()}
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* 2. Skills sliders with Brutalist interactive grids */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="bg-[#FDCC0D] text-black text-xs font-mono font-bold px-2 py-1 border-2 border-black rounded-md neo-shadow-sm inline-block">
            SKILLSET MATRIX
          </span>
          <h2 className="font-display font-black text-3xl text-black">
            可交付的 <span className="bg-[#A3E635] text-black px-2 py-1 border-2 border-black rounded-lg inline-block neo-shadow-sm transform rotate-[1deg] transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:rotate-0">能力矩阵</span>
          </h2>
          <p className="text-gray-600 font-sans text-sm max-w-lg mx-auto">
            悬停或点击左侧能力项，查看对应的方法、工具栈与可复用的执行要点。
          </p>
        </div>

        {/* Skill Board Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Sliders panel */}
          <div className="md:col-span-7 space-y-5 sm:space-y-6 bg-[#FAF6F0] border-4 border-black rounded-3xl p-5 sm:p-6 neo-shadow">
            {SKILLS_DATA.map((skill, index) => {
              const isSelected = hoveredSkill === index;
              return (
                <div 
                  key={index}
                  onMouseEnter={() => setHoveredSkill(index)}
                  onClick={() => setHoveredSkill(index)}
                  className="space-y-2 group"
                >
                  <div className="flex justify-between items-end">
                    <span className="font-display font-black text-sm sm:text-base text-black flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-black"></span>
                      {skill.name}
                    </span>
                    <span className="font-mono text-xs font-bold bg-yellow-101 border border-black px-2 py-0.5 rounded">
                      {skill.score}%
                    </span>
                  </div>

                  {/* Neobrutalist custom slide track */}
                  <div className="relative w-full h-6 bg-gray-100 border-2 border-black rounded-lg overflow-hidden neo-shadow-sm">
                    <div 
                      className="h-full bg-[#A3E635] border-r-2 border-black transition-all duration-1000"
                      style={{ width: `${skill.score}%` }}
                    >
                      {/* Running gradient visual style strip */}
                      <div className="w-full h-full bg-stripe-pattern opacity-10"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Details side panel */}
          <div className="md:col-span-5">
            <div className="bg-[#3B82F6] text-white border-4 border-black rounded-3xl p-5 sm:p-6 neo-shadow h-full min-h-[280px] sm:min-h-[300px] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 border-b-2 border-black pb-3 mb-4">
                  <div className="w-8 h-8 rounded-lg border-2 border-black bg-white flex items-center justify-center neo-shadow-sm text-black">
                    <Sliders size={16} />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-base text-black">专业技能透视</h3>
                    <p className="text-[10px] font-mono font-bold text-blue-100">
                      INDICATOR ANALYSIS
                    </p>
                  </div>
                </div>

                {hoveredSkill !== null ? (
                  <div className="space-y-4 animate-scale-in">
                    <h4 className="font-display font-black text-lg text-black">
                      {SKILLS_DATA[hoveredSkill].name}
                    </h4>
                    <ul className="space-y-2.5 text-xs font-sans text-gray-100 list-inside leading-relaxed">
                      {SKILLS_DATA[hoveredSkill].details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <Check size={14} className="text-yellow-300 mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="py-8 text-center text-blue-100 font-sans text-sm flex flex-col items-center justify-center">
                    <Laptop size={36} className="text-white mb-2" />
                    <span>悬停或点击左侧能力项 <br /> 查看具体方法与工具栈</span>
                  </div>
                )}
              </div>

              {hoveredSkill !== null && (
                <div className="pt-4 border-t border-black/25 text-[10px] font-mono font-bold text-yellow-300 flex justify-between items-center">
                  <span>ACTIVE SCORE CHECKED</span>
                  <span>IP APPROVED ✓</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
