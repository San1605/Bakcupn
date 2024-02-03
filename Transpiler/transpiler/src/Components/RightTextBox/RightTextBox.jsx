import React, { useEffect, useRef } from 'react'
import "./RightTextBox.css"
import Spark from "../../assets/spark.svg"
import downloadArrow from "../../assets/downloadArrow.svg"
import copy from "../../assets/copyIcon.svg"
import jsPDF from "jspdf"
import { Editor } from '@monaco-editor/react'
import { debounce } from 'lodash';
import ErrorBoundaries from '../../utils/ErrorBoundaries'
import toast from 'react-hot-toast'
const RightTextBox = ({ rightTextValue, languages }) => {
  const textareaRef = useRef(null);

  const handleCopyClick = () => {
    if (textareaRef.current) {
      const editor = textareaRef.current;
      const textToCopy = editor.getModel().getValue();
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };


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
      doc.save('converted_code.pdf');
    }
    else{
      toast.error("Empty PDFs cannot be downloaded.")
    }
  };

  // useEffect(() => {
  //   const handleResize = debounce(() => {
  //     const editor = document.querySelector(".editor");
  //     if (editor) {
  //       editor.layout();
  //     }
  //   }, 100);
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  return (
    <div className='rightTextBox'>
      <div className="navbarRightBox">
        <div className='navbarRightBoxfirst'>
          <img className='spark' src={Spark} alt='sap' />
          {/* <span >85% accuracy</span> */}
        </div>
        <div className='rightNavbarDiv'>
          <select className='languageSelect'>
            <option value="" hidden>Select language</option>
            {
              languages?.output?.map((item) => (
                <option value="pyspark">{item}</option>
              ))
            }
          </select>
          <div className='downloadButton' onClick={handleDownloadClick}><span>Download</span> <img src={downloadArrow} alt='' /></div>
          <img style={{ cursor: "pointer" }} src={copy} alt="" onClick={handleCopyClick} />
        </div>
      </div>
      <div className='rightBoxContainer'>
        <ErrorBoundaries>
          <Editor
            // language="javascript"
            defaultLanguage='python'
            value={rightTextValue}
            options={{
              // automaticLayout:false,
              readOnly: true
            }}
            className="editor"
            onMount={(editor, monaco) => {
              console.log(editor, "editor")
              textareaRef.current = editor;
            }}
          />
        </ErrorBoundaries>
      </div>
    </div>
  )
}
export default RightTextBox