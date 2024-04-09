import React from "react";
import Menu from "../Menu";
import Timer from "../Timer";
import Board from "../Board";


function Game() {
  return (
    <div className="game">
      <Menu />
      <Timer />
      <Board />
    </div>
  );
}

export default Game;