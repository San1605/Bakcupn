import React, { useContext, useEffect, useState } from "react";
import NeedleChart from "../component/NeedleChart";
import { useNavigate } from "react-router-dom";
import backIcon from "../assets/icons/backIcon.svg";
import gridView from "../assets/svg/gridView.svg";
import tableView from "../assets/svg/TableView.svg";
import fileEmpty from "../assets/img/fileEmpty.svg";
import fileImg from "../assets/svg/pdfFile.svg";
import { globalContext } from "../context/globalContext";
import Loader from "../component/Loader";
import { PieChart, Pie, Cell } from "recharts";
import CountUp from "react-countup";
import downloadIcon from "../assets/icons/downloadIcon.svg";
import LoaderAnalysis from "../component/LoaderAnalysis";
// import backIcon from "../assets/icons/backIcon.svg";

const Analyse = () => {
  const navigate = useNavigate();
  const { analysisData, loading, downloadAnalysis } = useContext(globalContext);
  const [isChecked, setIsChecked] = useState(false);
  const [ComplexityType, setComplexityType] = useState("");
  const [analysisDataOne, setAnalysisDateOne] = useState(false);
  useEffect(() => {
    const cumulativeComplexity =
    analysisData[Object.keys(analysisData)[0]]
    ?.cumulative_complexity;

    if (cumulativeComplexity <= 33) {
      setComplexityType("Low");
    } else if (cumulativeComplexity <= 66) {
      setComplexityType("Medium");
    } else if (cumulativeComplexity <= 100) {
      setComplexityType("High");
    } else {
      setComplexityType("High");
    }
  }, [analysisData]);

  useEffect(() => {
    if (Object.keys(analysisData)?.length > 0) {
      const fileData = analysisData[Object.keys(analysisData)[1]];
      setAnalysisDateOne(false);
      if (fileData?.length > 0) {
        console.log(Object.keys(fileData[0])?.length, "filedata");
        console.log(analysisDataOne, "analysisDataOne");
        if (Object.keys(fileData[0])?.length === 1) {
          console.log(analysisDataOne, "analysisDataOneinside");
          setAnalysisDateOne(true);
        }
      }
    }
  }, [analysisData]);

  console.log(analysisData);

  const AnimationDonut = ({ color }) => {
    const data = [{ value: 100 }];
    return (
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          startAngle={200}
          endAngle={-20}
          innerRadius={60}
          outerRadius={80}
          fill="#000"
        >
          <Cell key={`cell-1`} fill={color} />
        </Pie>
      </PieChart>
    );
  };

  return (
    <div className="flex flex-col ">
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex items-center gap-4">
          <div className="flex items-center justify-between gap-4">
            <img
              className=" h-4 w-4 cursor-pointer"
              src={backIcon}
              alt="back"
              onClick={() => navigate(-1)}
            />
            <div className=" text-xl text-[#424242] font-medium">
              Analysed Output
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-end relative">
          <div className="flex items-center gap-2 w-fit">
            {/* <p className="text-[#424242]">View:</p> */}
            {analysisData &&
              !loading &&
              Object.keys(analysisData)?.length > 0 && (
                <div className="flex items-center gap-3 w-fit">
                  <div
                    className={`p-1 cursor-pointer ${!isChecked && "bg-[#f0f0f0]"
                      }`}
                    onClick={() => {
                      setIsChecked(false);
                    }}
                  >
                    <img
                      src={gridView}
                      alt="kpi view"
                      className="h-5"
                      title="Cumulative view"
                    />
                  </div>
                  <div
                    className={`p-1 cursor-pointer ${isChecked && "bg-[#f0f0f0]"
                      }`}
                    onClick={() => {
                      setIsChecked(true);
                    }}
                  >
                    <img src={tableView} alt="grid view" title="File view" />
                  </div>

                  <button
                    className="flex rounded items-center justify-between gap-2 border border-[#2D9596] px-3 py-1 text-[#242424] text-sm"
                    onClick={() => downloadAnalysis()}
                  >
                    <img src={downloadIcon} alt="plus" className="w-4 cursor-pointer" />
                    Download Report
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
      <div className="flex flex-col h-[calc(100%_-_35px)] w-full mt-2">
        <div className="w-full h-full overflow-y-auto mt-2 flex flex-col gap-3">
          {loading ? (
            <LoaderAnalysis className={"h-full"} />
          ) : analysisData && Object.keys(analysisData)?.length > 0 ? (
            isChecked ? (
              <div className={`relative overflow-x-auto sm:rounded-sm h-full`}>
                {console.log(
                  analysisData[Object.keys(analysisData)[1]],
                  "data Check"
                )}
                <table className="w-full text-sm text-left rtl:text-right font-normal shadow-sm  bg-white z-0">
                  <thead className="text-sm text-[#242424]  bg-[#ebebeb]  sticky top-0 z-10">
                    <tr>
                      <th scope="col" className="px-3 py-3 w-2/12">
                        File Name
                      </th>
                      <th scope="col" className="px-3 py-3 w-1/12">
                        Dependency
                      </th>
                      <th scope="col" className="px-3 py-3 w-0.5/12">
                        LOC
                      </th>
                      <th scope="col" className="px-3 py-3 w-1/12">
                        Variables
                      </th>
                      {/* <th scope="col" className="px-3 py-3 w-1/12">
                        Macros
                      </th> */}
                      <th scope="col" className="px-3 py-3 w-2/12">
                        No. of Scripts
                      </th>
                      <th scope="col" className="px-3 py-3 w-0.5/12">
                        Loops
                      </th>
                      <th scope="col" className="px-3 py-3 w-2/12">
                        User Defined Module
                      </th>
                      <th scope="col" className="px-3 py-3 w-2/12">
                      Predefined Macros/Functions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {analysisData[Object.keys(analysisData)[1]] &&
                    analysisData[Object.keys(analysisData)[1]]?.length > 0 &&
                    analysisData[Object.keys(analysisData)[1]]?.map(
                      (item, index) => {
                       return  Object.keys(item)?.map((ele, idx) => (
                        
                        ));
                     
                      }
                    )} */}

                    {analysisData[Object.keys(analysisData)[1]] &&
                      analysisData[Object.keys(analysisData)[1]]?.length > 0 &&
                      analysisData[Object.keys(analysisData)[1]]?.map(
                        (item, index) =>
                          Object.keys(item)?.map((ele, idx) => {
                            return (
                              <tr
                                key={index}
                                className="bg-white cursor-pointer hover:bg-[#c9c9c920] border-b border-[#e0e0e0] last:border-0"
                              >
                                {console.log(ele, "itemmmmmmmmmmmmmmmmm")}
                                <td className="p-3 font-normal text-[#242424]  whitespace-nowrap w-2/12">
                                  <div className="flex gap-2.5">
                                    <img src={fileImg} alt="" />
                                    {ele}
                                  </div>
                                </td>
                                <td className="p-3 font-normal text-[#242424] whitespace-nowrap w-1/12">
                                  {item[ele]?.dep_perct}
                                </td>
                                <td className="p-3 font-normal text-[#242424] whitespace-nowrap w-0.5/12">
                                  {item[ele]?.loc}
                                </td>
                                <td className="p-3 font-normal text-[#242424] whitespace-nowrap w-1/12">
                                  {item[ele]?.variable_count}
                                </td>
                                {/* <td className="p-3 font-normal text-[#242424] whitespace-nowrap w-1/12">
                                  {item[ele]?.macro_count}
                                </td> */}
                                <td className="p-3 font-normal text-[#242424] whitespace-nowrap w-2/12">
                                  {item[ele]?.num_of_Scripts}
                                </td>
                                <td className="p-3 font-normal text-[#242424] whitespace-nowrap w-0.5/12">
                                  {item[ele]?.num_of_loops}
                                </td>
                                <td className="p-3 font-normal text-[#242424] whitespace-nowrap w-2/12">
                                  {item[ele]?.user_def_module}
                                </td>
                                <td className="p-3 font-normal text-[#242424] whitespace-nowrap w-2/12">
                                  {item[ele]?.pre_def_module}
                                </td>
                              </tr>
                            );
                          })
                      )}

                    {!analysisDataOne && (
                      <tr className="bg-white cursor-pointer border-b border-[#e0e0e0] last:border-0 sticky bottom-0">
                        <td className="p-3 font-medium bg-[#f0f0f0] text-[#242424]  whitespace-nowrap w-2/12">
                          <div className="flex gap-2.5">Total</div>
                        </td>
                        <td className="p-3 font-medium bg-[#f0f0f0] text-[#242424] whitespace-nowrap w-1/12">
                          {
                            analysisData[Object.keys(analysisData)[0]]
                              ?.dependency_perct
                          }
                        </td>
                        <td className="p-3 font-medium bg-[#f0f0f0] text-[#242424] whitespace-nowrap w-0.5/12">
                          {
                            analysisData[Object.keys(analysisData)[0]]
                              ?.cumulative_loc
                          }
                        </td>
                        <td className="p-3 font-medium bg-[#f0f0f0] text-[#242424] whitespace-nowrap w-1/12">
                          {
                            analysisData[Object.keys(analysisData)[0]]
                              ?.cumulative_variable_count
                          }
                        </td>
                        {/* <td className="p-3 font-medium bg-[#f0f0f0] text-[#242424] whitespace-nowrap w-1/12">
                          {
                            analysisData[Object.keys(analysisData)[0]]
                              ?.cumulative_macro_count
                          }
                        </td> */}
                        <td className="p-3 font-medium bg-[#f0f0f0] text-[#242424] whitespace-nowrap w-2/12">
                          {
                            analysisData[Object.keys(analysisData)[0]]
                              ?.cumulative_num_of_scripts
                          }
                        </td>
                        <td className="p-3 font-medium bg-[#f0f0f0] text-[#242424] whitespace-nowrap w-0.5/12">
                          {
                            analysisData[Object.keys(analysisData)[0]]
                              ?.cumulative_num_of_loops
                          }
                        </td>
                        <td className="p-3 font-medium bg-[#f0f0f0] text-[#242424] whitespace-nowrap w-2/12">
                          {
                            analysisData[Object.keys(analysisData)[0]]
                              ?.cumulative_user_def_module
                          }
                        </td>
                        <td className="p-3 font-medium bg-[#f0f0f0] text-[#242424] whitespace-nowrap w-2/12">
                          {
                            analysisData[Object.keys(analysisData)[0]]
                              ?.cumulative_pre_def_module
                          }
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <>
              <div className="flex gap-3 items-center ">
                <div className="grid grid-cols-3 auto-rows-max gap-3 w-3/4">
                  <div className="bg-[#FFFFFF] border border-[#E0E0E0] p-3 rounded-md flex flex-col justify-between">
                    <p className="text-[#242424] text-[14px] font-medium">
                      Lines of Code
                    </p>
                    <div className="">
                      <div className=" w-full h-[130px] overflow-hidden flex items-center justify-center relative animatedContainer">
                        <AnimationDonut color={"#1774A6"} />
                        <CountUp
                          start={0}
                          end={
                            analysisData[Object.keys(analysisData)[0]]
                              ?.cumulative_loc
                          }
                          duration={2}
                          className="mt-7"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#FFFFFF] border border-[#E0E0E0] p-3 rounded-md flex flex-col justify-between">
                    <p className="text-[#242424] text-[14px] font-medium">
                      Dependency
                    </p>
                    <div className="">
                      <div className=" w-full h-[130px] overflow-hidden flex items-center justify-center relative animatedContainer">
                        <AnimationDonut color={"#2037B2"}  className="border border-black"/>
                        <CountUp
                          start={0}
                          end={
                            analysisData[Object.keys(analysisData)[0]]
                              ?.dependency_perct
                          }
                          duration={2}
                          className="mt-7"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#FFFFFF] border border-[#E0E0E0] p-3 rounded-md flex flex-col justify-between">
                    <p className="text-[#242424] text-[14px] font-medium">
                      Variables
                    </p>
                    <div className="">
                      <div className=" w-full h-[130px] overflow-hidden flex items-center justify-center relative animatedContainer">
                        <AnimationDonut color={"#82A817"} />
                        <CountUp
                          start={0}
                          end={
                            analysisData[Object.keys(analysisData)[0]]
                              ?.cumulative_variable_count
                          }
                          duration={2}
                          className="mt-7"
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="bg-[#FFFFFF] border border-[#E0E0E0] p-3 rounded-md flex flex-col justify-between">
                    <p className="text-[#242424] text-[14px] font-medium">
                      Macros/Function
                    </p>
                    <div className="">
                      <div className=" w-full h-[130px] overflow-hidden flex items-center justify-center relative animatedContainer">
                        <AnimationDonut color={"#35A30E"} />
                        <CountUp
                          start={0}
                          end={
                            analysisData[Object.keys(analysisData)[0]]
                              ?.cumulative_macro_count
                          }
                          duration={2}
                          className="mt-7"
                        />
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="bg-[#FFFFFF] border border-[#E0E0E0] p-3 rounded-md flex flex-col justify-between">
                    <p className="text-[#242424] text-[14px] font-medium">
                      No. of Files
                    </p>
                    <div className="">
                      <div className=" w-full h-[130px] overflow-hidden flex items-center justify-center relative animatedContainer">
                        <AnimationDonut color={"#E57452"} />
                        <CountUp
                          start={0}
                          end={
                            analysisData[Object.keys(analysisData)[0]]
                              ?.cumulative_num_of_scripts
                          }
                          duration={2}
                          className="mt-7"
                        />
                      </div>
                    </div>
                  </div> */}
                  <div className="bg-[#FFFFFF] border border-[#E0E0E0] p-3 rounded-md flex flex-col justify-between">
                    <p className="text-[#242424] text-[14px] font-medium">
                      Loops
                    </p>
                    <div className="">
                      <div className=" w-full h-[130px] overflow-hidden flex items-center justify-center relative animatedContainer">
                        <AnimationDonut color={"#8A0FB5"} />
                        <CountUp
                          start={0}
                          end={
                            analysisData[Object.keys(analysisData)[0]]
                              ?.cumulative_num_of_loops
                          }
                          duration={2}
                          className="mt-7"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#FFFFFF] border border-[#E0E0E0] p-3 rounded-md flex flex-col justify-between">
                    <p className="text-[#242424] text-[14px] font-medium">
                      User Defined Module
                    </p>
                    <div className="">
                      <div className=" w-full h-[130px] overflow-hidden flex items-center justify-center relative animatedContainer">
                        <AnimationDonut color={"#1796A8"} />
                        <CountUp
                          start={0}
                          end={
                            analysisData[Object.keys(analysisData)[0]]
                              ?.cumulative_user_def_module
                          }
                          duration={2}
                          className="mt-7"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#FFFFFF] border border-[#E0E0E0] p-3 rounded-md flex flex-col justify-between">
                    <p className="text-[#242424] text-[14px] font-medium">
                      Predefined Macros/Functions
                    </p>
                    <div className="">
                      <div className=" w-full h-[130px] overflow-hidden flex items-center justify-center relative animatedContainer">
                        <AnimationDonut color={"#9E0C44"} />
                        <CountUp
                          start={0}
                          end={
                            analysisData[Object.keys(analysisData)[0]]
                              ?.cumulative_pre_def_module
                          }
                          duration={2}
                          className="mt-7"
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="bg-[#FFFFFF] border border-[#E0E0E0] p-3 rounded-md flex flex-col">
                    <img src={dependency} alt="dependency" className="w-12" />
                    <p className="text-[#424242] text-[24px] font-medium mt-2">
                      {
                        analysisData[Object.keys(analysisData)[0]]
                          ?.dependency_perct
                      }
                    </p>
                    <p className="text-[#242424] text-[13px]">Dependency</p>
                  </div>
                  <div className="bg-[#FFFFFF] border border-[#E0E0E0] p-3 rounded-md flex flex-col">
                    <img src={variable} alt="variable" className="w-12" />
                    <p className="text-[#424242] text-[24px] font-medium mt-2">
                      {
                        analysisData[Object.keys(analysisData)[0]]
                          ?.cumulative_variable_count
                      }
                    </p>
                    <p className="text-[#242424] text-[13px]">Variables</p>
                  </div>
                  <div className="bg-[#FFFFFF] border border-[#E0E0E0] p-3 rounded-md flex flex-col">
                    <img src={macros} alt="macros" className="w-12" />
                    <p className="text-[#424242] text-[24px] font-medium mt-2">
                      {
                        analysisData[Object.keys(analysisData)[0]]
                          ?.cumulative_macro_count
                      }
                    </p>
                    <p className="text-[#242424] text-[13px]">Macros/Functions</p>
                  </div>
                  <div className="bg-[#FFFFFF] border border-[#E0E0E0] p-3 rounded-md flex flex-col">
                    <img src={scripts} alt="scripts" className="w-12" />
                    <p className="text-[#424242] text-[24px] font-medium mt-2">
                      {
                        analysisData[Object.keys(analysisData)[0]]
                          ?.cumulative_num_of_scripts
                      }
                    </p>
                    <p className="text-[#242424] text-[13px]">No. of Scripts</p>
                  </div>
                  <div className="bg-[#FFFFFF] border border-[#E0E0E0] p-3 rounded-md flex flex-col">
                    <img src={loops} alt="loops" className="w-12" />
                    <p className="text-[#424242] text-[24px] font-medium mt-2">
                      {
                        analysisData[Object.keys(analysisData)[0]]
                          ?.cumulative_num_of_loops
                      }
                    </p>
                    <p className="text-[#242424] text-[13px]">Loops</p>
                  </div>
                  <div className="bg-[#FFFFFF] border border-[#E0E0E0] p-3 rounded-md flex flex-col">
                    <img src={userDefine} alt="userDefine" className="w-12" />
                    <p className="text-[#424242] text-[24px] font-medium mt-2">
                      {
                        analysisData[Object.keys(analysisData)[0]]
                          ?.cumulative_user_def_module
                      }
                    </p>
                    <p className="text-[#242424] text-[13px]">
                      User Defined Module
                    </p>
                  </div>
                  <div className="bg-[#FFFFFF] border border-[#E0E0E0] p-3 rounded-md flex flex-col">
                    <img src={preDefine} alt="preDefine" className="w-12" />
                    <p className="text-[#424242] text-[24px] font-medium mt-2">
                      {
                        analysisData[Object.keys(analysisData)[0]]
                          ?.cumulative_pre_def_module
                      }
                    </p>
                    <p className="text-[#242424] text-[13px]">
                      Predefined Module
                    </p>
                  </div> */}
                </div>
                <div className="bg-[#FFFFFF] border border-[#E0E0E0] p-3 rounded-md flex flex-col justify-between h-[180px] w-[200px]">
                    <p className="text-[#242424] text-[14px] font-medium">
                      No. of Files
                    </p>
                    <div className="">
                      <div className=" w-full h-[130px] overflow-hidden flex items-center justify-center relative animatedContainer">
                        <AnimationDonut color={"#E57452"} />
                        <CountUp
                          start={0}
                          end={
                            analysisData[Object.keys(analysisData)[0]]
                              ?.cumulative_num_of_files
                          }
                          duration={2}
                          className="mt-7"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-[420px] min-h-[150px] border border-[#E0E0E0] p-4 rounded-lg flex bg-white items-end justify-end relative z-0 overflow-hidden">
                  <div className="absolute top-[-75px] left-[-30px] z-10">
                    <NeedleChart
                      dataValue={
                        analysisData[Object.keys(analysisData)[0]]
                          ?.cumulative_complexity || 0
                      }
                    />
                  </div>
                  <div className="flex flex-col items-start me-12">
                    <p className="text-[#2D9596] text-[20px] font-semibold">
                      {ComplexityType}
                      {/* { analysisData[Object.keys(analysisData)[0]]?.cumulative_complexity} */}
                    </p>
                    <p className="text-[#424242] mt-[-2px]">Complexity</p>
                  </div>
                </div>
              </>
            )
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <div className="h-full flex flex-col justify-center items-center gap-2">
                <img src={fileEmpty} alt="emptyImg" />
                <button
                  className="flex items-center gap-3 justify-between  rounded-md text-black px-7 py-1 bg-[#2D9596]"
                  onClick={() => {
                    navigate(-1)
                  }}
                >
                   <img
            className=" h-4 w-4 cursor-pointer"
            src={backIcon}
            alt="back"
         
          />
                  Go back to files
                </button>

              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyse;
