import React from 'react';
import { USER_PROFILE } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="mb-6">
      <div className="flex justify-between items-end mb-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter text-white">
            IRON<span className="text-neon-green">PATH</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono uppercase tracking-widest">
            {USER_PROFILE.name}
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500 uppercase">状态</div>
          <div className="text-sm font-mono text-neon-green">备战中</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-2">
        <div className="bg-slate-900 p-3 rounded border border-slate-800">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">卧推 (Bench)</div>
          <div className="text-lg font-bold text-slate-200 font-mono">{USER_PROFILE.stats.bench}</div>
        </div>
        <div className="bg-slate-900 p-3 rounded border border-slate-800">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">深蹲 (Squat)</div>
          <div className="text-lg font-bold text-slate-200 font-mono">{USER_PROFILE.stats.squat}</div>
        </div>
        <div className="bg-slate-900 p-3 rounded border border-slate-800">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">硬拉 (Deadlift)</div>
          <div className="text-lg font-bold text-slate-200 font-mono">{USER_PROFILE.stats.deadlift}</div>
        </div>
      </div>
      
      <div className="flex gap-2 text-[10px] text-slate-500 font-mono">
        <span className="bg-slate-800 px-2 py-1 rounded text-slate-400">
          {USER_PROFILE.stats.height} / {USER_PROFILE.stats.weight}
        </span>
        {USER_PROFILE.injuries.map((inj, idx) => (
          <span key={idx} className="bg-slate-900 border border-red-900/30 text-red-400 px-2 py-1 rounded flex items-center">
             <i className="fas fa-biohazard mr-1 text-[8px]"></i> {inj.split(' ')[0]}
          </span>
        ))}
      </div>
    </header>
  );
};

export default Header;