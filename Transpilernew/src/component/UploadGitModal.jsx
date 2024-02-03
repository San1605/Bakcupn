
import React, { useContext, useEffect } from "react";
import close from "../assets/svg/close.svg";
import { useDropzone } from "react-dropzone";
import { globalContext } from "../context/globalContext";
import pdfFileIcon from "../assets/svg/pdfFile.svg";
import dropzoneUpload from "../assets/svg/dropzone.svg";

const UploadGitModal = ({
  show,
  setShow,
  width,
}) => {
  const handleSubmit = () => {
    setShow(false);
  };
    const handleDiscard = () => {
    setShow(false);
  };
  return (
    <div
      className={`fixed inset-0 z-50 overflow-auto transition-opacity ${
        show
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-center">
        <div className="modal-container pb-12 sm:pb-0">
          <div
            className={`modal-content sm:max-w-[80%] w-[90%] sm:mx-auto my-0 mx-0  ${
              width ? `sm:w-[${width}%]` : "sm:w-[50%]"
            }`}
          >
            <div className="modal-header flex items-center justify-between px-6 py-4 border-b-[1px] border-[#E0E0E0]">
              <h1 className="text-base tracking-wide neue-m font-medium text-[#242424]">
                Upload Git URL
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
                <div className="flex flex-col gap-2">
                  <input
                    type="url"
                    name="url"
                    id="url"
                    className="py-2 px-2.5 border border-[#D0D5DD] text-sm rounded focus-visible:outline-none"
                    placeholder="Enter URL"
                  />
                </div>
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

export default UploadGitModal;
