import { useState } from "react";

import { Timer } from "../index.js"

import { TIMEOUTGAME_BASICO, TIMEOUTGAME_INTERMEDIO, TIMEOUTGAME_AVANCADO } from "../../constants/constants"

import checkClickable from "../../functions/checkClickable";

import "./menu.css"

function Menu(props:any) {
    const {cells, gameStarted, onGameReset, onGameOver, selectedLevel, onLevelChange, onTimer} = props;

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ UseState Hooks +------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Variaveis +-----------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    let timeout: number = 0;

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Funcoes +-------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const handleClickButton = () => {
        gameStarted ? onGameOver() : onGameReset();
    }

    const handleTimer = (seg:number) => {
        onTimer(seg);
    };

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Render +--------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    switch (selectedLevel) {
        case "1":
            timeout = TIMEOUTGAME_BASICO;
            break;
        case "2":
            timeout = TIMEOUTGAME_INTERMEDIO;
            break;
        case "3":
            timeout = TIMEOUTGAME_AVANCADO;
            break;
    }

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ HTML +----------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    return (
        <div className="container">
            <div className="menu">

                <div className="meta-data">

                    <button
                        className="start"
                        hidden={selectedLevel === "0" || (!gameStarted && checkClickable(cells))}
                        onClick={handleClickButton}
                    >
                        {gameStarted ? "Terminar" : "Novo Jogo"}
                    </button>

                    <div className="timer">
                        {gameStarted && <Timer onTimer={handleTimer}/>}
                    </div>

                    <select id="level" defaultValue="0" hidden={gameStarted} onChange={onLevelChange}>

                        <option value="0">Nível...</option>
                        <option value="1">Básico</option>
                        <option value="2">Intermédio</option>
                        <option value="3">Avançado</option>

                    </select>

                </div>

            </div>
        </div>
    );
}

export default Menu;