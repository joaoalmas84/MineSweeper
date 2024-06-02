import { useState, useEffect } from "react";

import { State } from "../../interfaces/state.interface";

import {
    NORMAL, CLICKED, PRESENCA_MINA, PROVAVEL_MINA, GAME_OVER,
    MINE, STANDBY_FASE, IN_GAME_FASE, GAME_OVER_FASE
} from "../../constants/constants";

import "./cell.css";

function Cell(props:any) {
    const { cell, onClickCell, onNumFlags, win } = props;

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ UseState Hooks +------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const [state, setState] = useState<State>(
        {estado:NORMAL, content: "", color: cell.color}
    );

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Variaveis +-----------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------
    // Estas são por e simplesmente variáveis auxiliares
    let estado:string;
    let content:string;
    let color: any;

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Funcoes +-------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const handleMouse1 = () => {

        if (state.estado == CLICKED || !cell.clickable) { return; }

        cell.revelada = true;

        onClickCell(cell, true);

        if (cell.mine) {
            setState({estado:MINE, content:"💣", color: cell.color});
        } else {
            estado = CLICKED;
            content = cell.value > 0 ? cell.value.toString() : "";

            setState({estado:estado, content:content, color: cell.color});
        }

    }

    const handleMouse2 = (event:any) => {

        event.preventDefault();

        if (state.estado == CLICKED || !cell.clickable) { return; }

        onClickCell(cell, false);

        switch (state.estado) {
            case NORMAL:
                cell.flagged = true;
                onNumFlags(-1);
                setState({estado:PRESENCA_MINA, content:"🚩", color: cell.color});
                break;

            case PRESENCA_MINA:
                cell.flagged = false;
                onNumFlags(1);
                setState({estado:PROVAVEL_MINA, content:"?", color: {color: "green"}});
                break;

            case PROVAVEL_MINA:
                setState({estado:NORMAL, content:"", color: cell.color});
                break;

            default:
                break;
        }
    }

    const renderStandBy = () => {
        cell.renderType = "";

        setState({estado:NORMAL, content:"", color: cell.color});
    }

    const renderInGame = () => {

        if (cell.revelada && [NORMAL, PRESENCA_MINA, PROVAVEL_MINA].includes(state.estado)) {

            estado = CLICKED;
            content = cell.value > 0 ? cell.value.toString() : "";

            cell.renderType = "";

            setState({estado: estado, content: content, color: cell.color});
        }

    }

    const renderGameOverLose = () => {

        if (!cell.mine) {

            if (state.estado != NORMAL) {
                estado = state.estado + " " + GAME_OVER;
                content = state.content;
                color = state.color;
            } else {
                estado = GAME_OVER;
                color = cell.color;
            }

        } else {

            if (state.estado == MINE) {
                estado = state.estado + " " + GAME_OVER;
            } else {
                estado = GAME_OVER;
            }

            if (cell.revelada) { content = "💣"; }
        }

        cell.renderType = "";

        setState({estado:estado, content:content, color: color});
    }

    const renderGameOverWin = () => {

        if (state.estado != NORMAL) {
            estado = state.estado + " " + GAME_OVER;
            content = state.content;
            color = state.color;
        } else {
            estado = GAME_OVER;
            color = cell.color;
        }

        cell.renderType = "";

        setState({estado:estado, content:content, color: color});
    }

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ UseEffects +----------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        switch (cell.renderType) {
            case STANDBY_FASE:
                renderStandBy();
                break;
            case IN_GAME_FASE:
                renderInGame();
                break;
            case GAME_OVER_FASE:
                win ? renderGameOverWin() : renderGameOverLose();
                break;
            default:
                break;
        }
    });

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ HTML +----------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    return (
        <div
            className={"cell " + state.estado}
            onClick={handleMouse1}
            onContextMenu={handleMouse2}
            style={state.color}
        >
            <p>{ state.content }</p>

        </div>
    );
}

export default Cell;
