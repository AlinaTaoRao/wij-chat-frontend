import "./App.css";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
import HomePage from "./components/home-page/HomePage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { curData } from "./data";

function App() {
  const [usr, setUsr] = useState("");
  const [pwd, setPwd] = useState("");
  const [usrCollection, setUsrCollection] = useState({});
  // const [userId, setUserId] = useState("");
  /* define handlers */
  const activeUser = () => {};

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/signIn"
            element={
              <SignIn
                username={usr}
                password={pwd}
                handleUsrInput={(e) => {
                  setUsr(e.target.value);
                }}
                handlePwdInput={(e) => setPwd(e.target.value)}
                handleSignIn={activeUser}
              />
            }
          />
          <Route
            path="/signUp"
            element={
              <SignUp
                usr={usr}
                setUsr={setUsr}
                usrCollection={usrCollection}
                setUsrCollection={setUsrCollection}
              />
            }
          />
          <Route
            path="/"
            element={
              <HomePage
                usr={usr}
                usrCollection={usrCollection}
                setUsrCollection={setUsrCollection}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
