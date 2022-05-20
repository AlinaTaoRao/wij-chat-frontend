import "./styles.css";

import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <div className="title">
        <img
          className="chat-logo"
          src="./assets/chatCoin.png"
          alt="chat logo"
        />
        <h1 className="wij-chat">Wij Chat</h1>
      </div>

      <div className="register">
        <Link to="/signIn">
          <span className="sign-in"> Sign in</span>
        </Link>
        <Link to="/signUp">
          <span className="sign-up"> Sign up</span>
        </Link>
      </div>
    </div>
  );
}
