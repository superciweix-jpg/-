import React from 'react';
import { HistoryRecord } from '../types';

interface HistoryViewProps {
  history: HistoryRecord[];
}

const HistoryView: React.FC<HistoryViewProps> = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-600 animate-fade-in">
        <i className="fas fa-ghost text-4xl mb-4 opacity-50"></i>
        <p className="text-sm font-mono uppercase">暂无训练记录</p>
        <p className="text-xs text-slate-700 mt-2">完成一次训练来点亮这里</p>
      </div>
    );
  }

  // Sort descending by completion time
  const sortedHistory = [...history].sort((a, b) => b.completedAt - a.completedAt);

  return (
    <div className="p-6 pb-32 animate-fade-in">
      <h2 className="text-2xl font-black italic text-white uppercase tracking-tighter mb-6">
        训练日志 <span className="text-slate-600 text-sm not-italic ml-2 font-mono">LOGS</span>
      </h2>

      <div className="space-y-4">
        {sortedHistory.map((record) => (
          <div key={record.id} className="bg-slate-900 border border-slate-800 rounded-lg p-4 shadow-sm hover:border-slate-600 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-white font-bold text-lg">{record.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-neon-green font-mono font-bold bg-green-950/30 px-1.5 rounded">{record.dayName}</span>
                  <span className="text-xs text-slate-500 font-mono">{record.date}</span>
                </div>
              </div>
              <div className="text-right">
                <i className="fas fa-check-circle text-emerald-600"></i>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 border-t border-slate-800/50 pt-3">
              <div>
                <div className="text-[9px] text-slate-500 uppercase font-bold">时长</div>
                <div className="text-sm text-slate-200 font-mono">{record.duration} MIN</div>
              </div>
              <div>
                <div className="text-[9px] text-slate-500 uppercase font-bold">热量</div>
                <div className="text-sm text-slate-200 font-mono">{record.calories} KCAL</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryView;