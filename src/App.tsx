import { useState } from "react";

import "./App.css"

import { Header,Menu, Board, Footer } from "./components";

import createBoard from "./functions/createBoard";
import {Celula} from "./celula/celula.interface";

function App() {
    // +----------------------------------------------------------------------------------------------------------------
    // +----+ UseState Hooks +------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const [gameStarted, setGameStarted] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState("0");
    const [cells, setCells] = useState<Celula[][]>([][0]);

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
        console.log("levelChange");
        const { value } = event.currentTarget;
        setSelectedLevel(value);
        setCells(createBoard(value));
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
                        cells={cells}
                        selectedLevel={selectedLevel}
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
