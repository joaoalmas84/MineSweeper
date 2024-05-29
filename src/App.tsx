import { useState } from "react";

import "./App.css"

import { Header,Menu, Board, Footer } from "./components";

import createBoard from "./functions/createBoard";
import {Celula} from "./celula/celula.interface";
import revelaCelulasVazias from "./functions/revelaCelulasVazias";

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
        gameStarted ? console.log("stop") : console.log("start");
        setGameStarted(!gameStarted);
    }

    const handleLevelChange = (event:any) => {
        const { value } = event.currentTarget;

        console.log("levelChange");

        setSelectedLevel(value);
        setCells(createBoard(value));
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
                        onGameStart={handleGameStart}
                        selectedLevel={selectedLevel}
                        onLevelChange={handleLevelChange}
                    />

                    <Board
                        selectedLevel={selectedLevel}
                        cells={cells}
                        onCellsChange={handleCellsChange}
                        gameStarted={gameStarted}
                        onGameStart={handleGameStart}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
