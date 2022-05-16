import React from "react";
import { useState, useEffect } from "react";

import "./styles.css";
import useFetch from "../../../my-hook/useFetch";
import useValueRef from "../../../my-hook/useValueRef";
import usePostFetch from "../../../my-hook/usePostFetch";
import { baseUrl } from "../../../config";
import { curData } from "../../../data";
import { jwt } from "../../../config";

/* way 3: useEffect */
export default function Messages({ username }) {
  const [newMsg, setNewMsg] = useState("");
  const [msgLength, setMsgLength] = useState(0); // define msgLength state to fire useFetch when new msg is send.
  console.log("msgLength in Messages:", msgLength);
  const [hasNewMsg, setHasNewMsg] = useState(false);

  /* customize usePostFetch to handle new message*/
  const msgUrl = `${baseUrl}/messages`;
  const { postData, postError, postLoading } = usePostFetch(
    msgUrl,
    newMsg,
    hasNewMsg
  );
  console.log(" post Messages:", postData);

  /* define current channel url, global var curData.curCH value from Homepage*/
  const url = curData.curCh
    ? `${baseUrl}/channels/${curData.curCh}?populate=messages`
    : `${baseUrl}/channels/1?populate=messages`;
  const { data, error, loading } = useFetch(url, msgLength);
  console.log("Messages in cur ch:", data);
  if (loading) return <p> Loading</p>;
  if (error) return <p> Oops, there is something wrong :(, {error.message}</p>;

  return data.data.attributes.messages.data.length !== 0 ? (
    <div className="messages-col">
      <div className="post-info-container">
        {postError && (
          <div className="post-error">
            <p className="post-error-general error">
              Oops, there is something wrong :(
            </p>
            <p className="post-error-status error">{error.status}</p>
            <p className="post-error-msg error">{error.message}</p>
          </div>
        )}
      </div>

      <div className="messages">
        {data.data.attributes.messages.data.map((msg, index) => (
          <div key={index} className="message">
            <span className="sender">{msg.attributes.sender}</span>
            <span className="time">{msg.attributes.publishedAt}</span>
            <span className="ch-title">{data.data.attributes.title}</span>
            <p className="single-msg" data-msg-id={msg.id}>
              {msg.attributes.body}
            </p>
          </div>
        ))}
      </div>

      <form
        className="create-message"
        onSubmit={(e) => {
          e.preventDefault();
          setHasNewMsg(!hasNewMsg);
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
  ) : (
    <div className="messages-col">
      <div className="messages">{`"${data.data.attributes.title}" don't have any message yet.`}</div>
      <form
        className="create-message"
        onSubmit={(e) => {
          e.preventDefault();
          setHasNewMsg(!hasNewMsg);
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

/* way 2-try 2:  not work*/
// export default function Messages({ username }) {
//   const [newMsg, setNewMsg] = useState("");
//   const [msgLength, setMsgLength] = useState(0); // define msgLength state to fire useFetch when new msg is send.
//   console.log("msgLength in Messages:", msgLength);
//   const latestLength = useValueRef(msgLength);

//   useEffect(() => {
//     latestLength.current = msgLength; // update
//   })

//   // useEffect(() => {
//   //   setMsgLength(l => l+1);
//   // },[newMsg])

//   /* define current channel url, global var curData.curCH value from Homepage*/
//   const url = curData.curCh
//     ? `${baseUrl}/channels/${curData.curCh}?populate=messages`
//     : `${baseUrl}/channels/2?populate=messages`;
//   const { data, error, loading } = useFetch(url, msgLength);
//   console.log("Messages in cur ch:", data);
//   if (loading) return <p> Loading</p>;
//   if (error) return <p> Oops, there is something wrong :(, {error.message}</p>;

//   /* post new msg & update msgLength state to fire useFetch() */
//   const handleNewMsg = (e) => {
//     e.preventDefault();
//     setMsgLength(l => l+1);

//     const sender = curData.curUser;
//     console.log("sender=", sender);
//     const chId = curData.curCh;
//     // const userId = 2;     // # todo, dynamically get user id.

//     const msgUrl = `${baseUrl}/messages`;
//     async function addMsg(sender, chId, userId) {
//       const body = {
//         data: {
//           // users_permissions_users: {
//           //   id: userId,
//           // },
//           sender: sender,
//           body: newMsg,
//           channel: {
//             id: chId,
//           },
//         },
//       };

//       const token = jwt;
//       const response = await fetch(msgUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(body),
//       });
//       console.log("run handleNewMsg");
//       return response.json();
//     }

//     // addMsg(sender, chId, userId);
//     addMsg(sender, chId);
//   };

//   return data.data.attributes.messages.data.length !== 0 ? (
//     <div className="messages-col">
//       <div className="messages">
//         {data.data.attributes.messages.data.map((msg, index) => (
//           <div key={index} className="message">
//             <span className="sender">{msg.attributes.sender}</span>
//             <span className="time">{msg.attributes.publishedAt}</span>
//             <span className="ch-title">{data.data.attributes.title}</span>
//             <p className="single-msg" data-msg-id={msg.id}>
//               {msg.attributes.body}
//             </p>
//           </div>
//         ))}
//       </div>

//       <div className="create-message">
//         <input
//           type="text"
//           className="input-message"
//           placeholder="New message"
//           value={newMsg}
//           onChange={(e) => setNewMsg(e.target.value)}
//           required
//         />
//         <button
//           className="send-msg"
//           id="send-msg"
//           onClick={(e) => handleNewMsg(e)}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   ) : (
//     <div className="messages-col">
//       <div className="messages">{`"${data.data.attributes.title}" don't have any message yet.`}</div>
//       <div className="create-message">
//         <input
//           type="text"
//           className="input-message"
//           value={newMsg}
//           onChange={(e) => setNewMsg(e.target.value)}
//           placeholder="New message"
//           required
//         />
//         <button
//           className="send-msg"
//           id="send-msg"
//           onClick={(e) => handleNewMsg(e)}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

/* way 2: get and render messages in a channel, works*/
// export default function Messages({ username }) {
//   const [newMsg, setNewMsg] = useState("");
//   const [msgLength, setMsgLength] = useState(0); // define msgLength state to fire useFetch when new msg is send.
//   console.log("msgLength in Messages:", msgLength);

//   // const [hasNewMsg, setHasNewMsg]= useState(false); //not work
//   // console.log("hasNewMsg origin:", hasNewMsg);

//   /* define current channel url, global var curData.curCH value from Homepage*/
//   const url = curData.curCh
//     ? `${baseUrl}/channels/${curData.curCh}?populate=messages`
//     : `${baseUrl}/channels/2?populate=messages`;
//   const { data, error, loading } = useFetch(url, msgLength);
//   console.log("Messages in cur ch:", data);
//   /* for empty channel, this console will throw error */
//   // if (data !== null) {
//   //   console.log(
//   //     "break data[]:",
//   //     data.data.attributes.messages.data[0].attributes.body
//   //   );
//   // }
//   if (loading) return <p> Loading</p>;
//   if (error) return <p> Oops, there is something wrong :(, {error.message}</p>;

//   /* post new msg & update msgLength state to fire useFetch() */
//   const handleNewMsg = (e) => {
//     e.preventDefault();
//     setMsgLength(len => (len + 1));  // not work;
//     console.log("msgLength in handleNewMsg: ", msgLength);

//     // setHasNewMsg(!hasNewMsg);      //not work
//     // console.log("hasNewMsg update:", hasNewMsg);

//     const sender = curData.curUser;
//     console.log("sender=", sender);
//     const chId = curData.curCh;
//     // const userId = 2;     // # todo, dynamically get user id.

//     const msgUrl = `${baseUrl}/messages`;
//     async function addMsg(sender, chId, userId) {
//       const body = {
//         data: {
//           // users_permissions_users: {
//           //   id: userId,
//           // },
//           sender: sender,
//           body: newMsg,
//           channel: {
//             id: chId,
//           },
//         },
//       };

//       const token = jwt;
//       const response = await fetch(msgUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(body),
//       });
//       console.log("run handleNewMsg");
//       return response.json();
//     }

//     // addMsg(sender, chId, userId);
//     addMsg(sender, chId);
//   };

//   return data.data.attributes.messages.data.length !== 0 ? (
//     <div className="messages-col">
//       <div className="messages">
//         {data.data.attributes.messages.data.map((msg, index) => (
//           <div key={index} className="message">
//             <span className="sender">{msg.attributes.sender}</span>
//             <span className="time">{msg.attributes.publishedAt}</span>
//             <p className="single-msg" data-msg-id={msg.id}>
//               {msg.attributes.body}
//             </p>
//           </div>
//         ))}
//       </div>

//       <div className="create-message">
//         <input
//           type="text"
//           className="input-message"
//           placeholder="New message"
//           value={newMsg}
//           onChange={(e) => setNewMsg(e.target.value)}
//           required
//         />
//         <button
//           className="send-msg"
//           id="send-msg"
//           onClick={(e) => handleNewMsg(e)}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   ) : (
//     <div className="messages-col">
//       <div className="messages">this channel don't have any message yet.</div>
//       <div className="create-message">
//         <input
//           type="text"
//           className="input-message"
//           value={newMsg}
//           onChange={(e) => setNewMsg(e.target.value)}
//           placeholder="New message"
//           required
//         />
//         <button
//           className="send-msg"
//           id="send-msg"
//           onClick={(e) => handleNewMsg(e)}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

/* way 1: get and render all messages, works*/
// export default function Messages() {
//   const { data, error, loading } = useFetch(`${baseUrl}/messages`);
//   console.log(" All Messages:", data);

//   if (loading) return <p> Loading</p>;
//   if (error) return <p> Oops, there is something wrong :(</p>;

//   return (
//     <div className="messages-col">
//       <div className="messages">
//         {data.data.map((message, index) => (
//           <div key={index} className="message">
//             <p className="sender">{message.attributes.sender}</p>
//             <p className="single-msg" data-msg-id={message.id}>
//               {message.attributes.body}
//             </p>
//           </div>
//         ))}
//       </div>
//       <div className="create-message">
//         <input
//           type="text"
//           className="input-message"
//           placeholder="New message"
//           required
//         />
//         <button className="send-msg" id="send-msg">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }
