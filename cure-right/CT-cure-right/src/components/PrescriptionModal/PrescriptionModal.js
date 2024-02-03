import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, InputGroup, Modal } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Cross from "../../assets/icons/cross.svg";
import patientImg from "../../assets/icons/profile.svg";
import HeartIcon from "../../assets/icons/heartIcon.svg";
import WarnIcon from "../../assets/icons/warnIcon.svg";
import DiagnosisIcon from "../../assets/icons/diagnosisIcon.svg";
import followUpIcon from "../../assets/icons/followUp.svg";
import medicationsIcon from "../../assets/icons/medications.svg";
import crossIcon from "../../assets/icons/crossIcon.svg";
import { setPrescriptionData } from "../../redux/actions";
import "./PrescriptionModal.css";

const PrescriptionModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { callEnded } = props;
  const appReducerData = useSelector((state) => state.AppReducer);
  const isDoctor = localStorage.getItem("userType") === "doctor" ? true : false;

  const [arr, setArr] = useState([
    {
      medicineName: "",
      frequency: "",
      duration: "",
      instruction: "",
      notes: "",
    },
  ]);
  const [chiefConcern, setChiefConcern] = useState({
    desc: "",
    sinceWhen: "",
    complaint: "",
  });

  const [diagnosis, setDiagnosis] = useState({
    desc: "",
    discoveredOn: "",
    concern: "",
  });
  const [followUp, setFollowUp] = useState({
    date: "",
    time: "",
  });

  const valueUpdate = (index, value, name) => {
    let tempArr = arr;
    tempArr = tempArr.map((row, i) => {
      if (index === i) {
        return {
          ...row,
          [name]: value,
        };
      }
      return row;
    });
    setArr(tempArr);
  };

  const updateChiefConcern = (name, value) => {
    setChiefConcern({
      ...chiefConcern,
      [name]: value,
    });
  };

  const updateDiagnosis = (name, value) => {
    setDiagnosis({
      ...diagnosis,
      [name]: value,
    });
  };

  const updateFollowUp = (name, value) => {
    setFollowUp({
      ...followUp,
      [name]: value,
    });
  };

  const handleAddMoreMedicine = () => {
    setArr([
      ...arr,
      {
        medicineName: "",
        frequency: "",
        duration: "",
        instruction: "",
        notes: "",
      },
    ]);
  };

  const handleSendPrescription = () => {
    navigate("/home");
  };

  const downloadPdf = () => {
    const input = document.getElementById("modal-body-div");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 16, 8, 180, 153);
      pdf.save("prescription.pdf");
    });
  };

  return (
    <div className="prescriptionModal">
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{
          marginTop: "3rem",
        }}
        className=" mt-0 prescriptionModal"
      >
        <div className="modalHeader">
          <h6 className="heading">
            {isDoctor ? "Prescription" : "Your Prescription"}
          </h6>
          <div className="subHeading">
            {isDoctor
              ? "Your Prescription"
              : "Check the details of your prescription."}
          </div>
        </div>
        <div
          className="remove_file"
          style={{
            position: "absolute",
            right: "2rem",
            top: "1.4rem",
            zIndex: "10",
          }}
        >
          <img
            src={Cross}
            className="cross m-0"
            alt="cancel"
            onClick={() => {
              dispatch(setPrescriptionData({}));
              props?.setPrescriptionModal(false);
            }}
          />
        </div>
        <Modal.Body>
          <div id="modal-body-div">
            <div className="d-flex flex-md-row flex-column justify-content-between w-100 align-items-center">
              <div className="p-info d-flex justify-content-center align-items-center gap-2">
                <img src={patientImg} alt="" />
                <div className=" ms-2   ">
                  <div className="flex">
                    <div className="f700">Jessica Mathew</div>
                    <div className="dot"></div> Female, 36
                  </div>
                  <div className="flex mt-1 flex-lg-row flex-column">
                    <div className="flex">jessica.matthew@gmail.com</div>
                    <div className="flex">
                      <div className="dot ms-0 ms-lg-2"></div> 3848484848
                    </div>
                    <div className="flex">
                      <div className="dot ms-0 ms-lg-2"></div>
                      <div className="f700 "> Last Visit -</div> 12-04-2023
                    </div>
                  </div>
                </div>
              </div>
              <button className="editBtn m-0">Edit</button>
            </div>
            <div className="section">
              <div className="row1">
                <div className="flex gap-1">
                  <img src={HeartIcon} alt="" />
                  <div className="f700">Vitals</div>
                </div>
                <div className="flex ps-2 gap-2">
                  <div className="col-3 ps-lg-4 ps-md-0 pe-2 b-right">
                    <div className="grey">Blood Sugar</div>
                    <div className="grey1">
                      <span
                        style={{
                          color: "black",
                        }}
                      >
                        120
                      </span>{" "}
                      mg/dl <br />
                      before meal
                    </div>
                  </div>
                  <div className="col-3 ps-lg-5 ps-md-0 pe-2 b-right">
                    <div className="grey">Temperature</div>
                    <div className="grey">
                      <span
                        style={{
                          color: "black",
                        }}
                      >
                        98.7
                      </span>{" "}
                      F
                    </div>
                  </div>
                  <div className="col-3 ps-lg-5 ps-md-3 pe-1 b-right">
                    <div className="grey">Weight</div>
                    <div className="grey">
                      <span
                        style={{
                          color: "black",
                        }}
                      >
                        62
                      </span>{" "}
                      Kg
                    </div>
                  </div>
                  <div className="col-3 ps-lg-5 ps-md-3 pe-2">
                    <div className="grey">SpO2</div>
                    <div className="grey">
                      <span
                        style={{
                          color: "black",
                        }}
                      >
                        95%
                      </span>{" "}
                      F
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="row1">
                <div className="flex gap-1">
                  <img src={WarnIcon} alt="" />
                  <div className="f700">Chief Concern</div>
                </div>
                <div className="chief_container d-flex gap-4">
                  <div className="col-6 position-relative">
                    <textarea
                      rows="3"
                      className="Brief-description align-items-start col-12 cure-textarea"
                      placeholder="Add description here..."
                      aria-label="Recipient's username"
                      name="desc"
                      onChange={(e) => {
                        updateChiefConcern(e.target.name, e.target.value);
                      }}
                    >
                      {chiefConcern?.desc}
                    </textarea>
                  </div>
                  <div className="">
                    <div className="flex align-items-center col-7 pb-2">
                      <div className="fs col-7">Since When</div>
                      <InputGroup className="calender_input_outside p-0 mx-2">
                        <Form.Control
                          type="date"
                          className="calender_input px-0 py-0"
                          value={chiefConcern?.sinceWhen}
                          name="sinceWhen"
                          onChange={(e) =>
                            updateChiefConcern(e.target.name, e.target.value)
                          }
                        />
                      </InputGroup>
                    </div>
                    <div className="flex align-items-center col-md-9 col-lg-12">
                      <div className="fs col-md-5 col-lg-4">Complaint</div>
                      <Form.Control
                        type="text"
                        className="calender_input col-md-8 col-lg-12 "
                        placeholder="Pain in the head"
                        name="complaint"
                        value={chiefConcern?.complaint}
                        onChange={(e) =>
                          updateChiefConcern(e.target.name, e.target.value)
                        }
                      />
                      <div className="calender-icon "></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="row1 ">
                <div className="flex gap-1">
                  <img src={DiagnosisIcon} alt="" />
                  <div className="f700">Diagnosis</div>
                </div>
                <div className="flex gap-4 mt-1">
                  <div className="col-6">
                    <textarea
                      rows="3"
                      className="Brief-description align-items-start col-12 cure-textarea"
                      placeholder="Add description here..."
                      aria-label="Recipient's username"
                      name="desc"
                      onChange={(e) =>
                        updateDiagnosis(e.target.name, e.target.value)
                      }
                    >
                      {diagnosis?.desc}
                    </textarea>
                  </div>
                  <div className="">
                    <div className="flex align-items-center col-7 pb-2">
                      <div className="fs col-7">Discovered On</div>
                      <InputGroup className="calender_input_outside p-0 mx-2">
                        <Form.Control
                          type="date"
                          className="calender_input px-0 py-0"
                          value={diagnosis?.discoveredOn}
                          name="discoveredOn"
                          onChange={(e) =>
                            updateDiagnosis(e.target.name, e.target.value)
                          }
                        />
                      </InputGroup>
                    </div>
                    <div className="flex align-items-center col-md-9 col-lg-12">
                      <div className="fs col-md-5 col-lg-4">Concern</div>
                      <Form.Control
                        type="text"
                        className="col-md-8 col-lg-10 "
                        placeholder="Pain in the Joints"
                        name="concern"
                        value={diagnosis?.concern}
                        onChange={(e) =>
                          updateDiagnosis(e.target.name, e.target.value)
                        }
                        style={{
                          width: "14.5rem",
                        }}
                      />
                      <div className="calender-icon "></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="row1">
                <div className="flex gap-1">
                  <img src={medicationsIcon} alt="" />
                  <div className="f700">Medications</div>
                </div>
                <table className="prescription-table">
                  <tr>
                    <th>Medicine Name </th>
                    <th>Frequency</th>
                    <th>Duration</th>
                    <th>Instruction</th>
                    <th>Notes</th>
                    <th></th>
                  </tr>
                  {arr?.map((row, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <Form.Control
                            type="text"
                            className="calender_input col-3"
                            placeholder="Pracetamol"
                            value={row.medicineName}
                            name="medicineName"
                            onChange={(e) =>
                              valueUpdate(i, e.target.value, e.target.name)
                            }
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            className="calender_input col-3"
                            placeholder="Thrice a day"
                            value={row.frequency}
                            name="frequency"
                            onChange={(e) =>
                              valueUpdate(i, e.target.value, e.target.name)
                            }
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            className="calender_input col-3"
                            placeholder="120 Days"
                            value={row.duration}
                            name="duration"
                            onChange={(e) =>
                              valueUpdate(i, e.target.value, e.target.name)
                            }
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            className="calender_input col-3"
                            placeholder="Before Meal"
                            value={row.instruction}
                            name="instruction"
                            onChange={(e) =>
                              valueUpdate(i, e.target.value, e.target.name)
                            }
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            className="calender_input col-3"
                            placeholder="Write here..."
                            value={row.notes}
                            name="notes"
                            onChange={(e) =>
                              valueUpdate(i, e.target.value, e.target.name)
                            }
                          />
                        </td>
                        <td style={{ width: "fit-content" }}>
                          <img
                            src={crossIcon}
                            onClick={(e) => {
                              let newArr = arr.filter((item, index) => {
                                return index !== i;
                              });
                              if (newArr.length !== 0) {
                                setArr(newArr);
                              }
                            }}
                            alt=""
                            style={{
                              cursor: "pointer",
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </table>
                <button className="addMore" onClick={handleAddMoreMedicine}>
                  Add More
                </button>
              </div>
            </div>
            <div className="section">
              <div className="row1">
                <div className="flex gap-1">
                  <img src={followUpIcon} alt="" />
                  <div className="f700">Follow Up</div>
                </div>
                <div className="flex gap-4">
                  <div className="flex textGroup ms-4 ps-2">
                    <div className="flex align-items-center me-2">
                      <div className="fs">Date</div>
                      <div>
                        <InputGroup className="calender_input_outside p-0 mx-2">
                          <Form.Control
                            type="date"
                            className="calender_input px-0 py-0"
                            value={followUp?.date}
                            name="date"
                            onChange={(e) =>
                              updateFollowUp(e.target.name, e.target.value)
                            }
                          />
                        </InputGroup>
                      </div>{" "}
                    </div>
                    <div className="flex align-items-center me-2">
                      <div className="fs">Time</div>
                      <div>
                        <InputGroup className="ms-2 calender_input_outside mx-2">
                          <Form.Control
                            type="time"
                            className="calender_input"
                            value={followUp?.time}
                            name="time"
                            onChange={(e) =>
                              updateFollowUp(e.target.name, e.target.value)
                            }
                          />
                        </InputGroup>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="editBtn sendPres"
              style={{
                marginLeft: "0",
                marginTop: "1rem",
              }}
              disabled={!callEnded}
              onClick={handleSendPrescription}
            >
              Send to Patient
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PrescriptionModal;
