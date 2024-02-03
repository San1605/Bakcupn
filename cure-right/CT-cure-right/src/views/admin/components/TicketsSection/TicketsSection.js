import React, { useState } from "react";
import ticket from "../../../admin/assets/icons/ticket.svg";
import CustomDropdown from "../../../../components/CustomDropdown/CustomDropdown";

const TicketsSection = ({ ticketsList }) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="about_patient px-2 h-100 round-2 py-2">
      <div className="d-flex gap-1 mb-1 justify-content-between">
        <h5 className="about_patient_heading">Tickets Raised</h5>
        <span className="me-1">
          <CustomDropdown
            value={"Recent"}
            options={["1", "2", "3", "4"]}
            showOptions={showOptions}
            setShowOptions={setShowOptions}
          />
        </span>
      </div>
      <div className="about_ticket_info ">
        {ticketsList?.map((item) => {
          return (
            <div className="py-2 px-2 border-1 border-bottom ticket_info">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex gap-1">
                  <img src={ticket} alt="" className="ticket mb-1" />
                  <p className="ticket_id m-0">ID:</p>
                  <p className="ticket_number m-0">{item?.ticketId}</p>
                </div>
                <div className="ticket_date_and_time">
                  26-04-2023 | 03:30 PM
                </div>
              </div>
              <p className="ticket-description pt-1 m-0">
                {item?.description || "Dummy Description"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TicketsSection;
