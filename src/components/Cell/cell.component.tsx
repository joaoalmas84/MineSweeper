import { useState } from "react";

import { Celula } from "../../celula/celula.interface";

import {NORMAL, CLICKED, PRESENCA_MINA, PROVAVEL_MINA, GAME_OVER, MINE } from "../../constants/constants";

import "./cell.css";

function Cell(props:any) {
    const { cell, gameStarted, onClickCell } :
        { cell:Celula, gameStarted:boolean, onClickCell:any } = props;

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ UseState Hooks +------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const [state, setState] = useState(NORMAL);
    const [content, setContent] = useState("");

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Variaveis +-----------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    let cellClass:string = "";
    let cellStyle:any = {};

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Funcoes +-------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const handleMouse1 = () => {
        if (state == CLICKED || !gameStarted) { return; }

        console.log(`Mouse1: celula(${cell.lin}, ${cell.col})`);

        cell.mine ? setState(MINE) : setState(CLICKED);

        onClickCell(cell);

        if (cell.mine) {
            setContent("💣");
        } else {
            cell.value > 0 ? setContent(cell.value.toString()) : setContent("");
        }

    }

    const handleMouse2 = (event:any) => {
        event.preventDefault();

        if (state == CLICKED || !gameStarted) { return; }

        console.log(`Mouse2: celula(${cell.lin}, ${cell.col})`);

        switch (state) {
            case NORMAL:
                setState(PRESENCA_MINA);
                setContent("🚩");
                break;
            case PRESENCA_MINA:
                setState(PROVAVEL_MINA);
                setContent("?");
                break;
            case PROVAVEL_MINA:
                setState(NORMAL);
                setContent("");
                break;
            default:
                break;
        }
    }

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ UseEffects +----------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Render +--------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    if (cell.revelada && [NORMAL, PRESENCA_MINA, PROVAVEL_MINA].includes(state)) {

        if (cell.mine) {
            setContent("💣");
        } else {
            cell.value > 0 ? setContent(cell.value.toString()) : setContent("");
        }

        gameStarted ? setState(CLICKED) : setState(GAME_OVER);

    }

    cellClass = gameStarted ? "gameStarted " + state : state;

    if (cell.value > 0) {
        switch (content) {
            case "1":
                cellStyle = { color: 'white' }
                break;
            case "2":
                cellStyle = { color: 'lawngreen' }
                break;
            case "3":
                cellStyle = { color: 'red' }
                break;
            case "4":
                cellStyle = { color: 'darkblue' }
                break;
            default:
                cellStyle = {};
                break;
        }
    }

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ HTML +----------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    return (
        <div
            className={"cell " + cellClass}
            onClick={handleMouse1}
            onContextMenu={handleMouse2}
            style={cellStyle}
        >
            <p>{ content }</p>

        </div>
    );
}

export default Cell;
