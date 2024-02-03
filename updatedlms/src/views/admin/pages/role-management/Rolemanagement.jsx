import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import defaultRoles from "../../utils/roleManagementData/data";
import AddCustomRole from "../../components/rolemanagementModals/AddCustomRole";
import deleteicon from "../../assets/delete.svg";
import emptyIcon from "../../../../assets/emptyIcon.png";
import "./rolemanagement.css";

function Rolemanagement() {
  const {
    navigate,
    defaultcountapi,
    defaultcounts,
    customdashvalues,
    customsno,
    tabswitchforrolemanagement,
    dispatch,
    deletecustomrole,
  } = useContext(GlobalContext);
  const [countapi, setcountapi] = useState(defaultRoles);

  useEffect(() => {
    if (Object.keys(defaultcounts).length > 0) {
      const temp = countapi.map((ele) => {
        let rolematch = 0;
        switch (ele.role) {
          case "Admin":
            rolematch = defaultcounts.adminCount;
            break;
          case "Department Manager":
            rolematch = defaultcounts.departmentHeadCount;
            break;
          case "HR Buddy":
            rolematch = defaultcounts.hrCount;
            break;
          case "Conversion Manager":
            rolematch = defaultcounts.conversionManagerCount;
            break;
          case "LP Admin":
            rolematch = defaultcounts.lpAdminCount;
            break;
          case "LP Manager":
            rolematch = defaultcounts.lpManagerCount;
            break;
          case "Course Reviewer":
            rolematch = defaultcounts.courseReviewerCount;
            break;
          case "Course Editor":
            rolematch = defaultcounts.courseEditorCount;
            break;
          case "Course Viewer":
            rolematch = defaultcounts.courseViewerCount;
          case "Interview Schedular":
            rolematch = defaultcounts.interviewSchedularCount;
            break;
          case "Team Lead":
            rolematch = defaultcounts.teamLeadCount;
            break;
          default:
            rolematch = 0;
        }
        return { ...ele, count: rolematch };
      });
      setcountapi(temp);
    }
  }, [defaultcounts]);
  useEffect(() => {
    document.title = `Role Management | ${process.env.REACT_APP_APP_NAME}`;
    defaultcountapi();
    customdashvalues();
  }, []);

  return (
    <div className="role-management-page">
      <div className="roleManagementHead-div">
        <p className="roleManagementHead">Role Management</p>
        {(tabswitchforrolemanagement !== "custom" || customsno.length > 0) && (
          <AddCustomRole />
        )}
      </div>
      <div className="rolemanagement-tabs-container">
        <Tabs
          id="controlled-tab-example"
          activeKey={tabswitchforrolemanagement}
          onSelect={(k) =>
            dispatch({
              type: "EVENT_FOR_ROLE",
              payload: k,
            })
          }
        >
          <Tab
            eventKey="home"
            title={`Default Roles  (${Object.keys(defaultcounts).length})`}
          >
            <div className="roles-cards-conatiner">
              {countapi.map((val, index) => {
                return (
                  <div
                    className="role-card"
                    onClick={() =>
                      navigate(
                        `/admin/rolemanagement/${
                          val.route === "" ? "dev" : val.route
                        }`
                      )
                    }
                    key={index}
                  >
                    <div className="role-card-head">
                      <div className="role-card-title-div">
                        <div className="role-card-title">{val.role}</div>
                        <div className="role-card-subtitle">Default Role</div>
                      </div>
                      <div className="role-card-count-div">
                        <div className="roles-count">{val.count}</div>
                      </div>
                    </div>
                    <div className="role-card-content">
                      <div className="role-summary">{val.description}</div>
                      <div className="role-permissions">
                        {val.access.map((el) => {
                          return (
                            <div className="role-permission-chip">{el}</div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Tab>
          <Tab eventKey="custom" title={`Custom Roles  (${customsno?.length})`}>
            {customsno.length > 0 ? (
              <div className="roles-cards-conatiner">
                {customsno.length > 0
                  ? customsno.map((elem) => {
                      return (
                        <div
                          className="role-card"
                          onClick={(e) => {
                            if (e.target.tagName === "IMG") {
                              const data = {
                                customRoleId: elem.customRoleId,
                              };
                              deletecustomrole(data);
                            } else {
                              navigate(
                                `/admin/rolemanagement/${elem.title}/${elem.customRoleId}`
                              );
                            }
                          }}
                        >
                          <div className="role-card-head justify-content-between">
                            <div className="role-card-title-div">
                              <div className="d-flex role-card-title">
                                {elem.title}
                                <div className="role-card-count-div ms-2">
                                  <div className="roles-count">
                                    {elem.count}
                                  </div>
                                </div>
                              </div>
                              <div className="role-card-subtitle">
                                Custom Role
                              </div>
                            </div>
                            <img
                              src={deleteicon}
                              alt="deleteicon"
                              className="action-icon"
                            />
                          </div>
                          <div className="role-card-content">
                            {/* <div className="role-summary">
                    The Department Manager can oversee and manage the activities
                    and report of all the resources of their assigned department
                    or all department depending upon the access
                  </div> */}
                            <div className="role-permissions">
                              {elem.roles.map((ele) => {
                                return (
                                  <div className="role-permission-chip">
                                    {ele}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            ) : (
              <div className="empty-custom-role">
                <div style={{ width: "fit-content" }}>
                  <img src={emptyIcon} alt="emptyIcon" />
                  <AddCustomRole />
                </div>
              </div>
            )}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Rolemanagement;
