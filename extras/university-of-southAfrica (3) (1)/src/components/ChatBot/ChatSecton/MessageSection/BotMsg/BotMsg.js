import React from "react";

//import component of the cards
import PdfCard from "./pdfcard/PdfCard";
import PersonaCard from "./personacard/PersonaCard";
import TestPaperCard from "./testpapercard/TestPaperCard";

function BotMsg({ msg }) {
  const rendderChat = (msg) => {
    if(msg.channelData && msg.channelData.heading ){
      console.log(true,"working")
      return(
          <PersonaCard heading={msg.channelData.heading} buttonsmap={msg.channelData.buttons } />)
    }
    else if(msg.attachments){
      console.log("workig")
      return(
      <TestPaperCard msg={msg}/>)
    }

    return msg.text;
  };

  return (
    <>
      <div className="bot_message">{rendderChat(msg)} </div>
    </>
  );
}

export default BotMsg;

// && Array.isArray(msg.attachments) === "true"