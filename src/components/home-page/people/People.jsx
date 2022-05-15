import "./styles.css";
import useFetch from "../../../my-hook/useFetch";
import { localhostUrl } from "../../../config";
import { curData } from "../../../data";

import React, { useState } from "react"; // for way 1

/* way 2: highlight current user ternary, curData.curUser?, works, best way! */
export default function People() {
  const { data, error, loading } = useFetch(`${localhostUrl}/users`);
  console.log("USERS:", data);
  if (loading) return <p> Loading</p>;
  if (error) return <p> Oops, there is something wrong :(</p>;

  return (
    <div className="people">
      {data.map((user, index) => (
        <div key={index} className="user">
          {curData.curUser && curData.curUser === user.username ? 
            <p
              className="single-user cur-usr"
              id={user.id}
              data-usr={user.username}
            >
              {user.username}
            </p>
          : 
            <p className="single-user" id={user.id} data-usr={user.username}>
              {user.username}
            </p>
          }
        </div>
      ))}
    </div>
  );
}

/* way 1: highlight current user by event, works */
// export default function People() {
//   const [highlight, setHighlight] = useState(0);
//   const { data, error, loading } = useFetch(`${localhostUrl}/users`);
//   console.log("USERS:", data);
//   if (loading) return <p> Loading</p>;
//   if (error) return <p> Oops, there is something wrong :(</p>;

//   /* define handler */
//   const handleHighlightCurUser = () => {
//     /* remove cur-user if there is */
//     // const rmEl = document.getElementsByClassName("single-user"); //not work
//     const rmEl = document.querySelectorAll(".single-user");
//     console.log("rmEl==", rmEl);
//     rmEl.forEach((e) => e.classList.remove("cur-user"));
//     /* add curUser to the new one */
//     console.log("is a curData.curUser==", curData.curUser);
//     const curPEl = document.querySelectorAll(`p[data-usr=${curData.curUser}]`);
//     console.log("curPEl====", curPEl);
//     curPEl[0].classList
//       ? curPEl[0].classList.add("cur-usr")
//       : (curPEl[0].className += " cur-usr");
//     setHighlight((h) => h + 1);
//   };

//   return (
//     <div className="people" onClick={handleHighlightCurUser}>
//       {data.map((user, index) => (
//         <div key={index} className="user">
//           <p className="single-user" id={user.id} data-usr={user.username}>
//             {user.username}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }
