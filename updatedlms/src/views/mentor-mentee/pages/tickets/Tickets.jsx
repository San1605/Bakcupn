import React, { useContext, useEffect, useState } from "react";
import filterIcon from "../../../../assets/svg/menteeTickets/filter.svg";
import emptytickets from "../../../../assets/svg//emptytickets.svg";
import TicketPending from "../../../../component/tickets/ticketsStatusTiles/TicketPending";
import TicketApproved from "../../../../component/tickets/ticketsStatusTiles/TicketApproved";
import TicketsRejected from "../../../../component/tickets/ticketsStatusTiles/TicketsRejected";
import moment from "moment/moment";
import "./tickets.css";
import { GlobalContext } from "../../../../context/GlobalState";
import TicketsDescriptionModal from "../../../../component/ticketsDescriptionModal/TicketsDescriptionModal";
import Ticketcard from "../../../../component/ticketsCard/Ticketcard";
import { toast } from "react-hot-toast";
function Tickets() {
  const {
    tickets,
    allTickets,
    addTicket,
    sendtoperson,
    reasonsofticket,
    getTicketStatusInfo,
    ticketStatusInfo,
  } = useContext(GlobalContext);
  const [ticketReason, SetTicketReason] = useState();
  const [ticketDescription, SetTicketDescription] = useState();
  const [selectedlist, setSelectedlist] = useState([]);
  const [filter, setFilter] = useState(0);
  const [person, setPerson] = useState("");
  useEffect(() => {
    allTickets();
    document.title = `Tickets | ${process.env.REACT_APP_APP_NAME}`;
  }, []);
  useEffect(() => {
    if (tickets) {
      if (filter == 0) {
        setSelectedlist(tickets);
      } else if (filter == 1) {
        const searchfilter = tickets.filter(
          (data) => data.status == "Approved"
        );
        setSelectedlist(searchfilter);
      } else if (filter == 2) {
        const searchfilter = tickets.filter(
          (data) => data.status == "Rejected"
        );
        setSelectedlist(searchfilter);
      } else {
        const searchfilter = tickets.filter((data) => data.status == "Pending");
        setSelectedlist(searchfilter);
      }
    }
  }, [filter, tickets]);
  function Reset() {
    var dropperson = document.getElementById("selectPerson");
    var dropreason = document.getElementById("selectReason");
    dropperson.selectedIndex = 0;
    dropreason.selectedIndex = 0;
    setPerson("");
  }
  const raiseTicketSubmit = () => {
    if (ticketDescription && ticketReason) {
      const raiseTicket = {
        reason: ticketReason,
        description: ticketDescription,
        createdDate: new Date().toISOString(),
        sendTo: person,
      };
      console.log(raiseTicket, "dikkat");
      addTicket(raiseTicket);
      SetTicketDescription("");
      Reset();
    } else {
      toast.error("Required fields are not provided");
    }
  };
  useEffect(() => {
    if (tickets.length > 0) {
      SetTicketDescription();
      SetTicketReason();
    }
  }, [tickets]);

  useEffect(() => {
    if (person !== "") {
      sendtoperson(person);
    }
  }, [person]);

  useEffect(() => {
    if (reasonsofticket) {
      console.log(reasonsofticket);
    }
  }, [reasonsofticket]);
  useEffect(() => {
    getTicketStatusInfo();
  }, []);
  const [showfilter, setShowfilter] = useState(false);

  return (
    <div className="h-100 row">
      <div className="col-12 h-100 ">
        <div
          className="col-12 bg-white raiseTicketContainer"
          style={{ padding: "1rem 2.5rem" }}
        >
          <div className="row">
            <div className="col-md-9 col-12 bg-white uni-border pe-2">
              <div className="row ticketsHeading " style={{ fontSize: "18px" }}>
                Raise Ticket
              </div>
              <div className="row mt-2">
                <form className="row flex flex-column gap-2">
                  <div className="row mb-1">
                    <select
                      name="person"
                      id="selectPerson"
                      onChange={(e) => setPerson(e.target.value)}
                      className="col-2 px-3 py-2 rounded pointer"
                      required
                      style={{
                        textOverflow: "ellipsis",
                      }}
                    >
                      <option value="" hidden selected>
                        Raise To
                      </option>
                      <option value="Mentor" className="pointer">
                        Mentor
                      </option>
                      <option value="HR Buddy" className="pointer">
                        HR Buddy
                      </option>
                    </select>
                    <select
                      name="reason"
                      id="selectReason"
                      // defaultValue={ticketReason}
                      onChange={(e) => SetTicketReason(e.target.value)}
                      className={`w-25 px-3 py-2 rounded ms-3 pointer ${
                        person === "" ? "hideit" : ""
                      }`}
                      required
                      style={{
                        textOverflow: "ellipsis",
                      }}
                    >
                      <option value="" hidden selected>
                        Reason to Raise Ticket
                      </option>
                      {reasonsofticket.length !== 0
                        ? reasonsofticket.map((elem) => {
                            return (
                              <option value={`${elem.reasons}`}>
                                {elem.reasons}
                              </option>
                            );
                          })
                        : null}
                    </select>
                  </div>
                  <textarea
                    name="ticket description"
                    id="ticketDescription"
                    className="rounded textareaDescription px-3 py-2"
                    value={ticketDescription}
                    placeholder="Add description here..."
                    onChange={(e) => SetTicketDescription(e.target.value)}
                    required
                  ></textarea>
                  <div className="row pt-1 pb-2">
                    <button
                      className="raiseTicketButton px-3 py-2 rounded"
                      style={{ fontSize: "14px" }}
                      type="button"
                      onClick={() => raiseTicketSubmit()}
                    >
                      Raise a Ticket
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-3 col-12 ticketsHeight bg-white ">
              <div
                className="border rounded p-2"
                style={{ minHeight: " 268px" }}
              >
                <div className="d-flex justify-content-between px-1 pt-1">
                  <p
                    className="col-9 "
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                    }}
                  >
                    Tickets
                    <span className="menteesTotalCount">
                      {ticketStatusInfo.raised}
                    </span>
                  </p>
                </div>
                <div>
                  <Ticketcard />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 ">
            <div
              className="row ticketsHeading pb-2"
              style={{ fontSize: "18px" }}
            >
              Tickets History
            </div>
            <div
              className="bg-white uni-border tableFixHead "
              style={{
                maxHeight: "70vh",
                minHeight: "150px",
              }}
            >
              {tickets.length > 0 ? (
                <table className="table tickettable">
                  <thead className="thead ">
                    <tr className="trow">
                      <th className="col-2 first-table-col">Ticket No.</th>
                      <th className="col-2">Reason</th>
                      <th className="col-2">Description</th>
                      <th className="col-2">Raised To</th>
                      <th className="col-2 text-center">Created Date</th>
                      <th className="col-2 text-center">
                        Status
                        <span style={{ marginLeft: "5px" }}>
                          <img
                            src={filterIcon}
                            alt="filter icon"
                            className="pointer"
                            onClick={() => {
                              setShowfilter(!showfilter);
                            }}
                          />
                        </span>
                        {showfilter ? (
                          <div className=" position-absolute filter-options-div bg-white ">
                            <p
                              className="filter-option"
                              onClick={() => {
                                setFilter(0);
                                setShowfilter(!showfilter);
                              }}
                            >
                              All
                            </p>
                            <p
                              className="filter-option"
                              onClick={() => {
                                setFilter(3);
                                setShowfilter(!showfilter);
                              }}
                            >
                              Pending
                            </p>
                            <p
                              className="filter-option"
                              onClick={() => {
                                setFilter(1);
                                setShowfilter(!showfilter);
                              }}
                            >
                              Resolved
                            </p>
                            <p
                              className="filter-option"
                              onClick={() => {
                                setFilter(2);
                                setShowfilter(!showfilter);
                              }}
                            >
                              Rejected
                            </p>
                          </div>
                        ) : null}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedlist?.map((eachticket, index) => {
                      return (
                        <tr className="trow" key={index}>
                          <td className="col-2 first-table-col">{index + 1}</td>
                          <td
                            className="col-2"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            {eachticket.reason}
                          </td>
                          <td
                            className="col-2 "
                            style={{ columnGap: "1rem", whiteSpace: "nowrap" }}
                          >
                            <div
                              className="d-flex justify-content-between"
                              style={{ columnGap: "1rem" }}
                            >
                              <p
                                className="d-inline-block text-truncate"
                                style={{ maxWidth: "15rem" }}
                              >
                                {eachticket.description}
                              </p>
                              {eachticket.description.length <= 40 ? null : (
                                <div className="col-4">
                                  <TicketsDescriptionModal
                                    description={eachticket.description}
                                  />
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="col-2">{eachticket.sendTo}</td>
                          <td className="col-2 text-center">
                            {moment(eachticket.createdDate).format(
                              "DD-MM-YYYY"
                            )}
                          </td>
                          <td className="col-2 text-center px-3 w-100 d-flex justify-content-center">
                            {eachticket.status === "Approved" ? (
                              <TicketApproved />
                            ) : eachticket.status === "Rejected" ? (
                              <TicketsRejected />
                            ) : (
                              <TicketPending />
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div
                  className="h-100 w-100 d-flex align-items-center justify-content-center"
                  style={{
                    border: " 0.5px solid #eaeaea",
                    borderRadius: "5px",
                  }}
                >
                  <img src={emptytickets} alt="emptytickets" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tickets;
