import { useEffect, useState } from "react";
import { curData } from "../data";


/* usePostFetchMsg, for post new msg */
const usePostFetchMsg = (
  usr,
  curCh,
  msgUrl,
  newMsg,
  msgLength,
  jwtToken,
) => {
  // const state
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // define fetch data function
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const body = {
          data: {
            users_permissions_users: {
              id: curData.curUserId, // way 1 use global var, works;
            },
            sender: usr,
            body: newMsg,
            time: `${new Date().toLocaleTimeString()}`,
            channel: {
              id: curCh, // ch id state
            },
          },
        };

        // const token = jwtToken; // null?
        const token = curData.jwtToken; // way 1 use global var, works

        if (!newMsg) return;
        const res = await fetch(encodeURI(msgUrl), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
        console.log("res:", res);

        // --- throw an error if the res is not ok ---
        if (!res.ok) {
          const message = res.statusText
            ? `${res.status}: ${res.statusText}\n-> ${msgUrl}`
            : `HTTP error! status: ${res.status}\n-> ${msgUrl}`;
          throw new Error(message);
        }

        const json = await res.json();
        console.log("post msg json:", json);

        setData(json);
        console.log("post msg data:", data);
        setLoading(false);
        // return json;
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [msgUrl, msgLength]);

  return { data, error, loading };
};

export default usePostFetchMsg;
