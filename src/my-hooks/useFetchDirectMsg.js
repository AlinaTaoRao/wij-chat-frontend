import { useEffect, useState } from "react";

/* 
add order control state dMessage.
dMessage: place holder, fire useFetch each time post/delete .
*/
const useFetchDirectMsg = (url, dMessage, setError, setDMessageData) => {
  // console.log("fetchDirectMessageUrl", url);
  // const state
  // const [data, setData] = useState(null);
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
        console.log("useFetchDirectMsg json:", json);

        // setData(json);
        // console.log("useFetchDirectMsg json data:", data);

        setDMessageData(json); // try render direct messages list ?

        setLoading(false);
      } catch (error) {
        setError(error); // set error state from App
        setLoading(false);
      }
    };

    fetchData();
  }, [url, dMessage]);

  // return { data, loading };
  return { loading };
};

export default useFetchDirectMsg;
