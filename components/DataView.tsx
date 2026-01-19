import React from 'react';

const DataView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-slate-500 p-6 text-center animate-fade-in">
      <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center mb-6 animate-pulse">
        <i className="fas fa-chart-line text-3xl"></i>
      </div>
      <h2 className="text-xl font-bold text-white mb-2">数据分析中心</h2>
      <p className="text-sm text-slate-600 mb-6 max-w-xs">
        高级图表功能正在开发中。未来将提供 1RM 估算、训练容量趋势图及疲劳度监控。
      </p>
      <span className="bg-slate-900 text-neon-yellow border border-yellow-900/30 text-[10px] px-2 py-1 rounded font-mono uppercase">
        Coming Soon
      </span>
    </div>
  );
};

export default DataView;