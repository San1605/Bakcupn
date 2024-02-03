import React, { useEffect, useRef } from "react";
import lightning from "../assets/images/lightning.webp";
const SuggestionLarge = ({ message, handleSubmit }) => {
  const suggestionRef = useRef(null);
  useEffect(() => {
    suggestionRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);
  return (
    <div ref={suggestionRef}>
      {message.suggestions.map((suggestion, index) => (
        <div
          onClick={() => {
            handleSubmit({
              suggestion: suggestion,
              quicklink: "False",
            });
          }}
          key={index}
          className="flex  items-start bg-white my-2 p-2 cursor-pointer rounded border border-[#D6D6D6]"
          style={{ wordBreak: "break-word" }}
        >
          <img className="h-4 mt-[.35rem]" src={lightning} alt="" />
          <div className="capitalize-line">{suggestion}</div>
        </div>
      ))}
    </div>
  );
};

export default SuggestionLarge;
