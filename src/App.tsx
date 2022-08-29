import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import TicTacToe from './1-tic-tac-toe';
import TicTacToeWithRedux from './2-tic-tac-toe-with-redux';
import './App.css';


function Home () {
  return (
    <>
      <main>
        <h2>List of mini projects done:</h2>
        <p>Here you can select any of these projects done:</p>
      </main>
      <nav>
        <ol>
          <li><Link to={`/1-tic-tac-toe`}>Tic tac toe</Link></li>
          <li><Link to={`/2-tic-tac-toe-with-redux`}>Tic tac toe with Redux</Link></li>
        </ol>
      </nav>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Welcome to React Study!</h1>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/1-tic-tac-toe`} element={<TicTacToe />} />
        <Route path={`/2-tic-tac-toe-with-redux`} element={<TicTacToeWithRedux />} />
      </Routes>
    </div>
  );
}

export default App;
