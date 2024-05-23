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
    const [cells, setCells] = useState<Celula[]>([]);

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Variaveis +-----------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    // +----------------------------------------------------------------------------------------------------------------
    // +----+ Funcoes +-------------------------------------------------------------------------------------------------
    // +----------------------------------------------------------------------------------------------------------------

    const handleGameStart = () => {
        gameStarted ? setGameStarted(false) : setGameStarted(true);
    }

    const handleLevelChange = (event:any) => {
        const { value } = event.currentTarget;
        setSelectedLevel(value);
        setCells(createBoard(value));
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
                        onGameStart={handleGameStart}
                        selectedLevel={selectedLevel}
                        onLevelChange={handleLevelChange}
                    />

                    <Board
                        cells={cells}
                        selectedLevel={selectedLevel}
                        gameStarted={gameStarted}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
