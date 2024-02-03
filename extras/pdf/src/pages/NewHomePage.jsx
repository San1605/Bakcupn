import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import log_out from "../assets/images/log-out.svg";

// Import component
import Header from "../components/Header/Header";

// Error boundary to catch uncaught errors from the code
import ErrorBoundary from "../components/ErrorBoundary";
import DocsViewPage from "./DocsViewPage"; // Assuming DocsViewPage is correctly imported
import RfpDataFillTable from "../components/RfpDataFillTable/RfpDataFillTable";
import { useEffect } from "react";
import ChatContext from "../Context/Context";

const NewHomePage = () => {
  const navigate = useNavigate();
  const sideNavData = [
    'Overview', 'RFP Overview', 'Legal', 'Business Objectives', 'Statement of Work', 'Design & Architecture', 'Project Implentation Approach', 'General Requirements', 'Project Management Requirements', 'Pricing Requirements', 'Selection Process', 'Administrative Information & Requirements', 'Format Of Proposals', 'Essential Terms & Conditions'
  ];
  const [isManualRFPClicked, setIsManualRFPClicked] = useState(false);
  const [showSeperateDoc, setShowSeperateDoc] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0); // Reset active state when the component mounts
    setIsManualRFPClicked(false);
    setShowSeperateDoc(false);
  }, []);

  const [sideNavCheckboxState, setSideNavCheckboxState] = useState(
    sideNavData.map(() => true) // Initialize all checkboxes as checked
  );

  const handleSideNavCheckboxChange = (index) => {
    if (index !== 0 && index !== 1) {
      const updatedCheckboxState = [...sideNavCheckboxState];
      updatedCheckboxState[index] = !updatedCheckboxState[index];
      setSideNavCheckboxState(updatedCheckboxState);
    }
  };

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <Header />
      <div className="row m-0 d-flex">
        <div className="column sidebar col-3 m-0 p-0">
          <div className="side-div">
            <ul className="side">
              <li className="d-flex m-0 ">
                <input
                  type="checkbox"
                  id="contentsCheckbox"
                  className="me-2"
                  disabled={true}
                  checked={true} // Initially checked and disabled
                />
                <label htmlFor="contentsCheckbox" className="fw-bold">
                  Contents
                </label>
              </li>
              {sideNavData.map((val, index) => (
                <li key={val} className="d-flex ">
                  <input
                    type="checkbox"
                    id={`checkbox${index}`}
                    className="me-2 "
                    disabled={val === "Overview" || val === "RFP Overview" ? true : !isManualRFPClicked}
                    checked={sideNavCheckboxState[index]}
                    onChange={() => handleSideNavCheckboxChange(index)}
                  />
                  <label htmlFor={`checkbox${index}`}>{val}</label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="logout ms-4" onClick={() => navigate("/")}>
              Logout
              <img
                src={log_out}
                alt=""
                className="ms-2"
                style={{ width: "1rem", height: "1rem" }}
              />
            </p>
          </div>
        </div>
        <ErrorBoundary>
          <div className="column document_div col-9 m-0 p-0">
            <div className="mx-2 mt-4 d-flex justify-content-between">
              <div className="ms-3 text-nowrap">
                <b>RFP Document Generator </b>
              </div>
              <div className="d-flex gap-3 me-3">
                <button
                  className={`${active === 1 ? "button2" : "button1"} px-3 py-1`}
                  onClick={() => {
                    setActive(1);
                    setIsManualRFPClicked(true);
                    setShowSeperateDoc(false);
                  }}
                >
                  Manual RFP Creation
                </button>
                <button
                  className={`${active === 0 ? "button2" : "button1"} px-3 py-1`}
                  onClick={() => {
                    setActive(0);
                    setIsManualRFPClicked(false);
                    setShowSeperateDoc(false);
                  }}
                >
                  Co-Pilot
                </button>
              </div>
            </div>
            <div className="row m-0 mt-1">
              <div className="mb-1 ps-4">
                <b>Create New RFP </b>{" "}
              </div>
              {showSeperateDoc ? (
                <div className="col-12">
                  <DocsViewPage />
                </div>
              ) : (
                <>
                  <RfpDataFillTable
                    isManualRFPClicked={isManualRFPClicked}
                    active={active}
                    setShowSeperateDoc={setShowSeperateDoc}
                    sideNavData={sideNavData}
                    sideNavCheckboxState={sideNavCheckboxState}
                  />

                  {isManualRFPClicked && (
                    <div className="col-6">
                      <DocsViewPage />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default NewHomePage;
