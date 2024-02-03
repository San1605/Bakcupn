import React, { useContext, useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { globalContext } from "../context/globalContext";

const LeftConvertorBox = ({ setFileNameConvert, setLeftLang }) => {
  const { leftTextValue, setLeftTextValue, selectedFilesConvert } =
    useContext(globalContext);
  const [selectedFile, setSelectedFile] = useState(0);
console.log(leftTextValue,"lllllllllllllllllll")

  useEffect(() => {
    setLeftTextValue(selectedFilesConvert[selectedFile]?.fileData);
  }, [selectedFile]);

  useEffect(() => {
    if (selectedFilesConvert?.length > 0) {
      setFileNameConvert(selectedFilesConvert[0]?.fileName)
    }
  }, [selectedFilesConvert])

  return (
    <div className="h-full w-[50%] border border-[#D1D1D1] rounded-lg bg-[#FFF] felx flex-col LeftEditorBlock">
      <div className="flex py-2 px-3 border-b border-[#E0E0E0] items-center justify-between">
        <div className="flex gap-4 items-center">
          <span className=" text-lg font-medium">From</span>
          <select className="border border-[#EAEAEA] rounded-md px-4  outline-none py-[6px] text-sm " onChange={(e) => setLeftLang(e.target.value)}>
            <option value="abap" selected>
              ABAP
            </option>
            {/* <option value="pyspark" disabled>pyspark</option>
            <option value="spark_sql" disabled>spark_sql</option>
            <option value="hana_sql" disabled>hana_sql</option>
            <option value="t_sql" disabled>t_sql</option> */}
          </select>
        </div>
        <div className="flex gap-4 items-center">
          <select
            className="border border-[#EAEAEA] rounded-md px-4  outline-none py-[6px] text-sm overflow-hidden text-ellipsis w-[16rem]"
            onChange={(e) => {
              const selectedIndex = e.target.selectedIndex;
              const selectedOption = e.target.options[selectedIndex];
              setSelectedFile(e.target.value);
              setFileNameConvert(selectedOption.getAttribute("name"));
            }}
          >
            {selectedFilesConvert?.map((el, i) => {
              return (
                <option className="overflow-hidden text-ellipsis w-[16rem] text-sm" value={i} key={i} name={el.fileName} selected={i === 0}>
                  {el.fileName}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <Editor
        defaultLanguage="abap"
        value={leftTextValue}
        onChange={(value) => setLeftTextValue(value)}
        placeholder="language1"
        className="editor pt-2"
      />
    </div>
  );
};

export default LeftConvertorBox;
