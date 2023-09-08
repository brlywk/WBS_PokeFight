// poke_arena_page.jsx
import React, { useState, useEffect, useContext } from "react";
import { useSelectedPokemon } from "./poke_select_page";
import { useSelectedOpponentPokemon } from "./poke_opp_select_page";
import { useOnePokemon } from "../hooks/usePokemon"; // Import the custom hook
import { useAllFights, useSaveFight } from "../hooks/useFights"; // Import the custom hooks for fights
import PokeArena from "../assets/poke_arena_fightbg.svg"; // Import the background image
import { SelectedPokemonContext, SelectedOpponentPokemonContext } from '../contexts/PokemonContexts';

export default function PokeArenaPage() {
  // Use the custom hook to fetch the player's and opponent's Pokemon
  const { selectedPokemon } = useContext(SelectedPokemonContext);
  const { selectedOpponentPokemon } = useContext(SelectedOpponentPokemonContext);

  console.log('Selected Pokemon in arena page:', selectedPokemon);
console.log('Selected Opponent Pokemon in arena page:', selectedOpponentPokemon);

  const {
    pokemon: playerPokemon,
    loading: playerLoading,
    error: playerError,
  } = useOnePokemon(selectedPokemon._id);
  const {
    pokemon: opponentPokemon,
    loading: opponentLoading,
    error: opponentError,
  } = useOnePokemon(selectedOpponentPokemon._id);
  
  console.log('Player Pokemon:', playerPokemon); // Log the player's Pokemon
  console.log('Opponent Pokemon:', opponentPokemon); // Log the opponent's Pokemon

  const { allFights, allFightsLoading, allFightsError } = useAllFights();
  const { saveFight } = useSaveFight(); // Use the custom hook to save the fight

  const [trainerName, setTrainerName] = useState(""); // State to store the trainer's name
  const [currentRound, setCurrentRound] = useState(1); // State to store the current round
  const [showResult, setShowResult] = useState(false); // State to control the display of the result page

  useEffect(() => {
    // Fetch player's selected Pokemon
    // Fetch opponent's selected Pokemon
    if (allFights) {
      allFights.fetch(); // Fetch all fights
    }
  }, [allFights]);

  if (playerLoading || opponentLoading || allFightsLoading) return "Loading...";
  if (playerError || opponentError || allFightsError)
    return "An error occurred";

      // Check if playerPokemon and opponentPokemon are loaded and not undefined
  if (!playerPokemon || !opponentPokemon) return "Loading Pokémon...";

  const handleAttackClick = () => {
    // Calculate the damage
    const damage = playerPokemon.stats.attack - opponentPokemon.stats.defense;

    // Update the opponent's HP
    setOpponentPokemon((prevState) => ({
      ...prevState,
      hp: prevState.hp - damage,
    }));

    // Save the fight data
    saveFight({
      player_one_name: trainerName,
      player_two_name: "CPU",
      player_one_pokemon_id: playerPokemon.id,
      player_two_pokemon_id: opponentPokemon.id,
      rounds: [
        // Add the round data
        {
          round: currentRound,
          player_one_action: "Attack",
          player_one_damage_taken: 0,
          player_two_action: "Defense",
          player_two_damage_taken: damage,
          player_one_hp_left: playerPokemon.hp,
          player_two_hp_left: opponentPokemon.hp - damage,
        },
      ],
    });
  };

// Define the Button component within the same file
const Button = ({ label, onClick, children }) => (
  <button onClick={onClick} className="action-button bg-white bg-opacity-30 border-2 border-black rounded-2xl p-2 flex items-center space-x-2">
    {children}
    {label}
  </button>
);

  // Only render the game over screen if showResult is true
  if (showResult) {
    return <ResultPage />;
  }

  // If showResult is false, render the game interface
  return (
    <>
      <div className="poke-arena-bg flex h-full w-full flex-col items-center justify-center relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-red-500 border-4 border-red-500 py-2 px-4 bg-white bg-opacity-30">
          VS
        </div>
        {playerPokemon && playerPokemon.sprites && playerPokemon.sprites.back && (
  <div className="left-1/4 bottom-1/5 flex flex-col items-center">
    <div className="flex flex-col items-center space-y-0">
      <div className="bg-black text-white rounded-full px-2 py-1">{playerPokemon.name}</div>
      <div className="bg-green-500 text-white rounded-full px-2 py-1">{`${playerPokemon.stats.hp}/${playerPokemon.stats.hp}`}</div>
    </div>
    <img src={playerPokemon.sprites.back} alt={playerPokemon.name} className="transform scale-x-[-1] w-48 h-48 ml-12 playerPokemon" />
  </div>
)}
        {playerPokemon && (
          <div className="absolute left-0 bottom-1/4 flex flex-col items-start space-y-0 ml-16 text-left">
            <Button label="Attack" onClick={handleAttackClick}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </Button>
            <Button label="Special Attack">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Button>
            <Button label="Defense">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
            <Button label="Special Defense">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              </svg>
            </Button>
          </div>
        )}
{opponentPokemon && opponentPokemon.sprites && opponentPokemon.sprites.front && (
  <div className="right-1/4 bottom-1/5 flex flex-col items-center">
    <div className="flex flex-col items-center space-y-0">
      <div className="bg-black text-white rounded-full px-2 py-1">{opponentPokemon.name}</div>
      <div className="bg-green-500 text-white rounded-full px-2 py-1">{`${opponentPokemon.stats.hp}/${opponentPokemon.stats.hp}`}</div>
    </div>
    <img src={opponentPokemon.sprites.front} alt={opponentPokemon.name} className="w-48 h-48 mr-12 opponentPokemon" />
  </div>
)}
      </div>
    </>
  );
}



