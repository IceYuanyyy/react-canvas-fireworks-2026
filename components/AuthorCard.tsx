import React from 'react';

interface AuthorCardProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in pointer-events-auto" onClick={onClose}>
            <div
                className="relative w-[90%] md:w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(255,165,0,0.2)] transform animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute top-4 right-4 text-white/50 hover:text-white cursor-pointer" onClick={onClose}>
                    <i className="fas fa-times text-xl"></i>
                </div>

                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-1 bg-gradient-to-tr from-yellow-400 to-red-500 mb-4 md:mb-6 shadow-lg">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                            <i className="fas fa-user-astronaut text-3xl md:text-4xl text-white"></i>
                        </div>
                    </div>

                    <h2 className="text-xl md:text-2xl font-orbitron font-bold text-white mb-2">Yuan</h2>
                    <p className="text-yellow-400 font-medium mb-4 md:mb-6 text-sm md:text-base">山东烟台 · From SDTBU Student</p>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6 md:mb-8" />

                    {/* Social Links */}
                    <div className="grid grid-cols-1 gap-3 md:gap-4 w-full">
                        <a
                            href="https://github.com/IceYuanyyy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center p-3 md:p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all"
                        >
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gray-800 flex items-center justify-center mr-3 md:mr-4 group-hover:scale-110 transition-transform">
                                <i className="fab fa-github text-lg md:text-xl text-white"></i>
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest">GitHub</p>
                                <p className="text-xs md:text-sm text-white font-medium">IceYuanyyy</p>
                            </div>
                        </a>

                        <a
                            href="mailto:ercurym86@gmail.com"
                            className="group flex items-center p-3 md:p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all"
                        >
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-red-900/50 flex items-center justify-center mr-3 md:mr-4 group-hover:scale-110 transition-transform">
                                <i className="fas fa-envelope text-lg md:text-xl text-red-400"></i>
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest">Gmail</p>
                                <p className="text-xs md:text-sm text-white font-medium break-all">ercurym86@gmail.com</p>
                            </div>
                        </a>

                        <a
                            href="#"
                            className="group flex items-center p-3 md:p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all cursor-none"
                        >
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-blue-900/50 flex items-center justify-center mr-3 md:mr-4 group-hover:scale-110 transition-transform">
                                <i className="fab fa-qq text-lg md:text-xl text-blue-400"></i>
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest">QQ Mail</p>
                                <p className="text-xs md:text-sm text-white font-medium">1075676043@qq.com</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-slide-up {
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
        </div>
    );
};

export default AuthorCard;
