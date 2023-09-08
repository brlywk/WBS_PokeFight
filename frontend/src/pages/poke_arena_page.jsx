import React, { useState, useEffect } from "react";
import { useOnePokemon } from "../hooks/usePokemon"; // Import the custom hook
import { useAllFights, useSaveFight } from "../hooks/useFights"; // Import the custom hooks for fights
import PokeArena from "../assets/poke_arena_fightbg.svg"; // Import the background image

export default function PokeArenaPage() {
  // Use the custom hook to fetch the player's and opponent's Pokemon
  // const {
  //   pokemon: playerPokemon,
  //   loading: playerLoading,
  //   error: playerError,
  // } = useOnePokemon();
  // const {
  //   pokemon: opponentPokemon,
  //   loading: opponentLoading,
  //   error: opponentError,
  // } = useOnePokemon();
  const playerPokemon = null;
  const opponentPokemon = null;
  const { allFights, allFightsLoading, allFightsError } = useAllFights();
  const { saveFight } = useSaveFight(); // Use the custom hook to save the fight

  const [trainerName, setTrainerName] = useState(""); // State to store the trainer's name
  const [currentRound, setCurrentRound] = useState(1); // State to store the current round

  // useEffect(() => {
  //   // Fetch player's selected Pokemon
  //   // Fetch opponent's selected Pokemon
  //   // allFights.fetch(); // Fetch all fights
  // }, []);
  //
  // if (playerLoading || opponentLoading || allFightsLoading) return "Loading...";
  // if (playerError || opponentError || allFightsError)
  //   return "An error occurred";

  const handleAttackClick = () => {
    // Calculate the damage
    const damage = playerPokemon.attack - opponentPokemon.defense;

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
  const Button = ({ label, onClick }) => (
    <button onClick={onClick} className="action-button">
      {label}
    </button>
  );

  return (
    <>
      <div className="poke-arena-bg flex h-full w-full flex-col items-center justify-center ">
        {/* <img src={PokeArena} alt="PokeArenaFight" /> */}
        {playerPokemon && (
          <img src={playerPokemon.sprites.front} alt={playerPokemon.name} />
        )}
        {opponentPokemon && (
          <img src={opponentPokemon.sprites.front} alt={opponentPokemon.name} />
        )}
        <div className="actions flex">
          <Button label="Attack" onClick={handleAttackClick} />
          <Button label="Special Attack" />
          <Button label="Defense" />
          <Button label="Special Defense" />
          <Button label="Special Action Points" />
        </div>
      </div>
    </>
  );
}
