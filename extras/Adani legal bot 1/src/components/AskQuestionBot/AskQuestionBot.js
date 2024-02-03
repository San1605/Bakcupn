import React, { useEffect, useState, useRef, useContext } from "react";
import Send from "../../assets/images/send.svg";
import "./ask-question.css";
import { GlobalContext } from "../../context/GlobalState";

const AskQuestionBot = () => {
  const { documentFiles, askQuestionsFmDocuments, qnaLoading, toggleAskQuestionStateFun, voiceLoading } = useContext(GlobalContext);
  //eslint-disable-next-line
  const [questionInput, setQuestionInput] = useState("");

  useEffect(() => {
    if (qnaLoading) {
      setQuestionInput("");
    }
  }, [qnaLoading])

  //askFromDoc API calling payload according message type(text or wav)
  const askFromDoc = () => {
    let payload = {
      "query": questionInput,
      "language": "en"
    }
    if (questionInput) {
      askQuestionsFmDocuments(payload)
    }
    toggleAskQuestionStateFun(false);
  }

  //check enter click on input and call askFromDoc function
  const callFunFromInput = (event) => {
    if (event.keyCode === 13) {
      askFromDoc();
    }
  }

  return (
    <div className="ask-question-container">
      <div className={`question-container ${documentFiles.length > 0 ? null : "disabled"}`}>
        <input
          className="input-container"
          placeholder="Type your question here..."
          disabled={!voiceLoading && !qnaLoading && documentFiles.length > 0 ? false : true}
          value={questionInput}
          onChange={(e) => setQuestionInput(e.target.value)}
          onKeyDown={(e) => callFunFromInput(e)}
        />
        <div className="button-container">
          <button className="send-button"
            disabled={!voiceLoading && !qnaLoading && documentFiles.length > 0 ? false : true}
            onClick={() => askFromDoc()}
          >
            <img src={Send} alt="sendButton" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskQuestionBot;
