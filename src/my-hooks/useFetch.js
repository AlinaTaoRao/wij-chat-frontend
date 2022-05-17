import { useEffect, useState } from "react";

const useFetch = (url, msgLength) => {
  // const state
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [rerender, setRerender] = useState(false);

  // define fetch data function
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(encodeURI(url));
        // console.log("res:", res);
        // --- throw an error if the res is not ok (this works!) ---
        if (!res.ok) {
          const message = res.statusText
            ? `${res.status}: ${res.statusText}\n-> ${url}`
            : `HTTP error! status: ${res.status}\n-> ${url}`;
          throw new Error(message);
        }

        const json = await res.json();
        // console.log("json:", json);

        setData(json);
        // console.log("json data:", data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, msgLength]);

  return { data, error, loading };
};

export default useFetch;
