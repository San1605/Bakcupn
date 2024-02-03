import React, { useContext, useEffect, useRef, useState } from "react";
import cross from "../../assets/svg/navbar/cross.svg";
import "./NotificationModal.css";
import { GlobalContext } from "../../context/GlobalState";
import navbellicon from "../../assets/svg/navbar/navbell.svg";
import notificationSound from "../../assets/audio/notification.wav";
import ImageWithFallback from "../../views/admin/components/rolemanagementModals/ImageWithFallback";
import { VscCheckAll } from "react-icons/vsc";
import { GrFormClose } from "react-icons/gr";
import CryptoJS from "crypto-js";
const NotificationModal = (props) => {
  const { socket, NotificationArray, navigate } = useContext(GlobalContext);
  const emailId = localStorage.getItem("email");
  const audioRef = useRef(new Audio(notificationSound));
  const NotificationModalRef = useRef(null);
  const [notificationIdArray, setNotifcationIdArray] = useState([]);
  const checker = [
    undefined, null
  ]
  const handleBackdropClick = (e) => {
    if (
      NotificationModalRef.current &&
      !NotificationModalRef.current.contains(e.target)
    ) {
      props.setShowModal(false);
    }
  };

  useEffect(() => {
    if (!checker.includes(NotificationArray) && NotificationArray?.length > 0) {
      const newNotification = NotificationArray.find((elem) => elem.state === 1);
      if (newNotification && !notificationIdArray?.includes(newNotification?.ID)) {
        playsound();
      }
      NotificationArray?.forEach((item, index) => {
        setNotifcationIdArray((prevIds) => [...prevIds, item?.ID]);
      });
    }

  }, [NotificationArray]);

  const playsound = () => {
    audioRef.current.play();
  };

  useEffect(() => {
    document.addEventListener("click", handleBackdropClick);
    return () => {
      document.removeEventListener("click", handleBackdropClick);
    };
  }, [NotificationModalRef]);

  const handleNotification = (id) => {
    socket.emit("notificationChangeStateToRead", id);
    // props.setShowModal(false);
    // navigate("/requests");
  };

  const handleCross = () => {
    socket.emit("readAllNotifications", emailId);
    // props.setShowModal(false)
  };
  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" : ""}${day}-${month < 10 ? "0" : ""
      }${month}-${year}`;
  };

  const getFormattedTime = (timeString) => {
    const date = new Date(timeString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let amOrPm = "AM";
    if (hours >= 12) {
      amOrPm = "PM";
      hours %= 12;
    }
    if (hours === 0) {
      hours = 12;
    }
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${amOrPm}`;
  };

  return (
    <>
      <div
        className="notification pointer"
        onClick={(event) => {
          event.stopPropagation();
          // navigate("/notification");
          props.setShowModal(!props.showModal);
        }}
      >
        {!checker.includes(NotificationArray) && NotificationArray?.find((elem) => elem.state === 1) !== undefined && (
          <div className="notificationCount">
            <span>
              {NotificationArray?.reduce((total, current) => {
                if (current?.state === 1) {
                  total += 1;
                }
                return total;
              }, 0)}
            </span>
          </div>
        )}
        <img src={navbellicon} alt="navbellicon" />
      </div>

      {/* <div className={`${props.showModal? "modalBackdrop":"modalBackdropBefore"}`} > */}
      {props.showModal && (
        <div
          className={`modalClass ${props.showModal ? "articleShow " : "articleHide"
            }`}
          ref={NotificationModalRef}
        >
          <div className="notification-popover-head">
            <div className="notification-popover-head-name-count">
              Notifications <span> {!checker.includes(NotificationArray) && NotificationArray?.length}</span>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <div
                // className="notification-popover-head-markRead pointer"
                className="pointer modal-outer-primary-btn py-1 px-2 text-white"
                style={{ fontSize: "11px" }}
                onClick={handleCross}
              >
                <VscCheckAll /> Mark all as read
              </div>
              <GrFormClose
                className="me-2 pointer"
                style={{ fontSize: "22px" }}
                onClick={() => {
                  props.setShowModal(false);
                }}
              />
            </div>
          </div>

          {/* <div className="modalHeader">
            <div className="NotificationHeaderDiv">
              <span className="NotificationHeaderDivName">Notifications</span>
              <span className="NotificationHeaderDivMark" onClick={handleCross}>
                {/* <VscCheckAll /> 
                Mark all as read
              </span>
            </div>
            <img
              className="CrossIcon"
              src={cross}
              alt=""
              onClick={() => {
                props.setShowModal(false);
              }}
            />
          </div> */}
          <div className="notification">
            {checker.includes(NotificationArray) || NotificationArray?.length === 0 ? (
              <div className="NotFound">
                <span>No Notification Found</span>
              </div>
            ) : (
              <>
                {NotificationArray?.map((notification, index) => (
                  <div
                    className="notification-pop-row flex-row align-items-center gap-2"
                    key={index}
                    onClick={() => {
                      handleNotification(notification?.ID);
                      socket.emit(
                        "notificationChangeStateToRead",
                        notification?.ID
                      );
                      if (
                        notification?.type === "lprequest" ||
                        notification?.type === "ticketrequest" ||
                        notification?.type === "PMFeedbackReport" ||
                        notification?.type === "TLFeedbackReport" ||
                        notification?.type === "pipInitRequestToMentor"
                      ) {
                  
                        navigate(`/requests/${notification?.type}`);
                        props.setShowModal(false);
                      }
                      else if (notification?.type === "assignSecondaryMentor") {
                        console.log("this is from if 2")
                        navigate(`/menteelist`);
                        props.setShowModal(false);
                      }
                      else if (notification?.type === "menteeCourseApproved") {
                  
                        navigate("/dashboard");
                        props.setShowModal(false);
                      }
                      else if (notification?.type === "mentorNotifyAfterTLAction") {
                      
                        const secretKey = process.env.REACT_APP_APP_KEY;
                        const iv = CryptoJS.lib.WordArray.random(16);
                        const encrypted = CryptoJS.AES.encrypt(
                          notification?.profile_pic?.split("@")[0],
                          secretKey,
                          { iv }
                        );
                        let encstring = (
                          iv.toString() + encrypted.toString()
                        ).replace(/\//g, "hedge");
                        navigate(`/conversion/${encstring}`);
                        props.setShowModal(false);
                      }
                    }}


                    style={{
                      backgroundColor:
                        notification?.state === 1 ? "#0c8ce920" : "white",
                    }}
                  >
                    <div
                      style={{
                        height: "34px",
                        width: "34px",
                        backgroundColor: "transparent",
                        borderRadius: "50%",
                        overflow: "hidden",
                      }}
                    >
                      <ImageWithFallback
                        src={`https://storagefortimetrigger.blob.core.windows.net/profile/${notification?.profile_pic?.split("@")[0]
                          }.jpg`}
                        fallbackSrc="small"
                        alt="Employee"
                        setWidth={true}
                      />
                    </div>
                    <div style={{ width: "calc(100% - 70px)" }}>
                      <div
                        className="notification-pop-row-title"
                        title={notification?.message}
                      >
                        {notification?.message?.length > 120
                          ? notification?.message?.slice(0, 120) + "..."
                          : notification?.message}
                      </div>
                      <div className="notification-pop-row-timestamp justify-content-end gap-2 flex-row-reverse">
                        <div className="notification-pop-row-timestamp-time">
                          {getFormattedTime(notification?.created_at)}
                        </div>
                        <div className="notification-pop-row-timestamp-date">
                          {getFormattedDate(notification?.created_at)}
                        </div>
                      </div>
                    </div>

                  </div>
                  // <div
                  //   key={index}
                  //   className="notificationBox"
                  //   onClick={() => {
                  //     // handleNotification(notification?.ID)
                  //     socket.emit(
                  //       "notificationChangeStateToRead",
                  //       notification?.ID
                  //     );
                  //     if (
                  //       notification?.type === "lprequest" ||
                  //       notification?.type === "ticketrequest" ||
                  //       notification?.type === "PMFeedbackReport" ||
                  //       notification?.type === "TLFeedbackReport"
                  //     ) {
                  //       navigate(`/requests/${notification?.type}`);
                  //       props.setShowModal(false);
                  //     } else if (notification?.type === "assignSecondaryMentor") {
                  //       navigate(`/menteelist`);
                  //       props.setShowModal(false);
                  //     } else if (notification?.type === "menteeCourseApproved") {
                  //       navigate("/dashboard");
                  //     }
                  //   }}
                  //   style={{
                  //     backgroundColor:
                  //       notification?.state === 1 ? "#f4f8fb" : "white",
                  //   }}
                  // >
                  //   <div className="notificationUpperDiv">
                  //     <div key={index} className="notificationContent">
                  //       {notification?.message}
                  //     </div>
                  //   </div>
                  //   <div className="notificationLowerDiv">
                  //     <span className="notificationTime">
                  //       {getFormattedTime(notification?.created_at)}
                  //     </span>
                  //     <span className="notificationDate">
                  //       {getFormattedDate(notification?.created_at)}
                  //     </span>
                  //   </div>
                  // </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
      {/* </div> */}
    </>
  );
};
export default NotificationModal;
