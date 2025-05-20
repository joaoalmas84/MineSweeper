import { Celula } from "./celula.interface";

export interface Game {
    board:Celula[][];
    numMinas:number;
}