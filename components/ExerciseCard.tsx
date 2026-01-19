import React, { useState } from 'react';
import { Exercise } from '../types';
import { triggerFeedback } from '../utils/feedback';

interface ExerciseCardProps {
  exercise: Exercise;
  isDone: boolean;
  loggedWeight: string;
  loggedReps: string;
  onToggle: () => void;
  onInputChange: (field: 'weight' | 'reps', val: string) => void;
  variant?: 'warmup' | 'main' | 'cooldown'; // Visual variant
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ 
  exercise, 
  isDone, 
  loggedWeight,
  loggedReps, 
  onToggle, 
  onInputChange,
  variant = 'main'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleWrapper = () => {
    // Play "Ding" sound only when checking (optional preference, but good for positive reinforcement)
    // Or play for both check/uncheck. We'll play "success" for both to indicate interaction.
    triggerFeedback('success'); 
    onToggle();
  };

  // Logic to determine if target was met
  const isTargetMet = (() => {
    if (!exercise.targetWeight || isNaN(parseFloat(exercise.targetWeight))) return false;
    if (!loggedWeight || isNaN(parseFloat(loggedWeight))) return false;
    return parseFloat(loggedWeight) >= parseFloat(exercise.targetWeight);
  })();

  // Visual styles based on variant
  const getBorderColor = () => {
    if (isDone) return 'border-emerald-900/50 bg-slate-900/40 opacity-60';
    if (variant === 'warmup') return 'border-neon-yellow/30 bg-yellow-950/10';
    if (variant === 'cooldown') return 'border-blue-900/40 bg-blue-950/10';
    
    // Main lift logic
    if (isTargetMet) return 'border-neon-green/60 shadow-[0_0_10px_rgba(16,185,129,0.2)] bg-slate-900';
    return 'border-slate-800 hover:border-slate-700 bg-slate-900';
  };

  const hasFormCheck = exercise.formCheck && exercise.formCheck.length > 0;

  return (
    <div 
      className={`
        relative p-4 rounded-lg border transition-all duration-300
        ${getBorderColor()}
      `}
    >
      <div className="flex justify-between items-start mb-2">
        <div 
          className={`flex-1 ${hasFormCheck ? 'cursor-pointer group' : ''}`}
          onClick={() => hasFormCheck && setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            {variant === 'warmup' && <span className="text-[9px] bg-yellow-900/50 text-yellow-500 px-1 rounded uppercase border border-yellow-800">热身</span>}
            {variant === 'cooldown' && <span className="text-[9px] bg-blue-900/50 text-blue-400 px-1 rounded uppercase border border-blue-800">冷身</span>}
            
            <h3 className={`font-bold text-lg ${isDone ? 'text-emerald-500 line-through decoration-2' : 'text-slate-100'}`}>
              {exercise.name}
            </h3>
            {hasFormCheck && (
              <span className={`text-[10px] bg-slate-800 px-1.5 rounded transition-colors ${isExpanded ? 'text-neon-green' : 'text-slate-500 group-hover:text-slate-300'}`}>
                <i className={`fas fa-info-circle mr-1`}></i>
                {isExpanded ? '收起' : '要点'}
              </span>
            )}
          </div>
          
          {/* Reference Badge */}
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="text-xs text-slate-500 font-mono">计划: {exercise.sets} x {exercise.reps}</span>
            {exercise.targetWeight && (
               <span className="bg-slate-800 text-slate-400 text-[10px] px-1.5 py-0.5 rounded border border-slate-700 font-mono">
                 目标: {exercise.targetWeight}kg / {exercise.targetReps}次
               </span>
            )}
            {exercise.restTime && (
               <span className="bg-slate-950 text-slate-500 text-[10px] px-1.5 py-0.5 rounded border border-slate-800 font-mono flex items-center">
                 <i className="fas fa-hourglass-half mr-1 text-[8px]"></i>
                 {exercise.restTime}s 休息
               </span>
            )}
          </div>
        </div>
        <button
          onClick={handleToggleWrapper}
          className={`
            w-8 h-8 rounded flex items-center justify-center transition-colors active:scale-95
            ${isDone ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-600 hover:bg-slate-700'}
          `}
        >
          {isDone ? <i className="fas fa-check"></i> : <i className="fas fa-circle"></i>}
        </button>
      </div>

      {/* Form Check Drawer */}
      {isExpanded && hasFormCheck && (
        <div className="mt-3 mb-4 bg-slate-950 p-3 rounded border-l-2 border-neon-green/30 animate-[pulse_0.2s_ease-out]">
          <div className="flex items-center gap-2 mb-2">
            <i className="fas fa-clipboard-check text-neon-green text-xs"></i>
            <span className="font-bold text-[10px] text-neon-green uppercase tracking-wider">动作自检 (Form Check)</span>
          </div>
          <ul className="space-y-2">
            {exercise.formCheck?.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                <i className="fas fa-caret-right text-[8px] mt-1 text-slate-500"></i>
                <span dangerouslySetInnerHTML={{ __html: point.replace(/(\*\*.+?\*\*)/g, '<span class="text-neon-orange font-bold">$1</span>') }}></span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {exercise.notes && !isExpanded && (
        <div className="text-xs text-slate-500 mb-3 italic border-l-2 border-slate-700 pl-2">
          {exercise.notes}
        </div>
      )}

      {!exercise.isRest && (
        <div className="flex items-end gap-3 mt-3 pt-3 border-t border-slate-800/50">
          
          {/* Weight Input */}
          <div className="flex-1">
             <label className="block text-[9px] uppercase text-slate-600 font-bold tracking-wider mb-1">
               负重 (KG)
               {isTargetMet && <span className="ml-1 text-neon-green"><i className="fas fa-check-circle"></i></span>}
             </label>
             <input 
               type="text" 
               placeholder={exercise.targetWeight || "-"}
               value={loggedWeight}
               onChange={(e) => onInputChange('weight', e.target.value)}
               disabled={isDone}
               className={`
                 bg-slate-950 border text-slate-200 text-sm rounded px-2 py-2 w-full focus:outline-none font-mono text-center transition-colors
                 ${isTargetMet ? 'border-neon-green/50 text-neon-green' : 'border-slate-800 focus:border-slate-600'}
               `}
             />
          </div>

          {/* Reps Input */}
          <div className="flex-1">
             <label className="block text-[9px] uppercase text-slate-600 font-bold tracking-wider mb-1">次数 (Reps)</label>
             <input 
               type="text" 
               placeholder={exercise.targetReps || "-"}
               value={loggedReps}
               onChange={(e) => onInputChange('reps', e.target.value)}
               disabled={isDone}
               className="bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded px-2 py-2 w-full focus:outline-none focus:border-slate-600 font-mono text-center"
             />
          </div>

        </div>
      )}
    </div>
  );
};

export default ExerciseCard;