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

    // Debug Step 3: Log the URL being fetched to check if it's valid
    console.log(`Fetching URL: ${url}`);

    console.log(`Loading in fetch: ${isLoading}`);

    fetch(url, { ...config, signal: abortController.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong!");
        }

        return res.json();
      })
      .then((resData) => {
        console.log('Fetched data:', resData); // Log the fetched data
        setIsLoading(false);
        setError(false);

        setData(resData);
      })
      .catch((err) => {
        // Debug Step 3: Log any errors during fetch to check if the request was aborted
        console.error('Fetch error:', err); 
        setIsLoading(false);
        setError(true);
        setErrorMessage(err.message);
      });

    // Debug Step 3: Log when the fetch request is aborted
    return () => {
      console.log('Fetch request aborted');
      abortController.abort();
    };
  }, []);

  return { data, isLoading, error, errorMessage, refetch: fetchData };
};

export default useFetch;



