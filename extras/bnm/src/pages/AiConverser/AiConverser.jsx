import React, { useContext, useEffect, useState } from "react";
import SEND_ARROW from "../../assets/sendArrow.svg";
import DELETE_ICON from "../../assets/deleteIcon.svg";
import EMPTY_CHAT_ILLUSTRATION from "../../assets/emptyChat.svg";
import RIGHT_ARROW from "../../assets/rightArrow.svg";
import { AppContext } from "../../utils/Context/AppContext";
import LIKE from "../../assets/likeIcon.svg";
import LIKE_FILLED from "../../assets/likeIconFilled.svg";
import DISLIKE from "../../assets/dislikeIcon.svg";
import DISLIKE_FILLED from "../../assets/dislikeIconFilled.svg";
import ICON_MSG from "../../assets/iconMsgQq.svg";
import TypingIndicator from "../../components/TypingIndicator/TypingIndicator";
import { getBotResponse, updateConversation } from "../../utils/services/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

import {
  quickQuestions1,
  quickQuestions2,
  scrollToBottom,
  quickQuestions1Images,
  quickQuestions2Images,
} from "../../utils/helpers/rawData";

const AiConverser = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { appData, dispatch } = useContext(AppContext);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoader, setPageLoader] = useState(true);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("AI Converser");
  const [sentReqIndex, setSentReqIndex] = useState([]);
  let conversationId = searchParams.get("conversation_id");

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleClick = (text) => {
    //same
    if (text === "AI Converser") {
      navigate(`/ai_converser?new_conversation`);
    } else {
      navigate(`/data_driven_chat?new_conversation`);
    }
  };

  const handleFeedback = async (feedback, i) => {
    dispatch({
      type: "feedbackModal",
      payload: {
        flag: true,
        feedbackValue: feedback,
        feedbackDesc: "",
        msgIndex: i,
        conversationId: appData?.aiConverserChat.length - conversationId,
        queryType:
          window.location.pathname === "/ai_converser"
            ? "ai_driven"
            : "data_driven",
      },
    });
    // console.log(feedback);
  };

  const getHistorySchema = () => {
    let arr2 = [];
    for (let i = 0; i < messages?.length - 1; i++) {
      if (messages[i].From === "User") {
        if (messages[i + 1].From === "Bot") {
          arr2.push({
            user: messages[i].Message,
            bot: messages[i + 1].Message,
          });
        } else {
          arr2.push({
            user: messages[i].Message,
            bot: "",
          });
        }
      }
    }
    return arr2;
  };

  const handleSubmit = async (query) => {
    if (query !== "") {
      setInputText("");
      if (window.location.search.includes("?new_conversation")) {
        dispatch({
          type: "GLOBAL_LOADING",
          payload: true,
        });
        await setMessages((prev) => {
          return [
            ...prev,
            {
              From: "User",
              Message: query,
            },
          ];
        });
      } else {
        let cc = appData.aiConverserChat;
        cc[conversationId]?.push({
          From: "User",
          Message: query,
        });
        dispatch({
          type: "AI_CONVERSER_CHAT",
          payload: cc,
        });
      }
      setSentReqIndex(conversationId);
      handleQuery(query);
    }
    if (appData.showTabs) {
      dispatch({
        type: "SHOW_TABS",
        payload: false,
      });
    }
  };

  const handleQuery = async (item) => {
    setLoading(true);
    let index = searchParams.get("conversation_id");
    let history = await getHistorySchema();
    try {
      let response = await getBotResponse(item, "ai_driven", history);
      setLoading(false);
      // console.log(response, "reeeeess");
      // console.log(index, conversationId, "index, conversationId");
      if (window.location.search.includes("?new_conversation")) {
        if (
          sentReqIndex == conversationId ||
          window.location.search.includes("new_conversation")
        ) {
          setMessages((prev) => [
            ...prev,
            {
              From: "Bot",
              Message: response?.data?.Response,
            },
          ]);
        }
      } else {
        let cc = appData.aiConverserChat;
        cc[conversationId].push({
          From: "Bot",
          Message: response?.data?.Response,
        });
        dispatch({
          type: "AI_CONVERSER_CHAT",
          payload: cc,
        });
      }
      let payload2 = {
        userMsg: response.data?.Query,
        botMsg: response.data?.Response,
        feedback: null,
        conversationNumber:
          messages === undefined || messages?.length === 0
            ? ""
            : appData?.aiConverserChat.length - conversationId,
        queryDate: response?.data?.User_query_date,
        queryTime: response?.data?.User_query_time,
        responseDate: response?.data?.Response_Date,
        responseTime: response?.data?.Response_Time,
        newConversation:
          messages === undefined || messages?.length === 0 ? "True" : "False",
        queryType: "ai_driven",
        Filenames: JSON.stringify(
          response?.data?.Filenames.length > 0
            ? { Filenames: [...response?.data?.Filenames] }
            : { Filenames: [] }
        ),
        citetation: JSON.stringify({
          blob_link:
            response?.data?.Blob_name.length > 0
              ? [...response?.data?.Blob_name]
              : [],
        }),
      };
      if (window.location.search === "?new_conversation") {
        await updateConversation(payload2);
        await appData.getConvo();
        navigate("/ai_converser?conversation_id=0");
        dispatch({
          type: "GLOBAL_LOADING",
          payload: false,
        });
      } else {
        updateConversation(payload2);
      }
    } catch (err) {
      setLoading(false);
      dispatch({
        type: "GLOBAL_LOADING",
        payload: false,
      });
      // console.log("err", err);
      // toast.error("Bot is not responding...");
    }
    // console.log(appData?.globalLoading, "appData.globalLoading");
  };

  const handleClearChat = () => {
    dispatch({
      type: "deleteModal",
      payload: {
        flag: true,
        deleteConversationId: appData.aiConverserChat.length - conversationId,
        index: conversationId,
      },
    });
  };

  useEffect(() => {
    scrollToBottom();
  });

  useEffect(() => {
    if (conversationId) {
      setMessages((prev) => {
        if (appData?.aiConverserChat?.length > 0)
          return appData.aiConverserChat[conversationId];
        else return [];
      });
      // console.log(appData.aiPageLoader, pageLoader);
    }
    setTimeout(() => {
      // console.log(appData.aiPageLoader, pageLoader,'in settimeout');
      setPageLoader(false);
    }, 0);
  }, [appData.aiConverserChat, searchParams, window.location.pathname]);

  useEffect(() => {
    setInputText("");
    if (window.location.search === "?new_conversation") {
      setMessages([]);
    }
  }, [window.location.pathname, searchParams]);

  useEffect(() => {
    if (appData?.aiPageLoader) {
      setTimeout(() => {
        dispatch({
          type: "AI_PAGE_LOADER",
          payload: false,
        });
        dispatch({
          type: "DATA_PAGE_LOADER",
          payload: false,
        });
      }, 6000);
    }
    // if (messages?.length == 0) {
    //   dispatch({
    //     type: "SHOW_TABS",
    //     payload: true,
    //   });
    // }
  }, []);

  return (
    <div
      className={`ai-converser-page h-full w-full bg-[#FCFCFF] sm:px-4 px-2 pb-4`}
    >
      {appData.aiPageLoader || pageLoader ? (
        <div className="ilustration-container w-full flex justify-center items-center h-full mt-4">
          <Loader />
        </div>
      ) : (
        <>
          {messages?.length > 0 ? (
            <>
              <div className="clear-btn-cont w-100 flex justify-end h-12 py-2 gap-3 pe-5">
                <button
                  className="flex items-center gap-2 h-auto pr-3 px-3 border-[1px] border-[#DCDCDC] rounded-[3px]"
                  onClick={handleClearChat}
                >
                  <img className="h-[15px]" src={DELETE_ICON} alt="" />
                  <p className="text-[14px] text-[#696969]">Clear chat</p>
                </button>
              </div>
              <div
                className="messages-container overflow-y-auto flex flex-col gap-5 px-4 pb-3"
                id="chats-container"
              >
                {messages?.map((msg, i) => {
                  return (
                    <div
                      key={i}
                      className={`flex w-full ${
                        msg?.From === "User" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      {msg.From === "User" ? (
                        <div className="msg user-msg max-w-[85%] flex-start bg-[#EFF5FF] p-2 rounded-[8px] rounded-br-none">
                          <p className="text-[#424242] text-sm whitespace-pre-line">
                            {msg?.Message}
                          </p>
                        </div>
                      ) : (
                        <div className="msg bot-msg max-w-[85%] flex-end bg-[#F8F8F8] p-2 rounded-[8px] mb-5 rounded-bl-none relative">
                          <p className="text-[#424242] text-sm whitespace-pre-line">
                            {msg?.Message}
                          </p>
                          <div className="flex items-center justify-center gap-[12px] absolute right-[5px] bottom-[-23px]">
                            {msg.feedback === "Positive" ? (
                              <>
                                <img
                                  className="h-[16px] w-[16px]"
                                  src={LIKE_FILLED}
                                  alt=""
                                />
                                <img
                                  className="h-[16px] w-[16px]"
                                  src={DISLIKE}
                                  alt=""
                                />
                              </>
                            ) : msg.feedback === "Negative" ? (
                              <>
                                <img
                                  className="h-[16px] w-[16px]"
                                  src={LIKE}
                                  alt=""
                                />
                                <img
                                  className="h-[16px] w-[16px]"
                                  src={DISLIKE_FILLED}
                                  alt=""
                                />
                              </>
                            ) : (
                              <>
                                <img
                                  className="cursor-pointer"
                                  onClick={() => handleFeedback("Positive", i)}
                                  src={LIKE}
                                  alt=""
                                />
                                <img
                                  className="cursor-pointer"
                                  onClick={() => handleFeedback("Negative", i)}
                                  src={DISLIKE}
                                  alt=""
                                />
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                {sentReqIndex == conversationId && loading && (
                  <div className="msg bot-msg max-w-[60%] flex-end bg-[#F8F8F8] p-1 rounded-[8px] rounded-bl-none relative w-fit">
                    <TypingIndicator />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className=" ilustration-container w-full flex justify-center items-center h-full">
              <div className="pt-[2rem] h-full flex items-center justify-between flex-col w-full p-2 xs:px-6 sm:px-16 gap-[2rem] overflow-y-auto">
                <div
                  className={`sm:hidden flex btn-group border-[1px] border-[#DFDFDF] sm:gap-1 w-[95%] mx-auto p-[5px]`}
                >
                  <button
                    className={`${
                      activeTab === "AI Converser"
                        ? "bg-[#EBEEF8]"
                        : "sm:bg-transparent bg-white"
                    } text-[#2957A4] text-[13px] sm:py-[7px] py-[5px] sm:px-3 px-5 rounded-[2px] whitespace-nowrap w-[50%]`}
                    onClick={() => handleClick("AI Converser")}
                  >
                    AI Converser
                  </button>
                  <button
                    className={`${
                      activeTab === "Data-driven Chat"
                        ? "bg-[#EBEEF8]"
                        : "sm:bg-transparent bg-white"
                    } text-[#2957A4] text-[13px] sm:py-[7px] py-[5px] sm:px-3 px-5 rounded-[2px] whitespace-nowrap w-[50%]`}
                    onClick={() => handleClick("Data-driven Chat")}
                  >
                    Data-driven Chat
                  </button>
                </div>
                <div
                  style={{
                    height: "calc(100% - 165px)",
                  }}
                  className="flex justify-center flex-col"
                >
                  <img
                    className="h-[7rem] mb-4"
                    src={EMPTY_CHAT_ILLUSTRATION}
                    alt=""
                  />
                  <div className="text-center">
                    <h5 className="text-xl font-medium text-[24px] mb-1">
                      Hi There 👋
                    </h5>
                    <p className="text-[#616161] text-sm max-w-[20rem]">
                      AI provides dynamic responses based on real-time learning
                      from conversations.
                    </p>
                  </div>
                </div>
                <div className="suggestion-questions mb-3 w-full sm:w-fit w-[100%] sm:max-w-[60rem] lg:min-w-[45rem]">
                  <div className="flex-row flex gap-2 w-full">
                    {quickQuestions1.map((item, i) => {
                      return (
                        <div
                          key={i}
                          className={` ${
                            appData?.aiConverserChat === undefined &&
                            "pointer-events-none"
                          } sm:w-1/3 w-1/2 flex items-center justify-between gap-2 border-[1px] rounded-[8px] border-[#D4D4D4] hover:border-[#292B5D] bg-[#fff] sm:bg-[#FAFAFA] hover:bg-[#F7F7FF] py-2 sm:px-5 px-3 h-[67px] sm:h-[55px] cursor-pointer`}
                          onClick={() => handleSubmit(item)}
                        >
                          <img
                            className=" sm:hidden inline-block h-[16px] w-[16px]"
                            src={quickQuestions1Images[i]}
                            alt=""
                          />
                          <p
                            title={item}
                            className="h-auto text-sm w-[85%] ellipsis-text"
                          >
                            {item}
                          </p>
                          <img
                            className="hidden sm:inline-block  h-[13px]"
                            src={RIGHT_ARROW}
                            alt=""
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-row gap-2 mt-2 w-full">
                    {quickQuestions2.map((item, i) => {
                      return (
                        <div
                          key={i}
                          className={`${
                            appData?.aiConverserChat === undefined &&
                            "pointer-events-none"
                          } sm:w-1/2 w-1/2 flex items-center justify-between gap-2 border-[1px] rounded-[8px] border-[#D4D4D4] hover:border-[#292B5D] hover:bg-[#F7F7FF] py-2 h-[67px] sm:h-[55px] sm:px-5 px-3 cursor-pointer bg-white sm:bg-[#FAFAFA]`}
                          onClick={() => handleSubmit(item)}
                        >
                          <img
                            className=" sm:hidden inline-block h-[16px] w-[16px]"
                            src={quickQuestions2Images[i]}
                            alt=""
                          />
                          <p
                            title={item}
                            className="h-auto text-sm w-[86%] ellipsis-text"
                          >
                            {item}
                          </p>
                          <img
                            className="hidden sm:inline-block h-[13px]"
                            src={RIGHT_ARROW}
                            alt=""
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex"></div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {!(appData.aiPageLoader || pageLoader) && (
        <div className="message-footer-container h-[57px] mt-[10px]">
          <div className="input-container h-full bg-white border-[1px] border-[#EEEEEE] rounded-[10px] px-4 py-[9px]">
            <div className="input h-full flex items-center justify-between bg-[#FAFAFA] border-[1px] border-[#F1F1F1] rounded-full overflow-hidden px-4">
              <form
                className="h-full w-full items-center flex"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(inputText);
                }}
              >
                <input
                  className="h-full bg-[#FAFAFA] outline-0 text-sm placeholder:text-sm"
                  name="input"
                  onChange={handleChange}
                  placeholder={"Ask a Question"}
                  value={inputText}
                  disabled={
                    appData.aiConverserChat === undefined ||
                    appData?.globalLoading
                  }
                />
                <button className="w-fit">
                  <img className="w-[17px]" src={SEND_ARROW} alt="" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiConverser;
