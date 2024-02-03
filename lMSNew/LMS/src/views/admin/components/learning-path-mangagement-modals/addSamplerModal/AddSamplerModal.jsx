import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AiOutlineUpload } from "react-icons/ai";
import CloseButton from "react-bootstrap/CloseButton";
import "./addsamplerModal.css";
import { useContext } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";
import { useDropzone } from "react-dropzone";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

function AddSamplerModal() {
  const { generalfilesadd } = useContext(GlobalContext);
  const [reportshow, setReportshow] = useState(false);
  const [xl, setXl] = useState("");
  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      maxFiles: 1,
      minSize: 0,
    });
  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setXl(acceptedFiles[0]);
    }
  }, [acceptedFiles]);
  useEffect(() => {
    console.log(xl);
  }, [xl]);
  const handlesubmit = () => {
    if (xl !== "") {
      const uploadingcourse = {
        filename: xl,
      };
      generalfilesadd(uploadingcourse);
      setXl("");
      setReportshow(!reportshow);
    } else {
      toast.error("Please fill the details correctly");
    }
  };
  return (
    <>
      <Button
        className="modal-outer-primary-btn reportuploadbtn py-2 px-3 d-flex align-items-center "
        onClick={() => setReportshow(!reportshow)}
        style={{ fontSize: "12px" }}
      >
        Add General Files &nbsp; <span>+</span>
      </Button>
      <Modal
        show={reportshow}
        onHide={() => setReportshow(!reportshow)}
        size="lg"
        centered
        className="report-upload-modal"
      >
        <Modal.Header className="modal-head-block">
          <Modal.Title style={{ fontSize: "18px", fontWeight: "400" }}>
            Add General Files
          </Modal.Title>
          <CloseButton
            variant="white"
            style={{ fontSize: "14px" }}
            onClick={() => setReportshow(!reportshow)}
          />
        </Modal.Header>
        <div>
          <Modal.Body style={{ padding: "12px 16px 0px 16px" }}>
            <Form className="p-2">
              {/* <div
                className="mb-3 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <Form.Label className="col-3 pt-2">
                  Title<span>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Color Theory"
                  className="inputFieldTextarea "
                />
              </div> */}
              <div
                className="mb-3 d-flex inputField align-items-center"
                controlId="exampleForm.ControlInput1 "
              >
                <label className="col-3 " style={{ fontSize: "14px" }}>
                  Upload File<span style={{ color: "red" }}>*</span>
                </label>
                <label
                  htmlFor="file-upload"
                  className="inputFieldTextarea pointer d-flex flex-row"
                >
                  <div
                    className="d-flex justify-content-start"
                    style={{
                      paddingLeft: "0.775rem",
                      color: "#818181",
                      width: "69.5%",
                    }}
                  >
                    <div
                      {...getRootProps({ className: "dropzone pt-1" })}
                      style={{
                        width: "80%",
                      }}
                    >
                      <p
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          width: "100%",
                        }}
                        title={xl ? xl.name : "Upload file"}
                      >
                        {xl ? xl.name : "Upload file"}
                      </p>
                      <input {...getInputProps()} />
                    </div>
                  </div>

                  <div className="chooseupload nowrap">
                    <div
                      {...getRootProps({
                        className: "dropzone d-flex align-items-center",
                      })}
                    >
                      <AiOutlineUpload className="mx-1" />
                      <input {...getInputProps()} />
                      <p className="mx-1"> Choose File</p>
                    </div>
                  </div>
                </label>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className="modal-inner-sec-btn"
              onClick={() => setReportshow(!reportshow)}
            >
              Cancel
            </Button>
            <Button
              variant="light"
              className="modal-inner-primary-btn"
              onClick={() => handlesubmit()}
            >
              <div>Add Files</div>
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default AddSamplerModal;
