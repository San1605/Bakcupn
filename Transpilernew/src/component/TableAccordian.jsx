import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import downloadIcon from "../assets/icons/downloadIcon.svg";
import deleteIcon from "../assets/icons/deleteIcon.svg";
import folderImg from "../assets/svg/folder.svg";
import downArrow from "../assets/icons/downArrow.svg";
import upperArrow from "../assets/icons/upperArrow.svg";
import { globalContext } from "../context/globalContext";

const TableAccordian = ({ projectData, height, navigateTo }) => {
    const navigate = useNavigate();
    const {
        deleteproject,
        downloadApi,
        downloadUrlArray,
        isFirstTime,
        setIsFirstTime,
    } = useContext(globalContext);
    // const [isFirstTime,setIsFirstTime]=useState(true)
    const [showAccordian, setShowAccordian] = useState(() => {
        return projectData?.map(() => false) || [];
    });

    useEffect(() => {
        if (projectData?.length > 0) {
            const arr = Array.from({ length: projectData?.length }).fill(false);
            setShowAccordian(arr);
        }
    }, [projectData]);

    const handleAccordian = (index) => {
        setShowAccordian((prevValues) => {
            const updatedValues = prevValues.map((value, i) => i === index ? !value : false);
            return updatedValues;
        });
    };


    // const handleDownload = (pdfUrl) => {
    //     console.log(pdfUrl, "pdfUrl")
    //     const a = document.createElement("a");
    //     a.href = pdfUrl;
    //     a.download = "file";
    //     document.body.appendChild(a);
    //     a.click();
    //     document.body.removeChild(a);
    // };

    // const downloadFiles = (value) => {
    //     if (value?.length > 0) {
    //         value?.forEach(element => {
    //             handleDownload(element)
    //         });
    //     }
    //     // downloadApi(value)
    // }

    const downloadFilesSequentially = async (links, index = 0) => {
        if (index < links.length) {
            const a = document.createElement("a");
            a.href = links[index];
            a.download = `file_${index + 1}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            await new Promise(resolve => setTimeout(resolve, 500));
            await downloadFilesSequentially(links, index + 1);
        }
    };

    const downloadFiles = async (value) => {
        if (value?.length > 0) {
            try {
                await downloadFilesSequentially(value);
            } catch (error) {
                console.error('Error downloading files:', error);
            }
        }
    };


    return (
        <div
            className={`relative overflow-x-auto sm:rounded-sm ${height ? height : "h-[calc(100%_-_40px)]"
                }`}
        >
            <table className="w-full text-sm text-left rtl:text-right font-normal shadow-sm bg-white">
                <thead className="text-sm text-[#242424] bg-[#ebebeb] sticky top-0">
                    <tr>
                        <th scope="col" className="px-6 py-3 w-1/12"></th>
                        <th scope="col" className="px-6 py-3 w-3/12">
                            Project Name
                        </th>
                        <th scope="col" className="px-6 py-3 w-3/12">
                            Size
                        </th>
                        <th scope="col" className="px-6 py-3 w-3/12">
                            Date Modified
                        </th>
                        {navigateTo === "project" && (
                            <th scope="col" className="px-6 py-3 w-2/12">
                                Action
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {projectData &&
                        projectData?.length > 0 &&
                        projectData?.map((item, index) => (
                            <React.Fragment key={index}>
                                <tr
                                    className={`bg-white cursor-pointer hover:bg-[#c9c9c918] border-b border-[#e0e0e0] last:border-0 `}
                                    onClick={() => {
                                        if (navigateTo === "project") {
                                            navigate(`/projects/${item?.project_name}/${index}`);
                                            setIsFirstTime(true);
                                        } else if (navigateTo === "analyze") {
                                            navigate(`/analyzer/${item?.project_name}/${index}`);
                                            setIsFirstTime(true);
                                        } else if (navigateTo === "convertor") {
                                            navigate(`/convertor/${item?.project_name}/${index}`);
                                            setIsFirstTime(true);
                                        }
                                    }}
                                >
                                    <td className="px-6 py-3 font-normal text-[#242424] whitespace-nowrap w-1/12">
                                        <img
                                            src={showAccordian[index] ? upperArrow : downArrow}
                                            alt="arrow"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAccordian(index);
                                                setIsFirstTime(false);
                                            }}
                                        />
                                    </td>
                                    <td className="px-6 py-3 font-normal text-[#242424] whitespace-nowrap w-3/12">
                                        <div className="flex gap-2.5">
                                            <img src={folderImg} alt="" />
                                            {item?.project_name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 font-normal text-[#242424] whitespace-nowrap w-3/12">
                                        {item?.project_size}
                                    </td>
                                    <td className="px-6 py-3 font-normal text-[#242424] whitespace-nowrap w-3/12">
                                        {item?.project_date_modified}
                                    </td>
                                    {navigateTo === "project" && (
                                        <td className="px-6 py-3 font-normal text-[#242424] whitespace-nowrap w-2/12">
                                            <div className="flex flex-row gap-4">
                                                <img
                                                    src={downloadIcon}
                                                    alt="downloadIcon"
                                                    className="cursor-pointer"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        downloadFiles(item?.download_link);
                                                    }}
                                                />
                                                <img
                                                    src={deleteIcon}
                                                    alt="deleteIcon"
                                                    className="cursor-pointer"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteproject(item?.project_name);
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    )}
                                </tr>
                                {showAccordian[index] && (
                                    <tr className={`border-b border-[#e0e0e0] bg-[#c9c9c920] `}>
                                        <td className="w-1/12 px-6">

                                        </td>
                                        <td className="w-3/12 px-6">
                                            <div className=" py-2 ">
                                                <div>Total Files</div>
                                                <div>
                                                    {item?.project_metric?.total_files}
                                                </div>
                                            </div>
                                        </td>
                                        <td className=" w-3/12 px-6">
                                            <div className=" py-2 ">
                                                <div>Files Analyzed</div>
                                                <div>
                                                    {item?.project_metric?.files_analyzed}
                                                </div>
                                            </div>
                                        </td>
                                        <td className=" w-3/12 px-6">
                                            <div className=" py-2 ">
                                                <div>Files Converted</div>
                                                <div>
                                                    {item?.project_metric?.files_converted}
                                                </div>
                                            </div>
                                        </td>
                                        <td className=" w-2/12 px-6">
                                            <div className=" py-2 ">
                                                <div>Files Tested</div>
                                                <div>
                                                    {item?.project_metric?.files_tested}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                </tbody>
            </table>
        </div>
    );
};
export default TableAccordian;
