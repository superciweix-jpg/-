import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import ExerciseCard from './components/ExerciseCard';
import CoachNote from './components/CoachNote';
import Dashboard from './components/Dashboard';
import MissionComplete from './components/MissionComplete';
import TabBar from './components/TabBar';
import HistoryView from './components/HistoryView';
import ProfileView from './components/ProfileView';
import DataView from './components/DataView';

import { WEEKLY_PLAN } from './constants';
import { WorkoutLog, Exercise, HistoryRecord } from './types';
import { triggerFeedback } from './utils/feedback';

// Helper: Get dates for the current week (Monday to Sunday)
const getWeekDates = () => {
  const curr = new Date();
  const day = curr.getDay(); // 0 (Sun) to 6 (Sat)
  const diff = curr.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(curr.setDate(diff));

  const weekDates: { [key: number]: string } = {};
  for (let i = 1; i <= 6; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + (i - 1));
    weekDates[i] = d.toISOString().split('T')[0];
  }
  const sun = new Date(monday);
  sun.setDate(monday.getDate() + 6);
  weekDates[0] = sun.toISOString().split('T')[0];
  return weekDates;
};

type TabType = 'training' | 'history' | 'data' | 'profile';
type TrainingViewState = 'dashboard' | 'workout';

const App: React.FC = () => {
  // --- 1. State Initialization (STRICT LAZY INIT PATTERN) ---
  
  // App View State
  const [activeTab, setActiveTab] = useState<TabType>('training');
  const [trainingView, setTrainingView] = useState<TrainingViewState>('dashboard');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(new Date().getDay()); 

  // Data: Workout Log & Progress
  const [log, setLog] = useState<WorkoutLog>(() => {
    try {
      const stored = localStorage.getItem('fitness-app-v1-log');
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      console.error("Failed to load log", e);
      return {};
    }
  });

  // Data: History Records
  const [history, setHistory] = useState<HistoryRecord[]>(() => {
    try {
      const stored = localStorage.getItem('fitness-app-v1-history');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to load history", e);
      return [];
    }
  });

  // UI Local State
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [showEpicOverlay, setShowEpicOverlay] = useState(false);
  const [statsDuration, setStatsDuration] = useState('');
  const [statsCalories, setStatsCalories] = useState('');

  // --- 2. Persistence Side Effects (Strict Sync) ---

  useEffect(() => {
    try {
      localStorage.setItem('fitness-app-v1-log', JSON.stringify(log));
    } catch (e) {
      console.error("Failed to save log", e);
    }
  }, [log]);
  
  useEffect(() => {
    try {
      localStorage.setItem('fitness-app-v1-history', JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save history", e);
    }
  }, [history]);

  // --- 3. Derived State ---
  
  const weekDates = useMemo(() => getWeekDates(), []);
  const activeDateString = weekDates[selectedDayIndex];
  const currentPlan = WEEKLY_PLAN[selectedDayIndex];

  // --- 4. Handlers ---

  const handleTabSelect = (tab: TabType) => {
    if (tab !== activeTab) {
      triggerFeedback('light'); // Mechanical Click
      setActiveTab(tab);
    }
  };

  const handleDaySelect = (dayIndex: number) => {
    triggerFeedback('light'); // Mechanical Click
    setSelectedDayIndex(dayIndex);
    setTrainingView('workout');
  };

  // Note: Sound for toggle is handled in ExerciseCard component for immediate feedback
  const handleToggle = (exerciseId: string) => {
    setLog(prev => {
      const dailyLog = prev[activeDateString] || { completed: false, exercises: {} };
      const currentExState = dailyLog.exercises[exerciseId] || { done: false, weight: '', reps: '' };
      
      const newDoneState = !currentExState.done;
      
      return {
        ...prev,
        [activeDateString]: {
          ...dailyLog,
          exercises: { 
            ...dailyLog.exercises, 
            [exerciseId]: { ...currentExState, done: newDoneState } 
          }
        }
      };
    });
  };

  const handleInputChange = (exerciseId: string, field: 'weight' | 'reps', val: string) => {
    setLog(prev => {
      const dailyLog = prev[activeDateString] || { completed: false, exercises: {} };
      const currentExState = dailyLog.exercises[exerciseId] || { done: false, weight: '', reps: '' };
      return {
        ...prev,
        [activeDateString]: {
          ...dailyLog,
          exercises: { 
            ...dailyLog.exercises, 
            [exerciseId]: { ...currentExState, [field]: val } 
          }
        }
      };
    });
  };

  const initiateFinish = () => {
    triggerFeedback('light');
    setShowFinishModal(true);
  };

  const confirmFinish = () => {
    triggerFeedback('success'); // Big achievement sound
    
    // 1. Update Log Status
    setLog(prev => ({
      ...prev,
      [activeDateString]: { 
        ...prev[activeDateString], 
        completed: true,
        duration: statsDuration,
        calories: statsCalories
      }
    }));

    // 2. Add to History
    const newRecord: HistoryRecord = {
      id: Date.now().toString(),
      date: activeDateString,
      dayName: currentPlan.dayName,
      title: currentPlan.focus.split('(')[0],
      duration: statsDuration || '0',
      calories: statsCalories || '0',
      completedAt: Date.now()
    };
    
    setHistory(prev => [newRecord, ...prev]);

    // 3. UI Flow
    setShowFinishModal(false);
    setShowEpicOverlay(true);
  };

  const handleDismissEpicOverlay = () => {
    triggerFeedback('light');
    setShowEpicOverlay(false);
    setTrainingView('dashboard');
    setStatsDuration('');
    setStatsCalories('');
  };

  // --- 5. Render Helpers ---

  const renderTrainingTab = () => {
    if (trainingView === 'dashboard') {
      return (
        <Dashboard 
          onSelectDay={handleDaySelect} 
          logs={log} 
          weekDates={weekDates} 
        />
      );
    }
    
    // Workout View
    if (!currentPlan) return <div className="p-8 text-white">Plan not found</div>;
    const todaysLog = log[activeDateString] || { completed: false, exercises: {} };
    const allExercises = [ ...(currentPlan.warmup || []), ...currentPlan.exercises, ...(currentPlan.cooldown || []) ];
    const allDone = allExercises.length > 0 && allExercises.every(ex => todaysLog.exercises[ex.id]?.done);
    const isFinished = todaysLog.completed;
    const isZenMode = currentPlan.theme === 'zen';
    const bgClass = isZenMode ? 'bg-gradient-to-b from-teal-950 to-slate-950' : 'bg-slate-950';

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
      <div className={`min-h-screen pb-40 relative ${bgClass}`}>
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <button 
              onClick={() => { triggerFeedback('light'); setTrainingView('dashboard'); }}
              className="text-slate-400 hover:text-white text-sm uppercase font-bold tracking-widest flex items-center gap-2"
            >
              <i className="fas fa-chevron-left"></i> Back to Dashboard
            </button>
            <div className="text-[10px] text-slate-600 font-mono">{activeDateString}</div>
          </div>

          {!isZenMode && <Header />}
          
          {isZenMode && (
            <div className="mb-8 text-center pt-8 animate-pulse">
               <i className="fas fa-spa text-4xl text-teal-500 mb-4"></i>
               <h1 className="text-2xl font-light text-teal-100 tracking-[0.2em] uppercase">Recovery Mode</h1>
            </div>
          )}

          <div className="mb-6">
            <h2 className={`text-3xl font-black italic uppercase tracking-tighter ${isZenMode ? 'text-teal-500' : 'text-white'}`}>
              {currentPlan.dayName}
            </h2>
            <div className={`${isZenMode ? 'text-teal-700' : 'text-emerald-400'} font-bold uppercase text-sm tracking-widest mb-2`}>
              // {currentPlan.focus}
            </div>
            {currentPlan.warning && !isZenMode && (
              <div className="bg-orange-950/40 border-l-4 border-orange-600 p-3 mb-4 rounded-r animate-pulse-slow">
                <div className="flex items-center gap-2 text-orange-500 font-bold text-xs uppercase tracking-wider mb-1">
                  <i className="fas fa-triangle-exclamation"></i> Warning
                </div>
                <p className="text-orange-200 text-sm leading-tight">{currentPlan.warning}</p>
              </div>
            )}
          </div>

          {renderSection('Pre-Combat (Warm Up)', currentPlan.warmup, 'warmup')}
          {renderSection('Main Objectives', currentPlan.exercises, 'main')}
          {renderSection('Decompression (Cool Down)', currentPlan.cooldown, 'cooldown')}

          {!isFinished && (
            <button
              onClick={initiateFinish}
              disabled={!allDone && !isZenMode && currentPlan.theme !== 'rest'}
              className={`
                w-full mt-8 py-4 rounded font-bold uppercase tracking-widest text-sm transition-all
                ${(allDone || isZenMode || currentPlan.theme === 'rest')
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
              `}
            >
              {(allDone || isZenMode || currentPlan.theme === 'rest') ? 'Complete Mission' : 'Objectives Incomplete'}
            </button>
          )}

          {isFinished && (
             <div className={`mt-8 border rounded-lg overflow-hidden ${isZenMode ? 'border-teal-900/30' : 'border-emerald-900/30'}`}>
               <div className={`p-4 ${isZenMode ? 'bg-teal-900/20' : 'bg-emerald-900/20'}`}>
                 <div className="flex items-center gap-2 mb-1">
                   <i className={`fas fa-check-circle text-xl ${isZenMode ? 'text-teal-500' : 'text-emerald-500'}`}></i>
                   <h3 className={`font-bold uppercase ${isZenMode ? 'text-teal-400' : 'text-emerald-400'}`}>Mission Archived</h3>
                 </div>
               </div>
             </div>
          )}
        </div>
        <CoachNote note={currentPlan.coachNote} type={currentPlan.warning ? 'warning' : 'info'} />
      </div>
    );
  };

  return (
    <div className="bg-slate-950 min-h-screen max-w-md mx-auto relative shadow-2xl overflow-hidden text-slate-200">
      
      {/* Epic Overlay */}
      {showEpicOverlay && (
        <MissionComplete 
          stats={{ duration: statsDuration, calories: statsCalories, exercisesCount: 0 }}
          onDismiss={handleDismissEpicOverlay}
        />
      )}

      {/* Finish Modal */}
      {showFinishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-lg w-full max-w-sm shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4 uppercase italic">Log Mission Data</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs text-slate-500 uppercase font-bold mb-1">Duration (MIN)</label>
                <input 
                  type="number" 
                  value={statsDuration}
                  onChange={e => setStatsDuration(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white focus:border-neon-green outline-none font-mono"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 uppercase font-bold mb-1">Active Energy (KCAL)</label>
                <input 
                  type="number" 
                  value={statsCalories}
                  onChange={e => setStatsCalories(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white focus:border-neon-orange outline-none font-mono"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowFinishModal(false)} className="flex-1 py-3 rounded bg-slate-800 text-slate-400 font-bold text-xs uppercase">Cancel</button>
              <button onClick={confirmFinish} className="flex-1 py-3 rounded bg-neon-green text-slate-950 font-bold text-xs uppercase hover:bg-emerald-400">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content Switcher */}
      <div className="min-h-screen">
        {activeTab === 'training' && renderTrainingTab()}
        {activeTab === 'history' && <HistoryView history={history} />}
        {activeTab === 'data' && <DataView />}
        {activeTab === 'profile' && <ProfileView />}
      </div>

      {/* Bottom Dock */}
      <TabBar current={activeTab} onSelect={handleTabSelect} />
    </div>
  );
};

export default App;