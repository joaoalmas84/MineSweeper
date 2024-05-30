import { Celula } from "../interfaces/celula.interface";
import {IN_GAME_FASE} from "../constants/constants";

function revelaCelulasVazias(board:Celula[][], clickedCell:Celula):Celula[][] {
    const numLinhasBoard:number = board.length;
    const numColunasBoard:number = board[0].length;
    const direcoes:number[][] = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],         [0, 1],
        [1, -1], [1, 0], [1, 1]
    ]

    clickedCell.revelada = true;

    for (const[l, c] of direcoes) {
        const novaLin:number = clickedCell.lin + l;
        const novaCol:number = clickedCell.col + c;

        if (
            novaLin >= 0 && novaLin < numLinhasBoard &&
            novaCol >= 0 && novaCol < numColunasBoard &&
            !board[novaLin][novaCol].revelada &&
            !board[novaLin][novaCol].mine
        ) {

            board[novaLin][novaCol].revelada = true;
            board[novaLin][novaCol].renderType = IN_GAME_FASE;

            if (board[novaLin][novaCol].value == 0) {
                revelaCelulasVazias(board, board[novaLin][novaCol]);
            }

        }
    }

    return board;

}

export default revelaCelulasVazias;