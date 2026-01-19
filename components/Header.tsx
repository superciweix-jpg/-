import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="mb-2">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div>
          <h1 className="text-lg font-bold tracking-tighter text-white">
            无限<span className="text-neon-green">进步</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-[10px] text-slate-500 font-mono uppercase border border-slate-800 rounded px-2 py-1">
             TRAINING MODE
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;