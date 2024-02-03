import React, { useContext, useState } from "react";
import { Editor } from "@monaco-editor/react";
import editIcon from "../assets/icons/editIcon.svg";
import downloadIcon from "../assets/icons/downloadIcon.svg";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import githubLink from "../assets/svg/github.svg";
import rightConvertorBoxEmpty from "../assets/img/rightConvertorBoxEmpty.svg";
import PDFviewer from "./PdfViewer";
import { globalContext } from "../context/globalContext";
import Loader from "./Loader";
const RightConvertorBox = ({ fileNameConvert, projectName }) => {
  const { rightTextValue, loading, leftTextValue, convertCode, leftLang } =
    useContext(globalContext);
  const [rightLang, setRightLang] = useState("pyspark");
  const handleDownloadClick = () => {
    if (rightTextValue) {
      const text = rightTextValue;
      const doc = new jsPDF();
      const x = 10;
      const textWidth = 180;
      const lineHeight = 6;
      const margin = 8;
      let y = margin;
      const fontSize = 10;
      const lines = doc.splitTextToSize(text, textWidth);
      lines.forEach((line, index) => {
        if (y + lineHeight > doc.internal.pageSize.height - margin) {
          doc.addPage();
          y = margin;
        }
        doc.setFontSize(fontSize);
        doc.text(line, x, y);
        y += lineHeight;
      });
      doc.save("converted_code.pdf");
    } else {
      toast.error("Empty PDFs cannot be downloaded.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rightTextValue);
  };

  return (
    <div className="h-full w-[50%] border border-[#D1D1D1] rounded-lg bg-[#FFF] felx flex-col rightEditorBlock">
      <div className="flex py-2 px-3 border-b border-[#E0E0E0] items-center justify-between">
        <div className="flex gap-4 items-center">
          <span className=" text-lg font-medium">To</span>
          <select
            className="border border-[#EAEAEA] rounded-md px-4  outline-none py-[6px] text-sm"
            onChange={(e) => setRightLang(e.target.value)}
          >
            <option selected value="pyspark">
              Pyspark
            </option>
            <option value="spark_sql">Spark SQL</option>
            {/* <option value="hana_sql">HANA SQL</option> */}
            {/* <option value="t_sql">Fabric TSQL</option> */}
          </select>
          <button
            className="border border-[#EAEAEA] rounded-md px-6 py-[6px] text-sm bg-[#2D9596] text-white font-medium"
            onClick={() =>
              leftTextValue.length > 0 && convertCode(leftTextValue, fileNameConvert, rightLang, leftLang, projectName)
            }
          >
            Convert
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <img onClick={handleCopy} src={editIcon} alt="" className="cursor-pointer" />
          <img onClick={handleDownloadClick} src={downloadIcon} alt="" className="cursor-pointer" />
          <button className="flex rounded items-center justify-between gap-2 border border-[#2D9596] px-2 py-1 text-[#242424] text-sm">
            <img src={githubLink} alt="" />
            Push to Github
          </button>
        </div>
      </div>
      {console.log(loading, "loading")}
      {loading && leftTextValue?.length > 0 ? (
        <Loader className="h-[calc(100%_-_55px)]" />
      ) : rightTextValue === "" ? (
        <div className="h-[calc(100%_-_54px)] flex flex-col justify-center items-center gap-2">
          <img className=" " src={rightConvertorBoxEmpty} alt="" />
          <div className="h-14 w-[60%] text-[#595959]">
            Choose the programming language from above to start the conversion
            of your code.
          </div>
        </div>
      ) : (
        <Editor
          // language="javascript"
          defaultLanguage="python"
          value={rightTextValue}
          options={{
            // automaticLayout:false,
            readOnly: true,
          }}
          className="editorRight"
          onMount={(editor, monaco) => {
            // console.log(editor, "editor")
            // textareaRef.current = editor;
          }}
        />
      )}
    </div>
  );
};

export default RightConvertorBox;
