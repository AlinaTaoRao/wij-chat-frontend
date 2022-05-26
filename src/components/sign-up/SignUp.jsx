import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./styles.css";
import { baseUrl } from "../../config";

/* try 2: use handler, post usr works */
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

      /* throw an error way 2, best way */
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
      setFormValues(initialValues); // clear input fields
      navigate("/"); // redirect to home;
    } catch (error) {
      setError(error);
      setLoading(false);
    }

    return { data, loading }; // way 2, use setError from App
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
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   handleUsrSignUp();
        // }}
        // onSubmit={handleUsrSignUp} // not work, can't fire handleUsrSignUp, ?!
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="usr-input"
          value={formValues.username}
          onChange={handleChange}
          required
        />
        <p className="error">{formErrors.username}</p>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="email-input"
          value={formValues.email}
          onChange={handleChange}
          required
        />
        <p className="error">{formErrors.email}</p>
        <input
          type="password"
          name="password"
          placeholder="Password. Must >= 6 character"
          className="pwd-input"
          value={formValues.password}
          onChange={handleChange}
          required
        />
        <p className="error">{formErrors.password}</p>

        <input
          type="submit"
          value="Sign up"
          className="sign-up-btn"
          onClick={(e) => handleSignUp(e)} //
        />
        {error ? (
          <p className="error">{error.message}</p>
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
