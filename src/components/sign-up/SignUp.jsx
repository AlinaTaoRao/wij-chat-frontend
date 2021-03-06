import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./styles.css";
import { baseUrl } from "../../config";

export default function SignUp({
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
  const authorizationUrl = `${baseUrl}/auth/local/register`;

  /* handle and store user input */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    setFormErrors(initialValues); // clear validate error if user start input after saw the error message, works
    setError(null); // clear api error if user start input after saw the error message, works
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

  /* register new usr */
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    // clear last usr jwt token if there is, virtual log out?
    // setUserProfile(() => initialProfile);
    try {
      const body = {
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
      };

      const res = await fetch(encodeURI(authorizationUrl), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      console.log("sign up res:", res);

      /* throw an error  */
      if (!res.ok) {
        const js = await res.json();
        console.log("error res js:", js);
        const message = res.statusText
          ? `${res.status}: ${res.statusText}:${js.error.message}\n-> ${authorizationUrl}`
          : `HTTP error! status: ${res.status}\n-> ${authorizationUrl}`;
        throw new Error(message);
      }

      const json = await res.json();
      console.log("sign up json:", json);

      setData(json);
      console.log("sign up data:", data);

      setUserProfile({
        username: json.user.username,
        email: json.user.email,
        id: json.user.id,
        token: json.jwt,
        createdAt: json.user.createdAt,
      });
      console.log("sign up userProfile:", userProfile);

      setLoading(false);
      setFormValues(initialValues); // clear input fields?
      navigate("/"); // redirect to home;
    } catch (error) {
      setError(error); // use setError from App
      setLoading(false);
    }

    return { data, loading };
  };

  return (
    <div className="sign-up">
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
        className="sign-up-form"
        // onSubmit={(e) => handleSignUp(e)} // not work, can't fire handleSignUp, ?!
      >
        <input
          type="text"
          name="username" // name attribute, identify and collect user input, important!
          placeholder="Username"
          className="usr-input"
          value={formValues.username}
          onChange={handleChange}
          required
        />
        <p className="username-error error">{formErrors.username}</p>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="email-input"
          value={formValues.email}
          onChange={handleChange}
          required
        />
        <p className="email-error error">{formErrors.email}</p>
        <input
          type="password"
          name="password"
          placeholder="Password. Must >= 6 character"
          className="pwd-input"
          value={formValues.password}
          onChange={handleChange}
          required
        />
        <p className="password-error error">{formErrors.password}</p>

        <input
          type="submit"
          value="Sign up"
          className="sign-up-btn"
          onClick={(e) => handleSignUp(e)} //
        />
        {error ? (
          <p className="sign-up-error error">{error.message}</p>
        ) : (
          <p className="error"></p>
        )}
      </form>
      <div className="sign-up-container">
        <p>
          Already have a count?
          <Link to="/signIn">
            <span className="to-sign-in">Sign in.</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
