import { Cell } from "../index.js"

import { Celula } from "../../interfaces/celula.interface";

import { BASICO, INTERMEDIO, AVANCADO } from "../../constants/constants"

import checkClickable from "../../functions/checkClickable";

import "./board.css";

function Board(props:any) {
    const { selectedLevel, cells, onCellsChange, gameStarted, onGameOver, onGameStart} = props

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
        if (!gameStarted) { onGameStart(); }

        if (cell.mine) {
            console.log("Bomb!!!");
            onGameOver();
        } else {
            onCellsChange(cell);
        }
    }

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Render +--------------------------------------------------------------------------------------------------
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

                <div id="msg" hidden={!checkClickable(cells) || gameStarted}>
                    <p>Clica numa célula para começar a jogar!</p>
                </div>

                <div id="board" className={classLevel}>
                    {cells.map((lin: Celula[], linIndex: number) => (
                        lin.map((elem: Celula, colIndex: number) => (
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
    } else {
        return (<img src="/logo192.png"/>);
    }
}

export default Board;
