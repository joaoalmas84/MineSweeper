import React from "react";
import Cell from "../Cell";
import "./style.css";

function Board() {
  let level = 3;

  let classLevel;
  let n;

  const cells = [];

  switch (level) {
    case 1:
      classLevel = "basico";
      n = 9 * 9;
      break;
    case 2:
      classLevel = "intermedio";
      n = 16 * 16;
      break;
    case 3:
      classLevel = "avancado";
      n = 30 * 16;
      break;
  }

  for (let i = 0; i < n; i++) {
    cells.push(<Cell key={i}/>);    
  }

  return (
    <div id="board" className={classLevel}>
      {cells}
    </div>
  );
}

export default Board;