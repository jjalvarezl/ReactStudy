interface TicTacToeState{
    game: GameState,
}

interface GameState {
  dimension: number;
  history: {
    squares: string[]
  }[],
  winner: string | null;
  winnerLines: number[][];
  xIsNext: boolean;
  stepNumber: number;
}