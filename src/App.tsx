import { useState } from "react";

import { Header,Menu, Board, Footer } from "./components";

import { Celula } from "./interfaces/celula.interface";

import createBoard from "./functions/createBoard";
import revelaCelulasVazias from "./functions/revelaCelulasVazias";
import revelaCelulasTodas from "./functions/revelaMinas";
import checkClickable from "./functions/checkClickable";

import "./App.css"
import { Game } from "./interfaces/game.interface";

function App() {
    // +----------------------------------------------------------------------------------------------------------------
    // +----+ UseState Hooks +------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const [gameStarted, setGameStarted] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState("0");
    const [cells, setCells] = useState<Celula[][]>([[]]);
    const [numFlags, setNumFlags] = useState(0);

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

    const handleGameOver = () => {
        const newBoard:Celula[][] = revelaCelulasTodas(cells);

        console.log("Over!!!");

        setCells([...newBoard]);
        setGameStarted(false);
    }

    const handleReset = () => {
        if (checkClickable(cells)) { return; }

        console.log("Reset!!!");

        const game:Game = createBoard(selectedLevel);

        setNumFlags(game.numMinas);
        setCells([...game.board]);
    }

    const handleLevelChange = (event:any) => {
        const { value } = event.currentTarget;
        const game:Game = createBoard(value);

        console.log("levelChange");

        setSelectedLevel(value);
        setNumFlags(game.numMinas);
        setCells([...game.board]);
    }

    const handleCellsChange = (cell:Celula) => {
        if (cell.value == 0) {
            console.log("Empty!!!");
            const newBoard:Celula[][] = revelaCelulasVazias(cells, cell)
            setCells([...newBoard]);
        }
    }

    const handleTimer = (seg:number) => { time = seg; }

    const handleNumFlags = (num:number) => {
        setNumFlags(numFlags+num);
        console.log(`numFlags: ${numFlags}`);
    }


    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Inicalizacoes +-------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

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
                    />

                    <Board
                        selectedLevel={selectedLevel}
                        cells={cells}
                        onCellsChange={handleCellsChange}
                        gameStarted={gameStarted}
                        onGameOver={handleGameOver}
                        onGameStart={handleGameStart}
                        onNumFlags={handleNumFlags}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
