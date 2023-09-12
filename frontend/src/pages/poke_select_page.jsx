import { Link } from "react-router-dom";
import FilteredList from "../components/FilteredList";
import pokeball from "../assets/pokeball.png"; // Assuming you have a pokeball image in your assets folder
import { useGameContext } from "../contexts/useGameContext";

function PokemonSelectionPage() {
  const { playerName, playerPokemon, setPlayerPokemon } = useGameContext();

  const handleSelection = (pokemon) => {
    setPlayerPokemon(pokemon);
  };

  return (
    <div className="poke-select flex h-full w-full flex-col items-center bg-opacity-50 bg-clip-padding backdrop-filter backdrop-blur-xl">
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
          className="continue-button font-['Press_Start_2P'] text-2xl text-white font-bold mt-5 text-shadow"
        >
          Continue
        </Link>
      )}
      <div className="card-effect">
        <FilteredList
          handleSelection={handleSelection}
          isPlayer={true}
          className="individual-card bg-opacity-50 bg-clip-padding backdrop-filter backdrop-blur-xl shadow-lg rounded-lg hover:scale-105 transition-transform duration-200"
        />
      </div>
    </div>
  );
}

export default PokemonSelectionPage;
