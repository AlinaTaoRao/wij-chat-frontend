import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState } from "react";

import "./App.css";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
import HomePage from "./components/home-page/HomePage";

function App() {

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
