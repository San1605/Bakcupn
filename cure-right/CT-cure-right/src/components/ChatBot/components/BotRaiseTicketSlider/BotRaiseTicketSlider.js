import React, { useState } from "react";
import "./BotRaiseTicketSlider.css";
import CustomDropdown from "../../../CustomDropdown/CustomDropdown";
import Button from "../../../Button/Button";
import drawerDragIcon from "../../../../assets/icons/drawerDragIcon.svg";
import closeIcon from "../../../../assets/icons/closeBot.svg";

const BotRaiseTicketSlider = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showOptions2, setShowOptions2] = useState(false);
  const [category, setCategory] = useState();
  const [concern, setConcern] = useState();
  const [appointmentId, setAppointmentId] = useState(0);
  const [description, setDescription] = useState();

  let dummyData = {
    category: [
      "Issue with app",
      "Issue with doctor",
      "Payment and refund related problem",
      "Miscellaneous",
    ],

    concern: {
      "Issue with app": [
        "Login/signup issue",
        "Issue while appointment",
        "Cannot upload files",
        "Report an issue with some functionality",
      ],

      "Issue with doctor": [
        "Doctor not responding",
        "Issue with behaviour of doctor",
        "Issue with medicine prescribed by doctor",
        "Change of doctor + Specific reason",
      ],

      "Payment and refund related problem": [
        "Refund status",
        "Payment deducted but service not provided",
        "Cannot add debit/credit card or UPI",
        "Overpaid for some service",
      ],

      Miscellaneous: [
        "Issue while setting profile",
        "How to raise appointment",
        "Write your issue with us",
        "Privacy/Personal issue",
      ],
    },
  };

  const handleRaiseTicketPayload = (name, elem) => {
    if (name === "category") {
      setCategory(elem);
    } else if (name === "concern") {
      setConcern(elem);
    } else if (name === "description") {
      setDescription(elem);
    } else if (name === "appointmentId") {
      setAppointmentId(elem);
    }
  };

  const handleSubmit = () => {
    let userValue = {
      userType: localStorage.getItem("userType"),
      userId: localStorage.getItem("userId"),
      appointmentId: appointmentId,
      category: category,
      concern: concern,
      description: description,
      flag: 1,
    };

    let metaData = {
      userType: localStorage.getItem("userType"),
      userId:localStorage.getItem("userId")
    }

    props?.sendEvent({
      type: "event",
      name: "showRaiseTicketCard",
      value: userValue,
      channelData:metaData  
    });
    props?.setShowRaiseTicketModal(false);
  };

  const handleCancel = () => {
    let userValue = { flag: 0 };
    props?.sendEvent({
      type: "event",
      name: "showRaiseTicketCard",
      value: userValue,
    });
    props?.setShowRaiseTicketModal(false);
  };

  return (
    <div
      className={`raise-ticket-drawer drawer-container ${
        props?.showRaiseTicketModal ? "open" : ""
      }`}
    >
      <img
        src={drawerDragIcon}
        alt=""
        className="drawerDragIcon"
        onClick={handleCancel}
      />
      <div className="ticket-header">
        <h5>Raise Ticket</h5>
        <img src={closeIcon} className="cross" alt="" onClick={handleCancel} />
      </div>
      <div className="ticket-form-container">
        <div className="input-container mt-1">
          <label>Select from the category?</label>
          <CustomDropdown
            className={"step-dropdown"}
            value={category}
            options={dummyData.category}
            //   options={props?.ticketsData?.category}
            showOptions={showOptions}
            setShowOptions={setShowOptions}
            onClick={handleRaiseTicketPayload}
            name="category"
          />
        </div>
        <div className="input-container mt-1">
          <label>What is your major concern?</label>
          <CustomDropdown
            className={"step-dropdown"}
            value={concern}
            options={dummyData?.concern[category]}
            //   options={props?.ticketsData?.concern[raiseTicketPayload?.category]}
            showOptions={showOptions2}
            setShowOptions={setShowOptions2}
            onClick={handleRaiseTicketPayload}
            name="concern"
          />
        </div>
        {category === "Issue with doctor" && (
          <div className="input-container mt-1 input-desc">
            <label>Appointment Id</label>
            <input
              className=""
              value={appointmentId}
              name="appointmentId"
              onChange={(e) =>
                handleRaiseTicketPayload(e?.target?.name, e?.target?.value)
              }
            />
          </div>
        )}
        <div className="input-container mt-1 input-desc">
          <label>Add Description</label>
          <input
            className=""
            value={description}
            name="description"
            onChange={(e) =>
              handleRaiseTicketPayload(e?.target?.name, e?.target?.value)
            }
          />
        </div>
        <div className="tick-raise-btn-container p-0">
          <div className="modal-button-container h-auto mt-3 p-0">
            <Button
              type="primary-bordered"
              className="border-0 py-1 px-4"
              text="Cancel"
              onClick={handleCancel}
            />
            <Button
              type="primary"
              className="py-1 px-4"
              text="Save"
              // disabled={fetchingPaymentLink}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotRaiseTicketSlider;
