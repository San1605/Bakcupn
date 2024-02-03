import React, { useState } from "react";
import Draggable from "react-draggable";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Dicom from "../../views/doctor/components/Dicom/Dicom";
import LocalStreamMedia from "../Meeting/components/LocalStreamMedia";
import report_analyzer from "../../assets/icons/report_analyzer.svg";
import FULL_SCREEN from "../../assets/icons/fullScreenIcon.svg";
import "./Report.css";

const Report = ({
  communicationUserId,
  userName,
  localVideoStream,
  tempUserName,
  setView,
  setIsDicom,
}) => {
  let toastId;
  const [payload, setPayload] = useState({});
  const [buttonClass, setButtonClass] = useState(1);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(false);
  const [divVisible, setDivVisible] = useState(false);
  const [data, setData] = useState("");

  const handleClick1 = (id) => {
    setButtonClass(id);
  };

  const handleClick = () => {
    setShowPage(true);
  };
  const handleToggleDiv = () => {
    if (file) {
      toastId = toast.loading("Loading...");
      setTimeout(() => {
        toast.dismiss(toastId);
        toast.success("Success");
        setDivVisible(true);
      }, [3000]);
      // let data = new FormData();
      // data.append("files", file);

      // let config = {
      //   method: "post",
      //   maxBodyLength: Infinity,
      //   url: "https://cure-rights.azurewebsites.net/classify",
      //   data: file,
      // };

      // axios
      //   .request(config)
      //   .then((response) => {
      //     console.log(response.data["0"], "rr");
      //     setData(response.data["0"]);
      //     setDivVisible(true); // Show the response data
      //   })
      //   .catch((error) => {
      //     // console.log(error.response); // Log the error response for debugging
      //     // setDivVisible(true); // Show the response data
      //   });
    } else {
      toast.dismiss(toastId);
      toastId = toast.error("No File Selected");
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // console.log("Selected File ==> ", file);
    if (file) {
      const reader = new FileReader();
      setFile(file);
      reader.onload = (e) => {
        const fileContent = e.target.result;
        // console.log("File content:", fileContent);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="h-100 position-relative">
      {!showPage ? (
        <>
          {" "}
          <div className="home-top row p-0 w-100">
            <h3 className="heading-overview mb-1">Report Analyzer</h3>
            <h2 className="heading-homepage">Report Analyzer</h2>
          </div>
          <div className="report_div">
            <div className="report px-3 py-4">
              <h6 className="">Upload your File</h6>
              <div className="report1">
                <img
                  src={report_analyzer}
                  className="report_analyzer mt-2 mb-1"
                  alt=""
                />
                <div className="d-flex gap-1">
                  <span className="file_uploaded">
                    {file ? "File Uploaded" : "Drag & drop file here or"}
                  </span>
                  <span className="ct_scan">
                    {file ? (
                      <label>{file?.name}</label>
                    ) : (
                      <>
                        <label for="upload-report">choose file</label>
                        <input
                          onChange={handleFileChange}
                          type="file"
                          placeholder="choose file"
                          id="upload-report"
                        />
                      </>
                    )}
                  </span>
                </div>
                <div className="file mb-1">50 MB max file Size</div>
              </div>
              <div className="d-flex mt-3 gap-3">
                <button
                  className={buttonClass === 1 ? "active_default" : "default"}
                  onClick={() => setButtonClass(1)}
                >
                  X-ray
                </button>
                <button
                  className={buttonClass === 2 ? "active_default" : "default"}
                  onClick={() => setButtonClass(2)}
                >
                  CT Scan
                </button>
                <button
                  className={buttonClass === 3 ? "active_default" : "default"}
                  onClick={() => setButtonClass(3)}
                >
                  MRI
                </button>
              </div>
              <button
                onClick={handleToggleDiv}
                disabled={divVisible}
                className="report_button mt-3 "
              >
                Submit
              </button>
            </div>
            {divVisible && (
              <>
                <div className="dicom-table-cont w-50 mt-4">
                  <Table className="dicom-table table overflow-auto m-0">
                    <thead className="">
                      <tr className="doctor_table_heading report_table ms-2">
                        <th className="text-nowrap">Key</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {
                        <>
                          <tr className="onhover_tickets ps-2">
                            <td className="ticket_font">Body Part</td>
                            <td className="ticket_font">
                              {data.body_part || "Mri-Brain"}
                            </td>
                          </tr>
                          <tr className="onhover_tickets ps-2">
                            <td className="ticket_font">File Name</td>
                            <td className="ticket_font">
                              {data.file_name || "Mri-report-brain"}
                            </td>
                          </tr>
                          <tr className="onhover_tickets ps-2">
                            <td className="ticket_font">Scan</td>
                            <td className="ticket_font">
                              {data.scan || "5:77"}
                            </td>
                          </tr>
                          <tr className="onhover_tickets ps-2">
                            <td className="ticket_font">Classify</td>
                            <td className="ticket_font">
                              {data.classify || "0.41267988765"}
                            </td>
                          </tr>
                          <tr className="onhover_tickets ps-2">
                            <td className="ticket_font">Time Taken </td>
                            <td className="ticket_font">
                              {data.time_taken || "5:77"}
                            </td>
                          </tr>
                        </>
                      }
                    </tbody>
                  </Table>
                </div>
                <button
                  className="report_button1 py-2  my-4"
                  onClick={handleClick}
                >
                  Proceed
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="h-100">
          <Dicom data={data} file={file} setIsDicom={setIsDicom} />
        </div>
      )}
      <Draggable
        position={null}
        scale={1}
        // bounds="parent"
        className="custom-draggable"
      >
        <div className="position-absolute bottom-0 end-0 bordered overflow-hidden">
          <div className="position-relative">
            <div
              className="position-absolute z-index-1 cursor-pointer p-1"
              onClick={() => setIsDicom(false)}
              style={{
                right: "10px",
                top: "3px",
                zIndex: "10",
              }}
            >
              <img height={15} src={FULL_SCREEN} alt="" />
            </div>
            <LocalStreamMedia
              type={2}
              key={communicationUserId}
              displayName={userName ? userName : tempUserName}
              stream={localVideoStream}
              setView={setView}
              style={{
                width: "100%",
                height: "160px",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            />
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default Report;
