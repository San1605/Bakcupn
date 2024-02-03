import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SEND_ARROW from "../../assets//pnbAssets/send-arrow.svg";
import MSG_ARROW from "../../assets//pnbAssets/msg-arrow.svg";
import MSG_ARROW_BOT from "../../assets//pnbAssets/msg-arrow-bott.svg";
import USER from "../../assets//pnbAssets/user.svg";
import BOT from "../../assets//pnbAssets/bot.svg";
import DELETE_ICON from "../../assets/deleteIcon.svg";
import EMPTY_CHAT_ILLUSTRATION from "../../assets/pnbAssets/chatIllustration.svg";
import RIGHT_ARROW from "../../assets/rightArrow.svg";
import PDF_ICON from "../../assets/pdfIcon.svg";
import DRAG_BTN_ICON from "../../assets/dragCitation.svg";
import { AppContext } from "../../utils/Context/AppContext";
import Citation from "../../components/Citation/Citation";
import LIKE from "../../assets/likeIcon.svg";
import LIKE_FILLED from "../../assets/likeIconFilled.svg";
import DISLIKE from "../../assets/dislikeIcon.svg";
import DISLIKE_FILLED from "../../assets/dislikeIconFilled.svg";
import TypingIndicator from "../../components/TypingIndicator/TypingIndicator";
import { getBotResponse } from "../../utils/services/api";
import { updateConversation } from "../../utils/services/api";
import Loader from "../../components/Loader/Loader";
import {
  quickQuestions3,
  quickQuestions4,
  scrollToBottom,
} from "../../utils/helpers/rawData";

const DataDrivenChat = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { appData, dispatch } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [citationInnerWidth, setCitationInnerWidth] = useState(false);
  const [pageLoader, setPageLoader] = useState(true);
  const [inputText, setInputText] = useState("");
  const [leftWidth, setLeftWidth] = useState(null);
  const [rightWidth, setRightWidth] = useState(null);
  const [sentReqIndex, setSentReqIndex] = useState([]);
  let conversationId = searchParams.get("conversation_id");
  const keywords = [
    "I'm sorry",
    "I don't",
    "I apologize, but I can only provide information related to PNB IT policies",
    "I apologize",
    "How may I assist you?",
    "Hello! How can I assist you today?",
    "Hello! How can I assist you with PNB IT policies today?",
    "Hello! How can I assist you today with your company policy related queries?",
    "I am an assistant at Permodalan Nasional Berhad (PNB) who helps with company policy-related queries. How can I assist you today?",
  ];

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handlePdf = async (pdf_index, blob_links, blob_file_names) => {
    dispatch({
      type: "CITATION_BAR",
      payload: true,
    });
    await handleResize(pdf_index, true);
    dispatch({
      type: "ACTIVE_PDF_URL",
      payload: pdf_index,
    });
    dispatch({
      type: "blob_links",
      payload: {
        blob_links,
        blob_file_names,
      },
    });
  };

  const handleClearChat = (i) => {
    dispatch({
      type: "CITATION_BAR",
      payload: false,
    });
    dispatch({
      type: "ACTIVE_PDF_URL",
      payload: null,
    });
    dispatch({
      type: "deleteModal",
      payload: {
        flag: true,
        deleteConversationId: appData.dataDrivenChat.length - conversationId,
        index: conversationId,
      },
    });
  };

  const handleFeedback = async (feedback, i) => {
    dispatch({
      type: "feedbackModal",
      payload: {
        flag: true,
        feedbackValue: feedback,
        feedbackDesc: "",
        msgIndex: i,
        conversationId: appData?.dataDrivenChat.length - conversationId,
        queryType:
          window.location.pathname === "/ai_converser"
            ? "ai_driven"
            : "data_driven",
      },
    });
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

  const handleSubmit = (query) => {
    if (appData.showTabs) {
      dispatch({
        type: "SHOW_TABS",
        payload: false,
      });
    }
    if (query !== "") {
      setInputText("");
      if (window.location.search.includes("?new_conversation")) {
        dispatch({
          type: "GLOBAL_LOADING",
          payload: true,
        });
        setMessages((prev) => {
          return [
            ...prev,
            {
              From: "User",
              Message: query,
            },
          ];
        });
      } else {
        let cc = appData.dataDrivenChat;
        cc[conversationId]?.push({
          From: "User",
          Message: query,
        });
        dispatch({
          type: "DATA_DRIVEN_CHAT",
          payload: cc,
        });
      }
      setSentReqIndex(conversationId);
      handleQuery(query);
    }
  };

  function checkAndClip(statement) {
    const regex = /^[0-9]+\. /;

    if (regex.test(statement)) {
      const clippedSentence = statement.replace(regex, "");
      return clippedSentence;
    } else {
      return statement;
    }
  }

  const handleQuery = async (item) => {
    setLoading(true);
    let history = await getHistorySchema();
    try {
      let response = await getBotResponse(item, history);
      if (response?.data?.Quick_Questions) {
        dispatch({
          type: "addSuggestions",
          payload: response.data.Quick_Questions.split("\n").map((item) =>
            checkAndClip(item)
          ),
        });
      }
      setLoading(false);
      if (window.location.search.includes("?new_conversation")) {
        if (
          sentReqIndex == conversationId ||
          window.location.search.includes("new_conversation")
        ) {
          setMessages((prev) => {
            return [
              ...prev,
              {
                From: "Bot",
                Message: response?.data?.Response,
                Date: response?.data?.Response_Date,
                Description_feedback: null,
                Filenames: [...response?.data?.Filenames],
                Time: response?.data?.Response_Time,
                blob_link: [...response?.data?.Blob_name],
                feedback: null,
              },
            ];
          });
        }
      } else {
        let cc = appData.dataDrivenChat;
        cc[conversationId].push({
          From: "Bot",
          Message: response?.data?.Response,
          Date: response?.data?.Response_Date,
          Description_feedback: null,
          Filenames: [...response?.data?.Filenames],
          Time: response?.data?.Response_Time,
          blob_link: [...response?.data?.Blob_name],
          feedback: null,
        });
        dispatch({
          type: "DATA_DRIVEN_CHAT",
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
            : appData?.dataDrivenChat.length - conversationId,
        queryDate: response?.data?.User_query_date,
        queryTime: response?.data?.User_query_time,
        responseTime: response?.data?.Response_Time,
        responseDate: response?.data?.Response_Date,
        newConversation:
          messages === undefined || messages?.length === 0 ? "True" : "False",
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
        navigate("/data_driven_chat?conversation_id=0");
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
    }
  };

  const handleDrag = (e) => {
    let sidebarWidth = document.getElementById("aside")?.offsetWidth;
    if (e?.clientX !== 0) {
      setLeftWidth(e?.clientX - (appData.hideSidebar ? sidebarWidth : 0));
      setRightWidth(window?.innerWidth - e?.clientX);
      if (window?.innerWidth - e?.clientX < 220) {
        dispatch({
          type: "CITATION_BAR",
          payload: false,
        });
        setLeftWidth(
          window?.innerWidth - (appData.hideSidebar ? sidebarWidth : 0)
        );
      }
    }
  };

  const handleResize = (e, val) => {
    let mainWidth = document.getElementById("main").offsetWidth;
    let leftWidth = appData?.citationBar ? (mainWidth / 100) * 50 : mainWidth;
    let rightWidth = appData?.citationBar ? (mainWidth / 100) * 50 : mainWidth;
    if ((appData.citationBar || val == true) && window.innerWidth > 635) {
      setLeftWidth(leftWidth);
      setRightWidth(rightWidth);
    }
    if (window.innerWidth > 635) {
      setLeftWidth(mainWidth);
    }
  };

  const init = async () => {
    await handleResize();
  };

  function filterString(inputString) {
    const regex = /\[(.*?)\]/g; // Define the regex pattern
    const modifiedString = inputString.replace(regex, ''); // Remove arrays using regex
    return modifiedString;
  }

  useEffect(() => {
    scrollToBottom();
  });

  useEffect(() => {
    dispatch({
      type: "CITATION_BAR",
      payload: false,
    });
  }, [window.location.pathname]);

  useEffect(() => {
    if (appData?.citationBar === false) {
      let sidebarWidth = document.getElementById("aside")?.offsetWidth;
      if (window.innerWidth > 635) {
        setLeftWidth(
          window?.innerWidth - (appData.hideSidebar ? sidebarWidth : 0)
        );
      } else {
        setLeftWidth(window?.innerWidth);
      }
    }
  }, [appData?.citationBar]);

  useEffect(() => {
    setMessages(() => {
      if (conversationId && appData?.dataDrivenChat?.length)
        return appData?.dataDrivenChat[conversationId];
      else return [];
    });
    setTimeout(() => {
      setPageLoader(false);
    }, 0);
  }, [appData.dataDrivenChat, searchParams, window.location.pathname]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    dispatch({
      type: "addSuggestions",
      payload: [],
    });
    init();
    if (!appData.showTabs) {
      dispatch({
        type: "SHOW_TABS",
        payload: true,
      });
    }
    if (window.innerWidth < 635) {
      setLeftWidth(window.innerWidth);
      setRightWidth(window.innerWidth);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setInputText("");
  }, [window.location.pathname, searchParams]);

  useEffect(() => {
    if (window.location.search == "?new_conversation") {
      dispatch({
        type: "addSuggestions",
        payload: [],
      });
    }
  }, [window.location.pathname, window.location.search]);

  return (
    <div
      className= {`sm:min-w-[calc(100%_-_256px)] h-full flex gap-2 w-full bg-[#fff]`}
      id="main"
    >
      {appData.dataPageLoader || pageLoader ? (
        <div className="ilustration-container h-[calc(100%_-_125px)]  pt-[6.7rem] w-full flex justify-center items-center mt-4">
          <Loader />
        </div>
      ) : (
        <>
          {((!appData?.citationBar && window.innerWidth < 635) ||
            window.innerWidth > 635) && (
            <div
              className="h-100 sm:px-4 px-2 pb-4"
              style={{
                width: appData.hideSidebar ? leftWidth : leftWidth + 255,
                minWidth: "300px",
              }}
            >
              {messages?.length > 0 ? (
                <div
                  className={`flex ${
                    appData.botSuggestions
                      ? appData.botSuggestions?.length > 0
                        ? ` sm:h-[calc(100%_-_159px)] h-[calc(100%_-_125px)]  ilustration-container`
                        : `ilustration-sugg-container`
                      : `ilustration-sugg-container`
                  } w-full`}
                >
                  <div className="w-full">
                    <div className="clear-btn-cont w-100 flex justify-end h-12 py-2 gap-3 pe-5">
                      <button
                        className="flex items-center gap-2 h-auto pr-3 px-3 border-[1px] border-[#DCDCDC] rounded-[3px]"
                        onClick={handleClearChat}
                        disabled={appData.globalLoading}
                      >
                        <img className="h-[15px]" src={DELETE_ICON} alt="" />
                        <p className="text-[14px] text-[#696969]">Clear chat</p>
                      </button>
                    </div>
                    <div
                      className="messages-container-data-driven overflow-y-auto flex flex-col gap-5 sm:px-6"
                      id="chats-container"
                    >
                      {messages?.map((msg, i) => {
                        return (
                          <div
                            key={i}
                            className={`flex items-end gap-2 w-full ${
                              msg.From === "User"
                                ? "flex-row-reverse"
                                : "flex-row"
                            }`}
                          >
                            <img
                              className={`h-[40px] sm:h-[44px] ${
                                msg.From === "User"
                                  ? "pt-2"
                                  : "pt-2 mb-[0.7rem]"
                              } `}
                              src={msg.From === "User" ? USER : BOT}
                              alt=""
                            />
                            {msg.From === "User" ? (
                              <div className="relative msg user-msg max-w-[75%]  sm:max-w-[85%] flex-start bg-[#C4E5FF] py-2 px-4 rounded-[17px]">
                                <p className="text-[#424242] text-sm whitespace-pre-line break-words">
                                  {msg.Message}
                                </p>
                                <img
                                  className="absolute right-0 bottom-[-4px]"
                                  src={MSG_ARROW}
                                  alt=""
                                />
                              </div>
                            ) : (
                              <div
                                className={`msg bot-msg max-w-[75%]  sm:max-w-[85%] flex-end bg-[#F8F8F8] py-2 px-4  rounded-[25px] mb-5 relative z-[3]`}
                              >
                                <img
                                  className="absolute left-[-2px] bottom-[-6px] z-[0]"
                                  src={MSG_ARROW_BOT}
                                  alt=""
                                />
                                <p className="text-[#424242] text-sm whitespace-pre-line break-words">
                                  {msg?.Message == ""
                                    ? "Bot is unable to respond. Please try again"
                                    : filterString(msg?.Message)}
                                </p>
                                {msg?.blob_link?.length > 0 &&
                                  !keywords.some(
                                    (item) =>
                                      msg.Message.toLowerCase().includes(
                                        item.toLowerCase()
                                      ) || msg.Message == ""
                                  ) && (
                                    <div className="docs pt-3 mt-4 flex flex-wrap gap-2 border-t-[1px] border-[#D6D6D6]">
                                      {!keywords.some(
                                        (item) =>
                                          msg.Message.toLowerCase().includes(
                                            item.toLowerCase()
                                          ) || msg.Message == ""
                                      ) &&
                                        msg?.blob_link?.map((pdf, i) => {
                                          return (
                                            <div
                                              key={i}
                                              className="doc w-full flex items-center gap-2 py-[6px] px-4 rounded-full border-[1px] border-[#A2A2A2] cursor-pointer max-w-fit sm:max-w-[16rem]"
                                              onClick={() =>
                                                handlePdf(
                                                  i,
                                                  msg?.blob_link,
                                                  msg?.Filenames
                                                )
                                              }
                                            >
                                              <img
                                                className="h-fit"
                                                src={PDF_ICON}
                                                alt=""
                                              />
                                              <div className="flex items-center gap-3 w-[85%]">
                                                <p
                                                  title={msg?.Filenames[i]}
                                                  className="text-[12px] text-ellipsis overflow-hidden whitespace-nowrap w-full"
                                                >
                                                  {msg?.Filenames[i] ||
                                                    `Citation ${i + 1}`}
                                                </p>
                                              </div>
                                            </div>
                                          );
                                        })}
                                    </div>
                                  )}
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
                                        onClick={() =>
                                          handleFeedback("Positive", i)
                                        }
                                        src={LIKE}
                                        alt=""
                                      />
                                      <img
                                        className="cursor-pointer"
                                        onClick={() =>
                                          handleFeedback("Negative", i)
                                        }
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
                        <div className={`flex items-end gap-2 w-full flex-row`}>
                          <img className="h-[38px] " src={BOT} alt="" />
                          <div className="msg bot-msg max-w-[60%] flex-end bg-[#F8F8F8] p-1 rounded-[8px] rounded-bl-none relative w-fit">
                            <TypingIndicator />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`${
                    appData.botSuggestions
                      ? appData.botSuggestions?.length > 0
                        ? `ilustration-container`
                        : `ilustration-sugg-container`
                      : `ilustration-sugg-container`
                  } ilustration-container w-full flex justify-center items-center h-full`}
                >
                  <div className="pt-[2rem] h-full flex items-center justify-between flex-col w-full sm:px-16 px-2 gap-[2rem] overflow-y-auto">
                    <div
                      style={{
                        height: "calc(100% - 165px)",
                      }}
                      className="flex justify-center flex-col lg:min-w-[27rem]"
                    >
                      <img
                        className="h-[7rem] mb-2"
                        src={EMPTY_CHAT_ILLUSTRATION}
                        alt=""
                      />
                      <div className="text-center">
                        <h5 className="text-xl font-medium text-[24px] mb-1">
                          Hi There
                        </h5>
                        <p className="m-auto text-[#616161] text-sm max-w-[18rem] sm:max-w-[24rem]">
                          Welcome to our Data-Driven Technology Policy Bot. Get
                          personalized answers based on PNB Technology Policy
                          Documents. To access the document files,{" "}
                          <button
                            className="text-underline text-[#8ab4f8]"
                            onClick={() => {
                              window.open(
                                "https://mypnb.sharepoint.com/:u:/r/SitePages/eBPD%20Revamp%20-%20Policies%20Technology.aspx?csf=1&web=1&e=wVzZf7",
                                "_blank"
                              );
                            }}
                          >
                            click here
                          </button>
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:block suggestion-questions w-[100%] sm:max-w-[54rem]">
                      <div className="flex gap-2 w-full">
                        {quickQuestions3.map((item, i) => {
                          return (
                            <div
                              key={i}
                              className={`${
                                appData?.dataDrivenChat === undefined &&
                                "pointer-events-none"
                              } w-1/2 flex items-center justify-between gap-2 border-[1px] rounded-[8px] border-[#D4D4D4] hover:bg-[#F7F7FF] hover:border-[#292B5D] sm:bg-[#FAFAFA] bg-white py-3  sm:px-5 px-3 h-[67px] cursor-pointer`}
                              onClick={() => handleSubmit(item)}
                            >
                              <p
                                title={item}
                                className="h-auto text-sm w-[95%] ellipsis-text"
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
                      <div className="flex gap-2 mt-2">
                        {quickQuestions4.map((item, i) => {
                          return (
                            <div
                              key={i}
                              className={`${
                                appData?.dataDrivenChat === undefined &&
                                "pointer-events-none"
                              } w-1/2 flex items-center justify-between gap-2 border-[1px] rounded-[8px] border-[#D4D4D4] hover:bg-[#F7F7FF] hover:border-[#292B5D] sm:bg-[#FAFAFA] bg-white py-2  sm:px-5 px-3 h-[67px] cursor-pointer`}
                              onClick={() => handleSubmit(item)}
                            >
                              <p
                                title={item}
                                className="h-auto text-sm w-[95%] ellipsis-text"
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
                    </div>
                    <div className="sm:hidden flex overflow-auto webit-scroll-hidden scrollbar-hidden w-full gap-2 suggestion-questions sm:max-w-[54rem]">
                      <div className="flex gap-2 w-fit">
                        {quickQuestions3.map((item, i) => {
                          return (
                            <div
                              key={i}
                              className={`${
                                appData?.dataDrivenChat === undefined &&
                                "pointer-events-none"
                              } w-[18rem] flex items-center justify-between gap-2 border-[1px] rounded-[8px] border-[#D4D4D4] hover:bg-[#F7F7FF] hover:border-[#292B5D] sm:bg-[#FAFAFA] bg-white py-3  sm:px-5 px-3 h-[67px] cursor-pointer`}
                              onClick={() => handleSubmit(item)}
                            >
                              <p
                                title={item}
                                className="h-auto text-sm w-[95%] ellipsis-text"
                              >
                                {item}
                              </p>
                              <img
                                className="h-[13px]"
                                src={RIGHT_ARROW}
                                alt=""
                              />
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex gap-2">
                        {quickQuestions4.map((item, i) => {
                          return (
                            <div
                              key={i}
                              className={`${
                                appData?.dataDrivenChat === undefined &&
                                "pointer-events-none"
                              } w-[18rem] flex items-center justify-between gap-2 border-[1px] rounded-[8px] border-[#D4D4D4] hover:bg-[#F7F7FF] hover:border-[#292B5D] sm:bg-[#FAFAFA] bg-white py-2  sm:px-5 px-3 h-[67px] cursor-pointer`}
                              onClick={() => handleSubmit(item)}
                            >
                              <p
                                title={item}
                                className="h-auto text-sm w-[95%] ellipsis-text"
                              >
                                {item}
                              </p>
                              <img
                                className="h-[13px]"
                                src={RIGHT_ARROW}
                                alt=""
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {
                <>
                  <div className="hidden sm:flex items-center justify-center gap-[0.5rem] px-12">
                    {appData.botSuggestions?.length > 0 && (
                      <div className="w-fit p-2 flex items-center justify-center gap-[0.5rem] border-[2px] border-[#DCDCDC] bg-[#F8F8F8] rounded-[6px] pt-[28px] relative">
                        <span className="absolute top-[7px] left-[10px] text-[12px] fw-[600]">
                          Frequently Asked Questions (FAQs)
                        </span>
                        {appData.botSuggestions?.map((singleSuggestion, i) => {
                          return (
                            <div
                              title={singleSuggestion}
                              onClick={() => {
                                dispatch({
                                  type: "addSuggestions",
                                  payload: [],
                                });
                                handleSubmit(singleSuggestion);
                              }}
                              className={`h-[3.1rem] cursor-pointer flex items-center max-w-[12rem] md:max-w-[30rem] border-[1.5px] text-[#005DA8] border-[#005DA8] bg-white rounded-[5px] px-4 py-[2px] text-[13px] ${
                                appData?.globalLoading && "pointer-events-none"
                              }`}
                            >
                              <div className="ellipsis-text2">
                                {singleSuggestion}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div className="sm:hidden flex items-center overflow-auto webit-scroll-hidden gap-[0.5rem] w-full">
                    {appData.botSuggestions?.length > 0 &&
                      appData.botSuggestions?.map((singleSuggestion, i) => {
                        return (
                          <div
                            key={i}
                            title={singleSuggestion}
                            onClick={() => {
                              dispatch({
                                type: "addSuggestions",
                                payload: [],
                              });
                              handleSubmit(singleSuggestion);
                            }}
                            className={`h-[3.5rem] cursor-pointer flex items-center min-w-[18rem] sm:min-w-[0rem] md:max-w-[30rem] border-[1.5px] text-[#005DA8] border-[#005DA8] rounded-[5px] px-4 py-2 text-[13px] ${
                              appData?.globalLoading && "pointer-events-none"
                            }`}
                          >
                            <div className="ellipsis-text2">
                              {singleSuggestion}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </>
              }
              <div className="message-footer-container h-[57px] mt-[10px] w-100">
                <div className="input-container h-full bg-white border-[1px] border-[#EEEEEE] rounded-[10px] px-4 py-[9px]">
                  <div className="input h-full flex items-center justify-between bg-[#FAFAFA] border-[1px] border-[#F1F1F1] rounded-full overflow-hidden px-4">
                    <form
                      className="h-full w-full items-center flex"
                      onSubmit={(e) => {
                        e.preventDefault();
                        dispatch({
                          type: "addSuggestions",
                          payload: [],
                        });
                        handleSubmit(inputText);
                      }}
                    >
                      <input
                        className="h-full bg-[#FAFAFA] outline-0 text-sm placeholder:text-sm"
                        name="input"
                        onChange={handleChange}
                        placeholder={"Ask a Question"}
                        autoComplete="off"
                        value={inputText}
                        disabled={
                          appData?.dataDrivenChat === undefined ||
                          appData?.globalLoading
                        }
                      />
                      <button type="submit" className="right-0 w-fit">
                        <img className="w-[17px]" src={SEND_ARROW} alt="" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {appData?.citationBar && (
        <div
          className={`citationbar bg-[#FCFCFC] border-s-[1px] border-[#EDEDED]`}
          id="Resizable2"
          draggable={"true"}
          style={{
            width: rightWidth,
          }}
        >
          {!(window.innerWidth < 635) && (
            <button
              className="divider-hitbox outline-0 bg-[#fff] border-[1px] border-[#DEDEDE] rounded-[100%] h-7 w-7 p-[4px] absolute top-[50%] left-[sm] cursor-ew-resize"
              onDrag={handleDrag}
              onDragEnd={() => {
                setCitationInnerWidth(!citationInnerWidth);
              }}
            >
              <img
                className="cursor-ew-resize h-[13rem] transform translate-x-[-7px] translate-y-[-94px] max-w-[2rem] p-[7px]"
                draggable={"true"}
                src={DRAG_BTN_ICON}
                alt=""
              />
            </button>
          )}
          <Citation
            setLeftWidth={setLeftWidth}
            citationInnerWidth={citationInnerWidth}
            rightWidth={rightWidth}
          />
        </div>
      )}
    </div>
  );
};

export default DataDrivenChat;
