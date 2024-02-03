import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import "./feedbackmodal.css";
import { AiOutlineInfoCircle } from "react-icons/ai";
import viewsvg from "../../assets/svg/mentorReport/view.svg";
import tippy from "tippy.js";

function InterviewFeedbackViewModalTL(props) {
  const [reportshow, setReportshow] = useState(false);
  const [prlist, setPrlist] = useState([]);
  const channel = [1, 2, 3, 4, 5];
  useEffect(() => {
    if (reportshow) {
      if (props.modalinfo.projectDetails.length == 1) {
        if (props.modalinfo.projectDetails[0].cprojectName !== null) {
          setPrlist(props.modalinfo.projectDetails);
        }
      } else {
        setPrlist(props.modalinfo.projectDetails);
      }
    }
  }, [reportshow]);
  // tippy(".technical-icon", {
  //   content:
  //     '<div class="report-icon-tooltip-container"> <div class="reportinfo-icon-tooltip-text"> <p>1 (Poor: Knowledge of basic introductory questions only & concept are not up to the mark).</p><p>2 (Average: Knows Basic and Medium type questions).</p><p>3 (Good: Can shadow a project. Knows Intermediate questions).</p><p>4 (Very Good: Can work on project. Knowledge of Deep complex questions).</p><p>5 (Excellent: Can lead a Project individually. Has a good knowledge in all the skills mentioned in resume.).</p></div> </div>',
  //   allowHTML: true,
  //   placement: "bottom",
  //   arrow: true,
  //   animation: "fade",
  // });
  // tippy(".communication-icon", {
  //   content:
  //     '<div class="report-icon-tooltip-container"> <div class="reportinfo-icon-tooltip-text"> <p>1 (Not Considerable: Cannot express himself or herself).</p><p>2 (Poor: Communication satisfactory, no voice modulation, lacks motivation).</p><p>3 (Average: Lacks expression, communication is good, voice modulation is average, situational understanding is good).</p><p>4 (Very Good: Body language and hand gestures facial expression are prompt, theres eye contact, communication is good, voice modulation is good, confident, can handle work pressure).</p><p>5 (Excellent: Effective and impressive communication, promptness, use of hand gestures, and eye contact. Facial expression and body language is impressive. voice modulation is there, talks comfortably, leadership qualities, easily handles work pressure).</p></div> </div>',
  //   allowHTML: true,
  //   placement: "bottom",
  //   arrow: true,
  //   animation: "fade",
  // });
  // tippy(".internal-icon", {
  //   content:
  //     '<div class="report-icon-tooltip-container"> <div class="reportinfo-icon-tooltip-text"> <p>1 (Not Considerable): Not actively work on internal task & not done with any POC till date.</p><p>2 (Poor); Consume more time in task completions than usual & not done with any POC till date.</p><p>3 (Average): Doing good but have potential to better in both internal task & POC</p><p>4 (Very Good): Performance is satisfactory well in both internal task & in POC.</p><p>5 (Excellent): Pro performer with excellency in work completion & POC review is good too.</p></div> </div>',
  //   allowHTML: true,
  //   placement: "bottom",
  //   arrow: true,
  //   animation: "fade",
  // });
  return (
    <div className="viewinterviewfeedback">
      <p className="feedback-view " onClick={() => setReportshow(!reportshow)}>
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
          <Modal.Title>Interview Feedback View</Modal.Title>
          <CloseButton
            style={{ fontSize: "12px" }}
            variant="white"
            onClick={() => setReportshow(!reportshow)}
          />
        </Modal.Header>
        <Modal.Body
          className="details-modalbody interview-feedback-modalbody"
          style={{
            height: "75vh",
            overflow: "scroll",
          }}
        >
          <div className="px-2 d-flex flex-column feedbackFormContainer">
            <div className="feedbackFormHead ">Feedback</div>
            <div className="rating-cards">
              <div className="rating-card border justify-content-between ">
                <div className="rating-card-head">
                  <p>
                    Rate mentee’s communication score
                    <span className="spanimp">*</span>
                  </p>
                  <div className="px-2">
                    <button
                      type="button"
                      style={{ border: "none", background: "none" }}
                      data-toggle="tooltip"
                      data-html="true"
                      data-placement="bottom"
                      title="
                       &nbsp; 1 (Not Considerable: Cannot express himself or herself).
                       2 (Poor: Communication satisfactory, no voice modulation, lacks motivation).
                       3 (Average: Lacks expression, communication is good, voice modulation is average, situational understanding is good).
                       4 (Very Good: Body language and hand gestures facial expression are prompt, theres eye contact, communication is good, voice modulation is good, confident, can handle work pressure).
                       5 (Excellent: Effective and impressive communication, promptness, use of hand gestures, and eye contact. Facial expression and body language is impressive. voice modulation is there, talks comfortably, leadership qualities, easily handles work pressure."
                    >
                      <AiOutlineInfoCircle
                        className="communication-icon pointer"
                        style={{ color: "#4F52B2", fontSize: "15px" }}
                      />
                    </button>
                  </div>
                </div>

                <div className="rating-card-counts">
                  {channel.map((elem) => {
                    return (
                      <div
                        className={
                          props.modalinfo.communicationScore == elem
                            ? "countonclick blocked-input"
                            : "count-block count-block-view  "
                        }
                      >
                        {elem}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rating-card border justify-content-between ">
                <div className="rating-card-head">
                  <p>
                    Rate mentee’s technical score
                    <span className="spanimp">*</span>
                  </p>
                  <div className="px-2">
                    <button
                      type="button"
                      style={{ border: "none", background: "none" }}
                      data-toggle="tooltip"
                      data-html="true"
                      data-placement="bottom"
                      title="
                       &nbsp; 1 (Poor: Knowledge of basic introductory questions only & concept are not up to the mark).
                    2 (Average: Knows Basic and Medium type questions).
                    3 (Good: Can shadow a project. Knows Intermediate questions).
                    4 (Very Good: Can work on project. Knowledge of Deep complex questions).
                    5 (Excellent: Can lead a Project individually. Has a good knowledge in all the skills mentioned in resume.)."
                    >
                      <AiOutlineInfoCircle
                        className="technical-icon pointer"
                        style={{ color: "#4F52B2", fontSize: "15px" }}
                      />
                    </button>
                  </div>
                </div>
                <div className="rating-card-counts">
                  {channel.map((elem) => {
                    return (
                      <div
                        className={
                          props?.modalinfo?.technicalScore == elem
                            ? "countonclick blocked-input"
                            : "count-block count-block-view"
                        }
                      >
                        {elem}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rating-card border justify-content-between ">
                <div className="rating-card-head">
                  <p>
                    Rate mentee’s Learning Adaptibility
                    <span className="spanimp">*</span>
                  </p>
                </div>
                <div className="rating-card-counts">
                  {channel.map((elem) => {
                    return (
                      <div
                        className={
                          props?.modalinfo?.learningAdaptibility == elem
                            ? "countonclick blocked-input"
                            : "count-block count-block-view"
                        }
                      >
                        {elem}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rating-card border justify-content-between ">
                <div className="rating-card-head">
                  <p>
                    Punctuality Status<span className="spanimp">*</span>
                  </p>
                </div>
                <div className="rating-card-counts">
                  {channel.map((elem) => {
                    return (
                      <div
                        className={
                          props?.modalinfo?.punctuality == elem
                            ? "countonclick blocked-input"
                            : "count-block count-block-view"
                        }
                      >
                        {elem}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rating-card border justify-content-between ">
                <div className="rating-card-head">
                  <p>
                    Performance in internal tasks as shadow resource/ POC Work
                    Review
                    <span className="spanimp">*</span>
                  </p>
                  <div className="px-2">
                    <button
                      type="button"
                      style={{ border: "none", background: "none" }}
                      data-toggle="tooltip"
                      data-html="true"
                      data-placement="bottom"
                      title="
                      1 (Not Considerable): Not actively work on internal task & not done with any POC till date.
                      2 (Poor); Consume more time in task completions than usual & not done with any POC till date.
                      3 (Average): Doing good but have potential to better in both internal task & POC
                      4 (Very Good): Performance is satisfactory well in both internal task & in POC.
                      5 (Excellent): Pro performer with excellency in work completion & POC review is good too."
                    >
                      <AiOutlineInfoCircle
                        className="internal-icon pointer"
                        style={{ color: "#4F52B2", fontSize: "15px" }}
                      />
                    </button>
                  </div>
                </div>
                <div className="rating-card-counts">
                  {channel.map((elem) => {
                    return (
                      <div
                        className={
                          props?.modalinfo?.taskPerformance == elem
                            ? "countonclick blocked-input"
                            : "count-block count-block-view"
                        }
                      >
                        {elem}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rating-card border justify-content-between ">
                <div className="rating-card-head">
                  <p>
                    Has the concerned resource updated his/her resume as per
                    his/her current skills? <span className="spanimp">*</span>
                  </p>
                </div>
                <div className="rating-card-counts">
                  <div className="performenceRadioBtnContainer d-flex">
                    <input
                      type="radio"
                      name="concern"
                      disabled
                      className="inputRadio pt-1"
                      id="yes"
                      value="yes"
                      checked={
                        props?.modalinfo?.isResumeUpdated?.toLowerCase() ===
                        "yes"
                      }
                    />
                    <label htmlFor="Yes" className="radioBtnLabel">
                      Yes
                    </label>
                  </div>
                  <div className="performenceRadioBtnContainer d-flex">
                    <input
                      type="radio"
                      name="concern"
                      disabled
                      className="inputRadio pt-1"
                      id="no"
                      value="no"
                      checked={
                        props?.modalinfo?.isResumeUpdated?.toLowerCase() ===
                        "no"
                      }
                    />
                    <label htmlFor="No" className="radioBtnLabel">
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="ratePerformanceContainer d-flex flex-column">
              <p className="ratePerformanceHead">
                Overall Performance<span className="spanimp">*</span>
              </p>
              <div className="performanceOptions d-flex flex-col">
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="performance"
                    checked={
                      props?.modalinfo?.overallPerformance === "Excellent"
                    }
                    id="excellent"
                    disabled
                    className="inputRadio pt-1"
                    value="Excellent"
                  />
                  <label htmlFor="excellent" className="radioBtnLabel">
                    Excellent
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="performance"
                    checked={props?.modalinfo?.overallPerformance === "Good"}
                    disabled
                    className="inputRadio pt-1"
                    id="good"
                    value="Good"
                  />
                  <label htmlFor="good" className="radioBtnLabel">
                    Good
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="performance"
                    checked={
                      props?.modalinfo?.overallPerformance === "Above Average"
                    }
                    disabled
                    className="inputRadio pt-1"
                    id="average"
                    value="Above Average"
                  />
                  <label htmlFor="average" className="radioBtnLabel">
                    Above Average
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="performance"
                    checked={props?.modalinfo?.overallPerformance === "Poor"}
                    disabled
                    className="inputRadio pt-1"
                    id="Poor"
                    value="Poor"
                  />
                  <label htmlFor="Poor" className="radioBtnLabel">
                    Poor
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="performance"
                    checked={props?.modalinfo?.overallPerformance === "PIP"}
                    disabled
                    className="inputRadio pt-1"
                    id="PIP"
                    value="PIP"
                  />
                  <label htmlFor="PIP" className="radioBtnLabel">
                    PIP
                  </label>
                </div>
              </div>
            </div>
            <div className="ratePerformanceContainer d-flex flex-column">
              <div className="ratePerformanceHead">
                <p>
                  Candidate Strength's in Technical Area. ( You can mention the
                  questions that were answered correctly in this section)
                  <span className="spanimp">*</span>
                </p>
              </div>
              <div className="performanceOptions d-flex">
                <textarea
                  type="text"
                  id="feedback"
                  className="w-100 rounded py-1 px-2 viewfeedback-input"
                  value={props?.modalinfo?.strengthInTechnical}
                  disabled
                />
              </div>
            </div>
            <div className="ratePerformanceContainer d-flex flex-column">
              <div className="ratePerformanceHead">
                <p>
                  Candidate Weakness in the technical areas. ( You can mention
                  the questions that were answered incorrectly in this section)
                  <span className="spanimp">*</span>
                </p>
              </div>
              <div className="performanceOptions d-flex">
                <textarea
                  type="text"
                  id="feedback"
                  className="w-100 rounded py-1 px-2 viewfeedback-input"
                  value={props?.modalinfo?.weaknessInTechnical}
                  disabled
                />
              </div>
            </div>
            <div className="ratePerformanceContainer d-flex flex-column">
              <div className="ratePerformanceHead">
                <p>
                  Candidate improvement area's (Mention at least 2-3 points)
                  <span className="spanimp">*</span>
                </p>
              </div>
              <div className="performanceOptions d-flex">
                <textarea
                  id="feedback"
                  className="w-100 rounded py-1 px-2 viewfeedback-input"
                  value={props?.modalinfo?.improvementArea}
                  disabled
                />
              </div>
            </div>
            <div className="ratePerformanceContainer d-flex flex-column">
              <div className="ratePerformanceHead">
                <p>
                  Please enter below the comprehensive list of all the projects
                  the candidate has worked on.
                  <span className="spanimp">*</span>
                </p>
              </div>
              <div className="performanceOptions d-flex">
                <textarea
                  type="text"
                  id="feedback"
                  placeholder="Enter comma seperated values only"
                  className="w-100 rounded py-1 px-2"
                  value={props?.modalinfo?.projectList}
                  disabled
                />
              </div>
            </div>
            <div className="ratePerformanceContainer d-flex flex-column">
              <div className="ratePerformanceHead">
                <p>
                  Has he/she pursued/completed any POC? If yes mention the
                  details.
                  <span className="spanimp">*</span>
                </p>
              </div>
              <div className="performanceOptions d-flex">
                <textarea
                  type="text"
                  id="feedback"
                  className="w-100 rounded py-1 px-2 viewfeedback-input"
                  value={props?.modalinfo?.POC}
                  disabled
                />
              </div>
            </div>
            <div className="ratePerformanceContainer d-flex flex-column">
              <p className="ratePerformanceHead">
                Have relocated to Office Location or not ?
                <span className="spanimp">*</span>
              </p>
              <div className="performanceOptions d-flex flex-col">
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="relocate"
                    id="yes"
                    className="inputRadio pt-1"
                    value="Yes"
                    disabled
                    checked={props.modalinfo.relocatedToOffice == "Yes"}
                  />
                  <label htmlFor="excellent" className="radioBtnLabel">
                    Yes
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="relocate"
                    className="inputRadio pt-1"
                    id="no"
                    value="no"
                    disabled
                    checked={props.modalinfo.relocatedToOffice == "no"}
                  />
                  <label htmlFor="good" className="radioBtnLabel">
                    No
                  </label>
                </div>
              </div>
            </div>
              <div className="ratePerformanceContainer d-flex flex-column">
              <p className="ratePerformanceHead">
                Coming to Office regularly or not ?
                <span className="spanimp">*</span>
              </p>
              <div className="performanceOptions d-flex flex-col">
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="office"
                    id="yes"
                    className="inputRadio pt-1"
                    value="Yes"
                    disabled
                    checked={props.modalinfo.comingToOffice == "Yes"}
                  />
                  <label htmlFor="excellent" className="radioBtnLabel">
                    Yes
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="office"
                    className="inputRadio pt-1"
                    id="no"
                    value="no"
                    disabled
                    checked={props.modalinfo.comingToOffice == "no"}
                  />
                  <label htmlFor="good" className="radioBtnLabel">
                    No
                  </label>
                </div>
              </div>
            </div>
            
            <div className="conversion-additon-info d-flex flex-column feedbackFormContainer">
             <div className="ratePerformanceContainer d-flex flex-column">
                  <p className="ratePerformanceHead">
                    How many Monthly Mock Interviews have been updated on LMS as
                    of now?
                    <span className="spanimp">*</span>
                  </p>
                  <div className="performanceOptions d-flex">
                    <input
                      type="text"
                      id="feedback"
                      className="w-100 rounded py-1 px-2"
                      value={props.modalinfo.noOfMonthlyMock}
                      disabled
                    />
                  </div>
                </div>
                {props.modalinfo.reasonOfUndeploybility !== "" && <div className="ratePerformanceContainer d-flex flex-column">
                  <p className="ratePerformanceHead">
                    If the resource is not deployed on the project till now then
                    the reason of undeploybility?
                  </p>
                  <div className="performanceOptions d-flex">
                    <input
                      type="text"
                      id="feedback"
                      className="w-100 rounded py-1 px-2"
                      value={props.modalinfo.reasonOfUndeploybility}
                      disabled
                    />
                  </div>
                </div>}
                <div className="ratePerformanceContainer d-flex flex-column">
                  <p className="ratePerformanceHead">
                    How often the candidate takes the leaves in the month?
                    <span className="spanimp">*</span>
                  </p>
                  <div className="performanceOptions d-flex">
                    <input
                      type="text"
                      id="feedback"
                      className="w-100 rounded py-1 px-2"
                      value={props.modalinfo.leavesInMonth}
                      disabled
                    />
                  </div>
                </div>
                <div className="ratePerformanceContainer d-flex flex-column">
                  <p className="ratePerformanceHead">
                    LP Paths completed?
                    <span className="spanimp">*</span>
                  </p>
                  <div className="performanceOptions d-flex">
                    <textarea
                      type="text"
                      id="feedback"
                      placeholder="Enter comma seperated values only"
                      className="w-100 rounded py-1 px-2"
                      value={props.modalinfo.lpsCompleted}
                      disabled
                    />
                  </div>
                </div>
                <div className="ratePerformanceContainer d-flex flex-column">
                  <p className="ratePerformanceHead">
                    Any Certification is done after joining Celebal?
                    <span className="spanimp">*</span>
                  </p>
                  <div className="performanceOptions d-flex">
                    <textarea
                      type="text"
                      id="feedback"
                      className="w-100 rounded py-1 px-2"
                      value={props.modalinfo.certifications}
                      disabled
                    />
                  </div>
                </div>
                <div className="ratePerformanceContainer d-flex flex-column">
                  <p className="ratePerformanceHead">
                    Rigidness of the resource towards the working hours of 10:00
                    am to 7:00 pm?
                    <span className="spanimp">*</span>
                  </p>
                  <div className="performanceOptions d-flex flex-col">
                    <div className="performenceRadioBtnContainer d-flex">
                      <input
                        type="radio"
                        name="Rigidness"
                        id="low"
                        className="inputRadio pt-1"
                        value="Low"
                        checked={props.modalinfo.rigidnessOfResource == "Low"}
                        disabled
                      />
                      <label htmlFor="excellent" className="radioBtnLabel">
                        Low
                      </label>
                    </div>
                    <div className="performenceRadioBtnContainer d-flex">
                      <input
                        type="radio"
                        name="Rigidness"
                        className="inputRadio pt-1"
                        id="morderate"
                        value="Moderate"
                        checked={props.modalinfo.rigidnessOfResource == "Moderate"}
                        disabled
                      />
                      <label htmlFor="good" className="radioBtnLabel">
                        Moderate
                      </label>
                    </div>
                    <div className="performenceRadioBtnContainer d-flex">
                      <input
                        type="radio"
                        name="Rigidness"
                        className="inputRadio pt-1"
                        id="high"
                        value="High"
                        checked={props.modalinfo.rigidnessOfResource == "High"}
                        disabled
                      />
                      <label htmlFor="good" className="radioBtnLabel">
                        High
                      </label>
                    </div>
                  </div>
                </div>
              {prlist.length > 0 ? (
                <div className="ratePerformanceContainer d-flex flex-column">
                  <div className="ratePerformanceHead">
                    <p>
                      Please add Project name along with the email address of
                      the Project manager who will be needed to fill out the
                      conversion form in the field below
                    </p>
                  </div>
                  {prlist.length > 0
                    ? prlist.map((elem) => {
                        return (
                          <div className="performanceOptions d-flex">
                            <div className="project-detail-field d-flex align-items-center justify-content-between" style={{width:"40%"}}>
                              <p className="project-details-title">
                                Project Name
                              </p>
                              <input
                                type="text"
                                id="feedback"
                                className="rounded py-1 px-2 conversion-input"
                                placeholder="Eg. **************@gmail.com"
                                style={{ width: "67%" }}
                                value={elem.projectName}
                                disabled
                              />
                              {/* <select
                      name="project name"
                      className="inputFieldTextarea dropdownstyle pointer ms-1 px-0"
                      style={{ width: "67%" }}
                      disabled
                    >
                      <option value="" selected hidden>
                        Select Project
                      </option>
                      <option value="Monthly">Project 1</option>
                    </select> */}
                            </div>
                            <div className="project-detail-field d-flex align-items-center justify-content-between" style={{width:"50%"}}>
                              <p className="project-details-title">
                                Project Manager
                              </p>
                              <input
                                type="text"
                                id="feedback"
                                className="rounded py-1 px-2 conversion-input"
                                placeholder="Eg. **************@gmail.com"
                                style={{ width: "67%" }}
                                value={elem.projectManager}
                                disabled
                              />
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
              ) : null}
              <div className="ratePerformanceContainer d-flex flex-column">
                <div className="ratePerformanceHead">
                  <p>
                    To move forward with conversion, please provide below the
                    name of the person who will be reviewing the filled form and
                    make the final decision for conversion
                    <span className="spanimp">*</span>
                  </p>
                </div>
                <div className="performanceOptions d-flex">
                  <input
                    type="text"
                    id="feedback"
                    className="w-100 rounded py-1 px-2 conversion-input"
                    placeholder="Eg. **************@gmail.com"
                    value={props?.modalinfo?.decisionMaker}
                    disabled
                  />
                </div>
              </div>
              <div className="ratePerformanceContainer d-flex flex-column">
                <p className="ratePerformanceHead">
                  Is candidate eligible to be converted?
                  <span className="spanimp">*</span>
                </p>
                <div className="performanceOptions d-flex flex-col">
                  <div className="performenceRadioBtnContainer d-flex">
                    <input
                      type="radio"
                      name="eligible"
                      id="Yes"
                      className="inputRadio pt-1"
                      value="Yes"
                      checked={
                        props?.modalinfo?.eligible?.toLowerCase() === "yes"
                      }
                      disabled
                    />
                    <label htmlFor="Yes" className="radioBtnLabel">
                      Yes
                    </label>
                  </div>
                  <div className="performenceRadioBtnContainer d-flex">
                    <input
                      type="radio"
                      name="eligible"
                      className="inputRadio pt-1"
                      id="no"
                      value="no"
                      checked={
                        props?.modalinfo?.eligible?.toLowerCase() === "no"
                      }
                      disabled
                    />
                    <label htmlFor="no" className="radioBtnLabel">
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="ratePerformanceContainer d-flex flex-column">
              <p className="ratePerformanceHead">
                Final Verdict <span className="spanimp">*</span>
              </p>
              <div className="performanceOptions d-flex flex-column gap-2">
                <div className="performenceRadioBtnContainer d-flex align-items-start">
                  <input
                    type="radio"
                    name="verdict"
                    id="verdict1"
                    disabled
                    className="inputRadio pt-1"
                    value="Concern resource can be able to qualify client-side interview.
                Eligible for deployment in any relevant project (Interview
                Qualified Successfully)"
                    style={{ marginTop: "4px" }}
                    checked={
                      props?.modalinfo?.finalVerdict?.split(" ")[0] == "Concern"
                    }
                  />
                  <label htmlFor="verdict1" className="radioBtnLabel">
                    Concern resource can be able to qualify client-side
                    interview. Eligible for deployment in any relevant project
                    (Interview Qualified Successfully)
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="verdict"
                    disabled
                    className="inputRadio pt-1"
                    id="verdict2"
                    value="Interview Qualified Successfully but need more training for
                getting deployed on a project."
                    checked={
                      props?.modalinfo?.finalVerdict?.split(" ")[0] ==
                      "Interview"
                    }
                  />
                  <label htmlFor="verdict2" className="radioBtnLabel">
                    Interview Qualified Successfully but need more training for
                    getting deployed on a project.
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="verdict"
                    disabled
                    className="inputRadio pt-1"
                    id="verdict3"
                    value="Need more training to get deployed (Interview not qualified)"
                    checked={
                      props?.modalinfo?.finalVerdict?.split(" ")[0] == "Need"
                    }
                  />
                  <label htmlFor="verdict3" className="radioBtnLabel">
                    Need more training to get deployed (Interview not qualified)
                  </label>
                </div>
              </div>
            </div>
            <div className="feedbackTextarea position-relative">
              <textarea
                name="overall Feedback"
                id="feedback"
                rows="3"
                className="w-100 p-3 rounded viewfeedback-input"
                placeholder="Give an Overall feedback"
                value={props?.modalinfo?.feedback}
                disabled
              ></textarea>
            </div>
          </div>
          <div className="feedback-submit-btn-container pe-1 mt-2 mb-3"></div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default InterviewFeedbackViewModalTL;
