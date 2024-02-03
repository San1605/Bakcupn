import React from "react";
import "../OnboardDoctor/OnboardDoctor.css";
import CustomRadioBtn from "../../../../components/CustomRadioBtn/CustomRadioBtn";
import Button from "../../../../components/Button/Button";
import next_icon from "../../../admin/assets/icons/next_icon.svg";
import back_icon from "../../../admin/assets/icons/back_icon.svg";
import { validateFormInput } from "../../../../utils/helpers/validateFormInput";
import { toast } from "react-hot-toast";

const Background = ({
  onboardPayload,
  setOnboardPayload,
  setActiveTabIndex,
}) => {
  let toastId;
  const handleOnboardPayload = (e) => {
    setOnboardPayload(() => {
      return {
        ...onboardPayload,
        [e.target.name]: e.target.value,
      };
    });
  };

  const validateForm = (val) => {
    let CriminalHistoryValid = validateFormInput(
      "CriminalHistory",
      onboardPayload?.CriminalHistory
    );
    let DisciplinaryActionsValid = validateFormInput(
      "previousPosition",
      onboardPayload?.DisciplinaryActions
    );
    let CriminalReasonValid = validateFormInput(
      "CriminalReason",
      onboardPayload?.CriminalReason
    );
    let DisciplinaryReasonsValid = validateFormInput(
      "DisciplinaryReasons",
      onboardPayload?.DisciplinaryReasons
    );

    if (
      (CriminalHistoryValid ||
        DisciplinaryActionsValid ||
        CriminalReasonValid ||
        DisciplinaryReasonsValid) !== ""
    ) {
      toast.dismiss(toastId);
      CriminalHistoryValid
        ? (toastId =toast.error(CriminalHistoryValid))
        : DisciplinaryActionsValid
        ? (toastId =toast.error(DisciplinaryActionsValid))
        : CriminalReasonValid
        ? (toastId =toast.error(CriminalReasonValid))
        : DisciplinaryReasonsValid && (toastId =toast.error(DisciplinaryReasonsValid));
      console.log("Form is not valid");
    } else {
      // console.log("Form is not valid");
      // alert("fill all input values first...");
      setActiveTabIndex(val);
    }
  };
  return (
    <div className="onboard_detailss">
      <h3 className="personal mt-1 text-nowrap">Background Checks</h3>
      <div className="personal-border"></div>
      <form className="onboard-form" onSubmit={(e) => e.preventDefault()}>
        <div className="input-container radio-container">
          <label className="required">Criminal history</label>
          <div className="select-theme d-flex align-items-center  gap-2 ">
            <CustomRadioBtn
              labelClass="select-radio"
              name="CriminalHistory"
              id="Yes"
              value="Yes"
              text="Yes"
              onChange={handleOnboardPayload}
              checked={onboardPayload?.CriminalHistory === "Yes"}
            />
            <CustomRadioBtn
              labelClass="select-radio"
              name="CriminalHistory"
              id="No"
              value="No"
              text="No"
              onChange={handleOnboardPayload}
              checked={onboardPayload?.CriminalHistory === "No"}
            />
          </div>
        </div>
        <div className="input-container radio-container">
          <label className="required">Disciplinary actions</label>
          <div className="select-theme d-flex align-items-center  gap-2 ">
            <CustomRadioBtn
              labelClass="select-radio"
              name="DisciplinaryActions"
              id="Yes0"
              value="Yes0"
              text="Yes"
              onChange={handleOnboardPayload}
              checked={onboardPayload?.DisciplinaryActions === "Yes0"}
            />
            <CustomRadioBtn
              labelClass="select-radio"
              name="DisciplinaryActions"
              id="No0"
              value="No0"
              text="No"
              onChange={handleOnboardPayload}
              checked={onboardPayload?.DisciplinaryActions === "No0"}
            />
          </div>
        </div>
        <div className="input-container">
          <label>Reason</label>
          <br />
          <input
            name="CriminalReason"
            type="text"
            placeholder="Enter Reason"
            onChange={handleOnboardPayload}
            value={onboardPayload?.CriminalReason}
          />
        </div>
        <div className="input-container">
          <label>Reason</label>
          <br />
          <input
            name="DisciplinaryReasons"
            type="text"
            placeholder="Enter Reason"
            onChange={handleOnboardPayload}
            value={onboardPayload?.DisciplinaryReasons}
          />
        </div>
        <div className="modal-button-container1">
          <button
            className="back_icon"
            onClick={() => {
              setActiveTabIndex(4);
            }}
          >
            <img src={back_icon} alt="" className="pe-2" />
            Back
          </button>
          <button
            className="next_icon"
            onClick={() => {
              //setActiveTabIndex(6)
              validateForm(6);
            }}
          >
            Next
            <img src={next_icon} alt="" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Background ;