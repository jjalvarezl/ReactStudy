import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import TicTacToe from './1-tic-tac-toe';
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
        </ol>
      </nav>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Welcome to React Study! {`${process.env.REACT_APP_PUBLIC_URL}/`}</h1>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/1-tic-tac-toe`} element={<TicTacToe />} />
      </Routes>
    </div>
  );
}

export default App;
