// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage';
import PokemonSelectionPage from './pages/poke_select_page';
import PokeOppSelectPage from './pages/poke_opp_select_page';
import PokeArenaPage from './pages/poke_arena_page';
import { SelectedPokemonContext, SelectedOpponentPokemonContext } from './contexts/PokemonContexts';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedOpponentPokemon, setSelectedOpponentPokemon] = useState(null);

  return (
    <Router>
      <SelectedPokemonContext.Provider value={{ selectedPokemon, setSelectedPokemon }}>
        <SelectedOpponentPokemonContext.Provider value={{ selectedOpponentPokemon, setSelectedOpponentPokemon }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pokemon-selection" element={<PokemonSelectionPage />} />
            <Route path="/opponent-selection" element={<PokeOppSelectPage />} />
            <Route path="/arena" element={<PokeArenaPage />} />
          </Routes>
        </SelectedOpponentPokemonContext.Provider>
      </SelectedPokemonContext.Provider>
    </Router>
  );
}

export default App;