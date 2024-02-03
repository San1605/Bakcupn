import React from "react";
import arrow from "../../../../assets/svg/unenrolledCourses/arrow.svg";
import pdfImg from "../../../../assets/eval/pdf.svg";
import "./evaluationReport.css";
// import defaultImg from "../../../../assets/eval/Default.svg";
// import docImg from "../../../../assets/eval/doc.svg";
// import xlsImg from "../../../../assets/eval/xls.svg";

function UserEvaluationReport() {
  const FileCard = () => {
    return (
      <div className="userCard file-card">
        <div className="userCard-img fileCard-img">
          <img src={pdfImg} alt="file icon" className="file-icon" />
        </div>
        <div className="userCard-details" title="Divyanshu Rana - HRM 2601">
          <div className="userCard-name filecard-name">
            Divyanshu Rana - HRM 2601
          </div>
          <div className="userCard-hrm filecard-date">
            Uploaded on: 23/08/2023
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="evaluation-page">
      <div className="evaluation-page-content pt-1 pb-3 px-3">
        <div
          className="w-100 d-flex align-items-center justify-content-between"
          style={{ borderBottom: "1.5px solid #eaeaea" }}
        >
          <div className="d-flex align-items-center gap-2">
            <img
              src={arrow}
              alt="leftArrowIcon"
              style={{ height: "16px" }}
              className="pointer"
              onClick={() => window.history.back()}
            />
            <div className="buddiePageTitle">
              Divyanshu Rana
              <span className="buddiesTotalCount">10</span>
            </div>
          </div>
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
          <FileCard />
        </div>
      </div>
    </div>
  );
}

export default UserEvaluationReport;
