import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import PokeArenaPage from './poke_arena_page';

function ResultPage() {
  const navigate = useNavigate();

  const handlePlayAgainClick = () => {
    // Navigate to the poke_select_page
    navigate('/poke_select_page');
  };

  const handleLeaderboardClick = () => {
    // Navigate to the leaderboard page
    // This is commented out because the leaderboard page route is not ready yet
    // navigate('/leaderboard');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white bg-opacity-30 backdrop-blur-md p-10 rounded-lg border-4 border-black">
        <h1 className="font-['Press_Start_2P'] text-3xl text-red-500 font-bold mt-5 text-shadow flex items-center justify-center mb-5">GAME OVER</h1>
        <div className="flex justify-center gap-5"> 
          <button
            onClick={handlePlayAgainClick}
            className="font-['Press_Start_2P'] text-2xl text-yellow-500 bg-black font-bold mt-5 text-shadow p-10" // Reduced font size
          >
            PLAY AGAIN
          </button>
          <button
            onClick={handleLeaderboardClick}
            className="font-['Press_Start_2P'] text-2xl text-black bg-white border-2 border-black font-bold mt-5 text-shadow p-10" // Reduced font size
          >
            LEADERBOARD
          </button>
        </div>
      </div>
    </div>
  );
}

function ArenaPage() {
  const [showResult, setShowResult] = useState(false); // Set showResult to false initially
  const playerPokemon = {
    // Player's Pokemon data
  };
  const opponentPokemon = {
    // Opponent's Pokemon data
  };

  const handleAttackClick = () => {
    // Calculate the damage
    const damage = playerPokemon.stats.attack - opponentPokemon.stats.defense;
  
    // Check if the game is over
    if (opponentPokemon.stats.hp - damage <= 0) {
      // If the opponent's HP is 0 or less, the game is over
      setShowResult(true); // Show the ResultPage modal
    }
  };
  
  // Only render the game over screen if showResult is true
  if (showResult) {
    return <ResultPage />;
  }
  
  // If showResult is false, render the game interface
  return <PokeArenaPage />;
}
  
export { ArenaPage, ResultPage };
