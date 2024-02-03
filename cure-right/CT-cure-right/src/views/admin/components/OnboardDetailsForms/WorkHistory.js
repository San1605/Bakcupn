import React from "react";
import "../OnboardDoctor/OnboardDoctor.css";
import next_icon from "../../../admin/assets/icons/next_icon.svg";
import back_icon from "../../../admin/assets/icons/back_icon.svg";
import { validateFormInput } from "../../../../utils/helpers/validateFormInput";
import { toast } from "react-hot-toast";

const WorkHistory = ({
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
    let previousEmployementValid = validateFormInput(
      "previousEmployement",
      onboardPayload?.previousEmployement
    );
    let previousPositionValid = validateFormInput(
      "previousPosition",
      onboardPayload?.previousPosition
    );
    let privilegesValid = validateFormInput(
      "privileges",
      onboardPayload?.privileges
    );
    let DepartmentValid = validateFormInput(
      "Department",
      onboardPayload?.Department
    );
    let hospitalAffiliationsValid = validateFormInput(
      "hospitalAffiliations",
      onboardPayload?.hospitalAffiliations
    );

    if (
      (previousEmployementValid ||
        previousPositionValid ||
        privilegesValid ||
        DepartmentValid ||
        hospitalAffiliationsValid) !== ""
    ) {
      toast.dismiss(toastId);
      previousEmployementValid
        ? (toastId = toast.error(previousEmployementValid))
        : previousPositionValid
        ? (toastId = toast.error(previousPositionValid))
        : privilegesValid
        ? (toastId = toast.error(privilegesValid))
        : DepartmentValid
        ? (toastId = toast.error(DepartmentValid))
        : hospitalAffiliationsValid &&
          (toastId = toast.error(hospitalAffiliationsValid));
      console.log("Form is not valid");
    } else {
      // console.log("Form is not valid");
      // alert("fill all input values first...");
      setActiveTabIndex(val);
    }
  };
  return (
    <div className="onboard_detailss">
      <h3 className="personal mt-1 text-nowrap">Work History</h3>
      <div className="personal-border"></div>
      <form className="onboard-form" onSubmit={(e) => e.preventDefault()}>
        <div className="input-container">
          <label className="required">Previous employment</label>
          <br />
          <input
            name="previousEmployement"
            type="text"
            placeholder="Enter Previous employment"
            onChange={handleOnboardPayload}
            value={onboardPayload?.previousEmployement}
          />
        </div>
        <div className="input-container_cal  d-flex  w-50">
          <div className="input-container_cal1 ">
            <label className="required m-0">Date</label>
            <br />
            <label className="select-radio1 m-0">From</label>
            <br />
            <input
              className="onboard_cal"
              style={{ width: "88%" }}
              name="preEmployeeStartDate"
              type="date"
              placeholder="DD/MM/YYYY"
              onChange={handleOnboardPayload}
              value={onboardPayload?.preEmployeeStartDate}
            />
          </div>
          <div className="input-container_cal1">
            <br />
            <label className="select-radio1 m-0">To</label>
            <br />
            <input
              className="onboard_cal"
              style={{ width: "88%" }}
              name="preEmployeeendDate"
              type="date"
              placeholder="DD/MM/YYYY"
              onChange={handleOnboardPayload}
              value={onboardPayload?.preEmployeeendDate}
            />
          </div>
        </div>
        <div className="input-container">
          <label className="required">Previous position</label>
          <br />
          <input
            name="previousPosition"
            type="text"
            placeholder="Enter Previous position"
            onChange={handleOnboardPayload}
            value={onboardPayload?.previousPosition}
          />
        </div>
        <div className="input-container">
          <label className="required">Privileges</label>
          <br />
          <input
            name="privileges"
            type="text"
            placeholder="Enter Privileges"
            onChange={handleOnboardPayload}
            value={onboardPayload?.privileges}
          />
        </div>
        <div className="input-container">
          <label className="required">Department</label>
          <br />
          <input
            name="Department"
            type="text"
            placeholder="Enter Department"
            onChange={handleOnboardPayload}
            value={onboardPayload?.Department}
          />
        </div>
        <div className="input-container">
          <label className="required">Hospital affiliations</label>
          <br />
          <input
            name="hospitalAffiliations"
            type="text"
            placeholder="Enter Hospital affiliations"
            onChange={handleOnboardPayload}
            value={onboardPayload?.hospitalAffiliations}
          />
        </div>
        <div className="modal-button-container1">
          <button
            className="back_icon"
            onClick={() => {
              setActiveTabIndex(2);
            }}
          >
            <img src={back_icon} alt="" className="pe-2" />
            Back
          </button>
          <button
            className="next_icon"
            onClick={() => {
              //setActiveTabIndex(4)
              validateForm(4);
            }}
          >
            Next
            <img src={next_icon} alt="" />
          </button>
        </div>
      </form>
      {/* <div className="modal-button-container1">
                  <Button
                    type="primary-bordered"
                    className="border-0 py-2 px-4"
                    text="Back"
                    // onClick={handleBack}
                  />
                  <Button
                    type="primary"
                    className="py-2 px-4"
                    text="Next"
                    // onClick={handleSubmit}
                  />
                </div> */}
    </div>
  );
};

export default WorkHistory;