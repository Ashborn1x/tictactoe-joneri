import { motion } from 'motion/react';
import { getWinningLineCoordinates } from '../lib/gameLogic';
import type { BoardState, GameStatus, Player, WinningLine } from '../types/game';
import { MarkIcon } from './MarkIcon';

interface GameBoardProps {
  board: BoardState;
  currentPlayer: Player;
  status: GameStatus;
  winner: Player | null;
  winningLine: WinningLine | null;
  onCellClick: (index: number) => void;
}

export function GameBoard({
  board,
  currentPlayer,
  status,
  winner,
  winningLine,
  onCellClick,
}: GameBoardProps) {
  const isGameOver = status !== 'playing';
  const lineCoords = winningLine ? getWinningLineCoordinates(winningLine) : null;

  return (
    <section aria-label="Tic-Tac-Toe Board" className="glass-panel rounded-3xl p-4 sm:p-5">
      <div className="relative grid grid-cols-3 gap-3">
        {board.map((cell, index) => {
          const row = Math.floor(index / 3) + 1;
          const col = (index % 3) + 1;
          const isOccupied = cell !== null;
          const isWinningCell = winningLine ? winningLine.includes(index) : false;
          const isDimmed = status === 'won' && !isWinningCell;
          const isDisabled = isOccupied || isGameOver;

          const winningCellStyle =
            isWinningCell && winner === 'X'
              ? 'bg-sky-400/[0.16] border-sky-400/55 shadow-[inset_0_1px_0_0_rgba(56,189,248,0.25),0_0_24px_-6px_rgba(56,189,248,0.35)]'
              : isWinningCell && winner === 'O'
                ? 'bg-amber-400/[0.16] border-amber-400/55 shadow-[inset_0_1px_0_0_rgba(251,191,36,0.25),0_0_24px_-6px_rgba(251,191,36,0.35)]'
                : '';

          return (
            <motion.button
              key={index}
              type="button"
              disabled={isDisabled}
              onClick={() => onCellClick(index)}
              whileTap={!isDisabled ? { scale: 0.96 } : undefined}
              aria-label={`Row ${row}, Column ${col}, ${cell ? cell : 'empty'}`}
              className={`group relative aspect-square min-h-[86px] sm:min-h-[104px] rounded-2xl flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B101B] ${
                isWinningCell
                  ? `${winningCellStyle} border scale-[1.02]`
                  : 'glass-cell'
              } ${
                !isDisabled
                  ? 'glass-cell-interactive cursor-pointer'
                  : 'cursor-default'
              } ${isDimmed ? 'opacity-45' : 'opacity-100'}`}
            >
              {cell ? (
                <MarkIcon
                  player={cell}
                  size="lg"
                  animated={true}
                  isWinning={isWinningCell}
                />
              ) : !isGameOver ? (
                <span className="pointer-events-none opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150">
                  <MarkIcon player={currentPlayer} size="lg" animated={false} isGhost />
                </span>
              ) : null}
            </motion.button>
          );
        })}

        {/* Animated winning strike-through line */}
        {lineCoords && winner && (
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 w-full h-full overflow-visible"
          >
            <motion.line
              x1={lineCoords.x1}
              y1={lineCoords.y1}
              x2={lineCoords.x2}
              y2={lineCoords.y2}
              stroke={winner === 'X' ? '#38BDF8' : '#FBBF24'}
              strokeWidth="4.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{
                filter:
                  winner === 'X'
                    ? 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.65))'
                    : 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.65))',
              }}
            />
          </svg>
        )}
      </div>
    </section>
  );
}
