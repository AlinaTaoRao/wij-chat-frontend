import { useEffect, useState } from "react";

/* usePostFetchMsg, for post new msg */
const usePostFetchMsg = (
  curCh,
  msgUrl,
  newMsg,
  setNewMsg,
  msgLength,
  setPostMsg,
  setError,
  userProfile
) => {
  // const state
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // define fetch data function
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); //

      try {
        const body = {
          data: {
            users_permissions_users: {
              id: userProfile.id,
            },
            sender: userProfile.username,
            body: newMsg,
            time: `${new Date().toLocaleTimeString()}`,
            channel: {
              id: curCh, // ch id state
            },
          },
        };

        const token = userProfile.token;
        console.log("token form post msg is:", token);

        if (!newMsg) return; // prevent send empty msg.
        const res = await fetch(encodeURI(msgUrl), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
        console.log("res:", res);

        /* throw an error way 2, best way */
        if (!res.ok) {
          const js = await res.json();
          console.log("error res js:", js);
          const message = res.statusText
            ? `${res.status}: ${res.statusText}:${js.error.message}\n-> ${msgUrl}`
            : `HTTP error! status: ${res.status}\n-> ${msgUrl}`;
          throw new Error(message);
        }

        const json = await res.json();
        console.log("post msg json:", json);

        setData(json);
        console.log("post msg data:", data);

        setPostMsg(json); // to control multiple api fetch order. post msg first, when it finish, fire useFetch(), this works!

        setNewMsg(""); // clear input field, works

        setLoading(false);
        // return json;
      } catch (error) {
        setError(error); // use setError from App
        setLoading(false);
      }
    };

    fetchData();
  }, [msgUrl, msgLength]);

  return { data, loading }; 
};

export default usePostFetchMsg;
