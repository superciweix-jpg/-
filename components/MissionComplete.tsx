import React from 'react';

interface MissionCompleteProps {
  stats: {
    duration: string;
    calories: string;
    exercisesCount: number;
  };
  onDismiss: () => void;
}

const MissionComplete: React.FC<MissionCompleteProps> = ({ stats, onDismiss }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black animate-fade-in">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800/20 via-black to-black"></div>
      
      <div className="relative w-full max-w-md p-8 text-center">
        {/* Animated Checkmark */}
        <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-neon-green bg-emerald-950/30 animate-[bounce_1s_ease-out]">
          <i className="fas fa-check text-5xl text-neon-green drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]"></i>
        </div>

        {/* Epic Title */}
        <h1 className="text-4xl font-black italic text-white mb-2 tracking-tighter animate-[slide-in-up_0.5s_ease-out]">
          MISSION <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-emerald-600">COMPLETE</span>
        </h1>
        
        <div className="h-0.5 w-24 bg-slate-700 mx-auto mb-8 animate-[width-grow_1s_ease-out]"></div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-10 animate-[fade-in-up_0.8s_ease-out_0.3s_both]">
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded">
            <div className="text-slate-500 text-xs uppercase font-bold mb-1">Duration</div>
            <div className="text-2xl font-mono text-white">{stats.duration}<span className="text-sm text-slate-500 ml-1">min</span></div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded">
            <div className="text-slate-500 text-xs uppercase font-bold mb-1">Energy</div>
            <div className="text-2xl font-mono text-white">{stats.calories}<span className="text-sm text-slate-500 ml-1">cal</span></div>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={onDismiss}
          className="w-full py-4 bg-white text-black font-bold uppercase tracking-[0.2em] hover:bg-slate-200 transition-colors animate-[fade-in-up_1s_ease-out_0.5s_both]"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default MissionComplete;