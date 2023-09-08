import useFetch from "./useFetch";
import { pokemonEndpoint } from "../utils/apiEndpoints";

export const useAllPokemon = () => {
  const { data, isLoading, error, errorMessage, refetch } = useFetch(pokemonEndpoint);

  const fetchAll = () => {
    refetch(pokemonEndpoint);
  };

  return {
    allPokemon: data,
    allPokemonLoading: isLoading,
    allPokemonError: error,
    allPokemonErrorMessage: errorMessage,
    fetchAll,
  };
};

export const useSearchPokemon = () => {
  const { data, isLoading, error, errorMessage, refetch } = useFetch("");

  const search = (query) => {
    const encodedSearchQuery = encodeURIComponent(query);
    const url = `${pokemonEndpoint}?query=${encodedSearchQuery}`;
    refetch(url);
  };

  return {
    searchResults: data,
    searchLoading: isLoading,
    searchError: error,
    searchErrorMessage: errorMessage,
    search,
  };
};

export const useOnePokemon = (idOrName) => {
  const { data, isLoading, error, errorMessage, refetch } = useFetch(`${pokemonEndpoint}/${idOrName}`);

  console.log('Fetched Pokemon Data:', data); // Log the fetched data
  console.log('Fetch Error:', error); // Log any potential errors

  const fetchOne = (idOrName) => {
    const url = `${pokemonEndpoint}/${idOrName}`;
    refetch(url);
  };

  return {
    onePokemon: data,
    onePokemonLoading: isLoading,
    onePokemonError: error,
    onePokemonErrorMessage: errorMessage,
    fetchOne,
  };
};

export const useOnePokemonInfo = () => {
  const { data, isLoading, error, errorMessage, refetch } = useFetch("");

  const fetchInfo = (idOrName, info) => {
    const url = `${pokemonEndpoint}/${idOrName}/${info}`;
    refetch(url);
  };

  return {
    onePokemonInfo: data,
    onePokemonInfoLoading: isLoading,
    onePokemonInfoError: error,
    onePokemonInfoErrorMessage: errorMessage,
    fetchInfo,
  };
};


