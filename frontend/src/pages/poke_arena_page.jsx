import React, { useState } from "react";
// import { useOnePokemon } from "../hooks/usePokemon"; // Import the custom hook
// import { useAllFights, useSaveFight } from "../hooks/useFights"; // Import the custom hooks for fights
// import PokeArena from "../assets/poke_arena_fightbg.svg"; // Import the background image

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
  
  const playerPokemon = {
    stats: {
      attack: 55,
      defense: 40,
      hp: 35,
      special_attack: 50,
      special_defense: 50,
      speed: 90
    },
    sprites: {
      artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
      back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
      front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    },
    _id: "64f1ce0fff88708e5a6f233f",
    pokedexId: 25,
    __v: 0,
    name: "Pikachu",
    type: [
      "Electric"
    ]
  };
  const opponentPokemon = {
    stats: {
      attack: 110,
      defense: 90,
      hp: 106,
      special_attack: 154,
      special_defense: 90,
      speed: 130
    },
    sprites: {
      artwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
      back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/150.png",
      front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png"
    },
    _id: "64f1ce5bff88708e5a6f6179",
    pokedexId: 150,
    __v: 0,
    name: "Mewtwo",
    type: [
      "Psychic"
    ]
  };
  // const { allFights, allFightsLoading, allFightsError } = useAllFights();
  // const { saveFight } = useSaveFight(); // Use the custom hook to save the fight

  const [trainerName, setTrainerName] = useState(""); // State to store the trainer's name
  const [currentRound, setCurrentRound] = useState(1); // State to store the current round
  const [showResult, setShowResult] = useState(false); // State to control the display of the result page

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
    const damage = playerPokemon.stats.attack - opponentPokemon.stats.defense;

    // Update the opponent's HP
    // setOpponentPokemon((prevState) => ({
    //   ...prevState,
    //   hp: prevState.hp - damage,
    // }));

    // Save the fight data
    // saveFight({
    //   player_one_name: trainerName,
    //   player_two_name: "CPU",
    //   player_one_pokemon_id: playerPokemon.id,
    //   player_two_pokemon_id: opponentPokemon.id,
    //   rounds: [
    //     // Add the round data
    //     {
    //       round: currentRound,
    //       player_one_action: "Attack",
    //       player_one_damage_taken: 0,
    //       player_two_action: "Defense",
    //       player_two_damage_taken: damage,
    //       player_one_hp_left: playerPokemon.hp,
    //       player_two_hp_left: opponentPokemon.hp - damage,
    //     },
    //   ],
    // });
  };

  // Define the Button component within the same file
  const Button = ({ label, onClick }) => (
    <button onClick={onClick} className="action-button bg-white bg-opacity-30 border-2 border-black rounded-2xl p-2">
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
        {playerPokemon && (
          <div className="absolute left-1/4 bottom-1/5 flex flex-col items-center">
            <div className="flex flex-col items-center space-y-0">
              <div className="bg-black text-white rounded-full px-2 py-1">{playerPokemon.name}</div>
              <div className="bg-green-500 text-white rounded-full px-2 py-1">{`${playerPokemon.stats.hp}/${playerPokemon.stats.hp}`}</div>
            </div>
            <img src={playerPokemon.sprites.back} alt={playerPokemon.name} className="transform scale-x-[-1] w-48 h-48 ml-12 playerPokemon" />
          </div>
        )}
        {playerPokemon && (
          <div className="absolute left-0 bottom-1/4 flex flex-col items-start space-y-0 ml-16 text-left">
            <Button label="Attack" onClick={handleAttackClick} />
            <Button label="Special Attack" />
            <Button label="Defense" />
            <Button label="Special Defense" />
          </div>
        )}
        {opponentPokemon && (
          <div className="absolute right-1/4 top-1/4 flex flex-col items-center">
            <div className="flex flex-col items-center space-y-0">
              <div className="bg-black text-white rounded-full px-2 py-1">{opponentPokemon.name}</div>
              <div className="bg-green-500 text-white rounded-full px-2 py-1">{`${opponentPokemon.stats.hp}/${opponentPokemon.stats.hp}`}</div>
            </div>
            <img src={opponentPokemon.sprites.front} alt={opponentPokemon.name} className="w-48 h-48 mr-12 playerPokemon" />
          </div>
        )}
      </div>
    </>
  );
}
