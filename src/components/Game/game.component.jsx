import React from "react";

import "./game.css"

import {Board, Menu, Timer} from "../index";

function Game() {
  return (
    <div className="game">
      <Menu />
      <Board />
    </div>

  );
}

export default Game;