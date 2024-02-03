import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import FeedbackSubmitIcon from "../../assets/svg/mentorReport/feedbackSubmit.svg";
import { GlobalContext } from "../../context/GlobalState";
import FeedbackSubmitModal from "./FeedbackSubmitModal";
import "./feedback.css";
import { AiOutlineInfoCircle } from "react-icons/ai";
import tippy from "tippy.js";
function FeedbackForm(props) {
  const pathofrepo = useParams();
  const { postdetailsoffeedbackreport } = useContext(GlobalContext);
  const channel = [1, 2, 3, 4, 5];
  const [status, setStatus] = useState({
    communication: 0,
    technicalscore: 0,
    learning: 0,
    punctual: 0,
  });
  const [performance, setPerformance] = useState("");
  const [isresumeuploaded, setIsresumeuploaded] = useState("");
  const [verdict, setVerdict] = useState("");
  const [comment, setComment] = useState("");
  const [interviewId, setInterviewId] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  var radioall = [],
    ones = document.getElementsByName("concern"),
    twos = document.getElementsByName("performance"),
    three = document.getElementsByName("verdict");

  radioall = [...ones, ...twos, ...three];
  const submitfunction = () => {
    if (
      Object.values(status).includes(0) ||
      performance === "" ||
      comment === ""
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
        finalVerdict: verdict,
        strengthInTechnical: input1,
        weaknessInTechnical: input2,
        improvementArea: input3,
        POC: input4,
        interviewId: interviewId,
        emailId: props.pathid,
      };
      postdetailsoffeedbackreport(pathofrepo.id, temp);
      setComment("");
      setInput1("");
      setInput2("");
      setInput3("");
      setInput4("");
      for (var i = 0; i < radioall.length; i++) radioall[i].checked = false;
      setStatus({
        communication: 0,
        technicalscore: 0,
        learning: 0,
        punctual: 0,
        performanceblock: 0,
      });
    }
  };
  tippy(".technical-icon", {
    content:
      '<div class="report-icon-tooltip-container"> <div class="reportinfo-icon-tooltip-text"> <p>1 (Poor: Knowledge of basic introductory questions only & concept are not up to the mark).</p><p>2 (Average: Knows Basic and Medium type questions).</p><p>3 (Good: Can shadow a project. Knows Intermediate questions).</p><p>4 (Very Good: Can work on project. Knowledge of Deep complex questions).</p><p>5 (Excellent: Can lead a Project individually. Has a good knowledge in all the skills mentioned in resume.).</p></div> </div>',
    allowHTML: true,
    placement: "bottom",
    arrow: true,
    animation: "fade",
  });
  tippy(".communication-icon", {
    content:
      '<div class="report-icon-tooltip-container"> <div class="reportinfo-icon-tooltip-text"> <p>1 (Not Considerable: Cannot express himself or herself).</p><p>2 (Poor: Communication satisfactory, no voice modulation, lacks motivation).</p><p>3 (Average: Lacks expression, communication is good, voice modulation is average, situational understanding is good).</p><p>4 (Very Good: Body language and hand gestures facial expression are prompt, theres eye contact, communication is good, voice modulation is good, confident, can handle work pressure).</p><p>5 (Excellent: Effective and impressive communication, promptness, use of hand gestures, and eye contact. Facial expression and body language is impressive. voice modulation is there, talks comfortably, leadership qualities, easily handles work pressure).</p></div> </div>',
    allowHTML: true,
    placement: "bottom",
    arrow: true,
    animation: "fade",
  });
  tippy(".internal-icon", {
    content:
      '<div class="report-icon-tooltip-container"> <div class="reportinfo-icon-tooltip-text"> <p>1 (Not Considerable): Not actively work on internal task & not done with any POC till date.</p><p>2 (Poor); Consume more time in task completions than usual & not done with any POC till date.</p><p>3 (Average): Doing good but have potential to better in both internal task & POC</p><p>4 (Very Good): Performance is satisfactory well in both internal task & in POC.</p><p>5 (Excellent): Pro performer with excellency in work completion & POC review is good too.</p></div> </div>',
    allowHTML: true,
    placement: "bottom",
    arrow: true,
    animation: "fade",
  });
  return (
    <>
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
                <AiOutlineInfoCircle
                  className="communication-icon pointer"
                  style={{ color: "#4F52B2", fontSize: "15px" }}
                />
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
                <AiOutlineInfoCircle
                  className="technical-icon pointer"
                  style={{ color: "#4F52B2", fontSize: "15px" }}
                />
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
                      status.learning === elem ? "countonclick" : "count-block"
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
                      status.punctual === elem ? "countonclick" : "count-block"
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
                <AiOutlineInfoCircle
                  className="internal-icon pointer"
                  style={{ color: "#4F52B2", fontSize: "15px" }}
                />
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
                Has the concerned resource updated his/her resume as per his/her
                current skills? <span className="spanimp">*</span>
              </p>
            </div>
            <div className="rating-card-counts">
              <div className="performenceRadioBtnContainer d-flex">
                <input
                  type="radio"
                  name="concern"
                  className="inputRadio pt-1"
                  id="yes"
                  value="yes"
                  onChange={(e) => setIsresumeuploaded(e.target.value)}
                />
                <label htmlFor="Yes" className="radioBtnLabel">
                  Yes
                </label>
              </div>
              <div className="performenceRadioBtnContainer d-flex">
                <input
                  type="radio"
                  name="concern"
                  className="inputRadio pt-1"
                  id="no"
                  value="no"
                  onChange={(e) => setIsresumeuploaded(e.target.value)}
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
                onChange={(e) => setVerdict(e.target)}
              />
              <label htmlFor="verdict1" className="radioBtnLabel">
                Concern resource can be able to qualify client-side interview.
                Eligible for deployment in any relevant project (Interview
                Qualified Successfully)
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
                onChange={(e) => setVerdict(e.target.value)}
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
                onChange={(e) => setVerdict(e.target.value)}
              />
              <label htmlFor="verdict3" className="radioBtnLabel">
                Need more training to get deployed (Interview not qualified)
              </label>
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
            <input
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
              Candidate Weakness in the technical areas. ( You can mention the
              questions that were answered incorrectly in this section)
              <span className="spanimp">*</span>
            </p>
          </div>
          <div className="performanceOptions d-flex">
            <input
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
        <div className="ratePerformanceContainer d-flex flex-column">
          <div className="ratePerformanceHead">
            <p>
              Has he/she pursued/completed any POC? If yes mention the details.
              <span className="spanimp">*</span>
            </p>
          </div>
          <div className="performanceOptions d-flex">
            <input
              type="text"
              id="feedback"
              className="w-100 rounded py-1 px-2"
              value={input4}
              onChange={(e) => setInput4(e.target.value)}
            />
          </div>
        </div>
        <div className="conversion-additional-info">
          <div className="ratePerformanceContainer d-flex flex-column">
            <div className="ratePerformanceHead">
              <p>
                Please add Project name along with the email address of the
                Project manager who will be needed to fill out the conversion
                form in the field below
                <span className="spanimp">*</span>
              </p>
            </div>
            <div className="performanceOptions d-flex">
              <input
                type="text"
                id="feedback"
                className="w-100 rounded py-1 px-2"
                value={input4}
                onChange={(e) => setInput4(e.target.value)}
              />
            </div>
          </div>
          <div className="ratePerformanceContainer d-flex flex-column">
            <div className="ratePerformanceHead">
              <p>
                To move forward with conversion, please provide below the name
                of the person who will be reviewing the filled form and make the
                final decision for conversion
                <span className="spanimp">*</span>
              </p>
            </div>
            <div className="performanceOptions d-flex">
              <input
                type="text"
                id="feedback"
                className="w-100 rounded py-1 px-2"
                value={input4}
                onChange={(e) => setInput4(e.target.value)}
              />
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
          {/* <img
            src={FeedbackSubmitIcon}
            alt="FeedbackSubmitIcon"
            className="position-absolute feedbackSubmitIcon pointer"
          /> */}
        </div>
        <div className="feedback-submit-btn-container pe-1">
          {/* <div
            className="feedback-submit-btn uni-border pointer"
            onClick={() => submitfunction()}
          >
            Submit
          </div> */}
          <FeedbackSubmitModal submitfunction={submitfunction} />
        </div>
      </div>
    </>
  );
}

export default FeedbackForm;
