import useFetch from "./useFetch";
import { pokemonEndpoint } from "../utils/apiEndpoints";

export const useAllPokemon = () => {
  const { data, isLoading, error, errorMessage, refetch } = useFetch("");

  const fetch = () => {
    refetch(pokemonEndpoint);
  };

  return {
    allPokemon: data,
    allPokemonLoading: isLoading,
    allPokemonError: error,
    allPokemonErrorMessage: errorMessage,
    fetch,
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

export const useOnePokemon = () => {
  const { data, isLoading, error, errorMessage, refetch } = useFetch("");

  const fetch = (idOrName) => {
    const url = `${pokemonEndpoint}/${idOrName}`;
    refetch(url);
  };

  return {
    onePokemon: data,
    onePokemonLoading: isLoading,
    onePokemonError: error,
    onePokemonErrorMessage: errorMessage,
    fetch,
  };
};

export const useOnePokemonInfo = () => {
  const { data, isLoading, error, errorMessage, refetch } = useFetch("");

  const fetch = (idOrName, info) => {
    const url = `${pokemonEndpoint}/${idOrName}/${info}`;
    refetch(url);
  };

  return {
    onePokemonInfo: data,
    onePokemonInfoLoading: isLoading,
    onePokemonInfoError: error,
    onePokemonInfoErrorMessage: errorMessage,
    fetch,
  };
};
