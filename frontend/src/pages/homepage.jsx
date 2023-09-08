import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

// Define the Pokemon sprite URLs
const pokemonSprites = {
  artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
  back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
  front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
};

function HomePage() {
  const [trainerName, setTrainerName] = useState("");
  const navigate = useNavigate(); // Add this line

  const handleInputChange = (event) => {
    setTrainerName(event.target.value);
  };

  const handleEnterClick = () => {
    // Navigate to the PokeArenaPage when the "Enter" button is clicked
    navigate('/pokemon-selection');
  };

  return (
    <div className="homepage-bg flex h-full w-full flex-col items-center justify-center ">
      <img src="/PokeFight.webp" alt="PokeFight Logo" />
      <img src={pokemonSprites.front} alt="Pokemon Sprite" className="w-48 h-48 animate-bounce" />
      <input
        type="text"
        value={trainerName}
        onChange={handleInputChange}
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