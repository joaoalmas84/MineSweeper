import {STANDBY_FASE} from "../constants/constants";
import { Celula } from "../interfaces/celula.interface";
import { Game } from "../interfaces/game.interface";

function createBoard(level: string):Game {
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

    const board: Celula[][] = Array.from({ length: nLin }, (_, linIndex:number) =>
        Array.from({ length: nCol }, (_, colIndex:number) => (
            {
                mine: false, value: 0, lin: linIndex,  col: colIndex, revelada: false,
                clickable: true, renderType: STANDBY_FASE, color: {}, flagged: false
            }
        ))
    );

    placeMines(board, nLin, nCol, nMines);

    placeValues(board, nLin, nCol);

    let game:Game = {board:board, numMinas:nMines};

    return game;
}

function placeMines(board:Celula[][], nLin:number, nCol:number, nMines:number):void {
    let minesPlaced:number = 0, nCells = nLin*nCol;

    while (minesPlaced < nMines) {
        let l = getRandomInt(0, nLin - 1);
        let c = getRandomInt(0, nCol - 1);

        if (!board[l][c].mine) {
            board[l][c].mine = true;
            board[l][c].value = -1;
            minesPlaced++;
        }
    }
}

function getRandomInt(min:number, max:number):number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function placeValues(board:Celula[][], nLin:number, nCol:number):void {
    let count: number = 0;

    for (let l:number = 0; l < nLin; l++) {
        for (let c:number = 0; c < nCol; c++) {
            if (board[l][c].mine) { continue; }
            else {

                count = 0;
                for (let i: number = -1; i <= 1; i++) {
                    for (let j: number = -1; j <= 1; j++) {
                        if (i == 0 && j == 0) { // não tem nenhuma bomba vizinha
                            board[l][c].value = 0;
                        } else if ((l + i >= 0)
                            && (l + i < nLin)
                            && (c + j >= 0)
                            && (c + j < nCol)) {

                            if (board[l + i][c + j].mine) { count++; }
                        }
                    }
                }

                board[l][c].value = count;
                board[l][c].color = setColor(count);

            }
        }
    }

}

function setColor(value: number):any {
    let cellStyle:any;

    switch (value) {
        case 1:
            cellStyle = { color: '#00e5ff' };
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
        case 5:
            cellStyle = { color: 'pink' }
            break;
        case 6:
            cellStyle = { color: 'orange' }
            break;
        default:
            cellStyle = {};
            break;
    }

    return cellStyle;
}

export default createBoard;