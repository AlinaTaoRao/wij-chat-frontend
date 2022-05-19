import React from "react";
import { useState, useRef } from "react";

import "./styles.css";
import useFetch from "../../../my-hooks/useFetch";
import usePostFetchCh from "../../../my-hooks/usePostFetchCh";
import { baseUrl } from "../../../config";
// import { curData } from "../../../data";

/* way 3 usePostFetchCh to post new ch, works with refresh issue */
// curCh, id of cur ch, try to toggle rerender.
export default function Channels({ usr, curCh, jwtToken, handleSwitchCh }) {
  /* get channels data */
  // define url
  const chUrl = `${baseUrl}/channels`;
  const [channelName, setChannelName] = useState("");
  const [chLength, setChLength] = useState(0); // not work

  /* try to fire use* in order */
  // const [postMsg, setPostMsg]= useState(null);
  const [postCh, setPostCh] = useState(null);

  /* try to update new ch?, not work */
  // const latestChLength = useRef(null);
  // latestChLength.current = () => {
  //   setChLength((l) => l + 1);
  // };

  /* usePostFetchCh to post new ch */
  const postChArgumentList = [
    usr,
    channelName,
    setChannelName,
    chUrl,
    curCh,
    chLength,
    postCh,
    setPostCh,
    jwtToken,
  ];
  const { PData, PError, pLoading } = usePostFetchCh(...postChArgumentList);

  // fetch chs data
  // const { data, error, loading } = useFetch(chUrl, curCh, chLength); // refresh too often issue
  const { data, error, loading } = useFetch(chUrl, postCh); // order control
  // const { data, error, loading } = useFetch(chUrl); // # todo, fix this can't update new ch issue?
  console.log(data);

  const isLoading = pLoading || loading;
  const hasError = PError || error;
  if (isLoading)
    return (
      <div className="channel-col">
        <p className="loading"> Loading...</p>
      </div>
    ); // useful, can prevent reading data before loading end.
  if (hasError)
    return (
      <div className="channel-col">
        <p> Oops, there is something wrong :( </p>
        {PError ? (
          <p className="use-post-ch-error"> PError.message </p>
        ) : (
          <p className="use-fetch-error"> error.message </p>
        )}
      </div>
    );

  return (
    <div className="channel-col">
      <div className="post-info-container">
        {PError && (
          <div className="post-error">
            <p className="post-error-general error">
              Oops, there is something wrong :(
            </p>
            <p className="post-error-status error">{PError.status}</p>
            <p className="post-error-msg error">{PError.message}</p>
          </div>
        )}
      </div>

      <div className="channels">
        {data.data.map((channel, index) => (
          <div key={index} className="channel">
            <input type="checkbox" className="check-ch" />
            {channel.id === 1 ? (
              <p
                className="single-channel default-ch"
                id={channel.id}
                onClick={handleSwitchCh}
              >
                {channel.attributes.title}
              </p>
            ) : (
              <p
                className="single-channel"
                id={channel.id}
                onClick={handleSwitchCh}
              >
                {channel.attributes.title}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="create-new-channel">
        <form
          className="channel-form"
          onSubmit={(e) => {
            e.preventDefault();
            setChLength((l) => l + 1); // form onSubmit works. new ch created, but not render in ch list?!
            // latestChLength.current(); // try to update new ch?, not work
          }}
        >
          <input
            type="text"
            className="channel-input"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="New Channel Name"
            required
          />
          <input type="submit" value="+" className="add-channel" />
        </form>
      </div>
    </div>
  );
}

/* way 2 form section, has refresh issue */
// export default function Channels({ usr, handleSwitchCh}) {
//   /* get channels data */
//   const [channelName, setChannelName] = useState("");
//   const [chLength, setChLength] = useState(0); // not work

//   // define url, fetch data
//   const url = `${baseUrl}/channels`;
//   // const { data, error, loading } = useFetch(url);
//   const { data, error, loading } = useFetch(url, chLength);
//   console.log(data);
//   if (loading) return <p> Loading</p>;
//   if (error) return <p> Oops, there is something wrong :(</p>;

//   /* define handlers */
//   const handleNewChannel = (e) => {
//     e.preventDefault();
//     setChLength((l) => l + 1);
//     const title = channelName;
//     // const initiator = curData.curUser;
//     const initiator = usr;
//     // const curUserId = curData.curUserId;
//     async function addChannel(title, initiator) {
//       const body = {
//         data: {
//           users_permissions_users: {
//             id: 2, // if the max user id in strapi < this number, will throw error!
//           },
//           title: `# ${title}`,
//           initiator: initiator,
//         },
//       };

//       const token = jwt;
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(body),
//       });
//       console.log("run handleChannel");
//       return response.json();
//     }
//     addChannel(title, initiator);
//   };

//   return (
//     <div className="channel-col">
//       <div className="channels">
//         {data.data.map((channel, index) => (
//           <div key={index} className="channel">
//             <input type="checkbox" className="check-ch" />
//             {channel.id === 1 ? (
//               <p
//                 className="single-channel default-ch"
//                 id={channel.id}
//                 onClick={handleSwitchCh}
//               >
//                 {channel.attributes.title}
//               </p>
//             ) : (
//               <p
//                 className="single-channel"
//                 id={channel.id}
//                 onClick={handleSwitchCh}
//               >
//                 {channel.attributes.title}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//       <div className="create-new-channel">
//         <form
//           className="channel-form"
//           onSubmit={(e) => {
//             handleNewChannel(e);
//           }}
//         >
//           <input
//             type="text"
//             className="channel-input"
//             value={channelName}
//             onChange={(e) => setChannelName(e.target.value)}
//             placeholder="New Channel Name"
//             required
//           />
//           <input type="submit" value="+" className="add-channel" />
//         </form>
//       </div>
//     </div>
//   );
// }

/* way 1: highlight current channel by checkbox; highlight default ch, works */
// export default function Channels({ handleSwitchCh }) {
//   /* get channels data */
//   const [channelName, setChannelName] = useState("");
//   // define url, fetch data
//   const url = `${baseUrl}/channels`;
//   const { data, error, loading } = useFetch(url);
//   console.log(data);
//   if (loading) return <p> Loading</p>;
//   if (error) return <p> Oops, there is something wrong :(</p>;

//   /* define handlers */
//   const handleNewChannel = (e) => {
//     // e.preventDefault();   // has this line will reload page, then lost cur user.
//     const title = channelName;
//     const initiator = curData.curUser;
//     // const curUserId = curData.curUserId;
//     async function addChannel(title, initiator) {
//       const body = {
//         data: {
//           users_permissions_users: {
//             id: 2,        // if the max user id in strapi < this number, will throw error!
//           },
//           title: `# ${title}`,
//           initiator: initiator,
//         },
//       };

//       const token = jwt;
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(body),
//       });
//       console.log("run handleChannel");
//       return response.json();
//     }
//     addChannel(title, initiator);
//   };

//   return (
//     <div className="channel-col">
//       <div className="channels">
//         {data.data.map((channel, index) => (
//           <div key={index} className="channel">
//             <input type="checkbox" className="check-ch" />
//             {channel.id === 1 ? (
//               <p
//                 className="single-channel default-ch"
//                 id={channel.id}
//                 onClick={handleSwitchCh}
//               >
//                 {channel.attributes.title}
//               </p>
//             ) : (
//               <p
//                 className="single-channel"
//                 id={channel.id}
//                 onClick={handleSwitchCh}
//               >
//                 {channel.attributes.title}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//       <div className="create-new-channel">
//         <form className="channel-form">
//           <input
//             type="text"
//             className="channel-input"
//             value={channelName}
//             onChange={(e) => setChannelName(e.target.value)}
//             placeholder="New Channel Name"
//             required
//           />
//           <button
//             className="add-channel"
//             id="add-channel"
//             onClick={e => handleNewChannel(e)}
//           >
//             +
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
