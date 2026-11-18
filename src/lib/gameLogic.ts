import type { BoardEvaluation, BoardState, Player, WinningLine } from '../types/game';

export const WINNING_COMBINATIONS: readonly WinningLine[] = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
] as const;

export function createInitialBoard(): BoardState {
  return Array<null>(9).fill(null);
}

export function checkWinner(board: BoardState): { winner: Player; line: WinningLine } | null {
  for (const line of WINNING_COMBINATIONS) {
    const [a, b, c] = line;
    const cellA = board[a];
    if (cellA !== null && cellA === board[b] && cellA === board[c]) {
      return { winner: cellA, line };
    }
  }
  return null;
}

export function isBoardFull(board: BoardState): boolean {
  return board.every((cell) => cell !== null);
}

export function evaluateBoard(board: BoardState): BoardEvaluation {
  const win = checkWinner(board);
  if (win) {
    return {
      status: 'won',
      winner: win.winner,
      winningLine: win.line,
    };
  }

  if (isBoardFull(board)) {
    return {
      status: 'draw',
      winner: null,
      winningLine: null,
    };
  }

  return {
    status: 'playing',
    winner: null,
    winningLine: null,
  };
}

export function getNextPlayer(currentPlayer: Player): Player {
  return currentPlayer === 'X' ? 'O' : 'X';
}

export function getWinningLineCoordinates(line: WinningLine): {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
} {
  // Cell centers in a 3x3 grid with subtle gap compensation
  const centers = ['15.6%', '50%', '84.4%'] as const;
  const startIndex = line[0];
  const endIndex = line[2];

  const startRow = Math.floor(startIndex / 3);
  const startCol = startIndex % 3;
  const endRow = Math.floor(endIndex / 3);
  const endCol = endIndex % 3;

  return {
    x1: centers[startCol],
    y1: centers[startRow],
    x2: centers[endCol],
    y2: centers[endRow],
  };
}
