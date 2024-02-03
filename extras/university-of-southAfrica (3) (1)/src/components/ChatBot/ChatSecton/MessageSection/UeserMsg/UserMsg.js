import React from "react";
import TestPaperCard from "../BotMsg/testpapercard/TestPaperCard";

function UserMsg({msg}) {
    console.log(msg)

  return (
    <>
      <div className="user_message ">
        <p className="chatusertext">{msg.text}</p>
  {/* <TestPaperCard />*/}
      </div>
    </>
  );
}

export default UserMsg;
