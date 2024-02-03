import React, { useState, useContext, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { GlobalContext } from "../../../../../context/GlobalState";
import arrow from "../../../../../assets/svg/unenrolledCourses/arrow.svg";
import bin from "../../../assets/courseManagement/bin.svg";
import edit from "../../../assets/courseManagement/edit.svg";
import { IoEyeOutline } from "react-icons/io5";
import "./addcoursemanually.css";
import { useParams } from "react-router";
import Subtopiccard from "./Subtopiccard";
import Quizcard from "./Quizcard";
import Taskcard from "./Taskcard";
import Topicname from "./Topicname";
import Finalassesmentask, { Finalfillform } from "./Finalassesment";
import { toast } from "react-hot-toast";


function AddCourseManually(props) {
  const params = useParams();
  const {
    dispatch,
    navigate,
    submitcourse,
    getupdatedcourse,
    coursecompletedata,
    sendforapproval,
    userMail,
    socket
  } = useContext(GlobalContext);
  const [coursearray, setCoursearray] = useState([]);
  const [selectedindex, setSelectedindex] = useState("");
  const [finalobj, setFinalobj] = useState({ isdone: false });

  useEffect(() => {
    if(Object.keys(socket).length > 0)
    {
      socket.emit('editing',userMail);
    }
  },[socket]);

  useEffect(() => {
    if (coursearray.length > 0 || finalobj.isdone) {
      const data = {
        lpId: params.lp,
        courseId: params.course,
        type: "Save",
        coursevalues: coursearray,
        finalAssessment: finalobj,
      };
      sessionStorage.setItem(`course:${params.course}`, JSON.stringify(data));
    }
  }, [coursearray, finalobj]);
  useEffect(() => {
    if (!props.adminswitch) {
      dispatch({
        type: "ACCOUNT_NAV",
        payload: "12",
      });
    }
  }, []);
  async function coursegetter() {
    const assigner = await JSON.parse(
      sessionStorage.getItem(`course:${params.course}`)
    ).coursevalues;
    setCoursearray(assigner);
    setFinalobj(
      await JSON.parse(sessionStorage.getItem(`course:${params.course}`))
        .finalAssessment
    );
    if (assigner.length > 0) {
      if (assigner[0].type == "topic") {
        if (assigner[0].value[0].type == "subtopic") {
          setSelectedindex("Subtopic_" + "0.0");
        } else if (assigner[0].value[0].type == "quiz") {
          setSelectedindex("Quiz_" + "0.0");
        } else {
          setSelectedindex("Task_" + "0.0");
        }
      } else if (assigner[0].type == "quiz") {
        setSelectedindex("Quiz_" + "0");
      } else {
        setSelectedindex("Task_" + "0");
      }
    }
  }
  useEffect(() => {
    if (Object.keys(coursecompletedata).length > 0) {
      if (sessionStorage) {
        if (sessionStorage.getItem(`course:${params.course}`)) {
          coursegetter();
        }
      }
    }
  }, [coursecompletedata]);
  useEffect(() => {
    getupdatedcourse(params.course);
  }, []);
  const deleteoption = (indexvalue) => {
    if (indexvalue.includes(".")) {
      const temp = coursearray.map((elem, index) => {
        if (index == Number(indexvalue.split(".")[0])) {
          let innertemp = elem;
          innertemp.value = elem.value.filter(
            (el, ind) => ind !== Number(indexvalue.split(".")[1])
          );
          return innertemp;
        } else {
          return elem;
        }
      });
      setCoursearray(temp);
      setSelectedindex("");
    } else {
      const temp = coursearray.filter(
        (elem, index) => index !== Number(indexvalue)
      );
      setCoursearray(temp);
      setSelectedindex("");
    }
  };
  const Subtopicadd = ({ indexvalue }) => {
    return (
      <div
        className={`added-item-row ${
          selectedindex.split("_")[1] === indexvalue && "active-inner-row"
        }`}
        onClick={() => setSelectedindex("Subtopic_" + indexvalue)}
      >
        <p>
          {Number(indexvalue.split(".")[0]) +
            1 +
            "." +
            indexvalue.split(".")[1]}{" "}
          {Object.keys(
            coursearray[Number(indexvalue.split(".")[0])].value[
              Number(indexvalue.split(".")[1])
            ].value
          ).length == 0
            ? "SubTopic"
            : "SubTopic - " + coursearray[Number(indexvalue.split(".")[0])].value[
                Number(indexvalue.split(".")[1])
              ].value?.title?.length > 25
            ? "SubTopic - " + coursearray[Number(indexvalue.split(".")[0])].value[
                Number(indexvalue.split(".")[1])
              ].value?.title.slice(0, 25) + " ..."
            : "SubTopic - " + coursearray[Number(indexvalue.split(".")[0])].value[
                Number(indexvalue.split(".")[1])
              ].value?.title}
        </p>
        <div>
          {/* <img src={edit} alt="edit" height={14} className="ms-2" onClick={(e)=>e.stopPropagation()}/> */}
          <img
            src={bin}
            alt="bin"
            className="bin-img m-0"
            onClick={(e) => {
              e.stopPropagation();
              deleteoption(indexvalue);
            }}
          />
        </div>
      </div>
    );
  };
  const Quizadd = ({ indexvalue }) => {
    return (
      <div
        className={`added-item-row ${
          selectedindex.split("_")[1] === indexvalue && "active-inner-row"
        }`}
        onClick={() => setSelectedindex("Quiz_" + indexvalue)}
      >
        <p>
          {indexvalue.includes(".")
            ? Number(indexvalue.split(".")[0]) +
              1 +
              "." +
              indexvalue.split(".")[1]
            : Number(indexvalue) + 1}{" "}
          {indexvalue.includes(".")
            ? Object.keys(
                coursearray[Number(indexvalue.split(".")[0])].value[
                  Number(indexvalue.split(".")[1])
                ].value
              ).length == 0
              ? "Quiz"
              : coursearray[Number(indexvalue.split(".")[0])].value[
                  Number(indexvalue.split(".")[1])
                ].value?.title?.length > 25
              ? "Quiz - " +
                coursearray[Number(indexvalue.split(".")[0])].value[
                  Number(indexvalue.split(".")[1])
                ].value?.title.slice(0, 25) +
                " ..."
              : "Quiz - " +
                coursearray[Number(indexvalue.split(".")[0])].value[
                  Number(indexvalue.split(".")[1])
                ].value?.title
            : Object.keys(coursearray[Number(indexvalue)].value).length == 0
            ? "Quiz"
            : coursearray[Number(indexvalue)].value?.title?.length > 25
            ? "Quiz - " +
              coursearray[Number(indexvalue)].value?.title.slice(0, 25) +
              " ..."
            : "Quiz - " + coursearray[Number(indexvalue)].value?.title}
        </p>
        <div>
          {/* <img src={edit} alt="edit" height={14} className="ms-2" /> */}
          <img
            src={bin}
            alt="bin"
            className="bin-img m-0"
            onClick={(e) => {
              e.stopPropagation();
              deleteoption(indexvalue);
            }}
          />
        </div>
      </div>
    );
  };
  const Taskadd = ({ indexvalue }) => {
    return (
      <div
        className={`added-item-row ${
          selectedindex.split("_")[1] === indexvalue && "active-inner-row"
        }`}
        onClick={() => setSelectedindex("Task_" + indexvalue)}
      >
        <p>
          {indexvalue.includes(".")
            ? Number(indexvalue.split(".")[0]) +
              1 +
              "." +
              indexvalue.split(".")[1]
            : Number(indexvalue) + 1}{" "}
          {indexvalue.includes(".")
            ? Object.keys(
                coursearray[Number(indexvalue.split(".")[0])].value[
                  Number(indexvalue.split(".")[1])
                ].value
              ).length == 0
              ? "Task"
              : coursearray[Number(indexvalue.split(".")[0])].value[
                  Number(indexvalue.split(".")[1])
                ].value?.title?.length > 25
              ? "Task - " +
                coursearray[Number(indexvalue.split(".")[0])].value[
                  Number(indexvalue.split(".")[1])
                ].value?.title.slice(0, 25) +
                " ..."
              : "Task - " +
                coursearray[Number(indexvalue.split(".")[0])].value[
                  Number(indexvalue.split(".")[1])
                ].value?.title
            : Object.keys(coursearray[Number(indexvalue)].value).length == 0
            ? "Task"
            : coursearray[Number(indexvalue)].value?.title?.length > 25
            ? "Task - " +
              coursearray[Number(indexvalue)].value?.title.slice(0, 25) +
              " ..."
            : "Task - " + coursearray[Number(indexvalue)].value?.title}
        </p>
        <div>
          {/* <img src={edit} alt="edit" height={14} className="ms-2" /> */}
          <img
            src={bin}
            alt="bin"
            className="bin-img m-0"
            onClick={(e) => {
              e.stopPropagation();
              deleteoption(indexvalue);
            }}
          />
        </div>
      </div>
    );
  };
  const Accordianadd = ({ indexval, value }) => {
    return (
      <Accordion.Item eventKey={`${indexval}`}>
        <Accordion.Header>
          <div className="d-flex align-items-center">
            <p
              title={
                coursearray[Number(indexval)].name == ""
                  ? "Topic"
                  : coursearray[Number(indexval)].name
              }
            >
              {indexval + 1}.{" "}
              {coursearray[Number(indexval)].name == ""
                ? "Topic"
                : coursearray[Number(indexval)].name.length > 25
                ? coursearray[Number(indexval)].name.slice(0, 25) + " ..."
                : coursearray[Number(indexval)].name}
            </p>
            <img
              src={edit}
              alt="edit"
              height={14}
              className="ms-2"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedindex("Topic_" + indexval);
              }}
            />
          </div>
          <div>
            <img
              src={bin}
              alt="bin"
              className="bin-img"
              onClick={(e) => {
                e.stopPropagation();
                const temp = coursearray.filter(
                  (elem, index) => index !== Number(indexval)
                );
                setCoursearray(temp);
                setSelectedindex("");
              }}
            />
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div className="added-item-div">
            {value.map((elum, index) => {
              if (elum.type == "subtopic") {
                return <Subtopicadd indexvalue={indexval + `.${index}`} />;
              } else if (elum.type == "task") {
                return <Taskadd indexvalue={indexval + `.${index}`} />;
              } else {
                return <Quizadd indexvalue={indexval + `.${index}`} />;
              }
            })}
          </div>

          <div className="add-course-inner-items-div">
            <div
              className="addsubtopic"
              onClick={() => {
                const temp = {
                  type: "subtopic",
                  value: {},
                };
                const temparr = coursearray.map((item, ind) => {
                  console.log(item, "item232");
                  if (ind == indexval) {
                    return {
                      ...item,
                      value: [
                        ...item.value,
                        { type: temp.type, value: temp.value },
                      ],
                    };
                  } else return item;
                });
                console.log(temparr);
                setCoursearray(temparr);
              }}
            >
              + Subtopic
            </div>
            <div
              className="addquiz"
              onClick={() => {
                const temp = {
                  type: "quiz",
                  value: {},
                };
                const temparr = coursearray.map((item, ind) => {
                  if (ind == indexval) {
                    return {
                      ...item,
                      value: [
                        ...item.value,
                        { type: temp.type, value: temp.value },
                      ],
                    };
                  } else return item;
                });
                setCoursearray(temparr);
              }}
            >
              + Quiz
            </div>
            <div
              className="addtask"
              onClick={() => {
                const temp = {
                  type: "task",
                  value: {},
                };
                const temparr = coursearray.map((item, ind) => {
                  if (ind == indexval) {
                    return {
                      ...item,
                      value: [
                        ...item.value,
                        { type: temp.type, value: temp.value },
                      ],
                    };
                  } else return item;
                });
                setCoursearray(temparr);
              }}
            >
              + Task
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    );
  };

  useEffect(() => {
    console.log(coursearray);
  }, [coursearray]);
  return (
    <div className="courseManagementContainer">
      <div
        className="d-flex bredcumb-header"
        style={{ columnGap: "8px", fontSize: "12px" }}
      >
        <p
          className="pointer"
          onClick={() =>
            props.adminswitch
              ? navigate("/admin/coursemanagement")
              : navigate("/pathmanagement")
          }
        >
          Learning Path Management
        </p>
        <p>&#x3e;</p>
        <p className="pointer" onClick={() => window.history.back()}>
          {params.lp}
        </p>
        <p>&#x3e;</p>
        <p style={{ color: "#4F52B2" }}>{params.course}</p>
      </div>
      <div className="create-course-head-manually py-2">
        <div className="create-course-head">
          <img
            src={arrow}
            alt="leftArrowIcon"
            style={{ height: "16px" }}
            className="pointer"
            onClick={() => window.history.back()}
          />
          {params.course}
        </div>
        <div className="d-flex align-items-center ">
          <div
            className="previewBtn modal-outer-primary-btn manual-final-submit d-flex align-items-center bg-white text-white py-1 me-2"
            style={{ border: "1px solid #BEBEBE" }}
            onClick={() => {
              props.adminswitch
                ? navigate(
                    `/admin/coursemanagement/preview/${params.lp}/${params.course}`
                  )
                : navigate(
                    `/coursemanagement/preview/${params.lp}/${params.course}`
                  );
            }}
          >
            <IoEyeOutline
              style={{
                color: "#242424",
              }}
              className="me-1 "
            />
            <p
              style={{
                color: "#242424",
                paddingTop: "0.5px",
              }}
            >
              Preview
            </p>
          </div>
          <div
            className="modal-outer-primary-btn manual-final-submit text-white py-1 me-2"
            title="Save your progress"
            onClick={() => {
              if (sessionStorage) {
                if (sessionStorage.getItem(`course:${params.course}`)) {
                  const submit = JSON.parse(
                    sessionStorage.getItem(`course:${params.course}`)
                  );
                  submitcourse(submit);
                } else {
                  toast.error("Create a course first");
                }
              } else {
                toast.error("Create a course first");
              }
            }}
          >
            Upload
          </div>
          <div
            className="modal-outer-primary-btn manual-final-submit text-white py-1"
            onClick={() => sendforapproval(params.course)}
          >
            Send For Aprroval
          </div>
        </div>
      </div>
      <div className="add-course-manually-page">
        <div className="add-course-manually-accordian-div">
          <div className="accordian-div w-100">
            <Accordion defaultActiveKey="0">
              {coursearray.map((elem, index) => {
                if (elem.type == "topic") {
                  return <Accordianadd indexval={index} value={elem.value} />;
                } else if (elem.type == "quiz") {
                  return <Quizadd indexvalue={`${index}`} />;
                } else {
                  return <Taskadd indexvalue={`${index}`} />;
                }
              })}
              <div className="add-course-main-items-div">
                <div
                  className="addtopic"
                  onClick={() =>
                    setCoursearray((prev) => [
                      ...prev,
                      { type: "topic", name: "", value: [] },
                    ])
                  }
                >
                  + Topic
                </div>
                <div
                  className="addquiz"
                  onClick={() =>
                    setCoursearray((prev) => [
                      ...prev,
                      { type: "quiz", value: {} },
                    ])
                  }
                >
                  + Quiz
                </div>
                <div
                  className="addtask"
                  onClick={() =>
                    setCoursearray((prev) => [
                      ...prev,
                      { type: "task", value: {} },
                    ])
                  }
                >
                  + Task
                </div>
              </div>
            </Accordion>
          </div>
          <div
            className={`modal-outer-secondary-btn final-assessment-btn pointer w-100 ${
              finalobj.isdone && "finalAssessmentActive"
            }`}
            onClick={() => {
              if (finalobj.isdone) {
                setSelectedindex("FinalForm");
              } else {
                setSelectedindex("Finaltask");
              }
            }}
          >
            {finalobj.isdone ? "Final Assessment" : "+ Add Final Assessment"}
          </div>
        </div>
        <div className="add-course-manually-filldetails-div">
          {selectedindex.split("_")[0] === "Subtopic" ? (
            <Subtopiccard
              coursearray={coursearray}
              setCoursearray={setCoursearray}
              dataval={selectedindex.split("_")[1]}
            />
          ) : selectedindex.split("_")[0] === "Quiz" ? (
            <Quizcard
              coursearray={coursearray}
              setCoursearray={setCoursearray}
              dataval={selectedindex.split("_")[1]}
            />
          ) : selectedindex.split("_")[0] === "Task" ? (
            <Taskcard
              coursearray={coursearray}
              setCoursearray={setCoursearray}
              dataval={selectedindex.split("_")[1]}
            />
          ) : selectedindex.split("_")[0] === "Topic" ? (
            <Topicname
              coursearray={coursearray}
              setCoursearray={setCoursearray}
              dataval={selectedindex.split("_")[1]}
            />
          ) : selectedindex === "Finaltask" ? (
            <Finalassesmentask
              setSelectedindex={setSelectedindex}
              finalobj={finalobj}
              setFinalobj={setFinalobj}
            />
          ) : selectedindex === "FinalForm" ? (
            <Finalfillform
              coursearray={coursearray}
              finalobj={finalobj}
              setFinalobj={setFinalobj}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default AddCourseManually;
