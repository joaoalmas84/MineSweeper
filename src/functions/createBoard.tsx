import { Celula } from "../celula/celula.interface";

import {NORMAL} from "../constants/constants";

function createBoard(level: string):Celula[] {
    let nMines:number, nLin:number, nCol:number;

    switch (level) {
        case "1":
            nLin = nCol = 9;
            nMines = 10;
            break;

        case "2":
            nLin = nCol = 16;
            nMines = 40;
            break;

        case "3":
            nLin = 30;
            nCol = 16
            nMines = 99;
            break;

        default:
            nLin = nCol = 0;
            nMines = 0;
            break;
    }

    const board:Celula [] = Array.from({ length: nLin*nCol }, () => (
        { bomb: false, value: 0, state: NORMAL}
    ));

    console.log(board.length);

    placeMines(board, nLin*nCol, nMines);

    placeValues(board, nLin, nCol);

    return board;
}

function placeMines(board1D:Celula[], nCells:number, nMines:number):void {
    let minesPlaced:number = 0;

    while (minesPlaced < nMines) {
        let index = getRandomInt(0, nCells - 1);

        if (!board1D[index].bomb) {
            board1D[index].bomb = true;
            board1D[index].value = -1;
            minesPlaced++;
        }
    }
}

function getRandomInt(min:number, max:number):number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function placeValues(board1D:Celula[], nLin:number, nCol:number):void {
    let count: number = 0;

    const board2D:Celula[][] = board1D_to_board2D(board1D, nLin, nCol);

    for (let l:number = 0; l < nLin; l++) {
        for (let c:number = 0; c < nCol; c++) {
            if (board2D[l][c].bomb) { continue; }
            else {

                count = 0;
                for (let i: number = -1; i <= 1; i++) {
                    for (let j: number = -1; j <= 1; j++) {
                        if (i == 0 && j == 0) { // não tem nenhuma bomba vizinha
                            board2D[l][c].value = 0;
                        } else if ((l + i >= 0)
                            && (l + i < nLin)
                            && (c + j >= 0)
                            && (c + j < nCol)) {

                            if (board2D[l + i][c + j].bomb) {
                                count++;
                            }
                        }
                    }
                }

                board2D[l][c].value = count;

            }
        }
    }

    board1D = board2D_to_board1D(board2D, nLin, nCol);
}

function board2D_to_board1D(board2D:Celula[][], nLin:number, nCol:number):Celula[] {
    let k:number = 0;
    const board1D:Celula [] = Array.from({ length: nLin*nCol }, () => (
        { bomb: false, value: 0, state: NORMAL })
    );

    for (let i:number = 0; i < nLin; i++) {
        for (let j:number = 0; j < nCol; j++) {
            board1D[k++] = board2D[i][j];
        }
    }

    return board1D;
}

function board1D_to_board2D(board1D: Celula[], nLin: number, nCol: number):Celula[][] {
    let k:number = 0;
    const board2D: Celula[][] = Array.from({ length: nLin }, () =>
        Array.from({ length: nCol }, () => (
            { bomb: false, value: 0, state: 'empty' }
        ))
    );

    for (let i:number = 0; i < nLin; i++) {
        for (let j:number = 0; j < nCol; j++) {
            board2D[i][j] = board1D[k++];
            console.log(board2D[i][j].bomb);
            console.log(k);
        }
    }

    return board2D;
}

export default createBoard;