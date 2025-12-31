
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundControlProps {
  isCelebrating: boolean;
}

const SoundControl: React.FC<SoundControlProps> = ({ isCelebrating }) => {
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  // Function to simulate firework sound using Web Audio API
  const playExplosion = () => {
    if (isMuted || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(100 + Math.random() * 200, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.5);

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.5);
  };

  useEffect(() => {
    if (isCelebrating && !isMuted) {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const interval = setInterval(() => {
        if (Math.random() > 0.7) playExplosion();
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isCelebrating, isMuted]);

  return (
    <button
      onClick={() => setIsMuted(!isMuted)}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-white"
    >
      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
    </button>
  );
};

export default SoundControl;
