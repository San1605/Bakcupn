import React, { useCallback, useContext, useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import './home.css';
import CelebelLogo from '../assets/images/CelebalLogo.svg';
import log_out from '../assets/images/log-out.svg';
//library for the toster pdf styling
import { Accordion, Container, Button } from "react-bootstrap";
import { Toaster } from "react-hot-toast";

//import component
import Login from '../components/Login/Login';
import ChatContext from "../Context/Context";
import InputBoxComponent from "../components/InputandTextArea/InputBoxComponent";
import Header from "../components/Header/Header";

//error boundry to catch uncought error from the code
import ErrorBoundary from "../components/ErrorBoundary";
import Report1 from "../components/ExportPdf/Report1";
import ReportArbic from "../components/ExportPdf/ReportArbic";
import DocsViewPage from "./DocsViewPage";

const Home = () => {
  const navigate = useNavigate();
  const [isManualRFPClicked, setIsManualRFPClicked] = useState(false);
  const {
    apidata,
    setApiData,
    pdfValue,
    setPdfValue,
    isOn,
    tableValue,
    setTableValue,
  } = useContext(ChatContext);

  // //set of api callingn method all main api
  // const apicallingOne = useCallback(() => {
  //   fetch("http://20.127.168.63:8082/one_api")
  //     .then((response) => response.json())
  //     .then((json) => setApiData(json));

  // }, [setApiData]);

  // useEffect(() => {
  //   apicallingOne();
  // }, [apicallingOne]);

  function extractNumberFromHeader(header) {
    const match = header.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[0]) : NaN;
  }

  useEffect(() => {
    const updateData = pdfValue;
    if (updateData) {
      updateData.sort((a, b) => {
        const aHeaderNumber = extractNumberFromHeader(a.header);
        const bHeaderNumber = extractNumberFromHeader(b.header);
        return aHeaderNumber - bHeaderNumber;
      });
    }
    setPdfValue(updateData);
    // console.log(updateData, "updateData");
  }, [pdfValue, isOn]);

  useEffect(() => {
    setPdfValue([]);
  }, [isOn]);

  return (
    <div className="h-100">
      <Header />
    <div className="row m-0 d-flex" >
    <div className="column sidebar col-3 m-0 p-0">
      <div className="side-div">
      <ul className="side">
        <li className="mt-0 d-flex ">
        <input type="checkbox" id="checkbox1" className="me-2 "/>
        <label htmlFor="checkbox1">  Overview</label>
        </li>
        <li className="d-flex">
        <input type="checkbox" id="checkbox2" className="me-2" />
        <label htmlFor="checkbox2">  RFP Overview</label>
        </li>
        <li className="d-flex">
        <input type="checkbox" id="checkbox2" className="me-2"/>
        <label htmlFor="checkbox2">  Legal</label>
        </li>
        <li className="d-flex">
        <input type="checkbox" id="checkbox2" className="me-2" />
        <label htmlFor="checkbox2">  Business Objectives</label>
        </li>
        <li className="d-flex">
        <input type="checkbox" id="checkbox2" className="me-2" />
        <label htmlFor="checkbox2">  Statement of Work</label>
        </li>
        <li className="d-flex">
        <input type="checkbox" id="checkbox2" className="me-2" />
        <label htmlFor="checkbox2">  Design & Architecture</label>
        </li>
        <li className="d-flex">
        <input type="checkbox" id="checkbox2" className="me-2" />
        <label htmlFor="checkbox2">  Project Implentation Approach</label>
        </li>
        <li className="d-flex">
        <input type="checkbox" id="checkbox2" className="me-2" />
        <label htmlFor="checkbox2">  General Requirements</label>
        </li>
        <li className="d-flex">
        <input type="checkbox" id="checkbox2" className="me-2" />
        <label htmlFor="checkbox2">  Project Management Requirements</label>
        </li>
        <li className="d-flex">
        <input type="checkbox" id="checkbox2" className="me-2" />
        <label htmlFor="checkbox2">  Pricing Requirements</label>
        </li>
        <li className="d-flex">
        <input type="checkbox" id="checkbox2" className="me-2" />
        <label htmlFor="checkbox2">  Selection Process</label>
        </li>
        <li className="d-flex">
        <input type="checkbox" id="checkbox2" className="me-2 " />
        <label htmlFor="checkbox2">  Administrative Information & Requirements</label>
        </li>
        <li className="d-flex">
        <input type="checkbox" id="checkbox2" className="me-2"/>
        <label htmlFor="checkbox2">  Format Of Proposals</label>
        </li>
        <li className="d-flex">
        <input type="checkbox" id="checkbox2" className="me-2" />
        <label htmlFor="checkbox2">  Essential Terms & Conditions</label>
        </li>
        </ul>
        </div>
        <div >
        <p className="logout ms-4"  onClick={() => navigate("/")}>Logout<img src={log_out} alt='' className="ms-2" style={{ width: '1rem', height:'1rem' }}/></p>
      </div>  
    </div>
    <ErrorBoundary>
    {/* <div  className={`column rfp-create col-9 m-0 p-0 ${
              isManualRFPClicked ? "container-50" : ""
            }`}> */}
            <div className="column col-9 m-0 p-0">
      {/* <Header /> */}
      <div className="mx-2 mt-4 d-flex justify-content-between">
          <div className="ms-3"><b>RFP Document Generator </b> </div>
          <div className="d-flex gap-3 me-3"><button className="button1"  onClick={() => setIsManualRFPClicked(!isManualRFPClicked)}>Manual RFP Creation</button>
          <button className="button2">Co-Pilot </button>
          </div>
        </div>
        <div className="row m-0 mt-2">
      <Container className={isManualRFPClicked ? "col-6 mt-4 rfp-create" : "col-12 mt-4 rfp-create"} >
      <div className="mb-2 ps-3"><b>Create New RFP </b> </div>
        <Accordion defaultActiveKey="0">
          {!!apidata &&
            apidata?.map((res, index) => (
              <>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey={index}>
                    <Accordion.Header>
                      {isOn === "English" ? res.category : res.categoryArabic}
                    </Accordion.Header>
                    <Accordion.Body>
                      <Accordion.Item eventKey={index}>
                        {res?.categorydata?.map((e) => (
                          <InputBoxComponent
                            showPreviewcol= {isManualRFPClicked}
                            Header={
                              isOn === "English"
                                ? res.category
                                : res.categoryArabic
                            }
                            scope={e.urlEndPoint}
                            NAME={isOn === "English" ? e.NAME : e.NAMEArabic}
                            setPdfValue={setPdfValue}
                            apidata={apidata}
                            pdfValue={pdfValue}
                            defaultText={
                              e.default_ar_text
                                ? isOn === "English"
                                  ? e.default_en_text
                                  : e.default_ar_text
                                : ""
                            }
                            isOn={isOn}
                            setTableValue={setTableValue}
                          />
                        ))}
                      </Accordion.Item>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </>
            ))}
        </Accordion>

       
        <div className="mt-4 mb-2 d-flex justify-content-end me-4"> 
        <Button
            // style={{ marginLeft: "20rem" }}
            className="px-5 ms-4 preview-btn rpf-button"
            // onClick={() => navigate("/docsview")}
          >
            {isOn === "English" ? "Generate RFP Document " : "معاينة"}
          </Button>
        </div>
        {/* <div className="mt-3 mb-2 d-flex justify-content-center">
          {
            isOn === "English" ?
              <PDFDownloadLink
                document={<Report1 pdfValue={pdfValue} tableValue={tableValue} type={1} isOn={isOn} />}
                fileName="rfp-generator-doc.pdf"
              >
                {({ blob, url, loading, error }) => {
                  console.log(blob, url);
                  return (
                    <Button variant="danger">
                      {loading ? isOn === "English" ? "Export as PDF" : "تصدير كملف PDF" : isOn === "English" ? "Export as PDF" : "تصدير كملف PDF"}
                    </Button>
                  );
                }}
              </PDFDownloadLink>
              :
              <ReportArbic
                pdfValue={pdfValue}
                tableValue={tableValue}
                type={1}
                isOn={isOn}
              />
          }

          <Button
            // style={{ marginLeft: "20rem" }}
            className="px-5 ms-4 preview-btn"
            onClick={() => navigate("/docsview")}
            variant="danger"
          >
            {isOn === "English" ? "Preview" : "معاينة"}
          </Button>
        </div> */}
    
      </Container>
      {
        isManualRFPClicked && <div className="col-6"><DocsViewPage /></div> 
      }
      </div>
      </div>
    </ErrorBoundary>
    
    </div>
    </div>
  );
};

export default Home;














