import useFetch from "./useFetch";
import { typeEndpoint } from "../utils/apiEndpoints";

export const useTypeEffects = () => {
  const { data, isLoading, error, errorMessage, refetch } = useFetch("");

  const fetch = () => {
    refetch(typeEndpoint);
  };

  return {
    allTypeEffects: data,
    allTypeEffectsLoading: isLoading,
    allTypeEffectsError: error,
    allTypeEffectsErrorMessage: errorMessage,
    fetch,
  };
};
