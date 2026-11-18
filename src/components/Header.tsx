import { Handshake, Trophy } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { GameStatus, Player } from '../types/game';
import { MarkIcon } from './MarkIcon';

interface HeaderProps {
  currentPlayer: Player;
  status: GameStatus;
  winner: Player | null;
}

export function Header({ currentPlayer, status, winner }: HeaderProps) {
  const statusKey =
    status === 'won' && winner
      ? `won-${winner}`
      : status === 'draw'
        ? 'draw'
        : `turn-${currentPlayer}`;

  return (
    <header className="flex flex-col items-center text-center gap-3">
      <div className="space-y-1">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-50 text-balance">
          TIC TAC TOE
        </h1>
        <p className="text-sm text-slate-400 tracking-wide">
          Classic Strategy. Modern Experience.
        </p>
      </div>

      <div
        role="status"
        aria-live="polite"
        className="h-9 flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={statusKey}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 text-sm sm:text-base font-medium"
          >
            {status === 'won' && winner ? (
              <>
                <Trophy
                  className={`w-4 h-4 shrink-0 ${
                    winner === 'X' ? 'text-sky-400' : 'text-amber-400'
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={
                    winner === 'X'
                      ? 'text-sky-300 font-semibold'
                      : 'text-amber-300 font-semibold'
                  }
                >
                  Player {winner} Wins!
                </span>
              </>
            ) : status === 'draw' ? (
              <>
                <Handshake className="w-4 h-4 shrink-0 text-slate-300" aria-hidden="true" />
                <span className="text-slate-200 font-semibold">
                  It&apos;s a Draw! No Winner
                </span>
              </>
            ) : (
              <>
                <MarkIcon player={currentPlayer} size="sm" animated={false} />
                <span className="text-slate-200">
                  Player{' '}
                  <span
                    className={
                      currentPlayer === 'X'
                        ? 'text-sky-400 font-semibold'
                        : 'text-amber-400 font-semibold'
                    }
                  >
                    {currentPlayer}
                  </span>
                  &apos;s Turn
                </span>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </header>
  );
}
