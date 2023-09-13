import { useState, useCallback } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = useCallback((url, config = {}) => {
    const abortController = new AbortController();

    setIsLoading(true);
    setError(false);
    setErrorMessage("");

    if (!url) return;

    fetch(url, { ...config, signal: abortController.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong!");
        }

        // if we get status 201 we have posted something and are good
        if (res.status === 201) return;

        return res.json();
      })
      .then((resData) => {
        setIsLoading(false);
        setError(false);

        setData(resData);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(true);
        setErrorMessage(err.message);
      });

    return () => {
      abortController.abort();
    };
  }, []);

  return { data, isLoading, error, errorMessage, refetch: fetchData };
};

export default useFetch;
