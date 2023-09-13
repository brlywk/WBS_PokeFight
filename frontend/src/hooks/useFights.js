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
  const { data, isLoading, error, errorMessage, refetch: save } = useFetch("");

  const saveFight = (fight) => {
    const options = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(fight) };
    save(fightEndpoint + "/save", options);
  };

  return {
    saveFightData: data,
    saveFightLoading: isLoading,
    saveFightError: error,
    saveFightErrorMessage: errorMessage,
    saveFight,
  };
};
