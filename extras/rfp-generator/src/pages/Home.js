import React, { useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";

//library for the toster pdf styling
import { Accordion, Container, Button } from "react-bootstrap";
import { Toaster } from "react-hot-toast";

//import component
import ChatContext from "../Context/Context";
import InputBoxComponent from "../components/InputandTextArea/InputBoxComponent";
import Header from "../components/Header/Header";

//error boundry to catch uncought error from the code
import ErrorBoundary from "../components/ErrorBoundary";
import Report1 from "../components/ExportPdf/Report1";
import ReportArbic from "../components/ExportPdf/ReportArbic";

const Home = () => {
  const navigate = useNavigate();
  const {
    apidata,
    setApiData,
    pdfValue,
    setPdfValue,
    isOn,
    tableValue,
    setTableValue,
  } = useContext(ChatContext);

  //set of api callingn method all main api
  const apicallingOne = useCallback(() => {
    fetch("http://20.127.168.63:8082/one_api")
      .then((response) => response.json())
      .then((json) => setApiData(json));
  }, [setApiData]);

  useEffect(() => {
    apicallingOne();
  }, [apicallingOne]);

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
    <ErrorBoundary>
      <Header />
      <Container className="mt-4">
        <Accordion defaultActiveKey="0">
          {!!apidata &&
            apidata.map((res, index) => (
              <>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey={index}>
                    <Accordion.Header>
                      {isOn === "English" ? res.category : res.categoryArabic}
                    </Accordion.Header>
                    <Accordion.Body>
                      <Accordion.Item eventKey={index}>
                        {res.categorydata.map((e) => (
                          <InputBoxComponent
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
        <div className="mt-3 mb-2 d-flex justify-content-center">
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


        </div>
        <Toaster />
      </Container>
    </ErrorBoundary>
  );
};

export default Home;
