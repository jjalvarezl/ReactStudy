import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css"

type SquareProps = {
  value: string | null,
  onClick: () => void
}

interface BoardProps {
  dimension: number
}

interface BoardState {
  squares: string[];
  xIsNext: boolean;
  winner: string | null;
  winnerLines: number[][];
}

function Square(props: SquareProps) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function calculateWinnerLines(dimension: number): number[][]{
  let winnerLines: number[][] = [];
  let firstDiagonal: number[] = [];
  let secondDiagonal: number[] = [];

  for (let i: number = 0; i<dimension; i++){
    let verticalLine: number[] = [];
    let horizontalLine: number[] = [];
    for (let j: number = 0; j<dimension; j++){
      if (i === j) firstDiagonal.push(((dimension-1) * i)+i+j);
      if (i+j === (dimension-1)) secondDiagonal.push( (dimension -1) * (i+1) );
      verticalLine.push( i + (j*dimension) );
      horizontalLine.push( j + (dimension*i));
    }
    winnerLines.push(verticalLine);
    winnerLines.push(horizontalLine);
  }

  winnerLines.push(firstDiagonal);
  winnerLines.push(secondDiagonal);

  return winnerLines;
}

function calculateWinner(winnerLines: number[][], squares: string[]): string | null {
  let winner: string | null = null;
  for (let i: number = 0; i<winnerLines.length && !winner; i++){
    winner = squares[winnerLines[i][0]];
    for (let j: number = 0; j<winnerLines[i].length && (winner = winner === squares[winnerLines[i][j]] ? winner : null); j++){}
  }
  return winner;
}

class Board extends Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props);
    this.state = {
      squares: Array( Math.pow( this.props.dimension, 2 ) ).fill(null),
      xIsNext: true,
      winner: null,
      winnerLines: calculateWinnerLines(this.props.dimension)
    }
  }

  handleClick(i: number) {
    if (!this.state.winner) {
      const squares = this.state.squares.slice();
      const fillSquare = !squares[i];
      squares[i] = this.state.xIsNext && fillSquare ? 'X' : 'O';
      if (fillSquare) {
        this.setState({ 
          squares: squares,
          xIsNext: !this.state.xIsNext,
          winner: calculateWinner(this.state.winnerLines, squares)
        });
      }
    }
  }

  renderSquare(i: number) {
    return (
      <Square
        key={"square-" + i.toString()}
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    let status: string;
    if (this.state.winner) {
      status = "Winner: "+ this.state.winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    let renderBoard: JSX.Element[] = [];
    for (let i: number = 0; i < this.props.dimension; i++) {
      let renderRow: JSX.Element[] = []
      for (let j: number = 0; j < this.props.dimension; j++) {
        renderRow.push(this.renderSquare(i * this.props.dimension + j));
      }
      renderBoard.push(<div key={"board-row-" + i.toString()} className="board-row">{renderRow}</div>);
    }

    return (
      <div>
        <div className="status">{status}</div>
        {renderBoard}
      </div>
    );
  }
}

class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board dimension={5} />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}


function TicTacToe() {
  return (
    <>
      <main>
        <Game />
      </main>
      <nav>
        <Link to={`/`}>Home</Link>
      </nav>
    </>
  );
}

export default TicTacToe;