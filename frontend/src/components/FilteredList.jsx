/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useAllPokemon } from "../hooks/usePokemon";
import { randomPokemonList } from "../utils/pokemonUtil";
import PokemonCard from "./PokemonCard";
import Loading from "./Loading";

const FilteredList = ({ handleSelection, isPlayer }) => {
  const { allPokemon, allPokemonLoading, fetchAll } = useAllPokemon();

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
      {allPokemonLoading && <Loading />}

      {!allPokemonLoading && filteredList && (
        <>
          <>
            <div className="flex justify-center space-x-4">
              <input
                type="text"
                onChange={handleSearchInput}
                placeholder="Search Pokemon"
                ref={searchRef}
                className="rounded-full p-2"
              />
            </div>
            <div className="my-4 flex justify-end space-x-4">
              <button
                onClick={clearFilter}
                className="rounded-md border border-black bg-white/25 p-2 hover:bg-white/50"
              >
                Show all
              </button>
              <button
                onClick={newRandomList}
                className="rounded-md border border-black bg-white/25 p-2 hover:bg-white/50"
              >
                Some random pokemont
              </button>
              <button
                onClick={makeSuggestion}
                className="rounded-md border border-black bg-white/25 p-2 hover:bg-white/50"
              >
                Pick one for me
              </button>
            </div>
          </>

          <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-3 lg:grid-cols-5">
            {filteredList.map((p) => (
              <PokemonCard
                key={p.pokedexId}
                pokemon={p}
                handleSelection={handleSelection}
                isPlayer={isPlayer}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default FilteredList;
