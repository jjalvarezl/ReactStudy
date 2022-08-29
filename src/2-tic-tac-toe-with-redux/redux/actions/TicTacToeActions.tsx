export enum TicTacToeActionTypes {
  DIMENSION_INCREMENT = "DIMENSION_INCREMENT",
  DIMENSION_DECREMENT = "DIMENSION_DECREMENT"
}

export default interface TicTacToeActions {
    type: TicTacToeActionTypes
}