import { useEffect, useState } from "react";
import { baseUrl } from "../config";

/* way 2, add order control state */
const useDelFetchCh = (
  chIdToDel,
  setPostCh,
  delInitiator,
  setError,
  userProfile
) => {
  const delChUrl = `${baseUrl}/channels/${chIdToDel}`;
  // const state
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      if (!chIdToDel) return;

      // get usr conform to delete ch. prevent delete by accident.  // weird issue, but not error
      // const conform = prompt(
      //   "Are you sure to delete this channel? It'll never come back."
      // );
      // if (!conform) return;

      if (userProfile.username !== delInitiator) return;

      try {
        const res = await fetch(encodeURI(delChUrl), {
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
            ? `${res.status}: ${res.statusText}:${js.error.message}\n-> ${delChUrl}`
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

  return { data, loading }; // way 2 use setError from App
};

export default useDelFetchCh;
