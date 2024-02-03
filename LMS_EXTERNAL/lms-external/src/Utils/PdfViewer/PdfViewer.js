import React from "react";
import "./PdfViewer.css"
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PdfViewer = ({ pdfURL }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="pdf-container-home-main">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js">
          <Viewer
            fileUrl={pdfURL}
            plugins={[defaultLayoutPluginInstance]}
            defaultScale={0.65}
          />
      </Worker>
    </div>
  );
};

export default PdfViewer;



// import React, { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import Loader from "../Loader/Loader";
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// const PdfViewer = ({ pdfURL }) => {
//   const [numPages, setNumPages] = useState(null);
//   const [pdfWidth, setPdfWidth] = useState(1);

//   const handleDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

  // const handlePageChange = (newPageNumber) => {
  //   setPageNumber(newPageNumber);
  // };

  // const handleResize = () => {
  //   setPdfWidth(document.getElementById("citation-bottom")?.offsetWidth - 16);
  // };

  // useEffect(() => {
  //   handleResize();
  // }, [citationInnerWidth, appData.activePdfUrl]);

  // useEffect(() => {
  //   setPdfWidth(document.getElementById("citation-bottom")?.offsetWidth - 16);
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);


//   return (
//     <div className="citation-cont w-100 h-100">
//       <Document
//         className="h-full w-full"
//         loading={<Loader />}
//         file={pdfURL}
//         onLoadSuccess={handleDocumentLoadSuccess}
//       >
//         {Array.from(new Array(numPages), (_, index) => (
//           <Page
//             width={pdfWidth}
//             loading={index === 0 ? <Loader /> : ""}
//             key={`page_${index + 1}`}
//             pageNumber={index + 1}
//           // onPageChange={handlePageChange}
//           />
//         ))}
//       </Document>
//     </div>
//   );
// };

// export default PdfViewer;
