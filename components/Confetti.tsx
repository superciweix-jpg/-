import React, { useEffect, useState } from 'react';

const Confetti: React.FC = () => {
  const [pieces, setPieces] = useState<{id: number, left: number, delay: number, color: string}[]>([]);

  useEffect(() => {
    const colors = ['#10b981', '#34d399', '#064e3b', '#f97316'];
    const newPieces = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece rounded-sm"
          style={{
            left: `${p.left}%`,
            top: '100%',
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center bg-black/80 animate-fade-in">
        <div className="text-center p-8 border-2 border-neon-green bg-slate-900 rounded-lg shadow-[0_0_30px_rgba(16,185,129,0.3)]">
          <h2 className="text-3xl font-bold text-white mb-2 uppercase italic tracking-tighter">
            训练结束
          </h2>
          <p className="text-emerald-400 font-mono">干得漂亮，战士。</p>
        </div>
      </div>
    </div>
  );
};

export default Confetti;