import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState } from "react";
import usePostFetchUsr from "./my-hooks/usePostFetchUsr";

import "./App.css";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
import HomePage from "./components/home-page/HomePage";
// import { curData } from "./data";
import { baseUrl } from "./config";

function App() {
  const loginUrl = `${baseUrl}/auth/local`;
  // usr, pwd, jwtToken, collect usr input from sign in or sign up, use in post msg or ch.
  const [usr, setUsr] = useState("");
  const [pwd, setPwd] = useState("");
  const [jwtToken, setJwtToken] = useState(null);

  const [userId, setUserId] = useState(null); // grab cur usr id from sign up or sign in response.
  const [loginCount, setLoginCount] = useState(0); // change this state while sign in submit, to fire usePostFetchUsr, must have!

  const [error, setError] = useState(null); // try to catch and render error msg to usr ?

  /* usePostFetchUsr, handle usr sign in*/
  const { loginData, loginLoading } = usePostFetchUsr(
    usr,
    pwd,
    loginUrl,
    jwtToken,
    setJwtToken,
    userId,
    setUserId,
    loginCount,
    setError // try to catch and render error msg to usr ?
  );
  if (loginLoading) {
    <div className="login-loading loading">loading...</div>;
  }
  if (error) {
    return (
      <div className="error-container">
        <p className="login-error register-error error">{error.message}</p>
        <p>Refresh page to sign in.</p>
      </div>
    );
  }

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
                setUserId={setUserId}
                jwtToken={jwtToken}
                setJwtToken={setJwtToken}
                error={error}
                setError={setError}
              />
            }
          />
          <Route
            path="/"
            element={
              <HomePage
                usr={usr}
                userId={userId}
                jwtToken={jwtToken}
                error={error}
                setError={setError}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
