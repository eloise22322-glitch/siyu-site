import React from 'react';
import { Mail } from 'lucide-react';
import { Tab } from '../types';

interface NavbarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  onOpenContact: () => void;
}

export default function Navbar({ activeTab, setActiveTab, onOpenContact }: NavbarProps) {
  const navItems: { id: Tab; label: string; color: string }[] = [
    { id: 'home', label: '首页', color: 'border-[#FF6B6B]' },
    { id: 'about', label: '关于我', color: 'border-[#FDCC0D]' },
    { id: 'projects', label: '项目案例', color: 'border-[#3B82F6]' },
    { id: 'works', label: '作品集', color: 'border-[#A3E635]' },
    { id: 'aigc', label: 'AIGC画廊', color: 'border-[#8B5CF6]' },
  ];

  return (
    <nav className="w-full max-w-2xl md:max-w-3xl mx-auto px-3 sm:px-4 pt-3 sm:pt-5 pb-2 sticky top-2 sm:top-4 z-50">
      <div className="w-full bg-[#FAF9F6] rounded-[24px] px-2.5 sm:px-4 py-2 neo-shadow flex items-center gap-2 sm:gap-3">

        {/* Center: Elegant Text Nav Items */}
        <div className="flex-1 flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2.5 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative shrink-0 px-2.5 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-sm font-sans font-black transition-all select-none border-2 border-transparent outline-none whitespace-nowrap
                  ${isActive 
                    ? 'text-black bg-white border-black font-extrabold shadow-[2px_2px_0px_rgba(0,0,0,1)]' 
                    : 'text-gray-700 hover:text-black hover:bg-gray-100'
                  }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
 
        {/* Right Side: Black Envelope Button matching "Get in touch" icon box */}
        <button
          onClick={onOpenContact}
          className="w-8.5 h-8.5 sm:w-10 sm:h-10 bg-black text-white hover:text-yellow-300 rounded-[12px] neo-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center cursor-pointer shrink-0"
          title="和主理人聊聊"
        >
          <Mail size={15} />
        </button>

      </div>
    </nav>
  );
}
