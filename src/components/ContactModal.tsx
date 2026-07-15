import React, { useState } from 'react';
import { X, Copy, Mail, MessageCircle, Check } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedWeChat, setCopiedWeChat] = useState(false);

  if (!isOpen) return null;

  const copyEmailAction = () => {
    navigator.clipboard.writeText('bsiyv@outlook.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyWeChatAction = () => {
    navigator.clipboard.writeText('SYoOToDo');
    setCopiedWeChat(true);
    setTimeout(() => setCopiedWeChat(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-3 sm:p-4">
      {/* Container */}
      <div className="relative w-full max-w-lg bg-[#FAFAFA] border-4 border-black rounded-3xl p-5 sm:p-8 neo-shadow-xl animate-scale-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-[#FF6B6B] border-2 border-black rounded-lg p-1.5 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-sm active:translate-y-[2px] cursor-pointer"
        >
          <X size={18} className="text-black" />
        </button>

        <div>
          <div className="mb-5 sm:mb-6 pr-8 sm:pr-10">
            <span className="bg-[#A3E635] text-black text-xs font-mono font-bold px-2 py-1 border-2 border-black rounded-md neo-shadow-sm inline-block">
              CONTACT
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-black mt-2 leading-none">
              直接联系
            </h3>
            <p className="text-gray-700 font-sans text-[13px] sm:text-sm mt-1 leading-relaxed">
              欢迎通过下方方式直接沟通合作或面试相关事宜，添加时请备注【公司+岗位】。
            </p>
          </div>

          <div className="pt-5 border-t-2 border-dashed border-black">
            <p className="text-xs font-mono font-bold text-gray-500 mb-2 uppercase">
              DIRECT CONTACT
            </p>

            <div className="grid grid-cols-1 gap-3">
              <div className="bg-white border-2 border-black rounded-lg p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-bold">
                <a href="mailto:bsiyv@outlook.com" className="flex items-center gap-2 hover:underline">
                  <Mail size={14} className="text-red-500" />
                  <span className="break-all">邮箱：bsiyv@outlook.com</span>
                </a>
                <button
                  onClick={copyEmailAction}
                  type="button"
                  className="bg-black text-white text-[10px] px-2 py-1 rounded border border-black hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer flex items-center gap-1 self-stretch sm:self-auto justify-center"
                >
                  {copiedEmail ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedEmail ? '已复制' : '复制'}</span>
                </button>
              </div>

              <div className="bg-white border-2 border-black rounded-lg p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-bold">
                <div className="flex items-center gap-2">
                  <MessageCircle size={14} className="text-green-600" />
                  <span>微信：SYoOToDo</span>
                </div>
                <button
                  onClick={copyWeChatAction}
                  type="button"
                  className="bg-black text-white text-[10px] px-2 py-1 rounded border border-black hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer flex items-center gap-1 self-stretch sm:self-auto justify-center"
                >
                  {copiedWeChat ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedWeChat ? '已复制' : '复制'}</span>
                </button>
              </div>
            </div>

            <p className="mt-3 text-[11px] font-sans text-gray-600 leading-relaxed">
              提示：复制微信号后，在微信内搜索添加即可。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
