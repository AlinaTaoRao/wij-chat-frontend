import { useEffect, useState } from "react";

/* 
add order control state dMessage.
dMessage: place holder, fire useFetch each time post/delete .
*/
const useFetchDirectMsg = (url, dMessage, setError, setDMessageData) => {
  // console.log("fetchDirectMessageUrl", url);
  // const [data, setData] = useState(null); // way 1: not render direct messages list issue
  const [loading, setLoading] = useState(true);

  // define fetch data function
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(encodeURI(url));

        /* throw an error */
        if (!res.ok) {
          const js = await res.json();
          const message = res.statusText
            ? `${res.status}: ${res.statusText}:${js.error.message}\n-> ${url}`
            : `HTTP error! status: ${res.status}\n-> ${url}`;
          throw new Error(message);
        }

        const json = await res.json();
        console.log("useFetchDirectMsg json:", json);

        // setData(json);       // way 1: not render direct messages list issue
        // console.log("useFetchDirectMsg json data:", data);

        setDMessageData(json); // way 2: for render direct messages list, works

        setLoading(false);
      } catch (error) {
        // setError(error); // JSON token issue?!
        setLoading(false);
      }
    };

    fetchData();
  }, [url, dMessage]);

  // return { data, loading }; // way 1: not render direct messages list issue
  return { loading };
};

export default useFetchDirectMsg;
