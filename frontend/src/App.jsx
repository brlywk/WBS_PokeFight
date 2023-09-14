import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import PokemonSelectionPage from "./pages/poke_select_page";
import PokeOppSelectPage from "./pages/poke_opp_select_page";
import PokeArenaPage from "./pages/poke_arena_page";
import GameContextProvider from "./contexts/useGameContext";
import { ResultPage } from "./pages/result_page";
import Leaderboard from "./pages/leaderboard";
import LoadingScreen1 from "./assets/loadscreen1.jpg";
import LoadingScreen2 from "./assets/loadscreen2.jpg";
import LoadingScreen3 from "./assets/loadscreen3.jpg";
import LoadingScreen5 from "./assets/loadscreen5.jpeg";
import LoadingScreenGif2 from "./assets/loading-screen.gif";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const loadingScreens = [
    LoadingScreen1,
    LoadingScreen2,
    LoadingScreen3,
    LoadingScreen5,
  ];

  const randomLoadingScreen =
    loadingScreens[Math.floor(Math.random() * loadingScreens.length)];

    useEffect(() => {
      console.log(`isLoading: ${isLoading}`);
    }, [isLoading]);

  return (
    <div className="flow-bg h-screen">
    <GameContextProvider>
      <Router>
        <Routes>
          
        <Route path="/" element={<HomePage setIsLoading={setIsLoading} />} />
                  <Route path="/pokemon-selection" element={<PokemonSelectionPage setIsLoading={setIsLoading} />} />          
          <Route
            path="/pokemon-selection"
            element={
              isLoading ? (
                <div className="loading-screen">
                  <img src={LoadingScreenGif2} alt="Loading" />
                </div>
              ) : (
                <PokemonSelectionPage setIsLoading={setIsLoading} />
              )
            }
          />
          <Route
            path="/opponent-selection"
            element={<PokeOppSelectPage setIsLoading={setIsLoading} />}
          />
          <Route
            path="/arena"
            element={
              isLoading ? (
                <div className="loading-screen">
                  <img src={LoadingScreenGif2} alt="Loading" />
                </div> // You forgot to close the div tag here, hence the error.
              ) : (
                <PokeArenaPage />
              )
            }
          />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Router>
    </GameContextProvider>
    </div>
  );
}

export default App;