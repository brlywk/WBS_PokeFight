// poke_arena_page.jsx
import { useState, useEffect } from 'react';
import usePokemonData from '../hooks/usePokemonData'; // Import the custom hook

export default function PokeArenaPage() {
  // Use the custom hook to fetch the player's and opponent's Pokemon
  const [playerPokemon, playerLoading, playerError] = usePokemonData('/api/playerPokemon');( /* your player's selected Pokemon */ );
  const [opponentPokemon, opponentLoading, opponentError] = usePokemonData('/api/opponentPokemon');( /* opponent's selected Pokemon */ );

  function PokemonComponent() {
    const { data, isLoading, error } = usePokemonData();
  
    if (isLoading) return 'Loading...';
    if (error) return 'An error occurred';

  // Placeholder sprites and names until the selection pages are ready
  const placeholderPlayer = {
    sprites: {
      front: 'path/to/player/sprite'
    },
    name: 'Player Placeholder'
  };

  const placeholderOpponent = {
    sprites: {
      front: 'path/to/opponent/sprite'
    },
    name: 'Opponent Placeholder'
  };

  // Uncomment the following lines once the selection pages are ready
  // useEffect(() => {
  //   setPlayerPokemon( /* chosen player from poke_select_page.jsx */ );
  //   setOpponentPokemon( /* chosen opponent from poke_opp_select_page.jsx */ );
  // }, []);

  return (
    <div className="poke-arena-bg flex h-full w-full flex-col items-center justify-center ">
      <div className="arena w-full h-[400px]">
        <img src={playerPokemon ? playerPokemon.sprites.front : placeholderPlayer.sprites.front} alt={playerPokemon ? playerPokemon.name : placeholderPlayer.name} />
        <img src={opponentPokemon ? opponentPokemon.sprites.front : placeholderOpponent.sprites.front} alt={opponentPokemon ? opponentPokemon.name : placeholderOpponent.name} />
      </div>
      <div className="actions flex">
        <ActionButton label="Attack" />
        <ActionButton label="Special Attack" />
        <ActionButton label="Defense" />
        <ActionButton label="Special Defense" />
        <ActionButton label="Special Action Points" />
      </div>
    </div>
  );
}
}

