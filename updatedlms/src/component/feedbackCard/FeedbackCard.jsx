import React from "react";
import { useNavigate } from "react-router-dom";
import profileimg from "../../assets/images/profileimg.png";
import TicketPending from "../tickets/ticketsStatusTiles/TicketPending";
import TicketApproved from "../tickets/ticketsStatusTiles/TicketApproved";
import TicketsRejected from "../tickets/ticketsStatusTiles/TicketsRejected";
import {HiOutlinePencil} from "react-icons/hi"
import "./feedback.css";

function FeedbackCard() {
  const navigateToFeedbackForm = useNavigate();
  {
    /* onClick={() => navigateToFeedbackForm("/feedbackform")} */
  }

  return (
    <>
      <div className="px-2 d-flex flex-column feedbackFormContainer">
        <div  className="feedbackFormHeadContainer d-flex align-items-center justify-content-between">
        <div className="feedbackFormHead ">Feedback</div>
        <HiOutlinePencil className="feedbackEditIcon"/>
        </div>
        <div className="mentorprofile d-flex align-items-center ">
          <div className="mentorProfileImg">
            <img src={profileimg} alt="profileimg" />
          </div>
          <div className="mentorProfileDetails">
            <p className="mentorName">Mentor Name</p>
            <p className="mentorDesignation">Assosiate UI/UX Designer</p>
          </div>
        </div>
        <div className="givenFeedbackContainer d-flex flex-column rounded p-3">
          <div className="w-10">
            <TicketPending />
          </div>
          <p className="givenFeedback text-justify">
            Scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letrasnd scrambled it to make a type specimen
            book. It has survived not only.
          </p>
        </div>
      </div>
    </>
  );
}

export default FeedbackCard;
