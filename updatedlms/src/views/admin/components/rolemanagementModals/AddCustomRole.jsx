import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import deleteicon from "../../assets/delete.svg";
import { GrFormClose } from "react-icons/gr";
import "./customRole.css";
import { GlobalContext } from "../../../../context/GlobalState";
import Select from "react-select";
import { toast } from "react-hot-toast";
import profileimg90 from "../../../../assets/images/profileimg90.png";
import ImageWithFallback from "./ImageWithFallback";

function AddCustomRole() {
  const {
    graphapiforempdetails,
    poc,
    lpnamerelevent,
    lpnamesapi,
    lpnamelist,
    departmentlistforhrselect,
    departmentlistdatahr,
    AdminDepartmentListData,
    adminDepartmentList,
    createcustomrole,
  } = useContext(GlobalContext);
  const [reportshow, setReportshow] = useState(false);
  const [learningPathEdit, setLearningPathEdit] = useState("");
  const [learningPathView, setLearningPathView] = useState("");
  const [learningPathReview, setLearningPathReview] = useState("");
  const [editorcourselist, setEditorcourseList] = useState([]);
  const [viewercourseList, setViewercourseList] = useState([]);
  const [reviewercourseList, setReviewercourseList] = useState([]);
  const [editordata, setEditordata] = useState([]);
  const [editorMultiDropdown, setEditorMultiDropdown] = useState([]);
  const [viewMultiDropdown, setViewMultiDropdown] = useState([]);
  const [reviewMultiDropdown, setReviewMultiDropdown] = useState([]);
  const [showSearchresult, setShowSearchresult] = useState(false);
  const [email, setEmail] = useState("");
  const [profileofselect, setProfileofselect] = useState("");
  const [name, setName] = useState("");
  const [rolename, setRolename] = useState("");
  const [editorcheck, setEditorcheck] = useState(false);
  const [namelists, setNamelists] = useState([]);
  const [reviewerdata, setReviewerdata] = useState([]);
  const [viewerdata, setViewerdata] = useState([]);
  const [viewercheck, setViewercheck] = useState(false);
  const [reviewcheck, setReviewcheck] = useState(false);
  const [conmandata, setConmandata] = useState("");
  const [conversionmanagercheck, setConversionmanagercheck] = useState(false);
  const [lpdroplist, setLpdroplist] = useState([]);
  const [lpmanagercheck, setLpmanagercheck] = useState(false);
  const [innerlpmanagerdata, setInnerlpmanagerdata] = useState([]);
  const [hrcheck, setHrcheck] = useState(false);
  const [hRmutilist, setHRmutilist] = useState([]);
  const [innerhrlistdata, setInnerhrlistdata] = useState([]);
  const [depmancheck, setDepmancheck] = useState(false);
  const [depmanmutilist, setDepmanmultilist] = useState([]);
  const [innerdepmanlist, setInnerdepmanlist] = useState([]);
  const [acheck, setAcheck] = useState(false);
  const [lPadmincheck, setLPadmincheck] = useState(false);
  const [teamleadcheck, setTeamleadcheck] = useState(false);
  const [interviewercheck, setInterviewercheck] = useState(false);

  useEffect(() => {
    lpnamesapi();
    departmentlistforhrselect();
    AdminDepartmentListData();
  }, []);

  useEffect(() => {
    if (lpnamerelevent) {
      let multiDropArr = lpnamerelevent.map((el) => {
        return { label: el, value: el };
      });
      setLpdroplist(multiDropArr);
    }
  }, [lpnamerelevent]);

  useEffect(() => {
    let multiDropArr = adminDepartmentList.map((el) => {
      return { label: el.Department, value: el.Department };
    });
    setDepmanmultilist(multiDropArr);
  }, [adminDepartmentList]);

  const handledepman = (data) => {
    if (depmancheck) {
      setInnerdepmanlist(data);
    } else {
      toast.error("Tick on Department Manager first.");
    }
  };

  useEffect(() => {
    if (learningPathEdit !== "") {
      let multiDropArr = lpnamelist[`${learningPathEdit}`].map((el) => {
        return { label: el, value: el };
      });
      setEditorcourseList([]);
      setEditorMultiDropdown(multiDropArr);
    }
  }, [learningPathEdit]);

  useEffect(() => {
    if (learningPathView !== "") {
      let multiDropArr = lpnamelist[`${learningPathView}`].map((el) => {
        return { label: el, value: el };
      });
      setViewercourseList([]);
      setViewMultiDropdown(multiDropArr);
    }
  }, [learningPathView]);
  useEffect(() => {
    if (learningPathReview !== "") {
      let multiDropArr = lpnamelist[`${learningPathReview}`].map((el) => {
        return { label: el, value: el };
      });
      setReviewercourseList([]);
      setReviewMultiDropdown(multiDropArr);
    }
  }, [learningPathReview]);

  const handleeditorcourses = (data) => {
    setEditorcourseList(data);
  };
  const handleviewercourses = (data) => {
    setViewercourseList(data);
  };
  const handlereviewercourses = (data) => {
    setReviewercourseList(data);
  };
  useEffect(() => {
    if (name !== "") {
      setShowSearchresult(true);
      graphapiforempdetails(name);
    } else {
      setTimeout(() => {
        setShowSearchresult(false);
      }, 150);
      setProfileofselect("");
    }
  }, [name]);

  const handlelpmanagerdata = (data) => {
    if (lpmanagercheck) {
      // const depdata = data.map((ele)=>{
      //   return(ele.value)
      // })
      setInnerlpmanagerdata(data);
    } else {
      toast.error("Tick on LP manager first.");
    }
  };

  useEffect(() => {
    let multiDropArr = departmentlistdatahr
      .filter((ele) => {
        return ele.Department !== "All Departments";
      })
      .map((el) => {
        return { label: el.Department, value: el.Department };
      });
    setHRmutilist(multiDropArr);
  }, [departmentlistdatahr]);

  const addingfn = (content, ping) => {
    if (ping == 1) {
      if (editorcheck == "") {
        toast.error(`Tick on ${content} first.`);
      } else {
        if (learningPathEdit !== "" && editorcourselist.length > 0) {
          setEditordata([
            ...editordata,
            {
              learningPath: learningPathEdit,
              courses: editorcourselist.map((elem) => {
                return elem.value;
              }),
            },
          ]);
          setLearningPathEdit("");
          setEditorMultiDropdown([]);
          setEditorcourseList([]);
        } else {
          toast.error("Field is empty in course editor");
        }
      }
    } else if (ping == 2) {
      if (viewercheck == "") {
        toast.error(`Tick on ${content} first.`);
      } else {
        if (learningPathView !== "" && viewercourseList.length > 0) {
          setViewerdata([
            ...viewerdata,
            {
              learningPath: learningPathView,
              courses: viewercourseList.map((elem) => {
                return elem.value;
              }),
            },
          ]);
          setLearningPathView("");
          setViewercourseList([]);
          setViewMultiDropdown([]);
        } else {
          toast.error("Field is empty in course viewer");
        }
      }
    } else {
      if (reviewcheck == "") {
        toast.error(`Tick on ${content} first.`);
      } else {
        if (learningPathReview !== "" && reviewercourseList.length > 0) {
          setReviewerdata([
            ...reviewerdata,
            {
              learningPath: learningPathReview,
              courses: reviewercourseList.map((elem) => {
                return elem.value;
              }),
            },
          ]);
          setLearningPathReview("");
          setReviewercourseList([]);
          setReviewMultiDropdown([]);
        } else {
          toast.error("Field is empty in course Reviewer");
        }
      }
    }
  };
  const handlecon = (val) => {
    if (conversionmanagercheck) {
      setConmandata(val);
    } else {
      toast.error("Tick on Conversion Manager first.");
    }
  };
  const handlehrlist = (val) => {
    if (hrcheck) {
      setInnerhrlistdata(val);
    } else {
      toast.error("Tick on HR buddy first.");
    }
  };
  const handlesave = () => {
    if (rolename == "") {
      toast.error("You didn't mentioned the role name");
    } else {
      if (
        !editorcheck &&
        !viewercheck &&
        !reviewcheck &&
        !conversionmanagercheck &&
        !lpmanagercheck &&
        !hrcheck &&
        !depmancheck &&
        !acheck &&
        !lPadmincheck &&
        !teamleadcheck && 
        !interviewercheck
      ) {
        toast.error("Pick atleast one role first");
      } else {
        if (editorcheck && editordata.length == 0) {
          toast.error("Untick if don't want course Editor");
        } else if (viewercheck && viewerdata.length == 0) {
          toast.error("Untick if don't want course Viewer");
        } else if (reviewcheck && reviewerdata.length == 0) {
          toast.error("Untick if don't want course reviewer");
        } else if (conversionmanagercheck && conmandata.length == 0) {
          toast.error("Untick if don't want Conversion Manager");
        } else if (lpmanagercheck && innerlpmanagerdata.length == 0) {
          toast.error("Untick if don't want LP Manager");
        } else if (hrcheck && innerhrlistdata.length == 0) {
          toast.error("Untick if don't want HR ");
        } else if (depmancheck && innerdepmanlist.length == 0) {
          toast.error("Untick if don't want department Manager");
        } else {
          let data = {
            roleAccess: [],
          };
          data.customRoleTitle = rolename;
          data.emailId =
            namelists.length > 0
              ? namelists.map((elem) => {
                  return elem.maile;
                })
              : [];
          if (hrcheck) {
            const temp = {
              roleName: "HR Buddy",
              department: innerhrlistdata.map((elem) => {
                return elem.value;
              }),
            };
            data.roleAccess.push(temp);
            setHrcheck(false);
            setInnerhrlistdata([]);
          }
          if (depmancheck) {
            const temp = {
              roleName: "Department Manager",
              department: innerdepmanlist.map((elem) => {
                return elem.value;
              }),
            };
            data.roleAccess.push(temp);
            setDepmancheck(false);
            setInnerdepmanlist([]);
          }
          if (conversionmanagercheck) {
            const temp = {
              roleName: "Conversion Manager",
              conversionType: conmandata,
            };
            data.roleAccess.push(temp);
            setConversionmanagercheck(false);
            setConmandata([]);
          }
          if (lpmanagercheck) {
            const temp = {
              roleName: "LP Manager",
              learningPath: innerlpmanagerdata.map((elem) => {
                return elem.value;
              }),
            };
            data.roleAccess.push(temp);
            setLpmanagercheck(false);
            setInnerlpmanagerdata([]);
          }
          if (reviewcheck) {
            const temp = {
              roleName: "Course Reviewer",
              learningPath: reviewerdata.map((elem) => {
                return {
                  name: elem.learningPath,
                  courses: elem.courses,
                };
              }),
            };
            data.roleAccess.push(temp);
            setReviewcheck(false);
            setReviewMultiDropdown([]);
            setReviewercourseList([]);
            setReviewerdata([]);
            setLearningPathReview("");
          }
          if (viewercheck) {
            const temp = {
              roleName: "Course Viewer",
              learningPath: viewerdata.map((elem) => {
                return {
                  name: elem.learningPath,
                  courses: elem.courses,
                };
              }),
            };
            data.roleAccess.push(temp);
            setViewercheck(false);
            setViewerdata([]);
            setViewMultiDropdown([]);
            setViewercourseList([]);
            setLearningPathView("");
          }
          if (editorcheck) {
            const temp = {
              roleName: "Course Editor",
              learningPath: editordata.map((elem) => {
                return {
                  name: elem.learningPath,
                  courses: elem.courses,
                };
              }),
            };
            data.roleAccess.push(temp);
            setEditorcheck(false);
            setEditordata([]);
            setEditorMultiDropdown([]);
            setEditorcourseList([]);
            setLearningPathEdit("");
          }
          if (acheck) {
            const temp = {
              roleName: "Admin",
            };
            data.roleAccess.push(temp);
            setAcheck(false);
          }
          if (lPadmincheck) {
            const temp = {
              roleName: "LP Admin",
            };
            data.roleAccess.push(temp);
            setLPadmincheck(false);
          }
          if (teamleadcheck) {
            const temp = {
              roleName: "Team Lead",
            };
            data.roleAccess.push(temp);
            setTeamleadcheck(false);
          }
          if (interviewercheck) {
            const temp = {
              roleName: "Interviewer",
            };
            data.roleAccess.push(temp);
            setInterviewercheck(false);
          }
          createcustomrole(data);
          setRolename("");
          setNamelists([]);
        }
      }
    }
  };
  const handlecancel = () => {
    setHrcheck(false);
    setRolename("");
    setNamelists([]);
    setInnerhrlistdata([]);
    setDepmancheck(false);
    setInnerdepmanlist([]);
    setConversionmanagercheck(false);
    setConmandata([]);
    setLpmanagercheck(false);
    setInnerlpmanagerdata([]);
    setReviewcheck(false);
    setReviewMultiDropdown([]);
    setReviewercourseList([]);
    setReviewerdata([]);
    setViewercheck(false);
    setViewerdata([]);
    setViewMultiDropdown([]);
    setViewercourseList([]);
    setEditorcheck(false);
    setEditordata([]);
    setEditorMultiDropdown([]);
    setEditorcourseList([]);
    setAcheck(false);
    setLPadmincheck(false);
    setLearningPathEdit("");
    setLearningPathReview("");
    setLearningPathView("");
    setReportshow(!reportshow);
  };
  const nextper = (displayName, mail) => {
    setNamelists([
      ...namelists,
      {
        ename: displayName,
        maile: mail,
      },
    ]);
    setName("");
    // setEmail(elem.mail);
    // setProfileofselect(elem.photo);
    setTimeout(() => {
      setShowSearchresult(false);
    }, 500);
  };

  const handleImageError = (event) => {
    event.target.src = profileimg90; // Replace with your default image URL
  };

  return (
    <>
      <div className="custom-role" onClick={() => setReportshow(!reportshow)}>
        Create Custom Role +
      </div>
      <Modal
        show={reportshow}
        onHide={() => handlecancel()}
        size="lg"
        centered
        className="report-upload-modal customRole-modal"
      >
        <Modal.Header className="modal-head-block">
          <Modal.Title style={{ fontSize: "18px", fontWeight: "400" }}>
            Create Custom Role
          </Modal.Title>
          <CloseButton
            variant="white"
            style={{ fontSize: "14px" }}
            onClick={() => {
              handlecancel();
            }}
          />
        </Modal.Header>
        <div className=" ">
          <Modal.Body className="addmodalbody pb-4">
            <div className="hrbuddyListContainer bg-white p-0 m-0 ">
              <div className="customrole-content overflow-y-scroll px-4">
                <div className="customRole-border">
                  <div className="customRole-row" style={{ width: "40%" }}>
                    <p className="customRole-label">
                      Add custom Role name{" "}
                      <span style={{ color: "red" }}>*</span>
                    </p>
                    <input
                      type="text"
                      className="customRole-input"
                      placeholder="Enter Role Name Here"
                      value={rolename}
                      onChange={(e) => {
                        setRolename(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="customRole-border">
                  <div
                    className="customRole-row pt-2-5"
                    style={{ width: "40%" }}
                  >
                    <p className="customRole-label">User Details</p>
                    <div className="flex-input-row">
                      <label>
                        Name <span style={{ color: "red" }}>*</span>
                      </label>
                      <div
                        className="position-relative"
                        style={{ width: "80%" }}
                      >
                        <div className="selected-role ">
                          {profileofselect ? (
                            <img
                              src={profileofselect}
                              className="selected-role-img"
                              alt="profileofselect"
                            />
                          ) : null}
                          <input
                            type="text"
                            className="customRole-input w-100"
                            placeholder="Enter User Name Here"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        {showSearchresult ? (
                          <div
                            className={`userdata-searchlist overflow-y-scroll ${
                              name == "" ? "hidetransition" : ""
                            }`}
                            style={{ top: "28px" }}
                          >
                            {poc.length > 0
                              ? poc.map((elem) => {
                                  return (
                                    <div
                                      className="d-flex align-items-center gap-2 text-nowrap pointer userdata-searchlist-row"
                                      onClick={() => {
                                        namelists.length > 0
                                          ? namelists.find(
                                              (el) => el.maile == elem.mail
                                            )
                                            ? toast.error(
                                                "This person is already selected"
                                              )
                                            : nextper(
                                                elem.displayName,
                                                elem.mail
                                              )
                                          : nextper(
                                              elem.displayName,
                                              elem.mail
                                            );
                                      }}
                                    >
                                      <img
                                        src={elem.photo}
                                        alt="profileimg"
                                        className="userdata-searchlist-profilimg"
                                      />
                                      <div className="searchlist-profiledetails">
                                        <p className="searchlist-name">
                                          {elem.displayName}
                                        </p>
                                        <p className="searchlist-email">
                                          {elem.mail}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })
                              : null}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="d-flex align-items-start justify-content-end">
                      <div className="multi-name-chip-div">
                        {namelists.length > 0
                          ? namelists.map((elem, index) => {
                              return (
                                <div className="multi-name-chip" key={index}>
                                  <img
                                    src={`https://storageaccountforprofile.blob.core.windows.net/profile/${
                                      elem.maile.split("@")[0]
                                    }.jpg`}
                                    alt="profileimg"
                                    onError={handleImageError}
                                    className="userdata-searchlist-profilimg"
                                  />
                                  {/* <ImageWithFallback src={`https://storageaccountforprofile.blob.core.windows.net/profile/${
                                      elem.maile.split("@")[0]
                                    }.jpg`}
                                  fallbackSrc={profileimg90} classes="userdata-searchlist-profilimg"/> */}
                                  <div className="multi-name-chip-name-div">
                                    <p className="multi-name-chip-name">
                                      {elem.ename}
                                    </p>
                                    {/* <p className="searchlist-email">
                                      {elem.maile}
                                    </p> */}
                                  </div>
                                  <GrFormClose
                                    className="pointer"
                                    onClick={() =>
                                      setNamelists(
                                        namelists.filter(
                                          (ele) => ele.maile !== elem.maile
                                        )
                                      )
                                    }
                                  />
                                </div>
                              );
                            })
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="customRole-border">
                  <div
                    className="customRole-row pt-2-5"
                    style={{ width: "65%" }}
                  >
                    <div className="active-role">
                      <input
                        type="checkbox"
                        className="mb-1"
                        checked={editorcheck}
                        onChange={() => setEditorcheck(!editorcheck)}
                      />
                      <p className="customRole-label">Course Editor</p>
                    </div>
                    {editorcheck && (<div>
                    <div className="multi-input-row">
                      <div className="flex-input-row">
                        <label>
                          Select Learning Path
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          name="lp"
                          id="lp"
                          className="multirow-select"
                          value={learningPathEdit}
                          onChange={(e) => {
                            editordata.length > 0
                              ? editordata.find(
                                  (el) => el.learningPath === e.target.value
                                )
                                ? toast.error(
                                    "This learning path has already been added"
                                  )
                                : setLearningPathEdit(e.target.value)
                              : setLearningPathEdit(e.target.value);
                          }}
                        >
                          <option value="" selected hidden>
                            Select LP
                          </option>
                          {lpnamerelevent?.length !== 0
                            ? lpnamerelevent.map((elem) => {
                                return <option value={elem}>{elem}</option>;
                              })
                            : null}
                        </select>
                      </div>
                      <div
                        className="flex-input-row"
                        style={{ border: "none" }}
                      >
                        <label>
                          Select Course
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <Select
                          id="lp"
                          isMulti
                          name="Conversion Tyoe"
                          options={editorMultiDropdown}
                          className="basic-multi-select w-100 multirow-select customRoleForm-multiselect"
                          classNamePrefix="multiSelect"
                          placeholder="Select Course"
                          value={editorcourselist}
                          onChange={(e) => handleeditorcourses(e)}
                        />
                      </div>
                      <div
                        className="addmore-btn pointer"
                        onClick={() => addingfn("Course Editor", 1)}
                      >
                        Add
                      </div>
                    </div>
                    {editordata.length > 0
                      ? editordata.map((elem) => {
                          return (
                            <div className="added-data-row">
                              <div className="added-data-row-col-1">
                                <div className="selected-value">
                                  {elem.learningPath}
                                </div>
                              </div>
                              <div className="added-data-row-col-2">
                                <div className="selected-value selected-value-course">
                                  {elem.courses.map((ele, index) => {
                                    if (index < elem.courses.length - 1) {
                                      return `${ele}, `;
                                    } else {
                                      return ele;
                                    }
                                  })}
                                </div>
                              </div>
                              <div className="added-data-row-col-3">
                                <img
                                  src={deleteicon}
                                  alt="deleteicon"
                                  height={16}
                                  onClick={() => {
                                    setEditordata(
                                      editordata.filter(
                                        (el) =>
                                          el.learningPath !== elem.learningPath
                                      )
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })
                      : null}
                      </div>)}
                  </div>
                </div>
                <div className="customRole-border">
                  <div
                    className="customRole-row pt-2-5"
                    style={{ width: "65%" }}
                  >
                    <div className="active-role">
                      <input
                        type="checkbox"
                        className="mb-1"
                        checked={viewercheck}
                        onChange={() => setViewercheck(!viewercheck)}
                      />
                      <p className="customRole-label">Course Viewer</p>
                    </div>
                    {viewercheck && (<div>
                    <div className="multi-input-row">
                      <div className="flex-input-row">
                        <label>
                          Select Learning Path
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          name="lp"
                          id="lp"
                          className="multirow-select"
                          value={learningPathView}
                          onChange={(e) => {
                            viewerdata.length > 0
                              ? viewerdata.find(
                                  (el) => el.learningPath === e.target.value
                                )
                                ? toast.error(
                                    "This learning path has already been added"
                                  )
                                : setLearningPathView(e.target.value)
                              : setLearningPathView(e.target.value);
                          }}
                        >
                          <option value="" selected hidden>
                            Select LP
                          </option>
                          {lpnamerelevent?.length !== 0
                            ? lpnamerelevent.map((elem) => {
                                return <option value={elem}>{elem}</option>;
                              })
                            : null}
                        </select>
                      </div>
                      <div className="flex-input-row">
                        <label>
                          Select Course
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <Select
                          id="lp"
                          isMulti
                          name="Conversion Tyoe"
                          options={viewMultiDropdown}
                          className="basic-multi-select w-100  multirow-select customRoleForm-multiselect"
                          classNamePrefix="multiSelect"
                          placeholder="Select Course"
                          value={viewercourseList}
                          onChange={(e) => handleviewercourses(e)}
                        />
                      </div>
                      <div
                        className="addmore-btn pointer"
                        onClick={() => addingfn("Course Viewer", 2)}
                      >
                        Add
                      </div>
                    </div>
                    {viewerdata.length > 0
                      ? viewerdata.map((elem) => {
                          return (
                            <div className="added-data-row">
                              <div className="added-data-row-col-1">
                                <div className="selected-value">
                                  {elem.learningPath}
                                </div>
                              </div>
                              <div className="added-data-row-col-2">
                                <div className="selected-value selected-value-course">
                                  {elem.courses.map((ele, index) => {
                                    if (index < elem.courses.length - 1) {
                                      return `${ele}, `;
                                    } else {
                                      return ele;
                                    }
                                  })}
                                </div>
                              </div>
                              <div className="added-data-row-col-3">
                                <img
                                  src={deleteicon}
                                  alt="deleteicon"
                                  height={16}
                                  onClick={() => {
                                    setViewerdata(
                                      viewerdata.filter(
                                        (el) =>
                                          el.learningPath !== elem.learningPath
                                      )
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })
                      : null}
                      </div>)}
                  </div>
                </div>
                <div className="customRole-border">
                  <div
                    className="customRole-row pt-2-5"
                    style={{ width: "65%" }}
                  >
                    <div className="active-role">
                      <input
                        type="checkbox"
                        className="mb-1"
                        checked={reviewcheck}
                        onChange={() => setReviewcheck(!reviewcheck)}
                      />
                      <p className="customRole-label">Course Reviewer</p>
                    </div>
                    {reviewcheck && (<div>
                    <div className="multi-input-row">
                      <div className="flex-input-row">
                        <label>
                          Select Learning Path
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          name="lp"
                          id="lp"
                          className="multirow-select"
                          value={learningPathReview}
                          onChange={(e) => {
                            reviewerdata.length > 0
                              ? reviewerdata.find(
                                  (el) => el.learningPath === e.target.value
                                )
                                ? toast.error(
                                    "This learning path has already been added"
                                  )
                                : setLearningPathReview(e.target.value)
                              : setLearningPathReview(e.target.value);
                          }}
                        >
                          <option value="" selected hidden>
                            Select LP
                          </option>
                          {lpnamerelevent?.length !== 0
                            ? lpnamerelevent.map((elem) => {
                                return <option value={elem}>{elem}</option>;
                              })
                            : null}
                        </select>
                      </div>
                      <div className="flex-input-row">
                        <label>
                          Select Course
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <Select
                          id="lp"
                          isMulti
                          name="Conversion Tyoe"
                          options={reviewMultiDropdown}
                          className="basic-multi-select w-100  multirow-select customRoleForm-multiselect"
                          classNamePrefix="multiSelect"
                          placeholder="Select Course"
                          value={reviewercourseList}
                          onChange={(e) => handlereviewercourses(e)}
                        />
                      </div>
                      <div
                        className="addmore-btn pointer"
                        onClick={() => addingfn("Course Reviewer", 3)}
                      >
                        Add
                      </div>
                    </div>
                    {reviewerdata.length > 0
                      ? reviewerdata.map((elem) => {
                          return (
                            <div className="added-data-row">
                              <div className="added-data-row-col-1">
                                <div className="selected-value">
                                  {elem.learningPath}
                                </div>
                              </div>
                              <div className="added-data-row-col-2">
                                <div className="selected-value selected-value-course">
                                  {elem.courses.map((ele, index) => {
                                    if (index < elem.courses.length - 1) {
                                      return `${ele}, `;
                                    } else {
                                      return ele;
                                    }
                                  })}
                                </div>
                              </div>
                              <div className="added-data-row-col-3">
                                <img
                                  src={deleteicon}
                                  alt="deleteicon"
                                  height={16}
                                  onClick={() => {
                                    setReviewerdata(
                                      reviewerdata.filter(
                                        (el) =>
                                          el.learningPath !== elem.learningPath
                                      )
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })
                      : null}
                      </div>)}
                  </div>
                </div>
                <div className="customRole-border">
                  <div
                    className="customRole-row pt-2-5"
                    style={{ width: "50%" }}
                  >
                    <div className="active-role">
                      <input
                        type="checkbox"
                        className="mb-1"
                        checked={conversionmanagercheck}
                        onChange={() =>
                          setConversionmanagercheck(!conversionmanagercheck)
                        }
                      />
                      <p className="customRole-label">Conversion Manager</p>
                    </div>
                    {conversionmanagercheck && (<div className="flex-input-row">
                      <label className="singlerow-label">
                        Select Type <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        name="manager"
                        id="manager"
                        className="singlerow-select"
                        style={{ width: "100%" }}
                        value={conmandata}
                        onChange={(e) => handlecon(e.target.value)}
                      >
                        <option value="" selected hidden>
                          Select
                        </option>
                        <option value="Trainee">Trainee</option>
                        <option value="FTE">FTE</option>
                        <option value="Both">Both</option>
                      </select>
                    </div>)}
                  </div>
                </div>
                <div className="customRole-border">
                  <div
                    className="customRole-row pt-2-5"
                    style={{ width: "50%" }}
                  >
                    <div className="active-role">
                      <input
                        type="checkbox"
                        className="mb-1"
                        checked={lpmanagercheck}
                        onChange={() => setLpmanagercheck(!lpmanagercheck)}
                      />
                      <p className="customRole-label">LP Manager</p>
                    </div>
                    {lpmanagercheck && (<div className="flex-input-row">
                      <label className="singlerow-label">
                        Select Learning Path
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <Select
                        name="manager"
                        id="manager"
                        isMulti
                        options={lpdroplist}
                        className="basic-multi-select w-100  multirow-select customRoleForm-multiselect"
                        classNamePrefix="multiSelect"
                        placeholder="Select Learning Path"
                        value={innerlpmanagerdata}
                        onChange={(e) => handlelpmanagerdata(e)}
                      />
                    </div>)}
                  </div>
                </div>
                <div className="customRole-border">
                  <div
                    className="customRole-row pt-2-5"
                    style={{ width: "50%" }}
                  >
                    <div className="active-role">
                      <input
                        type="checkbox"
                        className="mb-1"
                        checked={hrcheck}
                        onChange={() => setHrcheck(!hrcheck)}
                      />
                      <p className="customRole-label">HR Buddy</p>
                    </div>
                    {hrcheck && (<div className="flex-input-row">
                      <label className="singlerow-label">
                        Select Department
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <Select
                        name="manager"
                        id="manager"
                        isMulti
                        options={hRmutilist}
                        className="basic-multi-select w-100  multirow-select customRoleForm-multiselect"
                        classNamePrefix="multiSelect"
                        placeholder="Select Department"
                        value={innerhrlistdata}
                        onChange={(e) => handlehrlist(e)}
                      />
                    </div>)}
                  </div>
                </div>
                <div className="customRole-border">
                  <div
                    className="customRole-row pt-2-5"
                    style={{ width: "50%" }}
                  >
                    <div className="active-role">
                      <input
                        type="checkbox"
                        className="mb-1"
                        checked={depmancheck}
                        onChange={() => setDepmancheck(!depmancheck)}
                      />
                      <p className="customRole-label">Department Manager</p>
                    </div>
                    {depmancheck && (<div className="flex-input-row">
                      <label className="singlerow-label">
                        Select Department
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <Select
                        name="manager"
                        id="manager"
                        isMulti
                        options={depmanmutilist}
                        className="basic-multi-select w-100  multirow-select customRoleForm-multiselect"
                        classNamePrefix="multiSelect"
                        placeholder="Select Department"
                        value={innerdepmanlist}
                        onChange={(e) => handledepman(e)}
                      />
                    </div>)}
                  </div>
                </div>
                <div className="customRole-border">
                  <div
                    className="customRole-row pt-2-5"
                    style={{ width: "50%" }}
                  >
                    <div className="active-role">
                      <input
                        type="checkbox"
                        className="mb-1"
                        checked={acheck}
                        onChange={() => setAcheck(!acheck)}
                      />
                      <p className="customRole-label">Admin</p>
                    </div>
                  </div>
                </div>
                <div className="customRole-border">
                  <div
                    className="customRole-row pt-2-5"
                    style={{ width: "50%" }}
                  >
                    <div className="active-role">
                      <input
                        type="checkbox"
                        className="mb-1"
                        checked={lPadmincheck}
                        onChange={() => setLPadmincheck(!lPadmincheck)}
                      />
                      <p className="customRole-label">LP Admin</p>
                    </div>
                  </div>
                </div>
                <div className="customRole-border">
                  <div
                    className="customRole-row pt-2-5"
                    style={{ width: "50%" }}
                  >
                    <div className="active-role">
                      <input
                        type="checkbox"
                        className="mb-1"
                        checked={teamleadcheck}
                        onChange={() => setTeamleadcheck(!teamleadcheck)}
                      />
                      <p className="customRole-label">Team Lead</p>
                    </div>
                  </div>
                </div>
                <div className="customRole-border">
                  <div
                    className="customRole-row pt-2-5"
                    style={{ width: "50%" }}
                  >
                    <div className="active-role">
                      <input
                        type="checkbox"
                        className="mb-1"
                        checked={interviewercheck}
                        onChange={() => setInterviewercheck(!interviewercheck)}
                      />
                      <p className="customRole-label">Interviewer</p>
                    </div>
                  </div>
                </div>
                <div className="save-cancel-row ">
                  <div
                    className="modal-inner-sec-btn pointer"
                    onClick={() => handlecancel()}
                  >
                    Cancel
                  </div>
                  <div
                    className="modal-inner-primary-btn pointer"
                    onClick={() => handlesave()}
                  >
                    Save
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default AddCustomRole;
