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
        <Link to="/1-tic-tac-toe">Tic tac toe</Link>
      </nav>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Welcome to React Study!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="1-tic-tac-toe" element={<TicTacToe />} />
      </Routes>
    </div>
  );
}

export default App;
