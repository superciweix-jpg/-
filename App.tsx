import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ExerciseCard from './components/ExerciseCard';
import CoachNote from './components/CoachNote';
import Confetti from './components/Confetti';
import { WEEKLY_PLAN } from './constants';
import { DailyPlan, WorkoutLog, Exercise } from './types';

// Helper to get today's date string YYYY-MM-DD
const getTodayString = () => new Date().toISOString().split('T')[0];

const App: React.FC = () => {
  const [todayDate, setTodayDate] = useState<string>(getTodayString());
  const [currentPlan, setCurrentPlan] = useState<DailyPlan | null>(null);
  const [log, setLog] = useState<WorkoutLog>({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  
  // Post workout stats form state
  const [statsDuration, setStatsDuration] = useState('');
  const [statsCalories, setStatsCalories] = useState('');

  // Initialize
  useEffect(() => {
    // Load log from storage
    const storedLog = localStorage.getItem('fitness-app-v1-log');
    if (storedLog) {
      setLog(JSON.parse(storedLog));
    }

    // Determine plan
    const dayIndex = new Date().getDay(); // 0-6
    setCurrentPlan(WEEKLY_PLAN[dayIndex]);
  }, []);

  // Save on change
  useEffect(() => {
    localStorage.setItem('fitness-app-v1-log', JSON.stringify(log));
  }, [log]);

  const handleToggle = (exerciseId: string) => {
    setLog(prev => {
      const todayLog = prev[todayDate] || { completed: false, exercises: {} };
      const currentExState = todayLog.exercises[exerciseId] || { done: false, weight: '', reps: '' };
      
      return {
        ...prev,
        [todayDate]: {
          ...todayLog,
          exercises: {
            ...todayLog.exercises,
            [exerciseId]: { ...currentExState, done: !currentExState.done }
          }
        }
      };
    });
  };

  const handleInputChange = (exerciseId: string, field: 'weight' | 'reps', val: string) => {
    setLog(prev => {
      const todayLog = prev[todayDate] || { completed: false, exercises: {} };
      const currentExState = todayLog.exercises[exerciseId] || { done: false, weight: '', reps: '' };
      
      return {
        ...prev,
        [todayDate]: {
          ...todayLog,
          exercises: {
            ...todayLog.exercises,
            [exerciseId]: { ...currentExState, [field]: val }
          }
        }
      };
    });
  };

  const initiateFinish = () => {
    setShowFinishModal(true);
  };

  const confirmFinish = () => {
    setLog(prev => ({
      ...prev,
      [todayDate]: { 
        ...prev[todayDate], 
        completed: true,
        duration: statsDuration,
        calories: statsCalories
      }
    }));
    setShowFinishModal(false);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000); // Hide after 5s
  };

  if (!currentPlan) return <div className="p-8 text-white">加载训练协议...</div>;

  const todaysLog = log[todayDate] || { completed: false, exercises: {} };
  
  // Combine all exercises to check if done
  const allExercises = [
    ...(currentPlan.warmup || []),
    ...currentPlan.exercises,
    ...(currentPlan.cooldown || [])
  ];
  
  const allDone = allExercises.every(ex => todaysLog.exercises[ex.id]?.done);
  const isFinished = todaysLog.completed;
  
  // Zen Mode Logic
  const isZenMode = currentPlan.theme === 'zen';
  const bgClass = isZenMode 
    ? 'bg-gradient-to-b from-teal-950 to-slate-950' 
    : 'bg-slate-950';

  // Helper to render section
  const renderSection = (title: string, exercises: Exercise[] | undefined, variant: 'warmup' | 'main' | 'cooldown') => {
    if (!exercises || exercises.length === 0) return null;
    return (
      <div className="mb-6 animate-fade-in-up">
        <h3 className={`text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2 ${variant === 'warmup' ? 'text-yellow-600' : variant === 'cooldown' ? 'text-blue-500' : 'text-slate-500'}`}>
          {variant === 'warmup' && <i className="fas fa-fire-flame-curved"></i>}
          {variant === 'cooldown' && <i className="fas fa-snowflake"></i>}
          {variant === 'main' && <i className="fas fa-dumbbell"></i>}
          {title}
        </h3>
        <div className="space-y-4">
          {exercises.map(ex => (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              isDone={!!todaysLog.exercises[ex.id]?.done}
              loggedWeight={todaysLog.exercises[ex.id]?.weight || ''}
              loggedReps={todaysLog.exercises[ex.id]?.reps || ''}
              onToggle={() => handleToggle(ex.id)}
              onInputChange={(field, val) => handleInputChange(ex.id, field, val)}
              variant={variant}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen pb-32 max-w-md mx-auto relative shadow-2xl overflow-hidden transition-colors duration-1000 ${bgClass}`}>
      {showConfetti && <Confetti />}

      {/* Finish Modal */}
      {showFinishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-lg w-full max-w-sm shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4 uppercase italic">
              记录战果
            </h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs text-slate-500 uppercase font-bold mb-1">运动时长 (分钟)</label>
                <input 
                  type="number" 
                  value={statsDuration}
                  onChange={e => setStatsDuration(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white focus:border-neon-green outline-none font-mono"
                  placeholder="e.g. 65"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 uppercase font-bold mb-1">主动热量 (KCAL)</label>
                <input 
                  type="number" 
                  value={statsCalories}
                  onChange={e => setStatsCalories(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white focus:border-neon-orange outline-none font-mono"
                  placeholder="e.g. 450"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowFinishModal(false)} className="flex-1 py-3 rounded bg-slate-800 text-slate-400 font-bold text-xs uppercase">取消</button>
              <button onClick={confirmFinish} className="flex-1 py-3 rounded bg-neon-green text-slate-950 font-bold text-xs uppercase hover:bg-emerald-400">确认完成</button>
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        {!isZenMode && <Header />}
        
        {isZenMode && (
          <div className="mb-8 text-center pt-8 animate-pulse">
             <i className="fas fa-spa text-4xl text-teal-500 mb-4"></i>
             <h1 className="text-2xl font-light text-teal-100 tracking-[0.2em] uppercase">Recovery Mode</h1>
          </div>
        )}

        {/* Date & Plan Header */}
        <div className="mb-6">
          <div className="flex justify-between items-baseline mb-1">
            <h2 className={`text-3xl font-black italic uppercase tracking-tighter ${isZenMode ? 'text-teal-500' : 'text-white'}`}>
              {currentPlan.dayName}
            </h2>
            <span className="text-xs font-mono text-slate-500">{todayDate}</span>
          </div>
          
          <div className={`${isZenMode ? 'text-teal-700' : 'text-emerald-400'} font-bold uppercase text-sm tracking-widest mb-2`}>
            // {currentPlan.focus}
          </div>

          {currentPlan.warning && !isZenMode && (
            <div className="bg-orange-950/40 border-l-4 border-orange-600 p-3 mb-4 rounded-r">
              <div className="flex items-center gap-2 text-orange-500 font-bold text-xs uppercase tracking-wider mb-1">
                <i className="fas fa-triangle-exclamation"></i> 警告
              </div>
              <p className="text-orange-200 text-sm leading-tight">
                {currentPlan.warning}
              </p>
            </div>
          )}
        </div>

        {/* Sections */}
        {renderSection('热身环节 (Warm Up)', currentPlan.warmup, 'warmup')}
        {renderSection('正式训练 (Main Lift)', currentPlan.exercises, 'main')}
        {renderSection('冷身/拉伸 (Cool Down)', currentPlan.cooldown, 'cooldown')}

        {/* Action Button */}
        {!isFinished && currentPlan.theme !== 'rest' && currentPlan.theme !== 'zen' && (
          <button
            onClick={initiateFinish}
            disabled={!allDone}
            className={`
              w-full mt-8 py-4 rounded font-bold uppercase tracking-widest text-sm transition-all
              ${allDone 
                ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
            `}
          >
            {allDone ? '完成今日训练' : '请先完成所有项目'}
          </button>
        )}

        {(currentPlan.theme === 'rest' || currentPlan.theme === 'zen') && !isFinished && (
           <button
             onClick={initiateFinish}
             className={`
               w-full mt-8 py-4 rounded font-bold uppercase tracking-widest text-sm
               ${isZenMode 
                 ? 'bg-teal-900/30 text-teal-400 border border-teal-800 hover:bg-teal-900/50' 
                 : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}
             `}
           >
             标记休息日完成
           </button>
        )}
        
        {/* Battle Report Card */}
        {isFinished && (
           <div className={`mt-8 border rounded-lg overflow-hidden ${isZenMode ? 'border-teal-900/30' : 'border-emerald-900/30'}`}>
             <div className={`p-4 ${isZenMode ? 'bg-teal-900/20' : 'bg-emerald-900/20'}`}>
               <div className="flex items-center gap-2 mb-1">
                 <i className={`fas fa-check-circle text-xl ${isZenMode ? 'text-teal-500' : 'text-emerald-500'}`}></i>
                 <h3 className={`font-bold uppercase ${isZenMode ? 'text-teal-400' : 'text-emerald-400'}`}>训练已归档</h3>
               </div>
               <p className="text-xs text-slate-500 font-mono">{todayDate} • {currentPlan.dayName}</p>
             </div>
             
             <div className="grid grid-cols-2 divide-x divide-slate-800 bg-slate-900/50">
                <div className="p-4 text-center">
                  <div className="text-xs text-slate-500 uppercase font-bold mb-1">时长</div>
                  <div className="text-xl font-mono text-white">{todaysLog.duration || '--'} <span className="text-xs text-slate-600">MIN</span></div>
                </div>
                <div className="p-4 text-center">
                  <div className="text-xs text-slate-500 uppercase font-bold mb-1">消耗</div>
                  <div className="text-xl font-mono text-white">{todaysLog.calories || '--'} <span className="text-xs text-slate-600">KCAL</span></div>
                </div>
             </div>
             
             <div className="bg-slate-950 p-3 text-center border-t border-slate-800">
               <span className="text-[10px] text-slate-600 uppercase tracking-widest">IRON PATH ELITE SYSTEM</span>
             </div>
           </div>
        )}
      </div>

      <CoachNote 
        note={currentPlan.coachNote} 
        type={currentPlan.warning ? 'warning' : 'info'}
      />
    </div>
  );
};

export default App;