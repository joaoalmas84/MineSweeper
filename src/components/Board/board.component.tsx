import {useEffect, useState} from "react";

import { Cell } from "../index.js"

import { Celula } from "../../interfaces/celula.interface";

import { BASICO, INTERMEDIO, AVANCADO } from "../../constants/constants"

import checkClickable from "../../functions/checkClickable";

import "./board.css";
import checkWin from "../../functions/checkWin";

function Board(props:any) {
    const { selectedLevel, cells, onCellsChange, gameStarted, onGameOver, onGameStart, onNumFlags, win} = props

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ UseState Hooks +------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Variaveis +-----------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    let classLevel: string;
    let msg: string = "";
    let msgStyle: any;

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Funcoes +-------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const handleClickCell = (cell:Celula, mouse1:boolean) => {
        if (!gameStarted) { onGameStart(); }

        if (mouse1) {
            if (cell.mine) {
                console.log("Bomb!!!");
                onGameOver(false);
            } else {
                onCellsChange(cell);
            }
        }
    }

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ UseEffects +----------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        if (selectedLevel != "0") {
            console.log("CheckWin...");
            if (checkWin(cells) && gameStarted) {
                console.log("Win!!!");
                onGameOver(true);
            }
        }
    }, [cells]);

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

    msg = win ? "Ganhaste!" : "Perdeste...";
    msgStyle = win ? {color: "lightgreen"} : {color: "red"};

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ HTML +----------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------
    if (classLevel != "") {
        return (
            <div className="container">

                <div id="msg" hidden={!checkClickable(cells) || gameStarted}>
                    <p>Clica numa célula para começares a jogar!</p>
                </div>

                <div id="msg" hidden={checkClickable(cells) || gameStarted} style={msgStyle}>
                    <p>{msg}</p>
                </div>

                <div id="board" className={classLevel}>
                    {cells.map((lin: Celula[], linIndex: number) => (
                        lin.map((elem: Celula, colIndex: number) => (
                            <Cell
                                key={`${linIndex}-${colIndex}`}
                                cell={elem}
                                gameStarted={gameStarted}
                                onClickCell={handleClickCell}
                                onNumFlags={onNumFlags}
                                win={win}
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
