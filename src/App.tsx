/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Marquee from './components/Marquee';
import ContactModal from './components/ContactModal';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import ProjectSection from './components/ProjectSection';
import WorkSection from './components/WorkSection';
import AigcSection from './components/AigcSection';
import FoodPickerPage from './pages/FoodPickerPage';
import { Tab } from './types';
import { Heart } from 'lucide-react';

export default function App() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';

  if (pathname.startsWith('/food-picker')) {
    return <FoodPickerPage />;
  }

  return <PortfolioApp />;
}

function PortfolioApp() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isOpenContact, setIsOpenContact] = useState<boolean>(false);

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'home':
        return <HomeSection onNavigate={setActiveTab} onOpenContact={() => setIsOpenContact(true)} />;
      case 'about':
        return <AboutSection />;
      case 'projects':
        return <ProjectSection />;
      case 'works':
        return <WorkSection />;
      case 'aigc':
        return <AigcSection />;
      default:
        return <HomeSection onNavigate={setActiveTab} onOpenContact={() => setIsOpenContact(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1a1a1a] font-sans pb-12 sm:pb-16 selection:bg-[#E63946] selection:text-white">
      {/* 2. Floating Neobrutalist Navbar (Required Tabs) */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenContact={() => setIsOpenContact(true)} 
      />

      {/* 4. Core Render Workspace */}
      <main className="w-full py-2 sm:py-4 min-h-[500px]">
        {renderActiveSection()}
      </main>

      {/* 5. Second reverse Marquee at the bottom to balance composition */}
      {activeTab === 'home' && (
        <div className="-mt-4">
          <Marquee 
            items={[
              "爆款图文代运营", "文案金句策划", "精准引流获客", "10W+常驻在看率",
              "打工人的情绪网感", "AIGC 提效工作流", "私域留存复购率 68%"
            ]} 
            speed={20} 
            bgColor="bg-[#FDCC0D]" 
            textColor="text-black" 
            rotateDegrees="rotate-1" 
          />
        </div>
      )}

      {/* 6. High-Contrast Footer (Replicating design honesty) */}
      <footer className="w-full max-w-4xl mx-auto px-4 mt-12 sm:mt-16">
        <div className="bg-white border-4 border-[#1a1a1a] rounded-3xl p-5 sm:p-8 neo-shadow-md grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
          
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-[#1a1a1a] bg-[#1a1a1a] flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-[#FAF9F6]"></div>
              </div>
              <span className="font-display font-black text-base sm:text-lg select-none text-[#1a1a1a]">司予Eloise AIGC LAB</span>
            </div>
            <p className="text-xs text-gray-500 font-sans leading-relaxed max-w-lg">
              专注探索当代青年消费人群文化，以像素级网感内容，帮助品牌在微信/小红书/知乎开疆拓土。打破常规滤镜，用新粗野主义美学传递不注水的真实数据与纯天然留存。
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col items-start md:items-end gap-3 border-t-2 border-dashed border-gray-150 pt-5 md:pt-0 md:border-t-0">
            <span className="bg-[#A3E635] text-black border-2 border-[#1a1a1a] rounded px-2.5 py-0.5 text-[10px] font-mono font-bold leading-none neo-shadow-sm select-none">
              ✓ 2026 IP CERTIFIED
            </span>
            <div className="text-xs font-display font-black text-[#1a1a1a] text-left md:text-right">
              爆款放左 ⬥ 盈利放右
            </div>
            <div className="text-[10px] font-mono font-bold text-gray-400 flex items-center gap-1 flex-wrap">
              <span>DESIGNED BY LINUS WITH</span>
              <Heart size={8} className="fill-[#E63946] text-[#E63946] animate-pulse-slow" />
            </div>
          </div>

        </div>
      </footer>

      {/* 7. Shared Consultation Modal Dialog */}
      <ContactModal 
        isOpen={isOpenContact} 
        onClose={() => setIsOpenContact(false)} 
      />
    </div>
  );
}
