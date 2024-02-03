import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import FeedbackSubmitIcon from "../../assets/svg/mentorReport/feedbackSubmit.svg";
import { GlobalContext } from "../../context/GlobalState";
import FeedbackSubmitModal from "./FeedbackSubmitModal";
import "./feedback.css";
import submitsvg from "../../assets/svg/mentorReport/submit.svg";
import { FiSearch } from "react-icons/fi";
import editPencil from "../../assets/svg/editPencil.svg";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import profileimg from "../../assets/images/profileimg.png";
import tippy from "tippy.js";

function InterviewFeedbackSubmitModal(props) {
  const [reportshow, setReportshow] = useState(false);
  const pathofrepo = useParams();
  const {
    postdetailsoffeedbackreport,
    navigate,
    projectslist,
    graphapiforempdetails,
    poc,
    gettllist,
    teamlist,
  } = useContext(GlobalContext);
  const channel = [1, 2, 3, 4, 5];
  const [status, setStatus] = useState({
    communication: 0,
    technicalscore: 0,
    learning: 0,
    punctual: 0,
    performanceblock: 0,
  });
  const [manualprlist, setManualprlist] = useState("");
  const [projectmarklist, setProjectmarklist] = useState([]);
  const [projectmanager, setProjectmanager] = useState("");
  const [projectnamemention, setProjectnamemention] = useState("");
  const [tlmanager, setTlmanager] = useState("");
  const [eligible, setEligible] = useState("");
  const [performance, setPerformance] = useState("");
  const [isresumeuploaded, setIsresumeuploaded] = useState("");
  const [verdicty, setVerdicty] = useState("");
  const [comment, setComment] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [officeregular, setOfficeregular] = useState("");
  const [officerelocated, setOfficerelocated] = useState("");
  const [countofmockinterviews, setCountofmockinterviews] = useState("");
  const [ifnotdeploybal, setIfnotdeploybal] = useState("");
  const [leavesinmonth, setLeavesinmonth] = useState("");
  const [lppathcompleted, setLppathcompleted] = useState("");
  const [certificationthere, setCertificationthere] = useState("");
  const [rigidnessofemp, setRigidnessofemp] = useState("");
  const [courseSearchKey, setCourseSearchKey] = useState("");
  const [showSearchresult, setShowSearchresult] = useState(false);
  const [courseSearchKeyTL, setCourseSearchKeyTL] = useState("");
  const [showSearchresultTL, setShowSearchresultTL] = useState(false);
  const [aprroverDrop, setApproverDrop] = useState(false);
  var radioall = [],
    ones = document.getElementsByName("concern"),
    twos = document.getElementsByName("performance"),
    three = document.getElementsByName("verdict");

  radioall = [...ones, ...twos, ...three];
  const submitfunction = () => {
    let temcheck = false;
    let tempsubmit = [];
    if (projectmarklist.length == 0) {
      if (projectmanager !== "" && projectnamemention !== "") {
        if (!projectmanager.includes("@celebaltech.com")) {
          temcheck = true;
        } else {
          tempsubmit = [
            {
              projectName: projectnamemention,
              projectManager: projectmanager,
            },
          ];
        }
      }
    } else {
      if (
        !projectmanager.includes("@celebaltech.com") ||
        projectnamemention == ""
      ) {
        tempsubmit = projectmarklist;
      } else {
        if (
          projectmarklist.find((elem) => {
            return elem.projectName == projectnamemention;
          }) == undefined
        ) {
          const innertemp = {
            projectName: projectnamemention,
            projectManager: projectmanager,
          };
          tempsubmit = [...projectmarklist, innertemp];
        } else {
          tempsubmit = projectmarklist;
        }
      }
    }
    if (
      Object.values(status).includes(0) ||
      performance === "" ||
      comment === "" ||
      status.communication === "" ||
      status.technicalscore === "" ||
      status.learning === "" ||
      status.punctual === "" ||
      performance === "" ||
      comment === "" ||
      status.performanceblock === "" ||
      isresumeuploaded === "" ||
      verdicty === "" ||
      input1 === "" ||
      input2 === "" ||
      input3 === "" ||
      input4 === "" ||
      officeregular === "" ||
      officerelocated == "" ||
      temcheck
    ) {
      toast.error("Please fill the feedback form correctly");
    } else {
      if (props.interviewtype !== "Monthly") {
        if (
          !tlmanager.includes("@celebaltech.com") ||
          eligible == "" ||
          manualprlist == "" ||
          countofmockinterviews == "" ||
          leavesinmonth == "" ||
          lppathcompleted == "" ||
          certificationthere == "" ||
          rigidnessofemp == ""
        ) {
          toast.error("Please fill the feedback form correctly");
        } else {
          const temp = {
            commScore: status.communication,
            techScore: status.technicalscore,
            adaptability: status.learning,
            punctuality: status.punctual,
            feedback: comment,
            overallP: performance,
            taskPerformance: status.performanceblock,
            isResumeUpdated: isresumeuploaded,
            finalVerdict: verdicty,
            strengthInTechnical: input1,
            weaknessInTechnical: input2,
            improvementArea: input3,
            POC: input4,
            interviewId: props.personId,
            emailId: props.pathid,
            decisionMaker: tlmanager,
            projectDetails: tempsubmit,
            eligible: eligible,
            interviewTitle: props.interviewtype,
            projectList: manualprlist,
            comingToOffice: officeregular,
            relocatedToOffice: officerelocated,
            noOfMonthlyMock: countofmockinterviews,
            reasonOfUndeploybility: ifnotdeploybal,
            leavesInMonth: leavesinmonth,
            lpsCompleted: lppathcompleted,
            certifications: certificationthere,
            rigidnessOfResource: rigidnessofemp,
          };
          console.log(temp, "temp");
          postdetailsoffeedbackreport(pathofrepo.id, temp);
          setComment("");
          setInput1("");
          setInput2("");
          setInput3("");
          setInput4("");
          setProjectmanager("");
          setProjectnamemention("");
          setOfficeregular("");
          setOfficerelocated("");
          setIfnotdeploybal("");
          setCountofmockinterviews("");
          setLeavesinmonth("");
          setRigidnessofemp("");
          setCertificationthere("");
          setLppathcompleted("");
          var dropProject = document.getElementById("selectProject");
          dropProject.selectedIndex = 0;
          setProjectmarklist([]);
          for (var i = 0; i < radioall.length; i++) radioall[i].checked = false;
          setStatus({
            communication: 0,
            technicalscore: 0,
            learning: 0,
            punctual: 0,
            performanceblock: 0,
          });
          setReportshow(!reportshow);
        }
      } else {
        const temp = {
          commScore: status.communication,
          techScore: status.technicalscore,
          adaptability: status.learning,
          punctuality: status.punctual,
          feedback: comment,
          overallP: performance,
          taskPerformance: status.performanceblock,
          isResumeUpdated: isresumeuploaded,
          finalVerdict: verdicty,
          strengthInTechnical: input1,
          weaknessInTechnical: input2,
          improvementArea: input3,
          POC: input4,
          interviewId: props.personId,
          emailId: props.pathid,
          decisionMaker: tlmanager,
          projectDetails: tempsubmit,
          eligible: eligible,
          interviewTitle: props.interviewtype,
          projectList: manualprlist,
          comingToOffice: officeregular,
          relocatedToOffice: officerelocated,
          noOfMonthlyMock: countofmockinterviews,
          reasonOfUndeploybility: ifnotdeploybal,
          leavesInMonth: leavesinmonth,
          lpsCompleted: lppathcompleted,
          certifications: certificationthere,
          rigidnessOfResource: rigidnessofemp,
        };
        console.log(temp, "temp");
        postdetailsoffeedbackreport(pathofrepo.id, temp);
        setComment("");
        setInput1("");
        setInput2("");
        setInput3("");
        setInput4("");
        setProjectmanager("");
        setProjectnamemention("");
        setOfficeregular("");
        setOfficerelocated("");
        setIfnotdeploybal("");
        setCountofmockinterviews("");
        setLeavesinmonth("");
        setRigidnessofemp("");
        setCertificationthere("");
        setLppathcompleted("");
        var dropProject = document.getElementById("selectProject");
        dropProject.selectedIndex = 0;
        setProjectmarklist([]);
        for (var i = 0; i < radioall.length; i++) radioall[i].checked = false;
        setStatus({
          communication: 0,
          technicalscore: 0,
          learning: 0,
          punctual: 0,
          performanceblock: 0,
        });
        setReportshow(!reportshow);
      }
    }
  };
  const addfield = () => {
    if (
      projectnamemention !== "" &&
      projectmanager.includes("@celebaltech.com")
    ) {
      if (
        projectmarklist.find(
          (elem) => elem.projectName == projectnamemention
        ) == undefined
      ) {
        const temp = {
          projectName: projectnamemention,
          projectManager: projectmanager,
        };
        setProjectmanager("");
        setCourseSearchKey("");
        setProjectnamemention("");
        var dropProject = document.getElementById("selectProject");
        dropProject.selectedIndex = 0;
        setProjectmarklist([...projectmarklist, temp]);
      } else {
        toast.error("Project is already mentioned Once");
        setProjectmanager("");
        setCourseSearchKey("");
        setProjectnamemention("");
        var dropProject = document.getElementById("selectProject");
        dropProject.selectedIndex = 0;
      }
    } else {
      toast.error("Please mention project details first");
    }
  };
  useEffect(() => {
    if (courseSearchKey == "") {
      setProjectmanager("");
      setTimeout(() => {
        setShowSearchresult(false);
      }, 150);
    } else {
      graphapiforempdetails(courseSearchKey);
      setShowSearchresult(true);
    }
  }, [courseSearchKey]);
  useEffect(() => {
    // if (courseSearchKeyTL == "") {
    //   setTlmanager("");
    //   setTimeout(() => {
    //     setShowSearchresultTL(false);
    //   }, 150);
    // } else {
    //   graphapiforempdetails(courseSearchKeyTL);
    //   setShowSearchresultTL(true);
    // }
    console.log(courseSearchKeyTL);
  }, [courseSearchKeyTL]);
  useEffect(() => {
    gettllist();
  }, []);
  return (
    <>
      <p className="feedback-submit" onClick={() => setReportshow(!reportshow)}>
        <img src={submitsvg} alt="submitsvg" style={{ height: "16px" }} />
      </p>
      <Modal
        show={reportshow}
        // onHide={() => setReportshow(!reportshow)}
        size="lg"
        centered
        className="details-upload-modal"
      >
        <Modal.Header className="infoModalHead">
          <Modal.Title>{`${props.interviewtype}`} Feedback Submit</Modal.Title>
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
            overflowY: "auto",
          }}
        >
          <div className="px-2 d-flex flex-column feedbackFormContainer">
            <div className="feedbackFormHead ">Feedback</div>
            <div className="rating-cards">
              <div className="rating-card border ">
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
                          status.communication === elem
                            ? "countonclick"
                            : "count-block"
                        }
                        onClick={() =>
                          setStatus({ ...status, communication: elem })
                        }
                      >
                        {elem}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rating-card border ">
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
                          status.technicalscore === elem
                            ? "countonclick"
                            : "count-block"
                        }
                        onClick={() =>
                          setStatus({ ...status, technicalscore: elem })
                        }
                      >
                        {elem}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rating-card border ">
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
                          status.learning === elem
                            ? "countonclick"
                            : "count-block"
                        }
                        onClick={() => setStatus({ ...status, learning: elem })}
                      >
                        {elem}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rating-card border ">
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
                          status.punctual === elem
                            ? "countonclick"
                            : "count-block"
                        }
                        onClick={() => setStatus({ ...status, punctual: elem })}
                      >
                        {elem}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rating-card border ">
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
                          status.performanceblock === elem
                            ? "countonclick"
                            : "count-block"
                        }
                        onClick={() =>
                          setStatus({ ...status, performanceblock: elem })
                        }
                      >
                        {elem}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rating-card border ">
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
                      className="inputRadio pt-1"
                      id="peryes"
                      value="yes"
                      onChange={(e) => setIsresumeuploaded(e.target.value)}
                    />
                    <label htmlFor="peryes" className="radioBtnLabel">
                      Yes
                    </label>
                  </div>
                  <div className="performenceRadioBtnContainer d-flex">
                    <input
                      type="radio"
                      name="concern"
                      className="inputRadio pt-1"
                      id="perno"
                      value="no"
                      onChange={(e) => setIsresumeuploaded(e.target.value)}
                    />
                    <label htmlFor="perno" className="radioBtnLabel">
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
                    id="excellent"
                    className="inputRadio pt-1"
                    value="Excellent"
                    onClick={(e) => setPerformance(e.target.value)}
                  />
                  <label htmlFor="excellent" className="radioBtnLabel">
                    Excellent
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="performance"
                    className="inputRadio pt-1"
                    id="good"
                    value="Good"
                    onClick={(e) => setPerformance(e.target.value)}
                  />
                  <label htmlFor="good" className="radioBtnLabel">
                    Good
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="performance"
                    className="inputRadio pt-1"
                    id="average"
                    value="Above Average"
                    onClick={(e) => setPerformance(e.target.value)}
                  />
                  <label htmlFor="average" className="radioBtnLabel">
                    Above Average
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="performance"
                    className="inputRadio pt-1"
                    id="Poor"
                    value="Poor"
                    onClick={(e) => setPerformance(e.target.value)}
                  />
                  <label htmlFor="Poor" className="radioBtnLabel">
                    Poor
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="performance"
                    className="inputRadio pt-1"
                    id="PIP"
                    value="PIP"
                    onClick={(e) => setPerformance(e.target.value)}
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
                  className="w-100 rounded py-1 px-2"
                  value={input1}
                  onChange={(e) => setInput1(e.target.value)}
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
                  className="w-100 rounded py-1 px-2"
                  value={input2}
                  onChange={(e) => setInput2(e.target.value)}
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
                  className="w-100 rounded py-1 px-2"
                  value={input3}
                  onChange={(e) => setInput3(e.target.value)}
                />
              </div>
            </div>
            {props.interviewtype !== "Monthly" ? (
              <div className="ratePerformanceContainer d-flex flex-column">
                <div className="ratePerformanceHead">
                  <p>
                    Please enter below the comprehensive list of all the
                    projects the candidate has worked on.
                    <span className="spanimp">*</span>
                  </p>
                </div>
                <div className="performanceOptions d-flex">
                  <textarea
                    type="text"
                    id="feedback"
                    placeholder="Enter comma seperated values only"
                    className="w-100 rounded py-1 px-2"
                    value={manualprlist}
                    onChange={(e) => setManualprlist(e.target.value)}
                  />
                </div>
              </div>
            ) : null}
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
                  className="w-100 rounded py-1 px-2"
                  value={input4}
                  onChange={(e) => setInput4(e.target.value)}
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
                    id="relyes"
                    className="inputRadio pt-1"
                    value="Yes"
                    onChange={(e) => setOfficerelocated(e.target.value)}
                  />
                  <label htmlFor="relyes" className="radioBtnLabel">
                    Yes
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="relocate"
                    className="inputRadio pt-1"
                    id="relno"
                    value="no"
                    onChange={(e) => setOfficerelocated(e.target.value)}
                  />
                  <label htmlFor="relno" className="radioBtnLabel">
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
                    id="offyes"
                    className="inputRadio pt-1"
                    value="Yes"
                    onChange={(e) => setOfficeregular(e.target.value)}
                  />
                  <label htmlFor="offyes" className="radioBtnLabel">
                    Yes
                  </label>
                </div>
                <div className="performenceRadioBtnContainer d-flex">
                  <input
                    type="radio"
                    name="office"
                    className="inputRadio pt-1"
                    id="offno"
                    value="no"
                    onChange={(e) => setOfficeregular(e.target.value)}
                  />
                  <label htmlFor="offno" className="radioBtnLabel">
                    No
                  </label>
                </div>
              </div>
            </div>

            {props.interviewtype !== "Monthly" ? (
              <div className="conversion-additon-info d-flex flex-column feedbackFormContainer">
                <div className="ratePerformanceContainer d-flex flex-column">
                  <p className="ratePerformanceHead">
                    How many Monthly Mock Interviews have been updated on LMS as
                    of now?
                    <span className="spanimp">*</span>
                  </p>
                  <div className="performanceOptions d-flex flex-col">
                    <div
                      className="project-detail-field d-flex align-items-center justify-content-between"
                      style={{ width: "100%" }}
                    >
                      <select
                        id="selectProject"
                        name="project name"
                        className="inputFieldTextarea dropdownstyle pointer px-0 ps-2"
                        style={{ width: "100%" }}
                        value={countofmockinterviews}
                        onChange={(e) =>
                          setCountofmockinterviews(e.target.value)
                        }
                      >
                        <option value="" selected hidden>
                          Select
                        </option>
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="ratePerformanceContainer d-flex flex-column">
                  <p className="ratePerformanceHead">
                    If the resource is not deployed on the project till now then
                    the reason of undeploybility?
                  </p>
                  <div className="performanceOptions d-flex flex-col">
                    <div
                      className="project-detail-field d-flex align-items-center justify-content-between"
                      style={{ width: "100%" }}
                    >
                      <select
                        id="selectProject"
                        name="project name"
                        className="inputFieldTextarea dropdownstyle pointer px-0 ps-2"
                        style={{ width: "100%" }}
                        value={ifnotdeploybal}
                        onChange={(e) => setIfnotdeploybal(e.target.value)}
                      >
                        <option value="" selected>
                          Select Reason
                        </option>
                        <option>Project Unavailability</option>
                        <option>
                          Resource is not skilled enough yet to be put on the
                          project even as a Shadow Resource [For the purpose of
                          practical exposure]
                        </option>
                        <option>
                          Resource is deployable, but project is unavailable
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
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
                      value={leavesinmonth}
                      onChange={(e) => setLeavesinmonth(e.target.value)}
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
                      value={lppathcompleted}
                      onChange={(e) => setLppathcompleted(e.target.value)}
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
                      value={certificationthere}
                      onChange={(e) => setCertificationthere(e.target.value)}
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
                        id="rigidlow"
                        className="inputRadio pt-1"
                        value="Low"
                        onChange={(e) => setRigidnessofemp(e.target.value)}
                      />
                      <label htmlFor="rigidlow" className="radioBtnLabel">
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
                        onChange={(e) => setRigidnessofemp(e.target.value)}
                      />
                      <label htmlFor="morderate" className="radioBtnLabel">
                        Moderate
                      </label>
                    </div>
                    <div className="performenceRadioBtnContainer d-flex">
                      <input
                        type="radio"
                        name="Rigidness"
                        className="inputRadio pt-1"
                        id="rigidhigh"
                        value="High"
                        onChange={(e) => setRigidnessofemp(e.target.value)}
                      />
                      <label htmlFor="rigidhigh" className="radioBtnLabel">
                        High
                      </label>
                    </div>
                  </div>
                </div>
                <div className="ratePerformanceContainer d-flex flex-column">
                  <div className="ratePerformanceHead">
                    <p>
                      Please add Project name along with the email address of
                      the Project manager who will be needed to fill out the
                      conversion form in the field below
                    </p>
                  </div>
                  <div className="performanceOptions d-flex justify-content-between">
                    <div
                      className="project-detail-field d-flex align-items-center justify-content-between"
                      style={{ width: "40%" }}
                    >
                      <p className="project-details-title">Project Name</p>
                      <select
                        id="selectProject"
                        name="project name"
                        className="inputFieldTextarea dropdownstyle pointer ms-1 px-0 ps-2"
                        style={{ width: "67%" }}
                        value={projectnamemention}
                        onChange={(e) => setProjectnamemention(e.target.value)}
                      >
                        <option value="" selected>
                          Select Project
                        </option>
                        {projectslist.length > 0
                          ? projectslist.map((elem) => {
                              return <option value={elem}>{elem}</option>;
                            })
                          : null}
                      </select>
                    </div>
                    <div
                      className="project-detail-field d-flex align-items-center justify-content-between"
                      style={{ width: "40%" }}
                    >
                      <p className="project-details-title me-4">
                        Project Manager
                      </p>
                      {/* <input
                      type="text"
                      id="feedback"
                      className="rounded py-1 px-2 conversion-input"
                      placeholder="Eg. **************@celebaltech.com"
                      style={{ width: "67%" }}
                      value={projectmanager}
                      onChange={(e) => setProjectmanager(e.target.value)}
                    /> */}
                      <div
                        className=" position-relative "
                        style={{ width: "65%" }}
                      >
                        <div
                          className={`px-2 rounded searchContainer w-100 ${
                            showSearchresult ? "search-active " : ""
                          }`}
                        >
                          <input
                            type="search"
                            id="inside"
                            placeholder="Search Employee Name"
                            className="border-0 sampler-search col-11 resourceListSearch"
                            // value={projectmanager}
                            // onChange={(e) => setProjectmanager(e.target.value)}
                            value={courseSearchKey}
                            onChange={(e) => setCourseSearchKey(e.target.value)}
                            // onKeyDown={(event) =>
                            //   event.key === "Enter" ? onEnter() : null
                            // }
                          />
                          {/* <FiSearch
                          className="pointer col-1"
                          onClick={() => searchit()}
                        /> */}
                        </div>
                        {showSearchresult ? (
                          <div
                            className={`userdata-searchlist  ${
                              courseSearchKey == "" ? "hidetransition" : ""
                            }`}
                            style={{
                              right: "0",
                              width: "280px",
                              overflowY: "auto",
                            }}
                          >
                            {poc.length > 0
                              ? poc.map((elem) => {
                                  return (
                                    <div
                                      className="d-flex align-items-center gap-2 
                      text-nowrap pointer userdata-searchlist-row"
                                      onClick={() => {
                                        setCourseSearchKey(elem.displayName);
                                        setProjectmanager(elem.mail);
                                        setTimeout(() => {
                                          setShowSearchresult(false);
                                        }, 500);
                                      }}
                                    >
                                      <img
                                        src={elem.photo || profileimg}
                                        alt="profileimg"
                                        className="userdata-searchlist-profilimg"
                                      />
                                      <div className="searchlist-profiledetails">
                                        <p className="searchlist-name">
                                          {elem.displayName}
                                        </p>
                                        <p className="searchlist-email">
                                          {elem.mail}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })
                              : null}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div
                      className="add-btn-field d-flex align-items-center"
                      onClick={() => addfield()}
                    >
                      <p className="add-btn pointer">+</p>
                    </div>
                  </div>
                </div>
                {projectmarklist.length > 0
                  ? projectmarklist.map((elem) => {
                      return (
                        <div
                          className="performanceOptions d-flex justify-content-between"
                          style={{ width: "100%" }}
                        >
                          <div
                            className="project-detail-field d-flex align-items-center justify-content-between"
                            style={{ width: "40%" }}
                          >
                            <p className="project-details-title">
                              Project Name
                            </p>
                            <input
                              type="text"
                              id="feedback"
                              className="rounded py-1 px-2 conversion-input"
                              style={{ width: "67%" }}
                              value={elem.projectName}
                              disabled
                            />
                          </div>
                          <div
                            className="project-detail-field d-flex align-items-center justify-content-between"
                            style={{ width: "40%" }}
                          >
                            <p className="project-details-title">
                              Project Manager
                            </p>
                            <input
                              type="text"
                              id="feedback"
                              className="rounded py-1 px-2 conversion-input"
                              style={{ width: "65%" }}
                              value={elem.projectManager}
                              disabled
                            />
                          </div>
                          <div
                            className="add-btn-field d-flex align-items-center"
                            onClick={() => {
                              const temp = projectmarklist.filter((ele) => {
                                return (
                                  ele.projectName !== elem.projectName ||
                                  ele.projectManager !== elem.projectManager
                                );
                              });
                              setProjectmarklist(temp);
                            }}
                          >
                            <p className="add-btn pointer">-</p>
                          </div>
                        </div>
                      );
                    })
                  : null}

                <div className="ratePerformanceContainer d-flex flex-column">
                  <div className="ratePerformanceHead">
                    <p>
                      To move forward with conversion, please provide below the
                      name of the person who will be reviewing the filled form
                      and make the final decision for conversion
                      <span className="spanimp">*</span>
                    </p>
                  </div>
                  <div className="performanceOptions d-flex">
                    <div
                      id="selectProject"
                      className="inputFieldTextarea dropdownstyle px-0 ps-2 position-relative"
                      style={{ width: "100%" }}
                    >
                      <div
                        className="d-flex align-items-center justify-content-between pointer h-100 pe-2"
                        onClick={() => {
                          setApproverDrop(!aprroverDrop);
                        }}
                      >
                        {courseSearchKeyTL !== "" ? (
                          <div className="ps-1 py-2  w-100 pointer d-flex align-items-center gap-2">
                            <img
                              src={`https://storageaccountforprofile.blob.core.windows.net/profile/${
                                tlmanager.split("@")[0]
                              }.jpg`}
                              height={25}
                              width={25}
                              alt="Employee"
                              style={{ borderRadius: "50%" }}
                            />
                            <p>{courseSearchKeyTL}</p>
                          </div>
                        ) : (
                          <p>Select Approver</p>
                        )}
                        <BsChevronDown />
                      </div>
                      {aprroverDrop && (
                        <div
                          className="w-100 d-flex flex-column align-items-start gap-2 overflow-y-scroll bg-white position-absolute  pt-1"
                          style={{
                            minHeight: "fit-content",
                            maxHeight: "200px",
                            top: "34px",
                            left: "-1px",
                            border: "1px solid #d7d7d7",
                          }}
                        >
                          {teamlist.length > 0
                            ? teamlist.map((elem) => {
                                return (
                                  <div
                                    className="ps-3 py-2 w-100 pointer d-flex align-items-center gap-2"
                                    style={{
                                      borderBottom: "1px solid #d7d7d7",
                                    }}
                                    onClick={() => {
                                      console.log(elem.name, "name");
                                      setCourseSearchKeyTL(elem.name);
                                      setTlmanager(elem.emailId);
                                      setApproverDrop(false);
                                    }}
                                  >
                                    <img
                                      src={`https://storageaccountforprofile.blob.core.windows.net/profile/${
                                        elem.emailId.split("@")[0]
                                      }.jpg`}
                                      height={30}
                                      width={30}
                                      alt="Employee"
                                      style={{ borderRadius: "50%" }}
                                    />
                                    <p>{elem.name}</p>
                                  </div>
                                );
                              })
                            : null}
                        </div>
                      )}
                    </div>

                    {/* <div className=" position-relative w-100 ">
                      <div
                        className={`px-2 rounded searchContainer w-100 ${
                          showSearchresultTL ? "search-active " : ""
                        }`}
                      >
                        <input
                          type="search"
                          id="inside"
                          placeholder="Search Employee Name"
                          className="border-0 sampler-search col-11 resourceListSearch"
                          
                          value={courseSearchKeyTL}
                          onChange={(e) => setCourseSearchKeyTL(e.target.value)}
                          
                        />
                        
                      </div>
                      {showSearchresultTL ? (
                        <div
                          className={`userdata-searchlist  ${
                            courseSearchKeyTL == "" ? "hidetransition" : ""
                          }`}
                          style={{
                            right: "0",
                            width: "100%",
                            overflowY: "auto",
                          }}
                        >
                          {poc.length > 0
                            ? poc.map((elem) => {
                                return (
                                  <div
                                    className="d-flex align-items-center gap-2 
                      text-nowrap pointer userdata-searchlist-row"
                                    onClick={() => {
                                      setCourseSearchKeyTL(elem.displayName);
                                      setTlmanager(elem.mail);
                                      setTimeout(() => {
                                        setShowSearchresultTL(false);
                                      }, 500);
                                    }}
                                  >
                                    <img
                                      src={elem.photo || profileimg}
                                      alt="profileimg"
                                      className="userdata-searchlist-profilimg"
                                    />
                                    <div className="searchlist-profiledetails">
                                      <p className="searchlist-name">
                                        {elem.displayName}
                                      </p>
                                      <p className="searchlist-email">
                                        {elem.mail}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })
                            : null}
                        </div>
                      ) : null}
                    </div> */}
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
                        onClick={(e) => setEligible(e.target.value)}
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
                        onClick={(e) => setEligible(e.target.value)}
                      />
                      <label htmlFor="no" className="radioBtnLabel">
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
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
                    className="inputRadio pt-1"
                    value="Concern resource can be able to qualify client-side interview.
                Eligible for deployment in any relevant project (Interview
                Qualified Successfully)"
                    style={{ marginTop: "4px" }}
                    onChange={(e) => setVerdicty(e.target.value)}
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
                    className="inputRadio pt-1"
                    id="verdict2"
                    value="Interview Qualified Successfully but need more training for
                getting deployed on a project."
                    onChange={(e) => setVerdicty(e.target.value)}
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
                    className="inputRadio pt-1"
                    id="verdict3"
                    value="Need more training to get deployed (Interview not qualified)"
                    onChange={(e) => setVerdicty(e.target.value)}
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
                className="w-100 p-3 rounded"
                placeholder="Give an Overall feedback"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="feedback-submit-btn-container pe-1 mt-2 mb-3">
            {/* <FeedbackSubmitModal submitfunction={submitfunction} /> */}
            <Button
              className="modalConfirm modal-inner-primary-btn"
              onClick={() => submitfunction()}
              style={{ padding: "3px 15px" }}
            >
              Confirm
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default InterviewFeedbackSubmitModal;
