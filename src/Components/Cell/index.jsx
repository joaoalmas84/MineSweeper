import React from "react";
import "./style.css";


function Cell(props) {
  const value = props;

  let emoji;
  if (value === "flag") {
    emoji = "🚩";
  } else if (value === "bomb") {
    emoji = "💣";
  } else {
    emoji = " "
  }
  
  return ( <div className="cell">  </div> );
  //return ( <div className="cell">{ value }</div> );
}

export default Cell;
