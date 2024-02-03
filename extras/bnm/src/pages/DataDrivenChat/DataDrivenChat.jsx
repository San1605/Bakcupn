import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SEND_ARROW from "../../assets/sendArrow.svg";
import DELETE_ICON from "../../assets/deleteIcon.svg";
import EMPTY_CHAT_ILLUSTRATION from "../../assets/emptyChat.svg";
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
  quickQuestions3Images,
  quickQuestions4Images,
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
  const [dragging, setDragging] = useState(true);
  const [leftWidth, setLeftWidth] = useState(null);
  const [rightWidth, setRightWidth] = useState(null);
  const [sentReqIndex, setSentReqIndex] = useState([]);
  const [activeTab] = useState("Data-driven Chat");
  let conversationId = searchParams.get("conversation_id");
  const keywords = [
    "I'm sorry",
    "I don't",
    "I apologize, but I can only provide information related to BNM banking policies",
    "I apologize",
    "How may I assist you?",
    "Hello! How can I assist you today?",
    "Hello! How can I assist you with BNM banking policies today?",
    "Hello! How can I assist you today with your company policy related queries?"
  ];
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
    // console.log(feedback);
  };

  // const getPdfName = (pdf) => {
  //   let pdfArr = pdf.split("/");
  //   return pdf.split("/")[pdf.split("/").length - 1];
  // };

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

  const handleQuery = async (item) => {
    // console.log("HandleQuery Started ==> ", item);
    setLoading(true);
    let history = await getHistorySchema();
    try {
      // console.log(messages, "messagessssssss");
      // console.log(history, "historyyyyy");
      let response = await getBotResponse(item, "data_driven", history);
      // console.log("response", response);
      setLoading(false);
      if (window.location.search.includes("?new_conversation")) {
        if (
          sentReqIndex == conversationId ||
          window.location.search.includes("new_conversation")
        ) {
          setMessages((prev) => {
            // console.log("inner prev", prev);
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
        queryType: "data_driven",
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
      // console.log("payload2=====>......", payload2);
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
      // toast.error("Bot is not responding...");
    }
  };

  const handleDrag = (e) => {
    let sidebarWidth = document.getElementById("aside")?.offsetWidth;
    if (e?.clientX !== 0) {
      setLeftWidth(e?.clientX - sidebarWidth);
      setRightWidth(window?.innerWidth - e?.clientX);
      if (window?.innerWidth - e?.clientX < 220) {
        // setCitationBar(false);
        dispatch({
          type: "CITATION_BAR",
          payload: false,
        });
        setLeftWidth(window?.innerWidth - sidebarWidth);
      }
    }
  };

  const handleResize = (e, val) => {
    let mainWidth = document.getElementById("main").offsetWidth;
    let leftWidth = appData?.citationBar ? (mainWidth / 100) * 50 : mainWidth;
    let rightWidth = appData?.citationBar ? (mainWidth / 100) * 50 : mainWidth;
    // console.log("e, appData.citationBar, val", e, appData.citationBar, val);
    if ((appData.citationBar || val == true) && window.innerWidth > 635) {
      // console.log(leftWidth, rightWidth, "widthsssssssssss");
      setLeftWidth(leftWidth);
      setRightWidth(rightWidth);
    } else {
      // if (window.innerWidth < 635) {
      //   console.log("window.innerWidth < 635",window.innerWidth < 635);
      //   setLeftWidth(mainWidth);
      //   setRightWidth(mainWidth);
      // }
      // setLeftWidth(leftWidth + rightWidth);
      // setRightWidth(leftWidth + rightWidth);
    }
    // console.log("resize called");
    if (window.innerWidth > 635) {
      setLeftWidth(mainWidth);
    }
  };

  const init = async () => {
    if (appData.dataPageLoader) {
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
    await handleResize();
  };

  useEffect(() => {
    scrollToBottom();
    // console.log(messages, "qwert");
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
        setLeftWidth(window?.innerWidth - sidebarWidth);
      } else {
        setLeftWidth(window?.innerWidth);
      }
    } else {
      // let sidebarWidth = document.getElementById("aside")?.offsetWidth;
      // let mainWidth = document.getElementById("main").offsetWidth;
      // let leftWidth = mainWidth / 2;
      // let rightWidth = mainWidth / 2;
      // setLeftWidth(leftWidth);
      // setRightWidth(rightWidth);
    }
  }, [appData?.citationBar]);

  useEffect(() => {
    setMessages(() => {
      if (conversationId && appData?.dataDrivenChat?.length)
        return appData?.dataDrivenChat[conversationId];
      else return [];
    });
    // console.log(appData.dataPageLoader, pageLoader);
    setTimeout(() => {
      // console.log(appData.dataPageLoader, pageLoader,'in settimeout');
      setPageLoader(false);
    }, 0);
    // if (window.location.search === "?new_conversation") {
    //   setMessages([]);
    // }
  }, [appData.dataDrivenChat, searchParams, window.location.pathname]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
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

  return (
    <div
      className="data-driven-page h-full flex gap-2 w-full bg-[#FCFCFF]"
      id="main"
    >
      {appData.dataPageLoader || pageLoader ? (
        <div className="ilustration-container w-full flex justify-center items-center h-full mt-4">
          <Loader />
        </div>
      ) : (
        <>
          {((!appData?.citationBar && window.innerWidth < 635) ||
            window.innerWidth > 635) && (
            <div
              className="h-100 sm:px-4 px-2 pb-4"
              style={{
                width: leftWidth,
                minWidth: "300px",
              }}
            >
              {messages?.length > 0 ? (
                <>
                  <div className="flex ilustration-container w-full">
                    <div className="w-full">
                      <div className="clear-btn-cont w-100 flex justify-end h-12 py-2 gap-3 pe-5">
                        <button
                          className="flex items-center gap-2 h-auto pr-3 px-3 border-[1px] border-[#DCDCDC] rounded-[3px]"
                          onClick={handleClearChat}
                        >
                          <img className="h-[15px]" src={DELETE_ICON} alt="" />
                          <p className="text-[14px] text-[#696969]">
                            Clear chat
                          </p>
                        </button>
                      </div>
                      <div
                        className="messages-container-data-driven overflow-y-auto flex flex-col gap-5 px-4"
                        id="chats-container"
                      >
                        {messages?.map((msg, i) => {
                          return (
                            <div
                              key={i}
                              className={`flex w-full ${
                                msg.From === "User"
                                  ? "flex-row-reverse"
                                  : "flex-row"
                              }`}
                            >
                              {msg.From === "User" ? (
                                <div className="msg user-msg max-w-[85%] flex-start bg-[#EFF5FF] p-2 rounded-[8px] rounded-br-none">
                                  <p className="text-[#424242] text-sm whitespace-pre-line">
                                    {msg.Message}
                                  </p>
                                </div>
                              ) : (
                                <div
                                  className={`msg bot-msg max-w-[85%] flex-end bg-[#F8F8F8] p-2 rounded-[8px] mb-5 rounded-bl-none relative z-[3]`}
                                >
                                  <p className="text-[#424242] text-sm whitespace-pre-line">
                                    {msg.Message}
                                  </p>
                                  {msg?.blob_link?.length > 0 &&
                                    !keywords.some((item) =>
                                      msg.Message.includes(item)
                                    ) && (
                                      <div className="docs pt-3 mt-4 flex flex-wrap gap-2 border-t-[1px] border-[#D6D6D6]">
                                        {!keywords.some((item) =>
                                          msg.Message.includes(item)
                                        ) &&
                                          msg?.blob_link?.map((pdf, i) => {
                                            return (
                                              <div
                                                key={i}
                                                className="doc w-full flex items-center gap-2 py-[6px] px-4 rounded-full border-[1px] border-[#A2A2A2] cursor-pointer max-w-fit sm:max-w-[12rem]"
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
                          <div className="msg bot-msg max-w-[60%] flex-end bg-[#F8F8F8] p-1 rounded-[8px] rounded-bl-none relative w-fit">
                            <TypingIndicator />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className=" ilustration-container w-full flex justify-center items-center h-full">
                  <div className="pt-[2rem] h-full flex items-center justify-between flex-col w-full sm:px-16 px-2 gap-[2rem] overflow-y-auto">
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
                          A data-driven chatbot personalizes chat experiences
                          using BNM's policy document.
                        </p>
                      </div>
                    </div>
                    <div className="suggestion-questions mb-5 w-[100%] sm:max-w-[60rem]">
                      <div className="flex gap-2 w-full">
                        {quickQuestions3?.map((item, i) => {
                          return (
                            <div
                              key={i}
                              className={`${
                                appData?.dataDrivenChat === undefined &&
                                "pointer-events-none"
                              }  w-1/2 sm:w-1/3 flex items-center justify-between gap-2 border-[1px] rounded-[8px] border-[#D4D4D4] bg-white sm:bg-[#FAFAFA] hover:bg-[#F7F7FF] hover:border-[#292B5D] py-2 sm:px-5 px-3 h-[67px] sm:h-[55px] cursor-pointer`}
                              onClick={() => handleSubmit(item)}
                            >
                              <img
                                className=" sm:hidden inline-block h-[16px] w-[16px]"
                                src={quickQuestions3Images[i]}
                                alt=""
                              />
                              <p
                                title={item}
                                className="h-auto text-sm w-[91%] ellipsis-text"
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
                      <div className="flex gap-2 mt-2">
                        {quickQuestions4.map((item, i) => {
                          return (
                            <div
                              key={i}
                              className={`${
                                appData?.dataDrivenChat === undefined &&
                                "pointer-events-none"
                              } w-1/2 flex items-center justify-between gap-2 border-[1px] rounded-[8px] border-[#D4D4D4] hover:bg-[#F7F7FF] hover:border-[#292B5D] sm:bg-[#FAFAFA] bg-white py-2  sm:px-5 px-3 h-[67px] sm:h-[55px] cursor-pointer`}
                              onClick={() => handleSubmit(item)}
                            >
                              <img
                                className=" sm:hidden inline-block h-[16px] w-[16px]"
                                src={quickQuestions4Images[i]}
                                alt=""
                              />
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
                  </div>
                </div>
              )}
              <div className="message-footer-container h-[57px] mt-[10px] w-100">
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
              onDragStart={() => setDragging(true)}
              onDragEnd={() => {
                setCitationInnerWidth(!citationInnerWidth);
                setDragging(false);
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