/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useAllPokemon } from "../hooks/usePokemon";
import { randomPokemonList } from "../utils/pokemonUtil";
import PokemonCard from "./PokemonCard";

const FilteredList = ({ handleSelection }) => {
  const {
    allPokemon,
    allPokemonLoading,
    allPokemonError,
    allPokemonErrorMessage,
    fetchAll,
  } = useAllPokemon();

  const [filteredList, setFilteredList] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    fetchAll();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!allPokemonLoading && allPokemon) {
      const randomPokemon = randomPokemonList(allPokemon);

      setFilteredList(randomPokemon);
    }
  }, [allPokemon, allPokemonLoading]);

  const handleSearchInput = (event) => {
    const searchValue = event.target.value.toLowerCase();

    if (!searchValue) return;

    const filteredPokemon = allPokemon.filter((p) => {
      const types = p.type.map((t) => t.toLowerCase());
      const pokemonName = p.name.toLowerCase();

      if (pokemonName.includes(searchValue) || types.includes(searchValue)) {
        return p;
      }
    });

    setFilteredList(filteredPokemon);
  };

  const clearFilter = () => {
    if (searchRef.current) {
      searchRef.current.value = "";
    }

    setFilteredList(allPokemon);
  };

  const newRandomList = () => {
    const randomPokemon = randomPokemonList(allPokemon);
    setFilteredList(randomPokemon);
  };

  const makeSuggestion = () => {
    const randomNumber = Math.floor(Math.random() * allPokemon.length);
    setFilteredList([allPokemon[randomNumber]]);
  };

  return (
    <>
      <input
        type="text"
        onChange={handleSearchInput}
        placeholder="Search Pokemon"
        ref={searchRef}
      />
      <button onClick={clearFilter}>Show all</button>
      <button onClick={newRandomList}>Some random pokemont</button>
      <button onClick={makeSuggestion}>Pick one for me</button>
      {allPokemonLoading && "Loading..."}
      <div className="grid grid-cols-5 gap-4">
        {!allPokemonLoading &&
          filteredList &&
          filteredList.map((p) => (
            <PokemonCard
              key={p.pokedexId}
              pokemon={p}
              handleSelection={handleSelection}
            />
          ))}
      </div>
    </>
  );
};

export default FilteredList;
