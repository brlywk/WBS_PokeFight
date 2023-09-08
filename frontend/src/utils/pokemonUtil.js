export const createReadableStatsArray = (pokemon) => {
  const keys = Object.keys(pokemon.stats);

  const stats = keys.map((k) => {
    const statName = k
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const statValue = pokemon.stats[k];

    return { name: statName, value: statValue };
  });

  return stats;
};

export const randomPokemonList = (pokemonList, num = 15) => {
  const randomPokemon = [];
  const checkNumbers = [];

  for (let i = 0; i < num; i++) {
    const randomNum = Math.floor(Math.random() * pokemonList.length);

    if (!checkNumbers.includes(randomNum)) {
      randomPokemon.push(pokemonList[randomNum]);
    }

    checkNumbers.push(randomNum);
  }

  return randomPokemon;
};
