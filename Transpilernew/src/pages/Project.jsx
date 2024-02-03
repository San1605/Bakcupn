import React, { useContext, useEffect, useState } from "react";
import Table from "../component/Table";
import { globalContext } from "../context/globalContext";
import searchIcon from "../assets/icons/searchIcon.svg";
import plusIcon from "../assets/icons/plusIcon.svg";
import fileEmpty from "../assets/img/fileEmpty.svg";
// import Pagination from "../component/Pagination";
import Modal from "../component/Modal";
import Loader from "../component/Loader";
import TableAccordian from "../component/TableAccordian";
import LoaderText from "../component/LoaderText";
// import TableCollapsible from "../component/TableCollapsible";
const Project = () => {
  const { projectData, getprojectsData, loading } = useContext(globalContext);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [show, setShow] = useState(false);
  const [projectNameInput, setProjectNameInput] = useState("");

  function searchfunc(value) {
    const arr = projectData.filter((item) =>
      item?.project_name?.toLowerCase().includes(value.toLowerCase()) ||
      item?.project_date_modified?.toLowerCase().includes(value.toLowerCase())
    );
    console.log(arr, "arr")
    setFilteredData(arr)
  }

  useEffect(() => {
    searchfunc(searchQuery)
  }, [searchQuery])

  useEffect(() => {
    // if(projectData.length===0){
    setFilteredData([])
    getprojectsData();
    // }
  }, [])



  useEffect(() => {
    // if (projectData?.length > 0) {
      setFilteredData(projectData)
    // }
  }, [projectData]
  )

  return (
    <div className="flex flex-col gap-[10px]">
      <Modal
        show={show}
        setShow={setShow}
        header={"Project Name"}
        setProjectNameInput={setProjectNameInput}
        projectNameInput={projectNameInput}
      />
      <div className="w-full flex items-center justify-between h-[35px]">
        <div className="flex items-center gap-4">
          <div className=" text-xl text-[#424242] font-medium">Projects</div>
        </div>
        <div className="flex items-center gap-4">
          {!loading && <div className="flex rounded-md items-center justify-between gap-2 border border-[#D4D4D4] px-2 py-1 text-[#242424] bg-white">
            <img src={searchIcon} alt="search" className="h-5" />
            <input
              type="text"
              placeholder="Search here"
              className="text-sm outline-none h-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>}
          {!loading && <button
            className="flex rounded items-center justify-between gap-2 border border-[#2D9596] px-3 py-1 text-[#242424] text-sm"
            onClick={() => {
              setShow(true);
            }}
          >
            <img src={plusIcon} alt="plus" className="w-4" />
            Create
          </button>}
        </div>
      </div>
      {/* <div className="flex flex-col justify-between h-[calc(100%_-_45px)] gap-3 w-full bg-white">
        {loading ? <Loader className={"h-full"} /> :
        <Table
        type="projects"
        navigateTo="project"
        projectData={filteredData}
        />
      }
      </div> */}



      <div className="flex flex-col justify-between h-[calc(100%_-_45px)] gap-3 w-full bg-white">
        {loading ? (
          <LoaderText className={"h-full"} />
        ) : filteredData?.length > 0 ? (
          <TableAccordian
            type="projects"
            navigateTo="project"
            projectData={filteredData}
          />
          //   <TableCollapsible
          //   type="projects"
          //   navigateTo="project"
          //   projectData={filteredData}
          // />
        ) : (
          <div className="h-full flex flex-col justify-center items-center gap-2">
            <img src={fileEmpty} alt="emptyImg" />
            <div className=" h-14  w-[40%] text-[#595959] flex justify-center items-center">
              Please Create a new project
            </div>
          </div>
        )}
      </div>




    </div>
  );
};
export default Project;