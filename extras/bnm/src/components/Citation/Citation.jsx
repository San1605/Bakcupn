import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { AppContext } from "../../utils/Context/AppContext";
import { useContext } from "react";
import Loader from "../Loader/Loader";
import ARROW from "../../assets/arrow-right-left.png";
import CLOSE from "../../assets/close.png";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Citation = ({ setLeftWidth, citationInnerWidth }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfWidth, setPdfWidth] = useState(1);
  const { appData, dispatch } = useContext(AppContext);

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handlePageChange = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  const handleResize = () => {
    setPdfWidth(document.getElementById("citation-bottom")?.offsetWidth - 16);
  };

  useEffect(() => {
    handleResize();
  }, [citationInnerWidth, appData.activePdfUrl]);

  useEffect(() => {
    setPdfWidth(document.getElementById("citation-bottom")?.offsetWidth - 16);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePrevPdf = () => {
    dispatch({
      type: "ACTIVE_PDF_URL",
      payload: appData?.activePdfUrl - 1,
    });
  };

  const handleNextPdf = () => {
    dispatch({
      type: "ACTIVE_PDF_URL",
      payload: appData.activePdfUrl + 1,
    });
  };

  const handleClosePdf = () => {
    setLeftWidth(window?.innerWidth);
    dispatch({
      type: "CITATION_BAR",
      payload: false,
    });
  };

  return (
    <div className="citation-cont w-100 h-100">
      <div className="citation-top h-[64px] flex items-center justify-between gap-6 py-3 border-b-[1px] border-[#DADADA]">
        <div className="flex items-center justify-center m-auto">
          <button
            className="p-2 "
            onClick={handlePrevPdf}
            disabled={appData?.activePdfUrl == 0}
          >
            <img
              className="sm:h-[20px] sm:w-[20px] h-[16px] w-[16px] rotate-180"
              src={ARROW}
              alt=""
            />
          </button>
          <p
            title={
              appData?.bloLinksObj?.blob_file_names?.length > 0
                ? appData?.bloLinksObj?.blob_file_names[appData?.activePdfUrl]
                : null
            }
            className="w-fit sm:max-w-[14rem] max-w-[12rem] h-auto text-sm ellipsis-text text-center"
          >
            {appData?.bloLinksObj?.blob_file_names?.length > 0
              ? appData?.bloLinksObj?.blob_file_names[appData?.activePdfUrl]
              : "Node js PDF for beginners (part - 1)"}
          </p>
          <button
            className="p-2"
            onClick={handleNextPdf}
            disabled={
              appData.activePdfUrl ==
              appData?.bloLinksObj?.blob_links?.length - 1
            }
          >
            <img
              className="sm:h-[20px] sm:w-[20px] h-[16px] w-[16px]"
              src={ARROW}
              alt=""
            />
          </button>
        </div>
        <button className="inline-block sm:hidden p-2 pe-5 absolute right-4 " onClick={handleClosePdf}>
          <img className="h-[12px] w-[12px]" src={CLOSE} alt="" />
        </button>
      </div>
      <div id="citation-bottom" className="citation-bottom p-1 ps-2">
        <Document
          className="h-full w-full"
          loading={<Loader className="mt-[45%]" />}
          file={
            appData?.bloLinksObj?.blob_links.length > 0
              ? appData?.bloLinksObj?.blob_links[appData?.activePdfUrl]
              : null
          }
          onLoadSuccess={handleDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              width={pdfWidth}
              loading={index === 0 ? <Loader /> : ""}
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              onPageChange={handlePageChange}
            />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default Citation;
