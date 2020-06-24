import { useState, useEffect } from "react";

// const log = async mess => Promise.resolve(console.log(mess));

const useFetch = (url, options = {}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // log("    [useFetch] Fetch " + options.location);
        const res = await fetch(url, options);
        const json = await res.json();

        setResponse(json);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [url]);

  return { response, error, isLoading };
};

export default useFetch;
