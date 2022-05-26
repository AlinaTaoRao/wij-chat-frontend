import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState } from "react";
// import usePostFetchUsr from "./my-hooks/usePostFetchUsr";

import "./App.css";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
import HomePage from "./components/home-page/HomePage";
// import { curData } from "./data";
// import { baseUrl } from "./config";

function App() {
  // usr, pwd, jwtToken, collect usr input from sign in or sign up, use in post msg or ch.
  // const [usr, setUsr] = useState("");
  // const [pwd, setPwd] = useState("");
  const [jwtToken, setJwtToken] = useState(null);

  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const initialProfile = {
    username: "",
    email: "",
    id: "",
    token: "",
    createdAt: "",
  };
  const [userProfile, setUserProfile] = useState(initialProfile);

  const [userId, setUserId] = useState(null); // grab cur usr id from sign up or sign in response.
  // const [loginCount, setLoginCount] = useState(0); // change this state while sign in submit, to fire usePostFetchUsr, must have!

  const [error, setError] = useState(null); // try to catch and render error msg to usr ?
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/signIn"
            element={
              <SignIn
                formValues={formValues}
                setFormValues={setFormValues}
                initialValues={initialValues}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
                isSubmit={isSubmit}
                setIsSubmit={setIsSubmit}
                userProfile={userProfile}
                setUserProfile={setUserProfile}
                initialProfile={initialProfile}
                error={error}
                setError={setError}
                userId={userId}
                setUserId={setUserId}
                jwtToken={jwtToken}
                setJwtToken={setJwtToken}

                // handleUsrInput={(e) => {
                //   setUsr(e.target.value);
                // }}
                // handlePwdInput={(e) => setPwd(e.target.value)}
                // handleSignIn={() => setLoginCount((c) => c + 1)}
              />
            }
          />
          <Route
            path="/signUp"
            element={
              <SignUp
                formValues={formValues}
                setFormValues={setFormValues}
                initialValues={initialValues}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
                isSubmit={isSubmit}
                setIsSubmit={setIsSubmit}
                userProfile={userProfile}
                setUserProfile={setUserProfile}
                initialProfile={initialProfile}
                error={error}
                setError={setError}
              />
            }
          />
          <Route
            path="/"
            element={
              <HomePage
                formValues={formValues}
                setFormValues={setFormValues}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
                userProfile={userProfile}
                setUserProfile={setUserProfile}
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
