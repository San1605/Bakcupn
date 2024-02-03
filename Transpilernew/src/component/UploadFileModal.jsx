import React, { useContext, useEffect, useState } from "react";
import close from "../assets/svg/close.svg";
import { useDropzone } from "react-dropzone";
import { globalContext } from "../context/globalContext";
import pdfFileIcon from "../assets/svg/pdfFile.svg";
import dropzoneUpload from "../assets/svg/dropzone.svg";
import fileEmpty from "../assets/img/fileEmpty.svg";

const UploadFileModal = ({ show, setShow, width, projectName }) => {
  const { projectData, uploadFile } = useContext(globalContext);
  const [fileList, setFileList] = useState([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    // accept: {
    //   "application/pdf": [".pdf"],
    // },
    accept: {
      // ".abap": [".abap"],
      'text/plain': ['.txt']
    },

    
  
    minSize: 0,
    maxSize: 5242880,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        // props.setUploadFileData(acceptedFiles[0]);
      }
    },
  });
  const removefile = (fileIndex) => {
    const updatedFileList = fileList.filter(
      (file, index) => index !== fileIndex
    );
    setFileList(updatedFileList);
  };
  useEffect(() => {
    if (acceptedFiles.length > 0) {
      console.log(acceptedFiles, "acceptedFiles");
      setFileList((prevFileList) => [...prevFileList, ...acceptedFiles]);
    }
  }, [acceptedFiles]);

  const handleSubmit = () => {
    if (fileList?.length > 0) {
      uploadFile(fileList, projectName);
    }
    setFileList([]);
    setShow(false);
  };
  const handleDiscard = () => {
    setFileList([]);
    setShow(false);
  };
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
                Upload Files
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
                {" "}
                <div className="w-full py-1 flex">
                  <div className="w-1/2">
                    <div
                      {...getRootProps({ className: "dropzone" })}
                      className="h-[300px] w-full flex flex-col gap-1 items-center justify-center border border-dashed border-[#2D9596] bg-[#F6FAFA] rounded"
                    >
                      <input {...getInputProps()} />
                      <img src={dropzoneUpload} alt="upload" />
                      <div className="text-sm font-medium">
                        Drag & drop files or
                        <span className="ps-1 text-[#2D9596] underline underline-offset-2">
                          {" "}
                          Browse
                        </span>
                      </div>
                      <p className="text-sm">Supported formates: .txt</p>
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col gap-2 ps-4">
                    <p className="font-medium">Uploaded Files</p>
                    <div className="max-h-[264px]  justify-between w-full flex flex-col gap-2 pt-1 overflow-y-auto">
                      {fileList?.length > 0 ?
                        fileList.map((el, i) => {
                          return (
                            <div
                              className="bg-[#F6F6F6] w-full flex items-center justify-between p-1 pe-3 rounded"
                              key={i}
                            >
                              <div className="flex items-center gap-1 max-w-[90%]">
                                <img
                                  src={pdfFileIcon}
                                  alt="pdfFileIcon"
                                  className="h-8"
                                />
                                <div className="text-sm w-[90%] overflow-hidden text-ellipsis whitespace-nowrap">
                                  {el.name}
                                </div>
                              </div>
                              <div
                                className="flex items-center w-fit"
                                onClick={() => removefile(i)}
                              >
                                <img
                                  src={close}
                                  alt="close"
                                  className="h-3 cursor-pointer"
                                />
                              </div>
                            </div>
                          );
                        })
                        : <div className="h-full  flex flex-col justify-center items-center gap-2">
                          <img className="h-[calc(100%_-_56px)] w-full " src={fileEmpty} alt="emptyImg" />
                          <div className=" h-14  w-[40%] text-[#595959] flex justify-center items-center">
                            Please Add a file
                          </div>
                        </div>
                      }
                    </div>
                  </div>
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

export default UploadFileModal;
