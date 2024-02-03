import React, { useEffect, useRef, useState } from "react";
import lightning from "../assets/images/lightning.webp";
import cross from '../assets/images/cross.webp';
{
  /* -mt-10 ml-0 top-20 md:top-auto md:ml-[22%] */
}
const SuggestionPopup = ({
  keywordSuggestions,
  setKeywordSuggestions,
  setKeyWordToggle,
  handleSubmit,
}) => {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsRendered(true);
    }, 10);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <div
      className={`fixed top-0 left-0 md:left-[20%] h-full w-full flex items-center justify-center md:justify-normal z-10 backdrop-blur-sm backdrop-brightness-95 transition-opacity duration-300 ${
        isRendered ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-[#FBFBFB] p-2 rounded border border-[#D6D6D6] absolute z-10 w-80 md:w-96 shadow-md ">
        <div className="flex justify-between">
          <div className="font-semibold">Suggestions</div>
          <div
            onClick={() => {
              setKeyWordToggle(false);
              setKeywordSuggestions(false);
            }}
            className="cursor-pointer"
          >
            <img className="h-6" src={cross} alt="" />
          </div>
        </div>
        <div className="max-h-[20rem] md:max-h-fit overflow-y-auto z-20">
          {keywordSuggestions.map((suggestion) => (
            <div
              onClick={() => {
                setKeyWordToggle(false);
                setKeywordSuggestions(false);
                handleSubmit({
                  suggestion: suggestion,
                  quicklink: "False",
                });
              }}
              className="flex items-start bg-white my-2 p-2 gap-1 cursor-pointer rounded border border-[#D6D6D6]"
            >
              <img className="h-4 my-1" src={lightning} alt="" />
              {suggestion}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestionPopup;
