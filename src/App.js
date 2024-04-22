import React from "react";
import { Header, Game, Footer } from "./components";

import "./app.css"

function App() {
  return (
    <div className="container">
      <Header />
      <div className="app">
        <Game />
      </div>
      <Footer />
    </div>
  );
}

export default App;
