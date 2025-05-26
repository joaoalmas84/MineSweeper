import { useState } from "react";

import { Timer } from "../index.js"

import checkClickable from "../../functions/checkClickable";

import "./menu.css"

function Menu(props:any) {
    const {gameStarted, onGameReset, onGameOver, onLevelChange, cells, numFlags} = props;

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
                                gameStarted ? "Stop" : "New Game"
                            }
                        </button>

                        <div className="timer">
                            <div className="content">
                                {gameStarted ? <Timer onTimer={handleTimer}/> : time}
                            </div>
                            sec
                        </div>

                    </div>

                    <select
                        id="level"
                        className={selectLevelClass}
                        disabled={gameStarted}
                        defaultValue="0"
                        onChange={onLevelChange}
                    >

                        <option value="0">Level...</option>
                        <option value="1">Basic</option>
                        <option value="2">Intermediate</option>
                        <option value="3">Advanced</option>

                    </select>

                </div>
            </div>
        </div>
    );
}

export default Menu;