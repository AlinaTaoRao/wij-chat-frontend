import React from "react";
import { useState, useEffect } from "react";

import "./styles.css";
import Header from "./header/Header";
import Channels from "./channels/Channels";
import Messages from "./messages/Messages";
import People from "./people/People";
// import { curData } from "../../data";
import { baseUrl } from "../../config";

/* way 2: switchCh way, use url and curCh state, works*/
export default function HomePage({
  usr,
  jwtToken,
}) {
  // set channel url state, default ch id=1;
  const [url, setUrl] = useState(`${baseUrl}/channels/1?populate=messages`);
  const [curCh, setCurCh] = useState(1); // default ch id=1;

  /* try to fire use* in order */
  const [postMsg, setPostMsg]= useState(null);
  const [postCh, setPostCh]= useState(null);

  /* switchCh, grab cur ch id from click event, and reset url for render this ch msg. */
  const switchCh = (e) => {
    e.preventDefault();
    setCurCh(e.target.id);
    console.log("e.target.id:", e.target.id);
    setUrl(`${baseUrl}/channels/${e.target.id}?populate=messages`);

    /* remove default ch class */
    const defaultCh = document.querySelector(".default-ch");
    if (defaultCh) defaultCh.classList.remove("default-ch");

    /* uncheck all .check-ch and check the current one */
    document.querySelectorAll(".check-ch").forEach((e) => (e.checked = false));
    e.target.parentElement.children[0].checked = true;
  };
  return (
    <div className="home">
      <Header />
      <Channels
        usr={usr}
        curCh={curCh} // to toggle rerender channel?
        jwtToken={jwtToken}
        handleSwitchCh={(e) => switchCh(e)}
      />
      <Messages usr={usr} curCh={curCh} url={url} jwtToken={jwtToken}/>
      <People usr={usr} />
    </div>
  );
}

/* way 1: use global var curData.curCh, works */
// export default function HomePage() {
//   /* can't comment url, setUrl, message col will freeze. why? useFetch dependence [url]? */
//   const [url, setUrl] = useState("");
//   return (
//     <div className="home">
//       <Header />
//       <Channels
//         handleSwitchCh={(e) => {
//           e.preventDefault();
//           curData.curCh = e.target.id;
//           console.log("e.target.id:", e.target.id);
//           setUrl(`${baseUrl}/channels/${e.target.id}?populate=messages`);

//           /* remove default ch class */
//           const defaultCh = document.querySelector(".default-ch");
//           if (defaultCh) defaultCh.classList.remove("default-ch");

//           /* uncheck all .check-ch and check the current one */
//           document
//             .querySelectorAll(".check-ch")
//             .forEach((e) => (e.checked = false));
//           e.target.parentElement.children[0].checked = true;
//         }}
//       />
//       <Messages />
//       <People />
//     </div>
//   );
// }
