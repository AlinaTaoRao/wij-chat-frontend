import React from "react";
import { useState, useEffect } from "react";

import "./styles.css";
import Header from "./header/Header";
import Channels from "./channels/Channels";
import Messages from "./messages/Messages";
import People from "./people/People"; // for   <People/>
import { curData } from "../../data";
import { baseUrl } from "../../config";

/* way 1: use global var curData.curCh, works */
export default function HomePage() {
  /* can't comment url, setUrl, message col will freeze. why? useFetch dependence [url]? */
  const [url, setUrl] = useState("");

  const switchCh = (e) => {
    e.preventDefault();
    curData.curCh = e.target.id;
    console.log("e.target.id:", e.target.id);
    setUrl(`${baseUrl}/channels/${e.target.id}?populate=messages`);
    
    /* remove default ch class */
    const defaultCh = document.querySelector(".default-ch");
    if (defaultCh) defaultCh.classList.remove("default-ch");
    
    /* uncheck all .check-ch and check the current one */
    document
      .querySelectorAll(".check-ch")
      .forEach((e) => (e.checked = false));
    e.target.parentElement.children[0].checked = true;

  };
  return (
    <div className="home">
      <Header />
      <Channels
        // handleSwitchCh={(e) => {
        //   e.preventDefault();
        //   curData.curCh = e.target.id;
        //   console.log("e.target.id:", e.target.id);
        //   setUrl(`${baseUrl}/channels/${e.target.id}?populate=messages`);
          
        //   /* remove default ch class */
        //   const defaultCh = document.querySelector(".default-ch");
        //   if (defaultCh) defaultCh.classList.remove("default-ch");
          
        //   /* uncheck all .check-ch and check the current one */
        //   document
        //     .querySelectorAll(".check-ch")
        //     .forEach((e) => (e.checked = false));
        //   e.target.parentElement.children[0].checked = true;
        // }}
        handleSwitchCh={e => switchCh(e)}
      />
      <Messages />
      <People />
    </div>
  );
}

