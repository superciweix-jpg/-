import React from 'react';
import { USER_PROFILE } from '../constants';

const ProfileView: React.FC = () => {
  return (
    <div className="p-6 pb-32 animate-fade-in text-white">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-3xl text-slate-500 overflow-hidden shadow-lg">
          <i className="fas fa-user-astronaut"></i>
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight">{USER_PROFILE.name}</h1>
          <p className="text-xs text-neon-green font-mono uppercase tracking-widest mt-1">
            ELITE MEMBER
          </p>
          <div className="flex gap-2 mt-2">
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-mono border border-slate-700">
               {USER_PROFILE.stats.height}
            </span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-mono border border-slate-700">
               {USER_PROFILE.stats.weight}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">力量数据 (MAX)</h2>
      <div className="grid grid-cols-1 gap-3 mb-8">
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded bg-slate-950 flex items-center justify-center text-slate-400">
               <span className="font-black text-lg">B</span>
             </div>
             <div>
               <div className="text-xs text-slate-500 uppercase">平板卧推</div>
               <div className="text-sm font-bold text-slate-300">Bench Press</div>
             </div>
          </div>
          <div className="text-xl font-mono font-bold text-white">{USER_PROFILE.stats.bench}</div>
        </div>

        <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded bg-slate-950 flex items-center justify-center text-slate-400">
               <span className="font-black text-lg">S</span>
             </div>
             <div>
               <div className="text-xs text-slate-500 uppercase">深蹲</div>
               <div className="text-sm font-bold text-slate-300">Squat</div>
             </div>
          </div>
          <div className="text-xl font-mono font-bold text-white">{USER_PROFILE.stats.squat}</div>
        </div>

        <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded bg-slate-950 flex items-center justify-center text-slate-400">
               <span className="font-black text-lg">D</span>
             </div>
             <div>
               <div className="text-xs text-slate-500 uppercase">硬拉</div>
               <div className="text-sm font-bold text-slate-300">Deadlift</div>
             </div>
          </div>
          <div className="text-xl font-mono font-bold text-white">{USER_PROFILE.stats.deadlift}</div>
        </div>
      </div>

      {/* Injuries */}
      <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">伤病管理 (MANAGEMENT)</h2>
      <div className="space-y-2 mb-8">
        {USER_PROFILE.injuries.map((inj, idx) => (
          <div key={idx} className="bg-slate-950 border border-red-900/30 text-red-400 px-4 py-3 rounded-lg flex items-center gap-3">
             <i className="fas fa-biohazard text-lg opacity-50"></i>
             <span className="text-sm font-bold">{inj}</span>
          </div>
        ))}
      </div>
      
      {/* App Info */}
      <div className="text-center pt-8 border-t border-slate-800/50">
        <h3 className="text-slate-200 font-bold italic tracking-tighter text-xl">无限进步</h3>
        <p className="text-[10px] text-slate-600 uppercase font-mono mt-1">Version 2.0.0 (Bottom Dock)</p>
      </div>
    </div>
  );
};

export default ProfileView;