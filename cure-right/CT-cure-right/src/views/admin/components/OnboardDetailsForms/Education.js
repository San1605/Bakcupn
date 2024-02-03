import React from "react";
import "../OnboardDoctor/OnboardDoctor.css";
import CustomRadioBtn from "../../../../components/CustomRadioBtn/CustomRadioBtn";
import Button from "../../../../components/Button/Button";
import next_icon from "../../../admin/assets/icons/next_icon.svg";
import back_icon from "../../../admin/assets/icons/back_icon.svg";
import { validateFormInput } from "../../../../utils/helpers/validateFormInput";
import { toast } from "react-hot-toast";

const Education = ({
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

  const storeFiles = (e) => {
    setOnboardPayload(() => {
      return {
        ...onboardPayload,
        [e.target.name]: e.target.files[0],
      };
    });
  };

  const validateForm = (val) => {
    let medicalSchoolValid = validateFormInput(
      "medicalSchool",
      onboardPayload?.medicalSchool
    );
    let TrainingProgramCompletedValid = validateFormInput(
      "TrainingProgramCompleted",
      onboardPayload?.TrainingProgramCompleted
    );
    let uploadDegreeValid = validateFormInput(
      "uploadDegree",
      onboardPayload?.uploadDegree
    );
    let CMEValid = validateFormInput("CME", onboardPayload?.CME);
    let uploadTrainingCertificateValid = validateFormInput(
      "uploadTrainingCertificate",
      onboardPayload?.uploadTrainingCertificate
    );

    if (
      (medicalSchoolValid ||
        TrainingProgramCompletedValid ||
        uploadDegreeValid ||
        CMEValid ||
        uploadTrainingCertificateValid) !== ""
    ) {
      toast.dismiss(toastId);
      medicalSchoolValid
        ? (toastId = toast.error(medicalSchoolValid))
        : TrainingProgramCompletedValid
        ? (toastId = toast.error(TrainingProgramCompletedValid))
        : uploadDegreeValid
        ? (toastId = toast.error(uploadDegreeValid))
        : CMEValid
        ? (toastId = toast.error(CMEValid))
        : uploadTrainingCertificateValid &&
          (toastId = toast.error(uploadTrainingCertificateValid));
      console.log("Form is not valid");
    } else {
      // console.log("Form is not valid");
      // alert("fill all input values first...");
      setActiveTabIndex(val);
    }
  };
  return (
    <div className="onboard_detailss">
      <h3 className="personal mt-1 text-nowrap">Education & Trainings</h3>
      <div className="personal-border"></div>
      <form className="onboard-form" onSubmit={(e) => e.preventDefault()}>
        <div className="input-container">
          <label className="required">Medical School</label>
          <br />
          <input
            name="medicalSchool"
            type="text"
            placeholder="Enter Medical School"
            onChange={handleOnboardPayload}
            value={onboardPayload?.medicalSchool}
          />
        </div>
        <div className="input-container_cal  d-flex w-50">
          <div className="input-container_cal1 ">
            <label className="required m-0">Date</label>
            <br />
            <label className="select-radio1 m-0">From</label>
            <br />
            <input
              className="onboard_cal"
              style={{ width: "88%" }}
              name="SchoolstartDate"
              type="date"
              placeholder="DD/MM/YYYY"
              onChange={handleOnboardPayload}
              value={onboardPayload?.SchoolstartDate}
            />
          </div>
          <div className="input-container_cal1">
            <br />
            <label className="select-radio1 m-0">To</label>
            <br />
            <input
              className="onboard_cal"
              style={{ width: "88%" }}
              name="SchoolendDate"
              type="date"
              placeholder="DD/MM/YYYY"
              onChange={handleOnboardPayload}
              value={onboardPayload?.SchoolendDate}
            />
          </div>
        </div>
        <div className="input-container">
          <label className="required">Training program completed</label>
          <br />
          <input
            name="TrainingProgramCompleted"
            type="text"
            placeholder="Enter Training program completed"
            onChange={handleOnboardPayload}
            value={onboardPayload?.TrainingProgramCompleted}
          />
        </div>
        <div className="input-container">
          <label className="required">Upload Degree</label>
          <br />
          <input name="uploadDegree" type="file" onChange={storeFiles} />
        </div>
        <div className="input-container">
          <label className="required">Continuing medical education (CME)</label>
          <br />
          <input
            name="CME"
            type="text"
            placeholder="Enter CME"
            onChange={handleOnboardPayload}
            value={onboardPayload?.CME}
          />
        </div>
        <div className="input-container">
          <label className="required">Upload Training Certificate</label>
          <br />
          <input
            name="uploadTrainingCertificate"
            type="file"
            onChange={storeFiles}
          />
        </div>
        <div className="input-container">
          <label className="required">Graduation year</label>
          <br />
          <select
            className="input-container onboard-select"
            name="graduationYear"
            onChange={handleOnboardPayload}
          >
            <option value="" disabled selected>
              Select year
            </option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <div className="modal-button-container1">
          <button
            className="back_icon"
            onClick={() => {
              setActiveTabIndex(1);
            }}
          >
            <img src={back_icon} alt="" className="pe-2" />
            Back
          </button>
          <button
            className="next_icon"
            onClick={() => {
              //setActiveTabIndex(3)
              validateForm(3);
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

export default Education;
