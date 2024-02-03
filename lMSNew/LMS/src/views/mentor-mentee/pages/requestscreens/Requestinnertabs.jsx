import React, { useContext } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "../allnotification/notification.css";
import NotificationRejectModal from "../../../../component/notificationsModal/notificationRejectModal/NotificationRejectModal";
import NotificationRejectModalTicket from "../../../../component/notificationsModal/notificationRejectModalTicket/NotificationRejectModalTicket";
import NotificationRejectModalBuddie from "../../../../component/notificationsModal/notificationRejectModalBuddie/NotificationRejectModalBuddie";
import TicketsDescriptionModal from "../../../../component/ticketsDescriptionModal/TicketsDescriptionModal";
import moment from "moment/moment";
import { GlobalContext } from "../../../../context/GlobalState";
import TicketApproved from "../../../../component/tickets/ticketsStatusTiles/TicketApproved";
import TicketPending from "../../../../component/tickets/ticketsStatusTiles/TicketPending";
import TicketsRejected from "../../../../component/tickets/ticketsStatusTiles/TicketsRejected";
import emptynotitable from "../../../../assets/svg/emptynotitable.svg";
import { useEffect } from "react";
import { Bars } from "react-loader-spinner";
// import arrow from "../../../../assets/svg/unenrolledCourses/arrow.svg";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import AccordionContext from "react-bootstrap/AccordionContext";
import Card from "react-bootstrap/Card";
import { BsChevronDown } from "react-icons/bs";
import { BsChevronUp } from "react-icons/bs";
import { Button } from "react-bootstrap";
import ProjectManagerFeedbackForm from "../../../../component/projectManagerFeedbackForm/ProjectManagerFeedbackForm";
import ProjectManagerFeedbackView from "../../../../component/projectManagerFeedbackForm/ProjectManagerFeedbackView";
import InterviewFeedbackViewModalTL from "../../../../component/feedbackCard/InterviewFeedbackViewModalTL";
import noData from "../../../../assets/noData.png";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ImageWithFallback from "../../../admin/components/rolemanagementModals/ImageWithFallback";

function Requestinnertabs() {
  const {
    menteescoursesrequest,
    updatecourserequest,
    getmenteescourserequest,
    ticketdataofemployee,
    menteeticketlist,
    updateticketrequest,
    budticketlist,
    buddiestickets,
    updatebuddieticketrequest,
    tlrequest,
    pmrequest,
    tllist,
    pmlist,
    actionoftl,
    requesttrigger,
    navigate,
    PIPRequest,
    pipRequestsList,
    PIPActionFromMentor
  } = useContext(GlobalContext);

  const { id } = useParams();
  const [defaultKeyNotification, setDefaultKeyNotification] = useState("");
  const pipType = [
    "Good Job for Clearing PIP", "PIP Initiation", "Warning Mail"
  ]
  // console.log(id, "id")

  useEffect(() => {
    // console.log("inside useEffect of inner tabs")
    if (id !== undefined) {
      switch (id) {
        case "lprequest":
          setDefaultKeyNotification("Learning Path Request");
          break;
        case "ticketrequest":
          setDefaultKeyNotification("Mentee Tickets");

          break;
        case "buddyTicket":
          setDefaultKeyNotification("Buddy Tickets");
          break;

        case "TLFeedbackReport":
          setDefaultKeyNotification("Conversion Request TC");
          break;
        case "PMFeedbackReport":
          setDefaultKeyNotification("Conversion Request PM");
          break;
        case "pipInitRequestToMentor":
          setDefaultKeyNotification("PIP Requests");
          break;

        default:
          break;
      }
    } else {
      setDefaultKeyNotification(
        Object.keys(requesttrigger).find((key) => requesttrigger[key] === true)
          ? Object.keys(requesttrigger).find(
            (key) => requesttrigger[key] === true
          )
          : "Learning Path Request"
      );
    }
  }, [requesttrigger, id]);

  // console.log(defaultKeyNotification, "defaultKeyNotification")

  const [count, setCount] = useState(0);
  const approvestatus = (mail, lp, request, dateMentioned) => {
    updatecourserequest(1, "", mail, lp, request, dateMentioned);
  };
  const approvestatusofticket = (mail, date) => {
    updateticketrequest(1, "", mail, date);
  };
  const approvestatusofbuddieticket = (mail, date) => {
    updatebuddieticketrequest(1, "", mail, date);
  };
  useEffect(() => {
    if (Object.keys(requesttrigger).length > 0) {
      if (requesttrigger["Learning Path Request"]) {
        getmenteescourserequest();
      }
      if (requesttrigger["Mentee Tickets"]) {
        ticketdataofemployee();
      }
      if (requesttrigger["Buddy Tickets"]) {
        buddiestickets();
      }
      if (requesttrigger["Conversion Request TC"]) {
        tlrequest();
      }
      if (requesttrigger["Conversion Request PM"]) {
        pmrequest();
      }
      if (requesttrigger["PIP Requests"]) {
        PIPRequest();
      }
    }
  }, [requesttrigger, id, defaultKeyNotification]);

  useEffect(() => {
    if (buddiestickets) {
      console.log(budticketlist);
    }
  }, [budticketlist]);

  useEffect(() => {
    if (
      menteescoursesrequest?.length !== 0 ||
      menteeticketlist?.length !== 0 ||
      budticketlist?.length !== 0 ||
      tllist?.length !== 0 ||
      pmlist?.length !== 0
    ) {
      if (
        menteescoursesrequest?.filter((elem) => elem.approvalStatus == 0)
          .length +
        menteeticketlist?.filter((elem) => elem.status == 0).length +
        budticketlist?.filter((elem) => elem.status == 0).length +
        tllist?.filter((elem) => elem.flag == true && elem.actionTaken == "")
          .length +
        pmlist?.filter((elem) => elem.flag == null).length >
        0
      ) {
        setCount(
          menteescoursesrequest?.filter((elem) => elem.approvalStatus == 0)
            .length +
          menteeticketlist?.filter((elem) => elem.status == 0).length +
          budticketlist?.filter((elem) => elem.status == 0).length +
          tllist?.filter(
            (elem) => elem.flag == true && elem.actionTaken == ""
          ).length +
          pmlist?.filter((elem) => elem.flag == null).length
        );
      }
    }
  }, [menteescoursesrequest, menteeticketlist, budticketlist, tllist, pmlist]);

  function ContextAwareToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );

    const isCurrentEventKey = activeEventKey == eventKey;
    // console.log(isCurrentEventKey, "isCurrentEventKey");
    // console.log(activeEventKey, "activeEventKey");
    return (
      <div>
        <table className="table m-0">
          <tbody className="tbody">
            <tr className="trow w-100 conversion-accordian-row">
              <td onClick={decoratedOnClick} className="pointer">
                <div className="conversion-details-text">
                  {!isCurrentEventKey ? <BsChevronDown /> : <BsChevronUp />}
                </div>
              </td>
              {children}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className="notification-page">
      <div className="notificationListContainer bg-white">
        <div className="notificationPageTitleContainer px-3 pt-3 pb-1 d-flex align-items-center ">
          {/* <div
            className="d-flex align-items-center"
            onClick={() => window.history.back()}
          >
            <img
              src={arrow}
              alt="leftArrowIcon"
              style={{ height: "16px" }}
              className="pointer"
            />
          </div> */}
          <p className="notificationPageTitle col-md-3 col-12 ms-2">
            Requests
            {/* <span className="notificationPageCount mx-2">{`${count}`}</span> */}
          </p>
        </div>
        <div>
          {Object.keys(requesttrigger).length > 0 ? (
            <Tabs
              id="controlled-tab-example"
              activeKey={defaultKeyNotification}
              onSelect={(k) => {
                setDefaultKeyNotification(k);
                // navigate(`/request`)
              }}
            >
              {requesttrigger["Learning Path Request"] ? (
                <Tab
                  eventKey="Learning Path Request"
                  title={`Learning Path Request (${menteescoursesrequest?.filter(
                    (elem) => elem.approvalStatus == 0
                  ).length
                    })`}
                >
                  {menteescoursesrequest ? (
                    <div
                      className="tableFixHead overflow-y-scroll"
                      style={{ height: "68vh" }}
                    >
                      <div className="row col-12 notificationTiList">
                        {menteescoursesrequest.length !== 0 ? (
                          <table className="table">
                            <thead className="notificationthead">
                              <tr className="notificationheadrow">
                                <th className="col-1 notificationTableHead nowrap first-table-col ps-3">
                                  S. No.
                                </th>
                                <th className="col-2 notificationTableHead nowrap offset-1">
                                  Mentee Name
                                </th>
                                <th className="col-2 notificationTableHead nowrap">
                                  Learning Path
                                </th>
                                <th className="col-2 notificationTableHead nowrap">
                                  Date of Raising Request
                                </th>
                                <th className="col-2 notificationTableHead nowrap">
                                  Request Type
                                </th>
                                <th className="col-2 notificationTableHead nowrap first-table-col ps-3">
                                  Status
                                </th>
                                <th className="col-2 notificationTableHead nowrap ">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {menteescoursesrequest.length !== 0
                                ? menteescoursesrequest.map((elem, index) => {
                                  return (
                                    <tr
                                      className="notificationcontentrow"
                                      key={index}
                                    >
                                      <td className="col-1 notificationTablecontent nowrap first-table-col ps-3">
                                        <p className="notificationContentText">
                                          {index + 1}
                                        </p>
                                      </td>
                                      <td className="col-2 notificationTablecontent nowrap offset-1">
                                        <div
                                          className="employee-details-col"
                                          title={elem.name}
                                        >
                                          <div className="employee-details-col-img">
                                            <ImageWithFallback
                                              src={`https://storagefortimetrigger.blob.core.windows.net/profile/${elem.emailId.split("@")[0]
                                                }.jpg`}
                                              fallbackSrc="small"
                                            />
                                          </div>
                                          <div className="employee-details-col-name">
                                            <p className="notificationContentText">
                                              {elem.name}
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="col-2 notificationTablecontent nowrap">
                                        <p className="notificationContentText">
                                          {elem.learningPath}
                                        </p>
                                      </td>
                                      <td className="col-2 notificationTablecontent nowrap">
                                        <p className="notificationContentText ">
                                          {moment(elem.requestedDate).format(
                                            "DD/MM/YYYY"
                                          )}
                                        </p>
                                      </td>
                                      <td className="col-2 notificationTablecontent nowrap offset-1">
                                        <p className="notificationContentText">
                                          {elem.requestType}
                                        </p>
                                      </td>
                                      <td className="col-2 notificationTablecontent nowrap offset-1">
                                        <p
                                          className="notificationContentText mentorTicketStatus-pending"
                                          style={{ paddingLeft: "6px" }}
                                        >
                                          {elem.approvalStatus === 2 ? (
                                            <TicketsRejected />
                                          ) : elem.approvalStatus === 1 ? (
                                            <TicketApproved />
                                          ) : (
                                            <TicketPending />
                                          )}
                                        </p>
                                      </td>
                                      <td className=" col-2 notificationTablecontent nowrap ">
                                        <button
                                          className={`${elem.approvalStatus === 0
                                            ? " notificationApprove"
                                            : " curson-block-disable notificationApprove"
                                            } ticketApprove `}
                                          onClick={() =>
                                            elem.approvalStatus === 0 &&
                                            approvestatus(
                                              elem.emailId,
                                              elem.learningPath,
                                              elem.requestType,
                                              elem.requestedDate
                                            )
                                          }
                                        >
                                          Approve
                                        </button>
                                        {/* <button className="notificationReject">Reject</button> */}
                                        <NotificationRejectModal
                                          status={elem.approvalStatus}
                                          mailid={elem.emailId}
                                          lp={elem.learningPath}
                                          request={elem.requestType}
                                          dateMentioned={elem.requestedDate}
                                        />
                                      </td>
                                    </tr>
                                  );
                                })
                                : null}
                            </tbody>
                          </table>
                        ) : (
                          <div
                            className="w-100 d-flex flex-column align-items-center justify-content-center"
                            style={{ height: "calc(100vh - 210px)" }}
                          >
                            <img src={noData} alt="noData" height={125} />
                            <p
                              className="mt-2"
                              style={{
                                fontSize: "14px",
                                fontWeight: "400",
                              }}
                            >
                              No any requests found
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="page-loader-div">
                      <Bars
                        height="50"
                        width="50"
                        color="#4F52B2"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass="page-loader"
                        visible={true}
                      />
                    </div>
                  )}
                </Tab>
              ) : null}
              {requesttrigger["Mentee Tickets"] ? (
                <Tab
                  eventKey="Mentee Tickets"
                  title={`Mentee Tickets(${menteeticketlist?.filter((elem) => elem.status == 0).length
                    })`}
                >
                  {menteeticketlist ? (
                    <div
                      className="tableFixHead overflow-y-scroll"
                      style={{ height: "68vh" }}
                    >
                      <div className="row col-12 notificationTiList">
                        {menteeticketlist.length !== 0 ? (
                          <table className="table">
                            <thead className="notificationthead">
                              <tr className="notificationheadrow">
                                <th className="col-1 notificationTableHead nowrap first-table-col ps-3">
                                  S. No.
                                </th>
                                <th className="col-1 notificationTableHead nowrap offset-1">
                                  Raised by
                                </th>
                                <th className="col-2 notificationTableHead nowrap">
                                  Reason for Raised Ticket
                                </th>
                                <th className="col-4 notificationTableHead nowrap">
                                  Description
                                </th>
                                <th className="col-1 notificationTableHead nowrap offset-1">
                                  Created date
                                </th>
                                <th className="col-1 notificationTableHead nowrap offset-1">
                                  Ticket Status
                                </th>
                                <th className="col-2 notificationTableHead nowrap ">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {menteeticketlist.length !== 0
                                ? menteeticketlist.map((elem, index) => {
                                  return (
                                    <tr
                                      className="notificationcontentrow"
                                      key={index}
                                    >
                                      <td className="col-1 notificationTablecontent nowrap first-table-col ps-3">
                                        <p className="notificationContentText">
                                          {index + 1}
                                        </p>
                                      </td>
                                      <td className="col-1 notificationTablecontent nowrap offset-1">
                                        <div
                                          className="employee-details-col"
                                          title={elem.name}
                                        >
                                          <div className="employee-details-col-img">
                                            <ImageWithFallback
                                              src={`https://storagefortimetrigger.blob.core.windows.net/profile/${elem.emailID.split("@")[0]
                                                }.jpg`}
                                              fallbackSrc="small"
                                            />
                                          </div>
                                          <div className="employee-details-col-name">
                                            <p className="notificationContentText">
                                              {elem.name}
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="col-2 notificationTablecontent nowrap">
                                        <p className="notificationContentText">
                                          {elem.reason}
                                        </p>
                                      </td>
                                      <td className="col-4 notificationTablecontent nowrap">
                                        <div
                                          className="d-flex justify-content-between"
                                          style={{ columnGap: "1rem" }}
                                        >
                                          <p
                                            className="notificationContentText d-inline-block text-truncate"
                                            style={{ maxWidth: "15rem" }}
                                          >
                                            {elem.description}
                                          </p>
                                          <div className="col-4">
                                            <TicketsDescriptionModal
                                              description={elem.description}
                                            />
                                          </div>
                                        </div>
                                      </td>
                                      <td className="col-1 notificationTablecontent nowrap offset-1">
                                        <p className="notificationContentText">
                                          {moment(elem.createdDate).format(
                                            "DD/MM/YYYY"
                                          )}
                                        </p>
                                      </td>
                                      <td className="col-1 notificationTablecontent nowrap offset-1">
                                        <p className="notificationContentText mentorTicketStatus-pending">
                                          {elem.status === 2 ? (
                                            <TicketsRejected />
                                          ) : elem.status === 1 ? (
                                            <TicketApproved />
                                          ) : (
                                            <TicketPending />
                                          )}
                                        </p>
                                      </td>
                                      <td className=" col-2 notificationTablecontent nowrap ">
                                        <button
                                          className={`${elem.status === 0
                                            ? " notificationApprove"
                                            : " curson-block-disable notificationApprove"
                                            } ticketApprove `}
                                          onClick={() => {
                                            elem.status === 0 &&
                                              approvestatusofticket(
                                                elem.emailID,
                                                elem.createdDate
                                              );
                                          }}
                                        >
                                          Approve
                                        </button>
                                        {/* <button className="notificationReject">Reject</button> */}
                                        <NotificationRejectModalTicket
                                          status={elem.status}
                                          mailid={elem.emailID}
                                          date={elem.createdDate}
                                        />
                                      </td>
                                    </tr>
                                  );
                                })
                                : null}
                            </tbody>
                          </table>
                        ) : (
                          <div
                            className="w-100 d-flex flex-column align-items-center justify-content-center"
                            style={{ height: "calc(100vh - 210px)" }}
                          >
                            <img src={noData} alt="noData" height={125} />
                            <p
                              className="mt-2"
                              style={{
                                fontSize: "14px",
                                fontWeight: "400",
                              }}
                            >
                              No any Tickets Found
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="page-loader-div">
                      <Bars
                        height="50"
                        width="50"
                        color="#4F52B2"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass="page-loader"
                        visible={true}
                      />
                    </div>
                  )}
                </Tab>
              ) : null}
              {requesttrigger["Buddy Tickets"] ? (
                <Tab
                  eventKey="Buddy Tickets"
                  title={`Buddies Tickets(${budticketlist?.filter((elem) => elem.status == 0).length
                    })`}
                >
                  <div
                    style={{ height: "68vh" }}
                    className="tableFixHead overflow-y-scroll"
                  >
                    <div className="row col-12 notificationTiList">
                      {budticketlist?.length !== 0 ? (
                        <table className="table">
                          <thead className="notificationthead">
                            <tr className="notificationheadrow">
                              <th className="col-1 notificationTableHead nowrap first-table-col ps-3">
                                S. No.
                              </th>
                              <th className="col-1 notificationTableHead nowrap offset-1">
                                Raised by
                              </th>
                              <th className="col-2 notificationTableHead nowrap">
                                Reason for Raised Ticket
                              </th>
                              <th className="col-4 notificationTableHead nowrap">
                                Description
                              </th>
                              <th className="col-1 notificationTableHead nowrap offset-1">
                                Created date
                              </th>
                              <th className="col-1 notificationTableHead nowrap offset-1">
                                Ticket Status
                              </th>
                              <th className="col-2 notificationTableHead nowrap ">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {budticketlist ? (
                              budticketlist.map((elem, index) => {
                                return (
                                  <tr className="notificationcontentrow">
                                    <td className="col-1 notificationTablecontent nowrap first-table-col ps-3">
                                      <p className="notificationContentText">
                                        {index + 1}
                                      </p>
                                    </td>
                                    <td className="col-1 notificationTablecontent nowrap offset-1">
                                      <div
                                        className="employee-details-col"
                                        title={elem.name}
                                      >
                                        <div className="employee-details-col-img">
                                          <ImageWithFallback
                                            src={`https://storagefortimetrigger.blob.core.windows.net/profile/${elem.emailId.split("@")[0]
                                              }.jpg`}
                                            fallbackSrc="small"
                                          />
                                        </div>
                                        <div className="employee-details-col-name">
                                          <p className="notificationContentText">
                                            {elem.name}
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="col-2 notificationTablecontent nowrap">
                                      <p className="notificationContentText">
                                        {elem.reason}
                                      </p>
                                    </td>
                                    <td className="col-4 notificationTablecontent nowrap">
                                      <div
                                        className="d-flex justify-content-between"
                                        style={{ columnGap: "1rem" }}
                                      >
                                        <p
                                          className="notificationContentText d-inline-block text-truncate"
                                          style={{ maxWidth: "15rem" }}
                                        >
                                          {elem.description}
                                        </p>
                                        <div className="col-4">
                                          <TicketsDescriptionModal
                                            description={elem.description}
                                          />
                                        </div>
                                      </div>
                                    </td>
                                    <td className="col-1 notificationTablecontent nowrap offset-1">
                                      <p className="notificationContentText">
                                        {moment(elem.createdDate).format(
                                          "DD/MM/YYYY"
                                        )}
                                      </p>
                                    </td>
                                    <td className="col-1 notificationTablecontent nowrap offset-1">
                                      <p className="notificationContentText mentorTicketStatus-pending">
                                        {elem.status === 2 ? (
                                          <TicketsRejected />
                                        ) : elem.status === 1 ? (
                                          <TicketApproved />
                                        ) : (
                                          <TicketPending />
                                        )}
                                      </p>
                                    </td>
                                    <td className=" col-2 notificationTablecontent nowrap ">
                                      <button
                                        className={`${elem.status === 0
                                          ? " notificationApprove"
                                          : " curson-block-disable notificationApprove"
                                          } ticketApprove `}
                                        onClick={() => {
                                          elem.status === 0 &&
                                            approvestatusofbuddieticket(
                                              elem.emailId,
                                              elem.createdDate
                                            );
                                        }}
                                      >
                                        Approve
                                      </button>
                                      <NotificationRejectModalBuddie
                                        status={elem.status}
                                        mailid={elem.emailId}
                                        date={elem.createdDate}
                                      />
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <div className="page-loader-div">
                                <Bars
                                  height="50"
                                  width="50"
                                  color="#4F52B2"
                                  ariaLabel="bars-loading"
                                  wrapperStyle={{}}
                                  wrapperClass="page-loader"
                                  visible={true}
                                />
                              </div>
                            )}
                          </tbody>
                        </table>
                      ) : (
                        <div
                          className="w-100 d-flex flex-column align-items-center justify-content-center"
                          style={{ height: "calc(100vh - 210px)" }}
                        >
                          <img src={noData} alt="noData" height={125} />
                          <p
                            className="mt-2"
                            style={{
                              fontSize: "14px",
                              fontWeight: "400",
                            }}
                          >
                            No any Tickets Found
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Tab>
              ) : null}
              {requesttrigger["Conversion Request TC"] ? (
                <Tab
                  eventKey="Conversion Request TC"
                  title={`Conversion Request TC(${tllist?.filter(
                    (elem) => elem.flag == true && elem.actionTaken == ""
                  ).length
                    })`}
                >
                  <table className="table m-0">
                    <thead className="thead">
                      <tr className="trow w-100 conversion-accordian-row">
                        <th>
                          <BsChevronDown className="first-th" />
                        </th>
                        <th className="col-1">HRM</th>
                        <th className="col-2">Name</th>
                        <th className="col-2">Reporting Manager</th>
                        <th className="col-2">Employee Type</th>
                        <th className="col-1">Recording Link</th>
                        <th className="col-1">Verdict Date</th>
                        <th className="col-1">Conversion Month</th>
                        <th className="col-2">Action</th>
                      </tr>
                    </thead>
                  </table>
                  <div className="conversion-container">
                    <Accordion>
                      {tllist.length > 0
                        ? tllist.map((elem, index) => {
                          return (
                            <Card className="conversion-card">
                              <Card.Header className="conversion-card-header">
                                <ContextAwareToggle eventKey={index}>
                                  <td className="col-1">
                                    <p className="conversion-details-text">
                                      {elem.HRMID}
                                    </p>
                                  </td>
                                  <td className="col-2">
                                    <div
                                      className="employee-details-col"
                                      title={elem.name}
                                    >
                                      <div className="employee-details-col-img">
                                        <ImageWithFallback
                                          src={`https://storagefortimetrigger.blob.core.windows.net/profile/${elem.emailId.split("@")[0]
                                            }.jpg`}
                                          fallbackSrc="small"
                                        />
                                      </div>
                                      <div className="employee-details-col-name">
                                        <p className="conversion-details-text conversion-status conversion-status-approved">
                                          {elem.Name}
                                        </p>
                                      </div>
                                    </div>
                                    {/* <p className="conversion-details-text conversion-status conversion-status-approved">
                                        {elem.Name}
                                      </p> */}
                                  </td>
                                  <td className="col-2">
                                    <p className="conversion-details-text">
                                      {elem["Reporting Manager"]}
                                    </p>
                                  </td>
                                  <td className="col-2">
                                    <p className="conversion-details-text">
                                      {elem["employee_type"]}
                                    </p>
                                  </td>
                                  <td className="col-1">
                                    <p
                                      className="conversion-details-text text-primary pointer"
                                      onClick={() =>
                                        elem["recordingLink"] !== null &&
                                        window.open(
                                          elem["recordingLink"],
                                          "_blank"
                                        )
                                      }
                                    >
                                      {elem["recordingLink"] == null
                                        ? "-"
                                        : "Link"}
                                    </p>
                                  </td>
                                  <td className="col-1">
                                    <p className="conversion-details-text">
                                      {elem["Verdict Date"]}
                                    </p>
                                  </td>
                                  <td className="col-1">
                                    <p className="conversion-details-text">
                                      {elem.conversionMonth.split("'")[0]}
                                    </p>
                                  </td>
                                  {elem.flag == true ? (
                                    <td className="col-2">
                                      <button
                                        className={`${elem.flag === true
                                          ? " notificationApprove"
                                          : " curson-block-disable notificationApprove"
                                          } ticketApprove `}
                                        onClick={() =>
                                          elem.flag == true &&
                                          actionoftl(elem.interviewId, 1)
                                        }
                                      >
                                        Approve
                                      </button>
                                      {elem.flag === true ? (
                                        <Button
                                          className="notificationReject"
                                          onClick={() =>
                                            actionoftl(elem.interviewId, 2)
                                          }
                                        >
                                          Reject
                                        </Button>
                                      ) : (
                                        <Button className="curson-block-disable notificationReject ticketReject ">
                                          Reject
                                        </Button>
                                      )}
                                    </td>
                                  ) : elem.actionTaken !== "" ? (
                                    <td
                                      className={`col-2 conversion-status-${elem.actionTaken}`}
                                    >
                                      {elem.actionTaken}
                                    </td>
                                  ) : (
                                    <td className="col-2">
                                      <button
                                        className={`${elem.flag === true
                                          ? " notificationApprove"
                                          : " curson-block-disable notificationApprove"
                                          } ticketApprove `}
                                        onClick={() =>
                                          elem.flag == true &&
                                          actionoftl(elem.interviewId, 1)
                                        }
                                      >
                                        Approve
                                      </button>
                                      {elem.flag === true ? (
                                        <Button
                                          className="notificationReject"
                                          onClick={() =>
                                            actionoftl(elem.interviewId, 2)
                                          }
                                        >
                                          Reject
                                        </Button>
                                      ) : (
                                        <Button className="curson-block-disable notificationReject ticketReject ">
                                          Reject
                                        </Button>
                                      )}
                                    </td>
                                  )}
                                </ContextAwareToggle>
                              </Card.Header>
                              <Accordion.Collapse eventKey={index}>
                                <Card.Body className="conversion-card-body">
                                  <div className="conversion-card-body-content">
                                    {elem.statusList.length > 0
                                      ? elem.statusList.map((innerelem) => {
                                        return (
                                          <div className="conversion-card-body-content-row">
                                            <div className="feedback-details-content col-10">
                                              <p className="feedback-profile col-2">
                                                {innerelem.name}{" "}
                                                <span>
                                                  {innerelem.position}
                                                </span>
                                              </p>
                                              <div className="feedback-status-div">
                                                <p
                                                  className={`feedback-status feedback-status-${innerelem.status}`}
                                                >
                                                  {innerelem.status}
                                                </p>
                                              </div>
                                            </div>
                                            <div className="col-2 con-req-tc">
                                              {innerelem.view == true ? (
                                                innerelem.position ==
                                                  "Reporting Manager" ? (
                                                  <InterviewFeedbackViewModalTL
                                                    modalinfo={
                                                      innerelem.viewDetails
                                                    }
                                                  />
                                                ) : (
                                                  <ProjectManagerFeedbackView
                                                    modalinfo={
                                                      innerelem.viewDetails
                                                    }
                                                  />
                                                )
                                              ) : null}
                                            </div>
                                          </div>
                                        );
                                      })
                                      : null}
                                  </div>
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          );
                        })
                        : null}
                    </Accordion>
                  </div>
                </Tab>
              ) : null}
              {requesttrigger["Conversion Request PM"] ? (
                <Tab
                  eventKey="Conversion Request PM"
                  title={`Conversion Request PM(${pmlist?.filter((elem) => elem.flag == null).length
                    })`}
                >
                  <div
                    className="tableFixHead overflow-y-scroll"
                    style={{ height: "68vh" }}
                  >
                    <div className="row col-12 notificationTiList">
                      <table className="table">
                        <thead className="notificationthead">
                          <tr className="notificationheadrow">
                            <th className="col-1 notificationTableHead nowrap first-table-col ps-3">
                              HRM
                            </th>
                            <th className="col-2 notificationTableHead nowrap offset-1">
                              Name
                            </th>
                            <th className="col-2 notificationTableHead nowrap">
                              Conversion Request
                            </th>
                            <th className="col-3 notificationTableHead nowrap">
                              Project Name
                            </th>
                            <th className="col-2 notificationTableHead nowrap">
                              Conversion Month
                            </th>
                            <th className="col-2 notificationTableHead nowrap ps-2">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {pmlist.length > 0
                            ? pmlist.map((elem) => {
                              return (
                                <tr className="notificationcontentrow">
                                  <td className="col-1 notificationTablecontent nowrap first-table-col ps-3">
                                    <p className="notificationContentText">
                                      {elem.employeeId}
                                    </p>
                                  </td>
                                  <td className="col-2 notificationTablecontent nowrap offset-1">
                                    <div
                                      className="employee-details-col"
                                      title={elem.name}
                                    >
                                      <div className="employee-details-col-img">
                                        <ImageWithFallback
                                          src={`https://storagefortimetrigger.blob.core.windows.net/profile/${elem.emailId.split("@")[0]
                                            }.jpg`}
                                          fallbackSrc="small"
                                        />
                                      </div>
                                      <div className="employee-details-col-name">
                                        <p className="notificationContentText">
                                          {elem.name}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="col-2 notificationTablecontent nowrap">
                                    <p className="notificationContentText">
                                      {elem.conversionType}
                                    </p>
                                  </td>
                                  <td className="col-3 notificationTablecontent nowrap">
                                    <p className="notificationContentText ">
                                      {elem.projectName}
                                    </p>
                                  </td>
                                  <td className="col-2 notificationTablecontent nowrap offset-1">
                                    <p className="notificationContentText">
                                      {elem.conversionMonth.split("'")[0]}
                                    </p>
                                  </td>
                                  <td className=" col-2 notificationTablecontent nowrap ">
                                    <div className="pm-conversion-req-td">
                                      {elem.flag == null ? (
                                        <ProjectManagerFeedbackForm
                                          info={elem}
                                        />
                                      ) : (
                                        <ProjectManagerFeedbackView
                                          modalinfo={elem.viewDetails}
                                        />
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                            : null}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Tab>
              ) : null}
              {requesttrigger["PIP Requests"] ? (
                <Tab
                  eventKey="PIP Requests"
                  title={`PIP Requests(${pipRequestsList?.filter((elem) => elem.approval_status === 0).length
                    })`}
                >
                  <div
                    className="tableFixHead overflow-y-scroll"
                    style={{ height: "68vh" }}
                  >
                    <div className="row col-12 notificationTiList">
                      <table className="table">
                        <thead className="notificationthead">
                          <tr className="notificationheadrow">
                            <th className="col-1 notificationTableHead nowrap first-table-col ps-3">
                              HRM
                            </th>
                            <th className="col-2 notificationTableHead nowrap offset-1">
                              Name
                            </th>
                            <th className="col-2 notificationTableHead nowrap">
                              PIP Request Type
                            </th>
                            <th className="col-3 notificationTableHead nowrap">
                              HR Buddy
                            </th>
                            <th className="col-2 notificationTableHead nowrap">
                              PIP Initialisation Date
                            </th>
                            <th className="col-2 notificationTableHead nowrap ps-2">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {pipRequestsList.length > 0
                            ? pipRequestsList.map((elem) => {
                              return (
                                <tr className="notificationcontentrow">
                                  <td className="col-1 notificationTablecontent nowrap first-table-col ps-3">
                                    <p className="notificationContentText">
                                      {elem?.HRMID}
                                    </p>
                                  </td>
                                  <td className="col-2 notificationTablecontent nowrap offset-1">
                                    <div
                                      className="employee-details-col"
                                      title={elem?.name}
                                    >
                                      <div className="employee-details-col-img">
                                        <ImageWithFallback
                                          src={`https://storagefortimetrigger.blob.core.windows.net/profile/${elem?.emailId.split("@")[0]
                                            }.jpg`}
                                          fallbackSrc="small"
                                        />
                                      </div>
                                      <div className="employee-details-col-name">
                                        <p className="notificationContentText">
                                          {elem?.name}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="col-2 notificationTablecontent nowrap">
                                    <p className="notificationContentText">
                                      {pipType[elem?.pipType - 1]}
                                    </p>
                                  </td>
                                  <td className="col-3 notificationTablecontent nowrap">
                                  <div
                                      className="employee-details-col"
                                      title={elem?.nameOfHr}
                                    >
                                      <div className="employee-details-col-img">
                                        <ImageWithFallback
                                          src={`https://storagefortimetrigger.blob.core.windows.net/profile/${elem?.emailIdOfHr.split("@")[0]
                                            }.jpg`}
                                          fallbackSrc="small"
                                        />
                                      </div>
                                      <div className="employee-details-col-name">
                                        <p className="notificationContentText">
                                          {elem?.nameOfHr}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="col-2 notificationTablecontent nowrap offset-1">
                                    <p className="notificationContentText">
                                      {moment(elem?.createdOn).format(
                                        "DD/MM/YYYY"
                                      )}
                                    </p>
                                  </td>
                                  <td className=" col-2 notificationTablecontent nowrap ">
                                    <button
                                      className={`${elem?.approval_status === 0
                                        ? " notificationApprove"
                                        : " curson-block-disable notificationApprove"
                                        } ticketApprove `}
                                      onClick={() =>
                                        elem.approval_status === 0 &&
                                        PIPActionFromMentor(elem?.CID, 1)
                                      }
                                    >
                                      Approve
                                    </button>
                                    <button className="notificationReject" onClick={() =>
                                      elem.approval_status === 0 &&
                                      PIPActionFromMentor(elem?.CID, 2)
                                    }>Reject</button>

                                  </td>
                                </tr>
                              );
                            })
                            : null}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Tab>
              ) : null}
            </Tabs>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Requestinnertabs;
