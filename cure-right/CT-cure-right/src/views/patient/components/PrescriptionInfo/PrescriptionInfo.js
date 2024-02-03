import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import patientImg from "../../../../assets/icons/profile.svg";
import HeartIcon from "../../../../assets/icons/heartIcon.svg";
import WarnIcon from "../../../../assets/icons/warnIcon.svg";
import DiagnosisIcon from "../../../../assets/icons/diagnosisIcon.svg";
import followUpIcon from "../../../../assets/icons/followUp.svg";
import medicationsIcon from "../../../../assets/icons/medications.svg";
import downloadIcon from "../../../../assets/icons/downloadIcon.svg";
import axios from "axios";
import { toast } from "react-hot-toast";

const PrescriptionInfo = (props) => {
  let { chiefConcern, diagnosis, followUp, setMlResponse, setMedName } = props;

  const getDetails = (diagnosis, medicine) => {
    const toastId = toast.loading("Please wait...");
    setMedName(medicine.MedicineName);
    let data = JSON.stringify({
      Concern: chiefConcern?.description,
      Diagnosis: diagnosis?.info?.description,
      "Major Issue": chiefConcern?.complaint,
      "Preferred Medicine": medicine.MedicineName,
      "Medicine Duration": medicine.Duration,
      "Dieses Detected": chiefConcern?.sinceWhen,
    });

    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: "https://cure-right-prescription.azurewebsites.net/prescription",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        toast.dismiss(toastId);
        toast.success("Success");
        setMlResponse(response.data);
      })
      .catch((error) => {
        toast.dismiss(toastId);
        toast.error("Service is Down");
        console.log(error);
      });
  };

  return (
    <div
      className="prescriptionModal position-relative"
      style={{
        backgroundColor: "#FFFFFF",
        padding: "1rem",
        borderRadius: "1rem",
      }}
    >
      <div
        className="remove_file"
        style={{
          position: "absolute",
          right: "2rem",
          top: "1.4rem",
          zIndex: "10",
        }}
      >
        <img src={downloadIcon} alt="cancel" onClick={"downloadPdf"} />
      </div>

      <div id="modal-body-div">
        <div className="d-flex flex-md-row flex-column justify-content-between w-100 align-items-center">
          <div className="p-info d-flex justify-content-center align-items-center gap-2">
            <img src={patientImg} alt="" />
            <div className=" ms-2   ">
              <div className="flex">
                <div className="f700">Suresh Raina</div>
                <div className="dot"></div> Male, 23
              </div>
              <div className="flex mt-1 flex-lg-row flex-column">
                <div className="flex">kapil@gmail.com</div>
                <div className="flex">
                  <div className="dot ms-0 ms-lg-2"></div> 3848484848
                </div>
                <div className="flex">
                  <div className="dot ms-0 ms-lg-2"></div>
                  <div className="f700 "> Last Visit -</div> 25-07-2023
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="row1">
            <div className="flex gap-1">
              <img src={HeartIcon} alt="heart" />
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
                  </span>
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
                  </span>
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
                  </span>
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
                  </span>
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
                  disabled={true}
                >
                  {chiefConcern?.description}
                </textarea>
              </div>
              <div className="">
                <div className="flex align-items-center col-md-9 mb-3 col-lg-12">
                  <div className="fs col-md-5 col-lg-4">Since When</div>
                  <Form.Control
                    type="text"
                    className="calender_input px-2 py-0"
                    disabled={true}
                    value={chiefConcern?.sinceWhen}
                    // value={new Date("27/08/2023")}
                    name="sinceWhen"
                  />
                </div>
                <div className="flex align-items-center col-md-9 col-lg-12">
                  <div className="fs col-md-5 col-lg-4">Complaint</div>
                  <Form.Control
                    type="text"
                    className="calender_input  "
                    placeholder="Pain in the head"
                    disabled={true}
                    name="complaint"
                    value={chiefConcern?.complaint}
                  />
                  <div className="calender-icon "></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {diagnosis?.map((item, index) => (
          <div>
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
                      disabled={true}
                      name="desc"
                    >
                      {item?.info?.description}
                    </textarea>
                  </div>
                  <div className="">
                    <div className="flex align-items-center col-md-9 mb-3 col-lg-12">
                      <div className="fs col-md-5 col-lg-4">Discovered On</div>

                      <Form.Control
                        type="date"
                        className="calender_input px-2 py-0 "
                        disabled={true}
                        value={item?.info?.discoveredOn}
                        name="discoveredOn"
                      />
                    </div>
                    <div className="flex align-items-center col-md-9 col-lg-12">
                      <div className="fs col-md-5 col-lg-4">Concern</div>

                      <Form.Control
                        type="text"
                        className="calender_input   "
                        placeholder="Pain in the Joints"
                        disabled={true}
                        name="concern"
                        value={item?.info?.concern}
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
                    <th>For</th>
                    <th>Frequency</th>
                    <th>Duration</th>
                    <th>Notes</th>
                    <th></th>
                  </tr>
                  {item?.medicines?.map((row, i) => {
                    return (
                      <tr key={i}>
                        <td
                          className="cursor-pointer"
                          onClick={() => getDetails(item, row)}
                        >
                          <Form.Control
                            type="text"
                            className="calender_input col-3 cursor-pointer"
                            placeholder="Paracetamol"
                            value={row.MedicineName}
                            name="medicineName"
                            disabled={true}
                            style={{
                              color: "#7657E1",
                              fontWeight: "600",
                              fontSize: "14px",
                            }}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            className="calender_input col-3"
                            placeholder="Fever"
                            value={row.Instruction}
                            name="instruction"
                            disabled={true}
                          />
                        </td>

                        <td>
                          <Form.Control
                            type="text"
                            className="calender_input col-3"
                            placeholder="Thrice a day"
                            value={row.Frequency}
                            name="frequency"
                            disabled={true}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            className="calender_input col-3"
                            placeholder="120 Days"
                            value={row.Duration}
                            name="duration"
                            disabled={true}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            className="calender_input col-3"
                            placeholder="Write here..."
                            value={row.Notes}
                            name="notes"
                            disabled={true}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        ))}
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
                        type="string"
                        className="calender_input px-0 py-0"
                        disabled={true}
                        value={followUp?.date}
                        name="date"
                      />
                    </InputGroup>
                  </div>
                </div>
                <div className="flex align-items-center me-2">
                  <div className="fs">Time</div>
                  <div>
                    <InputGroup className="ms-2 calender_input_outside mx-2">
                      <Form.Control
                        type="string"
                        className="calender_input"
                        disabled={true}
                        value={followUp?.time}
                        name="time"
                      />
                    </InputGroup>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PrescriptionInfo;
