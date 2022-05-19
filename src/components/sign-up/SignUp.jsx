import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./styles.css";
import { baseUrl } from "../../config";
// import usePostFetchUsr from "../../my-hooks/usePostFetchUsr";
// import { usrPostData } from "../../data";

/* try 2: use handler, post usr works */
export default function SignUp({
  usr,
  setUsr,
  jwtToken,
  setJwtToken
}) {
  const authorizationUrl = `${baseUrl}/auth/local/register`;
  const [nUsr, setNUsr] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  // const [usrLength, setUsrLength] = useState(0);
  // const [usrCollection, setUsrCollection] = useState({});

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);

  /* post new usr */
  const handlePostUsr = () => {
    const fetchData = async () => {
      try {
        const body = {
          username: nUsr,
          email: email,
          password: pwd,
        };

        if (!nUsr || !email || !pwd) return;
        const res = await fetch(encodeURI(authorizationUrl), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        console.log("post usr res:", res);

        // --- throw an error if the res is not ok (this works!) ---
        if (!res.ok) {
          const message = res.statusText
            ? `${res.status}: ${res.statusText}\n-> ${authorizationUrl}`
            : `HTTP error! status: ${res.status}\n-> ${authorizationUrl}`;
          throw new Error(message);
        }

        const json = await res.json();
        console.log("sign up usr json:", json);

        setData(json);
        console.log("sign up usr data:", data);

        setJwtToken(()=>json.jwt);
        console.log("sign up usr jwtToken:", jwtToken);

        // setLoading(false);

        // return { data, error, loading };
      } catch (error) {
        setError(error);
        // setLoading(false);
      }
    };

    fetchData();

    return { data, error };
  };

  if (error)
    return (
      <p>
        error status: {error.status} <span>error: message {error.message}</span>
      </p>
    );
  // if (loading) return <p>loading...</p>;

  return (
    <div className="sign-up">
      <Link to="/">
        <div className="title-container">
          <h1 className="title-sign">Wij Chat</h1>
        </div>
      </Link>
      <form
        className="sign-up-form"
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   handlePostUsr();
        // }}
        // onSubmit={handlePostUsr} // can't fire handlepostUsr, ?!
      >
        <input
          type="text"
          className="usr-input"
          value={nUsr}
          onChange={(e) => {
            setNUsr(e.target.value);
            console.log("sign in usr is:", nUsr);
            // set new user as cur usr.
            setUsr(e.target.value);
            console.log("cur usr from sign in is:", usr);
          }}
          placeholder="Username"
          required
        />
        <input
          type="email"
          className="email-input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            console.log("sign in email is:", email);
          }}
          placeholder="Email"
          required
        />
        <input
          type="password"
          className="pwd-input"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="Password. Must >= 6 character"
          required
        />
        <Link to="/">
          <input
            type="submit"
            value="Sign up"
            className="sign-up-btn"
            onClick={handlePostUsr}
          />
        </Link>
      </form>
      <div className="sign-up-container">
        <p>
          Already have a count.
          <Link to="/signIn">
            <span className="to-sign-in">Sign in.</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

/* try 1:  usePostFetchUsr, not work , loading issue */
// export default function SignUp() {
//   const authorizationUrl = `${baseUrl}/auth/local/register`;
//   const [usr, setUsr] = useState("");
//   const [email, setEmail] = useState("");
//   const [pwd, setPwd] = useState("");
//   const [usrLength, setUsrLength] = useState(0);
//   const [usrCollection, setUserCollection] = useState({});

//   /* post new usr */
//   const { data, error, loading } = usePostFetchUsr(
//     usr,
//     email,
//     pwd,
//     authorizationUrl,
//     usrLength
//   );
//   if (data) {
//     /* way 1: store post usr data in state */
//     setUserCollection(
//       (usrCollection.usr = {
//         id: data.user.id,
//         token: data.jwt,
//         username: usr,
//         email: email,
//         password: pwd,
//       })
//     );
//     console.log("usrCollection=", usrCollection);

//     /* way 2: store post usr data in data.js */
//     usrPostData.id = {
//       id: data.user.id,
//       token: data.jwt,
//       username: usr,
//       email: email,
//       password: pwd,
//     };
//     console.log("usrPostData.id=", usrPostData.id);
//     console.log("usrPostData=", usrPostData);
//   }
//   if (error)
//     return (
//       <p>
//         error status: {error.status} <span>error: message {error.message}</span>
//       </p>
//     );
//   if (loading) return <p>loading...</p>;
//   return (
//     <div className="sign-up">
//       <Link to="/">
//         <div className="title-container">
//           <h1 className="title-sign">Wij Chat</h1>
//         </div>
//       </Link>
//       <form
//         className="sign-up-form"
//         onSubmit={(e) => {
//           e.preventDefault();
//           setUsrLength((l) => l + 1);
//         }}
//       >
//         <input
//           type="text"
//           className="usr-input"
//           value={usr}
//           onChange={(e) => setUsr(e.target.value)}
//           placeholder="Username"
//           required
//         />
//         <input
//           type="email"
//           className="email-input"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="password"
//           className="pwd-input"
//           value={pwd}
//           onChange={(e) => setPwd(e.target.value)}
//           placeholder="Password"
//           required
//         />

//         <div className="sign-up-container">
//           <Link to="/">
//             <input type="submit" value="Sign up" className="sign-up-btn" />
//             {/* <button className="sign-up-btn" onClick={handleSignUp}>
//               Sign up
//             </button> */}
//           </Link>
//           <p>
//             Already have a count.
//             <Link to="/signIn">
//               <span className="to-sign-in">Sign in.</span>
//             </Link>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// }
