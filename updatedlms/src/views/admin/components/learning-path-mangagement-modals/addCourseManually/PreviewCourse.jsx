import React, { useState, useContext, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { GlobalContext } from "../../../../../context/GlobalState";
import arrow from "../../../../../assets/svg/unenrolledCourses/arrow.svg";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import Popover from "react-bootstrap/Popover";
import { IoIosClose } from "react-icons/io";
import "./addcoursemanually.css";
import SubtopicView from "./views/SubtopicView";
import QuizView from "./views/QuizView";
import TaskView from "./views/TaskView";
import FinalAssessmentView from "./views/FinalAssessmentView";
import Confirmation from "./views/Confirmation";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import "./views/previews.css";
import { useParams } from "react-router";
import PopoverBottom from "./views/PopoverBottom";

function PreviewCourse(props) {
  const params = useParams();
  const {
    dispatch,
    navigate,
    commentsData,
    getcomments,
    getroleforpreview,
    roleforemployee,
    publishcourse,
    getupdatedcourse,
    coursecompletedata,
  } = useContext(GlobalContext);
  const [coursearray, setCoursearray] = useState([]);
  const [selectedindex, setSelectedindex] = useState("");
  const [finalobj, setFinalobj] = useState({ isdone: false });
  const [commentPane, setCommentPane] = useState(false);
  const handlePropogation = (event) => {
    event.stopPropagation();
  };
  useEffect(() => {
    getupdatedcourse(params.course);
  }, []);
  async function previewcoursegetter() {
    const assigner = await JSON.parse(
      sessionStorage.getItem(`course:${params.course}`)
    ).coursevalues;
    setCoursearray(assigner);
    setFinalobj(
      await JSON.parse(sessionStorage.getItem(`course:${params.course}`))
        .finalAssessment
    );
    if (assigner.length > 0) {
      if (assigner[0].type === "topic") {
        if (assigner[0].value[0].type === "subtopic") {
          setSelectedindex("Subtopic_0.0");
        } else if (assigner[0].value[0].type === "quiz") {
          setSelectedindex("Quiz_0.0");
        } else {
          setSelectedindex("Task_0.0");
        }
      } else if (assigner[0].type === "quiz") {
        setSelectedindex("Quiz_0");
      } else {
        setSelectedindex("Task_0");
      }
    }
  }
  useEffect(() => {
    if (Object.keys(coursecompletedata).length > 0) {
      if (sessionStorage) {
        if (sessionStorage.getItem(`course:${params.course}`)) {
          previewcoursegetter();
        }
      }
    }
  }, [coursecompletedata]);

  useEffect(() => {
    document.body.id = "comment-root";
    getcomments(params.course);
    getroleforpreview(params.lp, params.course);
    if (!props.adminswitch) {
      dispatch({
        type: "ACCOUNT_NAV",
        payload: "12",
      });
    }
  }, []);
  const [showOverlay, setShowOverlay] = useState("");
  console.log(showOverlay, "over");
  const Subtopicadd = ({ indexvalue }) => {
    return (
      <div
        className={`added-item-row position-relative  ${
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
            : coursearray[Number(indexvalue.split(".")[0])].value[
                Number(indexvalue.split(".")[1])
              ].value?.title?.length > 25
            ? coursearray[Number(indexvalue.split(".")[0])].value[
                Number(indexvalue.split(".")[1])
              ].value?.title.slice(0, 25) + " ..."
            : coursearray[Number(indexvalue.split(".")[0])].value[
                Number(indexvalue.split(".")[1])
              ].value?.title}
        </p>
        {roleforemployee?.isReviewer == 1 && (
          <div onClick={handlePropogation} className="h-100">
            <ButtonToolbar className="comment-arrow">
              <OverlayTrigger
                trigger="click"
                placement="right"
                show={showOverlay === indexvalue}
                overlay={
                  <PopoverBottom
                    indexno={
                      Number(indexvalue.split(".")[0]) +
                      1 +
                      "." +
                      indexvalue.split(".")[1]
                    }
                    namer="SubTopic"
                    setShowOverlay={setShowOverlay}
                    showOverlay={showOverlay}
                    forName={
                      Object.keys(
                        coursearray[Number(indexvalue.split(".")[0])].value[
                          Number(indexvalue.split(".")[1])
                        ].value
                      ).length == 0
                        ? "SubTopic"
                        : coursearray[Number(indexvalue.split(".")[0])].value[
                            Number(indexvalue.split(".")[1])
                          ].value?.title?.length > 25
                        ? coursearray[Number(indexvalue.split(".")[0])].value[
                            Number(indexvalue.split(".")[1])
                          ].value?.title.slice(0, 25) + " ..."
                        : coursearray[Number(indexvalue.split(".")[0])].value[
                            Number(indexvalue.split(".")[1])
                          ].value?.title
                    }
                  />
                }
                rootClose
              >
                <div className="">
                  <FaRegComment
                    style={{ color: "#242424" }}
                    onClick={() => {
                      if (showOverlay === "") {
                        setShowOverlay(indexvalue);
                      } else {
                        if (showOverlay === indexvalue) {
                          setShowOverlay("");
                        } else {
                          setShowOverlay(indexvalue);
                        }
                      }
                    }}
                  />
                </div>
              </OverlayTrigger>
            </ButtonToolbar>
          </div>
        )}
      </div>
    );
  };
  const Quizadd = ({ indexvalue }) => {
    return indexvalue.includes(".") ? (
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
        {roleforemployee?.isReviewer == 1 && (
          <div onClick={handlePropogation} className="h-100">
            {/* <CommentModal /> */}
            <ButtonToolbar className="comment-arrow">
              <OverlayTrigger
                trigger="click"
                placement="right"
                show={showOverlay === indexvalue}
                // overlay={popoverBottom}
                overlay={
                  <PopoverBottom
                    indexno={
                      indexvalue.includes(".")
                        ? Number(indexvalue.split(".")[0]) +
                          1 +
                          "." +
                          indexvalue.split(".")[1]
                        : Number(indexvalue) + 1
                    }
                    namer="Quiz"
                    setShowOverlay={setShowOverlay}
                    showOverlay={showOverlay}
                    forName={
                      indexvalue.includes(".")
                        ? Object.keys(
                            coursearray[Number(indexvalue.split(".")[0])].value[
                              Number(indexvalue.split(".")[1])
                            ].value
                          ).length == 0
                          ? "Quiz"
                          : coursearray[Number(indexvalue.split(".")[0])].value[
                              Number(indexvalue.split(".")[1])
                            ].value?.title?.length > 25
                          ? coursearray[Number(indexvalue.split(".")[0])].value[
                              Number(indexvalue.split(".")[1])
                            ].value?.title.slice(0, 25) + " ..."
                          : coursearray[Number(indexvalue.split(".")[0])].value[
                              Number(indexvalue.split(".")[1])
                            ].value?.title
                        : Object.keys(coursearray[Number(indexvalue)].value)
                            .length == 0
                        ? "Quiz"
                        : coursearray[Number(indexvalue)].value?.title?.length >
                          25
                        ? coursearray[Number(indexvalue)].value?.title.slice(
                            0,
                            25
                          ) + " ..."
                        : coursearray[Number(indexvalue)].value?.title
                    }
                  />
                }
                // overlay={<popoverBottom />}
                rootClose
              >
                <div className="">
                  <FaRegComment
                    style={{ color: "#242424" }}
                    onClick={() => {
                      if (showOverlay === "") {
                        setShowOverlay(indexvalue);
                      } else {
                        if (showOverlay === indexvalue) {
                          setShowOverlay("");
                        } else {
                          setShowOverlay(indexvalue);
                        }
                      }
                    }}
                  />
                </div>
              </OverlayTrigger>
            </ButtonToolbar>
          </div>
        )}
      </div>
    ) : (
      <div
        className={`added-item-row-outer ${
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
            : Number(indexvalue) + 1}
          {". "}
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
        {roleforemployee?.isReviewer == 1 && (
          <div onClick={handlePropogation} className="h-100">
            <ButtonToolbar className="comment-arrow">
              <OverlayTrigger
                trigger="click"
                placement="right"
                show={showOverlay === indexvalue}
                // overlay={popoverBottom}
                overlay={
                  <PopoverBottom
                    indexno={
                      indexvalue.includes(".")
                        ? Number(indexvalue.split(".")[0]) +
                          1 +
                          "." +
                          indexvalue.split(".")[1]
                        : Number(indexvalue) + 1
                    }
                    namer="Quiz"
                    setShowOverlay={setShowOverlay}
                    showOverlay={showOverlay}
                    forName={
                      indexvalue.includes(".")
                        ? Object.keys(
                            coursearray[Number(indexvalue.split(".")[0])].value[
                              Number(indexvalue.split(".")[1])
                            ].value
                          ).length == 0
                          ? "Quiz"
                          : coursearray[Number(indexvalue.split(".")[0])].value[
                              Number(indexvalue.split(".")[1])
                            ].value?.title?.length > 25
                          ? coursearray[Number(indexvalue.split(".")[0])].value[
                              Number(indexvalue.split(".")[1])
                            ].value?.title.slice(0, 25) + " ..."
                          : coursearray[Number(indexvalue.split(".")[0])].value[
                              Number(indexvalue.split(".")[1])
                            ].value?.title
                        : Object.keys(coursearray[Number(indexvalue)].value)
                            .length == 0
                        ? "Quiz"
                        : coursearray[Number(indexvalue)].value?.title?.length >
                          25
                        ? coursearray[Number(indexvalue)].value?.title.slice(
                            0,
                            25
                          ) + " ..."
                        : coursearray[Number(indexvalue)].value?.title
                    }
                  />
                }
                // overlay={<popoverBottom />}
                rootClose
              >
                <div className="">
                  <FaRegComment
                    style={{ color: "#242424" }}
                    onClick={() => {
                      if (showOverlay === "") {
                        setShowOverlay(indexvalue);
                      } else {
                        if (showOverlay === indexvalue) {
                          setShowOverlay("");
                        } else {
                          setShowOverlay(indexvalue);
                        }
                      }
                    }}
                  />
                </div>
              </OverlayTrigger>
            </ButtonToolbar>
          </div>
        )}
      </div>
    );
  };
  const Taskadd = ({ indexvalue }) => {
    return indexvalue.includes(".") ? (
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
        {roleforemployee?.isReviewer == 1 && (
          <div onClick={handlePropogation} className="h-100">
            <ButtonToolbar className="comment-arrow">
              <OverlayTrigger
                trigger="click"
                placement="right"
                show={showOverlay === indexvalue}
                // overlay={popoverBottom}
                overlay={
                  <PopoverBottom
                    indexno={
                      indexvalue.includes(".")
                        ? Number(indexvalue.split(".")[0]) +
                          1 +
                          "." +
                          indexvalue.split(".")[1]
                        : Number(indexvalue) + 1
                    }
                    namer="Task"
                    setShowOverlay={setShowOverlay}
                    showOverlay={showOverlay}
                    forName={
                      indexvalue.includes(".")
                        ? Object.keys(
                            coursearray[Number(indexvalue.split(".")[0])].value[
                              Number(indexvalue.split(".")[1])
                            ].value
                          ).length == 0
                          ? "Task"
                          : coursearray[Number(indexvalue.split(".")[0])].value[
                              Number(indexvalue.split(".")[1])
                            ].value?.title?.length > 25
                          ? coursearray[Number(indexvalue.split(".")[0])].value[
                              Number(indexvalue.split(".")[1])
                            ].value?.title.slice(0, 25) + " ..."
                          : coursearray[Number(indexvalue.split(".")[0])].value[
                              Number(indexvalue.split(".")[1])
                            ].value?.title
                        : Object.keys(coursearray[Number(indexvalue)].value)
                            .length == 0
                        ? "Task"
                        : coursearray[Number(indexvalue)].value?.title?.length >
                          25
                        ? coursearray[Number(indexvalue)].value?.title.slice(
                            0,
                            25
                          ) + " ..."
                        : coursearray[Number(indexvalue)].value?.title
                    }
                  />
                }
                // overlay={<popoverBottom />}
                rootClose
              >
                <div className="">
                  <FaRegComment
                    style={{ color: "#242424" }}
                    onClick={() => {
                      if (showOverlay === "") {
                        setShowOverlay(indexvalue);
                      } else {
                        if (showOverlay === indexvalue) {
                          setShowOverlay("");
                        } else {
                          setShowOverlay(indexvalue);
                        }
                      }
                    }}
                  />
                </div>
              </OverlayTrigger>
            </ButtonToolbar>
          </div>
        )}
      </div>
    ) : (
      <div
        className={`added-item-row-outer ${
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
            : Number(indexvalue) + 1}
          {". "}
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
        {roleforemployee?.isReviewer == 1 && (
          <div onClick={handlePropogation} className="h-100">
            <ButtonToolbar className="comment-arrow">
              <OverlayTrigger
                trigger="click"
                placement="right"
                show={showOverlay === indexvalue}
                // overlay={popoverBottom}
                overlay={
                  <PopoverBottom
                    indexno={
                      indexvalue.includes(".")
                        ? Number(indexvalue.split(".")[0]) +
                          1 +
                          "." +
                          indexvalue.split(".")[1]
                        : Number(indexvalue) + 1
                    }
                    namer="Task"
                    setShowOverlay={setShowOverlay}
                    showOverlay={showOverlay}
                    forName={
                      indexvalue.includes(".")
                        ? Object.keys(
                            coursearray[Number(indexvalue.split(".")[0])].value[
                              Number(indexvalue.split(".")[1])
                            ].value
                          ).length == 0
                          ? "Task"
                          : coursearray[Number(indexvalue.split(".")[0])].value[
                              Number(indexvalue.split(".")[1])
                            ].value?.title?.length > 25
                          ? coursearray[Number(indexvalue.split(".")[0])].value[
                              Number(indexvalue.split(".")[1])
                            ].value?.title.slice(0, 25) + " ..."
                          : coursearray[Number(indexvalue.split(".")[0])].value[
                              Number(indexvalue.split(".")[1])
                            ].value?.title
                        : Object.keys(coursearray[Number(indexvalue)].value)
                            .length == 0
                        ? "Task"
                        : coursearray[Number(indexvalue)].value?.title?.length >
                          25
                        ? coursearray[Number(indexvalue)].value?.title.slice(
                            0,
                            25
                          ) + " ..."
                        : coursearray[Number(indexvalue)].value?.title
                    }
                  />
                }
                // overlay={<popoverBottom />}
                rootClose
              >
                <div className="">
                  <FaRegComment
                    style={{ color: "#242424" }}
                    onClick={() => {
                      if (showOverlay === "") {
                        setShowOverlay(indexvalue);
                      } else {
                        if (showOverlay === indexvalue) {
                          setShowOverlay("");
                        } else {
                          setShowOverlay(indexvalue);
                        }
                      }
                    }}
                  />
                </div>
              </OverlayTrigger>
            </ButtonToolbar>
          </div>
        )}
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
                coursearray[Number(indexval)].name === ""
                  ? "Topic"
                  : coursearray[Number(indexval)].name
              }
            >
              {indexval + 1}.{" "}
              {coursearray[Number(indexval)].name === ""
                ? "Topic"
                : coursearray[Number(indexval)].name.length > 25
                ? coursearray[Number(indexval)].name.slice(0, 25) + " ..."
                : coursearray[Number(indexval)].name}
            </p>
          </div>
          {roleforemployee?.isReviewer == 1 && (
            <div onClick={handlePropogation} className="h-100">
              <ButtonToolbar className="comment-arrow">
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  show={showOverlay === indexval}
                  // overlay={popoverBottom}
                  overlay={
                    <PopoverBottom
                      indexno={indexval + 1}
                      namer={
                        coursearray[Number(indexval)].name === ""
                          ? "Topic"
                          : coursearray[Number(indexval)].name
                      }
                      setShowOverlay={setShowOverlay}
                      showOverlay={showOverlay}
                      forName={
                        coursearray[Number(indexval)].name === ""
                          ? "Topic"
                          : coursearray[Number(indexval)].name.length > 25
                          ? coursearray[Number(indexval)].name.slice(0, 25) +
                            " ..."
                          : coursearray[Number(indexval)].name
                      }
                    />
                  }
                  // overlay={<popoverBottom />}
                  rootClose
                >
                  <div className="">
                    <FaRegComment
                      className="me-4"
                      style={{ color: "#242424" }}
                      onClick={() => {
                        if (showOverlay === "") {
                          setShowOverlay(indexval);
                        } else {
                          if (showOverlay === indexval) {
                            setShowOverlay("");
                          } else {
                            setShowOverlay(indexval);
                          }
                        }
                      }}
                    />
                  </div>
                </OverlayTrigger>
              </ButtonToolbar>
            </div>
          )}
        </Accordion.Header>
        <Accordion.Body>
          <div className="added-item-div">
            {value.map((elum, index) => {
              if (elum.type === "subtopic") {
                return <Subtopicadd indexvalue={indexval + `.${index}`} />;
              } else if (elum.type === "task") {
                return <Taskadd indexvalue={indexval + `.${index}`} />;
              } else {
                return <Quizadd indexvalue={indexval + `.${index}`} />;
              }
            })}
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
      {commentPane && (
        <div className={`comment-pane ${commentPane && "comment-pane-show"}`}>
          <div className="comment-pane-head">
            <p>Comments</p>
            <IoIosClose
              className="comment-pane-close"
              onClick={() => {
                setCommentPane(false);
              }}
            />
          </div>
          <div className="comment-pane-content-block">
            <div className="comment-pane-content overflow-y-scroll">
              {commentsData.length > 0 &&
                commentsData.map((elem) => {
                  return (
                    <div className="comment-display-card">
                      <p>{`${elem.index} ${elem.title}`}</p>
                      <div className="added-item-row active-inner-row mt-2">
                        {elem.comment}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
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
          {coursearray?.courseId} Preview
        </div>
        <div className="d-flex align-items-center ">
          <div
            className="previewBtn modal-outer-primary-btn manual-final-submit d-flex align-items-center bg-white text-white py-1 me-2"
            style={{ border: "1px solid #BEBEBE" }}
            onClick={() => {
              setCommentPane(!commentPane);
            }}
          >
            <FaRegComment
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
              View Comments
            </p>
          </div>
          {roleforemployee?.isReviewer == 1 && (
            <div
              className="modal-outer-primary-btn manual-final-submit text-white py-1 me-2"
              onClick={() => publishcourse(params.course)}
            >
              Publish
            </div>
          )}
        </div>
      </div>
      <div className="add-course-manually-page">
        <div className="add-course-manually-accordian-div">
          <div className="accordian-div w-100">
            <Accordion defaultActiveKey="0">
              {coursearray.map((elem, index) => {
                if (elem.type === "topic") {
                  return <Accordianadd indexval={index} value={elem.value} />;
                } else if (elem.type === "quiz") {
                  return <Quizadd indexvalue={`${index}`} />;
                } else {
                  return <Taskadd indexvalue={`${index}`} />;
                }
              })}
            </Accordion>
          </div>

          {Object.keys(finalobj).length > 1 && (
            <div
              className={`modal-outer-secondary-btn final-assessment-btn pointer w-100 finalAssessmentActive`}
              onClick={() => {
                if (finalobj.isdone) {
                  setSelectedindex("FinalForm");
                } else {
                  setSelectedindex("Finaltask");
                }
              }}
            >
              Final Assessment
            </div>
          )}
        </div>
        <div className="add-course-manually-filldetails-div">
          {selectedindex.split("_")[0] === "Subtopic" ? (
            <SubtopicView
              coursearray={coursearray}
              dataval={selectedindex.split("_")[1]}
            />
          ) : selectedindex.split("_")[0] === "Quiz" ? (
            <QuizView
              coursearray={coursearray}
              dataval={selectedindex.split("_")[1]}
            />
          ) : selectedindex.split("_")[0] === "Task" ? (
            <TaskView
              coursearray={coursearray}
              dataval={selectedindex.split("_")[1]}
            />
          ) : selectedindex === "Finaltask" ? (
            <Confirmation
              finalobj={finalobj}
              setSelectedindex={setSelectedindex}
            />
          ) : selectedindex === "FinalForm" ? (
            <FinalAssessmentView finalobj={finalobj} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default PreviewCourse;