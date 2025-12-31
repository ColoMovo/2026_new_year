
import React, { useState, useEffect, useCallback } from 'react';
import { Blessing } from '../types';
import { BLESSINGS, FESTIVE_COLORS, TEXT_COLORS } from '../constants';

const BlessingOverlay: React.FC = () => {
  const [activeBlessings, setActiveBlessings] = useState<any[]>([]);

  const spawnBlessing = useCallback(() => {
    const id = Math.random().toString(36).substr(2, 9);
    const text = BLESSINGS[Math.floor(Math.random() * BLESSINGS.length)];
    const colorIdx = Math.floor(Math.random() * FESTIVE_COLORS.length);
    const bgColor = FESTIVE_COLORS[colorIdx];
    const textColor = TEXT_COLORS[colorIdx];
    
    /**
     * Constraints to prevent bleeding off screen:
     * - We use translate(-50%, -50%) to center the element on the point.
     * - We restrict the random range to 15% - 85% width/height.
     * - This ensures that even with long text, most of the tag stays visible.
     */
    const x = 15 + Math.random() * 70;
    const y = 15 + Math.random() * 70;

    const newBlessing = {
      id,
      text,
      x,
      y,
      color: textColor,
      bgColor: bgColor,
      textColor: textColor,
      scale: 0.85 + Math.random() * 0.3,
      rotation: (Math.random() - 0.5) * 12
    };

    setActiveBlessings(prev => [...prev.slice(-35), newBlessing]);

    // Faster lifecycle for more dynamic effect
    setTimeout(() => {
      setActiveBlessings(prev => prev.filter(b => b.id !== id));
    }, 2200);
  }, []);

  useEffect(() => {
    // Increased spawn rate to accommodate more blessing phrases
    const interval = setInterval(spawnBlessing, 300);
    return () => clearInterval(interval);
  }, [spawnBlessing]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {activeBlessings.map((b) => (
        <div
          key={b.id}
          className="absolute transform-gpu"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            opacity: 0,
            animation: 'constrainedFloat 2.2s ease-in-out forwards',
            zIndex: Math.floor(b.y)
          }}
        >
          <div 
            className="px-4 py-2.5 rounded-xl border border-white/20 shadow-2xl whitespace-nowrap font-bold flex items-center gap-2 transform"
            style={{ 
              backgroundColor: b.bgColor,
              color: b.textColor,
              transform: `translate(-50%, -50%) scale(${b.scale}) rotate(${b.rotation}deg)`,
              boxShadow: `0 12px 30px -8px rgba(0,0,0,0.4)`
            }}
          >
            {b.text}
          </div>
        </div>
      ))}
      <style>{`
        @keyframes constrainedFloat {
          0% { 
            opacity: 0; 
            transform: scale(0.5) translateY(20px); 
          }
          15% { 
            opacity: 1; 
            transform: scale(1.05) translateY(0); 
          }
          85% { 
            opacity: 1; 
            transform: scale(1) translateY(-10px); 
          }
          100% { 
            opacity: 0; 
            transform: scale(0.9) translateY(-25px); 
          }
        }
      `}</style>
    </div>
  );
};

export default BlessingOverlay;
