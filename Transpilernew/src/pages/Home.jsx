import React, { useContext, useEffect } from "react";
import welcomeBg from "../assets/svg/welcome_bg.svg";
import allFileImg from "../assets/svg/allFile.svg";
import analysisImg from "../assets/svg/analysis.svg";
import convertImg from "../assets/svg/convert.svg";
import testedImg from "../assets/svg/tested.svg";
import foldersImg from "../assets/svg/folders.svg";
import { globalContext } from "../context/globalContext";
import Table from "../component/Table";
import { useNavigate } from "react-router-dom";
import Loader from "../component/Loader";

const Home = () => {
  const navigate = useNavigate();
  const { projectData, adminMetrics, getprojectsData, getAdminMetrics, loading } =
    useContext(globalContext);
  const userName = sessionStorage.getItem("user-name");
  useEffect(() => {
    // if (projectData.length === 0) {
    getAdminMetrics()
    // getprojectsData();
    // }
  }, []);

  return (
    <div className="h-full w-full flex flex-col gap-4">
      <section className="w-full h-fit bg-[#E7F6F2] border border-[#E6E6E6] flex items-center justify-between pt-2 px-6 pb-1 rounded-md">
        <div className="w-8/12 flex flex-col">
          <p className="font-bold text-2xl text-[#242424]">
            Welcome {userName || "Admin"}
          </p>
          <p className="text-sm text-[#424242] ps-[2px] w-5/6">
            Transpiler is an efficient tool to analyze your codes, convert them
            into desired SQL language and test them efficiently.
          </p>
        </div>
        <div className="w-4/12 flex items-center justify-end">
          <img src={welcomeBg} alt="welcomeBg" className="me-6 h-40" />
        </div>
      </section>
      <section className="flex flex-col gap-1">
        <p className="font-medium text-xl text-[#242424]">Metrics</p>
        <div className="grid grid-cols-5 auto-rows-max gap-4">
          <div className="p-2 flex items-center gap-2 rounded-md border  border-[#E0E0E0] bg-white">
            <div className="h-12 w-12 rounded bg-[#EDFFF9] flex items-center justify-center">
              <img src={foldersImg} alt="allFileImg" className="h-[18px]" />
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-[#242424]">
                {adminMetrics?.total_folders || 0}
              </p>
              <p className="text-sm text-[#424242]">Total Folders</p>
            </div>
          </div>
          <div className="p-2 flex items-center gap-2 rounded-md border  border-[#E0E0E0] bg-white">
            <div className="h-12 w-12 rounded bg-[#EDFFF9] flex items-center justify-center">
              <img src={convertImg} alt="convertImg" className="h-6" />
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-[#242424]">
                {adminMetrics?.total_files || 0}
              </p>
              <p className="text-sm text-[#424242]">Total Files</p>
            </div>
          </div>
          <div className="p-2 flex items-center gap-2 rounded-md border  border-[#E0E0E0] bg-white">
            <div className="h-12 w-12 rounded bg-[#EDFFF9] flex items-center justify-center">
              <img src={allFileImg} alt="allFileImg" className="h-6" />
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-[#242424]">
                {adminMetrics?.files_converted || 0}
              </p>
              <p className="text-sm text-[#424242]">Files Converted</p>
            </div>
          </div>
          <div className="p-2 flex items-center gap-2 rounded-md border  border-[#E0E0E0] bg-white">
            <div className="h-12 w-12 rounded bg-[#EDFFF9] flex items-center justify-center">
              <img src={analysisImg} alt="analysisImg" className="h-6" />
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-[#242424]">
                {adminMetrics?.files_analysed || 0}
              </p>
              <p className="text-sm text-[#424242]">Files Analyzed</p>
            </div>
          </div>
          <div className="p-2 flex items-center gap-2 rounded-md border  border-[#E0E0E0] bg-white">
            <div className="h-12 w-12 rounded bg-[#EDFFF9] flex items-center justify-center">
              <img src={testedImg} alt="testedImg" className="h-6" />
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-[#242424]">
                {adminMetrics?.files_tested || 0}
              </p>
              <p className="text-sm text-[#424242]">Files Tested</p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-1 h-[calc(100%_-_300px)]">
        <div className="w-full flex items-center justify-between">
          <p className="font-medium text-xl text-[#242424]">Recent Projects</p>
          {projectData?.length > 0 && !loading && (
            <p
              className="font-medium text-sm text-[#242424] cursor-pointer"
              onClick={() => navigate("/projects")}
            >
              View All
            </p>
          )}
        </div>

        {loading ? (
          <Loader className={"h-[calc(100%_-_40px)]"} text={"Fetching Recent Projects"} />
        ) : (
          <Table
            type="projects"
            navigateTo="project"
            projectData={projectData?.slice(0, 5)}
            height={"max-h-[calc(100%_-_40px)] min-h-fit"}
            home="home"
          />
        )}
      </section>
    </div>
  );
};
export default Home;