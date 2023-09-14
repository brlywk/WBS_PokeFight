import { Link } from "react-router-dom";
import FilteredList from "../components/FilteredList";
import pokeball from "../assets/pokeball.png"; // Assuming you have a pokeball image in your assets folder
import { useGameContext } from "../contexts/useGameContext";
import { useEffect } from "react";
import { setBackgroundClass, setPageTitle } from "../utils/pageUtil";

const PokemonSelectionPage = ({ setIsLoading }) => {
  console.log('PokemonSelectionPage rendered');
  const { playerName, playerPokemon, setPlayerPokemon } = useGameContext();

  const handleSelection = (pokemon) => {
    setPlayerPokemon(pokemon);
  };

  useEffect(() => {
    setPageTitle("Select Pokemon");
    setBackgroundClass("poke-select");
  }, []);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [setIsLoading]);


  return (
    <div className="animate-fade-in-from-bottom">
    <div className="flex h-full w-full flex-col items-center bg-opacity-50">
      <h1 className="font-['Press_Start_2P'] text-2xl text-white font-bold mt-5 text-shadow">
        Hi {playerName}, select your pokemon!{" "}
        <img
          src={pokeball}
          alt="pokeball"
          style={{
            height: "1em",
            verticalAlign: "middle",
            animation: "bounce 1s infinite",
          }}
        />
      </h1>
      {playerPokemon && (
        <Link
  to="/opponent-selection"
  className="continue-button font-['Press_Start_2P'] text-2xl text-white font-bold mt-5 text-shadow hover:text-gray-200 z-50"
>
  Continue
</Link>
      )}
      <div className="p-8">
        <FilteredList
          handleSelection={handleSelection}
          isPlayer={true}
          className="individual-card bg-opacity-50 bg-clip-padding backdrop-filter backdrop-blur-xl shadow-lg rounded-lg hover:scale-105 transition-transform duration-200"
        />
      </div>
    </div>
    </div>
  );
}

export default PokemonSelectionPage;

