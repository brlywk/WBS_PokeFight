import { useEffect } from "react";
import { useGameContext } from "../contexts/useGameContext";
import { Link, useNavigate } from "react-router-dom";
import { setBackgroundClass, setPageTitle } from "../utils/pageUtil";

// Define the Pokemon sprite URLs
const pokemonSprites = {
  artwork:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
  back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
  front:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
};

function HomePage() {
  const { playerName, setPlayerName } = useGameContext();
  const navigate = useNavigate();

  const handleEnterClick = () => {
    if (playerName) {
      navigate("/pokemon-selection");
    }
  };

  const handleInputChange = (event) => {
    setPlayerName(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleEnterClick();
    }
  };

  useEffect(() => {
    setPageTitle();
    setBackgroundClass("homepage-bg");
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center ">
      <img src="/PokeFight.webp" alt="PokeFight Logo" />
      <img
        src={pokemonSprites.front}
        alt="Pokemon Sprite"
        className="h-48 w-48 animate-bounce"
      />
      <input
        type="text"
        value={playerName}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={`font-['Press_Start_2P'] mb-6 text-xl bg-white/50 border rounded-md p-2 ${
          playerName ? "border-black/50" : "border-red-500/50"
        }`}
        placeholder="Enter trainer name"
      />
      <button
        onClick={handleEnterClick}
        className="text-shadow mb-8 font-['Press_Start_2P'] text-6xl font-bold text-yellow-500"
      >
        Enter
      </button>
      {/* Other components */}
      <Link
        to="/leaderboard"
        className="text-shadow mt-5 font-['Press_Start_2P'] text-xl font-bold text-white"
      >
        Leaderboard
      </Link>
    </div>
  );
}

export default HomePage;
