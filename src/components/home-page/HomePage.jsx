import React from "react";
import { useState } from "react";

import "./styles.css";
import Header from "./header/Header";
import Channels from "./channels/Channels";
import Messages from "./messages/Messages";
import People from "./people/People";
// import { curData } from "../../data";
import { baseUrl } from "../../config";

/* use url and curCh state, works*/
export default function HomePage({ usr, jwtToken, userId, error, setError }) {
  // set channel url state, default ch id=1;
  const [url, setUrl] = useState(`${baseUrl}/channels/1?populate=messages`);
  const [curCh, setCurCh] = useState(1); // default ch id=1;
  const [curChOwner, setCurChOwner] = useState(null); // for mark ch owner

  /* try to fire multiple fetch in order, use state var postMsg as dependency in useFetch(), works*/
  const [postMsg, setPostMsg] = useState(null); // for
  /* try to fire multiple fetch in order, use state var postCh as dependency in useFetch(), works*/
  const [postCh, setPostCh] = useState(null);

  /* switchCh, grab cur ch id from click event, and reset url for render this ch msg. */
  const switchCh = (e) => {
    e.preventDefault();
    setCurCh(e.target.id);
    console.log("ch id-curCh is:", e.target.id);
    setUrl(`${baseUrl}/channels/${e.target.id}?populate=messages`);

    setCurChOwner(e.target.dataset.chInitiator); // for mark ch owner, value from "data-ch-initiator"

    /* remove default ch class */
    const defaultCh = document.querySelector(".default-ch");
    if (defaultCh) defaultCh.classList.remove("default-ch");

    /* uncheck all .check-ch and check the current one, works */
    document.querySelectorAll(".check-ch").forEach((e) => (e.checked = false));
    e.target.parentElement.parentElement.children[0].checked = true;
  };
  return (
    <div className="home">
      <Header />
      <Channels
        usr={usr}
        jwtToken={jwtToken}
        userId={userId}
        error={error}
        setError={setError}
        postMsg={postMsg}
        setPostMsg={setPostMsg}
        postCh={postCh}
        setPostCh={setPostCh}
        handleSwitchCh={(e) => switchCh(e)}
      />
      <Messages
        usr={usr}
        curCh={curCh}
        url={url}
        jwtToken={jwtToken}
        userId={userId}
        error={error}
        setError={setError}
        postMsg={postMsg}
        setPostMsg={setPostMsg}
        postCh={postCh}
        setPostCh={setPostCh}

      />
      <People
        usr={usr}
        curChOwner={curChOwner}
        error={error}
        setError={setError}
        postMsg={postMsg}
        setPostMsg={setPostMsg}
        postCh={postCh}
        setPostCh={setPostCh}
      />
    </div>
  );
}
