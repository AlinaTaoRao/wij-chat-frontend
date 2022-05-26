import { useEffect, useState } from "react";

/* way 2, add order control state */
const useFetch = (url, usr, postCh, postMsg, setError) => {
  // const state
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  /* try to fire useFetch each time after send new msg or created new ch */

  // define fetch data function
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(encodeURI(url));
        // console.log("res:", res);
        
   
        /* throw an error way 2, best way */
        if (!res.ok) {
          const js = await res.json();
          console.log("error res js:", js);
          const message = res.statusText
            ? `${res.status}: ${res.statusText}:${js.error.message}\n-> ${url}`
            : `HTTP error! status: ${res.status}\n-> ${url}`;
          throw new Error(message);
        }

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
  }, [url, usr, postCh, postMsg]);

  // return { data, error, loading }; // way 1 define error state in each fetch
  return { data, loading }; //  way 2, use error state from App
};

export default useFetch;
