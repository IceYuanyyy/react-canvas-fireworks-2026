import React, { useState, useEffect, useRef } from 'react';
import FireworksCanvas, { FireworksCanvasHandle } from './components/FireworksCanvas';
import AuthorCard from './components/AuthorCard';

const App: React.FC = () => {
  const [phase, setPhase] = useState<'waiting' | 'intro' | 'counting' | 'celebrating'>('waiting');
  const [count, setCount] = useState(10);
  const [showAuthor, setShowAuthor] = useState(false);
  const canvasRef = useRef<FireworksCanvasHandle>(null);

  useEffect(() => {
    let timer: number;

    if (phase === 'intro') {
      // Trigger author name burst immediately
      canvasRef.current?.triggerNumberBurst("Yuan");

      // Hold intro for 5 seconds to let user read info
      timer = window.setTimeout(() => {
        setPhase('counting');
      }, 5000);
    }
    else if (phase === 'counting') {
      canvasRef.current?.triggerNumberBurst(count.toString());

      if (count > 0) {
        timer = window.setTimeout(() => setCount(prev => prev - 1), 1000);
      } else {
        setPhase('celebrating');
      }
    }

    return () => clearTimeout(timer);
  }, [phase, count]);

  const startCelebration = () => {
    setPhase('intro');
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
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 p-4">

        {phase === 'waiting' && (
          <div className="text-center animate-fade-in pointer-events-auto">
            <h2 className="text-yellow-400 font-orbitron text-xs md:text-sm tracking-[0.2em] md:tracking-[0.4em] mb-4 md:mb-8 uppercase font-bold drop-shadow-md">Ready for 2026?</h2>
            <button
              onClick={startCelebration}
              className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white font-orbitron px-8 py-3 md:px-12 md:py-4 rounded-full text-base md:text-xl tracking-widest transition-all transform hover:scale-110 shadow-[0_0_30px_rgba(220,38,38,0.5)] border border-white/20 active:scale-95"
            >
              START
            </button>
            <div className="mt-8 md:mt-12 text-yellow-100/80 font-orbitron text-[10px] tracking-widest uppercase">
              Created by <span className="text-yellow-400 font-bold">Yuan</span>
            </div>
          </div>
        )}

        {phase === 'intro' && (
          <div className="text-center animate-fade-in z-20 w-full max-w-lg px-4">
            <div className="mb-4 md:mb-6">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-tr from-purple-500 to-red-500 p-1 mx-auto shadow-[0_0_30px_rgba(168,85,247,0.4)] animate-bounce-slow">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                  <i className="fas fa-user-astronaut text-4xl md:text-5xl text-white"></i>
                </div>
              </div>
            </div>
            <p className="text-yellow-400 font-orbitron tracking-[0.2em] md:tracking-[0.4em] mb-2 md:mb-4 uppercase text-xs md:text-sm animate-pulse font-bold">Design & Code by</p>
            <h1 className="text-4xl md:text-7xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-400 mb-4 md:mb-6 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">
              Yuan
            </h1>

            {/* Social Info Display */}
            <div className="flex flex-col items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <div className="flex items-center space-x-2 md:space-x-3 text-yellow-100 font-orbitron text-xs md:text-sm bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
                <i className="fab fa-github text-lg md:text-xl text-yellow-400"></i>
                <span>github.com/IceYuanyyy</span>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3 text-yellow-100 font-orbitron text-xs md:text-sm bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
                <i className="fas fa-envelope text-lg md:text-xl text-yellow-400"></i>
                <span>ercurym86@gmail.com</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-yellow-200/80 text-[10px] md:text-sm font-orbitron tracking-widest uppercase">
              <span>Yantai, Shandong</span>
              <span className="hidden md:block w-1 h-1 bg-yellow-400/50 rounded-full" />
              <span>From SDTBU Student</span>
            </div>
          </div>
        )}

        {phase === 'celebrating' && (
          <div className="text-center w-full px-4">
            <div className="animate-celebrate">
              <h1 className="text-4xl md:text-9xl font-dancing text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-red-500 to-purple-600 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] mb-2 md:mb-4 leading-tight">
                Happy New Year
              </h1>
              <p className="text-5xl md:text-8xl font-orbitron font-bold tracking-[0.2em] md:tracking-[0.3em] text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
                2026
              </p>
              <button
                onClick={() => setPhase('waiting')}
                className="mt-12 md:mt-16 pointer-events-auto text-yellow-100/80 hover:text-white font-orbitron text-xs md:text-sm tracking-widest uppercase border border-white/20 px-6 py-2 rounded-full transition-all bg-white/5 backdrop-blur-sm"
              >
                Restart
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Author Info Toggle (Floating) */}
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-30 pointer-events-auto">
        <button
          onClick={() => setShowAuthor(true)}
          className="flex items-center space-x-3 text-white/80 hover:text-white transition-all group"
        >
          <span className="hidden md:block font-orbitron text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all">About Author</span>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-md group-hover:border-white/50 group-hover:scale-110 transition-all shadow-lg">
            <i className="fas fa-info text-xs md:text-sm"></i>
          </div>
        </button>
      </div>

      {/* Author Card Component */}
      <AuthorCard
        isOpen={showAuthor}
        onClose={() => setShowAuthor(false)}
      />

      {/* Removed dark overlay to fix "hazy" look */}

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
        @keyframes bounceSlow {
            0%, 100% { transform: translateY(-5%); }
            50% { transform: translateY(5%); }
        }
        .animate-bounce-slow {
            animation: bounceSlow 3s infinite ease-in-out;
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
