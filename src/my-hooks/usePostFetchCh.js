import { useEffect, useState } from "react";

/* usePostFetchCh, for post new channel */
const usePostFetchCh = (
  channelName,
  setChannelName,
  chUrl,
  chLength,
  setPostCh,
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
            initiator: userProfile.username,
            title: `# ${channelName}`,
          },
        };

        const token = userProfile.token;

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

        /* throw an error */
        if (!res.ok) {
          const js = await res.json();
          // console.log("error res js:", js);
          const message = res.statusText
            ? `${res.status}: ${res.statusText}:${js.error.message}\n-> ${chUrl}`
            : `HTTP error! status: ${res.status}\n-> ${chUrl}`;
          throw new Error(message);
        }

        const json = await res.json();
        console.log("post ch json:", json);

        setData(json);
        // console.log("post ch data:", data);

        setPostCh(json); // to control multiple api fetch order. post ch first, when it finish, fire useFetch(), this works!

        setChannelName(""); // clear input field;
        setLoading(false);
      } catch (error) {
        setError(error); // use setError from App, works
        setLoading(false);
      }
    };

    fetchData();
  }, [chUrl, chLength]);

  return { data, loading };
};

export default usePostFetchCh;
