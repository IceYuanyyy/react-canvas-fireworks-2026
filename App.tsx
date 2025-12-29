import React, { useState, useEffect, useRef } from 'react';
import FireworksCanvas, { FireworksCanvasHandle } from './components/FireworksCanvas';

const App: React.FC = () => {
  const [phase, setPhase] = useState<'waiting' | 'counting' | 'celebrating'>('waiting');
  const [count, setCount] = useState(10);
  const canvasRef = useRef<FireworksCanvasHandle>(null);

  useEffect(() => {
    let timer: number;
    if (phase === 'counting') {
      // Trigger the particle burst for the current number
      canvasRef.current?.triggerNumberBurst(count.toString());
      
      if (count > 0) {
        timer = window.setTimeout(() => {
          setCount(prev => prev - 1);
        }, 1000);
      } else {
        setPhase('celebrating');
      }
    }
    return () => clearTimeout(timer);
  }, [phase, count]);

  const startCelebration = () => {
    setPhase('counting');
    setCount(10);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden select-none">
      {/* Background Fireworks Engine */}
      <FireworksCanvas 
        ref={canvasRef}
        phase={phase}
      />

      {/* Main UI Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        
        {phase === 'waiting' && (
          <div className="text-center animate-fade-in pointer-events-auto">
            <button 
              onClick={startCelebration}
              className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white font-orbitron px-12 py-4 rounded-full text-xl tracking-widest transition-all transform hover:scale-110 shadow-[0_0_30px_rgba(220,38,38,0.5)] border border-white/20 active:scale-95"
            >
              START CELEBRATION
            </button>
          </div>
        )}

        {/* Phase: Counting is handled entirely by particles in FireworksCanvas */}

        {phase === 'celebrating' && (
          <div className="text-center animate-celebrate">
            <h1 className="text-7xl md:text-9xl font-dancing text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-red-500 to-purple-600 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] mb-4">
              Happy New Year
            </h1>
            <p className="text-5xl md:text-8xl font-orbitron font-bold tracking-[0.3em] text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
              2026
            </p>
            <button 
              onClick={() => setPhase('waiting')}
              className="mt-16 pointer-events-auto text-white/50 hover:text-white font-orbitron text-sm tracking-widest uppercase border border-white/20 px-6 py-2 rounded-full transition-all bg-white/5 backdrop-blur-sm"
            >
              Restart
            </button>
          </div>
        )}
      </div>

      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_black_95%)] z-20" />
      </div>

      <style>{`
        @keyframes celebrate {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-celebrate {
          animation: celebrate 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;