import React, { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { GlobalContext } from "../../context/GlobalState";
import { GrFormClose } from "react-icons/gr";
import { BsCalendar3 } from "react-icons/bs";
import { toast } from "react-hot-toast";
import tentativeImg from "../../assets/tentative.png";
import profileimg90 from "../../assets/images/profileimg90.png";
import "./scheduleInterview.css";
import moment from "moment";

function ScheduleInterview({ currentPage }) {
  const [reportshow, setReportshow] = useState(false);
  const {
    graphapiforempdetails,
    poc,
    getavailableschedule,
    defaultavailabletime,
    scheduleinterview,
    schedulingassistant,
    assistantdata,
    dispatch,
    userMail,
  } = useContext(GlobalContext);
  const [profileofselect, setProfileofselect] = useState("");
  const [interviewee, setInterviewee] = useState("");
  const [interviewer, setInterviewer] = useState("");
  const [optionalAdd, setOptionalAdd] = useState("");
  const [showSearchresult, setShowSearchresult] = useState(false);
  const [showSearchresult2, setShowSearchresult2] = useState(false);
  const [showSearchresult3, setShowSearchresult3] = useState(false);
  const [intervieweelists, setIntervieweelists] = useState([]);
  const [interviewerlists, setInterviewerlists] = useState([]);
  const [optionalists, setOptionalists] = useState([]);
  const [addRequired, setAddRequired] = useState(false);
  const [addOptional, setAddOptional] = useState(false);
  const [durationpicker, setDurationpicker] = useState("");
  const [selectType, setSelectType] = useState("");
  const [enterTitle, setEnterTitle] = useState("");
  const [starttimepick, setStarttimepick] = useState("");
  const [endtimepick, setEndtimepick] = useState("");
  const [interviewdesc, setInterviewdesc] = useState("");
  const [dateofInterview, setDateofInterview] = useState("");
  const [assignedveiwer, setAssignedveiwer] = useState([]);
  const [assignedOptional, setAssignedOptional] = useState([]);
  const [assignedviewee, setAssignedviewee] = useState([]);

  const onsave = () => {
    if (
      selectType.length > 0 &&
      enterTitle.length > 0 &&
      intervieweelists.length > 0 &&
      interviewerlists.length > 0 &&
      durationpicker.length > 0 &&
      dateofInterview.length > 0 &&
      starttimepick.length > 0 &&
      endtimepick.length > 0
    ) {
      if (defaultavailabletime?.status == true) {
        let data = {
          interviewType: selectType,
          interviewTitle: enterTitle,
          interviewee: intervieweelists.map((elem) => {
            return elem.maile;
          }),
          interviewer: interviewerlists.map((elem) => {
            return elem.maile;
          }),
          optional:
            optionalists.length > 0
              ? optionalists.map((elem) => {
                  return elem.maile;
                })
              : [],
          duration: durationpicker,
          date: moment(dateofInterview).format("DD/MM/YYYY"),
          startTime: starttimepick,
          endTime: endtimepick,
          description: interviewdesc,
        };
        scheduleinterview(data, currentPage);

        setSelectType("");
        setEnterTitle("");
        setIntervieweelists([]);
        setInterviewerlists([]);
        setOptionalists([]);
        setDurationpicker("");
        setDateofInterview("");
        setStarttimepick("");
        setInterviewdesc("");
        setEndtimepick("");
        dispatch({
          type: "AVAILABLE_TIME",
          payload: {},
        });
        setReportshow(false); 
      } else {
        toast.error("Please select the Available Time slot");
      }
    } else {
      toast.error("Please fill the mandatory fields");
    }
  };
  useEffect(() => {
    if (interviewerlists.length == 0) {
      setAddRequired(false);
    }
  }, [interviewerlists]);
  useEffect(() => {
    if (optionalists.length == 0) {
      setAddOptional(false);
    }
  }, [optionalists]);

  useEffect(() => {
    if (durationpicker.length > 0 && starttimepick.length > 0) {
      const startHour = parseInt(starttimepick.split(":")[0]);
      const startMinute = parseInt(starttimepick.split(":")[1].split(" ")[0]);
      const startPeriod = starttimepick.split(" ")[1];
      const durationMinutes = parseInt(durationpicker);

      const totalStartMinutes = startHour * 60 + startMinute;
      const totalEndMinutes = totalStartMinutes + durationMinutes;

      let endHour = Math.floor(totalEndMinutes / 60) % 12;
      let endMinute = totalEndMinutes % 60;
      let endPeriod;

      if (startHour === 12 && startPeriod === "PM") {
        // Handle case when start time is 12:00 PM
        endPeriod = "PM";
      } else {
        endPeriod =
          Math.floor(totalEndMinutes / 720) % 2 === 0
            ? startPeriod
            : startPeriod === "AM"
            ? "PM"
            : "AM";
      }

      const formattedEndHour = endHour === 0 ? 12 : endHour;
      const formattedEndTime = `${formattedEndHour.toString()}:${endMinute
        .toString()
        .padStart(2, "0")} ${endPeriod}`;
      setEndtimepick(formattedEndTime);
    } else {
      setEndtimepick("");
    }
  }, [durationpicker, starttimepick]);

  const nextper = (displayName, mail) => {
    setIntervieweelists([
      ...intervieweelists,
      {
        ename: displayName,
        maile: mail,
      },
    ]);
    setInterviewee("");
    // setEmail(elem.mail);
    // setProfileofselect(elem.photo);
    setTimeout(() => {
      setShowSearchresult(false);
    }, 500);
  };
  const nextper2 = (displayName, mail) => {
    setInterviewerlists([
      ...interviewerlists,
      {
        ename: displayName,
        maile: mail,
      },
    ]);
    setInterviewer("");
    // setEmail(elem.mail);
    // setProfileofselect(elem.photo);
    setTimeout(() => {
      setShowSearchresult2(false);
    }, 500);
  };
  const nextper3 = (displayName, mail) => {
    setOptionalists([
      ...optionalists,
      {
        ename: displayName,
        maile: mail,
      },
    ]);
    setOptionalAdd("");
    // setEmail(elem.mail);
    // setProfileofselect(elem.photo);
    setTimeout(() => {
      setShowSearchresult3(false);
    }, 500);
  };
  useEffect(() => {
    if (interviewee !== "") {
      setShowSearchresult(true);
      graphapiforempdetails(interviewee);
    } else {
      setTimeout(() => {
        setShowSearchresult(false);
      }, 150);
      setProfileofselect("");
    }
  }, [interviewee]);
  useEffect(() => {
    if (interviewer !== "") {
      setShowSearchresult2(true);
      graphapiforempdetails(interviewer);
    } else {
      setTimeout(() => {
        setShowSearchresult2(false);
      }, 150);
      setProfileofselect("");
    }
  }, [interviewer]);

  useEffect(() => {
    if (optionalAdd !== "") {
      setShowSearchresult3(true);
      graphapiforempdetails(optionalAdd);
    } else {
      setTimeout(() => {
        setShowSearchresult3(false);
      }, 150);
      setProfileofselect("");
    }
  }, [optionalAdd]);

  const handleImageError = (event) => {
    event.target.src = profileimg90; // Replace with your default image URL
  };

  const emptySlots = Array.from({ length: 26 }, (_, index) => (
    <div className="timeslot emptySlot" key={index}>
      &nbsp;
    </div>
  ));

  useEffect(() => {
    if (assistantdata.length > 0) {
      if (intervieweelists.length > 0) {
        setAssignedviewee(
          intervieweelists.map((item, index) => {
            return assistantdata[index];
          })
        );
      } else {
        setAssignedviewee([]);
      }
      if (interviewerlists.length > 0) {
        setAssignedveiwer(
          interviewerlists.map((item, index) => {
            return assistantdata[index + intervieweelists.length];
          })
        );
      } else {
        setAssignedveiwer([]);
      }
      if (optionalists.length > 0) {
        setAssignedOptional(
          optionalists.map((item, index) => {
            return assistantdata[
              intervieweelists.length + interviewerlists.length + index
            ];
          })
        );
      } else {
        setAddOptional([]);
      }
    } else {
      setAssignedveiwer([]);
      setAssignedOptional([]);
      setAssignedviewee([]);
    }
  }, [assistantdata]);
  const handleImage = (elemdata) => {
    if (
      intervieweelists.length > 0 ||
      interviewerlists.length > 0 ||
      optionalists.length > 0
    ) {
      if (intervieweelists.length > 0) {
        if (intervieweelists.find((el) => el.maile == elemdata.mail)) {
          return true;
        } else if (interviewerlists.length > 0) {
          if (interviewerlists.find((el) => el.maile == elemdata.mail)) {
            return true;
          } else if (optionalists.length > 0) {
            if (optionalists.find((el) => el.maile == elemdata.mail)) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        } else if (optionalists.length > 0) {
          if (optionalists.find((el) => el.maile == elemdata.mail)) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else if (interviewerlists.length > 0) {
        if (interviewerlists.find((el) => el.maile == elemdata.mail)) {
          return true;
        } else if (optionalists.length > 0) {
          if (optionalists.find((el) => el.maile == elemdata.mail)) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else if (optionalists.length > 0) {
        if (optionalists.find((el) => el.maile == elemdata.mail)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  const timeArray = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
    "9:30 PM",
    "10:00 PM",
    "10:30 PM",
  ];
  const timeArrayduration = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
  ];
  useEffect(() => {
    if (
      interviewerlists.length > 0 &&
      durationpicker.length > 0 &&
      starttimepick.length > 0 &&
      endtimepick.length > 0
    ) {
      const availabletimehitdata = {
        interviewer: interviewerlists.map((ele) => {
          return ele.maile;
        }),
        duration: durationpicker,
        date: moment(dateofInterview).format("DD/MM/YYYY"),
        startTime: starttimepick,
        endTime: endtimepick,
      };
      getavailableschedule(availabletimehitdata);
    }
  }, [interviewerlists, durationpicker, starttimepick, endtimepick]);

  const clearall = () => {
    setSelectType("");
    setEnterTitle("");
    setIntervieweelists([]);
    setInterviewerlists([]);
    setOptionalists([]);
    setDurationpicker("30");
    setDateofInterview(new Date().toISOString().split("T")[0]);
    setStarttimepick("");
    setInterviewdesc("");
    setEndtimepick("");
    dispatch({
      type: "AVAILABLE_TIME",
      payload: {},
    });
    setReportshow(!reportshow);
  };
  useEffect(() => {
    if (
      interviewerlists.length > 0 ||
      optionalists.length > 0 ||
      intervieweelists.length > 0
    ) {
      let vari = [];
      if (intervieweelists.length > 0) {
        let tempinter = intervieweelists.map((el) => {
          return el.maile;
        });
        vari = tempinter;
      }
      if (interviewerlists.length > 0) {
        let tempinnerarr = interviewerlists.map((elem) => {
          return elem.maile;
        });
        vari = vari.concat(tempinnerarr);
      }
      if (optionalists.length > 0) {
        let tempar = optionalists.map((elem) => {
          return elem.maile;
        });
        vari = vari.concat(tempar);
      }
      const data = {
        attendees: vari,
        duration: "30",
        date: moment(dateofInterview).format("DD/MM/YYYY"),
      };
      schedulingassistant(data);
    }
  }, [interviewerlists, intervieweelists, optionalists, dateofInterview]);
  useEffect(() => {
    if (
      intervieweelists.length == 0 &&
      interviewerlists.length == 0 &&
      optionalists.length == 0
    ) {
      dispatch({
        type: "AVAILABLE_TIME",
        payload: {},
      });
    }
    if (intervieweelists.length == 0) {
      setAssignedviewee([]);
    }
    if (interviewerlists.length == 0) {
      setAssignedveiwer([]);
    }
    if (optionalists.length == 0) {
      setAssignedOptional([]);
    }
  }, [interviewerlists, intervieweelists, optionalists]);
  return (
    <>
      <Button
        className="modal-outer-primary-btn reportuploadbtn py-2 px-3 d-flex align-items-center "
        onClick={() => clearall()}
        style={{ fontSize: "12px" }}
      >
        + Schedule Interview
      </Button>

      <Modal
        show={reportshow}
        onHide={() => clearall()}
        size="lg"
        centered
        className="report-upload-modal customRole-modal scheduleInterview"
      >
        <Modal.Header className="modal-head-block">
          <Modal.Title style={{ fontSize: "18px", fontWeight: "400" }}>
            Schedule Interview
          </Modal.Title>
          <CloseButton
            variant="white"
            style={{ fontSize: "14px" }}
            onClick={() => {
              clearall();
            }}
          />
        </Modal.Header>
        <Modal.Body
          className="addmodalbody pt-0"
          style={{ backgroundColor: "#F5F5F5", paddingBottom: "1.25rem" }}
        >
          <Tabs
            id="controlled-tab-example"
            defaultActiveKey="Schedule-Interview"
          >
            <Tab eventKey="Schedule-Interview" title="Schedule Interview">
              <div
                className="overflow-y-scroll pe-2"
                style={{ maxHeight: "calc(100vh - 200px)" }}
              >
                <div className="customRole-row pt-1" style={{ width: "40%" }}>
                  <div className="flex-input-row">
                    <label style={{ color: "#242424", fontWeight: "400" }}>
                      Type <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      name="manager"
                      id="manager"
                      className="singlerow-select"
                      style={{ width: "80%" }}
                      value={selectType}
                      onChange={(e) => setSelectType(e.target.value)}
                    >
                      <option value="" selected hidden>
                        Select
                      </option>
                      <option value="Mock">Mock</option>
                      <option value="Trainee">Trainee</option>
                      <option value="FTE">FTE</option>
                    </select>
                  </div>
                </div>
                <div
                  className="customRole-row pt-1 mt-2"
                  style={{ width: "40%" }}
                >
                  <div className="flex-input-row">
                    <label style={{ color: "#242424", fontWeight: "400" }}>
                      Title<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      className="customRole-input"
                      style={{ width: "80%" }}
                      value={enterTitle}
                      onChange={(e) => setEnterTitle(e.target.value)}
                    />
                  </div>
                </div>
                <div
                  className="customRole-row pt-1 mt-2"
                  style={{ width: "40%" }}
                >
                  <div className="flex-input-row">
                    <label style={{ color: "#242424", fontWeight: "400" }}>
                      Interviewee <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="position-relative" style={{ width: "80%" }}>
                      <div>
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
                          placeholder="Enter Name"
                          value={interviewee}
                          onChange={(e) => setInterviewee(e.target.value)}
                        />
                      </div>
                      {showSearchresult ? (
                        <div
                          className={`userdata-searchlist overflow-y-scroll ${
                            interviewee == "" ? "hidetransition" : ""
                          }`}
                          style={{ top: "28px" }}
                        >
                          {poc.length > 0
                            ? poc.map((elem) => {
                                return (
                                  <div
                                    className="d-flex align-items-center gap-2 text-nowrap pointer userdata-searchlist-row"
                                    onClick={() => {
                                      intervieweelists.length == 0
                                        ? handleImage(elem)
                                          ? toast.error(
                                              "This person is already selected"
                                            )
                                          : elem.mail == userMail
                                          ? toast.error(
                                              "You can't assign yourself as interviewee"
                                            )
                                          : nextper(elem.displayName, elem.mail)
                                        : toast.error(
                                            "Only 1 person can be selected in Interviewee List"
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
                    <div
                      className="multi-name-chip-div"
                      style={{ paddingLeft: "6px" }}
                    >
                      {intervieweelists.length > 0
                        ? intervieweelists.map((elem) => {
                            return (
                              <div className="multi-name-chip">
                                <img
                                  src={`https://storageaccountforprofile.blob.core.windows.net/profile/${
                                    elem.maile.split("@")[0]
                                  }.jpg`}
                                  alt="profileimg"
                                  onError={handleImageError}
                                  className="userdata-searchlist-profilimg"
                                />
                                <div className="multi-name-chip-name-div">
                                  <p className="multi-name-chip-name">
                                    {elem.ename}
                                  </p>
                                </div>
                                <GrFormClose
                                  className="pointer"
                                  onClick={() => setIntervieweelists([])}
                                />
                              </div>
                            );
                          })
                        : null}
                    </div>
                  </div>
                </div>
                <div className="customRole-row pt-1" style={{ width: "40%" }}>
                  <div className="flex-input-row">
                    <label style={{ color: "#242424", fontWeight: "400" }}>
                      Interviewer <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="position-relative" style={{ width: "80%" }}>
                      <div>
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
                          placeholder="Enter Name"
                          value={interviewer}
                          onChange={(e) => setInterviewer(e.target.value)}
                        />
                      </div>
                      {showSearchresult2 ? (
                        <div
                          className={`userdata-searchlist overflow-y-scroll ${
                            interviewer == "" ? "hidetransition" : ""
                          }`}
                          style={{ top: "28px" }}
                        >
                          {poc.length > 0
                            ? poc.map((elem) => {
                                return (
                                  <div
                                    className="d-flex align-items-center gap-2 text-nowrap pointer userdata-searchlist-row"
                                    onClick={() => {
                                      handleImage(elem)
                                        ? toast.error(
                                            "This person is already selected"
                                          )
                                        : nextper2(elem.displayName, elem.mail);
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
                    <div
                      className="multi-name-chip-div"
                      style={{ paddingLeft: "6px" }}
                    >
                      {interviewerlists.length > 0
                        ? interviewerlists.map((elem) => {
                            return (
                              <div className="multi-name-chip">
                                <img
                                  src={`https://storageaccountforprofile.blob.core.windows.net/profile/${
                                    elem.maile.split("@")[0]
                                  }.jpg`}
                                  alt="profileimg"
                                  onError={handleImageError}
                                  className="userdata-searchlist-profilimg"
                                />
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
                                    setInterviewerlists(
                                      interviewerlists.filter(
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
                <div className="customRole-row pt-1" style={{ width: "40%" }}>
                  <div className="flex-input-row">
                    <label style={{ color: "#242424", fontWeight: "400" }}>
                      Optional
                    </label>
                    <div className="position-relative" style={{ width: "80%" }}>
                      <div>
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
                          placeholder="Enter Name"
                          value={optionalAdd}
                          onChange={(e) => setOptionalAdd(e.target.value)}
                        />
                      </div>
                      {showSearchresult3 ? (
                        <div
                          className={`userdata-searchlist overflow-y-scroll ${
                            optionalAdd == "" ? "hidetransition" : ""
                          }`}
                          style={{ top: "28px" }}
                        >
                          {poc.length > 0
                            ? poc.map((elem) => {
                                return (
                                  <div
                                    className="d-flex align-items-center gap-2 text-nowrap pointer userdata-searchlist-row"
                                    onClick={() => {
                                      handleImage(elem)
                                        ? toast.error(
                                            "This person is already selected"
                                          )
                                        : nextper3(elem.displayName, elem.mail);
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
                    <div
                      className="multi-name-chip-div"
                      style={{ paddingLeft: "6px" }}
                    >
                      {optionalists.length > 0
                        ? optionalists.map((elem) => {
                            return (
                              <div className="multi-name-chip">
                                <img
                                  src={`https://storageaccountforprofile.blob.core.windows.net/profile/${
                                    elem.maile.split("@")[0]
                                  }.jpg`}
                                  alt="profileimg"
                                  onError={handleImageError}
                                  className="userdata-searchlist-profilimg"
                                />
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
                                    setOptionalists(
                                      optionalists.filter(
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
                <div className="customRole-row pt-1" style={{ width: "40%" }}>
                  <div className="flex-input-row">
                    <label style={{ color: "#242424", fontWeight: "400" }}>
                      Duration <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      name="manager"
                      id="manager"
                      className="singlerow-select"
                      style={{ width: "80%" }}
                      value={durationpicker}
                      onChange={(e) => setDurationpicker(e.target.value)}
                    >
                      {/* <option value="30" selected hidden>
                        Select Duration
                      </option> */}
                      <option value="30" selected>
                        30 Minutes
                      </option>
                      <option value="60">60 Minutes</option>
                    </select>
                  </div>
                </div>
                <div
                  className="customRole-row pt-1 mt-2"
                  style={{ width: "40%" }}
                >
                  <div className="flex-input-row">
                    <label style={{ color: "#242424", fontWeight: "400" }}>
                      Date <span style={{ color: "red" }}>*</span>
                    </label>
                    <div style={{ width: "80%" }} className="position-relative">
                      <input
                        type="date"
                        placeholder="Select a Date"
                        className="inputFieldTextarea pointer interviewdate-input"
                        style={{ width: "100%" }}
                        value={dateofInterview}
                        onChange={(e) => setDateofInterview(e.target.value)}
                        min={`${new Date().toISOString().split("T")[0]}`}
                      />
                      <BsCalendar3 className="calendar-icon" />
                    </div>
                  </div>
                </div>
                <div
                  className="customRole-row pt-1 mt-2"
                  style={{ width: "65%" }}
                >
                  <div className="multi-input-row">
                    <div className="flex-input-row">
                      <label style={{ color: "#242424", fontWeight: "400" }}>
                        Start Time
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        name="lp"
                        id="lp"
                        className="multirow-select"
                        style={{ width: "80%" }}
                        value={starttimepick}
                        onChange={(e) => {
                          durationpicker.length > 0
                            ? setStarttimepick(e.target.value)
                            : toast.error("Select duration first");
                        }}
                      >
                        <option value="" selected hidden>
                          Pick time
                        </option>
                        {timeArray.map((elem) => {
                          return <option value={elem}>{elem}</option>;
                        })}
                      </select>
                    </div>
                    <div className="flex-input-row" style={{ border: "none" }}>
                      <label
                        style={{
                          color: "#242424",
                          fontWeight: "400",
                          width: "25%",
                        }}
                        className="ps-2 ms-4"
                      >
                        End Time
                      </label>
                      {/* <select
                      name="lp"
                      id="lp"
                       className="multirow-select"
                       value={endtimepick}
                       onChange={(e)=>setEndtimepick(e.target.value)}
                       >
                      <option value="" selected hidden>
                          Pick time
                        </option>
                        {timeArray.map((elem) => {
                                return <option value={elem}>{elem}</option>;
                              })}
                      </select> */}
                      <input
                        value={endtimepick}
                        readOnly
                        disabled
                        style={{
                          backgroundColor: "#ECECEC",
                          border: "1px solid #d6d6d6",
                          padding: "3px 8px 1px",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="customRole-row" style={{ width: "40%" }}>
                  <div className="flex-input-row">
                    <label
                      style={{
                        color: "#242424",
                        fontWeight: "400",
                        fontSize: "10px",
                      }}
                    ></label>
                    <div
                      style={
                        Object.keys(defaultavailabletime).length > 0
                          ? defaultavailabletime.status == true
                            ? {
                                width: "80%",
                                color: "green",
                                fontSize: "10px",
                                fontWeight: "400",
                              }
                            : {
                                width: "80%",
                                color: "#C4314B",
                                fontSize: "10px",
                                fontWeight: "400",
                              }
                          : {
                              width: "80%",
                              color: "gray",
                              fontSize: "10px",
                              fontWeight: "400",
                            }
                      }
                      className="position-relative"
                    >
                      {Object.keys(defaultavailabletime).length > 0
                        ? defaultavailabletime.message
                        : "Please select date, time and duration"}
                    </div>
                  </div>
                </div>
                {Object.keys(defaultavailabletime).length > 0 ? (
                  <div className="customRole-row pt-1" style={{ width: "40%" }}>
                    <div className="flex-input-row">
                      <div
                        style={{
                          display: "flex",
                          color: "#242424",
                          fontWeight: "400",
                          fontSize: "10px",
                          width: "100%",
                        }}
                      >
                        <p
                          style={{
                            width: "8%",
                          }}
                        >
                          Suggested: &nbsp;
                        </p>
                        <div
                          style={{
                            color: "#5B5FC7",
                            width: "92%",
                            display: "flex",
                            flexWrap: "wrap",
                          }}
                        >
                          {defaultavailabletime.timeSolts
                            .map((ele) => `${ele.startTime}-${ele.endTime} `)
                            .toString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                <div
                  className="customRole-row pt-1 mt-2"
                  style={{ width: "40%" }}
                >
                  <div className="flex-input-row">
                    <label style={{ color: "#242424", fontWeight: "400" }}>
                      Interview <br /> Description
                      <span style={{ color: "#9A9A9A", fontSize: "10px" }}>
                        (Optional)
                      </span>
                    </label>
                    <textarea
                      rows={2}
                      className="customRole-input"
                      style={{ width: "80%" }}
                      value={interviewdesc}
                      onChange={(e) => setInterviewdesc(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="Scheduling-Assistant" title="Scheduling Assistant">
              <div
                className="schedule-calender-block overflow-y-scroll pe-1"
                style={{ maxHeight: "calc(100vh - 200px)" }}
              >
                <div className="schedule-calender-block-content">
                  <div className="schedule-calender-block-left ">
                    <div className="schedule-calender-block-left-row row-height"></div>
                    <div className="schedule-calender-block-left-row row-height"></div>
                    <div className="schedule-calender-block-left-row row-height bg-white">
                      <p>All Attendees</p>
                    </div>
                    <div className="schedule-calender-block-left-row row-height bg-white row-bor-bot">
                      <p className="bold-heading">Required Attendees</p>
                    </div>
                    <div className="schedule-user-div">
                      {intervieweelists.length > 0
                        ? intervieweelists.map((elem) => {
                            return (
                              <div
                                className="schedule-calender-block-left-row required-user-list row-height bg-white"
                                style={{
                                  borderBottom: "1px solid #dedede",
                                }}
                              >
                                <div className="multi-name-chip schedule-name-chip schedule-inner-margin">
                                  <img
                                    src={`https://storageaccountforprofile.blob.core.windows.net/profile/${
                                      elem.maile.split("@")[0]
                                    }.jpg`}
                                    alt="profileimg"
                                    onError={handleImageError}
                                    className="userdata-searchlist-profilimg"
                                    style={{ height: "2rem" }}
                                  />
                                  <div className="multi-name-chip-name-div">
                                    <p
                                      className="multi-name-chip-name"
                                      style={{ fontWeight: "400" }}
                                    >
                                      {elem.ename}
                                    </p>
                                  </div>
                                  <GrFormClose
                                    className="pointer"
                                    onClick={() => setIntervieweelists([])}
                                  />
                                </div>
                              </div>
                            );
                          })
                        : null}
                      {interviewerlists.length > 0
                        ? interviewerlists.map((elem) => {
                            return (
                              <div
                                className="schedule-calender-block-left-row required-user-list row-height bg-white"
                                style={{
                                  borderBottom: "1px solid #dedede",
                                }}
                              >
                                <div className="multi-name-chip schedule-name-chip schedule-inner-margin">
                                  <img
                                    src={`https://storageaccountforprofile.blob.core.windows.net/profile/${
                                      elem.maile.split("@")[0]
                                    }.jpg`}
                                    alt="profileimg"
                                    onError={handleImageError}
                                    className="userdata-searchlist-profilimg"
                                    style={{ height: "2rem" }}
                                  />
                                  <div className="multi-name-chip-name-div">
                                    <p
                                      className="multi-name-chip-name"
                                      style={{ fontWeight: "400" }}
                                    >
                                      {elem.ename}
                                    </p>
                                  </div>
                                  <GrFormClose
                                    className="pointer"
                                    onClick={() =>
                                      setInterviewerlists(
                                        interviewerlists.filter(
                                          (ele) => ele.maile !== elem.maile
                                        )
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            );
                          })
                        : null}
                    </div>
                    {addRequired === true ? (
                      <div className="schedule-calender-block-left-row position-relative justify-content-end row-height bg-white row-bor-bot">
                        <div
                          style={{
                            border: "none",
                            borderLeft: "1px solid #d7d7d7",
                          }}
                        >
                          {profileofselect ? (
                            <img
                              src={profileofselect}
                              className="selected-role-img"
                              alt="profileofselect"
                            />
                          ) : null}
                          <input
                            type="text"
                            className="customRole-input w-100 border-0"
                            placeholder="Enter Name"
                            value={interviewer}
                            onChange={(e) => setInterviewer(e.target.value)}
                          />
                        </div>
                        {showSearchresult2 ? (
                          <div
                            className={`userdata-searchlist overflow-y-scroll ${
                              interviewer == "" ? "hidetransition" : ""
                            }`}
                            style={{
                              left: "10px",
                              maxHeight: "160px",
                              width: "300px",
                              top: "30px",
                            }}
                          >
                            {poc.length > 0
                              ? poc.map((elem) => {
                                  return (
                                    <div
                                      className="d-flex align-items-center gap-2 text-nowrap pointer userdata-searchlist-row"
                                      onClick={() => {
                                        handleImage(elem)
                                          ? toast.error(
                                              "This person is already selected"
                                            )
                                          : nextper2(
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
                    ) : (
                      <div className="schedule-calender-block-left-row row-height bg-white row-bor-bot">
                        <p
                          className="add-user-interview"
                          onClick={() => setAddRequired(true)}
                        >
                          + Add Required Attendees
                        </p>
                      </div>
                    )}
                    <div className="schedule-calender-block-left-row row-height bg-white row-bor-bot">
                      <p className="bold-heading">Optional Attendees</p>
                    </div>
                    <div className="schedule-user-div">
                      {optionalists.length > 0
                        ? optionalists.map((elem) => {
                            return (
                              <div
                                className="schedule-calender-block-left-row required-user-list row-height bg-white"
                                style={{
                                  borderBottom: "1px solid #dedede",
                                }}
                              >
                                <div className="multi-name-chip schedule-name-chip schedule-inner-margin">
                                  <img
                                    src={`https://storageaccountforprofile.blob.core.windows.net/profile/${
                                      elem.maile.split("@")[0]
                                    }.jpg`}
                                    alt="profileimg"
                                    onError={handleImageError}
                                    className="userdata-searchlist-profilimg"
                                    style={{ height: "2rem" }}
                                  />
                                  <div className="multi-name-chip-name-div">
                                    <p
                                      className="multi-name-chip-name"
                                      style={{ fontWeight: "400" }}
                                    >
                                      {elem.ename}
                                    </p>
                                  </div>
                                  <GrFormClose
                                    className="pointer"
                                    onClick={() =>
                                      setOptionalists(
                                        optionalists.filter(
                                          (ele) => ele.maile !== elem.maile
                                        )
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            );
                          })
                        : null}
                    </div>
                    {addOptional === true ? (
                      <div className="schedule-calender-block-left-row position-relative justify-content-end row-height bg-white row-bor-bot">
                        <div>
                          {profileofselect ? (
                            <img
                              src={profileofselect}
                              className="selected-role-img"
                              alt="profileofselect"
                            />
                          ) : null}
                          <input
                            type="text"
                            className="customRole-input border-0"
                            placeholder="Enter Name"
                            style={{ width: "85%" }}
                            value={optionalAdd}
                            onChange={(e) => {
                              setOptionalAdd(e.target.value);
                            }}
                          />
                        </div>
                        {showSearchresult3 ? (
                          <div
                            className={`userdata-searchlist overflow-y-scroll ${
                              optionalAdd == "" ? "hidetransition" : ""
                            }`}
                            style={{
                              left: "10px",
                              maxHeight: "160px",
                              width: "300px",
                              top: "30px",
                            }}
                          >
                            {poc.length > 0
                              ? poc.map((elem) => {
                                  return (
                                    <div
                                      className="d-flex align-items-center gap-2 text-nowrap pointer userdata-searchlist-row"
                                      onClick={() => {
                                        handleImage(elem)
                                          ? toast.error(
                                              "This person is already selected"
                                            )
                                          : nextper3(
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
                    ) : (
                      <div className="schedule-calender-block-left-row row-height bg-white row-bor-bot">
                        <p
                          className="add-user-interview"
                          onClick={() => setAddOptional(true)}
                        >
                          + Add Optional Attendees
                        </p>
                      </div>
                    )}
                    <div
                      className="schedule-calender-block-left-row row-height bg-white row-bor-bot py-2"
                      style={{ minHeight: "2.65rem" }}
                    >
                      <p>&nbsp;</p>
                    </div>
                  </div>
                  <div className="schedule-calender-block-right">
                    <div className="schedule-calender-block-right-row row-height  bg-white">
                      <p className="day-date-text row-height">
                        {dateofInterview.length > 0 &&
                          moment(dateofInterview).format("dddd, MMMM D, YYYY")}
                      </p>
                    </div>
                    <div className="cal-overflow-x">
                      <div className="schedule-calender-block-right-row row-height timeslots-div bg-white">
                        {/* {durationpicker == "30"?timeArray.map((timeSlot, index) => (
                          <div className="timeslot" key={index}>
                            {timeSlot}
                          </div>
                        )):timeArrayduration.map((timeSlot, index) => (
                          <div className="timeslot" key={index}>
                            {timeSlot}
                          </div>
                        ))} */}
                        {timeArray.map((timeSlot, index) => (
                          <div className="timeslot" key={index}>
                            {timeSlot}
                          </div>
                        ))}
                      </div>
                      <div className="schedule-calender-block-right-row row-height timeslots-div">
                        {emptySlots}
                      </div>
                      <div className="schedule-calender-block-right-row row-height timeslots-div">
                        {emptySlots}
                      </div>
                      <div className="schedule-user-div">
                        {assignedviewee.length > 0 &&
                          assignedviewee.map((elem) => {
                            return (
                              <div className="schedule-calender-block-right-row row-height timeslots-div ">
                                {elem.scheduleItems.length > 0
                                  ? elem.scheduleItems.map((el, index) => {
                                      return (
                                        <div
                                          className={`timeslot  ${
                                            el.status === "busy"
                                              ? "busySlot"
                                              : el.status === "tentative"
                                              ? "tentativeSlot"
                                              : "userslot"
                                          }`}
                                          key={index}
                                        >
                                          {/* {el.status} */}
                                        </div>
                                      );
                                    })
                                  : null}
                              </div>
                            );
                          })}
                        {assignedveiwer.length > 0 &&
                          assignedveiwer.map((elem) => {
                            return (
                              <div className="schedule-calender-block-right-row row-height timeslots-div ">
                                {elem.scheduleItems.length > 0
                                  ? elem.scheduleItems.map((el, index) => {
                                      return (
                                        <div
                                          className={`timeslot  ${
                                            el.status === "busy"
                                              ? "busySlot"
                                              : el.status === "tentative"
                                              ? "tentativeSlot"
                                              : "userslot"
                                          }`}
                                          key={index}
                                        >
                                          {/* {el.status} */}
                                        </div>
                                      );
                                    })
                                  : null}
                              </div>
                            );
                          })}
                      </div>
                      <div className="schedule-calender-block-right-row row-height timeslots-div">
                        {emptySlots}
                      </div>
                      <div className="schedule-calender-block-right-row row-height timeslots-div">
                        {emptySlots}
                      </div>
                      <div className="schedule-user-div">
                        {assignedOptional.length > 0 &&
                          assignedOptional.map((elem) => {
                            return (
                              <div className="schedule-calender-block-right-row row-height timeslots-div ">
                                {elem.scheduleItems.length > 0
                                  ? elem.scheduleItems.map((el, index) => {
                                      return (
                                        <div
                                          className={`timeslot  ${
                                            el.status === "busy"
                                              ? "busySlot"
                                              : el.status === "tentative"
                                              ? "tentativeSlot"
                                              : "userslot"
                                          }`}
                                          key={index}
                                        >
                                          {/* {el.status} */}
                                        </div>
                                      );
                                    })
                                  : null}
                              </div>
                            );
                          })}
                      </div>
                      <div className="schedule-calender-block-right-row row-height timeslots-div">
                        {emptySlots}
                      </div>
                    </div>
                    <div className="schedule-calender-block-right-row row-height cal-labels-div bg-white">
                      <div className="cal-label">
                        <div className="label-visual label-busy"></div>
                        <p>Busy</p>
                      </div>
                      <div className="cal-label">
                        <div className="label-visual label-tentative">
                          <img src={tentativeImg} alt="tentative" />
                        </div>
                        <p>Tentative</p>
                      </div>
                      <div className="cal-label">
                        <div className="label-visual label-available"></div>
                        <p>Available</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
          <Button
            variant="light"
            className="modal-inner-primary-btn interviewSchedule-saveBtn"
            onClick={() => onsave()}
          >
            <div>Save</div>
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ScheduleInterview;
