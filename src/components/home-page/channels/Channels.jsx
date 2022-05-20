import React from "react";
import { useState } from "react";

import "./styles.css";
import useFetch from "../../../my-hooks/useFetch";
import usePostFetchCh from "../../../my-hooks/usePostFetchCh";
import useDelFetchCh from "../../../my-hooks/useDelFetchCh";
import { baseUrl } from "../../../config";
// import { curData } from "../../../data";

/* way 3 usePostFetchCh to post new ch, works with refresh issue */
// curCh, id of cur ch, try to toggle rerender.
export default function Channels({
  usr,
  curCh,
  jwtToken,
  userId,
  handleSwitchCh,
}) {
  /* get channels data */
  // define url
  const chUrl = `${baseUrl}/channels`;
  const [channelName, setChannelName] = useState("");
  const [chLength, setChLength] = useState(0);
  const [chIdToDel, setChIdToDel] = useState(null); // for delete ch
  const [delInitiator, setDelInitiator]=useState(null); // for delete ch, check if cur usr is the ch owner, double check

  /* try to fire multiple fetch in order, use state var postCh as dependency in useFetch(), works*/
  const [postCh, setPostCh] = useState(null);

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
    userId,
  ];
  const { PData, PError, pLoading } = usePostFetchCh(...postChArgumentList);

  // fetch chs data
  const { data, error, loading } = useFetch(chUrl, postCh); // postCh, multiple fetch order control
  console.log(data);

  // delete ch
  const {delData, delError, delLoading}= useDelFetchCh(chIdToDel, setPostCh, jwtToken, usr, delInitiator); 

  const isLoading = pLoading || loading || delLoading;
  const hasError = PError || error || delError;
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
      <div className="channels">
        {data.data.map((channel, index) => (
          <div key={index} className="channel">
            <input type="checkbox" className="check-ch" />
            {usr === channel.attributes.initiator ? (
              <div className="single-channel">
                <p
                  className="ch-name"
                  id={channel.id}
                  data-ch-title={channel.attributes.title}
                  data-ch-initiator={channel.attributes.initiator}
                  onClick={handleSwitchCh}
                >
                  {channel.attributes.title}
                </p>
                <button
                  className="delete-ch"
                  onClick={(e) => {
                    // get previous siblings
                    const prevSibling = e.target.previousElementSibling;
                    console.log("prevSibling msg is", prevSibling);

                    // get ch id
                    const theChId = prevSibling.id;
                    setChIdToDel(() => theChId);
                    console.log("setChIdToDel is", setChIdToDel);

                    // get ch initiator
                    const theChOwner=prevSibling.dataset.chInitiator;
                    setDelInitiator(() => theChOwner);
                  }}
                >
                  Delete
                </button>
              </div>
            ) : (
              <div className="single-channel">
                <p
                  className="ch-name"
                  id={channel.id}
                  data-ch-title={channel.attributes.title}
                  data-ch-initiator={channel.attributes.initiator}
                  onClick={handleSwitchCh}
                >
                  {channel.attributes.title}
                </p>
              </div>
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

