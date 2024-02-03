import React, { useState } from "react";
import "../DeleteConfirmationModal/DeleteConfirmationModal.css";
import CROSS_ICON from "../../assets/crossIcon.svg";
import { Rating } from "react-simple-star-rating";
import STAR_ICON from "../../assets/starIcon.svg";
import FEEDBACK_LIKE from "../../assets/feedbackLike.svg";
import FEEDBACK_DISLIKE from "../../assets/feedbackDisLike.svg";
import { useContext } from "react";
import { AppContext } from "../../utils/Context/AppContext";
import { updateFeedback } from "../../utils/services/api.js";
import toast from "react-hot-toast";
const FeedbackModal = ({ isOpen, onClose }) => {
  const [modalOpen, setModalOpen] = useState(isOpen);
  const [feedbackDesc, setFeedbackDesc] = useState("");
  const [loading, setLoading] = useState("");
  const { appData, dispatch } = useContext(AppContext);

  const closeModal = () => {
    setModalOpen(false);
    onClose();
  };

  const handleSubmit = async () => {
    setLoading(true);
    let toastId = toast.loading("loading...");
    // console.log(appData.feedbackModalOpen);
    let payload = {
      msgIndex: appData.feedbackModalOpen.msgIndex,
      queryType: appData.feedbackModalOpen.queryType,
      feedback: appData.feedbackModalOpen.feedbackValue,
      feedbackDescription: feedbackDesc,
      conversationId: appData.feedbackModalOpen.conversationId,
    };
    try {
      let response = await updateFeedback(payload);
      // console.log(response);
      await appData?.getConvo();
      toast.dismiss(toastId);
      closeModal();
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Some Error");
      // console.log(err);
    }
    setLoading(false);
  };

  const handleFeedbackChange = (e) => {
    setFeedbackDesc(e.target.value);
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-auto transition-opacity ${
        modalOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-center">
        <div className="modal-container pb-12 sm:pb-0">
          <div className="modal-content sm:w-[40%] sm:max-w-[80%] w-[90%] py-5 px-6">
            <div className="modal-header flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img className="h-[28px]" src={appData.feedbackModalOpen.feedbackValue=== "Positive" ? FEEDBACK_LIKE : FEEDBACK_DISLIKE} alt="" />
                <h1 className="text-[17x] font-medium text-[#242424]">
                  Provide Additional feedback
                </h1>
              </div>
              <img
                className="cursor-pointer"
                src={CROSS_ICON}
                alt=""
                onClick={closeModal}
              />
            </div>
            {/* <p className="w-[80%] text-[13px]">
              How would you like to rate your overall experience?
            </p> */}
            <div className="modal-body">
              <div className="inner">
                {/* <div className="w-full h-[60px] mt-4">
                  <Rating
                    onClick={handleRating1}
                    size={40}
                    transition
                    allowFraction
                    // showTooltip
                    tooltipArray={tooltipArray}
                    fillColorArray={fillColorArray}
                    SVGstyle={{ display: "inline" }}
                  />
                </div> */}
                <div className="">
                  <textarea
                    placeholder="Enter feedback here"
                    className="placeholder:text-[13px] outline-0 py-2 px-3 min-h-[6rem] max-h-[10rem] overflow-y-auto w-full border-[1.5px] text-[13px] border-[#E2E2E2] rounded-[5px]"
                    onChange={handleFeedbackChange}
                  >
                    {feedbackDesc}
                  </textarea>
                </div>
              </div>
              <div className="btn-cont flex pt-4 justify-end gap-[15px]">
                <button
                  className=" text-sm rounded-[3px] px-[12px] py-[6px] border-[1px] border-[#E1E1E1] text-[#424242]"
                  onClick={closeModal}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  className=" text-sm rounded-[3px] px-[12px] py-[6px] bg-[#2957A4] text-white"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
