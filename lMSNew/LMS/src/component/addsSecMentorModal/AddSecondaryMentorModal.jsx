import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import { FiSearch } from "react-icons/fi";
import { VscClose } from "react-icons/vsc";
import { HiOutlineChevronRight } from "react-icons/hi";
import profileimg from "../../assets/images/profileimg.png";
import { GlobalContext } from "../../context/GlobalState";
import deletesvg from "../../assets/svg/menteeList/delete-red.svg";
import managesvg from "../../assets/svg/menteeList/manage.svg";
import "./addsecmodal.css";

function AddSecondaryMentorModal() {
  const {
    graphapiforempdetails,
    poc,
    listofmenteesinsm,
    geteachassigner,
    listofallsecondary,
    getallassigner,
    secondmentor,
    listoffreementee,
    freementor,
  } = useContext(GlobalContext);
  const [reportshow, setReportshow] = useState(false);
  const [showSearchresult, setShowSearchresult] = useState(false);
  const [selectedperson, setSelectedperson] = useState({});
  const [selectedlist, setSelectedlist] = useState([]);
  const [searchformentee, setSearchformentee] = useState("");
  const [courseSearchKey, setCourseSearchKey] = useState("");
  const [peopleaction, setPeopleaction] = useState([]);
  const [choosed, setChoosed] = useState({
    mail: "",
  });
  useEffect(() => {
    if (courseSearchKey == "") {
      setShowSearchresult(false);
    } else {
      graphapiforempdetails(courseSearchKey);
      setShowSearchresult(true);
    }
  }, [courseSearchKey]);

  useEffect(() => {
    getallassigner();
    freementor();
  }, []);
  useEffect(() => {
    setPeopleaction(listofmenteesinsm);
  }, [listofmenteesinsm]);
  // document.addEventListener("click", (e) => {
  //   const insider = document.getElementById("inside");
  //   let actual = e.target;
  //   if (actual == insider) {
  //     if (courseSearchKey !== "") {
  //       setShowSearchresult(true);
  //     } else {
  //       setShowSearchresult(false);
  //     }
  //   } else {
  //     setShowSearchresult(false);
  //   }
  // });
  // const onEnter = () => {
  //   setShowSearchresult(false);
  // };
  const searchit = () => {
    if (searchformentee === "") {
      setSelectedlist(peopleaction.filter((elem) => elem.value !== 2));
    } else {
      if (peopleaction.length > 0) {
        const searchSImplerFiles = peopleaction.filter(
          (data) =>
            data.menteeName
              .toLowerCase()
              .indexOf(searchformentee.toLowerCase()) > -1 && data.value !== 2
        );
        setSelectedlist(searchSImplerFiles);
      }
    }
  };
  useEffect(() => {
    if (peopleaction?.length !== 0) {
      if (searchformentee == "") {
        searchit();
      }
    }
  }, [searchformentee, peopleaction]);
  const checkbefore = () => {
    const sending = peopleaction.map((elem, index) => {
      if (listofmenteesinsm[index].value == 1) {
        if (elem.value == 0) {
          return {
            ...elem,
            value: 2,
          };
        } else {
          return {
            ...elem,
            value: 0,
          };
        }
      } else {
        return {
          ...elem,
        };
      }
    });
    const data = {
      mentorMail: choosed.mail,
      assignedMentee: [...sending],
    };
    secondmentor(data);
    setSelectedperson({});
    setSelectedlist([]);
    setPeopleaction([]);
    setChoosed({});
  };
  return (
    <>
      <Button
        className="detailsuploadbtn modal-outer-primary-btn py-1 d-flex align-items-center"
        onClick={() => setReportshow(!reportshow)}
      >
        Secondary Mentor
        <img src={managesvg} alt="managesvg" className="managesvg ms-2 " />
      </Button>

      <Modal
        show={reportshow}
        onHide={() => setReportshow(!reportshow)}
        size="lg"
        centered
        className="details-upload-modal"
      >
        <Modal.Header className="sec-mentor-modal-header-block">
          <Modal.Title>
            <div className="sec-mentor-modal-header">
              <p>Secondary Mentor</p>
              <p className="sec-mentor-modal-header-undertitle">
                Assign Secondary mentor to Mentee
              </p>
            </div>
          </Modal.Title>
          <CloseButton
            variant="black"
            style={{ fontSize: "14px" }}
            onClick={() => {
              setSelectedperson({});
              setSelectedlist([]);
              setChoosed({});
              setReportshow(false);
            }}
          />
        </Modal.Header>
        <Modal.Body className="sec-mentor-modal-body">
          <div className="sec-mentor-modal-content">
            <div className="sec-mentor-section">
              <div
                style={{
                  width: "100%",
                  position: "relative",
                }}
              >
                <div className="sec-mentor-section-title">
                  Add Secondary Mentor
                </div>
                <div className="sec-mentor-section-search">
                  <input
                    type="search"
                    name="sec-mentor-search"
                    id="sec-mentor-search"
                    className="sec-mentor-search-input col-11"
                    placeholder="Search by Employee Name"
                    value={courseSearchKey}
                    onChange={(e) => {
                      setCourseSearchKey(e.target.value);
                    }}
                    // onKeyDown={(event) =>
                    //   event.key === "Enter" ? onEnter() : null
                    // }
                  />
                  {/* <FiSearch
                    className="pointer sec-mentor-search-icon"
                    onClick={() => searchit()}
                  /> */}
                </div>
                {showSearchresult ? (
                  <div className="userdata-searchlist overflow-y-scroll">
                    {poc.length > 0
                      ? poc.map((elem) => {
                          return (
                            <div
                              className="d-flex align-items-center gap-2 
                      text-nowrap pointer userdata-searchlist-row"
                              onClick={() => {
                                setChoosed({ mail: elem.mail });
                                setSelectedperson({ ...elem });
                                geteachassigner(elem.mail);
                                setCourseSearchKey("");
                              }}
                            >
                              <img
                                src={elem.photo || profileimg}
                                alt="profileimg"
                                className="userdata-searchlist-profilimg"
                              />
                              <div className="searchlist-profiledetails">
                                <p className="searchlist-name">
                                  {elem.displayName}
                                </p>
                                <p className="searchlist-email">{elem.mail}</p>
                              </div>
                            </div>
                          );
                        })
                      : null}
                  </div>
                ) : null}
                <div className="sec-mentor-details overflow-y-scroll">
                  {Object.keys(selectedperson).length > 0 ? (
                    <>
                      <div className="sec-mentor-details-row">
                        <div
                          className="sec-mentor-profile-details pointer"
                          onClick={() => {
                            setChoosed({
                              mail: selectedperson.mail,
                            });
                            geteachassigner(selectedperson.mail);
                          }}
                        >
                          <div className="sec-mentor-details-profile">
                            <img
                              src={selectedperson.photo || profileimg}
                              alt="profileimg"
                              className="sec-mentor-details-profile-img"
                            />
                          </div>
                          <div className="sec-mentor-details-info">
                            <div className="sec-mentor-name">
                              {selectedperson.displayName}
                            </div>
                            <div className="sec-mentor-email">
                              {selectedperson.mail}
                            </div>
                          </div>
                        </div>
                        <div className="sec-mentor-details-delete">
                          <VscClose
                            className="pointer"
                            onClick={() => setSelectedperson({})}
                          />
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
                <div className="sec-mentor-list-block">
                  <div className="sec-mentor-section-title">
                    Secondary mentor list
                  </div>
                  <div className="sec-mentor-list-div overflow-y-scroll">
                    {listofallsecondary.length > 0
                      ? listofallsecondary.map((elem) => {
                          return (
                            <div
                              className={`sec-mentor-list-row ${
                                choosed.mail == elem.email
                                  ? "sec-mentor-list-row-active"
                                  : ""
                              }`}
                              onClick={() => {
                                setChoosed({
                                  mail: elem.email,
                                });
                                geteachassigner(elem.email);
                              }}
                            >
                              <div className="sec-mentor-name-list">
                                {elem.name}
                              </div>
                              <div className="sec-mentor-list-count-div">
                                <div className="sec-mentor-list-count">
                                  {elem.count}
                                </div>
                                <div className="sec-mentor-list-arrow">
                                  <HiOutlineChevronRight />
                                </div>
                              </div>
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="sec-mentor-myresources">
              <div className="sec-mentor-section-title">My Resources</div>
              {selectedlist.length !== 0 ? (
                <div className="sec-mentor-section-search">
                  <input
                    type="search"
                    name="sec-mentor-search"
                    id="sec-mentor-search"
                    className="sec-mentor-search-input col-11"
                    placeholder="Search by Employee Name"
                    onChange={(e) => setSearchformentee(e.target.value)}
                    onKeyDown={(event) =>
                      event.key === "Enter" ? searchit() : null
                    }
                  />
                  <FiSearch
                    className="pointer sec-mentor-search-icon"
                    onClick={() => searchit()}
                  />
                </div>
              ) : null}
              <div className="resources-list-div">
                {selectedlist.length !== 0 ? (
                  <div className="filter-resourse-list">
                    <p
                      className="pointer"
                      onClick={() => {
                        const temp = peopleaction.map((element) => {
                          if (element.value == 0) {
                            return {
                              ...element,
                              value: 1,
                            };
                          } else {
                            return {
                              ...element,
                            };
                          }
                        });
                        setPeopleaction(temp);
                      }}
                    >
                      Select All
                    </p>
                    <p
                      style={{ color: "#F42323" }}
                      className="pointer"
                      onClick={() => {
                        const temp = peopleaction.map((element) => {
                          if (element.value == 1) {
                            return {
                              ...element,
                              value: 0,
                            };
                          } else {
                            return {
                              ...element,
                            };
                          }
                        });
                        setPeopleaction(temp);
                      }}
                    >
                      Deselect All
                    </p>
                    {/* <img src={deletesvg} alt="deletesvg" /> */}
                  </div>
                ) : null}
                <div className="resources-list">
                  {selectedlist.length !== 0 ? (
                    selectedlist.map((ele) => {
                      return (
                        <div className="resource-list-row">
                          <div className="resource-checkbox">
                            <input
                              type="checkbox"
                              name="resourceCheckbox"
                              id="resourceCheckbox"
                              className="resource-input"
                              autoComplete="off"
                              checked={ele.value == 1}
                              onChange={() => {
                                const temp = peopleaction.map((element) => {
                                  if (element.menteeMail == ele.menteeMail) {
                                    return {
                                      ...element,
                                      value: element.value == 0 ? 1 : 0,
                                    };
                                  } else {
                                    return {
                                      ...element,
                                    };
                                  }
                                });
                                setPeopleaction(temp);
                              }}
                            />
                          </div>
                          <div className="resource-details">
                            <div className="resource-name">
                              {ele.menteeName}
                            </div>
                            <div className="resource-email">
                              {ele.menteeMail}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="default-resource-list">
                      {listoffreementee
                        ? listoffreementee.map((elem) => {
                            return (
                              <div className="default-resource-list-row">
                                <div className="resource-list-name">
                                  {elem.Name}
                                </div>
                                <div className="resource-list-email">
                                  {elem.EmailID}
                                </div>
                              </div>
                            );
                          })
                        : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="sec-mentor-footer">
          <div
            className="sec-mentor-btn sec-mentor-cancel"
            onClick={() => {
              setSelectedperson({});
              setSelectedlist([]);
              setChoosed({});
              setReportshow(false);
            }}
          >
            Cancel
          </div>
          <div
            className="sec-mentor-btn sec-mentor-save"
            style={
              Object.keys(choosed).length > 0
                ? {}
                : { backgroundColor: "#636363", pointerEvents: "none" }
            }
            onClick={() => {
              checkbefore();
            }}
          >
            Save
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddSecondaryMentorModal;

// eslint-disable-next-line no-lone-blocks
{
  /* <Modal
  show={reportshow}
  onHide={() => setReportshow(!reportshow)}
  size="lg"
  centered
  className="details-upload-modal"
>
  <Modal.Header className="modal-head-block">
    <Modal.Title style={{ fontSize: "18px", fontWeight: "400" }}>
      Add Secondary Mentor
    </Modal.Title>
    <CloseButton
      variant="white"
      style={{ fontSize: "14px" }}
      onClick={() => setReportshow(!reportshow)}
    />
  </Modal.Header>
  <Modal.Body style={{ padding: "12px 16px 0px 16px" }}>
    <Form>
      <div
        className="mb-3 d-flex details-inputField"
        controlId="exampleForm.ControlInput1 "
      >
        <Form.Label className="m-0">
          Reporting <br /> Manager
        </Form.Label>
        <p className="rm-name">Gaurav Sharma</p>
      </div>

      <div
        className="mb-3 d-flex details-inputField"
        controlId="exampleForm.ControlInput1 "
      >
        <Form.Label className="m-0">
          Secondary <br /> Mentor <span>*</span>
        </Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Email Address"
          className="inputFieldTextarea numberinput"
        />
      </div>
      <div
        className="mb-2 d-flex flex-column details-inputField align-items-end"
        controlId="exampleForm.ControlInput1 "
      >
        <div className="w-100 d-flex align-items-center justify-content-between">
          <Form.Label className="m-0">
            Assign To <span>*</span>
          </Form.Label>
          <div className="assign-to-div-main">
            <div
              className="assign-to-div"
              onClick={() => setListshow(!listshow)}
            >
              <Form.Control
                type="number"
                placeholder="Search"
                className="assigntoinput numberinput"
              />
            </div>
          </div>
        </div>
        {listshow ? (
          <div className="assigntolist-div">
            <div className="assigntouser-row">
              <div className="assigncheckbox">
                <input type="checkbox" name="Checkbox" id="checkbox" />
              </div>
              <div className="assignusername">Shreyansh Kothari</div>
            </div>
            <div className="assigntouser-row">
              <div className="assigncheckbox">
                <input type="checkbox" name="Checkbox" id="checkbox" />
              </div>
              <div className="assignusername">Shreyansh Kothari</div>
            </div>
            <div className="assigntouser-row">
              <div className="assigncheckbox">
                <input type="checkbox" name="Checkbox" id="checkbox" />
              </div>
              <div className="assignusername">Shreyansh Kothari</div>
            </div>
            <div className="assigntouser-row">
              <div className="assigncheckbox">
                <input type="checkbox" name="Checkbox" id="checkbox" />
              </div>
              <div className="assignusername">Shreyansh Kothari</div>
            </div>
            <div className="assigntouser-row">
              <div className="assigncheckbox">
                <input type="checkbox" name="Checkbox" id="checkbox" />
              </div>
              <div className="assignusername">Shreyansh Kothari</div>
            </div>
            <div className="assigntouser-row">
              <div className="assigncheckbox">
                <input type="checkbox" name="Checkbox" id="checkbox" />
              </div>
              <div className="assignusername">Shreyansh Kothari</div>
            </div>
            <div className="assigntouser-row">
              <div className="assigncheckbox">
                <input type="checkbox" name="Checkbox" id="checkbox" />
              </div>
              <div className="assignusername">Shreyansh Kothari</div>
            </div>
            <div className="assigntouser-row">
              <div className="assigncheckbox">
                <input type="checkbox" name="Checkbox" id="checkbox" />
              </div>
              <div className="assignusername">Shreyansh Kothari</div>
            </div>
            <div className="assigntouser-row">
              <div className="assigncheckbox">
                <input type="checkbox" name="Checkbox" id="checkbox" />
              </div>
              <div className="assignusername">Shreyansh Kothari</div>
            </div>
            <div className="assigntouser-row">
              <div className="assigncheckbox">
                <input type="checkbox" name="Checkbox" id="checkbox" />
              </div>
              <div className="assignusername">Shreyansh Kothari</div>
            </div>
            <div className="assigntouser-row">
              <div className="assigncheckbox">
                <input type="checkbox" name="Checkbox" id="checkbox" />
              </div>
              <div className="assignusername">Shreyansh Kothari</div>
            </div>
            <div className="assigntouser-row">
              <div className="assigncheckbox">
                <input type="checkbox" name="Checkbox" id="checkbox" />
              </div>
              <div className="assignusername">Shreyansh Kothari</div>
            </div>
            <div className="assigntouser-row">
              <div className="assigncheckbox">
                <input type="checkbox" name="Checkbox" id="checkbox" />
              </div>
              <div className="assignusername">Shreyansh Kothari</div>
            </div>
            <div className="assigntouser-row">
              <div className="assigncheckbox">
                <input type="checkbox" name="Checkbox" id="checkbox" />
              </div>
              <div className="assignusername">Shreyansh Kothari</div>
            </div>
            <div className="assigntouser-row">
              <div className="assigncheckbox">
                <input type="checkbox" name="Checkbox" id="checkbox" />
              </div>
              <div className="assignusername">Shreyansh Kothari</div>
            </div>
            <div className="assigntouser-row">
              <div className="assigncheckbox">
                <input type="checkbox" name="Checkbox" id="checkbox" />
              </div>
              <div className="assignusername">Shreyansh Kothari</div>
            </div>
          </div>
        ) : null}
      </div>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button className="submit-Button">Submit</Button>
  </Modal.Footer>
</Modal> */
}
