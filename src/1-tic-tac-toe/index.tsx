import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css"

/**
 * The tic tac toe game has the intention to understand step by step hoy react behaves.
 * Here you can find a short rationale of changes around the code:
 * 
 * 1. The initial code has multiple empty and non functional components to complete through it's tutorial.
 * 2. The this.renderSquare(n) functions are passing an id of the square to being draw by using props.
 * 3. Props have been replaced with state to draw an "X" inside each square. 
 *    The this.renderSquare function is now without any parameter.
 * 4. The board rendering is now depending on the board dimension. 
 *    The "key" reserverd word must be filled inside the div of the row as well as the Square component for react standards.
 *    More information at https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js
 * 5. We passed the square state to be inside the board component and not belonging each squate itself by duplicating it's state.
 */

type SquareProps = {
  value: string | null,
  onClick: () => void
}

interface BoardProps {
  dimension: number
}

interface BoardState {
  squares: string[];
}

class Square extends Component <SquareProps> {
  render() {
    return (
      <button className="square" onClick={ this.props.onClick } >
        { this.props.value }
      </button>
    );
  }
}

class Board extends Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props);
    this.state = {
      squares: Array(this.props.dimension).fill(null),
    }
  }

  handleClick(i: number) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i: number) {
    return (
      <Square 
        key={"square-"+i.toString()}
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';
    let renderBoard: JSX.Element[] = [];
    for (let i: number = 0; i < this.props.dimension; i++) {
      let renderRow: JSX.Element[] = []
      for (let j: number = 0; j < this.props.dimension; j++){
        renderRow.push(this.renderSquare(i*this.props.dimension+j));
      }
      renderBoard.push(<div key={"board-row-"+i.toString()} className="board-row">{renderRow}</div>);
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
          <Board dimension={3}/>
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
        <Game/>
      </main>
      <nav>
        <Link to={`/`}>Home</Link>
      </nav>
    </>
  );
}

export default TicTacToe;