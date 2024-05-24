import React, { useState } from "react";

import "./cell.css";

import { Celula } from "../../celula/celula.interface";

function Cell(props:any) {
    const { cell, gameStarted } :
        {cell: Celula, gameStarted: boolean} = props;

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ UseState Hooks +------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const [clicked, setClicked] = useState(false);

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Variaveis +-----------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    let content:string;
    let cellClass = "";

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Funcoes +-------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    if (gameStarted) {
        cellClass = clicked ? "clicked" : "gameStarted";
    }
    if (gameStarted) {
        if (cell.bomb) { content = "💣";}
        else {
            if (cell.value > 0) { content = cell.value.toString(); }
            else { content = ""; }
        }
    } else { content = ""; }

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ HTML +----------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    return (
        <div className={"cell " + cellClass}
             onClick={() => {
                 if (!clicked && gameStarted) {
                     setClicked(true);
                 }
             }}
        >
            { clicked && content }
        </div>
    );
}

export default Cell;
