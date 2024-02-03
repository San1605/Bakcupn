import React, { useContext } from "react";
import { Editor } from "@monaco-editor/react";
import { globalContext } from "../context/globalContext";
import editIcon from "../assets/icons/editIcon.svg";
import Loader from "./Loader";
import downloadIcon from "../assets/icons/downloadIcon.svg";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import githubLink from "../assets/svg/github.svg"
const RightTestingBox = () => {
  const { editorRightBoxValue, loading } = useContext(globalContext);
  const handleDownloadClick = () => {
    if (handleDownloadClick) {
      const text = editorRightBoxValue;
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
      doc.save("unit_tests.pdf");
    } else {
      toast.error("Empty PDFs cannot be downloaded.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editorRightBoxValue);
  };
  return (
    <div className="h-full w-[50%] border border-[#D1D1D1] rounded-lg bg-[#FFF] felx flex-col rightEditorBlock">
      <div className="flex py-2 px-3 border-b border-[#E0E0E0] items-center justify-between h-[50px]">
        <div className="w-full flex gap-4 items-center justify-between">
          <span className=" text-lg font-medium">Unit tests</span>
          <div className="flex gap-2 items-center">
          <img onClick={handleCopy} src={editIcon} alt="" className="cursor-pointer" />
          <img onClick={handleDownloadClick} src={downloadIcon} alt="" className="cursor-pointer" />
          <button
            className="flex rounded items-center justify-between gap-2 border border-[#2D9596] px-2 py-1 text-[#242424] text-sm"
          >
            <img  src={githubLink} alt="" />
           Push to Github
          </button>
        </div>
        </div>
      </div>
      {loading ? (
        <Loader className={"h-[calc(100%_-_55px)]"} />
      ) : (
        <Editor
          // language="javascript"
          defaultLanguage="python"
          value={editorRightBoxValue}
          // onChange={(value) => setEditorRighttBoxValue(value)}
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

export default RightTestingBox;
