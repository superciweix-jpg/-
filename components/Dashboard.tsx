import React from 'react';
import { WEEKLY_PLAN, USER_PROFILE } from '../constants';
import { WorkoutLog } from '../types';

interface DashboardProps {
  onSelectDay: (dayIndex: number) => void;
  logs: WorkoutLog;
  weekDates: { [key: number]: string };
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectDay, logs, weekDates }) => {
  // Calculate Progress
  const todayIndex = new Date().getDay();
  const orderedDays = [1, 2, 3, 4, 5, 6, 0];
  
  const completedCount = orderedDays.filter(dayIdx => {
    const dateStr = weekDates[dayIdx];
    return logs[dateStr]?.completed;
  }).length;
  
  const progressPercentage = Math.round((completedCount / 7) * 100);

  return (
    <div className="p-6 pb-32 min-h-screen bg-slate-950 text-white animate-fade-in">
      {/* Dashboard Header */}
      <div className="mb-8 flex justify-between items-start border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-widest text-slate-100">
            无限<span className="text-neon-green align-top">进步</span>
          </h1>
          <p className="text-[10px] text-slate-500 font-mono mt-1">
            OPERATOR: {USER_PROFILE.name}
          </p>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Weekly Sync</div>
          <div className="flex items-center justify-end gap-2">
            <span className="text-2xl font-mono font-bold text-white">{completedCount}<span className="text-slate-600">/7</span></span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-[10px] text-slate-500 uppercase mb-2 font-bold tracking-wider">
          <span>Cycle Progress</span>
          <span>{progressPercentage}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
          <div 
            className="h-full bg-neon-green shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-1000 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Weekly Grid */}
      <div className="grid grid-cols-1 gap-3">
        {orderedDays.map((dayIndex) => {
          const plan = WEEKLY_PLAN[dayIndex];
          const dateStr = weekDates[dayIndex];
          const isToday = dayIndex === todayIndex;
          const isCompleted = logs[dateStr]?.completed;
          const isRest = plan.theme === 'rest' || plan.theme === 'zen';
          
          // Determine Card Style
          let borderColor = 'border-slate-800';
          let bgClass = 'bg-slate-900';
          let iconColor = 'text-slate-600';
          let textColor = 'text-slate-400';
          let statusText = '未开始';
          let statusIcon = 'fa-lock';

          if (isCompleted) {
            borderColor = 'border-emerald-900';
            bgClass = 'bg-emerald-950/20';
            iconColor = 'text-emerald-500';
            textColor = 'text-slate-300';
            statusText = '已归档';
            statusIcon = 'fa-check-circle';
          } else if (isToday) {
            borderColor = 'border-neon-blue/50';
            bgClass = 'bg-slate-800';
            iconColor = 'text-neon-blue';
            textColor = 'text-white';
            statusText = '进行中';
            statusIcon = 'fa-play-circle';
          } else if (isRest) {
            statusIcon = 'fa-mug-hot';
          }

          return (
            <div 
              key={dayIndex}
              onClick={() => onSelectDay(dayIndex)}
              className={`
                relative p-4 rounded border ${borderColor} ${bgClass}
                flex items-center justify-between
                transition-all duration-200 active:scale-95 cursor-pointer
                group hover:border-slate-600
              `}
            >
              {/* Left: Info */}
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded flex items-center justify-center bg-slate-950 border border-slate-800 ${isToday ? 'border-neon-blue text-neon-blue' : 'text-slate-600'}`}>
                  <span className="font-mono text-xs font-bold">{plan.dayName.slice(-1)}</span>
                </div>
                <div>
                  <h3 className={`text-sm font-bold uppercase tracking-wider ${textColor}`}>
                    {plan.focus.split('(')[0]}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                     <span className="text-[10px] text-slate-500 font-mono">{dateStr.slice(5)}</span>
                     {isToday && <span className="text-[9px] bg-neon-blue text-slate-950 px-1.5 rounded font-bold uppercase">Today</span>}
                  </div>
                </div>
              </div>

              {/* Right: Status Icon */}
              <div className={`text-lg ${iconColor} group-hover:scale-110 transition-transform`}>
                <i className={`fas ${statusIcon}`}></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;