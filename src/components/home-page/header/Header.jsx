import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi"; // import icon

import "./styles.css";

export default function Header({
  userProfile,
  setUserProfile,
  initialProfile,
  error,
  setError,
}) {
  const [profileLists, setProfileLists] = useState(false); // for hide or display profile lists
  const showProfile = () => {
    setProfileLists(!profileLists);
  };

  /* clear current user profile, sign out */
  const handleSignOut = () => {
    setError(null);
    setUserProfile(initialProfile);
  };
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

      {userProfile.username ? (
        <div className="user-sign-out-container">
          <div className="profile-container">
            <BiUserCircle id="profile-icon" onClick={showProfile} />
            <ul
              className={
                profileLists ? "profile-lists active" : "profile-lists "
              }
            >
              <li className="profile-name list-item">username:{userProfile.username}</li>
              <li className="profile-email list-item">email:{userProfile.email}</li>
              <li className="profile-id list-item">id:{userProfile.id}</li>
              <li className="profile-created-at list-item">created at:{userProfile.createdAt}</li>
            </ul>
          </div>
          <span className="sign-out" onClick={handleSignOut}>
            Sign out
          </span>
        </div>
      ) : (
        <div className="register">
          <Link to="/signIn">
            <span className="sign-in"> Sign in</span>
          </Link>
          <Link to="/signUp">
            <span className="sign-up"> Sign up</span>
          </Link>
        </div>
      )}
    </div>
  );
}
