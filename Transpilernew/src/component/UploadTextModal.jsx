
import React, { useContext, useState } from "react";
import close from "../assets/svg/close.svg";
import { globalContext } from "../context/globalContext";
import { Editor } from "@monaco-editor/react";

const UploadTextModal = ({
  show,
  setShow,
  projectName,
  width,
}) => {
  console.log(projectName,"inside textmodal")
  const { uploadtext } = useContext(globalContext);
  const [textUpload,setTextUpload] = useState("")

  const handleSubmit = () => {
    if (textUpload.trim() !== "") {
      uploadtext(textUpload, projectName);
    }
    setShow(false);
    setTextUpload("");
  };

  const handleDiscard = () => {
    setTextUpload("");
    setShow(false);
  };
  // const [editorValue, setEditorValue] = useState("");
  return (
    <div
      className={`fixed inset-0 z-50 overflow-auto transition-opacity ${show
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
        }`}
    >
      <div className="flex items-center justify-center">
        <div className="modal-container pb-12 sm:pb-0">
          <div
            className={`modal-content sm:max-w-[80%] w-[90%] sm:mx-auto my-0 mx-0  ${width ? `sm:w-[${width}%]` : "sm:w-[50%]"
              }`}
          >
            <div className="modal-header flex items-center justify-between px-6 py-4 border-b-[1px] border-[#E0E0E0]">
              <h1 className="text-base tracking-wide neue-m font-medium text-[#242424]">
                Enter Code
              </h1>
              <p
                className="cursor-pointer"
                onClick={() => {
                  setShow(false);
                }}
              >
                <img src={close} alt="close " className="h-4" />
              </p>
            </div>
            <div className="modal-body">
              <div className="inner py-4 px-6">
                <Editor
                  defaultLanguage="abap"
                  value={textUpload}
                  onChange={(value) => setTextUpload(value)}
                  placeholder="language1"
                  className="min-h-[220px]"
                />
              </div>
              <div className="btn-cont flex p-6 justify-end gap-[15px] bg-[#F3F3F3]">
                <button
                  className=" text-sm neue-r tracking-wide border border-[#d1d1d1] bg-white text-[#424242] rounded px-6 py-1.5"
                  onClick={() => {
                    handleDiscard();
                  }}
                >
                  Discard
                </button>
                <button
                  className="text-sm rounded bg-[#2D9596] neue-r tracking-wide px-6 py-1.5 text-white"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadTextModal;
