import { Timer } from "../index.js"

import checkClickable from "../../functions/checkClickable";

import "./menu.css"

function Menu(props:any) {
    const {gameStarted, onGameReset, onGameOver, selectedLevel, onLevelChange, onTimer, cells, numFlags} = props;

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ UseState Hooks +------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Variaveis +-----------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Funcoes +-------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const handleClickButton = () => {
        gameStarted ? onGameOver() : onGameReset();
    }

    const handleTimer = (seg:number) => {
        if (gameStarted) { onTimer(seg); }
    };

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Render +--------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

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

                    <div className="sub-container">

                        <div className="num-flags">
                            {gameStarted && <div className="flag">🚩</div>}
                            {gameStarted &&
                                <div className="content">
                                    {numFlags}
                                </div>
                            }
                        </div>


                        <div className="timer">
                            {gameStarted &&
                                <div className="content">
                                    {gameStarted && <Timer onTimer={handleTimer}/>}
                                </div>
                            }
                            {gameStarted && "seg"}
                        </div>

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