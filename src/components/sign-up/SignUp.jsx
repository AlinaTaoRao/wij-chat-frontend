import './styles.css';

import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [usr, setUsr] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const handleSignUp = () => {};

  return (
    <div className="sign-up">
       <Link to="/">
         <div className='title-container'>
         <h1 className="title-sign">Wij Chat</h1>
         </div>
      </Link>
      <form className="sign-up-form">
        <input
          type="text"
          className="usr-input"
          value={usr}
          onChange={(e) => setUsr(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="email"
          className="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          className="pwd-input"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="Password"
          required
        />

        <div className="sign-up-container">
          <Link to="/">
            <button className="sign-up-btn" onClick={handleSignUp}>
              Sign up
            </button>
          </Link>
          <p>
            Already have a count.
            <Link to="/signIn">
              <span className="to-sign-in">Sign in.</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
