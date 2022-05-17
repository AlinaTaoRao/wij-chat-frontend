import { useEffect, useState } from "react";

const usePostFetchUsr = (usr, email, pwd, authorizationUrl, usrLength) => {
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
        /* gather cur values and define body */
        const username = usr;
        console.log("username=", username);
        const usrEmail = email;
        console.log("usrEmail=", usrEmail);
        const password = pwd;
        console.log("password=", password);

        // const userId = 2;     // # todo, dynamically get user id.
        const body = {
          data: {
            username: username,
            email: usrEmail,
            password: password,
          },
        };


        if (!usr || !email || !pwd) return;
        const res = await fetch(encodeURI(authorizationUrl), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        console.log("post usr res:", res);

        // --- throw an error if the res is not ok (this works!) ---
        if (!res.ok) {
          const message = res.statusText
            ? `${res.status}: ${res.statusText}\n-> ${authorizationUrl}`
            : `HTTP error! status: ${res.status}\n-> ${authorizationUrl}`;
          throw new Error(message);
        }

        const json = await res.json();
        console.log("post usr json:", json);

        setData(json);
        console.log("post usr data:", data);
        setLoading(false);
        // return json;
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [authorizationUrl, usrLength]);

  return { data, error, loading };
};

export default usePostFetchUsr;
