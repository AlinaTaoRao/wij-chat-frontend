import { useEffect, useState } from "react";

/* 
add order control state newEvent.
newEvent: place holder for username, postCh and postMsg: fire useFetch each time post/delete a msg or ch. or a user sign up or sign in.
*/
const useFetch = (url,newEvent,setError) => {
  // const state
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // define fetch data function
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(encodeURI(url));
        // console.log("res:", res);

        /* throw an error way  */
        if (!res.ok) {
          const js = await res.json();
          // console.log("error res js:", js);
          const message = res.statusText
            ? `${res.status}: ${res.statusText}:${js.error.message}\n-> ${url}`
            : `HTTP error! status: ${res.status}\n-> ${url}`;
          throw new Error(message);
        }

        const json = await res.json();
        // console.log("useFetch json:", json);

        setData(json);
        // console.log("useFetch json data:", data);

        setLoading(false);
      } catch (error) {
        setError(error); // set error state from App
        setLoading(false);
      }
    };

    fetchData();
  }, [url, newEvent]);

  return { data, loading };
};

export default useFetch;
