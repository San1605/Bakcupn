import React, { useContext, useEffect, useState } from "react";
import LOGOUT from "../../assets/logoutBtn.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import PLUS_ICON from "../../assets/plusIcon.svg";
import CHAT_ICON from "../../assets/chatIcon.svg";
import DELETE_ICON from "../../assets/deleteIcon.svg";
import NAV_ARROW from "../../assets/arrow-right-left.png";
import { AppContext } from "../../utils/Context/AppContext";
import toast from "react-hot-toast";
import { logout } from "../../utils/services/api";
const SideBar = ({ setHideSidebar, handleHamburgerClick }) => {
  const navigate = useNavigate();
  const { appData, dispatch } = useContext(AppContext);
  const [hoverState, setHoverState] = useState(null);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [today, setToday] = useState([]);
  const [thisWeek, setThisWeek] = useState([]);
  const [previous, setPrevious] = useState([]);
  const [newConv, setNewConv] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get("conversation_id"));

  const handleCreateNewChat = () => {
    if (window.innerWidth < 635) {
      setHideSidebar(true);
    }
    dispatch({
      type: "CITATION_BAR",
      payload: false,
    });
    navigate(`${window.location.pathname}?new_conversation`);
  };

  const handleLogout = async () => {
    let toastId;
    let authToken = localStorage.getItem("authToken");
    let tab = localStorage.getItem("tab");
    setLogoutLoading(true);
    localStorage.removeItem("authToken");
    localStorage.removeItem("tab");
    localStorage.removeItem("userName");
    setHideSidebar(true);
    navigate("/");
    try {
      let response = await logout({ authToken, tab });
      // console.log(response);
      navigate("/");
    } catch (err) {
      // console.log(err);
      // toast.dismiss(toastId);
      // toastId = toast.error("Unable to logout");
    }
    setLogoutLoading(false);
  };

  const handleDelete = (i, e) => {
    e.stopPropagation();
    dispatch({
      type: "CITATION_BAR",
      payload: false,
    });
    dispatch({
      type: "deleteModal",
      payload: {
        flag: true,
        deleteConversationId:
          window.location.pathname === "/ai_converser"
            ? appData?.aiConverserChat?.length - i
            : window.location.pathname === "/data_driven_chat"
            ? appData?.dataDrivenChat?.length - i
            : "",
        index: i,
      },
    });
  };

  const handleDeleteNewConv = () => {
    setNewConv(false);
    if (window.location.pathname === "/ai_converser") {
      navigate("/ai_converser?conversation_id=0");
    } else if (window.location.pathname === "/data_driven_chat") {
      navigate("/data_driven_chat?conversation_id=0");
    }
  };

  // Helper function to check if two dates are on the same day
  function isSameDate(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  const getConvo = async () => {
    try {
      let response = await appData.getConvo();
      if (window.location.search.includes("?new_conversation")) {
        navigate(`${window.location.pathname}?new_conversation`);
        return;
      }
      if (window.location.pathname === "/ai_converser") {
        if (
          response?.data.ai_driven?.length === 0 &&
          window.location.search.includes("?new_conversation")
        ) {
          navigate(`${window.location.pathname}?new_conversation`);
        } else {
          if (window.location.search.includes("?conversation_id=")) {
            navigate(`${window.location.pathname}${window.location.search}`);
          } else {
            navigate(`${window.location.pathname}?conversation_id=0`);
          }
        }
      } else if (window.location.pathname === "/data_driven_chat") {
        if (
          response.data.data_driven?.length === 0 &&
          window.location.search.includes("?new_conversation")
        ) {
          navigate(`${window.location.pathname}?new_conversation`);
        } else {
          if (window.location.search.includes("?conversation_id=")) {
            navigate(`${window.location.pathname}${window.location.search}`);
          } else {
            navigate(`${window.location.pathname}?conversation_id=0`);
          }
        }
        setConversations(appData?.dataDrivenChat);
      }
    } catch (err) {
      // console.log(err);
      if (!err.Flag) {
        // localStorage.removeItem("authToken");
        // localStorage.removeItem("tab");
        // localStorage.removeItem("userName");
        // navigate("/");
      }
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/ai_converser") {
      if (
        appData?.aiConverserChat?.length === 0 &&
        !searchParams?.get("conversation_id")
      ) {
        navigate(`${window.location.pathname}?new_conversation`);
      }
      setConversations(appData?.aiConverserChat);
    } else if (window.location.pathname === "/data_driven_chat") {
      if (
        appData?.dataDrivenChat?.length === 0 &&
        !searchParams.get("conversation_id")
      ) {
        navigate(`${window.location.pathname}?new_conversation`);
      }
      setConversations(appData?.dataDrivenChat);
    }
  }, [appData]);

  useEffect(() => {
    try {
      getConvo();
    } catch (err) {}
  }, []);

  useEffect(() => {
    const today = new Date(); // Get the current date
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // Calculate one week ago

    const todayConversations = [];
    const thisWeekConversations = [];
    const remainingConversations = [];

    conversations?.forEach((item) => {
      const conversationDate = new Date(`${item[1]?.Date} ${item[1]?.Time}`);

      // Compare the conversation date with today and one week ago
      if (isSameDate(conversationDate, today)) {
        todayConversations.push(item);
      } else if (conversationDate >= oneWeekAgo) {
        thisWeekConversations.push(item);
      } else {
        remainingConversations.push(item);
      }
    });

    // console.log("Today Conversations:", todayConversations);
    // console.log("This Week Conversations:", thisWeekConversations);
    // console.log("Remaining Conversations:", remainingConversations);

    setToday(todayConversations);
    setThisWeek(thisWeekConversations);
    setPrevious(remainingConversations);
  }, [conversations]);

  useEffect(() => {
    if (window.location.pathname === "/ai_converser") {
      setConversations(appData?.aiConverserChat);
    } else if (window.location.pathname === "/data_driven_chat") {
      setConversations(appData?.dataDrivenChat);
    }

    if (window.location.search === "?new_conversation") {
      setNewConv(true);
    } else {
      setNewConv(false);
    }
  }, [window.location.pathname, searchParams]);

  return (
    <div
      className={`sidebar overflow-y-auto flex flex-col sm:w-[16rem] w-[100%] border-e-[1px] border-[#EFEFEF] z-100 sm:h-full h-[100%] bg-white`}
    >
      <div className="top flex-grow w-100 p-4">
        <div className="flex items-center gap-2">
          <button
            className="border-[1px] mb-3 border-[#E1E1E1] flex items-center justify-center  gap-3 text-[#444791] py-2 px-4 rounded-[6px] w-full text-sm"
            onClick={handleCreateNewChat}
            disabled={appData?.globalLoading}
          >
            <img className="" src={PLUS_ICON} alt="" />
            New Chat
          </button>
          {window.innerWidth <= 635 && (
            <button
              className=" h-[37px] max-w-[37px] border-[1px] mb-3 border-[#E1E1E1] flex items-center justify-center  gap-3 text-[#444791] rounded-[6px] w-full text-sm"
              onClick={handleHamburgerClick}
            >
              <img className="rotate-180 h-[12px]" src={NAV_ARROW} alt="" />
            </button>
          )}
        </div>
        <div className="yesterday pt-[9px]">
          {(today?.length > 0 || newConv) && (
            <div className="text-[#A3A3A3] text-sm pb-[0.5rem] px-[14px]">
              Today
            </div>
          )}
          <div className="w-full flex flex-col gap-2">
            {newConv && (
              <div
                className={`flex justify-between gap-4 items-center py-[9px] px-[14px] cursor-pointer rounded-[3px] ${"bg-[#F8F8F8]"}`}
                // onMouseEnter={() => setHoverState(i)}
                // onMouseLeave={() => setHoverState(null)}
                // onClick={() =>
                //   navigate(`${window.location.pathname}?conversation_id=${i}`)
                // }
                // key={i}
              >
                <div
                  className={`flex items-center gap-4 ${
                    true ? "w-[84%]" : "w-[100%]"
                  }`}
                >
                  <img className="h-[14px]" src={CHAT_ICON} alt="" />
                  <p
                    className={`text-ellipsis overflow-hidden whitespace-nowrap text-sm`}
                  >
                    {"New Chat"}
                  </p>
                </div>
                {(window.location.pathname === "/ai_converser"
                  ? appData?.aiConverserChat?.length !== 0 &&
                    appData.aiConverserChat !== undefined
                  : appData?.dataDrivenChat?.length !== 0 &&
                    appData.dataDrivenChat !== undefined) &&
                  !appData?.globalLoading && (
                    <img
                      className="h-[14px]"
                      src={DELETE_ICON}
                      alt=""
                      onClick={handleDeleteNewConv}
                    />
                  )}
              </div>
            )}
            {today?.map((item, i) => {
              return (
                <div
                  className={`flex justify-between gap-4 items-center py-[9px] px-[14px] cursor-pointer rounded-[3px] ${
                    (hoverState === i ||
                      searchParams.get("conversation_id") == i) &&
                    "bg-[#F8F8F8]"
                  } ${appData?.globalLoading && "pointer-events-none"}`}
                  onMouseEnter={() => setHoverState(i)}
                  onMouseLeave={() => setHoverState(null)}
                  onClick={(e) => {
                    if (window.innerWidth < 635) {
                      setHideSidebar(true);
                    }
                    dispatch({
                      type: "CITATION_BAR",
                      payload: false,
                    });
                    navigate(
                      `${window.location.pathname}?conversation_id=${i}`
                    );
                  }}
                  key={i}
                >
                  <div
                    className={`flex items-center gap-4 ${
                      hoverState === i ||
                      searchParams.get("conversation_id") == i
                        ? "w-[84%]"
                        : "w-[100%]"
                    }`}
                  >
                    <img className="h-[14px]" src={CHAT_ICON} alt="" />
                    <p
                      title={item[0]?.Message}
                      className={`text-ellipsis overflow-hidden whitespace-nowrap text-sm`}
                    >
                      {item[0]?.Message || "New Chat"}
                    </p>
                  </div>
                  {(hoverState === i ||
                    searchParams.get("conversation_id") == i) && (
                    <img
                      className="h-[14px]"
                      src={DELETE_ICON}
                      alt=""
                      onClick={(e) => handleDelete(i, e)}
                    />
                  )}
                </div>
              );
            })}
            {thisWeek.length > 0 && (
              <div className="text-[#A3A3A3] text-sm px-[14px]">This week</div>
            )}
            {thisWeek?.map((item, i) => {
              return (
                <div
                  className={`flex justify-between gap-4 items-center py-[9px] px-[14px] cursor-pointer rounded-[3px] ${
                    (hoverState === today.length + i ||
                      searchParams.get("conversation_id") ==
                        today.length + i) &&
                    "bg-[#F8F8F8]"
                  }  ${appData?.globalLoading ? "pointer-events-none" : ""}`}
                  onMouseEnter={() => setHoverState(today.length + i)}
                  onMouseLeave={() => setHoverState(null)}
                  onClick={(e) => {
                    if (window.innerWidth < 635) {
                      setHideSidebar(true);
                    }
                    dispatch({
                      type: "CITATION_BAR",
                      payload: false,
                    });
                    navigate(
                      `${window.location.pathname}?conversation_id=${
                        today.length + i
                      }`
                    );
                  }}
                  key={i}
                >
                  <div
                    className={`flex items-center gap-4 ${
                      hoverState === today.length + i ||
                      searchParams.get("conversation_id") == today.length + i
                        ? "w-[84%]"
                        : "w-[100%]"
                    }`}
                  >
                    <img className="h-[14px]" src={CHAT_ICON} alt="" />
                    <p
                      title={item[0]?.Message}
                      className={`text-ellipsis overflow-hidden whitespace-nowrap text-sm`}
                    >
                      {item[0]?.Message || "New Chat"}
                    </p>
                  </div>
                  {(hoverState === today.length + i ||
                    searchParams.get("conversation_id") ==
                      today.length + i) && (
                    <img
                      className="h-[14px]"
                      src={DELETE_ICON}
                      alt=""
                      onClick={(e) => handleDelete(today.length + i, e)}
                    />
                  )}
                </div>
              );
            })}
            {previous.length > 0 && (
              <div className="text-[#A3A3A3] text-sm px-[14px]">Previous</div>
            )}
            {previous?.map((item, i) => {
              return (
                <div
                  className={`flex justify-between gap-4 items-center py-[9px] px-[14px] cursor-pointer rounded-[3px] ${
                    (hoverState === today.length + thisWeek.length + i ||
                      searchParams.get("conversation_id") ==
                        today.length + thisWeek.length + i) &&
                    "bg-[#F8F8F8]"
                  }  ${appData?.globalLoading ? "pointer-events-none" : ""}`}
                  onMouseEnter={() =>
                    setHoverState(today.length + thisWeek.length + i)
                  }
                  onMouseLeave={() => setHoverState(null)}
                  onClick={(e) => {
                    if (window.innerWidth < 635) {
                      setHideSidebar(true);
                    }
                    dispatch({
                      type: "CITATION_BAR",
                      payload: false,
                    });
                    navigate(
                      `${window.location.pathname}?conversation_id=${
                        today.length + thisWeek.length + i
                      }`
                    );
                  }}
                  key={i}
                >
                  <div
                    className={`flex items-center gap-4 ${
                      hoverState === today.length + thisWeek.length + i ||
                      searchParams.get("conversation_id") ==
                        today.length + thisWeek.length + i
                        ? "w-[84%]"
                        : "w-[100%]"
                    }`}
                  >
                    <img className="h-[14px]" src={CHAT_ICON} alt="" />
                    <p
                      title={item[0]?.Message}
                      className={`text-ellipsis overflow-hidden whitespace-nowrap text-sm`}
                    >
                      {item[0]?.Message || "New Chat"}
                    </p>
                  </div>
                  {(hoverState === today.length + thisWeek.length + i ||
                    searchParams.get("conversation_id") ==
                      today.length + thisWeek.length + i) && (
                    <img
                      className="h-[14px]"
                      src={DELETE_ICON}
                      alt=""
                      onClick={(e) =>
                        handleDelete(today.length + thisWeek.length + i, e)
                      }
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* <div className="yesterday">
          <div className="text-[#A3A3A3] text-sm py-[9px] px-[14px]">
            Yesterday
          </div>
          <div className="w-full flex flex-col gap-2">
            {yesterdayHistory.map((item, i) => {
              return (
                <div
                  className="flex  gap-4 items-center hover:bg-[#F8F8F8] py-[9px] px-[14px] cursor-pointer rounded-[3px]"
                  onMouseEnter={() => setHoverState2(i)}
                  onMouseLeave={() => setHoverState2(null)}
                  key={i}
                >
                  <img className="h-[14px]" src={CHAT_ICON} alt="" />
                  <p className="text-ellipsis overflow-hidden whitespace-nowrap text-sm">
                    {item.text}
                  </p>
                  {hoverState2 === i && (
                    <img className="h-[14px]" src={DELETE_ICON} alt="" />
                  )}
                </div>
              );
            })}
          </div>
        </div> */}
      </div>
      <div className="bottom h-[4.3rem] w-100 border-t-[1px] border-[#E1E1E1] flex items-center p-3">
        <button
          className="flex w-75 p-3 items-center gap-[13px]"
          onClick={handleLogout}
          disabled={logoutLoading}
        >
          <img className="h-[17px]" src={LOGOUT} alt="" />
          <p className="text-[14px]">Logout</p>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
