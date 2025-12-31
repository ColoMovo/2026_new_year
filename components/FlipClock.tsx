
import React, { useState, useEffect } from 'react';

interface FlipUnitProps {
  value: number;
  label: string;
}

const FlipDigit: React.FC<{ current: number }> = ({ current }) => {
  const [prev, setPrev] = useState(current);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (current !== prev) {
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setPrev(current);
        setIsFlipping(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [current, prev]);

  return (
    <div className="relative w-12 h-20 md:w-16 md:h-24 bg-[#1a1a1a] rounded-lg text-4xl md:text-6xl font-bold flex flex-col perspective-1000 overflow-visible">
      {/* Top half - Static Next */}
      <div className="absolute inset-0 flex flex-col">
        <div className="h-1/2 bg-[#2a2a2a] rounded-t-lg border-b border-black/20 flex items-end justify-center overflow-hidden">
          <span className="leading-none transform translate-y-1/2">{current}</span>
        </div>
        <div className="h-1/2 bg-[#222] rounded-b-lg flex items-start justify-center overflow-hidden">
          <span className="leading-none transform -translate-y-1/2">{prev}</span>
        </div>
      </div>

      {/* Flipping Top - Current moving down */}
      <div 
        className={`absolute inset-0 flex flex-col z-20 transition-transform duration-600 preserve-3d origin-bottom ${isFlipping ? 'animate-flip-top' : ''}`}
        style={{ height: '50%' }}
      >
        <div className="h-full bg-[#2a2a2a] rounded-t-lg border-b border-black/20 flex items-end justify-center overflow-hidden backface-hidden">
          <span className="leading-none transform translate-y-1/2">{prev}</span>
        </div>
      </div>

      {/* Flipping Bottom - Next being revealed */}
      <div 
        className={`absolute inset-x-0 bottom-0 h-1/2 flex flex-col z-10 transition-transform duration-600 preserve-3d origin-top ${isFlipping ? 'animate-flip-bottom' : ''}`}
      >
        <div className="h-full bg-[#222] rounded-b-lg flex items-start justify-center overflow-hidden backface-hidden rotate-x-180">
          <span className="leading-none transform -translate-y-1/2">{current}</span>
        </div>
      </div>

      {/* Middle Line shadow */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/40 z-30" />
    </div>
  );
};

const FlipUnit: React.FC<FlipUnitProps> = ({ value, label }) => {
  const digits = String(value).padStart(2, '0').split('').map(Number);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-1 md:gap-2">
        {digits.map((d, i) => (
          <FlipDigit key={i} current={d} />
        ))}
      </div>
      <span className="text-red-500 font-bold tracking-widest text-sm md:text-base uppercase">{label}</span>
    </div>
  );
};

interface FlipClockProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const FlipClock: React.FC<FlipClockProps> = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-12 px-4">
      <FlipUnit value={days} label="Days" />
      <FlipUnit value={hours} label="Hours" />
      <FlipUnit value={minutes} label="Mins" />
      <FlipUnit value={seconds} label="Secs" />
    </div>
  );
};

export default FlipClock;
