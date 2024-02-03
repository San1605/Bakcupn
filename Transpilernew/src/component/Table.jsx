import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import downloadIcon from "../assets/icons/downloadIcon.svg";
import deleteIcon from "../assets/icons/deleteIcon.svg";
import folderImg from "../assets/svg/folder.svg";
import { globalContext } from "../context/globalContext";
import { PdfJs } from "@react-pdf-viewer/core";

const Table = ({ projectData, height, navigateTo,home }) => {
  const navigate = useNavigate();
  const { deleteproject } = useContext(globalContext)
  const { downloadApi, downloadUrlArray } = useContext(globalContext);


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
      <table className="w-full text-sm text-left rtl:text-right font-normal shadow-sm  bg-white">
        <thead className="text-sm text-[#242424]  bg-[#ebebeb]  sticky top-0">
          <tr>
            <th scope="col" className="px-6 py-3 w-4/12">
              Project Name
            </th>
            <th scope="col" className="px-6 py-3 w-1/4">
              Size
            </th>
            <th scope="col" className="px-6 py-3 w-1/4">
              Date Modified
            </th>
            {navigateTo === "project" && (
              <th scope="col" className="px-6 py-3 w-1/4">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {projectData &&
            projectData?.length > 0 &&
            projectData?.map((item, index) => (
              <tr
                key={index}
                className="bg-white cursor-pointer hover:bg-[#c9c9c914] border-b border-[#e0e0e0] last:border-0"
                onClick={() => {
                  if (navigateTo === "project") {
                    navigate(`/projects/${item?.project_name}/${index}`);
                  } else if (navigateTo === "analyze") {
                    navigate(`/analyzer/${item?.project_name}/${index}`);
                  } else if (navigateTo === "convertor") {
                    navigate(`/convertor/${item?.project_name}/${index}`);
                  }
                }}
              >
                <td className="px-6 py-3 font-normal text-[#242424]  whitespace-nowrap w-4/12">
                  <div className="flex gap-2.5">
                    <img src={folderImg} alt="" />
                    {item?.project_name}
                  </div>
                </td>
                <td className="px-6 py-3 font-normal text-[#242424]  whitespace-nowrap w-1/4">
                  {item?.project_size}
                </td>
                <td className="px-6 py-3 font-normal text-[#242424]  whitespace-nowrap w-1/4">
                  {item?.project_date_modified}
                </td>
                {navigateTo === "project" && (
                  <td className="px-6 py-3 font-normal text-[#242424]  whitespace-nowrap w-1/4">
                    <div className="flex flex-row gap-4">
                      <img
                        src={downloadIcon}
                        alt="downloadIcon"
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          downloadFiles(item?.download_link);
                        }}
                      />
                      {home===undefined && <img
                        src={deleteIcon}
                        alt="deleteIcon"
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteproject(item?.project_name);
                        }}
                      />}
                    </div>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;





