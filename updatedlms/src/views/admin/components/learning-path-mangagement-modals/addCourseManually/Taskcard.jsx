import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import editPencil from "../../../../../assets/svg/editPencil.svg";
import deleteicon from "../../../assets/delete-red.svg";

function Taskcard({coursearray, setCoursearray, dataval}) {
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
  useEffect(() => {
    if(dataval.includes("."))
    {
      if(Object.keys(coursearray[Number(dataval.split(".")[0])].value[Number(dataval.split(".")[1])].value).length > 0)
      {         
         const dataobj = coursearray[Number(dataval.split(".")[0])].value[Number(dataval.split(".")[1])].value
        setTitle(dataobj.title);
        setDesc(dataobj.description)
        setEstimate(dataobj.estimatedDuration);
        setAssinstruc(dataobj.assignment);
        setQuesarr(dataobj.questions);
        setDownfile(dataobj.downloadFileLink);
      }
      else{
        setTitle("");
        setDesc("")
        setEstimate("");
        setAssinstruc("");
        setQuesarr([]);
        setDownfile("");
      }
    }
    else{
      if(Object.keys(coursearray[Number(dataval)].value).length > 0)
      {
        const dataobj = coursearray[Number(dataval)].value
        setTitle(dataobj.title);
        setDesc(dataobj.description)
        setEstimate(dataobj.estimatedDuration);
        setAssinstruc(dataobj.assignment);
        setQuesarr(dataobj.questions);
        setDownfile(dataobj.downloadFileLink);
      }
      else{
        setTitle("");
        setDesc("")
        setEstimate("");
        setAssinstruc("");
        setQuesarr([]);
        setDownfile("");
      }
    }
  }, [dataval]);
  const settingTask = (obj)=>{
    if(dataval.includes("."))
    {
      const temp = coursearray.map((elem,index)=>{
      if(index == Number(dataval.split(".")[0]))
      { 
        let innertemp = elem;
         innertemp.value = elem.value.map((el,ind)=>{
          if(ind == Number(dataval.split(".")[1]))
          {
            return {...el, value:obj}
          }
          else{
            return el
          }
        })
        return innertemp
      }
      else{
        return elem
      }
    })
    setCoursearray(temp)
  }else{
      const temp = coursearray.map((elem,index)=>{
        if(index == Number(dataval))
        {
          return {...elem, value:obj}
        }
        else{
          return elem
        }
      })
      setCoursearray(temp)
    }
    toast.success("Saved")
  }
  const submittask = ()=>{
    if(title !== "" && quesarr.length > 0)
    {
    const obj = {
      title:title,
      description:desc,
      estimatedDuration:estimate,
      assignment:assinstruc,
      questions:quesarr,
      downloadFileLink:downfile
    }
    setQuestion("");
    settingTask(obj)
    console.log(obj,"task")
  }
  else{
    toast.error("Please fill the required fields") ;
  }
  }
  return (
    <div className="main-topic-detail inner-field">
      <div className="inner-field-head">{dataval.includes(".")?Number(dataval.split(".")[0]) + 1 + "." + dataval.split(".")[1]:Number(dataval) + 1} Task</div>
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
        <div className="savedraft modal-outer-primary-btn text-white py-1" onClick={()=>submittask()}>
          Save as Draft
        </div>
      </div>
    </div>
  );
}

export default Taskcard;
