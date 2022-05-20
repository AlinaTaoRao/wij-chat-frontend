import { useEffect, useState } from "react";
import { baseUrl } from "../config";

/* way 2, add order control state */
const useDelFetchMsg = (msgIdToDel, setPostMsg, jwtToken) => {
  const delMsgUrl = `${baseUrl}/messages/${msgIdToDel}`;
  // const state
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(encodeURI(delMsgUrl), {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        // console.log("res:", res);
        // --- throw an error if the res is not ok (this works!) ---
        if (!res.ok) {
          const message = res.statusText
            ? `${res.status}: ${res.statusText}\n-> ${delMsgUrl}`
            : `HTTP error! status: ${res.status}\n-> ${delMsgUrl}`;
          throw new Error(message);
        }

        // console.log("useDelFetchMsg delMsgUrl:", delMsgUrl);

        const json = await res.json();
        console.log("useDelFetchMsg json:", json);

        setData(json);
        console.log("useDelFetchMsg json data:", data);

        setPostMsg(() => json); // to fire useFetch, rerender msg list.

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [delMsgUrl, msgIdToDel]);

  return { data, error, loading };
};

export default useDelFetchMsg;
