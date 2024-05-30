import { useState } from "react";

import { Header,Menu, Board, Footer } from "./components";

import { Celula } from "./celula/celula.interface";

import createBoard from "./functions/createBoard";
import revelaCelulasVazias from "./functions/revelaCelulasVazias";
import revelaCelulasTodas from "./functions/revelaCelulasTodas";

import "./App.css"
import escondeCelulasTodas from "./functions/escondeCelulasTodas";

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

        const newBoard:Celula[][] = escondeCelulasTodas(createBoard(selectedLevel));

        setCells([...newBoard]);
        setGameStarted(true);

    }

    const handleGameOver = () => {
        console.log("Over!!!");
        const newBoard:Celula[][] = revelaCelulasTodas(cells);

        setCells([...newBoard]);
        setGameStarted(false);
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
                        onGameStart={handleGameStart}
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
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
