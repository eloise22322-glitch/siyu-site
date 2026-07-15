import React, { useMemo, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface AvatarProps {
  variant?: 'circle' | 'square';
  className?: string;
  size?: number;
  showInfo?: boolean;
  src?: string;
  alt?: string;
  frame?: boolean;
}

export default function Avatar({
  variant = 'circle',
  className = '',
  size = 300,
  showInfo = true,
  src,
  alt,
  frame = true,
}: AvatarProps) {
  const avatar = {
    name: "司予Eloise",
    role: "AIGC · 新媒体 & 产品运营专家",
    bgColor: "bg-[#FF6B6B]",
    borderColor: "border-[#FF6B6B]",
    svg: (
      <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Coral background */}
        <circle cx="200" cy="200" r="185" fill="#FF6B6B" stroke="#000000" strokeWidth="8" />
        
        {/* Yellow sweater with dots */}
        <path d="M 120,380 C 130,240 270,240 280,380 Z" fill="#FACC15" stroke="#000000" strokeWidth="8" />
        
        {/* Pattern dots on sweater */}
        <circle cx="150" cy="280" r="8" fill="#FF6B6B" stroke="#000000" strokeWidth="4" />
        <circle cx="170" cy="330" r="8" fill="#FF6B6B" stroke="#000000" strokeWidth="4" />
        <circle cx="210" cy="290" r="8" fill="#FF6B6B" stroke="#000000" strokeWidth="4" />
        <circle cx="250" cy="280" r="8" fill="#FF6B6B" stroke="#000000" strokeWidth="4" />
        <circle cx="230" cy="340" r="8" fill="#FF6B6B" stroke="#000000" strokeWidth="4" />
        
        {/* Neck */}
        <rect x="175" y="195" width="50" height="50" rx="10" fill="#FFF2E0" stroke="#000000" strokeWidth="8" />
        {/* Sweater Collar */}
        <ellipse cx="200" cy="245" rx="35" ry="12" fill="#FACC15" stroke="#000000" strokeWidth="8" />

        {/* Head */}
        <path d="M 145,170 C 145,100 255,100 255,170 C 255,215 145,215 145,170 Z" fill="#FFF2E0" stroke="#000000" strokeWidth="8" />
        
        {/* Ears */}
        <circle cx="140" cy="170" r="15" fill="#FFF2E0" stroke="#000000" strokeWidth="8" />
        <circle cx="260" cy="170" r="15" fill="#FFF2E0" stroke="#000000" strokeWidth="8" />

        {/* Beard - Black */}
        <path d="M 145,175 C 145,225 255,225 255,175 C 240,195 160,195 145,175 Z" fill="#1F2937" stroke="#000000" strokeWidth="6" />
        <path d="M 175,190 C 200,210 200,210 225,190 Z" fill="#1F2937" stroke="#000000" strokeWidth="6" />
        
        {/* Black hair / wig */}
        <path d="M 140,150 C 130,100 170,40 200,60 C 230,40 270,100 260,150 C 250,130 250,110 230,120 C 210,130 190,135 170,120 C 150,110 150,130 140,150 Z" fill="#1F2937" stroke="#000000" strokeWidth="8" />

        {/* Eyes */}
        <circle cx="180" cy="150" r="6" fill="#000000" />
        <circle cx="220" cy="150" r="6" fill="#000000" />
        
        {/* Eye Brows */}
        <path d="M 170,138 Q 180,134 190,138" stroke="#000000" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M 210,138 Q 220,134 230,138" stroke="#000000" strokeWidth="4" fill="none" strokeLinecap="round" />

        {/* Nose */}
        <path d="M 200,150 Q 195,165 200,165" stroke="#000000" strokeWidth="4" fill="none" strokeLinecap="round" />

        {/* Cheerful Mouth */}
        <path d="M 190,180 Q 200,192 210,180" stroke="#000000" strokeWidth="5" fill="none" strokeLinecap="round" />

        {/* Laptop Frame (Beautifying on bottom right) */}
        <g transform="translate(230, 260)">
          {/* Laptops */}
          <path d="M 10,120 L 70,20 L 130,45 L 80,140 Z" fill="#1F2937" stroke="#000000" strokeWidth="8" />
          <ellipse cx="65" cy="85" rx="10" ry="10" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
        </g>
        
        {/* Hands holding the laptop */}
        <path d="M 270,300 Q 285,285 300,315" stroke="#000000" strokeWidth="8" fill="none" strokeLinecap="round" />
        <circle cx="272" cy="290" r="10" fill="#FFF2E0" stroke="#000000" strokeWidth="4" />
      </svg>
    )
  };

  const [imageError, setImageError] = useState(false);
  const imageSrc = useMemo(() => src ?? '/avatar.png', [src]);
  const imageAlt = useMemo(() => alt ?? avatar.name, [alt]);

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Neobrutalist frame container */}
      <div 
        className={`relative ${
          variant === 'circle' 
            ? 'rounded-full' 
            : 'rounded-3xl'
          } ${frame ? 'border-4 border-black neo-shadow-lg bg-white' : ''} overflow-hidden max-w-full max-h-full aspect-square`}
        style={{ width: size, height: size }}
      >
        {!imageError ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
          />
        ) : (
          avatar.svg
        )}
      </div>

      {/* Info indicator */}
      {showInfo && (
        <div className="mt-5 text-center flex flex-col items-center min-h-[56px]">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-black text-xl text-black">{avatar.name}</span>
            <Sparkles size={16} className="text-yellow-500 fill-yellow-500" />
          </div>
          <p className="text-sm font-mono text-gray-700 bg-white border border-black px-2 py-0.5 rounded-md mt-1 neo-shadow-sm inline-block">
            {avatar.role}
          </p>
        </div>
      )}
    </div>
  );
}
