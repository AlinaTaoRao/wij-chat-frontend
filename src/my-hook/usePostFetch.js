import { useEffect, useState } from "react";
import { curData } from "../data";
import { jwt } from "../config";

const usePostFetch = (msgUrl, newMsg, msgLength) => {
  // const state
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [rerender, setRerender] = useState(false);

  // define fetch data function
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        /* grab cur values and define body */
        const sender = curData.curUser;
        console.log("sender=", sender);
        const chId = curData.curCh;
        // const userId = 2;     // # todo, dynamically get user id.
        const body = {
          data: {
            // users_permissions_users: {
            //   id: userId,
            // },
            sender: sender,
            body: newMsg,
            channel: {
              id: chId,
            },
          },
        };

        const token = jwt;

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

        // --- throw an error if the res is not ok (this works!) ---
        if (!res.ok) {
          const message = res.statusText
            ? `${res.status}: ${res.statusText}\n-> ${msgUrl}`
            : `HTTP error! status: ${res.status}\n-> ${msgUrl}`;
          throw new Error(message);
        }

        const json = await res.json();
        console.log("json:", json);

        setData(json);
        console.log("post data:", data);
        setLoading(false);
        // return json;
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [msgUrl, msgLength]);

  return { data, error, loading};
};

export default usePostFetch;
