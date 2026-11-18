export type Player = 'X' | 'O';

export type CellValue = Player | null;

export type BoardState = CellValue[];

export type GameStatus = 'playing' | 'won' | 'draw';

export type WinningLine = [number, number, number];

export interface WinResult {
  winner: Player;
  line: WinningLine;
}

export interface BoardEvaluation {
  status: GameStatus;
  winner: Player | null;
  winningLine: WinningLine | null;
}

export interface ScoreboardData {
  X: number;
  O: number;
  draws: number;
}
