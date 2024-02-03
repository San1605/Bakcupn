import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineUpload } from "react-icons/ai";
import removeicon from "../../../assets/courseManagement/remove.svg";
import Dropzone from "react-dropzone";
import "./addlpmodal.css";

function AddLearningPathModal() {
  const { lpcreate, departmentlist, departmentlistdata } =
    useContext(GlobalContext);
  const [reportshow, setReportshow] = useState(false);
  const [department, setDepartment] = useState([]);
  const [showDepartmentList, setShowDepartmentList] = useState(false);
  const [lpName, setLpName] = useState("");
  const [xl, setXl] = useState("");
  const handlesubmit = () => {
    if (lpName !== "" && lpName.includes("LP_") && xl !=="") {
      const uploadingcourse = {
        containerName: lpName,
        department: department.join(","),
        thumbnail: xl,
        type:"create"
      };
      lpcreate(uploadingcourse);
      setReportshow(!reportshow);
      setLpName("");
      setXl("");
      setDepartment([]);
    } else {
      if(!lpName.includes("LP_"))
      {
        toast.error("Learning Path should include LP_");
      }
      else if(xl == "")
      {
        toast.error("Thumbnail is required");
      }
      else{
        toast.error("Please fill the details correctly");
      }
    }
  };

  useEffect(() => {
    if (departmentlistdata.length == 0) {
      departmentlist();
    }
  }, [departmentlistdata]);
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      if (
        [".jpg", ".jpeg", ".png"].includes(
          acceptedFiles[0].name.substring(
            acceptedFiles[0].name.lastIndexOf(".")
          )
        )
      ) {
        setXl(acceptedFiles[0]);
      } else {
        toast.error("File type error");
      }
    }
  };
  return (
    <>
      <Button
        className="modal-outer-primary-btn reportuploadbtn py-2 px-3 d-flex align-items-center "
        onClick={() => setReportshow(!reportshow)}
        style={{ fontSize: "12px" }}
      >
        Learning Path &nbsp; <span>+</span>
      </Button>
      <Modal
        show={reportshow}
        size="md"
        centered
        className="resume-modal editDepartment-modal"
      >
        <div className="edit-department-modal">
          <div className="edit-department-modal-head">
            <div className="edit-department-modal-title">
              Create Learning Path
            </div>
            <CloseButton
              onClick={() => {
                setLpName("");
                setDepartment([]);
                setXl("");
                setReportshow(!reportshow);
              }}
            />
          </div>
          <div className="edit-department-inputs">
            <div className="edit-department-input-div">
              <label>
                Learning Path Title
                <span className="spanimp">*</span>
              </label>
              <input
                type="text"
                className="dep-input"
                placeholder={`Format - LP_"learningPathName"`}
                title={`Must Add "LP_" before Learning Path name`}
                onChange={(e) => setLpName(e.target.value)}
              />
            </div>
            <div className="edit-department-input-div">
              <label>
                Assign Department
              </label>
              <div className="edit-dep-div">
                <div
                  className="select-edit-department"
                  onClick={() => setShowDepartmentList(!showDepartmentList)}
                >
                  Select Department <BsChevronDown />
                </div>
                {showDepartmentList == true ? (
                  <div className="edit-deparment-list-div">
                    {departmentlistdata.length > 0
                      ? departmentlistdata.map((elem) => {
                          return (
                            <div className="edit-deparment-list-row">
                              <input
                                type="checkbox"
                                name="edit department"
                                id="editDepartment"
                                checked={department.includes(elem.Department)}
                                onChange={() =>department.includes(elem.Department)? setDepartment(department.filter((ele)=>ele !== elem.Department)) : setDepartment((prev)=>[...prev,elem.Department])}
                                />
                              {elem.Department}
                            </div>
                          );
                        })
                      : null}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="edit-department-input-div">
              <label>
                Add Thumbnail
                <span className="spanimp">*</span>
              </label>
              <div className="upload-thumbnail-div">
                {xl == "" ? (
                  <Dropzone onDrop={onDrop} className="ftt-dropzone pointer">
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()} className="pointer">
                        <input {...getInputProps()} />
                        <div className="upload-thumbnail-placeholder-text">
                          <p>Upload Thumbnail - .jpg, .jpeg, .png</p>
                          <AiOutlineUpload />
                        </div>
                      </div>
                    )}
                  </Dropzone>
                ) : (
                  <div className="upload-thumbnail-placeholder-text">
                    {xl.name}
                    <img
                      src={removeicon}
                      alt="removeicon"
                      className="pointer"
                      onClick={() => setXl("")}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-100">
            <Button
              variant="light"
              style={{ backgroundColor: "#4F52B2" }}
              className="w-100 modal-inner-primary-btn"
              onClick={() => {
                handlesubmit();
              }}
            >
              <div>Create</div>
            </Button>
          </div>
        </div>
      </Modal>
      {/* <Modal
        show={!reportshow}
        onHide={() =>{ 
          setLpName("");
          setDepartment(departmentlistdata[0].Department);
          setReportshow(!reportshow)}}
        size="sm"
        centered
        className="report-upload-modal"
      >
        {/* <Modal.Header className="modal-head-block">
          <Modal.Title style={{ fontSize: "18px", fontWeight: "400" }}>
            Add Learning Path
          </Modal.Title>
          <CloseButton
            variant="white"
            style={{ fontSize: "14px" }}
            onClick={() => {
              setLpName("");
              setDepartment(departmentlistdata[0].Department);
              setReportshow(!reportshow)}}
          />
        </Modal.Header> 
        <div className="addsampler-modal-body">
          <Modal.Body style={{ padding: "12px 16px 0px 16px" }}>
            <div className="p-2">
              <div
                className="mb-3 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <label className="col-3 pt-2">
                  Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  value={lpName}
                  className="inputFieldTextarea addcourse-input"
                  onChange={(e) => setLpName(e.target.value)}
                />
              </div>
              <div
                className="mb-3 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <label className="col-3 pt-2">
                  Department<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="current department"
                  className="w-75  inputFeildtextarea1 addcourse-select"
                  id="current-department-dropdown"
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  {departmentlistdata.length > 0
                    ? departmentlistdata.map((elem, index) => {
                        return (
                          <option value={elem.Department} key={index}>
                            {elem.Department}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>
              <div className="addcourse-btn-row">
                <Button
                  variant="secondary"
                  className="modal-inner-sec-btn"
                  onClick={() => {
                    setLpName("");
                    setDepartment(departmentlistdata[0].Department);
                    setReportshow(!reportshow)}}
                >
                  Cancel
                </Button>
                <Button
                  variant="light"
                  style={{ backgroundColor: "#4F52B2" }}
                  className="modal-inner-primary-btn"
                  onClick={() => {
                    // setReportshow(!reportshow)
                    handlesubmit();
                  }}
                >
                  <div>Add Path</div>
                </Button>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal> */}
    </>
  );
}

export default AddLearningPathModal;
