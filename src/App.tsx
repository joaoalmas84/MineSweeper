import { useState } from "react";

import { Header,Menu, Board, Footer } from "./components";

import { Celula } from "./interfaces/celula.interface";

import createBoard from "./functions/createBoard";
import revelaCelulasVazias from "./functions/revelaCelulasVazias";
import revelaCelulasTodas from "./functions/revelaMinas";

import "./App.css"
import escondeCelulasTodas from "./functions/escondeCelulasTodas";
import checkClickable from "./functions/checkClickable";

function App() {
    // +----------------------------------------------------------------------------------------------------------------
    // +----+ UseState Hooks +------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const [gameStarted, setGameStarted] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState("0");
    const [cells, setCells] = useState<Celula[][]>([[]]);

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Variaveis +-----------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

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
        const newBoard:Celula[][] = createBoard(selectedLevel);

        if (checkClickable(cells)) { return; }

        console.log("Reset!!!");

        setCells([...newBoard]);
    }

    const handleLevelChange = (event:any) => {
        const { value } = event.currentTarget;
        const newBoard:Celula[][] = createBoard(value);

        console.log("levelChange");

        setSelectedLevel(value);
        setCells([...newBoard]);
    }

    const handleCellsChange = (cell:Celula) => {
        if (cell.value == 0) {
            console.log("Empty!!!");
            const newBoard:Celula[][] = revelaCelulasVazias(cells, cell)
            setCells([...newBoard]);
        }
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
                    />

                    <Board
                        selectedLevel={selectedLevel}
                        cells={cells}
                        onCellsChange={handleCellsChange}
                        gameStarted={gameStarted}
                        onGameOver={handleGameOver}
                        onGameStart={handleGameStart}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
