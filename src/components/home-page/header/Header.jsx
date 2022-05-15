import "./styles.css";

import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <h1 className="title">Wij Chat</h1>

      <div className="register">
        <Link to="/signIn">
          <span className="to-sign-in" > Sign in</span>
        </Link>
        <Link to="/signUp">
          <span className="to-sign-up" > Sign up</span>
        </Link>
      </div>
    </div>
  );
}
