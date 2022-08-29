import TicTacToeActions, { TicTacToeActionTypes } from "./TicTacToeActions";

export function increaseDimension (): TicTacToeActions {
  return {
    type: TicTacToeActionTypes.DIMENSION_INCREMENT,
  };
};

export const decreaseDimension = () : TicTacToeActions => {
  return {
     type: TicTacToeActionTypes.DIMENSION_DECREMENT,
  };
};