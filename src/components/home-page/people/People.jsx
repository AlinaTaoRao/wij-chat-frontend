import React, { useState } from "react";

import "./styles.css";
import useFetch from "../../../my-hooks/useFetch"; // fetch users list
import useFetchDirectMsg from "../../../my-hooks/useFetchDirectMsg"; // fetch direct messages list 
import DirectMessage from "./direct-messages/DirectMessage"; // direct messages list and form to send direct message
import { baseUrl } from "../../../config";

export default function People({ curChOwner, error, setError, userProfile }) {
  const [dMessage, setDMessage] = useState(null); // for fire fetch direct msg  after post one, works
  const [dMessageData, setDMessageData] = useState(null); // try render d messages list, works

  /* fetch users list */
  const peopleUrl = `${baseUrl}/users`;
  const { data, loading } = useFetch(peopleUrl, userProfile.username, setError); // if there is a sign up, usr state change, then fire  useFetch() // fetch users list

  /* fetch direct messages list */
  const [fetchDirectMessageUrl, setFetchDirectMessageUrl] = useState(null);
  const { dMessageLoading } = useFetchDirectMsg(
    fetchDirectMessageUrl,
    dMessage,
    setError,
    setDMessageData
  );

  /* toggle direct conversation window, set fetch message url and message to whom */
  const [toWhom, setToWhom] = useState(null);
  const [directConversation, setDirectConversation] = useState(false); // toggle direct message window.
  const showDirectConversation = (e) => {
    setDirectConversation(!directConversation);
    setFetchDirectMessageUrl(
      `${baseUrl}/messages?filters[$or][0][between][$eq]=${userProfile.username}-${e.target.dataset.usr}&filters[$or][1][between][$eq]=${e.target.dataset.usr}-${userProfile.username}&sort[1]=publishedAt:asc`
    );
    setToWhom(e.target.dataset.usr);
  };

  /* post direct message */
  const directMessageUrl = `${baseUrl}/messages`;
  const [directMessage, setDirectMessage] = useState(""); // store user input
  const [directMsgData, setDirectMsgData] = useState(null);
  const [directMsgLoading, setDirectMsgLoading] = useState(true);
  const handleDirectMessage = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      /* same as new Date().toLocaleTimeString() */
      // const today = new Date();
      // const realTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      
      const body = {
        data: {
          users_permissions_users: {
            id: userProfile.id,
          },
          sender: userProfile.username,
          body: directMessage,
          time: `${new Date().toLocaleTimeString()}`, // works
          to: toWhom,
          between: `${userProfile.username}-${toWhom}`,
        },
      };
      const token = userProfile.token;
      if (!directMessage) return; // prevent send empty msg.
      const res = await fetch(encodeURI(directMessageUrl), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      // console.log("res:", res);

      /* throw an error  */
      if (!res.ok) {
        const js = await res.json();
        // console.log("error res js:", js);
        const message = res.statusText
          ? `${res.status}: ${res.statusText}:${js.error.message}\n-> ${directMessageUrl}`
          : `HTTP error! status: ${res.status}\n-> ${directMessageUrl}`;
        throw new Error(message);
      }

      const json = await res.json();
      console.log("post direct msg json:", json);

      setDirectMsgData(json);

      setDMessage(json); // to control multiple api fetch order. post msg first, when it finish, fire useFetchDirectMsg()

      setDirectMessage(""); // clear input field

      setDirectMsgLoading(false);
    } catch (error) {
      setError(error); // use setError from App
      setDirectMsgLoading(false);
    }
  };

  if (loading || dMessageLoading) return <p> Loading...</p>;

  return (
    <div className="people">
      {data.map((user, index) => (
        <div key={index} className="user">
          {userProfile.username && userProfile.username === user.username ? (
            <p
              className="single-user cur-usr"
              id={user.id}
              data-usr={user.username}
              onClick={(e) => showDirectConversation(e)}
            >
              {user.username}
            </p>
          ) : (
            <p
              className="single-user"
              id={user.id}
              data-usr={user.username}
              onClick={(e) => showDirectConversation(e)}
            >
              {user.username}
            </p>
          )}
        </div>
      ))}
      <DirectMessage
        dMessageData={dMessageData}
        directConversation={directConversation}
        directMessage={directMessage}
        setDirectMessage={setDirectMessage}
        userProfile={userProfile}
        toWhom={toWhom}
        handleDirectMessage={handleDirectMessage}
      />
    </div>
  );
}
