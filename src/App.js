import "./App.css";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
import HomePage from "./components/home-page/HomePage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { curData } from "./data";

function App() {
  const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [userId, setUserId] = useState("");
  /* define handlers */
  const activeUser = () => {
    
  };


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/signIn"
            element={
              <SignIn
                username={username}
                handleUsernameInput={(e) => {
                  curData.curUser = e.target.value;
                  console.log("cur user?:", curData.curUser);
                  setUsername(e.target.value);
                }}
                handleSignIn={activeUser}
              />
            }
          />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
