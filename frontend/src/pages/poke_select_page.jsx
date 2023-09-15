import { Link } from "react-router-dom";
import FilteredList from "../components/FilteredList";
import { useGameContext } from "../contexts/useGameContext";
import { useEffect } from "react";
import { setBackgroundClass, setPageTitle } from "../utils/pageUtil";

const PokemonSelectionPage = () => {
  const { playerName, playerPokemon, setPlayerPokemon } = useGameContext();

  const handleSelection = (pokemon) => {
    setPlayerPokemon(pokemon);
  };

  useEffect(() => {
    setPageTitle("Select Pokemon");
    setBackgroundClass("poke-select");
  }, []);

  return (
    <div className="animate-fade-in-from-bottom h-full">
      <div className="flex h-full w-full flex-col items-center bg-opacity-50">
        <h1 className="text-shadow mt-5 font-['Press_Start_2P'] text-2xl font-bold text-white">
          Hi {playerName}, select your pokemon!{" "}
          <img
            src="/pokeball.png"
            alt="pokeball"
            style={{
            }}
          />
        </h1>
        {playerPokemon && (
          <Link
            to="/opponent-selection"
            className="continue-button text-shadow z-50 mt-5 font-['Press_Start_2P'] text-2xl font-bold text-white hover:text-gray-200"
          >
            Continue
          </Link>
        )}
        <div className="h-full p-8">
          <FilteredList
            handleSelection={handleSelection}
            isPlayer={true}
            className="individual-card rounded-lg bg-opacity-50 bg-clip-padding shadow-lg backdrop-blur-xl backdrop-filter transition-transform duration-200 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default PokemonSelectionPage;
