import "./board.css";

import { useState } from "react";

import { Celula } from "../../celula/celula.interface";
import { Cell } from "../index.js"
import revelaCelulasVazias from "../../functions/revelaCelulasVazias";
import { BASICO, INTERMEDIO, AVANCADO } from "../../constants/constants"

function Board(props:any) {
    const { cells, selectedLevel, gameStarted, onGameStart } = props

    console.log("BOARD");
    // +----------------------------------------------------------------------------------------------------------------
    // +----+ UseState Hooks +------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------


    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Variaveis +-----------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    let classLevel: string;

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Funcoes +-------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const handleClickCell = (cell:Celula) => {
        if (cell.mine) {
            console.log("Bomb!!!");
            onGameStart();
        } else if (cell.value == 0) {
            console.log("Empty!!!");
            revelaCelulasVazias(cells, cell);
        }
    }

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Inicalizacoes +-------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    switch (selectedLevel) {
        case "1":
            classLevel = BASICO;
            break;
        case "2":
            classLevel = INTERMEDIO;
            break;
        case "3":
            classLevel = AVANCADO;
            break;
        default:
            classLevel= "";
            break;
    }

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ HTML +----------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------
    if (classLevel != "") {
        return (
            <div className="container">
                <div id="board" className={classLevel}>
                    {cells.map((lin:Celula[], linIndex:number) => (
                        lin.map((elem:Celula, colIndex:number) => (
                            <Cell
                                key={`${linIndex}-${colIndex}`}
                                cell={elem}
                                gameStarted={gameStarted}
                                onClickCell={handleClickCell}
                            />
                        ))
                    ))}
                </div>
            </div>
        );
    } else  {
        return (<div></div>);
    }
}

export default Board;
