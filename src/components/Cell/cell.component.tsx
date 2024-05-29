import React, {useEffect, useState } from "react";

import "./cell.css";

import { Celula } from "../../celula/celula.interface";
import {NORMAL, CLICKED, PRESENCA_MINA, PROVAVEL_MINA } from "../../constants/constants";

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

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Funcoes +-------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const handleMouse1 = () => {
        if (state == CLICKED || !gameStarted) { return; }

        console.log(`Mouse1: celula(${cell.lin}, ${cell.col})`);

        onClickCell(cell);

        setState(CLICKED);

        if (cell.mine) {
            setContent("💣")
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

    const hasValue = ():boolean => {
        return [CLICKED, PRESENCA_MINA, PROVAVEL_MINA].includes(state);
    }

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ UseEffects +----------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Inicalizacoes +-------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    // Para casos de re-render
    if (cell.revelada && state != CLICKED) {
        setState(CLICKED);
        cell.value > 0 ? setContent(cell.value.toString()) : setContent("");
    }

    if (gameStarted) {

        cellClass = "gameStarted";

        switch(state) {
            case NORMAL:
                break;
            case CLICKED:
                cellClass = " clicked";
                break;
            case PRESENCA_MINA:
                cellClass += " presenca_mina";
                break;
            case PROVAVEL_MINA:
                cellClass += " provavel_mina";
                break;
            default:
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
        >
            <p>{ hasValue() && content }</p>

        </div>
    );
}

export default Cell;
