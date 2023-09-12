import { Fragment } from "react";
import { createReadableStatsArray } from "../utils/pokemonUtil";
import { useGameContext } from "../contexts/useGameContext";

const PokemonCard = ({ pokemon, handleSelection, isPlayer = false }) => {
  const { playerPokemon, opponentPokemon } = useGameContext();
  const stats = createReadableStatsArray(pokemon);

  const checkIndex = isPlayer
    ? playerPokemon?.pokedexId
    : opponentPokemon?.pokedexId;

  const selection =
    checkIndex === pokemon.pokedexId ? "border-black" : "border-transparent";

  const cardClass = `pokemon-card flex min-w-[200px] max-w-[250px] flex-col gap-2 rounded-lg border-2 bg-white glass-morphism ${selection}`;

  return (
    <button
      onClick={() => handleSelection(pokemon)}
      className="pokemon-card-hover"
    >
      <div className={cardClass}>
        <div className="pokemon-gradient-container">
          <div className="pokemon-gradient-half-circle"></div>
          <img
            className="h-1/2 w-full rounded-t-lg object-cover pokemon-image"
            src={pokemon.sprites.artwork}
            alt={pokemon.name}
          />
        </div>
        <div className="text-center font-['Press_Start_2P']">
          {pokemon.name}
        </div>
        <div className="grid grid-cols-[1fr_max-content] justify-center gap-x-4 gap-y-2 px-4">
          {stats.map((stat) => (
            <Fragment key={stat.name}>
              <div className="stat-name">{stat.name}</div>
              <div className="stat-value">{stat.value}</div>
            </Fragment>
          ))}
        </div>
      </div>
    </button>
  );
};

export default PokemonCard;
