import { useState } from "react";

import "./menu.css"

import { Timer } from "../index.js"

function Menu(props:any) {
    const {gameStarted, onGameStart, selectedLevel, onLevelChange} = props;

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ UseState Hooks +------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const [timerAlmostDone, setTimerAlmostDone] = useState(false);

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Variaveis +-----------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const classGameStarted = gameStarted ? "gameStarted" : "";
    const timerStyle = timerAlmostDone ? {backgroundColor: 'red'} : "";

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Funcoes +-------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const handleTimer = (seg:number) => {
        if (seg == 0) {onGameStart();}
        else if (seg < 10) {
            setTimerAlmostDone(true);
        }
    };

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ HTML +----------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    return (
        <div className="container">
            <div className="menu">
                <div className={"timer " + timerStyle}>
                    <Timer />
                </div>

                <div className="meta-data">

                    <button className="start">Start</button>

                    <select id="level" defaultValue="0"
                            disabled={gameStarted}
                            onChange={onLevelChange}>

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