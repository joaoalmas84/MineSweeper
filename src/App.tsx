import { useState } from "react";

import { Header,Menu, Board, Footer } from "./components";

import { Celula } from "./interfaces/celula.interface";
import { Game } from "./interfaces/game.interface";

import createBoard from "./functions/createBoard";
import revelaCelulasVazias from "./functions/revelaCelulasVazias";
import revelaMinas from "./functions/revelaMinas";

import "./app.css"

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
    // +----+ Funcoes +-------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const handleGameStart = () => {
        console.log("Start!!!");
        setGameStarted(true);
    }

    const handleGameOver = (win:boolean) => {
        const newBoard:Celula[][] = revelaMinas(cells, win);

        setWin(win);

        console.log("GameOver");

        setCells([...newBoard]);
        setGameStarted(false);
    }

    const handleReset = () => {
        const game:Game = createBoard(selectedLevel);

        console.log("Reset");

        setWin(false);
        setNumFlags(game.numMinas);
        setCells([...game.board]);
    }

    const handleLevelChange = (event:any) => {
        const { value } = event.currentTarget;

        handleReset();

        const game:Game = createBoard(value);

        console.log("LevelChange");

        setSelectedLevel(value);
        setNumFlags(game.numMinas);
        setCells([...game.board]);
    }

    const handleCellsChange = (cell:Celula) => {
        let newBoard:Celula[][] = cells;

        if (cell.value == 0) {
            console.log("EmptyCell");
            newBoard = revelaCelulasVazias(cells, cell)
        }

        setCells([...newBoard]);
    }

    const handleNumFlags = (num:number) => {
        setNumFlags(numFlags + num);
    }

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ HTML +----------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    return (
        <>
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


            <div className="info-panel">
                <div>
                    <h2>How to Play</h2>
                    <p>Start by choosing a difficulty level from the menu to generate the game<br/> board.</p>
                    <ul>
                        <li><strong>Left Click</strong>: Reveal a cell.</li>
                        <li><strong>Right Click</strong>: 1x -{">"} Flag <div className="flag">🚩</div>, 2x -{">"} mark <div className="mark">?</div> signal cell as a possible mine.</li>
                        <li>Reveal all non-mine cells to win the game.</li>
                        <li>Use flags to track where you think mines are located.</li>
                        <li>Game ends when you hit a mine or successfully clear the board.</li>
                        <li>The timer begins on your first click.</li>
                    </ul>
                </div>
            </div>


        </>
    );
}

export default App;
