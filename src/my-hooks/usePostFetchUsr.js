import { useEffect, useState } from "react";

import { curData } from "../data";

/* usePostFetchUsr, for user sign in */
const usePostFetchUsr = (
  usr,
  pwd,
  loginUrl,
  jwtToken,
  setJwtToken,
  userId,
  setUserId,
) => {
  // const state
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  //   const [loading, setLoading] = useState(false);
  // const [rerender, setRerender] = useState(false);

  // define fetch data function
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const body = {
          identifier: usr, // username or email
          password: pwd,
        };

        if (!usr || !pwd) return;
        const res = await fetch(encodeURI(loginUrl), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        console.log("sign in post usr res:", res);

        // --- throw an error if the res is not ok  ---
        if (!res.ok) {
          const message = res.statusText
            ? `${res.status}: ${res.statusText}\n-> ${loginUrl}`
            : `HTTP error! status: ${res.status}\n-> ${loginUrl}`;
          throw new Error(message);
        }

        const json = await res.json();
        console.log("sign in post usr json:", json);

        setData(json);
        console.log("sign in post usr data:", data); // null?

        curData.jwtToken = json.jwt; //way 1 use global var, works

        setJwtToken(() => json.jwt); // way 2 use state, works, must use an update fn instead of an object!  //
        console.log("jwtToken from sign in json is", jwtToken); 

        curData.curUserId = json.user.id; //way 1 use global var
        setUserId(() => json.user.id); // way 2 use state, works
        console.log("usr id from sign in json is", userId); 

        setLoading(false);
        // return json;
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [loginUrl]);

  return { data, error, loading };
};

export default usePostFetchUsr;
