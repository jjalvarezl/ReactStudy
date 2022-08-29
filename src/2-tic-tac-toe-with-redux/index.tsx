import React, { StrictMode } from "react";
import Game from "./components/GameComponent";
import { Link } from "react-router-dom";
import "./index.css"
import { Provider } from "react-redux";
import rootStore from "./redux/stores/RootStore";


function TicTacToeWithRedux() {
  return (
    <Provider store={rootStore}>
      <StrictMode>
        <main>
          <Game/>
        </main>
        <nav>
          <Link to={`/`}>Home</Link>
        </nav>
      </StrictMode>
    </Provider>
  );
}

export default TicTacToeWithRedux;