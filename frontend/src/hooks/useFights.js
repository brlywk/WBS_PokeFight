import useFetch from "./useFetch";
import { fightEndpoint } from "../utils/apiEndpoints";

export const useAllFights = () => {
  const { data, isLoading, error, errorMessage, refetch } = useFetch("");

  const fetch = () => {
    refetch(fightEndpoint);
  };

  return {
    allFights: data,
    allFightsLoading: isLoading,
    allFightsError: error,
    allFightsErrorMessage: errorMessage,
    fetch,
  };
};

export const useSingleFight = () => {
  // TODO implement
};

export const useSaveFight = () => {
  // TODO implement
};
