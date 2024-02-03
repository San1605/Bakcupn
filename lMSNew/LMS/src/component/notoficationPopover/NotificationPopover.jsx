import React, { useContext, useEffect } from "react";
import Popover from "react-bootstrap/Popover";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import navbellicon from "../../assets/svg/navbar/navbell.svg";
import { VscCheckAll } from "react-icons/vsc";
import { GlobalContext } from "../../context/GlobalState";
import "./notificationpopver.css";

function NotificationPopover() {
  const { menteenotification, menteenotificationlist } =
    useContext(GlobalContext);

  useEffect(() => {
    menteenotification();
  }, []);

  const NotificationRow = ({ title, timestamp }) => {
    let [date, time] = timestamp.split(", ");
    return (
      <div className="notification-pop-row">
        <div className="notification-pop-row-title" title={title}>
          {title.slice(0, 80) + "..."}
        </div>
        <div className="notification-pop-row-timestamp">
          <div className="notification-pop-row-timestamp-time">{time}</div>
          <div className="notification-pop-row-timestamp-date">{date}</div>
        </div>
        {/* <div className="pop-new-notification"></div> */}
      </div>
    );
  };
  const popoverBottom = (
    <Popover id="popover-positioned-bottom" className="notification-popover">
      <div className="notificationPopover">
        <div className="notification-popover-head">
          <div className="notification-popover-head-name-count">
            Notifications <span> {menteenotificationlist.length}</span>
          </div>
          <div className="notification-popover-head-markRead">
            <VscCheckAll /> Mark all as read
          </div>
        </div>
        <div className="notification-pop-div overflow-y-scroll">
          {menteenotificationlist.length !== 0
            ? menteenotificationlist.map((el) => {
                return (
                  <NotificationRow title={el.message} timestamp={el.date} />
                );
              })
            : "none"}
        </div>
      </div>
    </Popover>
  );
  return (
    <div>
      <ButtonToolbar>
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={popoverBottom}
          rootClose
        >
          <div className="notification pointer">
            <img src={navbellicon} alt="navbellicon" />
            {menteenotificationlist.length > 0 && (
              <div className="noti-dot d-flex justify-content-center align-items-center rounded-circle">
                {menteenotificationlist.length}
              </div>
            )}
            {/* <div className="noti-dot noti-dot-small d-flex justify-content-center align-items-center rounded-circle"></div> */}
          </div>
        </OverlayTrigger>
      </ButtonToolbar>
    </div>
  );
}
export default NotificationPopover;
