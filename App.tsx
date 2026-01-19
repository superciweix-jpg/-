import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ExerciseCard from './components/ExerciseCard';
import CoachNote from './components/CoachNote';
import Confetti from './components/Confetti';
import { WEEKLY_PLAN } from './constants';
import { DailyPlan, WorkoutLog } from './types';

// Helper to get today's date string YYYY-MM-DD
const getTodayString = () => new Date().toISOString().split('T')[0];

const App: React.FC = () => {
  const [todayDate, setTodayDate] = useState<string>(getTodayString());
  const [currentPlan, setCurrentPlan] = useState<DailyPlan | null>(null);
  const [log, setLog] = useState<WorkoutLog>({});
  const [showConfetti, setShowConfetti] = useState(false);

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

  const finishWorkout = () => {
    setLog(prev => ({
      ...prev,
      [todayDate]: { ...prev[todayDate], completed: true }
    }));
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000); // Hide after 5s
  };

  if (!currentPlan) return <div className="p-8 text-white">加载训练协议...</div>;

  const todaysLog = log[todayDate] || { completed: false, exercises: {} };
  const allDone = currentPlan.exercises.every(ex => todaysLog.exercises[ex.id]?.done);
  const isFinished = todaysLog.completed;
  
  // Zen Mode Logic
  const isZenMode = currentPlan.theme === 'zen';
  const bgClass = isZenMode 
    ? 'bg-gradient-to-b from-teal-950 to-slate-950' 
    : 'bg-slate-950';

  return (
    <div className={`min-h-screen pb-32 max-w-md mx-auto relative shadow-2xl overflow-hidden transition-colors duration-1000 ${bgClass}`}>
      {showConfetti && <Confetti />}

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

        {/* Exercise List */}
        <div className="space-y-4">
          {currentPlan.exercises.map(ex => (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              isDone={!!todaysLog.exercises[ex.id]?.done}
              loggedWeight={todaysLog.exercises[ex.id]?.weight || ''}
              loggedReps={todaysLog.exercises[ex.id]?.reps || ''}
              onToggle={() => handleToggle(ex.id)}
              onInputChange={(field, val) => handleInputChange(ex.id, field, val)}
            />
          ))}
        </div>

        {/* Action Button */}
        {!isFinished && currentPlan.theme !== 'rest' && currentPlan.theme !== 'zen' && (
          <button
            onClick={finishWorkout}
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
             onClick={finishWorkout}
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
        
        {isFinished && (
           <div className={`mt-8 text-center p-4 border rounded ${isZenMode ? 'border-teal-900/30 bg-teal-900/10' : 'border-emerald-900/30 bg-emerald-900/10'}`}>
             <i className={`fas fa-check-circle text-3xl mb-2 ${isZenMode ? 'text-teal-500' : 'text-emerald-500'}`}></i>
             <p className={`${isZenMode ? 'text-teal-400' : 'text-emerald-400'} font-mono text-sm uppercase`}>
               训练已记录
             </p>
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