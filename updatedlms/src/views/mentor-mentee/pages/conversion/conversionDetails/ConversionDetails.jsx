import React, { useContext, useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import AccordionContext from "react-bootstrap/AccordionContext";
import Card from "react-bootstrap/Card";
import { BsChevronDown } from "react-icons/bs";
import { BsChevronUp } from "react-icons/bs";
import { useParams } from "react-router-dom";
import InterviewFeedbackViewModalTL from "../../../../../component/feedbackCard/InterviewFeedbackViewModalTL";
import ProjectManagerFeedbackView from "../../../../../component/projectManagerFeedbackForm/ProjectManagerFeedbackView";
import { GlobalContext } from "../../../../../context/GlobalState";
import downloadArrow from "../../../../../assets/svg/downloadArrow.svg";
import arrow from "../../../../../assets/svg/unenrolledCourses/arrow.svg";
import { exportToExcel } from "react-json-to-excel";
import "./conversiondetails.css";
import CryptoJS from "crypto-js";
import nodata from "../../../../../assets/noData.png";
import { Bars } from "react-loader-spinner";

function ConversionDetails() {
  const {
    getallbuddylistvalidation,
    getallmenteelistvalidation,
    role,
    navigate,
    dispatch,
    conversionmenteehead,
    conversionmentordata,
    downloadsinglefull,
    downloadsingleonlyfn,
    downloadsingleonly,
    conversionmentor,
    reportforeach,
    loading,
  } = useContext(GlobalContext);
  const [eventkeyArr, setEventkeyArr] = useState([]);
  const [decryptedText, setDecryptedText] = useState("");
  const params = useParams();
  useEffect(() => {
    if (params) {
      const changed = params.id.replaceAll("hedge", "/");
      const secretKey = process.env.REACT_APP_APP_KEY;
      const iv = CryptoJS.enc.Hex.parse(changed.substring(0, 32));
      const encrypted = changed.substring(32);
      const decrypted = CryptoJS.AES.decrypt(encrypted, secretKey, {
        iv,
      }).toString(CryptoJS.enc.Utf8);
      setDecryptedText(decrypted);
      conversionmentor(decrypted);
      reportforeach(decrypted);
    }
  }, [params]);
  useEffect(() => {
    if (downloadsingleonly.length > 0) {
      exportToExcel(downloadsingleonly, "Mentee Single Report");
    }
  }, [downloadsingleonly]);
  function ContextAwareToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(eventKey, () => {
      callback && callback(eventKey);
      if (eventKey !== "") {
        if (eventkeyArr?.includes(eventKey)) {
          const filterArr = eventkeyArr?.filter((item) => item !== eventKey);
          setEventkeyArr(filterArr);
        } else {
          setEventkeyArr([...eventkeyArr, eventKey]);
        }
      }
    });

    useEffect(() => {
      console.log(eventkeyArr, "eventkeyArr");
    }, [eventkeyArr]);

    const isCurrentEventKey = activeEventKey == eventKey;

    return (
      <div>
        <table className="table m-0">
          <tbody className="tbody">
            <tr className="trow w-100 conversion-accordian-row">
              <td onClick={() => decoratedOnClick()} className="pointer">
                <div className="conversion-details-text">
                  {!isCurrentEventKey ? <BsChevronDown /> : <BsChevronUp />}
                </div>
              </td>
              {children}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className="menteeListPage">
      <div className="row menteelistcard pt-1 pb-3 px-3">
        <div className="w-100 d-flex align-items-center justify-content-between menteePageTitleRow border-0">
          <div
            className="menteePageTitle d-flex align-items-center"
            style={{ fontSize: "18px" }}
          >
            <div
              className="d-flex align-items-center me-2"
              onClick={() => {
                dispatch({
                  type:"CONVERSION_MENTOR_DATA",
                  payload: undefined
                })
                dispatch
                ({
                  type:"CONVERSION_MENTEE_HEAD",
                  payload:""
                })
                window.history.back()
              }}
            >
              <img
                src={arrow}
                alt="leftArrowIcon"
                style={{ height: "16px" }}
                className="pointer"
              />
            </div>
            {conversionmenteehead !== ""
              ? conversionmenteehead
              : "Conversion Details"}
          </div>
          <div
            className="downloadReportBtn pointer"
            onClick={() =>
              exportToExcel(downloadsinglefull, "Mentee Full Report")
            }
          >
            {/* <a
                href={`${window.location.origin.includes("localhost") || window.location.origin.includes("devs")?"https://celebaltech-lms-dev.azurewebsites.net":"https://celebaltech-lms.azurewebsites.net"}/api/conversion/downloadMenteeConversionForm?emailId=${params.id}@celebaltech.com`}
                className="download-btn-link"
              > */}
            Download All Forms
            <img
              src={downloadArrow}
              alt="downloadArrow"
              className="downloadIcon"
            />
            {/* </a> */}
          </div>
        </div>
        {conversionmentordata == undefined?
          loading === true ? (
            <div className="page-loader-div">
              <Bars
                height="50"
                width="50"
                color="#4F52B2"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass="page-loader"
                visible={true}
              />
            </div>):(
          <div
            style={{ height: "calc(100vh - 175px)" }}
            className="d-flex flex-column align-items-center justify-content-center gap-3"
          >
            <img src={nodata} alt="nodata" height={150} />
            <p>No Conversion data found</p>
          </div>
        )
        :conversionmentordata.length > 0 ? (
          <>
            <table className="table m-0">
              <thead className="thead">
                <tr className="trow w-100 conversion-accordian-row">
                  <th>
                    <BsChevronDown className="first-th" />
                  </th>
                  <th className="col-2">Conversion Type</th>
                  <th className="col-2">Status</th>
                  <th className="col-2">Verdict By</th>
                  <th className="col-2">Verdict Date</th>
                  <th className="col-2">Conversion Month</th>
                  <th className="col-2">Report</th>
                </tr>
              </thead>
            </table>
            <div className="conversion-container">
              <Accordion>
                {conversionmentordata.map((elem, index) => {
                  return (
                    <Card className="conversion-card">
                      <Card.Header className="conversion-card-header">
                        <ContextAwareToggle eventKey={index}>
                          <td className="col-2">
                            <p className="conversion-details-text">
                              {elem.conversionType}
                            </p>
                          </td>
                          <td className="col-2">
                            <p
                              className={`conversion-details-text conversion-status conversion-status-${elem.status}`}
                            >
                              {elem.status}
                            </p>
                          </td>
                          <td className="col-2">
                            <p className="conversion-details-text">
                              {elem.verdictBy}
                            </p>
                          </td>
                          <td className="col-2">
                            <p className="conversion-details-text">
                              {elem.verdictDate}
                            </p>
                          </td>
                          <td className="col-2">
                            <p className="conversion-details-text">
                              {elem.conversionMonth.split("'")[0]}
                            </p>
                          </td>
                          <td className="col-2 ">
                            {/* <p className="form-btn" onClick={() => window.open(`${window.location.origin.includes("localhost") ||
                     window.location.origin.includes("devs")?"https://celebaltech-lms-dev.azurewebsites.net":"https://celebaltech-lms.azurewebsites.net"}/api/conversion/downloadMenteesSingleConversionForm?emailId=${params.id}@celebaltech.com&interviewId=&${elem.interviewId}`, "_blank")}> */}
                            <p
                              className="form-btn"
                              onClick={() =>
                                downloadsingleonlyfn(
                                  params.id,
                                  elem.interviewId
                                )
                              }
                            >
                              Download Form
                            </p>
                            {/* </p> */}
                          </td>
                        </ContextAwareToggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey={index}>
                        <Card.Body className="conversion-card-body">
                          <div className="conversion-card-body-content">
                            {elem.statusList.length > 0
                              ? elem.statusList.map((innerelem) => {
                                  return (
                                    <div className="conversion-card-body-content-row">
                                      <div className="feedback-details-content col-10">
                                        <p className="feedback-profile col-2">
                                          {innerelem.name}{" "}
                                          <span>{innerelem.position}</span>
                                        </p>
                                        <div className="feedback-status-div">
                                          <p
                                            className={`feedback-status feedback-status-${innerelem.status}`}
                                          >
                                            {innerelem.status}
                                          </p>
                                        </div>
                                      </div>
                                      <div className=" col-2">
                                        {innerelem.view == true ? (
                                          innerelem.position ==
                                          "Reporting Manager" ? (
                                            <InterviewFeedbackViewModalTL
                                              modalinfo={innerelem.viewDetails}
                                            />
                                          ) : (
                                            <ProjectManagerFeedbackView
                                              modalinfo={innerelem.viewDetails}
                                            />
                                          )
                                        ) : null}
                                      </div>
                                    </div>
                                  );
                                })
                              : null}
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  );
                })}
              </Accordion>
            </div>
          </>
        ) : (
          <div
            style={{ height: "calc(100vh - 175px)" }}
            className="d-flex flex-column align-items-center justify-content-center gap-3"
          >
            <img src={nodata} alt="nodata" height={150} />
            <p>No Conversion data found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConversionDetails;
