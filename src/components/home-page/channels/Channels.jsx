import "./styles.css";
import useFetch from "../../../my-hook/useFetch";
import { baseUrl } from "../../../config";
import { curData } from "../../../data";
import { jwt } from "../../../config";

import React from "react";
import { useState } from "react";

/* way 2 form section, has refresh issue */
export default function Channels({ handleSwitchCh }) {
  /* get channels data */
  const [channelName, setChannelName] = useState("");
  const [hasNewCh, setHasNewCh]= useState(false);
  // define url, fetch data
  const url = `${baseUrl}/channels`;
  // const { data, error, loading } = useFetch(url);
  const { data, error, loading } = useFetch(url, hasNewCh);
  console.log(data);
  if (loading) return <p> Loading</p>;
  if (error) return <p> Oops, there is something wrong :(</p>;

  /* define handlers */
  const handleNewChannel = (e) => {
    e.preventDefault();
    const title = channelName;
    const initiator = curData.curUser;
    // const curUserId = curData.curUserId;
    async function addChannel(title, initiator) {
      const body = {
        data: {
          users_permissions_users: {
            id: 2,        // if the max user id in strapi < this number, will throw error!
          },
          title: `# ${title}`,
          initiator: initiator,
        },
      };

      const token = jwt;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      console.log("run handleChannel");
      return response.json();
    }
    addChannel(title, initiator);
  };

  return (
    <div className="channel-col">
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
        <form className="channel-form" onSubmit={(e) => {
          handleNewChannel(e);
          setHasNewCh(!hasNewCh);
        }}>
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
