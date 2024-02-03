import React, { useContext } from "react";
import Popover from "react-bootstrap/Popover";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import profileimg from "../../assets/images/profileimg.png";
import { useMsal } from "@azure/msal-react";
import { AppContext } from "../../Context";
import "./userprofilePopover.css";
import { useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import editpencilicon from "../../views/admin/assets/editPencil.svg";
import { useState } from "react";
import { toast } from "react-hot-toast";
import profileimg90 from "../../assets/images/profileimg90.png";
import ImageWithFallback from "../../views/admin/components/rolemanagementModals/ImageWithFallback";

function UserProfilePopover() {
  const { userprofiledata, updateprofiledata, userMail, navigate } =
    useContext(GlobalContext);

  const [switchit, setSwitchit] = useState(false);
  const [yop, setYop] = useState("");
  const [collegename, setCollegename] = useState("");

  const switchtoedit = () => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const specialCharsforyop = /[ eE`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (
      yop !== "" &&
      collegename !== "" &&
      yop.length === 4 &&
      collegename[0] !== " " &&
      yop[0] != 0 &&
      collegename.length <= 128 &&
      !specialChars.test(collegename) &&
      !specialCharsforyop.test(yop)
    ) {
      const updater = {
        collegeName: collegename,
        yearOfPassing: yop,
      };
      updateprofiledata(updater);
      setSwitchit(false);
      setYop("");
      setCollegename("");
    } else {
      toast.error("Enter details properly");
    }
  };

  const { instance } = useMsal();
  const { setIsAuthenticated } = useContext(AppContext);
  const handleLogout = (logoutType) => {
    localStorage.clear("token");
    document.cookie = "access_token=";
    setIsAuthenticated(false);
    if (logoutType === "Redirect") {
      instance.logoutRedirect({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/",
      });
    }
  };
  const popoverBottom = (
    <Popover id="popover-positioned-bottom">
      <div className="popover uni-border">
        <div className="user-profile-details">
          <div className="userImg-report-div">
            <div className="profileimg popover-profileimg rounded-circle">
              {userMail && (
                <ImageWithFallback
                  src={`https://storageaccountforprofile.blob.core.windows.net/profile/${
                    userMail?.split("@")[0]
                  }.jpg`}
                  fallbackSrc={profileimg90}
                  classes="profilephoto pointer"
                />
              )}
            </div>
            <div
              className="view-userReport"
              onClick={() => {
                navigate("/user-report");
              }}
            >
              View Report
            </div>
          </div>
          <p className="user-name">{userprofiledata.name}</p>
          <p className="user-designation">
            <span style={{ fontWeight: "500" }}>
              {userprofiledata.Designation}
            </span>{" "}
            &nbsp;
            {userprofiledata.Department}
          </p>
        </div>
        <div className="user-details-container">
          <div className="user-work-details">
            <div className="work-head">Work</div>
            <div className="row work-details-row">
              <div className="col-6 work-details-head">HRM ID:</div>
              <div className="col-6 work-details-content">
                {userprofiledata.HRMID}
              </div>
            </div>
            <div className="row work-details-row">
              <div className="col-6 work-details-head">Department:</div>
              <div className="col-6 work-details-content">
                {userprofiledata.Department}
              </div>
            </div>
            <div className="row work-details-row">
              <div className="col-6 work-details-head">Designation:</div>
              <div className="col-6 work-details-content">
                {userprofiledata.Designation}
              </div>
            </div>
            <div className="row work-details-row">
              <div className="col-6 work-details-head">Reporting Manager:</div>
              <div className="col-6 work-details-content">
                {userprofiledata.reportingTo}
              </div>
            </div>
            <div className="row work-details-row">
              <div className="col-6 work-details-head">Office Location:</div>
              <div className="col-6 work-details-content">
                {userprofiledata.officeLocation}
              </div>
            </div>
            <div className="row work-details-row">
              <div className="col-6 work-details-head">Secondary Mentor:</div>
              <div className="col-6 work-details-content">
                {userprofiledata.secondReportingTo}
              </div>
            </div>
          </div>
          <div className="user-info-details">
            <div className="info-head">
              <p>Basic info</p>
              <img
                src={editpencilicon}
                alt="editpencilicon"
                className="action-icon profile-edit-icon"
                onClick={() => setSwitchit(true)}
              />
            </div>
            <div className="row info-details-row">
              <div className="col-6 info-details-head">Contact no:</div>
              <div className="col-6 info-details-content">
                {userprofiledata.Mobile}
              </div>
            </div>
            <div className="row info-details-row">
              <div className="col-6 info-details-head">Email Id:</div>
              <div className="col-6 info-details-content">
                {userprofiledata.emailId}
              </div>
            </div>
            {switchit === false ? (
              <>
                <div className="row info-details-row">
                  <div className="col-6 info-details-head">College Name:</div>
                  <div className="col-6 info-details-content">
                    {userprofiledata.collegeName}
                  </div>
                </div>
                <div className="row info-details-row">
                  <div className="col-6 info-details-head">
                    Year of Passing:
                  </div>
                  <div className="col-6 info-details-content">
                    {userprofiledata.yearOfPassing}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="row info-details-row">
                  <div className="col-6 info-details-head">College Name:</div>
                  <div className="col-6 info-details-content">
                    <input
                      type="text"
                      className="profile-popver-input"
                      value={collegename}
                      onChange={(e) => setCollegename(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row info-details-row">
                  <div className="col-6 info-details-head">
                    Year of Passing:
                  </div>
                  <div className="col-6 info-details-content">
                    <input
                      type="number"
                      className="profile-popver-input profile-popver-numberinput"
                      value={yop}
                      onChange={(e) => setYop(e.target.value)}
                    />
                  </div>
                </div>
                <div className="info-details-row profile-update-btn-container mt-2 pe-2">
                  <div
                    className="profile-update-btn profile-update-cancel uni-border"
                    onClick={() => {
                      setCollegename("");
                      setYop("");
                      setSwitchit(false);
                    }}
                  >
                    Cancel
                  </div>
                  <div
                    className="profile-update-btn profile-update-save uni-border"
                    onClick={() => switchtoedit()}
                  >
                    Save
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div
          className="signout-btn-container"
          onClick={() => handleLogout("Redirect")}
        >
          <p>Sign out</p>
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
          <div className="profileimg rounded-circle">
            {/* <img
            src={`https://storageaccountforprofile.blob.core.windows.net/profile/${userMail.split('@')[0]}.jpg`}
            alt="profile"
              className="profilephoto pointer"
            /> */}
            {userMail && (
              <ImageWithFallback
                src={`https://storageaccountforprofile.blob.core.windows.net/profile/${
                  userMail?.split("@")[0]
                }.jpg`}
                fallbackSrc={profileimg90}
                classes="profilephoto pointer"
              />
            )}
          </div>
        </OverlayTrigger>
      </ButtonToolbar>
    </div>
  );
}
export default UserProfilePopover;
