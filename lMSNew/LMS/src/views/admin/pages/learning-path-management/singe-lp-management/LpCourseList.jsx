import React, { useContext } from "react";
import "../course-management/coursemanagement.css";
import { GlobalContext } from "../../../../../context/GlobalState";
import Button from "react-bootstrap/Button";
import emptyImg from "../../../assets/courseManagement/emptyCourseList.svg";
import AddNewCourseModal from "../../../components/learning-path-mangagement-modals/addNewCourseModal/AddNewCourseModal";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import { useState } from "react";
import "./lpcourselist.css";
import ViewCourseDescription from "../../../components/learning-path-mangagement-modals/viewDescriptionModal/ViewCourseDescription";
import EditAssignedDepartment from "../../../components/learning-path-mangagement-modals/editAssignDespartment/EditAssignedDepartment";
import moment from "moment";
import { toast } from "react-hot-toast";


localStorage.debug = "*";

function LpCourseList(props) {
  const {
    navigate,
    allcoursesinadmin,
    allcoursesmanagement,
    dispatch,
    userMail,
    socket,
  } = useContext(GlobalContext);
  const [courses, setCourses] = useState([]);
  const [assignedDepartments, setAssignedDepartments] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (
      Object.keys(allcoursesmanagement).length > 0 &&
      Object.keys(socket).length > 0
    ) {
      socket.emit(
        "getAllStatus",
        params.id,
        userMail,
        allcoursesmanagement.courses
      );
      socket.on("getAllStatusResponse", (arr) => {
        setCourses(arr);
      });
    }
  }, [allcoursesmanagement, socket]);

  useEffect(() => {
    if (params.id) {
      allcoursesinadmin(params.id);
    }
    if (!props.adminswitch) {
      dispatch({
        type: "ACCOUNT_NAV",
        payload: "12",
      });
    }
  }, [params]);

  useEffect(() => {
    if (Object.keys(allcoursesmanagement).length > 0) {
      setAssignedDepartments(allcoursesmanagement.department.split(","));
    }
  }, [allcoursesmanagement]);

  return (
    <>
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
          <p style={{ color: "#4F52B2" }}>{params?.id}</p>
        </div>
        <div className=" d-flex align-items-center justify-content-between coursemanagement-head-row mt-1">
          <p className="courseManagementHead pt-1" style={{ fontSize: "18px" }}>
            {params?.id}
            <span
              className="resourcessTotalCount px-2"
              style={{ fontSize: "14px" }}
            >{`${allcoursesmanagement?.noOfCourses} Courses`}</span>
          </p>
          <div className="coursemanagement-modal-row">
            {allcoursesmanagement?.buttons?.addCourse === 1 && (
              <Button
                className="modal-outer-primary-btn reportuploadbtn py-2 px-3 d-flex align-items-center"
                style={{ fontSize: "12px" }}
                onClick={() => {
                  props.adminswitch
                    ? navigate(`/admin/addcourseform/${params?.id}`)
                    : navigate(`/addcourseform/${params?.id}`);
                }}
              >
                Add Course &nbsp; <span>+</span>
              </Button>
            )}
          </div>
        </div>
        <div className="assign-departments">
          <div className="assign-dep-title">
            <p>Assigned Department: </p>
          </div>
          <div className="assign-dep-tiles">
            {assignedDepartments[0] !== "" ? (
              assignedDepartments.map((elem) => {
                return <div className="department-tile">{elem}</div>;
              })
            ) : (
              <div className="assign-dep-title">
                <p>N/A </p>
              </div>
            )}
            {allcoursesmanagement?.buttons?.editAssignedDepartment == 1 && (
              <EditAssignedDepartment
                lpname={params?.id}
                assignedDepartments={assignedDepartments}
                setAssignedDepartments={setAssignedDepartments}
              />
            )}
          </div>
        </div>
        {allcoursesmanagement ? (
          allcoursesmanagement.noOfCourses !== 0 ? (
            <div className="single-lp-courselist">
              <div className="single-lp-courselist-head lpcl-tr">
                <div>Course Code</div>
                <div>Description</div>
                <div>Status</div>
                <div>Active Person</div>
                <div>Course Editor</div>
                <div>Course Reviewer</div>
                <div>Last Modified by</div>
                <div>Last Modified on</div>
                <div>Level</div>
                <div>Days</div>
              </div>
              <div className="single-lp-courselist-content">
                {courses?.map((elem) => {
                  return (
                    <div className="single-lp-courselist-row lpcl-tr">
                      <div
                        className="course-code-link pointer"
                        onClick={() => {
                          if (
                            elem.statusForEditor == "yes" ||
                            elem.statusForEditor == userMail
                          ) {
                            socket.emit(
                              "joinRoom",
                              params.id,
                              elem.courseId,
                              userMail,
                              courses
                            );
                            if (elem.window !== 0) {
                              if (elem.window == 1) {
                                props.adminswitch
                                  ? navigate(
                                      `/admin/addcoursemanually/${params.id}/${elem.courseId}`
                                    )
                                  : navigate(
                                      `/addcoursemanually/${params.id}/${elem.courseId}`
                                    );
                              } else {
                                props.adminswitch
                                  ? navigate(
                                      `/admin/coursemanagement/preview/${params.id}/${elem.courseId}`
                                    )
                                  : navigate(
                                      `/coursemanagement/preview/${params.id}/${elem.courseId}`
                                    );
                              }
                            }
                          } else {
                            toast.error(
                              `${elem.statusForEditor} is currently working on it.`
                            );
                          }
                        }}
                      >
                        <p
                          style={{
                            width: "80%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          title={elem.courseId}
                        >
                          {elem.courseId}
                        </p>
                      </div>
                      <div>
                        <ViewCourseDescription description={elem.description} />
                      </div>
                      <div className="process-status-up">{elem.status}</div>
                      <div
                        style={
                          elem.statusForEditor == "yes"
                            ? { color: "green" }
                            : { color: "red" }
                        }
                      >
                        {elem.statusForEditor == "yes" ? (
                          "-"
                        ) : (
                          <div
                            className="employee-details-col-img border"
                            style={{ width: "30px" }}
                          >
                            <img
                              src={`https://storagefortimetrigger.blob.core.windows.net/profile/${
                                elem.statusForEditor.split("@")[0]
                              }.jpg`}
                              alt="Employee"
                              title={`${elem.statusForEditor} is currently working on it`}
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <p
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "80%",
                          }}
                        >
                          {elem.courseEditor == null ? "_" : elem.courseEditor}
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            width: "80%",
                          }}
                        >
                          {elem.courseReviewer == null
                            ? "_"
                            : elem.courseReviewer}
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            width: "80%",
                          }}
                        >
                          {elem.lastModifiedBy}
                        </p>
                      </div>
                      <div>
                        {moment(elem.lastModifiedOn).format("D/MM/YYYY")}
                      </div>
                      <div>{elem.level}</div>
                      <div>{elem.days}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div
              className="w-100 d-flex flex-column gap-2 justify-content-center align-items-center"
              style={{ height: "calc(100% - 25%)" }}
            >
              <img src={emptyImg} alt="emptyImg" />
              <p>
                {allcoursesmanagement?.buttons?.addCourse === 1
                  ? "Add new course"
                  : "No course added yet"}
              </p>
            </div>
          )
        ) : (
          <div className="page-loader-div">
            <Bars
              height="50"
              width="50"
              color="#4F52B2"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass="page-loader"
              visible={true}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default LpCourseList;
