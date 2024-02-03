import React from 'react'
import finalAssessmentimg from "../../../../../assets/finalAssessment.png";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import editPencil from "../../../../../assets/svg/editPencil.svg";
import deleteicon from "../../../assets/delete-red.svg";

export function Finalfillform({setSelectedindex, finalobj, setFinalobj}){
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [estimate, setEstimate] = useState("");
  const [assinstruc, setAssinstruc] = useState("");
  const [question, setQuestion] = useState("");
  const [downfile, setDownfile] = useState("");
  const [quesarr, setQuesarr] = useState([]);
  const addingquestion = () => {
    if (question !== "") {
      setQuesarr((prev) => [
        ...prev,
        {
          questiontext: question,
        },
      ]);
      setQuestion("");
    } else {
      toast.error("Empty Question field can't be inserted");
    }
  };
  useEffect(()=>{
    if(Object.keys(finalobj).length > 1)
    {
      setTitle(finalobj.title);
        setDesc(finalobj.description)
        setEstimate(finalobj.estimatedDuration);
        setAssinstruc(finalobj.assignment);
        setQuesarr(finalobj.questions);
        setDownfile(finalobj.downloadFileLink);
    }
  },[finalobj])
  const submitfinal = ()=>{
    if(title !== "" && quesarr.length > 0)
    {
    const obj = {
      isdone:true,
      title:title,
      description:desc,
      estimatedDuration:estimate,
      assignment:assinstruc,
      questions:quesarr,
      downloadFileLink:downfile
    }
    setQuestion("");
    setFinalobj(obj);
    toast.success("Saved")
  }
  else{
    toast.error("Please fill the required fields") ;
  }
  }
  return (
    <div className="main-topic-detail inner-field">
      <div className="inner-field-head"> Final Assessment</div>
      <div className="edit-department-input-div">
        <label style={{ fontWeight: "500" }}>
          Title
          <span className="spanimp">*</span>
        </label>
        <input
          type="text"
          className="dep-input"
          placeholder="Enter Title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="edit-department-input-div">
        <label style={{ fontWeight: "500" }}>Description</label>
        <textarea
          rows={2}
          className="dep-input"
          placeholder="Enter Description here"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div className="edit-department-input-div">
        <label style={{ fontWeight: "500" }}>Estimated Duration</label>
        <input
          type="text"
          className="dep-input"
          title="Ex:- 5 min, 16 days, 45 days"
          placeholder="Enter duration here - Minimum 5 min duration is required"
          value={estimate}
          onChange={(e) => setEstimate(e.target.value)}
        />
      </div>
      <div className="edit-department-input-div">
        <label style={{ fontWeight: "500" }}>Assignment Instruction</label>
        <input
          type="text"
          className="dep-input"
          placeholder="Enter Assignment Instruction"
          value={assinstruc}
          onChange={(e) => setAssinstruc(e.target.value)}
        />
      </div>
      <div className="edit-department-input-div">
        <label style={{ fontWeight: "500" }}>Downloadable File</label>
        <input
          type="url"
          className="dep-input"
          placeholder="File Link"
          value={downfile}
          onChange={(e) => setDownfile(e.target.value)}
        />
      </div>
      <div className="add-question-div">
        <div className="edit-department-input-div">
          <label style={{ fontWeight: "500" }}>Question
          <span className="spanimp">*</span>
          </label>
          <input
            type="text"
            className="dep-input"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div
          className="modal-outer-secondary-btn add-ques-btn"
          onClick={() => addingquestion()}
        >
          Add this Question
        </div>
      </div>
      <div style={{ backgroundColor: "#f9f9f9" }}>
        {quesarr.length > 0 &&
          quesarr.map((el, i) => {
            return (
              <div
                className="single-options-div px-3 pb-2 "
                style={{
                  borderBottom: "1px solid #e3e3e3",
                }}
              >
                <div className="edit-department-input-div">
                  <div className="w-100 d-flex align-items-center justify-content-between">
                    <label style={{ fontWeight: "500" }}>
                      Question. {i + 1}
                    </label>
                    <div className="d-flex align-items-center">
                      <img
                        src={editPencil}
                        alt="submitsvg"
                        style={{ height: "14px" }}
                        className="me-2 pointer"
                        onClick={()=>{
                          setQuestion(el.questiontext);
                          const temp = quesarr.filter((elem)=>elem.questiontext !== el.questiontext);
                          setQuesarr(temp);
                        }}
                      />
                      <img
                        src={deleteicon}
                        alt="submitsvg"
                        className="pointer"
                        style={{ height: "14px" }}
                        onClick={()=>{
                          const temp = quesarr.filter((elem)=>elem.questiontext !== el.questiontext);
                          setQuesarr(temp);
                        }}
                      />
                    </div>
                  </div>
                  <label style={{ fontWeight: "400" }}>{el.questiontext}</label>
                </div>
              </div>
            );
          })}
      </div>
      <div className="save-discard-div mt-3">
        <div
          className="discard modal-outer-secondary-btn"
          onClick={() =>{
            setTitle("");
            setDesc("");
            setEstimate("");
            setAssinstruc("");
            setDownfile("");
            setQuesarr([]);
            setQuestion("");
          }}
        >
          Discard
        </div>
        <div className="savedraft modal-outer-primary-btn text-white py-1" onClick={()=>submitfinal()}>
          Save
        </div>
      </div>
    </div>
  );
}
function Finalassesmentask({setSelectedindex, finalobj, setFinalobj}) {
  return (
    <div className="main-topic-detail inner-field justify-content-between h-100">
              <div
                className="w-100 d-flex align-items-center justify-content-center"
                style={{ padding: "1rem 0" }}
              >
                <img
                  src={finalAssessmentimg}
                  alt="finalAssessment"
                  style={{ width: "25%" }}
                />
              </div>
              <div className="w-100 d-flex flex-column align-items-center justify-content-center">
                <div
                  className="modal-outer-primary-btn manual-final-submit text-white py-1 me-2"
                  onClick={() => {
                    setFinalobj({...finalobj, isdone:true})
                    setSelectedindex("FinalForm");
                  }}
                  style={{ width: "fit-content" }}
                >
                  proceed
                </div>
                <div style={{ fontSize: "0.8rem" }} className="mt-2">
                  Click on Proceed to Add Assessment
                </div>
              </div>
              <div className="w-100 d-flex flex-column">
                <div
                  className="importantBtn modal-outer-primary-btn manual-final-submit py-1 me-2"
                  style={{
                    backgroundColor: "#EDEEFF",
                    color: "#242424",
                    width: "fit-content",
                  }}
                >
                  Important Note:
                </div>
                <p
                  style={{ fontSize: "12px", color: "#424242" }}
                  className="mt-1"
                >
                  Note that even if you add additional topics or subtopics to
                  the course after the assessment has been created, the
                  assessment will still be displayed at the end, covering all
                  the materials included .
                </p>
              </div>
            </div>
  )
}

export default Finalassesmentask