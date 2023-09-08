import { useState, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import FilteredList from "../components/FilteredList";
import pokeball from "../assets/pokeball.png"; // Assuming you have a pokeball image in your assets folder
import { SelectedPokemonContext } from '../contexts/PokemonContexts';

// Create a custom hook to use the SelectedPokemonContext, this will be used in our PokeArenaPage
export const useSelectedPokemon = () => {
  return useContext(SelectedPokemonContext);
};

function PokemonSelectionPage() {
  const { selectedPokemon, setSelectedPokemon } = useContext(SelectedPokemonContext);

  const handleSelection = (pokemon) => {
    alert(`Player selected ${pokemon.name}`);
    setSelectedPokemon(pokemon); // Set the selected Pokemon when a Pokemon is clicked
  };

  return (
    <SelectedPokemonContext.Provider value={selectedPokemon}>
      <div className="poke-select flex h-full w-full flex-col items-center bg-opacity-50 bg-clip-padding backdrop-filter backdrop-blur-xl">
        <h1 className="font-['Press_Start_2P'] text-2xl text-white font-bold mt-5 text-shadow">Select your pokemon! <img src={pokeball} alt="pokeball" style={{height: '1em', verticalAlign: 'middle', animation: 'bounce 1s infinite'}} /></h1>
        <div className="card-effect">
          <FilteredList handleSelection={handleSelection} className="individual-card bg-opacity-50 bg-clip-padding backdrop-filter backdrop-blur-xl shadow-lg rounded-lg hover:scale-105 transition-transform duration-200"/>
        </div>
        <Link to="/opponent-selection" className="continue-button font-['Press_Start_2P'] text-2xl text-white font-bold mt-5 text-shadow">Continue</Link>
      </div>
    </SelectedPokemonContext.Provider>
  );
}

export default PokemonSelectionPage;