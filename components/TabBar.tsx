import React from 'react';
import { triggerFeedback } from '../utils/feedback';

type TabType = 'training' | 'history' | 'data' | 'profile';

interface TabBarProps {
  current: TabType;
  onSelect: (tab: TabType) => void;
}

const TabBar: React.FC<TabBarProps> = ({ current, onSelect }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'training', label: '训练', icon: 'fa-dumbbell' },
    { id: 'history', label: '历史', icon: 'fa-clock-rotate-left' },
    { id: 'data', label: '数据', icon: 'fa-chart-simple' },
    { id: 'profile', label: '我的', icon: 'fa-user' },
  ];

  const handleSelectWrapper = (id: TabType) => {
    // Only trigger if changing tabs
    if (id !== current) {
      triggerFeedback('light'); // Thud sound
      onSelect(id);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-950 border-t border-slate-800 z-50 pb-safe">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const isActive = current === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleSelectWrapper(tab.id)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${isActive ? 'text-neon-green' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <i className={`fas ${tab.icon} text-xl mb-1 ${isActive ? 'animate-[pulse_0.5s_ease-out]' : ''}`}></i>
              <span className="text-[10px] font-bold tracking-wide">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabBar;