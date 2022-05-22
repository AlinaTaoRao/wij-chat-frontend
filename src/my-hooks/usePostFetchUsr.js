import { useEffect, useState } from "react";

// import { curData } from "../data";

/* usePostFetchUsr, handle user sign in, fired when loginCount change */
const usePostFetchUsr = (
  usr,
  pwd,
  loginUrl,
  jwtToken,
  setJwtToken,
  userId,
  setUserId,
  loginCount,
  setError
) => {
  // const state
  const [data, setData] = useState(null);
  // const [error, setError] = useState(null);  // use setError from App
  const [loading, setLoading] = useState(true);

  // define fetch data function
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // clear last usr jwt token if there is, virtual log out
      setJwtToken(() => null);

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

        // --- throw an error if the res is not ok , way 1 ---
        // if (!res.ok) {
        //   const message = res.statusText
        //     ? `${res.status}: ${res.statusText}\n-> ${loginUrl}`
        //     : `HTTP error! status: ${res.status}\n-> ${loginUrl}`;
        //   throw new Error(message);
        // }

        /* throw an error way 2, best way */
        if (!res.ok) {
          const js= await res.json();
          console.log("error res js:", js)
          const message = res.statusText
            ? `${res.status}: ${res.statusText}:${js.error.message}\n-> ${loginUrl}`
            : `HTTP error! status: ${res.status}\n-> ${loginUrl}`;
          throw new Error(message);
        }

        const json = await res.json();
        console.log("sign in post usr json:", json);

        setData(json);
        console.log("sign in post usr data:", data); // null?

        // curData.jwtToken = json.jwt; //way 1 use global var, works
        setJwtToken(() => json.jwt); // way 2 use state, works, must use an update fn instead of an object!  //
        console.log("jwtToken from sign in json is", jwtToken);

        // curData.curUserId = json.user.id; //way 1 use global var
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
  }, [loginUrl, loginCount]);

  // return { data, error, loading }; // way 1,
  return { data, loading }; // way 2, setError form App
};

export default usePostFetchUsr;
