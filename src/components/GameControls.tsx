import { RotateCcw, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import type { GameStatus } from '../types/game';

interface GameControlsProps {
  status: GameStatus;
  hasScores: boolean;
  onNewGame: () => void;
  onResetScores: () => void;
}

export function GameControls({
  status,
  hasScores,
  onNewGame,
  onResetScores,
}: GameControlsProps) {
  const isRoundFinished = status !== 'playing';

  return (
    <div className="grid grid-cols-2 gap-3">
      <motion.button
        type="button"
        onClick={onNewGame}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080B12] ${
          isRoundFinished
            ? 'bg-sky-400 text-slate-950 shadow-[0_8px_24px_-6px_rgba(56,189,248,0.5)] hover:bg-sky-300'
            : 'bg-white/[0.1] text-slate-100 border border-white/[0.14] hover:bg-white/[0.15] hover:border-white/[0.22]'
        }`}
      >
        <RotateCcw className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>New Game</span>
      </motion.button>

      <motion.button
        type="button"
        onClick={onResetScores}
        whileHover={hasScores ? { y: -1 } : undefined}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-medium whitespace-nowrap shrink-0 border transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080B12] ${
          hasScores
            ? 'bg-white/[0.04] text-slate-200 border-white/[0.1] hover:bg-white/[0.09] hover:border-white/[0.18]'
            : 'bg-white/[0.02] text-slate-400 border-white/[0.06] hover:bg-white/[0.05] hover:text-slate-300'
        }`}
      >
        <Trash2 className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>Reset Scores</span>
      </motion.button>
    </div>
  );
}
