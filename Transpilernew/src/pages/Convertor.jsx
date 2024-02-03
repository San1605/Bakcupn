import React, { useContext, useEffect, useState } from "react";
import Table from "../component/Table";
import searchIcon from "../assets/icons/searchIcon.svg";
import { globalContext } from "../context/globalContext";
import fileEmpty from "../assets/img/fileEmpty.svg";
import Loader from "../component/Loader";
import LoaderText from "../component/LoaderText";
const Convertor = () => {
  const { projectData, getprojectsData, loading } =
    useContext(globalContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  function searchfunc(value) {
    const arr = projectData.filter(
      (item) =>
        item?.project_name?.toLowerCase().includes(value.toLowerCase()) ||
        item?.project_date_modified?.toLowerCase().includes(value.toLowerCase())
    );
    console.log(arr, "arr");
    setFilteredData(arr);
  }
  useEffect(() => {
    if (projectData?.length > 0) {
      setFilteredData(projectData);
    }
  }, [projectData]);

  useEffect(() => {
    // if (projectData.length === 0) {
      getprojectsData();
    // }
  }, []);

  useEffect(() => {
    searchfunc(searchQuery);
  }, [searchQuery]);

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="w-full flex items-center justify-between h-[35px]">
        <div className="flex items-center gap-4 w-full justify-between">
          <div className=" text-xl text-[#424242] font-medium">Projects</div>
          {!loading && (
            <div className="flex rounded-md items-center justify-between gap-2 border border-[#D4D4D4] px-2 py-1 text-[#242424] bg-white">
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
        </div>
      </div>

      <div className="flex flex-col justify-between h-[calc(100%_-_45px)] gap-3 w-full bg-white">
        {loading ? (
          <LoaderText  className={"h-full w-full"} />
        ) : filteredData?.length > 0 ? (
          <Table
            type="projects"
            navigateTo="convertor"
            projectData={filteredData}
          />
        ) : (
          <div className="h-full flex flex-col justify-center items-center gap-2">
            <img src={fileEmpty} alt="emptyImg" />
            <div className=" h-14  w-[40%] text-[#595959] flex justify-center items-center">
            Please add a Project to Convert
            </div>
          </div>
        )}
      </div>


    </div>
  );
};
export default Convertor;
