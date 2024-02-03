import React, { useContext, useEffect, useState } from "react";
import Table from "../component/Table";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import backIcon from "../assets/icons/backIcon.svg";
import { globalContext } from "../context/globalContext";
import TableCheckbox from "../component/TableCheckbox";
import fileEmpty from "../assets/img/fileEmpty.svg";
import searchIcon from "../assets/icons/searchIcon.svg";
import Loader from "../component/Loader";

const AnalyseFiles = () => {
  const { fileData, projectData, getFilesData, analysisData, analyseFiles, loading } =
    useContext(globalContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const { id1, id2 } = useParams();
  console.log(id2, "id2");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

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
  useEffect(() => {
    if (fileData?.length > 0) {
      setFilteredData(fileData);
    }
    else{
      setFilteredData([])
    }
  }, [fileData]);

  useEffect(() => {
    searchfunc(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    console.log(id1,"project name")
    getFilesData(id1);
  }, []);

  return (
    <div className="flex flex-col gap-[10px] ">
      <div className="w-full flex items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <img
            className=" h-4 w-4 cursor-pointer"
            src={backIcon}
            alt="back"
            onClick={() => navigate(-1)}
          />
          <div className=" text-xl text-[#424242] font-semibold">{id1}</div>
        </div>
        <div className="flex gap-4">
          {!loading &&  (
            <div className="flex rounded items-center justify-between gap-2 border border-[#D4D4D4] px-2 py-1 text-[#242424] bg-white">
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
          {!loading && (
            <button
              className={`flex items-center justify-between  rounded-md text-white px-7 py-1 ${selectedItems?.length>0?"bg-[#2D9596]":"bg-[#E3E3E3]"}`}
              onClick={() => {
                if (selectedItems?.length > 0) {
                   analyseFiles(selectedItems,id1);
                   setSelectedItems([])
                   navigate("/analyzer/analyze");
                }
                // if (!loading) {
                //   if (Object.keys(analysisData)?.length > 0) {
                //     navigate("/analyzer/analyze");
                //   }
                // }
              }}
            >
              Analyze
            </button>
          )}
        </div>
      </div>
      <div className="h-[calc(100%_-_40px)] w-full">
        {loading ? (
          <Loader className={"h-full"} text={"Fetching Files"} />
        ) : fileData?.length > 0 ? (
          <TableCheckbox
            projectData={filteredData}
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

export default AnalyseFiles;
