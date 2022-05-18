import { useEffect, useState } from "react";

/* useFetch, for fetch ch, msg, usr list. */
// curCh, cur ch id, try to toggle rerender?
const useFetch = (url, curCh, msgLength) => {
  // const state
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  /* try to fire useFetch each time after send new msg or created new ch */
  

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

        console.log("useFetch url:", url);
        console.log("useFetch curCh:", curCh);
        console.log("useFetch msgLength:", msgLength);

        const json = await res.json();
        console.log("useFetch json:", json);

        setData(json);
        console.log("useFetch json data:", data);
        
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, curCh, msgLength]);

  return { data, error, loading };
};

export default useFetch;
