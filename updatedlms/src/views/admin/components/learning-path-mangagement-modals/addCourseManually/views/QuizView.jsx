import React, { useState, useEffect } from "react";
import finalAssessmentimg from "../../../../../../assets/finalAssessment.png";
import Nodata from "./Nodata";

function QuizView({ coursearray, dataval }) {
  const [quizData, setQuizData] = useState({});
  const [startQuiz, setStartQuiz] = useState(false);

  useEffect(() => {
    if (dataval.includes(".")) {
      if (
        Object.keys(
          coursearray[Number(dataval.split(".")[0])].value[
            Number(dataval.split(".")[1])
          ].value
        ).length > 0
      ) {
        const temp =
          coursearray[Number(dataval.split(".")[0])].value[
            Number(dataval.split(".")[1])
          ];
        setQuizData(temp);
      }
      else{
        setQuizData({});
      }
    } else {
      if (Object.keys(coursearray[Number(dataval)].value).length > 0) {
        const dataobj = coursearray[Number(dataval)];
        setQuizData(dataobj);
      }
      else{
        setQuizData({});
      }
    }
  }, [dataval]);
if(Object.keys(quizData).length > 0)
{
  return (
    <div className="h-100 overflow-y-scroll">
      {!startQuiz ? (
        <div
          className="main-topic-detail inner-field justify-content-evenly h-100"
          style={{ minHeight: "100%" }}
        >
          <strong>{quizData?.value?.title}</strong>
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
                setStartQuiz(true);
              }}
              style={{ width: "fit-content" }}
            >
              Start Quiz
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
            <p style={{ fontSize: "12px", color: "#424242" }} className="mt-1">
              You won't be able to open any other module untill you finish your
              quiz.
            </p>
          </div>
        </div>
      ) : (
        <div className="h-100 bg-white p-3 overflow-y-scroll">
          <div className="d-flex align-items-center justify-content-between">
            <p
              className="inner-field-head"
              style={{ fontSize: "16px", color: "#424242" }}
            >
              {quizData?.value?.title}
            </p>
            <p className="" style={{ fontSize: "12px", color: "#424242" }}>
              <strong>Duration :</strong> 30 mins
            </p>
          </div>
          <div
            className="inner-field-head mt-1"
            style={{ fontSize: "14px", color: "#424242", fontWeight: "400" }}
          >
            {quizData?.value?.description}
          </div>
          <div
            className="py-2 px-3 mt-3 d-flex flex-column gap-2 overflow-y-scroll"
            style={{ backgroundColor: "#f9f9f9", height: "calc(100% - 95px)" }}
          >
            {quizData?.value?.questions?.map((el, i) => {
              return (
                <div className="">
                  {el.answerType == "multiple" ? (
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#424242",
                        fontWeight: "400",
                      }}
                    >
                      <p>
                        {i + 1 + ". "} {el.question}
                      </p>
                      <div
                        className="d-flex align-items-center ps-2"
                        style={{ columnGap: "2rem" }}
                      >
                        {el.choices.map((item) => {
                          return (
                            <div className="d-flex align-items-center">
                              <input
                                type="checkbox"
                                id="correctMultipleAnswer"
                                name="correctMultipleAnswer"
                                className="inputRadio"
                                //   checked={item.isAnswer}
                              />
                              <label
                                htmlFor="correctMultipleAnswer"
                                className="single-option-radio-label"
                                style={{
                                  fontSize: "14px",
                                  color: "#424242",
                                  fontWeight: "400",
                                }}
                              >
                                {item.option}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : el.answerType == "single" ? (
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#424242",
                        fontWeight: "400",
                      }}
                    >
                      <p>
                        {i + 1 + ". "} {el.question}
                      </p>
                      <div
                        className="d-flex align-items-center ps-2"
                        style={{ columnGap: "2rem" }}
                      >
                        {el.choices.map((item) => {
                          return (
                            <div className="d-flex align-items-center">
                              <input
                                type="radio"
                                id="correctMultipleAnswer"
                                name="correctMultipleAnswer"
                                className="inputRadio"
                              />
                              <label
                                htmlFor="correctMultipleAnswer"
                                className="single-option-radio-label"
                                style={{
                                  fontSize: "14px",
                                  color: "#424242",
                                  fontWeight: "400",
                                }}
                              >
                                {item.option}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className="w-100 d-flex justify-content-end">
            <div className="modal-outer-primary-btn manual-final-submit text-white py-1 me-2 mt-2">
              Finsish
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
else{
        return(
              <Nodata/>
            )
     }
}

export default QuizView;
