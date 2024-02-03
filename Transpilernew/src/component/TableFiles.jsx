import React, { useContext, useEffect, useState } from "react";
import downloadIcon from "../assets/icons/downloadIcon.svg";
import deleteIcon from "../assets/icons/deleteIcon.svg";
import fileImg from "../assets/svg/pdfFile.svg";
import { globalContext } from "../context/globalContext";

const TableFiles = ({ selectedItems, setSelectedItems, projectData, height, projectName }) => {
  const { deleteFiles } = useContext(globalContext);
  const [checkedValues, setCheckedValues] = useState([]);
  useEffect(() => {
    if (projectData?.length > 0) {
      const arr = Array.from({ length: projectData?.length }).fill(false);
      setCheckedValues(arr);
    }
  }, [projectData]);
  console.log(selectedItems, 'selectedItems')
  const handleChecked = (index, file) => {
    setCheckedValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = !updatedValues[index];

      if (updatedValues[index]) {
        setSelectedItems((prevSelectedItems) => [
          ...prevSelectedItems,
          { fileName: file.file_name, fileData: file.data },
        ]);
      } else {
        setSelectedItems((prevSelectedItems) =>
          prevSelectedItems.filter((item) => item.fileName !== file.file_name)
        );
      }

      return updatedValues;
    });
  };

  const handleSelectAll = () => {
    setCheckedValues((prevValues) => {
      const allChecked = prevValues.every((value) => value);
      const updatedValues = prevValues.map(() => !allChecked);

      if (!allChecked) {
        const newItems = projectData.map((file) => ({
          fileName: file.file_name,
          fileData: file?.data,
        }));
        setSelectedItems(newItems);
      } else {
        setSelectedItems([]);
      }

      return updatedValues;
    });
  };
  const handleDownload = (filename, pdfUrl) => {
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      className={`relative overflow-x-auto sm:rounded-sm ${height ? height : "h-[calc(100%_-_40px)]"
        }`}
    >
      <table className="w-full text-sm text-left rtl:text-right font-normal shadow-sm  bg-white">
        <thead className="text-sm text-[#242424]  bg-[#ebebeb]  sticky top-0">
          <tr>
            <th scope="col" className="py-3 w-1/12">
              <div className="flex justify-center">
                <input type="checkbox" name="" id="" onChange={handleSelectAll} />
              </div>
            </th>
            <th scope="col" className="px-6 py-3 w-4/12">
              File Name
            </th>
            <th scope="col" className="px-6 py-3 w-1/4">
              File Type
            </th>
            <th scope="col" className="px-6 py-3 w-1/4">
              Date Modified
            </th>
            <th scope="col" className="px-6 py-3 w-1/4">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {projectData &&
            projectData?.length > 0 &&
            projectData?.map((item, index) => (
              <tr
                key={index}
                className="bg-white cursor-pointer hover:bg-[#c9c9c914] border-b border-[#e0e0e0] last:border-0"
              >
                     <td className="py-4 font-normal text-[#242424]  whitespace-nowrap w-1/12">
                <div className="flex justify-center">
                  <input type="checkbox" name="" id="" checked={checkedValues[index]} onChange={(e) => handleChecked(index, item)} />
                </div>
              </td>
                <td className="px-6 py-3 font-normal text-[#242424]  whitespace-nowrap w-4/12">
                  <div className="flex gap-2.5">
                    <img src={fileImg} alt="" />
                    {item?.file_name}
                  </div>
                </td>
                <td className="px-6 py-3 font-normal text-[#242424]  whitespace-nowrap w-1/4">
                  {item?.file_format}
                </td>
                <td className="px-6 py-3 font-normal text-[#242424]  whitespace-nowrap w-1/4">
                  {item?.date_modified}
                </td>
                <td className="px-6 py-3 font-normal text-[#242424]  whitespace-nowrap w-1/4">
                  <div className="flex flex-row gap-4">
                    <img
                      src={downloadIcon}
                      alt="downloadIcon"
                      className="cursor-pointer"
                      onClick={() => handleDownload(item?.file_name ,item?.download_link)}
                    />
                    <img
                      src={deleteIcon}
                      alt="deleteIcon"
                      className="cursor-pointer"
                      onClick={() => {
                        deleteFiles(`${projectName}/${item?.file_name}`, projectName);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default TableFiles;