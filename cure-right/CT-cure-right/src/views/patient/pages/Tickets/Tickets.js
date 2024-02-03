import React from "react";
import "./Tickets.css";
import Table from "react-bootstrap/Table";
import { useEffect } from "react";
import { useState } from "react";
import { getTicketsList } from "../../../../services/commonApi";
import { setPatientTicketsList } from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const Ticket = () => {
  const dispatch = useDispatch();
  const patientReducer = useSelector((state) => state.PatientReducer);
  const [isTicketsListLoading, setIsTicketsListLoading] = useState(false);

  const getPatientTickets = async (e) => {
    try {
      setIsTicketsListLoading(true);
      let res = await getTicketsList();
      let data = res?.data?.data;
      console.log(data.data, "tickets data");
      dispatch(setPatientTicketsList(data.data));
      setIsTicketsListLoading(false);
    } catch (err) {
      console.log("Some Error", err);
      toast.error("Some Error");
      setIsTicketsListLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "pending";
      case "Resolved":
        return "resolved";
      default:
        return "";
    }
  };

  function getFormattedDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so we add 1
    const year = date.getFullYear();

    return `${day < 10 ? "0" : ""}${day}-${
      month < 10 ? "0" : ""
    }${month}-${year}`;
  }

  function getFormattedTime(timeString) {
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
  }

  const getStatusValue = (status) => {
    switch (status) {
      case 0:
        return "Active";
      case 1:
        return "Resolved";
      case 2:
        return "Rejected";
      default:
        return "NA";
    }
  };

  useEffect(() => {
    getPatientTickets();
  }, []);

  return (
    <div className="tickete-status-page d-flex flex-column">
      <div className="home-top p-0 m-0 w-100">
        <div className="mb-0">
          <h3 className="heading-overview mb-1">Tickets Status</h3>
          <h2 className="heading-homepage">Homepage/tickets</h2>
        </div>
      </div>
      <Table className="table-responsive ticket-status-table w-100">
        <thead>
          <tr className="doctor_table_heading ">
            <th className="text-nowrap tid">Ticket ID</th>
            <th>Query</th>
            <th className="text-nowrap">Date | Time</th>
            <th>Action</th>
            <th>Description</th>
            <th>Resolution</th>
          </tr>
        </thead>
        <tbody className="">
          {(!isTicketsListLoading ||
            patientReducer?.patientTicketsList.length > 0) &&
            patientReducer?.patientTicketsList?.map((item, i) => {
              // console.log(item, "in map log");
              return (
                <tr key={i} className="onhover_tickets ">
                  <td className="ticket_font tid ">{item?.ticketId}</td>
                  <td className="ticket_font">{item?.category}</td>
                  <td className="text-nowrap">
                    <div className="ticket_font1">
                      {getFormattedDate(item?.createdAt)}
                    </div>
                    <div className="ticket_font">
                      {getFormattedTime(item?.createdAt)}
                    </div>
                  </td>
                  <td className={`ticket_font2 ${getStatusColor("Pending")}`}>
                    {getStatusValue(item?.status)}
                  </td>
                  <td className="ticket_font text-nowrap col-desc">
                    {item?.description || "NA"}
                  </td>
                  <td className="ticket_font text-nowrap col-desc">
                    {item?.Resolution || "In progress"}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {/* {isTicketsListLoading && (
        <div className="loaderCont">
          <Loader />
        </div>
      )} */}
    </div>
  );
};

export default Ticket;
