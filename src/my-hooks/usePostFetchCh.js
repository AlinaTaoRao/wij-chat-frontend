import { useEffect, useState } from "react";

// import { curData } from "../data";

/* usePostFetchCh, for post new channel */
const usePostFetchCh = (
  usr,
  channelName,
  setChannelName,
  chUrl,
  curCh,
  chLength,
  postCh,
  setPostCh,
  jwtToken,
  userId
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
              // id: curData.curUserId, // way 1, global var, works
              id: userId,  // way 2, state, works
            },
            initiator: usr,
            title: `# ${channelName}`,
          },
        };

        const token = jwtToken;
        console.log("token form post ch is:", token);
        // const token = curData.jwtToken; // works,

        if (!channelName) return;
        const res = await fetch(encodeURI(chUrl), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
        console.log("post ch res:", res);

        // --- throw an error if the res is not ok, not work?  ---
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

        setPostCh(json); // to control multiple api fetch order. post ch first, when it finish, fire useFetch(), this works!

        setChannelName(""); // clear input field;
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
