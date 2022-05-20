import React from "react";
import { useState } from "react";

import "./styles.css";
import useFetch from "../../../my-hooks/useFetch";
import usePostFetchMsg from "../../../my-hooks/usePostFetchMsg";
import useDelFetchMsg from "../../../my-hooks/useDelFetchMsg";
import { baseUrl } from "../../../config";
// import { curData } from "../../../data";

/* way 3, separate cur usr msg and other msg */
export default function Messages({ usr, curCh, url, jwtToken, userId }) {
  const [newMsg, setNewMsg] = useState("");
  const [msgLength, setMsgLength] = useState(0); // to fire usePostFetchMsg.
  const [msgIdToDel, setMsgIdToDel] = useState(null); // to fire delete msg

  /* try to fire multiple fetch in order, use state var postMsg as dependency in useFetch(), works*/
  const [postMsg, setPostMsg] = useState(null);
  /* customize usePostFetchMsg to handle new message*/
  const msgUrl = `${baseUrl}/messages`;

  const postMsgArgumentList = [
    usr,
    curCh,
    msgUrl,
    newMsg,
    setNewMsg,
    msgLength,
    postMsg,
    setPostMsg,
    jwtToken,
    userId,
  ];
  const { postData, postError, postLoading } = usePostFetchMsg(
    ...postMsgArgumentList
  );
  // console.log(" post Messages:", postData);

  const { delData, delError, delLoading } = useDelFetchMsg(
    msgIdToDel,
    setPostMsg,
    jwtToken
  );

  const { data, error, loading } = useFetch(url, postMsg); // postMsg control fetch order, works
  // console.log("Messages in cur ch is :", data);

  const isLoading = postLoading || loading || delLoading;
  const hasError = postError || error || delError;
  if (isLoading)
    return (
      <div className="messages-col">
        <p className="loading"> Loading...</p>
      </div>
    ); // useful, can prevent reading data before loading end.
  if (hasError)
    return (
      <div className="messages-col">
        <p> Oops, there is something wrong :( </p>
        {postError ? (
          <p className="use-post-msg-error"> {postError.message} </p>
        ) : (
          <p className="use-fetch-error"> {error.message} </p>
        )}
      </div>
    );

  return data.data.attributes.messages.data.length !== 0 ? (
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
                  // get previous siblings
                  const prevSibling = e.target.previousElementSibling;
                  console.log("prevSibling msg is", prevSibling);

                  // data-* attributes get msg id
                  const theMsgId = prevSibling.dataset.msgId;
                  setMsgIdToDel(() => theMsgId);
                  console.log("msgIdToDel is", msgIdToDel);
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
  ) : (
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

      <div className="messages"></div>
      <form
        className="create-message"
        onSubmit={(e) => {
          e.preventDefault();
          setMsgLength((l) => l + 1); // form onSubmit works.
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

/* way 2: usePostFetchMsg & { usr, curCh}, use form section instead of div section, works witch refresh issue */
// export default function Messages({ usr, curCh, url, jwtToken, userId }) {
//   const [newMsg, setNewMsg] = useState("");
//   const [msgLength, setMsgLength] = useState(0); // to fire usePostFetchMsg.
//   // console.log("msgLength in Messages:", msgLength);

//  /* try to fire multiple fetch in order, use state var postMsg as dependency in useFetch(), works*/
//   const [postMsg, setPostMsg] = useState(null);

//   /* customize usePostFetchMsg to handle new message*/
//   const msgUrl = `${baseUrl}/messages`;
//   const postMsgArgumentList = [
//     usr,
//     curCh,
//     msgUrl,
//     newMsg,
//     setNewMsg,
//     msgLength,
//     postMsg,
//     setPostMsg,
//     jwtToken,
//     userId
//   ];
//   const { postData, postError, postLoading } = usePostFetchMsg(
//     ...postMsgArgumentList
//   );
//   // console.log(" post Messages:", postData);

//   const { data, error, loading } = useFetch(url, postMsg); // postMsg control fetch order, works
//   // console.log("Messages in cur ch is :", data);

//   const isLoading = postLoading || loading;
//   const hasError = postError || error;
//   if (isLoading)
//     return (
//       <div className="messages-col">
//         <p className="loading"> Loading...</p>
//       </div>
//     ); // useful, can prevent reading data before loading end.
//   if (hasError)
//     return (
//       <div className="messages-col">
//         <p> Oops, there is something wrong :( </p>
//         {postError ? (
//           <p className="use-post-msg-error"> {postError.message} </p>
//         ) : (
//           <p className="use-fetch-error"> {error.message} </p>
//         )}
//       </div>
//     );

//     /* separate cur usr msg and other msg */
//     const lastUsr=document.getElementsByClassName("cur-usr-msg");
//     // if(lastUsr) lastUsr.classList.remove("my-class"); //can't read remove
//     lastUsr.className -= " cur-usr-msg";

//     const curUsrMsg = document.getElementsByClassName(`.${usr}`);
//   //  curUsrMsg.classList.add("cur-usr-msg") //can't read add
//   curUsrMsg.className += " cur-usr-msg";

//   return data.data.attributes.messages.data.length !== 0 ? (
//     <div className="messages-col">
//       <div className="messages">
//         {data.data.attributes.messages.data.map((msg, index) => (
//           <div key={index} className={`message ${msg.attributes.sender}`}>
//             <span className="sender" >{msg.attributes.sender}</span>
//             {/* <span className="time">{msg.attributes.publishedAt}</span> */}
//             <span className="time">{msg.attributes.time}</span>
//             <span className="ch-title">{data.data.attributes.title}</span>
//             <p className="single-msg" data-msg-id={msg.id}>
//               {msg.attributes.body}
//             </p>
//           </div>
//         ))}
//       </div>

//       <form
//         className="create-message"
//         onSubmit={(e) => {
//           e.preventDefault();
//           setMsgLength((l) => l + 1); // works, to fire usePostFetchMsg
//         }}
//       >
//         <input
//           type="text"
//           className="input-message"
//           placeholder="New message"
//           value={newMsg}
//           onChange={(e) => setNewMsg(e.target.value)}
//           required
//         />
//         <input type="submit" value="Send" className="send-msg" />
//       </form>
//     </div>
//   ) : (
//     <div className="messages-col">
//       <div className="post-info-container">
//         {postError && (
//           <div className="post-error">
//             <p className="post-error-general error">
//               Oops, there is something wrong :(
//             </p>
//             <p className="post-error-status error">{error.status}</p>
//             <p className="post-error-msg error">{error.message}</p>
//           </div>
//         )}
//       </div>

//       <div className="messages">
//       </div>
//       <form
//         className="create-message"
//         onSubmit={(e) => {
//           e.preventDefault();
//           setMsgLength((l) => l + 1); // form onSubmit works.
//         }}
//       >
//         <input
//           type="text"
//           className="input-message"
//           placeholder="New message"
//           value={newMsg}
//           onChange={(e) => setNewMsg(e.target.value)}
//           required
//         />
//         <input type="submit" value="Send" className="send-msg" />
//       </form>
//     </div>
//   );
// }

/* way 1: get and render messages in a channel, use div section works*/
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
