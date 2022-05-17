import { useEffect, useState } from "react";
// import { curData } from "../data";
import { jwt } from "../config";

const usePostFetchCh = (
  usr,
  channelName,
  chUrl,
  chLength,
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
        const initiator = usr;
        const title = channelName;
        const body = {
          data: {
            // users_permissions_users: {
            //   id: 2, // if the max user id in strapi < this number, will throw error!
            // },
            initiator: initiator,
            title: `# ${title}`,
          },
        };

        const token = jwt;
        // const token = usrCollection.usr.jwtToken; // not work

        if (!channelName) return;
        const res = await fetch(encodeURI(chUrl), {
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
            ? `${res.status}: ${res.statusText}\n-> ${chUrl}`
            : `HTTP error! status: ${res.status}\n-> ${chUrl}`;
          throw new Error(message);
        }

        const json = await res.json();
        console.log("post ch json:", json);

        setData(json);
        console.log("post ch data:", data);
        setLoading(false);
        // return json;
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [chUrl, chLength]);

  return { data, error, loading };
};

export default usePostFetchCh;
