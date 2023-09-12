// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import PokemonSelectionPage from "./pages/poke_select_page";
import PokeOppSelectPage from "./pages/poke_opp_select_page";
import PokeArenaPage from "./pages/poke_arena_page";
import GameContextProvider from "./contexts/useGameContext";

function App() {
  return (
    <GameContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon-selection" element={<PokemonSelectionPage />} />
          <Route path="/opponent-selection" element={<PokeOppSelectPage />} />
          <Route path="/arena" element={<PokeArenaPage />} />
        </Routes>
      </Router>
    </GameContextProvider>
  );
}

export default App;
