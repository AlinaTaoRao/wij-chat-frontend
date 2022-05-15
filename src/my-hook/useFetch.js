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
        console.log("res:", res);
        const json = await res.json();
        console.log("json:", json);

        setData(json);
        console.log("json data:", data);
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
