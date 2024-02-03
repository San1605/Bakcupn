import React, { useEffect, useRef } from "react";
import * as AdaptiveCards from "adaptivecards";
import "../ChatBotBody/ChatBotBody.css"

const AdaptiveCardComponent = ({ message, handleCardAction }) => {

  const divRef = useRef(null);
  useEffect(() => {
    var adaptiveCard = new AdaptiveCards.AdaptiveCard();

    // Set its hostConfig property unless you want to use the default Host Config
    // Host Config defines the style and behavior of a card
    adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
      fontFamily: "Segoe UI, Helvetica Neue, sans-serif",
      // More host config options
    });

    // Set the adaptive card's event handlers. onExecuteAction is invoked
    // whenever an action is clicked in the card
    adaptiveCard.onExecuteAction = function (action) {
      // console.log(action);
      handleCardAction(
        "imBack",
        action._propertyBag?.data,
        action._propertyBag?.title
      );
    };

    // Parse the card payload
    adaptiveCard.parse(message);

    // Render the card to an HTML element:
    var renderedCard = adaptiveCard.render();

    // And finally insert it somewhere in your page:
    divRef.current.appendChild(renderedCard);
  }, []);

  return <div style={{
    minWidth:"16rem"
  }} ref={divRef}></div>;
};

export default AdaptiveCardComponent;
