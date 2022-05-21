import React from "react";
import { useState } from "react";

import "./styles.css";
import useFetch from "../../../my-hooks/useFetch";
import usePostFetchMsg from "../../../my-hooks/usePostFetchMsg";
import useDelFetchMsg from "../../../my-hooks/useDelFetchMsg";
import { baseUrl } from "../../../config";
// import { curData } from "../../../data";

/*  separate cur usr msg and other msg */
export default function Messages({
  usr,
  curCh,
  url,
  jwtToken,
  userId,
  error,
  setError,
  postMsg,
  setPostMsg,
  postCh,
  setPostCh,
}) {
  const [newMsg, setNewMsg] = useState("");
  const [msgLength, setMsgLength] = useState(0); // to fire usePostFetchMsg.
  const [msgIdToDel, setMsgIdToDel] = useState(null); // to fire delete msg

  /* customize usePostFetchMsg to handle new message*/
  const msgUrl = `${baseUrl}/messages`;

  const postMsgArgumentList = [
    usr,
    curCh,
    msgUrl,
    newMsg,
    setNewMsg,
    msgLength,
    setPostMsg,
    jwtToken,
    userId,
    setError,
  ];
  const { postData, postLoading } = usePostFetchMsg(...postMsgArgumentList);
  // console.log(" post Messages:", postData);

  const { delData, delLoading } = useDelFetchMsg(
    msgIdToDel,
    setPostMsg,
    jwtToken,
    setError
  );

  const { data, loading } = useFetch(url, usr, postCh, postMsg, setError); // postMsg control fetch order, works
  // console.log("Messages in cur ch is :", data);

  const isLoading = postLoading || loading || delLoading;

  if (isLoading)
    return (
      <div className="messages-col">
        <p className="loading"> Loading...</p>
      </div>
    ); // useful, can prevent reading data before loading end.

  // if (error) {
  //   return (
  //     <div className="messages-col">
  //       <p> Oops, there is something wrong :( </p>
  //       <div className="msg-error error">
  //        {error.message}
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="messages-col">
      <div className="messages">
        {data.data.attributes.messages.data.map((msg, index) =>
          msg.attributes.sender === usr ? (
            <div key={index} className="message cur-usr-msg">
              <span className="sender">{msg.attributes.sender}</span>
              <span className="time">{msg.attributes.time}</span>
              <span className="ch-title">{data.data.attributes.title}</span>
              <p className={`single-msg msg-${msg.id}`} data-msg-id={msg.id}>
                {msg.attributes.body}
              </p>
              <button
                className="msg-trash-bin"
                onClick={(e) => {
                  // get previous siblings, works
                  const prevSibling = e.target.previousElementSibling;
                  // console.log("prevSibling msg is", prevSibling);

                  // data-* attributes get msg id, works
                  const theMsgId = prevSibling.dataset.msgId;
                  setMsgIdToDel(() => theMsgId);
                  // console.log("msgIdToDel is", msgIdToDel);
                }}
              >
                Delete
              </button>
            </div>
          ) : (
            <div key={index} className="message">
              <span className="sender">{msg.attributes.sender}</span>
              <span className="time">{msg.attributes.time}</span>
              <span className="ch-title">{data.data.attributes.title}</span>
              <p className="single-msg" data-msg-id={msg.id}>
                {msg.attributes.body}
              </p>
            </div>
          )
        )}
      </div>

      <form
        className="create-message"
        onSubmit={(e) => {
          e.preventDefault();
          setMsgLength((l) => l + 1); // works, to fire usePostFetchMsg
        }}
      >
        <input
          type="text"
          className="input-message"
          placeholder="New message"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          required
        />
        <input type="submit" value="Send" className="send-msg" />
      </form>
    </div>
  );
}
