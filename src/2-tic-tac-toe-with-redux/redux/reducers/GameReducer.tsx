import { TicTacToeActionTypes } from "../actions/TicTacToeActions";

const GAME_INITIAL_STATE: TicTacToeState = {
  game: {
    dimension: 3,
    history: [{
      squares: Array(Math.pow(3, 2)).fill(null),
    }],
    winner: null,
    winnerLines: [], //calculateWinnerLines(props.dimension),
    stepNumber: 0,
    xIsNext: true,
  }
};

const gameReducer = (state: TicTacToeState = GAME_INITIAL_STATE, action: { type: TicTacToeActionTypes; }): TicTacToeState => {
  switch (action.type) {
    case TicTacToeActionTypes.DIMENSION_INCREMENT:
      return {
        ...state, 
        game: {
          ...state.game,
          dimension: state.game.dimension + 1
        },
      };

    case TicTacToeActionTypes.DIMENSION_DECREMENT:
      return {
        ...state, 
        game: {
          ...state.game,
          dimension: state.game.dimension - 1
        },
      };

    default: return state;
  }
};

export default gameReducer;