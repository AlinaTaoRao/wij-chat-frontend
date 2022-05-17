import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import usePostFetchUsr from "./my-hooks/usePostFetchUsr";

import "./App.css";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
import HomePage from "./components/home-page/HomePage";
// import { curData } from "./data";
import { baseUrl } from "./config";

function App() {
  const loginUrl = `${baseUrl}/auth/local`;
  const [usr, setUsr] = useState("");
  const [pwd, setPwd] = useState("");
  const [jwtToken, setJwtToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loginCount, setLoginCount] = useState(0);
  // const [usrCollection, setUsrCollection] = useState({});

  /* define handlers */
  // const activeUser = () => {};
  const { loginData, loginError, loginLoading } = usePostFetchUsr(
    usr,
    pwd,
    loginUrl,
    jwtToken,
    setJwtToken,
    userId,
    setUserId,
    loginCount
  );

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
                userId={userId}
                setUserId={setUserId}
                handleUsrInput={(e) => {
                  setUsr(e.target.value);
                }}
                handlePwdInput={(e) => setPwd(e.target.value)}
                handleSignIn={() => setLoginCount((c) => c + 1)}
              />
            }
          />
          <Route
            path="/signUp"
            element={
              <SignUp
                usr={usr}
                setUsr={setUsr}
                // usrCollection={usrCollection}
                // setUsrCollection={setUsrCollection}
              />
            }
          />
          <Route
            path="/"
            element={
              <HomePage
                usr={usr}
                jwtToken={jwtToken}
                // usrCollection={usrCollection}
                // setUsrCollection={setUsrCollection}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
