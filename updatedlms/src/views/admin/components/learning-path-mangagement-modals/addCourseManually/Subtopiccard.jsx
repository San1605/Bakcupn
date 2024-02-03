import React from "react";
import Dropzone from "react-dropzone";
import uploadicon from "../../../assets/courseManagement/upload.svg";
import { AiOutlineUpload } from "react-icons/ai";
import removeicon from "../../../assets/courseManagement/remove.svg";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import RichTextEditor from "react-rte";
import Linkchecker from "./Linkchecker";

function Subtopiccard({ coursearray, setCoursearray, dataval }) {
  const [allFile, setAllFile] = useState("");
  const [allFileSize, setAllFileSize] = useState(allFile.size);
  const [uploadProgress, setUploadProgress] = useState(100);
  const [addType, setAddType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [refmaterial, setRefmaterial] = useState("");
  const [content, setContent] = useState("");
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());

  const onDropAll = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setAllFile(acceptedFiles[0]);
    }
  };
  useEffect(() => {
    if (
      Object.keys(
        coursearray[Number(dataval.split(".")[0])].value[
          Number(dataval.split(".")[1])
        ].value
      ).length > 0
    ) {
      const dataobj =
        coursearray[Number(dataval.split(".")[0])].value[
          Number(dataval.split(".")[1])
        ].value;
      setTitle(dataobj.title);
      setDescription(dataobj.description);
      setRefmaterial(dataobj.refmaterial);
      setContent(dataobj.content);
      setAddType(dataobj.addType);
      const savedFileSize = dataobj.allFileSize;
      const savedFileName = dataobj.filename;
      const savedFileURL = dataobj.allFile;
      if (dataobj.addType == "articleWritten" && dataobj.content !== "") {
        setValue(RichTextEditor.createValueFromString(dataobj.content, "html"));
      }
      if (savedFileURL) {
        const savedBlob = new Blob([savedFileURL]);
        const savedFileObj = new File([savedBlob], savedFileName);

        setAllFile(savedFileObj);
        setAllFileSize(savedFileSize);
      } else {
        setAllFile("");
        setAllFileSize("");
      }
    } else {
      setTitle("");
      setDescription("");
      setRefmaterial("");
      setContent("");
      setAddType("");
      setAllFile("");
      setAllFileSize("");
      setValue(RichTextEditor.createEmptyValue());
    }
  }, [dataval]);
  useEffect(() => {
    if (allFile.size > 1000000) {
      setAllFileSize((allFile.size / 1024 / 1024).toFixed(2) + `Mb`);
    } else {
      setAllFileSize((allFile.size / 1024).toFixed(2) + `Kb`);
    }
  }, [allFile, allFileSize]);
  useEffect(() => {
    if (addType == "articleLink") {
      setValue(RichTextEditor.createValueFromString(content, "html"));
    }
  }, []);
  const settingsubtopic = (data) => {
    const temp = coursearray.map((elem, index) => {
      if (index == Number(dataval.split(".")[0])) {
        let innertemp = elem;
        innertemp.value = elem.value.map((el, ind) => {
          if (ind == Number(dataval.split(".")[1])) {
            return { ...el, value: data };
          } else {
            return el;
          }
        });
        return innertemp;
      } else {
        return elem;
      }
    });
    setCoursearray(temp);
    toast.success("Saved");
    // setTitle("");
    // setContent("");
    // setDescription("");
    // setValue(RichTextEditor.createEmptyValue());
    // setAllFile("");
  };
  const savesubtopic = () => {
    if (allFile !== "") {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (title !== "" && content !== "") {
          const data = {
            title: title,
            description: description,
            addType: addType,
            content: content,
            refmaterial: refmaterial,
            allFile: event.target.result,
            filename: allFile.name,
            allFileSize: allFileSize,
          };
          if (addType == "articleLink" || addType == "Video") {
            if (Linkchecker(content)) {
              settingsubtopic(data);
            } else {
              toast.error("the link you provided is inappropriate");
            }
          } else {
            settingsubtopic(data);
          }
        } else {
          toast.error("Mandatory Fields can't be empty");
        }
      };

      reader.readAsText(allFile);
    } else {
      if (title !== "" && content !== "") {
        const data = {
          title: title,
          description: description,
          addType: addType,
          content: content,
          refmaterial: refmaterial,
          allFile: allFile,
          allFileSize: allFileSize,
        };
        if (addType == "articleLink" || addType == "Video") {
          if (Linkchecker(content)) {
            settingsubtopic(data);
          } else {
            toast.error("the link you provided is inappropriate");
          }
        } else {
          settingsubtopic(data);
        }
      } else {
        toast.error("Mandatory Fields can't be empty");
      }
    }
  };
  return (
    <div className="h-100 bg-white">
      <div className="subtopic-detail inner-field">
        <div className="inner-field-head">
          {Number(dataval.split(".")[0]) + 1 + "." + dataval.split(".")[1]}{" "}
          Subtopic
        </div>
        <div className="edit-department-input-div">
          <label style={{ fontWeight: "500" }}>
            Title
            <span className="spanimp">*</span>
          </label>
          <input
            type="text"
            className="dep-input"
            placeholder="Enter Subtopic Title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="edit-department-input-div">
          <label style={{ fontWeight: "500" }}>
            Description
            <span className="optional-field">(Optional)</span>
          </label>
          <textarea
            rows={2}
            className="dep-input"
            placeholder="Enter Description here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="edit-department-input-div">
          <label style={{ fontWeight: "500" }}>Reference Material</label>
          <input
            type="text"
            className="dep-input"
            placeholder="Enter URL"
            value={refmaterial}
            onChange={(e) => setRefmaterial(e.target.value)}
          />
        </div>
        <div className="edit-department-input-div">
          <label style={{ fontWeight: "500" }}>Downloadable File</label>
          <div
            className="dropzone-div"
            style={
              allFile !== ""
                ? {
                    border: "none",
                  }
                : null
            }
          >
            {allFile == "" ? (
              <Dropzone
                onDrop={onDropAll}
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
                <div className="upload-progress w-100">
                  <p>
                    {allFile.name}
                    <img
                      src={removeicon}
                      alt="removeicon"
                      onClick={() => setAllFile("")}
                    />
                  </p>
                  <input
                    type="range"
                    name="uploadProgress w-100"
                    id="excelUploadProgress"
                  />
                  <p>
                    {allFileSize}
                    <span>{uploadProgress}%</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="edit-department-input-div">
          <label style={{ fontWeight: "500" }}>
            Upload Subtopic Content (any one is mandatory)
            <span className="spanimp">*</span>
          </label>
          <div className="radio-options-div">
            <div
              className="d-flex align-items-center"
              style={{ width: "fit-content" }}
            >
              <input
                type="radio"
                id="Paste Video Link"
                name="Add Content"
                value="Paste Video Link"
                className="inputRadio pt-2"
                checked={addType == "Video"}
                onClick={() => {
                  setContent("");
                  setAddType("Video");
                }}
              />
              <label
                htmlFor="Paste Video Link"
                style={{ whiteSpace: "nowrap" }}
              >
                Paste Video Link
              </label>
            </div>
            <div
              className="d-flex align-items-center"
              style={{ width: "fit-content" }}
            >
              <input
                type="radio"
                id="Paste Article Link"
                name="Add Content"
                value="Paste Article Link"
                className="inputRadio pt-2"
                checked={addType == "articleLink"}
                onClick={() => {
                  setContent("");
                  setAddType("articleLink");
                }}
              />
              <label
                htmlFor="Paste Article Link"
                style={{ whiteSpace: "nowrap" }}
              >
                Paste Article Link
              </label>
            </div>
            <div
              className="d-flex align-items-center"
              style={{ width: "fit-content" }}
            >
              <input
                type="radio"
                id="Create Custom Article"
                name="Add Content"
                value="Create Custom Article"
                className="inputRadio pt-2"
                checked={addType == "articleWritten"}
                onClick={() => {
                  setContent("");
                  setAddType("articleWritten");
                }}
              />
              <label
                htmlFor="Create Custom Article"
                style={{ whiteSpace: "nowrap" }}
              >
                Create Custom Article
              </label>
            </div>
          </div>
        </div>
        {addType === "Video" && (
          <div className="edit-department-input-div">
            <label style={{ fontWeight: "500" }}>
              Paste a link to the video for content.
              <span className="spanimp">*</span>
            </label>
            <input
              type="text"
              className="dep-input"
              placeholder="Paste Video Link"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        )}
        {addType === "articleLink" && (
          <div className="edit-department-input-div">
            <label style={{ fontWeight: "500" }}>
              Paste a link to the article for content.
            </label>
            <input
              type="text"
              className="dep-input"
              placeholder="Paste Article Link"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        )}
        {addType === "articleWritten" && (
          <div className="edit-department-input-div">
            <div>
              <RichTextEditor
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                className="RichTextEditor"
              />
              <button
                className="modal-outer-primary-btn manual-final-submit text-white py-1 me-2 mt-2"
                onClick={() => {
                  console.log(value.toString("html").length, "html");
                  if (value.toString("html") !== "<p><br></p>") {
                    setContent(value.toString("html"));
                    toast.success("document has been updated");
                  } else {
                    toast.error("document is empty");
                  }
                }}
              >
                Save this Article
              </button>
            </div>
          </div>
        )}
        <div className="save-discard-div">
          <div
            className="discard modal-outer-secondary-btn"
            onClick={() => {
              setTitle("");
              setContent("");
              setDescription("");
              setValue(RichTextEditor.createEmptyValue());
              setAllFile("");
            }}
          >
            Discard
          </div>
          <div
            className="savedraft modal-outer-primary-btn text-white py-1"
            onClick={() => savesubtopic()}
          >
            Save as Draft
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subtopiccard;
