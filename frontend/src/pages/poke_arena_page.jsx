// poke_arena_page.jsx
import { useState } from 'react';

export default function PokeArenaPage() {
  const [playerPokemon, setPlayerPokemon] = useState( /* your player's selected Pokemon */ );
  const [opponentPokemon, setOpponentPokemon] = useState( /* opponent's selected Pokemon */ );

  return (
    <div className="flex flex-col items-center bg-[#your-bg-color]">
      <div className="arena w-full h-[400px]">
        <img src={playerPokemon.sprites.front} alt="player" />
        <img src={opponentPokemon.sprites.front} alt="opponent" />
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
