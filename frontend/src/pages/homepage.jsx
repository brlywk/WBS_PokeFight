import { useState } from "react";
import { useGameContext } from "../contexts/useGameContext";
import { useNavigate } from "react-router-dom";

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

  const handleInputChange = (event) => {
    setPlayerName(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleEnterClick();
    }
  };

  const handleEnterClick = () => {
    if (playerName) {
      navigate("/pokemon-selection");
    }
  };

  return (
    <div className="homepage-bg flex h-full w-full flex-col items-center justify-center ">
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
        className={`text-xl bg-white/50 border rounded-md p-2 ${
          playerName ? "border-black/50" : "border-red-500/50"
        }`}
        placeholder="Enter trainer name"
      />
      <button
        onClick={handleEnterClick}
        className="font-['Press_Start_2P'] text-4xl text-yellow-500 font-bold mt-5 text-shadow"
      >
        Enter
      </button>
      {/* Other components */}
    </div>
  );
}

export default HomePage;
