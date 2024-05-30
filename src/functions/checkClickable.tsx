import {Celula} from "../interfaces/celula.interface";

function checkClickable(board:Celula[][]):boolean {
    const nLin:number = board.length;
    const nCol:number = board[0].length;

    for (let i = 0; i < nLin; i++) {
        for (let j = 0; j < nCol; j++) {
            if (!board[i][j].clickable) { return false; }
        }
    }

    return true;
}

export default checkClickable;