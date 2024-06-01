import { Timer } from "../index.js"

import checkClickable from "../../functions/checkClickable";

import "./menu.css"
import {useEffect, useState} from "react";

function Menu(props:any) {
    const {gameStarted, onGameReset, onGameOver, selectedLevel, onLevelChange, onTimer, cells, numFlags} = props;

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ UseState Hooks +------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const [time, setTime] = useState(0)

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Variaveis +-----------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    let subContainerClass:string = "sub-container";
    let selectLevelClass:string = "";

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Funcoes +-------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const handleClickButton = () => {
        gameStarted ? onGameOver() : onGameReset();
        setTime(0);
    }

    const handleTimer = (seg:number) => {
        setTime(seg);
        if (gameStarted) { onTimer(seg); }
    };

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Render +--------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    subContainerClass = (gameStarted || !checkClickable(cells)) ? subContainerClass : subContainerClass + " grayscale";
    selectLevelClass = gameStarted ? "grayscale" : "";

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ HTML +----------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    return (
        <div className="container">
            <div className="menu">
                <div className="meta-data">

                    <div className={subContainerClass}>

                        <div className="num-flags">
                            🚩
                            <div className="content"> {numFlags} </div>
                        </div>

                        <button
                            className="start"
                            onClick={handleClickButton}
                        >
                            {
                                gameStarted ? "Terminar" : "Novo Jogo"
                            }
                        </button>

                        <div className="timer">
                            <div className="content">
                                {gameStarted ? <Timer onTimer={handleTimer}/> : time}
                            </div>
                            seg
                        </div>

                    </div>

                    <select
                        id="level"
                        className={selectLevelClass}
                        disabled={gameStarted}
                        defaultValue="0"
                        onChange={onLevelChange}
                    >

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