// poke_opp_select_page.jsx
import FilteredList from "../components/FilteredList";
import { useState, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import pokeball from "../assets/pokeball.png"; // Assuming you have a pokeball image in your assets folder
import { SelectedPokemonContext, SelectedOpponentPokemonContext } from '../contexts/PokemonContexts';

// Create a custom hook to use the SelectedPokemonContext, this will be used in our PokeArenaPage
export const useSelectedPokemon = () => {
  return useContext(SelectedPokemonContext);
};

// Create a custom hook to use the SelectedOpponentPokemonContext, this will be used in our PokeArenaPage
export const useSelectedOpponentPokemon = () => {
  return useContext(SelectedOpponentPokemonContext);
};
const PokeOppSelectPage = () => {
  const { selectedPokemon } = useContext(SelectedPokemonContext);
  const { selectedOpponentPokemon, setSelectedOpponentPokemon } = useContext(SelectedOpponentPokemonContext);

  console.log("Selected Pokemon from previous page: ", selectedPokemon); // Debug: Check the selected Pokemon from the previous page

  const handleSelection = (pokemon) => {
    console.log("Opponent selected: ", pokemon.name); // Debug: Check the selected opponent Pokemon
    setSelectedOpponentPokemon(pokemon); // Set the selected opponent Pokemon when a Pokemon is clicked
  };

  return (
    <SelectedOpponentPokemonContext.Provider value={selectedOpponentPokemon}>
      <div className="poke-opp-select flex h-full w-full flex-col items-center bg-opacity-50 bg-clip-padding backdrop-filter backdrop-blur-xl">
        <h1 className="font-['Press_Start_2P'] text-2xl text-white font-bold mt-5 text-shadow">Opponent, select your pokemon! <img src={pokeball} alt="pokeball" style={{height: '1em', verticalAlign: 'middle', animation: 'bounce 1s infinite'}} /></h1>
        <div className="card-effect">
          <FilteredList handleSelection={handleSelection} className="individual-card bg-opacity-50 bg-clip-padding backdrop-filter backdrop-blur-xl shadow-lg rounded-lg hover:scale-105 transition-transform duration-200"/>
        </div>
        <Link to="/arena" className="continue-button font-['Press_Start_2P'] text-2xl text-white font-bold mt-5 text-shadow">Continue</Link>
      </div>
    </SelectedOpponentPokemonContext.Provider>
  );
}

export default PokeOppSelectPage;