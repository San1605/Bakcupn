import React, { useContext } from "react";
import "./evaluationReport.css";
import UploadEvaluationFilesModal from "./UploadEvaluationFilesModal";
import { useState } from "react";
import ImageWithFallback from "../../../admin/components/rolemanagementModals/ImageWithFallback";
import profileimg90 from "../../../../assets/images/profileimg90.png";
import { GlobalContext } from "../../../../context/GlobalState";
import emptyImg from "../../../../assets/eval/empty.svg";

function EvaluationReport() {
  const { navigate } = useContext(GlobalContext);
  const [clickUpload, setClickUpload] = useState(false);

  let userMail = "divyanshu.rana@celebaltech.com";

  const UserCard = () => {
    return (
      <div
        className="userCard"
        onClick={() => {
          navigate("/evaluationreports/userevaluationreport");
        }}
      >
        <div className="userCard-img">
          <ImageWithFallback
            src={`https://storageaccountforprofile.blob.core.windows.net/profile/${
              userMail?.split("@")[0]
            }.jpg`}
            fallbackSrc={profileimg90}
            classes="profilephoto pointer userImg"
          />
        </div>
        <div className="userCard-details" title="Divyanshu Rana - HRM 2601">
          <div className="userCard-name">Divyanshu Rana</div>
          <div className="userCard-hrm">HRM 2601</div>
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
          <div className="buddiePageTitle">
            Evaluation Reports
            <span className="buddiesTotalCount">0</span>
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
            {clickUpload && (
              <UploadEvaluationFilesModal setClickUpload={setClickUpload} />
            )}
          </div>
        </div>
        {clickUpload ? (
          <div className="evaluationContentPage overflow-y-scroll mt-3 pe-2 ">
            <UserCard />
          </div>
        ) : (
          <div className="evaluationEmptyPage">
            <div className="evaluationEmptyPageContent">
              <img src={emptyImg} alt="emptyImg" />
              <p>No files uploaded yet...</p>
              <UploadEvaluationFilesModal setClickUpload={setClickUpload} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EvaluationReport;
