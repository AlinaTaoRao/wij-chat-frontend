import React from "react";

import "./styles.css";

export default function DirectMessage({
  dMessageData,
  directConversation,
  directMessage,
  setDirectMessage,
  handleDirectMessage,
}) {
  // console.log("dMessageData", dMessageData);
  if (dMessageData)
    return (
      <div
        className={
          directConversation ? "direct-messages active" : "direct-messages"
        }
      >
        {dMessageData.data.map((msg, index) => (
          <div className="direct-message" key={index}>
            <span className="direct-message-sender">
              {msg.attributes.sender}
            </span>
            <span className="direct-message-between">
              {msg.attributes.between}
            </span>
            <span className="direct-message-time">
              {msg.attributes.publishedAt}
            </span>
            <p className="direct-message-body">{msg.attributes.body}</p>
          </div>
        ))}

        <form
          name="direct-msg-form"
          className="direct-msg-form"
          onSubmit={(e) => handleDirectMessage(e)}
        >
          <input
            type="text"
            name="direct-msg-input"
            placeholder="direct message "
            className="direct-msg-input"
            value={directMessage}
            onChange={(e) => setDirectMessage(e.target.value)}
          />
          <input type="submit" value="Send" />
        </form>
      </div>
    );
}
