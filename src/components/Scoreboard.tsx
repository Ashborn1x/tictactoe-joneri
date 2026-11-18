import type { GameStatus, Player, ScoreboardData } from '../types/game';
import { MarkIcon } from './MarkIcon';

interface ScoreboardProps {
  scores: ScoreboardData;
  currentPlayer: Player;
  status: GameStatus;
  winner: Player | null;
}

export function Scoreboard({
  scores,
  currentPlayer,
  status,
  winner,
}: ScoreboardProps) {
  const isXActive =
    (status === 'playing' && currentPlayer === 'X') ||
    (status === 'won' && winner === 'X');
  const isOActive =
    (status === 'playing' && currentPlayer === 'O') ||
    (status === 'won' && winner === 'O');
  const isDrawActive = status === 'draw';

  return (
    <section
      aria-label="Scoreboard"
      className="glass-panel rounded-2xl p-1.5 grid grid-cols-3 gap-1.5"
    >
      {/* Player X */}
      <div
        className={`relative flex flex-col items-center justify-center rounded-xl py-3 px-2 transition-all duration-200 ${
          isXActive
            ? 'bg-sky-400/[0.11] ring-1 ring-sky-400/40 shadow-[inset_0_1px_0_0_rgba(56,189,248,0.2)]'
            : 'bg-transparent opacity-75'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <MarkIcon player="X" size="sm" animated={false} />
          <span className="text-xs font-medium text-slate-300 whitespace-nowrap">
            Player X
          </span>
        </div>
        <span className="font-mono-tabular mt-1 text-2xl font-bold text-slate-50 leading-none">
          {scores.X}
        </span>
        <span
          className={`mt-1.5 text-[11px] font-medium h-3.5 leading-none transition-opacity duration-150 ${
            status === 'playing' && currentPlayer === 'X'
              ? 'text-sky-300 opacity-100'
              : status === 'won' && winner === 'X'
                ? 'text-sky-300 opacity-100'
                : 'opacity-0'
          }`}
          aria-hidden={!(isXActive)}
        >
          {status === 'won' && winner === 'X' ? 'Winner' : 'Active'}
        </span>
      </div>

      {/* Draws */}
      <div
        className={`relative flex flex-col items-center justify-center rounded-xl py-3 px-2 transition-all duration-200 ${
          isDrawActive
            ? 'bg-white/[0.09] ring-1 ring-white/25'
            : 'bg-transparent opacity-75'
        }`}
      >
        <span className="text-xs font-medium text-slate-400 whitespace-nowrap">
          Draws
        </span>
        <span className="font-mono-tabular mt-1 text-2xl font-bold text-slate-100 leading-none">
          {scores.draws}
        </span>
        <span
          className={`mt-1.5 text-[11px] font-medium h-3.5 leading-none transition-opacity duration-150 ${
            isDrawActive ? 'text-slate-300 opacity-100' : 'opacity-0'
          }`}
          aria-hidden={!isDrawActive}
        >
          Tied
        </span>
      </div>

      {/* Player O */}
      <div
        className={`relative flex flex-col items-center justify-center rounded-xl py-3 px-2 transition-all duration-200 ${
          isOActive
            ? 'bg-amber-400/[0.11] ring-1 ring-amber-400/40 shadow-[inset_0_1px_0_0_rgba(251,191,36,0.2)]'
            : 'bg-transparent opacity-75'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <MarkIcon player="O" size="sm" animated={false} />
          <span className="text-xs font-medium text-slate-300 whitespace-nowrap">
            Player O
          </span>
        </div>
        <span className="font-mono-tabular mt-1 text-2xl font-bold text-slate-50 leading-none">
          {scores.O}
        </span>
        <span
          className={`mt-1.5 text-[11px] font-medium h-3.5 leading-none transition-opacity duration-150 ${
            status === 'playing' && currentPlayer === 'O'
              ? 'text-amber-300 opacity-100'
              : status === 'won' && winner === 'O'
                ? 'text-amber-300 opacity-100'
                : 'opacity-0'
          }`}
          aria-hidden={!(isOActive)}
        >
          {status === 'won' && winner === 'O' ? 'Winner' : 'Active'}
        </span>
      </div>
    </section>
  );
}
