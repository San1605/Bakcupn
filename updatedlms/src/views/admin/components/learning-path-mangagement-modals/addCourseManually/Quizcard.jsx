import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import editPencil from "../../../../../assets/svg/editPencil.svg";
import deleteicon from "../../../assets/delete-red.svg";

function Quizcard({coursearray, setCoursearray, dataval}) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [question, setQuestion] = useState("");
  const [answerType, setAnswerType] = useState("");
  const [option1, setOption1] = useState("");
  const [answer1, setAnswer1] = useState(false);
  const [option2, setOption2] = useState("");
  const [answer2, setAnswer2] = useState(false);
  const [option3, setOption3] = useState("");
  const [answer3, setAnswer3] = useState(false);
  const [option4, setOption4] = useState("");
  const [answer4, setAnswer4] = useState(false);
  const [quesarr, setQuesarr] = useState([]);
  useEffect(() => {
    if(dataval.includes("."))
    {
      if(Object.keys(coursearray[Number(dataval.split(".")[0])].value[Number(dataval.split(".")[1])].value).length > 0)
      {         
         const dataobj = coursearray[Number(dataval.split(".")[0])].value[Number(dataval.split(".")[1])].value
        setTitle(dataobj.title);
        setDesc(dataobj.description);
        setQuesarr(dataobj.questions);
      }
      else{
        setTitle("");
        setDesc("");
        setQuesarr([]);
      }
    }
    else{
      if(Object.keys(coursearray[Number(dataval)].value).length > 0)
      {
        const dataobj = coursearray[Number(dataval)].value
        setTitle(dataobj.title);
        setDesc(dataobj.description);
        setQuesarr(dataobj.questions);
      }
      else{
        setTitle("");
        setDesc("");
        setQuesarr([]);
      }
    }
  }, [dataval]);
  const settingQuiz = (obj)=>{
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
  const submitquiz = ()=>{
    if(title !== "" && quesarr.length > 0)
    {
      let obj= {
      title : title,
      description : desc,
      questions:quesarr,
      }
      settingQuiz(obj);
      // setTitle("");
      //                         setDesc("");
                              // setQuesarr([]);
                              setQuestion("");
                              setAnswerType("");
                              setOption1("")
                              setOption2("")
                              setOption3("")
                              setOption4("")
                              setAnswer1(false)
                              setAnswer2(false)
                              setAnswer3(false)
                              setAnswer4(false)
    }
    else{
      toast.error("Please enter the required fields") ;
    }
}
  return (
    <div className="main-topic-detail inner-field">
      <div className="inner-field-head">{dataval.includes(".")?Number(dataval.split(".")[0]) + 1 + "." + dataval.split(".")[1]:Number(dataval) + 1} Quiz</div>
      <>
        <div className="edit-department-input-div">
          <label style={{ fontWeight: "500" }}>
            Title
            <span className="spanimp">*</span>
          </label>
          <input
            type="text"
            className="dep-input"
            placeholder="Enter Quiz Title here"
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
        <div className="add-question-div">
          <div className="add-mcq">
            <div className="edit-department-input-div">
              <label style={{ fontWeight: "500" }}>Question.<span className="spanimp">*</span></label>
              
              <input
                type="text"
                className="dep-input"
                placeholder="Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="mcq-options">
              <div className="edit-department-input-div mcq-option-select">
                <label>Answer Type</label>
                <select
                  name="Answer Type"
                  className="dep-input addcourse-select"
                  id="current-department-dropdown"
                  value={answerType}
                  onChange={(e) => {
                    setAnswerType(e.target.value);
                    setAnswer1(false);
                    setAnswer2(false);
                    setAnswer3(false);
                    setAnswer4(false);
                  }}
                >
                  <option value="" selected hidden>
                    Choose Answer Type
                  </option>
                  <option value="single">Single correct answer</option>
                  <option value="multiple">Multiple correct answer</option>
                </select>
              </div>
              {answerType == "single" ? (
                <div className="single-options-div">
                  <div className="edit-department-input-div">
                    <label style={{ fontWeight: "500" }}>Choice 1</label>
                    <input
                      type="text"
                      className="dep-input"
                      placeholder="Single Correct Answer Option"
                      value={option1}
                      onChange={(e) => setOption1(e.target.value)}
                    />
                    <div className="d-flex align-items-center">
                      <input
                        type="radio"
                        id="correctSingleAnswer"
                        name="correctSingleAnswer"
                        className="inputRadio pt-2"
                        checked={answer1}
                        onChange={() => {
                          setAnswer1(true);
                          setAnswer2(false);
                          setAnswer3(false);
                          setAnswer4(false);
                        }}
                      />
                      <label
                        htmlFor="correctSingleAnswer"
                        className="single-option-radio-label"
                      >
                        Correct Answer
                      </label>
                    </div>
                  </div>
                  <div className="edit-department-input-div">
                    <label style={{ fontWeight: "500" }}>Choice 2</label>
                    <input
                      type="text"
                      className="dep-input"
                      placeholder="Single Correct Answer Option"
                      value={option2}
                      onChange={(e) => setOption2(e.target.value)}
                    />
                    <div className="d-flex align-items-center">
                      <input
                        type="radio"
                        id="correctSingleAnswer"
                        name="correctSingleAnswer"
                        className="inputRadio pt-2"
                        checked={answer2}
                        onChange={() => {
                          setAnswer1(false);
                          setAnswer2(true);
                          setAnswer3(false);
                          setAnswer4(false);
                        }}
                      />
                      <label
                        htmlFor="correctSingleAnswer"
                        className="single-option-radio-label"
                      >
                        Correct Answer
                      </label>
                    </div>
                  </div>
                  <div className="edit-department-input-div">
                    <label style={{ fontWeight: "500" }}>Choice 3</label>
                    <input
                      type="text"
                      className="dep-input"
                      placeholder="Single Correct Answer Option"
                      value={option3}
                      onChange={(e) => setOption3(e.target.value)}
                    />
                    <div className="d-flex align-items-center">
                      <input
                        type="radio"
                        id="correctSingleAnswer"
                        name="correctSingleAnswer"
                        className="inputRadio pt-2"
                        checked={answer3}
                        onChange={() => {
                          setAnswer1(false);
                          setAnswer2(false);
                          setAnswer3(true);
                          setAnswer4(false);
                        }}
                      />
                      <label
                        htmlFor="correctSingleAnswer"
                        className="single-option-radio-label"
                      >
                        Correct Answer
                      </label>
                    </div>
                  </div>
                  <div className="edit-department-input-div">
                    <label style={{ fontWeight: "500" }}>Choice 4</label>
                    <input
                      type="text"
                      className="dep-input"
                      placeholder="Single Correct Answer Option"
                      value={option4}
                      onChange={(e) => setOption4(e.target.value)}
                    />
                    <div className="d-flex align-items-center">
                      <input
                        type="radio"
                        id="correctSingleAnswer"
                        name="correctSingleAnswer"
                        className="inputRadio pt-2"
                        checked={answer4}
                        onChange={() => {
                          setAnswer1(false);
                          setAnswer2(false);
                          setAnswer3(false);
                          setAnswer4(true);
                        }}
                      />
                      <label
                        htmlFor="correctSingleAnswer"
                        className="single-option-radio-label"
                      >
                        Correct Answer
                      </label>
                    </div>
                  </div>
                </div>
              ) : null}
              {answerType == "multiple" ? (
                <div className="single-options-div">
                  <div className="edit-department-input-div">
                    <label style={{ fontWeight: "500" }}>Choice 1</label>
                    <input
                      type="text"
                      className="dep-input"
                      placeholder="Multiple Correct Answer Option"
                      value={option1}
                      onChange={(e) => setOption1(e.target.value)}
                    />
                    <div className="d-flex align-items-center">
                      <input
                        type="checkbox"
                        id="correctMultipleAnswer"
                        name="correctMultipleAnswer"
                        onChange={(e) => setAnswer1(!answer1)}
                        className="inputRadio pt-2"
                        checked={answer1}
                      />
                      <label
                        htmlFor="correctMultipleAnswer"
                        className="single-option-radio-label"
                      >
                        Correct Answer
                      </label>
                    </div>
                  </div>
                  <div className="edit-department-input-div">
                    <label style={{ fontWeight: "500" }}>Choice 2</label>
                    <input
                      type="text"
                      className="dep-input"
                      placeholder="Multiple Correct Answer Option"
                      value={option2}
                      onChange={(e) => setOption2(e.target.value)}
                    />
                    <div className="d-flex align-items-center">
                      <input
                        type="checkbox"
                        id="correctMultipleAnswer"
                        name="correctMultipleAnswer"
                        onChange={() => setAnswer2(!answer2)}
                        className="inputRadio pt-2"
                        checked={answer2}

                      />
                      <label
                        htmlFor="correctMultipleAnswer"
                        className="single-option-radio-label"
                      >
                        Correct Answer
                      </label>
                    </div>
                  </div>
                  <div className="edit-department-input-div">
                    <label style={{ fontWeight: "500" }}>Choice 3</label>
                    <input
                      type="text"
                      className="dep-input"
                      placeholder="Multiple Correct Answer Option"
                      value={option3}
                      onChange={(e) => setOption3(e.target.value)}
                    />
                    <div className="d-flex align-items-center">
                      <input
                        type="checkbox"
                        id="correctMultipleAnswer"
                        name="correctMultipleAnswer"
                        onChange={() => setAnswer3(!answer3)}
                        className="inputRadio pt-2"
                        checked={answer3}

                      />
                      <label
                        htmlFor="correctMultipleAnswer"
                        className="single-option-radio-label"
                      >
                        Correct Answer
                      </label>
                    </div>
                  </div>
                  <div className="edit-department-input-div">
                    <label style={{ fontWeight: "500" }}>Choice 4</label>
                    <input
                      type="text"
                      className="dep-input"
                      placeholder="Multiple Correct Answer Option"
                      value={option4}
                      onChange={(e) => setOption4(e.target.value)}
                    />
                    <div className="d-flex align-items-center">
                      <input
                        type="checkbox"
                        id="correctMultipleAnswer"
                        name="correctMultipleAnswer"
                        onChange={() => setAnswer4(!answer4)}
                        className="inputRadio pt-2"
                        checked={answer4}
                      />
                      <label
                        htmlFor="correctMultipleAnswer"
                        className="single-option-radio-label"
                      >
                        Correct Answer
                      </label>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div
            className="modal-outer-secondary-btn add-ques-btn"
            onClick={() => {
              if (
                question !== "" &&
                answerType !== "" &&
                option1 !== "" &&
                option2 !== "" &&
                option3 !== "" &&
                option4 !== ""
              ) {
                if (answer1 || answer2 || answer3 || answer4) {
                  console.log("hello");
                  const data = {
                    question: question,
                    answerType: answerType,
                    choices: [
                      {
                        option: option1,
                        isAnswer: answer1,
                      },
                      {
                        option: option2,
                        isAnswer: answer2,
                      },
                      {
                        option: option3,
                        isAnswer: answer3,
                      },
                      {
                        option: option4,
                        isAnswer: answer4,
                      },
                    ],
                  };
                  console.log(data, "data");
                  setQuesarr((prev) => [...prev, data]);
                  setQuestion("");
                  setAnswerType("");
                  setOption1("");
                  setOption2("");
                  setOption3("");
                  setOption4("");
                  setAnswer1(false);
                  setAnswer2(false);
                  setAnswer3(false);
                  setAnswer4(false);
                } else {
                  toast.error("Pick atleast 1 correct option");
                }
              } else {
                toast.error("Empty question or choices are not allowed");
              }
            }}
          >
            Add this Question
          </div>
          <div className="mt-3" style={{ backgroundColor: "#f9f9f9" }}>
            {quesarr?.length > 0 &&
              quesarr?.map((el, i) => {
                return (
                  <div
                    className="single-options-div p-3 m-0"
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
                              setQuestion(el.question);
                              setAnswerType(el.answerType);
                              setOption1(el.choices[0].option)
                              setOption2(el.choices[1].option)
                              setOption3(el.choices[2].option)
                              setOption4(el.choices[3].option)
                              setAnswer1(el.choices[0].isAnswer)
                              setAnswer2(el.choices[1].isAnswer)
                              setAnswer3(el.choices[2].isAnswer)
                              setAnswer4(el.choices[3].isAnswer)
                              const temp = quesarr.filter((elem)=>elem.question !== el.question)
                              setQuesarr(temp);
                            }}
                          />
                          <img
                            src={deleteicon}
                            alt="submitsvg"
                            className="pointer"
                            style={{ height: "14px" }}
                            onClick={()=>{
                              const temp = quesarr.filter((elem)=>elem.question !== el.question)
                              setQuesarr(temp);
                            }}
                          />
                        </div>
                      </div>
                      <label style={{ fontWeight: "400" }}>{el.question}</label>
                      {el.answerType === "multiple" && (
                        <div
                          className="mt-1 d-flex align-items-center"
                          style={{ columnGap: "2rem" }}
                        >
                          {el.choices.map((item) => {
                            return (
                              <div className="d-flex align-items-center">
                                <input
                                  type="checkbox"
                                  id="correctMultipleAnswer"
                                  name="correctMultipleAnswer"
                                  className="inputRadio pt-2"
                                  checked={item.isAnswer}
                                  disabled
                                />
                                <label
                                  htmlFor="correctMultipleAnswer"
                                  className="single-option-radio-label"
                                >
                                  {item.option}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {el.answerType === "single" && (
                        <div
                          className="mt-1 d-flex align-items-center"
                          style={{ columnGap: "2rem" }}
                        >
                          {el.choices.map((item) => {
                            return (
                              <div className="d-flex align-items-center">
                                <input
                                  type="radio"
                                  id="correctMultipleAnswer"
                                  name="correctMultipleAnswer"
                                  className="inputRadio pt-2"
                                  checked={item.isAnswer}
                                  disabled
                                />
                                <label
                                  htmlFor="correctMultipleAnswer"
                                  className="single-option-radio-label"
                                >
                                  {item.option}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="save-discard-div">
          <div className="discard modal-outer-secondary-btn" onClick={()=>{
                              setTitle("");
                              setDesc("");
                              setQuesarr([]);
                              setQuestion("");
                              setAnswerType("");
                              setOption1("")
                              setOption2("")
                              setOption3("")
                              setOption4("")
                              setAnswer1(false)
                              setAnswer2(false)
                              setAnswer3(false)
                              setAnswer4(false)
          }}>Discard</div>
          <div className="savedraft modal-outer-primary-btn text-white py-1" onClick={()=>{
            submitquiz()
          }}>
            Save as Draft
          </div>
        </div>
      </>
    </div>
  );
}

export default Quizcard;
