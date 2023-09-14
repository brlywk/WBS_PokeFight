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

function HomePage({ setIsLoading }) {
  const { playerName, setPlayerName } = useGameContext();
  const navigate = useNavigate();

  const handleEnterClick = () => {
    if (playerName) {
      setIsLoading(true);
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
        className="w-48 h-48 animate-bounce"
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
        className="font-['Press_Start_2P'] text-6xl text-yellow-500 font-bold mb-8 text-shadow"
      >
        Enter
      </button>
      {/* Other components */}
      <Link
        to="/leaderboard"
        className="font-['Press_Start_2P'] text-xl text-white font-bold mt-5 text-shadow"
      >
        Leaderboard
      </Link>
    </div>
  );
}

export default HomePage;
