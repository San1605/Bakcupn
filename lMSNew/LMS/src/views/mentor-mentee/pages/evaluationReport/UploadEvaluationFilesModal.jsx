import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import Dropzone from "react-dropzone";
import { AiOutlineUpload } from "react-icons/ai";
import { IoMdRemove } from "react-icons/io";
import pdfImg from "../../../../assets/eval/pdf.svg";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalState";

function UploadEvaluationFilesModal() {
  const {uploadfilesofevaluation} = useContext(GlobalContext)
  const [reportshow, setReportshow] = useState(false);
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    const uploadedFiles = acceptedFiles.filter((file) => [".pdf"].includes(file.name.substring(file.name.lastIndexOf("."))));
    if(uploadedFiles.length > 0)
   { setFiles([...files, ...uploadedFiles]);}
   else{
    toast.error("Pdf accepted only");
   }
  };

  const removeParticularFile = (index) => {
    const uploadedFiles = [...files];
    uploadedFiles.splice(index, 1);
    setFiles(uploadedFiles);
  };
  const FileCard = ({ name, index }) => {
    return (
      <div className="userCard file-card eval-upload-card">
        <div className="userCard-img fileCard-img">
          <img src={pdfImg} alt="file icon" className="file-icon" />
        </div>
        <div className="userCard-details eval-upload-card-name" title={name}>
          <div className="userCard-name filecard-name">{name}</div>
        </div>
        <IoMdRemove
          className="eval-remove-icon pointer"
          onClick={() => {
            removeParticularFile(index);
          }}
        />
      </div>
    );
  };
  // const handleFileInputChange = (e) => {
  //   const selectedFiles = e.target.files;
  //   setFiles([...files, ...selectedFiles]);
  // };

  // const addMoreFiles = () => {
  //   fileInputRef.current.click();
  // };
  // const fileInputRef = useRef(null);

  return (
    <>
      <div
        className="evaluation-upload modal-outer-secondary-btn pointer"
        onClick={() => setReportshow(!reportshow)}
      >
        Upload Files
      </div>

      <Modal
        show={reportshow}
        onHide={() => setReportshow(!reportshow)}
        size="md"
        centered
        className="evaluation-upload-modal"
      >
        <Modal.Header className="sec-mentor-modal-header-block">
          <Modal.Title>
            <div className="sec-mentor-modal-header">
              <p>Upload Files</p>
            </div>
          </Modal.Title>
          <CloseButton
            variant="black"
            style={{ fontSize: "14px" }}
            onClick={() => setReportshow(!reportshow)}
          />
        </Modal.Header>
        <Modal.Body className="sec-mentor-modal-body">
          <div className="evaluationDropzone-main">
            {files.length === 0 ? (
              <Dropzone
                onDrop={onDrop}
                style={{ cursor: "pointer" }}
                className="evaluationDropzone"
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="dropzone-inner-text cert-dropzone evaluationDropzone-inner-div">
                      <p>
                        Drag and Drop files here{" "}
                        <span style={{ color: "red" }}>*</span>
                      </p>
                      <p>Or</p>
                      <p className="upload-excel-btn evaluationDropzone-upload-btn">
                        <AiOutlineUpload /> Choose File
                      </p>
                      <p className="cert-upload-note evaluationDropzone-note">
                        <span>*</span>
                        Supported formats: .pdf only.
                      </p>
                    </div>
                  </div>
                )}
              </Dropzone>
            ) : (
              <div className="d-flex flex-column gap-2">
                <div className="w-full d-flex align-items-center justify-content-between">
                  <div>
                  <p className="cert-upload-note evaluationDropzone-note">
                        <span>*</span>
                        Supported formats: .PDF only.
                      </p>
                  </div>
                  <div
                    className="remove-all-files mb-1 pointer"
                    onClick={() => {
                      setFiles([]);
                    }}
                  >
                    Remove All
                  </div>
                </div>
                <div className="evaluationUpload-grid">
                  {/* <button onClick={addMoreFiles}>Add</button>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileInputChange}
                    ref={fileInputRef}
                    accept=".pdf,"
                  /> */}

                  {files.map((file, index) => (
                    <FileCard name={file.name} index={index} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        {files?.length > 0 && (
          <Modal.Footer className="sec-mentor-footer">
            <div className="sec-mentor-btn sec-mentor-cancel" onClick={()=>{
              setFiles([]);
              setReportshow(false);
            }}>Cancel</div>
            <div
              className="sec-mentor-btn sec-mentor-save"
              onClick={()=>{
                if(files.length > 0)
                {
                  const filesdata = files;
                  uploadfilesofevaluation(filesdata);
                  setReportshow(false);
                  setFiles([]);
                }
                else{
                  toast.error("No files selected");
                }
              }}
            >
              Save
            </div>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}

export default UploadEvaluationFilesModal;
