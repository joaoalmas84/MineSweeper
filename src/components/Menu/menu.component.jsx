import React from "react";

import "./menu.css"

function Menu() {
  return (
    <div className="container">
      <div className="menu">

        <button className="start">Start</button>

        <select name="level" id="level">
          <option value="0">Nível...</option>
          <option value="1">Básico</option>
          <option value="2">Intermédio</option>
          <option value="3">Avançado</option>
        </select>

      </div>
    </div>
  );
}

export default Menu;