import React from "react";
import emptyLPIccon from "../../assets/svg/dashboard/learningPath/empty-lp-icon.svg";
import pendingIcon from "../../assets/svg/dashboard/learningPath/pending-icon.svg";
import pendingLine from "../../assets/svg/dashboard/learningPath/pending-line.svg";
import completedIcon from "../../assets/svg/dashboard/learningPath/completed-icon.svg";
import completedLine from "../../assets/svg/dashboard/learningPath/completed-line.svg";
import lockedIcon from "../../assets/svg/dashboard/learningPath/locked-icon.svg";
import lockedLine from "../../assets/svg/dashboard/learningPath/locked-line.svg";
import "./learningPathCard.css";
import { useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
function LearningPathCardReports({ heightp }) {
  const reportparam = useParams();
  const { lpformenteereport, allenrolledpaths } = useContext(GlobalContext);
  const [paths, setPaths] = useState([]);
  const [selectedpath, setSelectedpath] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  useEffect(() => {
    if (reportparam) {
      lpformenteereport(reportparam.id);
    }
  }, [reportparam]);
  useEffect(() => {
    if (allenrolledpaths) {
      // let keys = Object.keys(allenrolledpaths);
      // keys.sort(
      //   (a, b) =>
      //     new Date(allenrolledpaths[a].lpStartDate) -
      //     new Date(allenrolledpaths[b].lpStartDate)
      // );
      let keys = Object.keys(allenrolledpaths);
      setPaths(keys);
      setSelectedpath(keys[0]);
    }
  }, [allenrolledpaths]);

  return Object.keys(allenrolledpaths).length > 0 ? (
    <div className="bg-white pt-2 pb-1 uni-border learning-path-container learning-path-reports-container">
      <div className="d-flex justify-content-between py-1 bg-white lp-head-row lp-head-row-reports">
        <p
          style={{
            fontWeight: "500",
            fontSize: "16px",
            paddingLeft: "0.4rem ",
            marginTop: "3px",
          }}
        >
          Ongoing Learning Path
        </p>
        {/* <select
            name="courseselect"
            id="select-course"
            className="learning-path-course-select "
            onChange={(e) => {
              setSelectedpath(e.target.value);
            }}
          >
            
            {paths.length !== 0
              ? paths?.map((elem) => {
                  return (
                    <>
                      <option
                        className="learning-path-course-option"
                        value={elem}
                      >
                        {elem}
                      </option>
                      </>
                      );
                    })
                    : null}
                  </select> */}
        <div
          name="courseselect"
          id="select-course"
          className="learning-path-course-select learning-path-course-select-reports position-relative uni-border"
          style={{ marginRight: "0.8rem" }}
        >
          <div
            className="ps-2 lp-select justify-content-end lp-select-reports"
            style={{
              borderColor:
                paths.indexOf(selectedpath) == 0
                  ? "#91DAEA"
                  : paths.indexOf(selectedpath) == 1
                  ? "#EAB691"
                  : "#DD91EA",
            }}
            onClick={() => setShowOptions(!showOptions)}
          >
            <p
              style={{
                width: " 7rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {selectedpath}
            </p>
            <BsChevronDown className="dropicon" />
          </div>
          <div className="position-absolute absolute-options absolute-options-reports">
            {showOptions && paths?.length > 0
              ? paths?.map((elem, index) => {
                  return (
                    <div
                      className="mt-2 d-flex align-items-center"
                      style={{
                        height: "1.5rem",
                        borderLeft: "5px solid",
                        borderColor:
                          index == 0
                            ? "#91DAEA"
                            : index == 1
                            ? "#EAB691"
                            : "#DD91EA",
                      }}
                      onClick={() => {
                        setSelectedpath(elem);
                        setShowOptions(!showOptions);
                      }}
                      value={elem}
                    >
                      <p className="ps-2">{elem}</p>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
      <div
        className={`py-1 overflow-y-scroll d-flex flex-column learning-path-card px-1 ${
          heightp === 2 ? "learning-path-card-height" : ""
        } bg-white`}
      >
        {selectedpath &&
          allenrolledpaths[selectedpath] &&
          Object.values(allenrolledpaths[selectedpath]).length > 0 &&
          Object.values(allenrolledpaths[selectedpath]).map((elem, index) => {
            return (
              <div className="row d-flex align-items-center">
                <div className="col-1 position-relative d-flex align-items-center justify-content-center">
                  {elem?.progress !== null ? (
                    <img
                      src={
                        elem?.progress === 2
                          ? completedIcon
                          : elem?.progress === 1
                          ? pendingIcon
                          : lockedIcon
                      }
                      alt="completedIcon"
                      style={{ zIndex: "1" }}
                    />
                  ) : null}
                  {Object.values(allenrolledpaths[selectedpath]).length !==
                    index + 1 && elem?.progress !== 0 ? (
                    <img
                      src={
                        elem?.progress === 2
                          ? completedLine
                          : elem?.progress === 1
                          ? pendingLine
                          : lockedLine
                      }
                      alt="completedLine"
                      className="position-absolute status-line "
                      style={{ top: "50%" }}
                    />
                  ) : null}
                </div>
                <div
                  className="learningpathtitle col-10 pointer"
                  style={{ fontSize: "14px" }}
                >
                  {elem?.name}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  ) : (
    <div
      className={`py-2 learning-path-card ${
        heightp === 2 ? "learning-path-card-height" : ""
      } bg-white`}
    >
      <p
        className="px-3"
        style={{
          fontWeight: "500",
          fontSize: "16px",
          paddingLeft: "0.8rem ",
          padding: "7px 0px",
        }}
      >
        Ongoing Learning Path
      </p>
      <div
        style={{ height: "100%" }}
        className="NoLPCard d-flex flex-column align-items-center"
      >
        <img
          src={emptyLPIccon}
          alt="noSamplerImg"
          className="noSamplerImg"
          style={{ height: "5rem" }}
        />
        <p className="mt-1" style={{ fontSize: "12px", color: " #424242" }}>
          Your set learning path will appear here
        </p>
      </div>
    </div>
  );
}

export default LearningPathCardReports;
