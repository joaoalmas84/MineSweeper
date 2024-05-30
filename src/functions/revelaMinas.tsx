import { Celula } from "../interfaces/celula.interface";
import {GAME_OVER_FASE} from "../constants/constants";

function revelaMinas(board:Celula[][]):Celula[][] {
    const nLin:number = board.length;
    const nCol:number = board[0].length;

    for (let i = 0; i < nLin; i++) {
        for (let j = 0; j < nCol; j++) {

            if (board[i][j].mine) {
                board[i][j].revelada = true;
            }

            board[i][j].clickable = false;
            board[i][j].renderType = GAME_OVER_FASE;
        }
    }

    return board;
}

export default revelaMinas;