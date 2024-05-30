import { useState, useEffect } from "react";

import { Celula } from "../../interfaces/celula.interface";

import {
    NORMAL,
    CLICKED,
    PRESENCA_MINA,
    PROVAVEL_MINA,
    GAME_OVER,
    MINE,
    STANDBY_FASE,
    IN_GAME_FASE, GAME_OVER_FASE
} from "../../constants/constants";

import "./cell.css";
import { State } from "../../interfaces/state.interface";

function Cell(props:any) {
    const { cell, gameStarted, onClickCell } :
        { cell:Celula, gameStarted:boolean, onClickCell:any } = props;

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ UseState Hooks +------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const [state, setState] = useState<State>(
        {estado:NORMAL, content: "", cellStyle: {}}
    );

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Variaveis +-----------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    let cellClass:string = "";
    let cellStyle:any = {};
    let estado:string;
    let content:string;

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Funcoes +-------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const handleMouse1 = () => {

        if ( state.estado == CLICKED || !cell.clickable) { return; }

        console.log(`Mouse1: celula(${cell.lin}, ${cell.col})`);

        onClickCell(cell);

        if (cell.mine) {
            setState({estado:MINE, content:"💣", cellStyle: {}});
        } else {
            estado = CLICKED;
            content = cell.value > 0 ? cell.value.toString() : "";

            setState({estado:estado, content:content, cellStyle: {}});
        }

    }

    const handleMouse2 = (event:any) => {
        event.preventDefault();

        if (state.estado == CLICKED || !cell.clickable) { return; }

        console.log(`Mouse2: celula(${cell.lin}, ${cell.col})`);

        switch (state.estado) {
            case NORMAL:
                setState({estado:PRESENCA_MINA, content:"🚩", cellStyle: {}});
                break;

            case PRESENCA_MINA:
                setState({estado:PROVAVEL_MINA, content:"?", cellStyle: {}});
                break;

            case PROVAVEL_MINA:
                setState({estado:NORMAL, content:"", cellStyle: {}});
                break;

            default:
                break;
        }
    }

    const renderStandBy = () => {
        cellClass = estado != NORMAL ? estado : "";

        cell.renderType = "";

        setState({estado:NORMAL, content:"", cellStyle: {}});
    }

    const renderInGame = () => {

        if (cell.revelada && [NORMAL, PRESENCA_MINA, PROVAVEL_MINA].includes(state.estado)) {

            estado = CLICKED;
            content = cell.value > 0 ? cell.value.toString() : "";

            switch (cell.value) {
                case 1:
                    cellStyle = { color: 'white' };
                    break;
                case 2:
                    cellStyle = { color: 'lawngreen' };
                    break;
                case 3:
                    cellStyle = { color: 'red' };
                    break;
                case 4:
                    cellStyle = { color: 'darkblue' };
                    break;
                default:
                    cellStyle = {};
                    break;
            }

            cell.renderType = "";

            setState({estado:estado, content:content, cellStyle: {cellStyle}});
        }

    }

    const renderGameOver = () => {

        if (!cell.mine) {

            if (state.estado == CLICKED) {
                estado = state.estado + " " + GAME_OVER;
            } else {
                estado = GAME_OVER;
            }

            content = state.content;

        } else {

            if (state.estado == MINE) {
                estado = state.estado + " " + GAME_OVER;
            } else {
                estado = GAME_OVER;
            }

            content = "💣";
        }

        cell.renderType = "";

        setState({estado:estado, content:content, cellStyle: {}});
    }

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ UseEffects +----------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        switch (cell.renderType) {
            case STANDBY_FASE:
                console.log("Standby");
                renderStandBy();
                break;
            case IN_GAME_FASE:
                console.log("InGame");
                renderInGame();
                break;
            case GAME_OVER_FASE:
                console.log("GameOver");
                renderGameOver();
                break;
            default:
                break;
        }
    });

    state.cellStyle.toString();

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ HTML +----------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    return (
        <div
            className={"cell " + state.estado}
            onClick={handleMouse1}
            onContextMenu={handleMouse2}
            style={state.cellStyle}
        >
            <p>{ state.content }</p>

        </div>
    );
}

export default Cell;
