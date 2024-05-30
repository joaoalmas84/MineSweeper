import { useState } from "react";

import { Timer } from "../index.js"

import { TIMEOUTGAME_BASICO, TIMEOUTGAME_INTERMEDIO, TIMEOUTGAME_AVANCADO } from "../../constants/constants"

import "./menu.css"

function Menu(props:any) {
    const {gameStarted, onGameStart, onGameOver, selectedLevel, onLevelChange} = props;

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ UseState Hooks +------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const [timerStyle, setTimerStyle] = useState({});

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Variaveis +-----------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    let timeout: number = 0;

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Funcoes +-------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const handleClickButton = () => {
        gameStarted ? onGameOver() : onGameStart();
        setTimerStyle({});
    }

    const handleTimer = (seg:number) => {
        if (seg == 0) {
            onGameStart();
        } else if (seg == 9) {
            setTimerStyle({ color: 'red' });
        }
    };

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Inicalizacoes +-------------------------------------------------------------------------------------------
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

                    <button className="start" disabled={selectedLevel === "0"} onClick={handleClickButton}>
                        {gameStarted ? "Stop" : "Start"}
                    </button>

                    <div className="timer" style={timerStyle}>
                        {gameStarted && <p>Tempo</p>/*<Timer timeout={timeout} onTimer={handleTimer}/>*/ }
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