import "./styles.css";
import { curData } from "../../data";
import { baseUrl } from "../../config";
import useFetch from "../../my-hook/useFetch";

import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

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
          <h1 className="title-sign">Wij Chat</h1>
        </div>
      </Link>
      <form className="sign-in-form">
        <input
          type="text"
          className="username-input"
          value={username}
          onChange={handleUsrInput}
          placeholder="Username"
          required
        />
        <input
          type="password"
          className="password-input"
          value={password}
          onChange={handlePwdInput}
          placeholder="Password"
          required
        />

        <div className="sign-container">
          <Link to="/" className="link-home">
            <button className="sign-in-btn" onClick={handleSignIn}>
              Sign in
            </button>
          </Link>

          <p className="sign-up">
            Don't have a count yet.
            <Link to="/signUp">
              <span className="to-sign-up">Sign up</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
