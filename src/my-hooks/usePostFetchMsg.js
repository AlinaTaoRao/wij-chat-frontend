import { useEffect, useState } from "react";
// import { curData } from "../data";

/* usePostFetchMsg, for post new msg */
const usePostFetchMsg = (
  usr,
  curCh,
  msgUrl,
  newMsg,
  setNewMsg,
  msgLength,
  setPostMsg,
  jwtToken,
  userId,
  setError
) => {
  // const state
  const [data, setData] = useState(null);
  // const [error, setError] = useState(null); // way 1, not work
  const [loading, setLoading] = useState(true);

  // define fetch data function
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const body = {
          data: {
            users_permissions_users: {
              // id: curData.curUserId, // way 1 use global var, works;
              id: userId, // way 2, state, works
            },
            sender: usr,
            body: newMsg,
            time: `${new Date().toLocaleTimeString()}`,
            channel: {
              id: curCh, // ch id state
            },
          },
        };

         // const token = curData.jwtToken; // way 1 use global var, works
        const token = jwtToken;  // way 2, set jwtToken while sign in or sign up, works.
        console.log("token form post msg is:", token)
       

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

        // --- throw an error if the res is not ok, not work? ---
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

        setPostMsg(json);  // to control multiple api fetch order. post msg first, when it finish, fire useFetch(), this works!

        setNewMsg(""); // clear input field, works

        setLoading(false);
        // return json;
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [msgUrl, msgLength]);

  // return { data, error, loading }; // way 1, not work
  return { data,loading }; // way 2, use setError from App
};

export default usePostFetchMsg;
