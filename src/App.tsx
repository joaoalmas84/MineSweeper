import {useEffect, useState} from "react";

import { Header,Menu, Board, Footer } from "./components";

import { Celula } from "./interfaces/celula.interface";
import { Game } from "./interfaces/game.interface";

import createBoard from "./functions/createBoard";
import revelaCelulasVazias from "./functions/revelaCelulasVazias";
import revelaCelulasTodas from "./functions/revelaMinas";
import checkClickable from "./functions/checkClickable";
import checkWin from "./functions/checkWin";

import "./App.css"

function App() {
    // +----------------------------------------------------------------------------------------------------------------
    // +----+ UseState Hooks +------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const [gameStarted, setGameStarted] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState("0");
    const [cells, setCells] = useState<Celula[][]>([[]]);
    const [numFlags, setNumFlags] = useState(0);
    const [win, setWin] = useState (false);

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Variaveis +-----------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    let time:number = 0;

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Funcoes +-------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const handleGameStart = () => {
        console.log("Start!!!");
        setGameStarted(true);
    }

    const handleGameOver = (win:boolean) => {
        const newBoard:Celula[][] = revelaCelulasTodas(cells, win);

        setWin(win);

        console.log("Over!!!");

        setCells([...newBoard]);
        setGameStarted(false);
    }

    const handleReset = () => {
        const game:Game = createBoard(selectedLevel);

        console.log("Reset!!!");

        setWin(false);
        setNumFlags(game.numMinas);
        setCells([...game.board]);
    }

    const handleLevelChange = (event:any) => {
        const { value } = event.currentTarget;

        handleReset();

        const game:Game = createBoard(value);

        console.log("levelChange");

        setSelectedLevel(value);
        setNumFlags(game.numMinas);
        setCells([...game.board]);
    }

    const handleCellsChange = (cell:Celula) => {
        let newBoard:Celula[][] = cells;

        if (cell.value == 0) {
            console.log("Empty!!!");
            newBoard = revelaCelulasVazias(cells, cell)
        }

        setCells([...newBoard]);
    }

    const handleTimer = (seg:number) => { time = seg; }

    const handleNumFlags = (num:number) => {
        setNumFlags(numFlags+num);
    }

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ HTML +----------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    return (
        <div className="container">
            <Header />
            <div className="App">
                <div className="container">
                    <Menu
                        gameStarted={gameStarted}
                        onGameReset={handleReset}
                        onGameOver={handleGameOver}
                        selectedLevel={selectedLevel}
                        onLevelChange={handleLevelChange}
                        onTimer={handleTimer}
                        cells={cells}
                        numFlags={numFlags}
                    />

                    <Board
                        selectedLevel={selectedLevel}
                        cells={cells}
                        onCellsChange={handleCellsChange}
                        gameStarted={gameStarted}
                        onGameOver={handleGameOver}
                        onGameStart={handleGameStart}
                        onNumFlags={handleNumFlags}
                        win={win}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
