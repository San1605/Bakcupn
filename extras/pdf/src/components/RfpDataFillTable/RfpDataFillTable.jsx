import React, { useCallback, useContext, useEffect } from "react";
//library for the toster pdf styling
import { Accordion, Container, Button } from "react-bootstrap";
import { Toaster } from "react-hot-toast";

//import component
import ChatContext from "../../Context/Context";
import InputBoxComponent from "../InputandTextArea/InputBoxComponent";


const RfpDataFillTable = ({ isManualRFPClicked, active, setShowSeperateDoc, sideNavData, sideNavCheckboxState }) => {
  const {
    apidata,
    setApiData,
    pdfValue,
    setPdfValue,
    isOn,
    setTableValue,
  } = useContext(ChatContext);

  const filteredData = sideNavData.filter((i, index) => sideNavCheckboxState[index]);

  console.log(filteredData, apidata, "filteredData");

  useEffect(() => {
    console.log(sideNavData.filter((i, index) => sideNavCheckboxState[index]))
    console.log(apidata, '---api data')
  }, [sideNavData])
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
  }, [pdfValue, isOn]);

  useEffect(() => {
    setPdfValue([]);
  }, [isOn]);

  console.log(sideNavCheckboxState, "jhuhi")

  return (

    <Container className={isManualRFPClicked ? "col-6 mt-4 rfp-create" : "col-12 mt-4 rfp-create"} >
      <Accordion defaultActiveKey="0">
        {!!apidata &&
          apidata.filter((val) => {
            let values = val.category.split(" ")
            values.shift()
            let finalVal = values.join(" ");
            if (active === 0) {
              return true
            } else {
              return filteredData.includes(finalVal)
            }
          }).map((res, index) => {
            let values = res.category.split(" ")
            values.shift()
            let finalVal = values.join(" ");
            return <>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey={index}>
                  <Accordion.Header>
                    {/* {index+1 + '. ' + finalVal} */}
                    {finalVal}
                    {/* {isOn === "English" ? res.category : res.categoryArabic} */}
                  </Accordion.Header>
                  <Accordion.Body>
                    <Accordion.Item eventKey={index}>
                      {res.categorydata.map((e) => (
                        <InputBoxComponent
                          showPreviewcol={isManualRFPClicked}
                          filteredData={filteredData}
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
          })}
      </Accordion>

      {
        active === 0 && <div className="mt-4 mb-2 d-flex justify-content-end me-4">
          <Button
            // style={{ marginLeft: "20rem" }}
            className="px-5 ms-4 preview-btn rpf-button text-nowrap"
            onClick={() => setShowSeperateDoc(true)}
          >
            {isOn === "English" ? "Generate RFP Document " : "معاينة"}
          </Button>
        </div>
      }

      <Toaster />
    </Container>
  );
};

export default RfpDataFillTable