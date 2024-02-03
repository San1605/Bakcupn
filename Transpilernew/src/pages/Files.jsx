import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import backIcon from "../assets/icons/backIcon.svg";
import { globalContext } from "../context/globalContext";
import searchIcon from "../assets/icons/searchIcon.svg";
import downIcon from "../assets/svg/chevronDown.svg";
import uploadFileImg from "../assets/svg/uploadFile.svg";
import codeText from "../assets/svg/code.svg";
import fileEmpty from "../assets/img/fileEmpty.svg";
import TableFiles from "../component/TableFiles";
import UploadFileModal from "../component/UploadFileModal";
import UploadTextModal from "../component/UploadTextModal";
import UploadGitModal from "../component/UploadGitModal";
import Loader from "../component/Loader";
import githubLink from "../assets/svg/github.svg";
const Files = () => {
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef();
  const {
    projectData,
    fileData,
    deleteFiles,
    getFilesData,
    loading
  } = useContext(globalContext);
  const { id1, id2 } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [uploadType, setUploadType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  function searchfunc(value) {
    const arr = fileData.filter(
      (item) =>
        item?.file_name?.toLowerCase().includes(value.toLowerCase()) ||
        item?.date_modified?.toLowerCase().includes(value.toLowerCase()) ||
        item?.file_format?.toLowerCase().includes(value.toLowerCase())
    );
    console.log(arr, "arr");
    setFilteredData(arr);
  }

  const outsideClose = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setShowPopover(false);
    }
  };

  const handleUploadType = (type) => {
    setUploadType(type);
    setShowPopover(false);
    setShow(true);
  };

  console.log(filteredData,'filterData')
  useEffect(() => {

    if (fileData?.length > 0) {
      setFilteredData(fileData);
    }
    else{
      setFilteredData([]);
    }
  }, [fileData]);

  useEffect(() => {
    searchfunc(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    getFilesData(id1);
    document.addEventListener("click", outsideClose);
    return () => {
      document.removeEventListener("click", outsideClose);
    };
  }, []);
  const multipleDelete = () => {
    const fileNameArray = [];
    selectedItems.forEach((item) =>
      fileNameArray.push(`${id1}/${item?.fileName}`)
    );
    console.log(fileNameArray, "mmmmmmmmmmmmmmmmmmmmmm");
    deleteFiles(fileNameArray, id1);
    setSelectedItems([])
  };



  return (
    <div className="flex flex-col gap-[10px]">
      {uploadType === "file" ? (
        <UploadFileModal
          show={show}
          setShow={setShow}
          width={70}
          projectName={id1}
        />
      ) : uploadType === "url" ? (
        <UploadGitModal show={show} setShow={setShow} />
      ) : (
        uploadType === "text" && (
          <UploadTextModal
            show={show}
            setShow={setShow}
            width={70}
            projectName={id1}
          />
        )
      )}

      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            className=" h-4 w-4 cursor-pointer"
            src={backIcon}
            alt="back"
            onClick={() => {
              navigate(-1);
            }}
          />
          <div className=" text-xl text-[#424242] font-semibold">{id1}</div>
        </div>
      {!loading &&
        <div className="flex items-center gap-4">
          { (
            <div className="flex rounded items-center justify-between gap-2 border border-[#D4D4D4] px-2 py-1.5 text-[#242424] bg-white">
              <img src={searchIcon} alt="search" className="h-5" />
              <input
                type="text"
                placeholder="Search here"
                className="text-sm outline-none h-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}

          {filteredData?.length > 0 && (
            <button
              className={`flex rounded items-center justify-between gap-2 border px-3 py-1.5 text-white text-sm ${
                selectedItems?.length > 0 ? "bg-red-500" : "bg-[#E3E3E3]"
              }`}
              onClick={multipleDelete}
            >
              Delete files
            </button>
          )}

          {!loading && (
            <div className="relative">
              <div
                className={`flex rounded items-center border border-[#2D9596] text-[#242424] h-[32px] text-sm cursor-pointer hover:bg-[#2D959614] ${
                  showPopover && "bg-[#2D95961F]"
                }`}
                onClick={(event) => {
                  event.stopPropagation();
                  setShowPopover(!showPopover);
                }}
              >
                <div className="h-full flex items-center px-5 border-r border-[#2D9596] text-sm">
                  Add
                </div>
                <img src={downIcon} alt="plus" className="" />
              </div>
              {showPopover && (
                <div
                  className="bg-white   absolute bottom-[-128px] rounded right-0 w-[140px] flex flex-col items-start shadow-[0_3px_4px_0px_#e4e4e4] border border-[#E0E0E0]  z-10"
                  ref={popoverRef}
                >
                  <div
                    className="flex items-center gap-2 text-[14px] py-2.5 px-3 w-full cursor-pointer hover:bg-[#f8f8f8]"
                    onClick={() => handleUploadType("file")}
                  >
                    <img
                      src={uploadFileImg}
                      alt="uploadFile"
                      className="w-[16px]"
                    />
                    Upload Files
                  </div>
                  <div
                    className="flex items-center gap-2 text-[14px] py-2.5 px-3 w-full cursor-pointer hover:bg-[#f8f8f8]"
                    onClick={() => handleUploadType("text")}
                  >
                    <img src={codeText} alt="codeText" className="w-[16px]" />
                    Text
                  </div>
                  <div
                    className="flex items-center gap-2 text-[14px] py-2.5 px-3 w-full cursor-pointer hover:bg-[#f8f8f8]"
                    onClick={() => handleUploadType("url")}
                  >
                    <img
                      src={githubLink}
                      alt="githubLink"
                      className="w-[16px]"
                    />
                    Github Url
                  </div>
                </div>
              )}
            </div>
          )}
        </div>}
      </div>

      <div className="h-[calc(100%_-70px)] w-full">
        {
        loading ? (
          <Loader className={"h-full"} text={"Fetching Files"}/>
        ) : 
        
        fileData?.length > 0 ? (
          <TableFiles
            projectData={filteredData}
            projectName={id1}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        ) : (
          <div className="h-full flex flex-col justify-center items-center gap-2">
            <img src={fileEmpty} alt="emptyImg" />
            <div className=" h-14  w-[40%] text-[#595959] flex justify-center items-center">
              To view files, kindly upload the files, provide the text, or share
              the Git URL.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Files;