import React from 'react';

interface CoachNoteProps {
  note: string;
  type?: 'warning' | 'info';
}

const CoachNote: React.FC<CoachNoteProps> = ({ note, type = 'info' }) => {
  return (
    <div className="w-full p-4 bg-slate-950/90 border-t border-slate-800">
      <div className={`
        rounded p-3 text-sm flex items-start gap-3
        ${type === 'warning' ? 'bg-orange-950/30 border border-orange-900/50 text-orange-200' : 'bg-slate-900 border border-slate-800 text-slate-300'}
      `}>
        <i className={`mt-1 fas ${type === 'warning' ? 'fa-triangle-exclamation text-orange-500' : 'fa-user-nurse text-emerald-500'}`}></i>
        <div>
          <span className="block text-[10px] font-bold uppercase opacity-70 mb-0.5">教练指令 (COACH'S NOTE)</span>
          {note}
        </div>
      </div>
    </div>
  );
};

export default CoachNote;