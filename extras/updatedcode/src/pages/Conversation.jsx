import React, { useEffect, useRef, useState, useContext } from "react";
// import Header from "../components/Header";
import bot from "../assets/images/bot.webp";
import user from "../assets/images/user.webp";
import likedisabled from "../assets/images/likedisabled.webp";
import likeenabled from "../assets/images/likeenabled.webp";
import dislikedisabled from "../assets/images/dislikedisabled.webp";
import dislikeenabled from "../assets/images/dislikeenabled.webp";
import send from "../assets/images/send.webp";
import { ThreeDots } from "react-loader-spinner";
import PlayIcon from "../assets/images/play-icon.svg";
import PauseIcon from "../assets/images/pause-icon.svg";
import axios from "axios";
import { baseurl } from "../config";
import "../assets/css/conversation.css";
import arrowDown from "../assets/images/arrowDown.webp";
import { Context } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { InteractionStatus } from '@azure/msal-browser';
import { toast } from "react-hot-toast";
import { sampleQustions } from "../context/sampleQuestions";
import SuggestionPopup from "../components/SuggestionPopup";
import backward from "../assets/images/backward.webp";
// import showImages from "../assets/images/BACKGROUND_2.webp";
import showImages from "../assets/images/BACKGROUND_2.webp";
import rightarrow from "../assets/images/rightarrow.webp";
import ImageModal from "../components/ImageModal";
import up from "../assets/images/up.webp";
import botaudio from "../assets/images/audio_bot.svg";
import down from "../assets/images/down.webp";
import cross from "../assets/images/cross.webp";
import SuggestionLarge from "../components/SuggestionLarge";
import { Button } from "react-bootstrap";
import ShowImage from "../components/model/ShowImage";
import Empty from "../assets/images/EmptyState.svg"
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../authConfig";
import { useMsal } from "@azure/msal-react";
import { BsStarFill } from 'react-icons/bs';
const Conversation = () => {
  const { suggestionPlay, setSuggestionPlay, conversation, setConversation } = useContext(Context)
  const currentTime = new Date();
  const chatContainerRef = useRef(null);
  const suggestionContainerRef = useRef(null);
  const [userInput, setUserInput] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [Rating, setRating] = useState([])

  const [data, setData] = useState([
    "Lorem ipsum dolor sit amet ipsum dolor.",
    "Lorem ipsum dolor sit amet ipsum dolor",
  ]);
  const [showreason, setShowReason] = useState(false);
  const [reason, setReason] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isNewMessageAdded, setIsNewMessageAdded] = useState(false);

  const [loading, setLoading] = useState(false);
  const [emptyReason, setEmptyReason] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [keyWordToggle, setKeyWordToggle] = useState(false);
  const [keywordSuggestions, setKeywordSuggestions] = useState(false);
  const [dislikeReason, setDislikeReason] = useState("");
  const { keyword, token, setToken, socket, Authtoken, SetAuthToken, extensionId, callid } = useContext(Context);
  const [keywordLoad, setKeywordLoad] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [Input, setInput] = useState("")
  const navigate = useNavigate();
  const msalInstance = new PublicClientApplication(msalConfig);
  useEffect(() => {
    if (socket) {
      socket.on("suggestion", (response) => {
        const newMessage = {
          user: "user",
          message: response.text,
          images: response?.data?.images || [],
          suggestions: [],
          time: new Date().toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
        };
        if (suggestionPlay) {
          setConversation((prevConversation) => [
            ...prevConversation,
            newMessage,
          ])
        }
      })

      console.log(socket, "shjskjs")

      socket.on("answer", (response) => {
        const newMessage = {
          user: "bot",
          message: response.channelData.data.output,
          images: response?.channelData.data?.images,
          suggestions: response?.channelData?.data?.suggested_questions,
          time: new Date().toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
        };
        if (suggestionPlay) {
          setConversation((prevConversation) => [
            ...prevConversation,
            newMessage,
          ])
        }
      });
      if (socket) {
        socket.on("start", (response) => {
          setConversation([])
          console.log(response, "call connected");
          console.log(response, "starttt")
        })
      }
      socket.on("end", (response) => {
        // setConversation([])
        handleRatingCall()
      })

      return () => {
        socket.off("suggestion")
        socket.off("answer")
        socket.off("end")
      }
    }
  }, [socket, extensionId, suggestionPlay])
  console.log(conversation, "conversation");
  const scrollToBottom = () => {
    const chatContainer = chatContainerRef.current;
    console.log("chatcontainer")
    if (chatContainer && !isScroll) {
      console.log("chatcontainer")
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  const shouldScroll = () => {
    if (
      chatContainerRef.current.scrollTop <
      chatContainerRef.current.scrollHeight -
      chatContainerRef.current.offsetHeight -
      2
    ) {
      if (!isScroll) {
        setIsScroll(true);
      }
    } else {
      setIsScroll(false);
    }
  };
  const play = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };
  // const scrollToBottom = () => {
  //   const chatContainer = chatContainerRef.current;
  //   console.log("chatContainer")
  //   chatContainer?.scrollTo({
  //     top: chatContainer.scrollHeight,
  //     behavior: "smooth",
  //   });
  // };

  function makeLink(string) {
    let modifiedString = string.replace(
      /\$%\$([\s\S]*?)\$%\$/g,
      '<a href="$1" target="_blank" style="color: blue; text-decoration: underline;">$1</a>'
    ).replace(/\n/g, '<br/>');
    let htmlString = { __html: modifiedString };
    return <div dangerouslySetInnerHTML={htmlString}></div>;
  }


  const HandleRating = (message, rating, reason) => {

    if (rating === "") {
      setEmptyReason(true)
    }
    else {
      const msg = {
        message: message,
        rating: rating,
        reason: reason,
        extentionId: extensionId,
        callId: callid
      }
      setRating((prevrating) => [...prevrating, msg])
      setReason("")
      setInput('')
      setShowReason(false)
    }
  }


  console.log(Rating, "ratinfffd")

  // const shouldScroll = () => {
  //   if (
  //     chatContainerRef.current.scrollTop <
  //     chatContainerRef.current.scrollHeight -
  //     chatContainerRef.current.offsetHeight -
  //     2
  //   ) {
  //     if (!isScroll) {
  //       setIsScroll(true);
  //     }
  //   } else {
  //     setIsScroll(false);
  //   }
  // };
  const handleSubmit = () => {
    let prompt = userInput;
    if (prompt.trim() !== "") {
      setLoading(true);
      setIsNewMessageAdded(true);
      const currentTime = new Date();
      setConversation((prevState) => [
        ...prevState,
        {
          user: "user",
          message: prompt,
          suggestions: [],
          time: `${currentTime.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}`,
        },

      ]);
      setUserInput("");
      const formData = new FormData();
      formData.append("input", prompt);
      formData.append("refresh", refresh);
      // formData.append("quicklink", quicklink);
      axios
        .post(`${baseurl}/chatbot`, formData, {
          headers: {
            Authorization: `${Authtoken}`,
          },
        })
        .then((res) => {
          if (res?.status === 200) {
            let botResponse = {
              user: "bot",
              message: res.data.output,
              images: res.data.images,
              suggestions: res.data.suggested_question,
              time: `${currentTime.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}`,
              feedback: 2,
            };
            setConversation((prevState) => [...prevState, botResponse]);
            setRefresh(false);
          }
          setLoading(false);
          setIsNewMessageAdded(true);
          scrollToBottom();
        })
        .catch((err) => {
          console.log(err);
          if (err?.response?.status === 401) {
            toast.error("Session expired please login again", {
              id: "login-toast",
            });
            setToken(false);
            navigate("/login");
          }
        });
    }
  };
  const DataImage = [
    "https://swiperjs.com/demos/images/nature-1.jpg",
    "https://swiperjs.com/demos/images/nature-1.jpg",
    "https://swiperjs.com/demos/images/nature-1.jpg",
  ];
  const handleKeywordClick = (word, index) => {
    setKeyWordToggle(index);
    setKeywordLoad(true);
    setKeywordSuggestions(false);
    const formData = new FormData();
    formData.append("keyword", word);
    axios
      .post(`${baseurl}/quicklink`, formData, {
        // headers: {
        //   Authorization: `${token}`,
        // },
      })
      .then((res) => {
        setKeywordLoad(false);
        setKeywordSuggestions(res.data.suggested_question);
      })
      .catch((err) => console.log(err));
  };
  const handleReset = () => {
    setConversation([]);
    setRefresh(true);
    setIsScroll(false);
  };
  console.log(showreason, "index or msg no .")
  const handleCloseModal = () => {
    setShowModal(false);
  };

  let objDiv = document.getElementById("chatContainer");
  useEffect(() => {
    console.log("chatcontainer1")
    scrollToBottom();
    if (objDiv && !isScroll) {

      objDiv.scrollTop = objDiv?.scrollHeight;
    }
    setIsNewMessageAdded(false);

    // Check if scroll is at the bottom
  }, [conversation, isNewMessageAdded]);
  
  const dummyData=[
    {
        "message": "message",
        "rating": "31",
        "reason": "reason",
        "extentionId": "extensionId",
        "callId": "callid"
    },
    {
        "message": "message",
        "rating": "32",
        "reason": "reason",
        "extentionId": "extensionId",
        "callId": "callid"
    },
    {
        "message": "message",
        "rating": "33",
        "reason": "reason",
        "extentionId": "extensionId",
        "callId": "callid"
    }
]

  const handleRatingCall = () => {
    //     const FormData = require('form-data');
    // let data = new FormData();
    // data.append('data', Rating);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://aacox-az-dev-bot.azurewebsites.net/api/feedback',
      data: dummyData
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div
      className=" h-full shadow-md rounded-lg bg-cover border-1 border-[#E7E7E7] bg-no-repeat bg-right-bottom flex flex-col justify-between overflow-hidden"
      style={{ border: "1px solid #E7E7E7 !important" }}
    >
   <button onClick={()=>handleRatingCall()}>Handle Rating api calll</button>
      <div className="flex align-start h-full">

        <div className="flex flex-col h-full w-full">
          <div className="header">
            <img src={botaudio} alt="bot-audio" />
            <h4 className="text-gray-700 font-open-sans text-base font-semibold">Knowledge Miner</h4>
            <div className="d-flex items-center justify-content-center h-6 min-w-[5.4rem]">
              {suggestionPlay ? (
                <div onClick={() => setSuggestionPlay(false)} className="pause-btn flex background-[#00829B] align-items-center py-1 px-2">
                  <img src={PlayIcon} alt="PauseIcon" />
                  <p className="text-14px text-white m-0 py-1">Stop Knowledge Miner</p>
                </div>
              ) : (
                <div onClick={() => setSuggestionPlay(true)} className="play-btn flex background-[#00829B] align-items-center py-1 px-2">
                  <img src={PauseIcon} alt="PlayIcon" />
                  <p className="text-14px text-white m-0 py-1">Start Knowledge Miner</p>
                </div>
              )}
            </div>
          </div>
          <div className="h-[calc(100%_-_110px)] flex flex-col-reverse relative overflow-hidden p-2">
            <div
              className="h-full chatContainer overflow-auto"
              id="chatContainer"
              ref={chatContainerRef}
              onScroll={shouldScroll}
            >
              {conversation.length === 0 ? (
                <div className="w-full h-full flex justify-center items-center">
                  <div className="flex flex-col  w-1/2"> <img className="w-[170px]" src={Empty} alt="emptydata" />
                    Suggested question
                    will appear after playing audio
                  </div>




                </div>
              ) : (
                <div className="h-full flex flex-col gap-2">
                  {conversation.slice().map((message, index) => {
                    if (message.user === "bot") {
                      return (
                        <div>
                          <div
                            key={index}
                            className="flex flex-col justify-start relative "
                          >
                            <div
                              style={{
                                wordBreak: "break-word",
                                whiteSpace: "pre-line",
                              }}
                              className={`flex flex-col items-start gap-[12px] bg-[#E5EEF5] capitalize-line rounded px-4 py-2 ml-2 shadow max-w-[80%]  w-[80%]`}
                            >
                              <div className="p-3 flex items-start gap-4 rounded-md bg-white text-gray-700 font-open-sans text-[14px]" onClick={() => setShowModal(index + 1)}>
                                {" "}
                                {makeLink(message.message)}
                              </div>


                              {message?.images?.length > 0 && (
                                <div
                                  className="ml-4"
                                  onClick={() => setShowModal(index + 1)}
                                >
                                  <img
                                    className="h-6 cursor-pointer"
                                    alt="showimage"
                                    src={showImages}
                                  />
                                </div>
                              )}


                            </div>


                            {showModal === index + 1 && (
                              <div
                                className={`z-50 absolute max-w-[90%] right-3 md:top-[100%] pb-4
                           `}
                              >
                                <ShowImage
                                  message={message?.message}
                                  images={message?.images}
                                  onClose={handleCloseModal}
                                  showModal={showModal}
                                  setShowModal={setShowModal}
                                />
                              </div>
                            )}
                            <div className="flex items-center mt-2 w-[80%] justify-end">
                              {/* <img
                                      className="h-5 mr-2 cursor-pointer"
                                      src={dislikedisabled}
                                      alt=""
                                      onClick={() => setShowReason(index + 1)}
                                    // onClick={() => handleFeedback(index, 0 , "Wrong Answer")}
                                    /> */}
                              <BsStarFill className="h-5 mr-2 cursor-pointer" onClick={() => setShowReason(index + 1)} />
                            </div>
                            {showreason && (
                              <div
                                style={{
                                  top: "0 !important",
                                  left: "0 !important",
                                }}
                                className={`fixed top-0 left-0  h-[100vh] w-[100vw] flex items-center justify-center z-10 backdrop-blur-sm backdrop-brightness-95 transition-opacity duration-300 ${showreason
                                  ? "opacity-100 z-10000000"
                                  : "opacity-0"
                                  }`}
                              >
                                <div className="bg-[#FBFBFB] p-4 rounded-md border border-[#D6D6D6] absolute z-10 w-80 md:w-96 shadow-md ">
                                  <div className="flex justify-between mb-4">
                                    <div className="font-semibold text-base">
                                      Rating
                                    </div>
                                    <div
                                      onClick={() => {
                                        setShowReason(false);
                                        setDislikeReason("");
                                        setReason("");
                                        setInput("")
                                      }}
                                      className="mr-2 cursor-pointer"
                                    >
                                      <img className="h-6" src={cross} alt="" />

                                    </div>
                                  </div>
                                  <div className="max-h-[20rem] text-sm md:max-h-fit overflow-y-auto z-20">
                                    <div className="">
                                      <div>Please select a rating</div>
                                      <select
                                        className="block w-[99%] ms-0.5 p-2 cursor-pointer border-0 outline mt-1 outline-gray-300 rounded border-r-[12px] border-r-white"
                                        value={reason}
                                        onChange={(event) => {
                                          if (
                                            event.target.value === "Other" ||
                                            event.target.value === ""
                                          ) {
                                            setDislikeReason("");
                                          } else {
                                            setDislikeReason(
                                              event.target.value
                                            );
                                          }
                                          setReason(event.target.value);
                                          setEmptyReason(false);
                                        }}
                                      >
                                        <option value="">
                                          Select a rating
                                        </option>
                                        <option value="1">
                                          ⭐
                                        </option>
                                        <option value="2">
                                          ⭐⭐                                          </option>
                                        <option value="3">
                                          ⭐⭐⭐
                                        </option>
                                        <option value="4">⭐⭐⭐⭐</option>
                                        <option value="5">⭐⭐⭐⭐⭐</option>
                                      </select>
                                      <div className="mt-2">
                                        <input
                                          type="text"
                                          className="w-full p-2 border mt-1 border-gray-300 rounded"
                                          placeholder="Enter other reason"
                                          // value={otherReason}
                                          onChange={(event) => {
                                            if (event.target.value) {
                                              setInput(
                                                event.target.value
                                              );
                                              setEmptyReason(false);
                                            }
                                          }}
                                        />
                                      </div>
                                      {emptyReason && (
                                        <span className="p-2 text-[12px] text-[#ff0000]">
                                          Please Fill Rating
                                        </span>
                                      )}
                                      <div className="mt-2 flex justify-end">
                                        <button
                                          className="px-4 py-2 text-sm text-white rounded bg-[#00829B] cursor-pointer"
                                          // onClick={() => {
                                          //   handleFeedback(
                                          //     showreason - 1,
                                          //     0,
                                          //     dislikeReason
                                          //   );
                                          // }}
                                          onClick={() => { HandleRating(message.message, reason, Input) }}
                                        // disabled={(dislikeReason.length == 0)}
                                        >
                                          Submit
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    } else if (message.user === "user") {
                      return (
                        <div key={index} className="flex justify-end mt-3">
                          <div className="bg-[#EFF6F8] rounded px-4 py-2 mr-2 shadow max-w-[80%] w-[80%] text-[14px]" onClick={() => setShowModal(index + 1)}>
                            {makeLink(message.message)}
                            <div className="text-xs text-zinc-500 mt-2 text-[14px]">
                              {message.time}
                            </div>
                          </div>
                          {showModal === index + 1 && (
                            <div
                              className={`z-50 absolute max-w-[90%] right-3 md:top-[100%] pb-4
                           `}
                            >
                              <ShowImage
                                message={message?.message}
                                images={message?.images}
                                onClose={handleCloseModal}
                                showModal={showModal}
                                setShowModal={setShowModal}
                              />
                            </div>
                          )}
                        </div>
                      )
                    }
                  })}
                </div>
              )}
              {loading && (
                <div className="flex justify-start mt-3">
                  <img className="h-8" src={bot} alt="" />
                  <div className="bg-[#FFF3ED] rounded px-4 py-2 ml-2 shadow max-w-[75%] md:max-w-[40%]">
                    <ThreeDots
                      height="20"
                      width="60"
                      radius="9"
                      color="#000"
                      ariaLabel="three-dots-loading"
                      visible={true}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          {isScroll && (
            <div
              id="scrollToDownBtn"
              className="mr-4 mb-44 md:mb-20 shadow-md "
              onClick={() => {
                if (objDiv) {
                  objDiv.scrollTop = objDiv?.scrollHeight;
                }
              }}
              style={{ color: "blue" }}
            >
              <img src={arrowDown} alt="" />
            </div>
          )}

          <div className=" py-4 h-[15%] flex md:hidden gap-2 bg-[#F4F9FA] items-center overflow-x-scroll ">
            {keyword &&
              keyword.map((word, index) => {
                return (
                  <div key={index}>
                    <div
                      className={`flex p-2 px-4 capitalize justify-center items-center gap-2 cursor-pointer rounded-lg ${index === keyWordToggle
                        ? " bg-[#00829B] text-[#ffffff] "
                        : "bg-white text-black"
                        } text-base font-normal no-wrap w-fit whitespace-nowrap`}
                      onClick={() => {
                        if (index === keyWordToggle) {
                          setKeyWordToggle(false);
                          setKeywordSuggestions(false);
                        } else {
                          handleKeywordClick(word, index);
                        }
                      }}
                    >
                      {keywordLoad && keyWordToggle === index ? (
                        <div className="flex justify-center">
                          <ThreeDots
                            height="20"
                            width="60"
                            radius="9"
                            color="#ffffff"
                            ariaLabel="three-dots-loading"
                            visible={true}
                          />
                        </div>
                      ) : (
                        <div className="capitalize-line">{word}</div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="h-fit">
            <div className="flex shadow bg-white mx-3 pl-4 pr-1 py-1 rounded-lg border-b-[0.2rem] border-b-white focus-within:border-[#00829B] ">
              <input
                onChange={(e) => setUserInput(e.target.value)}
                value={userInput}
                placeholder="Write your queries here..."
                type="text"
                className="w-full outline-none"
                name=""
                id=""
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              <div
                onClick={() => handleSubmit()}
                className="bg-[#00829B] text-white rounded px-4 py-2 flex items-center cursor-pointer"
              >
                Submit
                <img className="mx-3" src={send} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
