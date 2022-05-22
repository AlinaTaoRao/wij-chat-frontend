import "./styles.css";
import useFetch from "../../../my-hooks/useFetch";
import { baseUrl } from "../../../config";
// import { curData } from "../../../data";

import React, { useState } from "react"; // for way 1

/* way 1: highlight current user ternary, {usr}?, works, best way! */
export default function People({
  usr,
  curChOwner,
  error,
  setError,
  postMsg,
  setPostMsg,
  postCh,
  setPostCh,
}) {
  const peopleUrl = `${baseUrl}/users`;
  const { data, loading } = useFetch(peopleUrl, usr, postCh, postMsg, setError); // if there is a sign up, usr state change, then fire  useFetch()
  // console.log("USERS:", data);
  if (loading) return <p> Loading...</p>;

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
