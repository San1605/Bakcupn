import React from "react";
import Popover from "react-bootstrap/Popover";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import { IoNotificationsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./notificationPopover.css";
import notiImg from "../../../assets/svg/navbar/emptyNotification.svg";

function NotificationPopover() {
  const arr = [];
  const navigatetonotification = useNavigate();
  const popoverBottom = (
    <Popover id="popover-positioned-bottom">
      <div className="p-3 row popover uni-border">
        <span className="popoverNotiContainer">
          <h3 className="popoverHeading ">Notifications</h3>
          <p
            className="viewAllBtn ps-5 pointer "
            onClick={() => {
              navigatetonotification("/notification");
              document.getElementById("root").click();
            }}
          >
            View All
          </p>
        </span>
        {
          arr.length > -1 ?
            <div className="popoverContent mt-1 popoverFirstContent">
              <div className="contentRow">
                <div className="position-relative">
                  <div className="unreadPopover "></div>
                </div>
                <div className="ps-3">
                  <p>
                    Gaurav Sharma has asked to add Adobe Illustrator Tutorials to
                    his learning.
                  </p>
                  <p className=" popoverDateTime">May 23, 2022 at 10:29 AM</p>
                </div>
              </div>
              {/* <div className="popoverBtnContainer">
                <Button
                  variant="outline-none"
                  className="popoverBtnReject uni-border"
                >
                  Reject
                </Button>
                <Button
                  variant="outline-none ms-2"
                  className="popoverBtnAccept uni-border"
                >
                  Accept
                </Button>
              </div> */}
            </div>
            : <div className="h-100 py-5 popoverEmptyContent">
              <img src={notiImg} alt="notiImg"></img>
              <p className="emptyNotiContent">
                When you get notifications, they’ll show up here
              </p>
            </div>}
      </div>
    </Popover>
  );
  return (
    <div>
      <ButtonToolbar>
        <OverlayTrigger
          positionLeft={200}
          positionTop={50}
          trigger="click"
          placement="bottom"
          overlay={popoverBottom}
          rootClose
        >
          <div className="notification pointer">
            <IoNotificationsOutline className="noti-icon  text-white" />
            <div className="noti-dot d-flex justify-content-center align-items-center rounded-circle">
              2
            </div>
          </div>
        </OverlayTrigger>
      </ButtonToolbar>
    </div>
  );
}
export default NotificationPopover;
