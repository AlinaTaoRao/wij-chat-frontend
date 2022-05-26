import { useEffect, useState } from "react";
import { baseUrl } from "../config";

/* way 2, add order control state */
const useDelFetchMsg = (msgIdToDel, setPostMsg, setError, userProfile) => {
  const delMsgUrl = `${baseUrl}/messages/${msgIdToDel}`;
  // const state
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); //

      if (!msgIdToDel) return;

      try {
        const res = await fetch(encodeURI(delMsgUrl), {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userProfile.token}`,
          },
        });
        // console.log("res:", res);

        /* throw an error */
        if (!res.ok) {
          const js = await res.json();
          console.log("error res js:", js);
          const message = res.statusText
            ? `${res.status}: ${res.statusText}:${js.error.message}\n-> ${delMsgUrl}`
            : `HTTP error! status: ${res.status}\n-> ${delMsgUrl}`;
          throw new Error(message);
        }

        const json = await res.json();
        console.log("useDelFetchMsg json:", json);

        setData(json);
        console.log("useDelFetchMsg json data:", data);

        setPostMsg(() => json); // to fire useFetch, rerender msg list.

        setLoading(false);
      } catch (error) {
        setError(error); // use setError from App
        setLoading(false);
      }
    };

    fetchData();
  }, [msgIdToDel]);

  return { data, loading };
};

export default useDelFetchMsg;
