import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";
import arrow from "../../../../../assets/svg/unenrolledCourses/arrow.svg";
import downloadicon from "../../../assets/downloadblack.svg";
import uploadicon from "../../../assets/courseManagement/upload.svg";
import removeicon from "../../../assets/courseManagement/remove.svg";
import Dropzone from "react-dropzone";
import { toast } from "react-hot-toast";
import { AiOutlineUpload } from "react-icons/ai";
import "./addcourseform.css";
import { useParams } from "react-router-dom";

function AddCourseForm(props) {
  const { navigate,coursecreating, dispatch } = useContext(GlobalContext);
  const params = useParams();
  const [xl, setXl] = useState("");
  const [addType, setAddType] = useState("");
  const [uploadProgress, setUploadProgress] = useState(100);
  const [fileSize, setFileSize] = useState(xl.size);
  const [showPreview, setShowPreview] = useState(false);
  const [coursecode, setCourseCode] = useState("");
  const [desc, setDesc] = useState("");
  const [complex,setComplex] = useState("");
  const [inputdays,setInputdays] = useState(0);
  useEffect(()=>{
    if(!props.adminswitch)
    {
      dispatch({
        type:"ACCOUNT_NAV",
        payload:"12"
      })
    }
  },[])
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      if (
        [".xls", ".xlsx"].includes(
          acceptedFiles[0].name.substring(
            acceptedFiles[0].name.lastIndexOf(".")
          )
        )
      ) {
        setXl(acceptedFiles[0]);
      } else {
        toast.error("Upload Excel file only");
      }
    }
    
    // const formData = new FormData();
    //   formData.append("file", acceptedFiles[0]);
    //    fetch("/upload", {
    //      method: "POST",
    //      body: formData,
    //      onUploadProgress: (progressEvent) => {
    //        if (progressEvent.lengthComputable) {
    //          const percentCompleted = Math.round(
    //            (progressEvent.loaded / progressEvent.total) * 100
    //          );
    //          setUploadProgress(percentCompleted);
    //        }
    //      },
    //    });
    //   console.log(uploadProgress,"upload")
  };
  useEffect(() => {
    if (xl.size > 1000000) {
      setFileSize((xl.size / 1024 / 1024).toFixed(2) + `Mb`);
    } else {
      setFileSize((xl.size / 1024).toFixed(2) + `Kb`);
    }
  }, [xl, fileSize]);
  const addcourse = () => {
    if(complex === "")
    {
      toast.error("Add complexity in the course")
    }
    else if(inputdays === "" || inputdays <= 0){
      toast.error("Days is missing or incorrect value")
    }
    else if(desc === ""){
      toast.error("Add Description of the course")
    }
    else if(coursecode === "" ){
      toast.error("Coursecode missing");
    }
    else if(!coursecode.includes("CT_")){
      toast.error("Please fill the correct format of coursecode");
    }
    else{
      const data = {
        courseId:coursecode,
        level:complex,
        days:inputdays,
        description:desc,
        technology:params.id
      }
      coursecreating(data);

    }
  }

  return (
    <div className="courseManagementContainer">
      <div
        className="d-flex bredcumb-header"
        style={{ columnGap: "8px", fontSize: "12px" }}
      >
        <p
          className="pointer"
          onClick={() =>
            props.adminswitch
              ? navigate("/admin/coursemanagement")
              : navigate("/pathmanagement")
          }        >
          Learning Path Management
        </p>
        <p>&#x3e;</p>
        <p className="pointer" onClick={() => window.history.back()}>
          {params?.id}
        </p>
        <p>&#x3e;</p>
        <p style={{ color: "#4F52B2" }}>Create Course</p>
      </div>
      <div className="create-course-head mt-2">
        <img
          src={arrow}
          alt="leftArrowIcon"
          style={{ height: "16px" }}
          className="pointer"
          onClick={() => window.history.back()}
        />
        Create Course
      </div>
      <div className="create-course-page bg-white mt-2">
        <div className="create-course-form-page">
          <div className="create-course-form">
            <div className="create-course-form-input-div">
              <label>Learning Path</label>
              <input
                type="text"
                value={params?.id}
                className="dep-input"
                disabled
              />
            </div>
            <div className="create-course-form-input-div">
              <label>Days <span className="spanimp">*</span></label>
              <input
                type="number"
                value={inputdays}
                className="dep-input"
                onChange={(e)=>setInputdays(e.target.value)}
              />
            </div>
            <div className="create-course-form-input-div">
              <label>
                Course Code
                <span className="spanimp">*</span>
              </label>
              <input
                type="text"
                placeholder={`Format - CT_"coursename"`}
                className="dep-input w-75"
                title={`Must Add "CT_" before course name`}
                value={coursecode}
                onChange={(e)=>setCourseCode(e.target.value)}
              />
            </div>
            <div className="create-course-form-input-div ">
              <label>
                Description
                <span className="spanimp">*</span>
              </label>
              <textarea
                rows={2}
                placeholder="Enter the course Description"
                className="dep-input w-75"
                value={desc}
                onChange={(e)=>setDesc(e.target.value)}
              />
            </div>
            <div className="create-course-form-input-div ">
              <label>
                Complexity
                <span className="spanimp">*</span>
              </label>
              <div className="radio-options-div">
                <div className="d-flex align-items-center">
                  <input
                    type="radio"
                    id="Level-1"
                    name="complexity"
                    value="Level-1"
                    checked={complex === 1}
                    onChange={(e)=>setComplex(1)}
                    className="inputRadio pt-2"
                  />
                  <label htmlFor="Level-1">Level-1</label>
                </div>
                <div className="d-flex align-items-center">
                  <input
                    type="radio"
                    id="Level-2"
                    name="complexity"
                    value="Level-2"
                    checked={complex === 2}
                    onChange={(e)=>setComplex(2)}
                    className="inputRadio pt-2"
                  />
                  <label htmlFor="Level-2">Level-2</label>
                </div>
                <div className="d-flex align-items-center">
                  <input
                    type="radio"
                    id="Level-3"
                    name="complexity"
                    value="Level-3"
                    checked={complex === 3}
                    onChange={(e)=>setComplex(3)}
                    className="inputRadio pt-2"
                  />
                  <label htmlFor="Level-3">Level-3</label>
                </div>
              </div>
            </div>
            {/* <div className="create-course-form-input-div ">
              <label>
                Add Course
                <span className="spanimp">*</span>
              </label>
              <div className="radio-options-div">
                <div className="d-flex align-items-center">
                  <input
                    type="radio"
                    id="addcourse"
                    name="Add Course"
                    value="Manually"
                    className="inputRadio pt-2"
                    onClick={() => {
                      setAddType("Manually");
                    }}
                  />
                  <label htmlFor="add course type">Manually</label>
                </div>
                <div className="d-flex align-items-center">
                  <input
                    type="radio"
                    id="addcourse"
                    name="Add Course"
                    value="By Excel"
                    className="inputRadio pt-2"
                    onClick={() => {
                      setAddType("By Excel");
                    }}
                  />
                  <label htmlFor="add course type">By Excel</label>
                </div>
              </div>
            </div> */}
            {addType == "By Excel" ? (
              <div className="w-100 create-course-inner-form m-0 p-0 border-0">
                <div className="create-course-form-input-div">
                  <label>
                    Upload Excel
                    <span className="spanimp">*</span>
                  </label>
                  <div
                    className="dropzone-div w-75"
                    style={
                      xl !== ""
                        ? {
                            border: "none",
                          }
                        : null
                    }
                  >
                    {xl == "" ? (
                      <Dropzone
                        onDrop={onDrop}
                        style={{ cursor: "pointer" }}
                        className="ftt-dropzone "
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div className="dropzone-inner-text">
                              <img
                                src={uploadicon}
                                alt="uploadicon"
                                className="uploadicon"
                              />
                              <p>Drag and Drop files here</p>
                              <p>Or</p>
                              <p className="upload-excel-btn">
                                <AiOutlineUpload /> Choose File
                              </p>
                            </div>
                          </div>
                        )}
                      </Dropzone>
                    ) : (
                      <div className="upload-progress-div">
                        <div className="upload-progress">
                          <p>
                            {xl.name}{" "}
                            <img
                              src={removeicon}
                              alt="removeicon"
                              onClick={() => setXl("")}
                            />
                          </p>
                          <input
                            type="range"
                            name="uploadProgress w-100"
                            id="excelUploadProgress"
                          />
                          <p>
                            {fileSize}
                            <span>{uploadProgress}%</span>
                          </p>
                        </div>
                        <div className="upload-preview">
                          <div
                            className="preview-btn modal-outer-secondary-btn"
                            onClick={() => {
                              setShowPreview(true);
                            }}
                          >
                            Preview
                          </div>
                        </div>

                        {/* {uploadProgress > 0 && (
                          <input type="range" value={uploadProgress} max="100">
                            {uploadProgress}%
                          </input>
                        )} */}
                      </div>
                    )}
                  </div>
                </div>
                <div className="create-course-form-input-div">
                  <label>
                    Duration
                    <span className="spanimp">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="in days"
                    className="dep-input w-75"
                  />
                </div>
                <div className="create-course-form-input-div">
                  <label>Excel Template</label>
                  <div className="chooseupload nowrap d-flex align-items-center pointer">
                    <img src={downloadicon} alt="downloadicon" />
                    <div className="mx-1" style={{ textDecoration: "none" }}>
                      Download Sample File
                    </div>
                  </div>
                </div>
                <div className="form-submit-row">
                  <div className="modal-outer-secondary-btn pointer" >
                    Cancel
                  </div>
                  <div
                    className="modal-outer-primary-btn pointer text-white py-1"
                    onClick={() => window.history.back()}
                  >
                    Add Course
                  </div>
                </div>
              </div>
            ) : (
              <div className="form-submit-row">
                <div className="modal-outer-secondary-btn pointer" onClick={() => window.history.back()}>Cancel</div>
                <div
                  className="modal-outer-primary-btn pointer text-white py-1"
                  onClick={() => addcourse()}
                >
                  Add Course
                </div>
              </div>
            )}
          </div>
          <div className="course-upload-content-div">
            {showPreview == true && uploadProgress == 100 ? (
              <div>accordian</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCourseForm;
