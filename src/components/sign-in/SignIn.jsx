import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./styles.css";
import { baseUrl } from "../../config";

export default function SignIn({
  formValues,
  setFormValues,
  initialValues,
  formErrors,
  setFormErrors,
  isSubmit,
  setIsSubmit,
  userProfile,
  setUserProfile,
  initialProfile,
  error,
  setError,
}) {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const loginUrl = `${baseUrl}/auth/local`;

  /* handle and store user input */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setError(null); //
  };

  /* validate sign in form */
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    // clear last usr jwt token etc if there is, virtual log out
    setUserProfile(() => initialProfile); // not work?

    try {
      const body = {
        identifier: formValues.username, // username or email
        password: formValues.password,
      };
      const res = await fetch(encodeURI(loginUrl), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      console.log("sign in post usr res:", res);
      if (!res.ok) {
        const js = await res.json();
        console.log("error res js:", js);
        const message = res.statusText
          ? `${res.status}: ${res.statusText}:${js.error.message}\n-> ${loginUrl}`
          : `HTTP error! status: ${res.status}\n-> ${loginUrl}`;
        throw new Error(message);
      }

      const json = await res.json();
      console.log("sign in json:", json);

      setData(json);
      console.log("sign in data:", data); // null?

      setUserProfile({
        username: json.user.username,
        email: json.user.email,
        id: json.user.id,
        token: json.jwt,
        createdAt: json.user.createdAt,
      });

      console.log("sign in userProfile:", userProfile);

      setFormValues(initialValues); // clear input fields
      setLoading(false);
      navigate("/"); // redirect to home;
    } catch (error) {
      setError(() => error);
      setLoading(false);
    }
  };

  return (
    <div className="sign-in">
      <Link to="/">
        <div className="title-container">
          <img
            className="chat-logo"
            src="./assets/chatCoin.png"
            alt="chat logo"
          />
          <h1 className="title-sign wij-chat">Wij Chat</h1>
        </div>
      </Link>
      <form
        name="Form"
        className="sign-in-form"
        // onSubmit={(e) => handleSignIn(e)}   // onSubmit not work, why ?
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="username-input"
          value={formValues.username}
          onChange={handleChange}
          required
        />
        <p className="error">{formErrors.username}</p>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="password-input"
          value={formValues.password}
          onChange={handleChange}
          required
        />
        <p className="error">{formErrors.password}</p>
        <div className="sign-container">
          <input
            type="submit"
            className="sign-in-btn"
            value="Sign in"
            onClick={(e) => handleSignIn(e)} //works, hit enter or click btn
          />
          {error ? (
            <p className="error">{error.message}</p>
          ) : (
            <p className="error"></p>
          )}
          <p className="sign-up-text">
            Don't have a count yet?
            <Link to="/signUp">
              <span className="to-sign-up">Sign up</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
