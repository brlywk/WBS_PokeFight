/* eslint-disable react/prop-types */

import { Fragment } from "react";
import { createReadableStatsArray } from "../utils/pokemonUtil";

const PokemonCard = ({ pokemon, handleSelection }) => {
  const stats = createReadableStatsArray(pokemon);

  return (
    <button onClick={() => handleSelection(pokemon)} className="pokemon-card-hover">
      <div className="pokemon-card flex min-w-[200px] max-w-[250px] flex-col gap-2 rounded-lg border border-opacity-40 bg-white glass-morphism">
        <div className="pokemon-gradient-container">
          <div className="pokemon-gradient-half-circle"></div>
          <img
            className="h-1/2 w-full rounded-t-lg object-cover pokemon-image"
            src={pokemon.sprites.artwork}
            alt={pokemon.name}
          />
        </div>
        <div className="text-center font-press">{pokemon.name}</div>
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
