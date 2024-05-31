import {Celula} from "../interfaces/celula.interface";

function checkWin(board:Celula[][]):boolean {
    const nLin:number = board.length;
    const nCol:number = board[0].length;

    for (let i:number = 0; i < nLin; i++) {
        for (let j:number = 0; j < nCol; j++) {
            if (!board[i][j].mine && !board[i][j].revelada) {
                return false;
            }
        }
    }

    return true;
}

export default checkWin;