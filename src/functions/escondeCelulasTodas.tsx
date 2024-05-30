import { Celula } from "../celula/celula.interface";

function escondeCelulasTodas(board:Celula[][]):Celula[][] {
    const nLin:number = board.length;
    const nCol:number = board[0].length;

    for (let i = 0; i < nLin; i++) {
        for (let j = 0; j < nCol; j++) {
            board[i][j].revelada = false;
        }
    }

    return board;
}

export default escondeCelulasTodas;