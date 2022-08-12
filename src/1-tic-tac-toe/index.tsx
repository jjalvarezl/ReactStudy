import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css"

//------------------ PROPS ----------------------

type SquareProps = {
  value: string | null,
  onClick: () => void
}

interface BoardProps {
  dimension: number,
  squares: string[];
  onClick: (i: number) => void
}

interface GameProps {
  dimension: number;
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

//------------------ AUX FUNCTIONS ----------------------

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

//------------------ BOARD COMPONENT ----------------------
class Board extends Component<BoardProps> {
  renderSquare(i: number) {
    return (
      <Square
        key={"square-" + i.toString()}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    
    let renderBoard: JSX.Element[] = [];
    for (let i: number = 0; i < this.props.dimension; i++) {
      let renderRow: JSX.Element[] = []
      for (let j: number = 0; j < this.props.dimension; j++) {
        renderRow.push(this.renderSquare(i * this.props.dimension + j));
      }
      renderBoard.push(<div key={"board-row-" + i.toString()} className="board-row">{renderRow}</div>);
    }

    return (
      <div className="renderStatus">
        {renderBoard}
      </div>
    );
  }
}

//------------------ SQUARE COMPONENT ----------------------

function Square(props: SquareProps) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

//------------------ GAME COMPONENT ----------------------
class Game extends Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props);
    this.state = {
      dimension: props.dimension,
      history: [{
        squares: Array(Math.pow( this.props.dimension, 2 )).fill(null),
      }],
      winner: null,
      winnerLines: calculateWinnerLines(props.dimension),
      stepNumber:0,
      xIsNext: true,
    }
  }

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (!this.state.winner) {
      const fillSquare = !squares[i];
      squares[i] = this.state.xIsNext && fillSquare ? 'X' : 'O';
      if (fillSquare) {
        this.setState({ 
          history: history.concat([{
            squares: squares,
          }]),
          xIsNext: !this.state.xIsNext,
          winnerLines: calculateWinnerLines(this.state.dimension),
          winner: calculateWinner(this.state.winnerLines, squares),
          stepNumber: history.length,
        });
      }
    }
  }

  handleDimmensionChange(newDimension: number) {
    if (newDimension !== this.state.dimension) {
      this.setState({
        dimension: newDimension,
        winner: null,
        xIsNext: true,
        winnerLines: calculateWinnerLines(newDimension),
        stepNumber:0,
        history: [{
          squares: Array(Math.pow( newDimension, 2 )).fill(null),
        }],
      });
    }
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    let status: string;
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const moves = this.state.history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let isFullfilledBoard = true;
    for (let i = 0; i<current.squares.length && isFullfilledBoard; i++ ){
      isFullfilledBoard = isFullfilledBoard && current.squares[i] != null;
    }

    if (this.state.winner) {
      status = "Winner: "+ this.state.winner;
    } else if (!this.state.winner && isFullfilledBoard) {
      status = "No winner!!!";
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    
    return (
      <>
      <div className="game-configuration">
        <label>
          Dimension:
          <input type="number" value={this.state.dimension} 
            onChange={(event) => {this.handleDimmensionChange(+event.target.value)}}
            min="2" max="10"
          />
        </label>

      </div>
      <hr />
      <div className="game">
        <div className="game-board">
          <Board 
            dimension={this.state.dimension} 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
      </>
    );
  }
}


function TicTacToe() {
  return (
    <>
      <main>
        <Game dimension={3}/>
      </main>
      <nav>
        <Link to={`/`}>Home</Link>
      </nav>
    </>
  );
}

export default TicTacToe;