import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import "./managerfeebackform.css";

function ProjectManagerFeedbackView(props) {
  const [reportshow, setReportshow] = useState(false);
  //   const [slidervalue, setSliderValue] = useState(0);

    const optionArr = [
      0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90,
      95, 100,
    ];
  //       const thumbValueUpdate = (event) => {
  //           setSliderValue(event.target.value);
  //            document.documentElement.style.setProperty(
  //              "--slidervalue",
  //              `${event.target.slidervalue}%`
  //            );

  //       };
  //   const getSliderBackgroundSize = () => {
  //     return { backgroundSize: `${(slidervalue * 100) / 100}% 100%` };
  //   };

  return (
    <>
      <p className="feedback-view" onClick={() => setReportshow(!reportshow)}>
        View
      </p>
      <Modal
        show={reportshow}
        // onHide={() => setReportshow(!reportshow)}
        size="lg"
        centered
        className="details-upload-modal"
      >
        <Modal.Header className="infoModalHead">
          <Modal.Title>Interview Feedback Submit</Modal.Title>
          <CloseButton
            style={{ fontSize: "12px" }}
            variant="white"
            onClick={() => setReportshow(!reportshow)}
          />
        </Modal.Header>
        <Modal.Body
          className="details-modalbody manager-feedback-modalbody mb-3"
          style={{
            height: "75vh",
            overflowY: "auto",
          }}
        >
          <div className="px-2 d-flex flex-column feedbackFormContainer">
            <div className="d-flex align-items-center justify-content-between">
              <div
                className="ratePerformanceContainer d-flex flex-column "
                style={{ width: "55%" }}
              >
                <div className="ratePerformanceHead">
                  <p>
                    Candidate Name
                    <span className="spanimp">*</span>
                  </p>
                </div>
                <div className="d-flex">
                  <input
                    type="text"
                    id="feedback"
                    className="w-100 rounded py-1 px-2"
                    placeholder="Enter your name here"
                    value={props?.modalinfo?.name}
                    disabled
                  />
                </div>
              </div>
              <div
                className="ratePerformanceContainer d-flex flex-column "
                style={{ width: "42%" }}
              >
                <div className="ratePerformanceHead">
                  <p>
                    HRM ID
                    <span className="spanimp">*</span>
                  </p>
                </div>
                <div className="d-flex">
                  <input
                    type="text"
                    id="feedback"
                    className="w-100 rounded py-1 px-2"
                    placeholder="Enter your HRM here"
                    value={props?.modalinfo?.HRMID}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="ratePerformanceContainer d-flex flex-column">
              <div className="ratePerformanceHead">
                <p>
                  Department
                  <span className="spanimp">*</span>
                </p>
              </div>
              <div className="d-flex">
                <input
                  type="text"
                  id="feedback"
                  className="w-100 rounded py-1 px-2"
                  placeholder="Enter department name here"
                  value={props?.modalinfo?.department}
                  disabled
                />
              </div>
            </div>
            <div className="ratePerformanceContainer d-flex flex-column">
              <div className="ratePerformanceHead">
                <p>
                  Please enter the name of the project for which the performance
                  feedback is being filled.
                  <span className="spanimp">*</span>
                </p>
              </div>
              <div className="d-flex">
                <input
                  type="text"
                  id="feedback"
                  className="w-100 rounded py-1 px-2"
                  placeholder="Enter Project name here"
                  value={props?.modalinfo?.currentProjects}
                  disabled
                />
              </div>
            </div>
            <div className="ratePerformanceContainer d-flex flex-column radios">
              <p className="ratePerformanceHead">
                Billable Status<span className="spanimp">*</span>
              </p>
              <div className="performanceOptions d-flex flex-col">
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="billable-status"
                    id="Billable"
                    className="inputRadio pt-1"
                    value="Billable"
                    checked={props?.modalinfo?.billableStatus === "Billable"}
                    disabled
                  />
                  <label htmlFor="Billable" className="radioBtnLabel">
                    Billable
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="billable-status"
                    className="inputRadio pt-1"
                    id="Non-Billable"
                    value="Non-Billable"
                    checked={
                      props?.modalinfo?.billableStatus === "Non-Billable"
                    }
                    disabled
                  />
                  <label htmlFor="Non-Billable" className="radioBtnLabel">
                    Non-Billable
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="billable-status"
                    className="inputRadio pt-1"
                    id="Shadow"
                    value="Shadow"
                    checked={props?.modalinfo?.billableStatus === "Shadow"}
                    disabled
                  />
                  <label htmlFor="Shadow" className="radioBtnLabel">
                    Shadow
                  </label>
                </div>
              </div>
            </div>
            <div className="ratePerformanceContainer d-flex flex-column">
              <div className="ratePerformanceHead">
                <p>
                  Please provide the skill set being utilized by the following
                  resources for the project.
                  <span className="spanimp">*</span>
                </p>
              </div>
              <div className=" d-flex">
                <textarea
                  name="overall Feedback"
                  id="feedback"
                  rows="2"
                  className="w-100 p-2 rounded"
                  placeholder="Enter the skill set being utilized by the resources for the project here"
                  value={props?.modalinfo?.skills}
                  disabled
                ></textarea>
              </div>
            </div>
            <div className="ratePerformanceContainer d-flex flex-column">
              <div className="ratePerformanceHead">
                <p>
                  Utilization of resource. (In percentage%).
                  <span className="spanimp">*</span>
                </p>
              </div>
              <div className=" d-flex">
                <select
                  name="utilization"
                  className="inputFieldTextarea dropdownstyle pointer w-100"
                  disabled
                >
                  <option value="" selected hidden>
                    {props?.modalinfo?.resourceUtilization}
                  </option>
                </select>
              </div>
            </div>
            {/* <div className="ratePerformanceContainer d-flex flex-column">
              <div className="ratePerformanceHead">
                <p>
                  Utilization of resource. (In percentage%)
                  <span className="spanimp">*</span>
                </p>
              </div>
              <div className="d-flex">
                <datalist
                  id="tickmarks"
                  className="d-flex w-100 justify-content-between"
                >
                  {optionArr.map((item) => {
                    return (
                      <option
                        className="utilization-values"
                        value={item}
                        label={item}
                      />
                    );
                  })}
                </datalist>
              </div>
              <div className="d-flex mt-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="form-range"
                  id="utilization-slider"
                  list="tickmarks"
                  step={5}
                  //   onChange={(e) => setSliderValue(e.target.value)}
                  onChange={thumbValueUpdate}
                  style={getSliderBackgroundSize()}
                  value={slidervalue}
                />
                <div className="slider-value">{slidervalue}</div>
              </div>
            </div> */}
            <div className="ratePerformanceContainer d-flex flex-column radios">
              <p className="ratePerformanceHead">
                Technical Skills (Areas of Work as per the 1-5 rating scale).
                <span className="spanimp">*</span>
              </p>
              <div className="performanceOptions d-flex flex-col">
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="techSkil"
                    id="Novice"
                    className="inputRadio pt-1"
                    value="Novice"
                    checked={props?.modalinfo?.technical === "Novice"}
                    disabled
                  />
                  <label htmlFor="Novice" className="radioBtnLabel">
                    1. Novice
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="techSkil"
                    className="inputRadio pt-1"
                    id="Intermediate"
                    value="Intermediate"
                    checked={props?.modalinfo?.technical === "Intermediate"}
                    disabled
                  />
                  <label htmlFor="Intermediate" className="radioBtnLabel">
                    2. Intermediate
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="techSkil"
                    className="inputRadio pt-1"
                    id="Competent"
                    value="Competent"
                    checked={props?.modalinfo?.technical === "Competent"}
                    disabled
                  />
                  <label htmlFor="Competent" className="radioBtnLabel">
                    3. Competent
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="techSkil"
                    className="inputRadio pt-1"
                    id="Proficient"
                    value="Proficient"
                    checked={props?.modalinfo?.technical === "Proficient"}
                    disabled
                  />
                  <label htmlFor="Proficient" className="radioBtnLabel">
                    4. Proficient
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="techSkil"
                    className="inputRadio pt-1"
                    id="Expert"
                    value="Expert"
                    checked={props?.modalinfo?.technical === "Expert"}
                    disabled
                  />
                  <label htmlFor="Expert" className="radioBtnLabel">
                    5. Expert
                  </label>
                </div>
              </div>
            </div>
            <div className="ratePerformanceContainer d-flex flex-column radios">
              <p className="ratePerformanceHead" style={{ display: "unset" }}>
                On scale of 1-5, Rate the performance and how efficiently the
                resource is able to accomplish the tasks that were assigned.
                <span className="spanimp">*</span>
              </p>
              <div className="performanceOptions d-flex flex-col">
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="efficiency"
                    id="Novice"
                    className="inputRadio pt-1"
                    value="Novice"
                    checked={props?.modalinfo?.performance === "Novice"}
                    disabled
                  />
                  <label htmlFor="Novice" className="radioBtnLabel">
                    1. Novice
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="efficiency"
                    className="inputRadio pt-1"
                    id="Intermediate"
                    value="Intermediate"
                    checked={props?.modalinfo?.performance === "Intermediate"}
                    disabled
                  />
                  <label htmlFor="Intermediate" className="radioBtnLabel">
                    2. Intermediate
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="efficiency"
                    className="inputRadio pt-1"
                    id="Competent"
                    value="Competent"
                    checked={props?.modalinfo?.performance === "Competent"}
                    disabled
                  />
                  <label htmlFor="Competent" className="radioBtnLabel">
                    3. Competent
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="efficiency"
                    className="inputRadio pt-1"
                    id="Proficient"
                    value="Proficient"
                    checked={props?.modalinfo?.performance === "Proficient"}
                    disabled
                  />
                  <label htmlFor="Proficient" className="radioBtnLabel">
                    4. Proficient
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="efficiency"
                    className="inputRadio pt-1"
                    id="Expert"
                    value="Expert"
                    checked={props?.modalinfo?.performance === "Expert"}
                    disabled
                  />
                  <label htmlFor="Expert" className="radioBtnLabel">
                    5. Expert
                  </label>
                </div>
              </div>
            </div>
            <div className="ratePerformanceContainer d-flex flex-column radios">
              <p className="ratePerformanceHead" style={{ display: "unset" }}>
                On scale of 1-5, Rate the quality of work and output resource
                represent as understanding the client and organization
                requirements.<span className="spanimp">*</span>
              </p>
              <div className="performanceOptions d-flex flex-col">
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="understanding"
                    id="Novice"
                    className="inputRadio pt-1"
                    value="Novice"
                    checked={props?.modalinfo?.workQuality === "Novice"}
                    disabled
                  />
                  <label htmlFor="Novice" className="radioBtnLabel">
                    1. Novice
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="understanding"
                    className="inputRadio pt-1"
                    id="Intermediate"
                    value="Intermediate"
                    checked={props?.modalinfo?.workQuality === "Intermediate"}
                    disabled
                  />
                  <label htmlFor="Intermediate" className="radioBtnLabel">
                    2. Intermediate
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="understanding"
                    className="inputRadio pt-1"
                    id="Competent"
                    value="Competent"
                    checked={props?.modalinfo?.workQuality === "Competent"}
                    disabled
                  />
                  <label htmlFor="Competent" className="radioBtnLabel">
                    3. Competent
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="understanding"
                    className="inputRadio pt-1"
                    id="Proficient"
                    value="Proficient"
                    checked={props?.modalinfo?.workQuality === "Proficient"}
                    disabled
                  />
                  <label htmlFor="Proficient" className="radioBtnLabel">
                    4. Proficient
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="understanding"
                    className="inputRadio pt-1"
                    id="Expert"
                    value="Expert"
                    checked={props?.modalinfo?.workQuality === "Expert"}
                    disabled
                  />
                  <label htmlFor="Expert" className="radioBtnLabel">
                    5. Expert
                  </label>
                </div>
              </div>
            </div>
            {/* <div className="ratePerformanceContainer d-flex flex-column radios">
              <p className="ratePerformanceHead" style={{ display: "unset" }}>
                Any achievements resource acquires while working in the
                projects?<span className="spanimp">*</span>
              </p>
              <div className="performanceOptions d-flex flex-col">
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="achievements"
                    id="Novice"
                    className="inputRadio pt-1"
                    value="Novice"
                  />
                  <label htmlFor="Novice" className="radioBtnLabel">
                    1. Novice
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="achievements"
                    className="inputRadio pt-1"
                    id="Intermediate"
                    value="Intermediate"
                  />
                  <label htmlFor="Intermediate" className="radioBtnLabel">
                    2. Intermediate
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="achievements"
                    className="inputRadio pt-1"
                    id="Competent"
                    value="Competent"
                  />
                  <label htmlFor="Competent" className="radioBtnLabel">
                    3. Competent
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="achievements"
                    className="inputRadio pt-1"
                    id="Proficient"
                    value="Proficient"
                  />
                  <label htmlFor="Proficient" className="radioBtnLabel">
                    4. Proficient
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="achievements"
                    className="inputRadio pt-1"
                    id="Expert"
                    value="Expert"
                  />
                  <label htmlFor="Expert" className="radioBtnLabel">
                    5. Expert
                  </label>
                </div>
              </div>
            </div> */}
            <div className="ratePerformanceContainer d-flex flex-column">
              <div className="ratePerformanceHead">
                <p>
                  Any achievements resource acquires while working in the
                  projects?
                  <span className="spanimp">*</span>
                </p>
              </div>
              <div className="d-flex">
                <input
                  type="text"
                  id="feedback"
                  className="w-100 rounded py-1 px-2"
                  placeholder="Enter your answer here"
                  value={props?.modalinfo?.achievements}
                  disabled
                />
              </div>
            </div>
            <div className="ratePerformanceContainer d-flex flex-column radios">
              <p className="ratePerformanceHead" style={{ display: "unset" }}>
              Is candidate eligible to be converted?
                <span className="spanimp">*</span>
              </p>
              <div className="performanceOptions d-flex flex-col">
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="independent"
                    id="Yes"
                    className="inputRadio pt-1"
                    value="Yes"
                    checked={props?.modalinfo?.independent === "Yes"}
                    disabled
                  />
                  <label htmlFor="Yes" className="radioBtnLabel">
                    Yes
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="independent"
                    className="inputRadio pt-1"
                    id="No"
                    value="No"
                    checked={props?.modalinfo?.independent === "No"}
                    disabled
                  />
                  <label htmlFor="No" className="radioBtnLabel">
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="feedback-submit-btn-container pe-1 mt-2 mb-3">
            <Button
              className="modal-inner-sec-btn"
              onClick={() => setReportshow(!reportshow)}
            >
              Cancel
            </Button>
            <Button
              className="modal-inner-primary-btn ms-3 me-1"
              onClick={() => setReportshow(!reportshow)}
            >
              Submit
            </Button>
          </div> */}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProjectManagerFeedbackView;
