import React, { useContext, useEffect } from "react";
import "./evaluationReport.css";
import UploadEvaluationFilesModal from "./UploadEvaluationFilesModal";
import { useState } from "react";
import ImageWithFallback from "../../../admin/components/rolemanagementModals/ImageWithFallback";
import profileimg90 from "../../../../assets/images/profileimg90.png";
import { GlobalContext } from "../../../../context/GlobalState";
import emptyImg from "../../../../assets/eval/empty.svg";
import { FiSearch } from "react-icons/fi";

function EvaluationReport() {
  const { navigate, getallusersforfiles, evalresult, navroutes, dispatch } =
    useContext(GlobalContext);
  const [searchstrcs, setSearchstrcs] = useState("");
  const [filtersearch, setFiltersearch] = useState([]);
  useEffect(() => {
    if (navroutes?.includes("/evaluationreports")) {
      dispatch({
        type: "ACCOUNT_NAV",
        payload: "24",
      });
      getallusersforfiles("");
    } else {
      navigate("/");
    }
  }, [navroutes]);

  const searchit = () => {
    if (searchstrcs === "") {
      setFiltersearch(evalresult);
    } else {
      if (evalresult.length > 0) {
        const searchSImplerFiles = evalresult.filter(
          (data) =>
            data.name.toLowerCase().indexOf(searchstrcs.toLowerCase()) > -1
        );
        setFiltersearch(searchSImplerFiles);
      }
    }
  };
  useEffect(() => {
    if (evalresult.length > 0) {
      if (searchstrcs === "") {
        setFiltersearch(evalresult);
      } else {
        searchit();
      }
    }
  }, [searchstrcs, evalresult]);

  const UserCard = ({ elem }) => {
    return (
      <div
        className="userCard"
        onClick={() => {
          navigate(
            `/evaluationreports/userevaluationreport/${
              elem.emailId.split("@")[0]
            }`
          );
        }}
      >
        <div className="userCard-img">
          <ImageWithFallback
            src={`https://storagefortimetrigger.blob.core.windows.net/profile/${
              elem.emailId?.split("@")[0]
            }.jpg`}
            fallbackSrc="big"
            classes="profilephoto pointer userImg"
          />
        </div>
        <div className="userCard-details" title="Divyanshu Rana - HRM 2601">
          <div className="userCard-name">{elem.name}</div>
          <div className="userCard-hrm">{elem.employeeId}</div>
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
            <span className="buddiesTotalCount">{evalresult.length}</span>
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
            {evalresult.length > 0 && <UploadEvaluationFilesModal />}
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-12 px-2 mt-2 my-1 rounded searchContainer d-flex align-items-center justify-content-between">
          <input
            type="search"
            placeholder="Search"
            className="border-0 sampler-search col-10"
            style={{ height: "1.8rem", fontSize: "14px" }}
            value={searchstrcs}
            onChange={(e) => setSearchstrcs(e.target.value)}
            // onKeyDown={(event) =>
            //   event.key === "Enter" ? searchit() : null
            // }
          />
          <FiSearch className="pointer col-2" onClick={() => searchit()} />
        </div>
        {filtersearch.length > 0 ? (
          <div className="evaluationContentPage overflow-y-scroll mt-3 pe-2 ">
            {filtersearch.map((elem) => {
              return <UserCard elem={elem} />;
            })}
          </div>
        ) : (
          <div className="evaluationEmptyPage">
            <div className="evaluationEmptyPageContent">
              <img src={emptyImg} alt="emptyImg" />
              <p>No files uploaded yet...</p>
              <UploadEvaluationFilesModal />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EvaluationReport;
