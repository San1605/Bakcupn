import React, { useContext, useEffect, useState } from "react";
import arrow from "../../../../assets/svg/unenrolledCourses/arrow.svg";
import pdfImg from "../../../../assets/eval/pdf.svg";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../../../context/GlobalState";
import { PDFDocument } from "pdf-lib";
import { HiOutlineDownload } from "react-icons/hi";
import { AiOutlineZoomOut, AiOutlineZoomIn } from "react-icons/ai";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// import defaultImg from "../../../../assets/eval/Default.svg";
// import docImg from "../../../../assets/eval/doc.svg";
// import xlsImg from "../../../../assets/eval/xls.svg";

function ReportEvaluation({ id, flag }) {
  const { getallusersforfiles, evalresult } = useContext(GlobalContext);

  const [pdfViewer, setPdfViewer] = useState(false);
  const [index, setIndex] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(0.8);
  const [pdfUrls, setPdfUrls] = useState([]);
  const [pdfNames, setPdfNames] = useState([]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages);
  };

  const handleZoomIn = () => {
    if (scale < 1) {
      setScale((prevScale) => prevScale + 0.1);
    }
  };

  const handleZoomOut = () => {
    if (scale >= 0.2) {
      setScale((prevScale) => prevScale - 0.1);
    }
  };

  useEffect(() => {
    getallusersforfiles(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (evalresult.length > 0) {
      setPdfUrls(
        evalresult[0].files.map((el, i) => {
          return el.url;
        })
      );
      setPdfNames(
        evalresult[0].files.map((el, i) => {
          return el.fileName;
        })
      );
    }
  }, [evalresult]);

  const FileDownload = ({ pdfD, fileNames }) => {
    const [pdfBlob, setPdfBlob] = useState(null);
    useEffect(() => {
      const fetchPdfData = async () => {
        try {
          const response = await fetch(pdfD);
          const pdfData = await response.arrayBuffer();
          setPdfBlob(new Uint8Array(pdfData));
        } catch (error) {
          console.error("Error fetching PDF data:", error);
        }
      };

      fetchPdfData();
    }, [pdfD]);

    const handleDownload = async () => {
      if (pdfBlob) {
        try {
          const pdfDoc = await PDFDocument.load(pdfBlob);
          pdfDoc.setTitle(fileNames.split("_").pop());

          const modifiedPdfBytes = await pdfDoc.save();
          const blob = new Blob([modifiedPdfBytes], {
            type: "application/pdf",
          });
          const blobUrl = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = blobUrl;
          a.download = fileNames.split("_").pop();
          a.click();
        } catch (error) {
          console.error("Error modifying PDF:", error);
        }
      }
    };
    useEffect(() => {
      const NavigationKeyPress = (event) => {
        if (event.key === "ArrowLeft") {
          pressNavKey("left");
        } else if (event.key === "ArrowRight") {
          pressNavKey("right");
        } else if (event.key === "Escape") {
          pressEscape();
        }
      };

      const pressNavKey = (key) => {
        if (key === "left") {
          setIndex(index - 1);
          setCurrentPage(1);
        } else if (key === "right") {
          setIndex(index + 1);
          setCurrentPage(1);
        }
      };

      const pressEscape = () => {
        setPdfViewer(false);
      };
      document.addEventListener("keydown", NavigationKeyPress);
      return () => {
        document.removeEventListener("keydown", NavigationKeyPress);
      };
    });
    return (
      <div>
        <HiOutlineDownload
          onClick={() => handleDownload()}
          className="pointer"
        />
      </div>
    );
  };

  const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
    return (
      <div className="pdf-pagination">
        <p className="me-2">Page</p>
        <button
          className="pdf-prev-next"
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
          disabled={currentPage === 1 ? true : false}
        >
          <BiFirstPage
            className={`${currentPage === 1 && "pdf-btn-disable"}`}
          />
        </button>
        <p className="pdf-pages-index">{currentPage + " / " + totalPages}</p>
        <button
          className="pdf-prev-next"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
          disabled={currentPage === totalPages ? true : false}
        >
          <BiLastPage
            className={`${currentPage === totalPages && "pdf-btn-disable"}`}
          />
        </button>
      </div>
    );
  };

  const FileCard = ({ elem }) => {
    return (
      <div
        className="userCard file-card"
        onClick={() => {
          setPdfViewer(true);
        }}
      >
        <div className="userCard-img fileCard-img">
          <img src={pdfImg} alt="file icon" className="file-icon" />
        </div>
        <div
          className="userCard-details"
          title={elem.fileName.split("_").pop()}
        >
          <div className="userCard-name filecard-name">
            {elem.fileName.split("_").pop()}
          </div>
          <div className="userCard-hrm filecard-date">
            Uploaded on: {elem.createdOn}
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {pdfViewer && (
        <div className="pdf-viewer-main">
          <div className="pdf-viewer-main-inner">
            <div className="pdf-viewer-inner-toolbar">
              <div className="pdf-viewer-inner-toolbar-filename">
                <img
                  src={pdfImg}
                  alt="file icon"
                  height={20}
                  className="me-2"
                />
                {pdfNames[index - 1].split("_").pop()}
              </div>
              <div className="pdf-viewer-inner-toolbar-tools">
                <button
                  className={`prev-next-btn prev-pdf ${
                    index === 1 && "pdf-btn-disable"
                  }`}
                  onClick={() => {
                    setIndex(index - 1);
                    setCurrentPage(1);
                  }}
                  disabled={index === 1 ? true : false}
                >
                  Previous Pdf
                </button>
                <div className="pdf-tools-seperator">|</div>
                <Pagination
                  className="pagination"
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
                <div className="pdf-tools-seperator">|</div>
                <div className="pdf-page-zoom-toolbar">
                  <AiOutlineZoomOut
                    onClick={handleZoomOut}
                    className={`pointer ${
                      Number(scale.toFixed(1)) === 0.1 && "pdf-btn-disable"
                    }`}
                  />
                  <div className="pdf-scale-input">{`${Math.floor(
                    scale * 100
                  )}%`}</div>
                  <AiOutlineZoomIn
                    onClick={handleZoomIn}
                    className={`pointer ${
                      Math.floor(scale) === 1 && "pdf-btn-disable"
                    }`}
                  />
                </div>
                <div className="pdf-tools-seperator">|</div>
                <button
                  className={`prev-next-btn next-pdf ${
                    index === pdfUrls.length && "pdf-btn-disable"
                  }`}
                  onClick={() => {
                    setIndex(index + 1);
                    setCurrentPage(1);
                  }}
                  disabled={index === pdfUrls.length ? true : false}
                >
                  Next Pdf
                </button>
              </div>
              <div className="pdf-viewer-inner-toolbar-close">
                <FileDownload
                  pdfD={pdfUrls[index - 1]}
                  fileNames={pdfNames[index - 1]}
                />
                <div
                  className="close-pdf"
                  onClick={() => {
                    setPdfViewer(false);
                  }}
                >
                  Close
                </div>
              </div>
            </div>

            <div className="pdf-viewer-inner-content-page">
              <Document
                file={pdfUrls[index - 1]}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={currentPage} scale={scale} />
              </Document>
            </div>
          </div>
        </div>
      )}
      <div
        className={`${
          flag === "UserReport" ? "evaluation-page-report" : "evaluation-page "
        }`}
      >
        <div className="evaluation-page-content pt-1 pb-3 px-3">
          <div
            className="w-100 d-flex align-items-center justify-content-between"
            style={{
              borderBottom:
                flag === "UserReport" ? "none" : "1.5px solid #eaeaea",
            }}
          >
            {flag !== "UserReport" && (
              <div className="d-flex align-items-center gap-2">
                <img
                  src={arrow}
                  alt="leftArrowIcon"
                  style={{ height: "16px" }}
                  className="pointer"
                  onClick={() => window.history.back()}
                />
                <div className="buddiePageTitle">
                  {evalresult[0]?.name}
                  <span className="buddiesTotalCount">
                    {evalresult[0]?.files.length}
                  </span>
                </div>
              </div>
            )}
            <div
              style={{
                width: "fit-content",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* <div
              className="downloadReportBtn pointer me-3"
              onClick={() => downloadexcel()}
            >
              Download All Reports
              <img
                src={downloadArrow}
                alt="downloadArrow"
                className="downloadIcon"
              />
            </div> */}
            </div>
          </div>
          <div className="evaluationContentPage overflow-y-scroll mt-3 pe-2 ">
            {evalresult.length > 0
              ? evalresult[0].files.map((elem) => {
                  return <FileCard elem={elem} />;
                })
              : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportEvaluation;
