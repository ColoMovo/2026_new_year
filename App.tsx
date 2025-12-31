
import React, { useState, useEffect } from 'react';
import Fireworks from './components/Fireworks';
import BlessingOverlay from './components/BlessingOverlay';
import SoundControl from './components/SoundControl';
import FlipClock from './components/FlipClock';
import { calculateCountdown } from './utils/time';
import { Calendar, Zap } from 'lucide-react';

const App = () => {
  const [countdown, setCountdown] = useState(calculateCountdown());
  const [isCelebrating, setIsCelebrating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = calculateCountdown();
      setCountdown(next);
      if (next.isTargetReached && !isCelebrating) {
        setIsCelebrating(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isCelebrating]);

  const handleManualTrigger = () => setIsCelebrating(true);
  const resetCelebration = () => setIsCelebrating(false);

  const backgroundImageUrl = "https://images.unsplash.com/photo-1579227114347-15d08fc37cae?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#800]">
      <div 
        className={`absolute inset-0 z-0 transition-all duration-[2000ms] transform-gpu ${
          isCelebrating ? 'scale-100 blur-0 opacity-100' : 'scale-105 blur-[30px] opacity-40'
        }`}
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className={`absolute inset-0 z-[1] transition-opacity duration-1500 ${isCelebrating ? 'bg-red-900/10' : 'bg-black/60'}`} />

      {isCelebrating && (
        <>
          <Fireworks />
          <BlessingOverlay />
          
          <div className="fixed inset-0 z-20 flex flex-col items-center justify-center animate-scroll-in px-4 pointer-events-none">
            <div className="relative bg-[#d4af37] p-1 rounded-lg shadow-[0_0_60px_rgba(212,175,55,0.6)]">
              <div className="bg-[#b91c1c] px-8 py-10 md:px-20 md:py-16 rounded-sm border-4 border-[#d4af37] flex flex-col items-center gap-4">
                <h1 className="text-6xl md:text-9xl font-festive text-yellow-400 drop-shadow-lg text-center">
                  元旦快乐
                </h1>
                <div className="h-px w-full bg-yellow-400/50 my-2"></div>
                <p className="text-2xl md:text-5xl font-festive text-white tracking-[0.3em]">恭贺新禧 · 马到成功</p>
              </div>
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-full bg-[#8b0000] rounded-l-full shadow-lg border-r-4 border-yellow-600"></div>
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-full bg-[#8b0000] rounded-r-full shadow-lg border-l-4 border-yellow-600"></div>
            </div>
          </div>

          <button 
            onClick={resetCelebration}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-10 py-3 rounded-full bg-yellow-500 text-red-900 font-black shadow-2xl hover:bg-yellow-400 active:scale-90 transition-all"
          >
            返回倒计时
          </button>
        </>
      )}

      <div className={`relative z-10 flex flex-col items-center justify-center min-h-screen transition-all duration-1000 ${isCelebrating ? 'opacity-0 scale-90 translate-y-10' : 'opacity-100'}`}>
        <div className="mb-12 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-red-900/60 text-yellow-500 border border-yellow-500/30 mb-8 backdrop-blur-xl">
            <Calendar size={20} className="animate-pulse" />
            <span className="text-xs font-bold tracking-[0.4em]">2026 跨年倒计时</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-festive text-white mb-6 drop-shadow-2xl">
            辞旧迎新 · <span className="text-yellow-400">马到成功</span>
          </h2>
          <p className="text-white/70 tracking-[0.5em] text-sm md:text-base uppercase font-medium">离 2026 年元旦零点还有</p>
        </div>

        <div className="mb-20 transform scale-110 md:scale-150">
          <FlipClock {...countdown} />
        </div>

        <button
          onClick={handleManualTrigger}
          className="group relative flex items-center gap-6 px-12 py-6 bg-gradient-to-r from-red-600 to-red-800 rounded-full shadow-[0_20px_50px_rgba(180,0,0,0.5)] active:scale-95 transition-all border border-yellow-500/20"
        >
          <Zap className="text-yellow-400 fill-current group-hover:rotate-12" size={28} />
          <span className="text-2xl font-black text-white tracking-[0.3em]">立即体验 2026</span>
        </button>
      </div>

      <SoundControl isCelebrating={isCelebrating} />

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scroll-in {
          0% { opacity: 0; transform: scaleX(0.1) scaleY(0.5); }
          100% { opacity: 1; transform: scaleX(1) scaleY(1); }
        }
        .animate-scroll-in { animation: scroll-in 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67) forwards; }
      `}</style>
    </div>
  );
};

export default App;
