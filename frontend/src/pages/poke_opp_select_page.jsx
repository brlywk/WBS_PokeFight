// poke_opp_select_page.jsx
import FilteredList from "../components/FilteredList";
import { Link } from "react-router-dom";
import pokeball from "../assets/pokeball.png"; // Assuming you have a pokeball image in your assets folder
import { useGameContext } from "../contexts/useGameContext";

const PokeOppSelectPage = () => {
  const { opponentName, opponentPokemon, setOpponentPokemon } =
    useGameContext();

  const handleSelection = (pokemon) => {
    setOpponentPokemon(pokemon);
  };

  return (
    <div className="poke-opp-select flex h-full w-full flex-col items-center bg-opacity-50 bg-clip-padding backdrop-filter backdrop-blur-xl">
      <h1 className="font-['Press_Start_2P'] text-2xl text-white font-bold mt-5 text-shadow">
        Opponent, select your pokemon!{" "}
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
      {opponentPokemon && (
        <Link
          to="/arena"
          className="continue-button font-['Press_Start_2P'] text-2xl text-white font-bold mt-5 text-shadow"
        >
          Continue
        </Link>
      )}
      <div className="card-effect">
        <FilteredList
          handleSelection={handleSelection}
          isPlayer={false}
          className="individual-card bg-opacity-50 bg-clip-padding backdrop-filter backdrop-blur-xl shadow-lg rounded-lg hover:scale-105 transition-transform duration-200"
        />
      </div>
    </div>
  );
};

export default PokeOppSelectPage;
