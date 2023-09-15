// poke_opp_select_page.jsx
import FilteredList from "../components/FilteredList";
import { Link } from "react-router-dom";
import { useGameContext } from "../contexts/useGameContext";
import { setBackgroundClass, setPageTitle } from "../utils/pageUtil";
import { useEffect } from "react";

const PokeOppSelectPage = () => {
  const { opponentPokemon, setOpponentPokemon } = useGameContext();

  const handleSelection = (pokemon) => {
    setOpponentPokemon(pokemon);
  };

  useEffect(() => {
    setPageTitle("Select Pokemon");
    setBackgroundClass("poke-opp-select");
  }, []);

  return (
    <div className="animate-fade-in-from-bottom h-full">
      <div className="flex h-full w-full flex-col items-center bg-opacity-50">
        <h1 className="text-shadow mt-5 font-['Press_Start_2P'] text-2xl font-bold text-white">
          Opponent, select your pokemon!{" "}
          <img
            src="/pokeball.png"
            alt="pokeball"
            style={{
              height: "1em",
              verticalAlign: "middle",
              animation: "bounce 1s infinite",
            }}
          />
        </h1>
        {opponentPokemon && (
          <Link
            to="/arena"
            className="continue-button text-shadow z-50 mt-5 font-['Press_Start_2P'] text-2xl font-bold  text-white hover:text-gray-200"
          >
            Continue
          </Link>
        )}
        <div className="p-8">
          <FilteredList
            handleSelection={handleSelection}
            isPlayer={false}
            className="individual-card rounded-lg bg-opacity-50 bg-clip-padding shadow-lg backdrop-blur-xl backdrop-filter transition-transform duration-200 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default PokeOppSelectPage;
