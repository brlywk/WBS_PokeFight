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
  const { post } = useFetch();

  const saveFight = async (fightData) => {
    try {
      await post(fightEndpoint + '/save', fightData);
    } catch (error) {
      console.error('Failed to save fight:', error);
    }
  };

  return { saveFight };
};