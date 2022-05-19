import "./styles.css";
import useFetch from "../../../my-hooks/useFetch";
import { baseUrl } from "../../../config";
// import { curData } from "../../../data";

import React, { useState } from "react"; // for way 1

/* way 1: highlight current user ternary, {usr}?, works, best way! */
export default function People({ usr }) {
  const peopleUrl = `${baseUrl}/users`;
  const { data, error, loading } = useFetch(peopleUrl, usr); // if there is a sign up, usr state change, then fire  useFetch()
  // console.log("USERS:", data);
  if (loading) return <p> Loading</p>;
  if (error)
    return (
      <div className="error-container">
        <p className="error-general error">
          {" "}
          Oops, there is something wrong :(
        </p>
        <p className="error-status error">{error.status}</p>
        <p className="error-msg error">{error.message}</p>
      </div>
    );

  return (
    <div className="people">
      {data.map((user, index) => (
        <div key={index} className="user">
          {usr && usr === user.username ? (
            <p
              className="single-user cur-usr"
              id={user.id}
              data-usr={user.username}
            >
              {user.username}
            </p>
          ) : (
            <p className="single-user" id={user.id} data-usr={user.username}>
              {user.username}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
