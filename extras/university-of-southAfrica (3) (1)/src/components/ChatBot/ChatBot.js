import { useContext } from "react";

//import context
import ChatContext from "../../context/Context";

//import directline from the webchat
import { createDirectLine } from "botframework-webchat";
import { Components } from "botframework-webchat";
import ChatSection from "./ChatSecton/ChatSection";

//destructure composer component and directline token fetching
const { Composer } = Components;

async function getDirectLineToken() {
  const token = "jHD8Av3iEiI.By6fj0PC9jYWaviF7B5l3uwrdwpzLQC3eLEZqqcinKs";
  return token;
}

const ChatBot = () => {
  //context destructure.....
  const { directLine, setDirectLine } = useContext(ChatContext);

  if (!directLine) {
    // We will load DirectLineJS asynchronously on first render.
    getDirectLineToken().then((token) =>
      setDirectLine(createDirectLine({ token }))
    );
  }

  return (
    <>
      {!!directLine && (
        <Composer directLine={directLine}>
          <ChatSection />
        </Composer>
      )}
    </>
  );
};

export default ChatBot;
