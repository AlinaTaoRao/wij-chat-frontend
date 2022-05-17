import { useEffect, useState } from "react";
// import { curData } from "../data";
import { jwt } from "../config";

const usePostFetchMsg = (
  usr,
  curCh,
  msgUrl,
  newMsg,
  msgLength,
  usrCollection
) => {
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
        /* gather cur values and define body */
        const sender = usr;
        console.log("sender=", sender);
        const chId = curCh;
        // const userId = 2;     // # todo, dynamically get user id.
        const body = {
          data: {
            // users_permissions_users: {
            //   id: userId,
            // },
            sender: sender,
            body: newMsg,
            time: `${new Date().toLocaleTimeString()}`,
            channel: {
              id: chId,
            },
          },
        };

        const token = jwt;
        // const token = usrCollection.usr.jwtToken; // not work

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
