import React from "react";
// import { useState } from "react";
import { Link } from "react-router-dom";

import "./styles.css";
// import { curData } from "../../data";
// import { baseUrl } from "../../config";
// import useFetch from "../../my-hooks/useFetch";

export default function SignIn({
  username,
  password,
  handleUsrInput,
  handlePwdInput,
  handleSignIn,
}) {
  return (
    <div className="sign-in">
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
        name="Form"
        className="sign-in-form"
        // onSubmit={handleSignIn}   // onSubmit not work, why ?
      >
        <input
          name="input-name"
          type="text"
          className="username-input"
          value={username}
          onChange={handleUsrInput}
          placeholder="Username"
          required
        />
        <input
          name="input-password"
          type="password"
          className="password-input"
          value={password}
          onChange={handlePwdInput}
          placeholder="Password"
          required
        />

        <div className="sign-container">
          <Link to="/" className="link-home">
            <input
              className="sign-in-btn"
              type="submit"
              value="Sign in"
              onClick={handleSignIn} //works, hit enter or click btn
            />
          </Link>

          <p className="sign-up-text">
            Don't have a count yet?
            <Link to="/signUp">
              <span className="to-sign-up">Sign up</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
