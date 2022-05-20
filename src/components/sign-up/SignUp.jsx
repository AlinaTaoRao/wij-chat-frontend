import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./styles.css";
import { baseUrl } from "../../config";

/* try 2: use handler, post usr works */
export default function SignUp({
  usr,
  setUsr,
  setUserId,
  jwtToken,
  setJwtToken,
}) {
  const authorizationUrl = `${baseUrl}/auth/local/register`;
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  /* post new usr */
  const handleUsrSignUp = () => {
    const fetchData = async () => {
      try {
        const body = {
          username: usr, // works
          email: email,
          password: pwd,
        };

        if (!usr || !email || !pwd) return;
        const res = await fetch(encodeURI(authorizationUrl), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        console.log("sign up res:", res);

        // --- throw an error if the res is not ok (this works!) ---
        if (!res.ok) {
          const message = res.statusText
            ? `${res.status}: ${res.statusText}\n-> ${authorizationUrl}`
            : `HTTP error! status: ${res.status}\n-> ${authorizationUrl}`;
          throw new Error(message);
        }

        const json = await res.json();
        console.log("sign up json:", json);

        setData(json);
        console.log("sign up data:", data);

        setUserId(() => json.user.id); // works

        setJwtToken(() => json.jwt); // works, for this user post msg or ch.
        console.log("sign up usr jwtToken:", jwtToken);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    return { data, error, loading };
  };

  if (error)
    return (
      <p>
        error status: {error.status} <span>error: message {error.message}</span>
      </p>
    );
  // if (loading) return <p>loading...</p>;

  return (
    <div className="sign-up">
      <Link to="/">
        <div className="title-container">
        <img
          className="chat-logo"
          src="./assets/chatCoin.png"
          alt="chat logo"
        />
          <h1 className="title-sign wij-chat">Wij Chat</h1>
        </div>
      </Link>
      <form
        className="sign-up-form"
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   handleUsrSignUp();
        // }}
        // onSubmit={handleUsrSignUp} // not work, can't fire handleUsrSignUp, ?!
      >
        <input
          type="text"
          className="usr-input"
          value={usr}
          onChange={(e) => {
            // set new user as cur usr.
            setUsr(e.target.value);
            console.log("cur usr from sign in is:", usr);
          }}
          placeholder="Username"
          required
        />
        <input
          type="email"
          className="email-input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            console.log("sign in email is:", email);
          }}
          placeholder="Email"
          required
        />
        <input
          type="password"
          className="pwd-input"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="Password. Must >= 6 character"
          required
        />
        <Link to="/">
          <input
            type="submit"
            value="Sign up"
            className="sign-up-btn"
            onClick={handleUsrSignUp} //
          />
        </Link>
      </form>
      <div className="sign-up-container">
        <p>
          Already have a count?
          <Link to="/signIn">
            <span className="to-sign-in">Sign in.</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
