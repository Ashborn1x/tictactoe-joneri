'use client';

import { MotionConfig } from 'motion/react';
import { useCallback, useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { GameControls } from './components/GameControls';
import { Header } from './components/Header';
import { Scoreboard } from './components/Scoreboard';
import {
  createInitialBoard,
  evaluateBoard,
  getNextPlayer,
} from './lib/gameLogic';
import type { BoardState, Player, ScoreboardData } from './types/game';

const INITIAL_SCORES: ScoreboardData = {
  X: 0,
  O: 0,
  draws: 0,
};

export default function App() {
  const [board, setBoard] = useState<BoardState>(createInitialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [scores, setScores] = useState<ScoreboardData>(INITIAL_SCORES);

  const { status, winner, winningLine } = evaluateBoard(board);
  const hasScores = scores.X > 0 || scores.O > 0 || scores.draws > 0;

  const handleCellClick = useCallback(
    (index: number) => {
      if (board[index] !== null || status !== 'playing') {
        return;
      }

      const nextBoard = [...board];
      nextBoard[index] = currentPlayer;
      setBoard(nextBoard);

      const evaluation = evaluateBoard(nextBoard);
      if (evaluation.status === 'won' && evaluation.winner) {
        const roundWinner = evaluation.winner;
        setScores((prev) => ({
          ...prev,
          [roundWinner]: prev[roundWinner] + 1,
        }));
      } else if (evaluation.status === 'draw') {
        setScores((prev) => ({
          ...prev,
          draws: prev.draws + 1,
        }));
      } else {
        setCurrentPlayer(getNextPlayer(currentPlayer));
      }
    },
    [board, currentPlayer, status]
  );

  const handleNewGame = useCallback(() => {
    setBoard(createInitialBoard());
    setCurrentPlayer('X');
  }, []);

  const handleResetScores = useCallback(() => {
    setScores(INITIAL_SCORES);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-dvh w-full flex items-center justify-center px-4 py-8 sm:py-10 overflow-hidden bg-[#080B12]">
        {/* Subtle ambient spatial lighting */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 overflow-hidden"
        >
          <div className="absolute -top-40 left-1/2 -translate-x-[65%] w-[520px] h-[520px] rounded-full bg-sky-500/[0.08] blur-[130px]" />
          <div className="absolute -bottom-44 left-1/2 translate-x-[-10%] w-[480px] h-[480px] rounded-full bg-amber-500/[0.06] blur-[140px]" />
        </div>

        <main className="relative z-10 w-full max-w-[420px] flex flex-col gap-5 sm:gap-6">
          <Header
            currentPlayer={currentPlayer}
            status={status}
            winner={winner}
          />

          <Scoreboard
            scores={scores}
            currentPlayer={currentPlayer}
            status={status}
            winner={winner}
          />

          <GameBoard
            board={board}
            currentPlayer={currentPlayer}
            status={status}
            winner={winner}
            winningLine={winningLine}
            onCellClick={handleCellClick}
          />

          <GameControls
            status={status}
            hasScores={hasScores}
            onNewGame={handleNewGame}
            onResetScores={handleResetScores}
          />
        </main>
      </div>
    </MotionConfig>
  );
}
