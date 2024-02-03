import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import arrow from "../../../../assets/svg/unenrolledCourses/arrow.svg";

function Notification() {
  const { menteenotification, menteenotificationlist } =
    useContext(GlobalContext);

  useEffect(() => {
    menteenotification();
    document.title = `Notifications | ${process.env.REACT_APP_APP_NAME}`;
  }, []);
  return (
    <div className="notification-page">
      <div className="notificationListContainer bg-white mt-3">
        <div className="notificationPageTitleContainer px-3 py-3 d-flex align-items-center ">
          <div
            className="d-flex align-items-center"
            onClick={() => window.history.back()}
          >
            <img
              src={arrow}
              alt="leftArrowIcon"
              style={{ height: "16px" }}
              className="pointer"
            />
          </div>
          <p className="notificationPageTitle col-md-3 col-12 ms-2">
            Notifications
            <span className="notificationPageCount mx-2">
              {menteenotificationlist.length}
            </span>
          </p>
        </div>
        <div className="other-notification-container">
          {menteenotificationlist.length !== 0
            ? menteenotificationlist.map((elem) => {
                return (
                  <div className="row othersTabContent">
                    <div className="notification-content col-9">
                      <div className="unread-notification ">
                        <div className="unread-dot"></div>
                      </div>
                      <p className="notification-text">{elem.message}</p>
                    </div>
                    <div className="notification-time-date col-2 offset-1">
                      {elem.date}
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
    // role === 1 ?<MentorNotification/>:role == 2?<BuddiesNotification/>:role == 3?<MentorBuddieNotification/>:role == 5?<MentorNotification/>:role == 6?<BuddiesNotification/>:role == 7?<MentorBuddieNotification/>: <MenteeNotification/>
  );
}

export default Notification;
