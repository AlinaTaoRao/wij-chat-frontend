import { useEffect, useState } from "react";
import { baseUrl } from "../config";

/* way 2, add order control state */
const useDelFetchCh = (chIdToDel, setPostCh, jwtToken) => {
  const delChUrl = `${baseUrl}/channels/${chIdToDel}`;
  // const state
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(encodeURI(delChUrl), {
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
            ? `${res.status}: ${res.statusText}\n-> ${delChUrl}`
            : `HTTP error! status: ${res.status}\n-> ${delChUrl}`;
          throw new Error(message);
        }

        // console.log("useDelFetch delChUrl:", delChUrl);

        const json = await res.json();
        console.log("useDelFetch json:", json);

        setData(json);
        console.log("useDelFetch json data:", data);

        setPostCh(() => json); // to fire useFetch, rerender msg list.

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [chIdToDel]);

  return { data, error, loading };
};

export default useDelFetchCh;
