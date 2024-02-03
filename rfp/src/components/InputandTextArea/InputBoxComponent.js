import React, { useEffect, useState } from "react";
import axios from "axios";
import "./input.css"
import { Accordion, Form, Row, Col, Button } from "react-bootstrap";
import toast from "react-hot-toast";
// submit btn
import submitBtn from "../../assets/images/submit-btn.svg";
import dataSet from "../../data.json";
import DataTable from "../DataTable/DataTable";
import CheckBox from "../DataTable/CheckBox";
import send from '../../assets/images/send.svg';
import { useContext } from "react";
import ChatContext from "../../Context/Context";

function InputBoxComponent({
  showPreviewcol,
  Header,
  scope,
  NAME,
  setPdfValue,
  apidata,
  pdfValue,
  defaultText,
  isOn,
  setTableValue,
  filteredData,
  suggestQues
}) {
  //state declaration
  const [functional_requirementText, setFunctional_requirementText] =
    useState("");
  //  console.log(dataSet.response.content,"dataSet")
  const [dataSet, setDataSet] = useState("");
  const [textResponse, setTextResponse] = useState();
  const [isCustom, setIsCustom] = useState(false);
  const [tableResponse, setTableResponse] = useState();
  const { timeStamp, setPreviewData,setSetpreview } = useContext(ChatContext)
  // console.log(timeStamp.toISOString(), "timeStamp")
  useEffect(() => {
    setTimeout(() => {
      if (textResponse) {
        // console.log(textResponse, "textResponse");
        setPdfValue((prev) => {
          // Check if NAME already exists in pdfValue
          const nameIndex = prev.findIndex(
            (item) =>
              item.header === Header &&
              item.data.some((dataItem) => dataItem.name === NAME)
          );

          if (nameIndex !== -1) {
            // If NAME exists, update its value
            const updatedData = [...prev[nameIndex].data].map((dataItem) => {
              if (dataItem.name === NAME) {
                return { ...dataItem, value: textResponse };
              }
              return dataItem;
            });

            return [
              ...prev.slice(0, nameIndex),
              { ...prev[nameIndex], data: updatedData },
              ...prev.slice(nameIndex + 1),
            ];
          } else {
            // If NAME doesn't exist, add a new value
            return [
              ...prev,
              { header: Header, data: [{ name: NAME, value: textResponse }] },
            ];
          }
        });
        setPreviewData("")  ///////////////////////
      }
    }, 100);
  }, [setPdfValue, textResponse, NAME, isOn]);

  //api calling method declaration
  const submitAPI = (apiSub, text, setTextResponse, isOn) => {
    setSetpreview(false)
    if (text) {
      const toastId = toast.loading("Please wait...");
      var authOptions = {
        method: "post",
        url: `http://20.127.168.63:8082/${apiSub}`,
        data: JSON.stringify({ prompt: text,  subSectionName : NAME , selected_section_list: filteredData, sessionID: timeStamp, sectionName:Header }),
        headers: {
          "Content-Type": "application/json",
        },
        json: true,
      };
      axios(authOptions)
        .then((response) => {
          if (response.status === 200) {
            setPreviewData("");
            const data = response?.data?.response;
            setDataSet(data);
            if (data.type === "text") {
              setTextResponse(data.content);
            }
            else {
              const tableHTMLString = `<table>
              <thead>
                <tr>
                <th style="min-width: 250px" width="250px">Content</th>
                <th>Yes</th>
                <th>No</th>
                <th>Partially</th>
                <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                ${data.content.length > 0 &&
                data?.content
                  ?.map(
                    (item) =>
                      ` <tr>
                <td style="min-width: 250px" width="250px">${item}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>`
                  )
                  .join("")
                }
              </tbody>
            </table>`;
              setTextResponse(tableHTMLString);
            }
          }
          toast.dismiss(toastId);
        })
        .catch((error) => {
          toast.dismiss(toastId);
          toast.error("Something went wrong");
        });
    } else {
      toast.error("Please enter value");
    }
  };

  useEffect(() => {
    if (tableResponse) {
      setTableValue(tableResponse);
    }
  }, [tableResponse, setPdfValue]);

  useEffect(() => {
    setTimeout(() => {
      if (defaultText) {
        console.log("...")
        if (isCustom) {
          setTextResponse("")
        } else {
          setTextResponse(defaultText);
        }
      }
    }, 100);
  }, [isCustom, defaultText, isOn])

  return (
    <>
      <Accordion.Header>{
        isOn === "English" ?
          NAME === "1.1 Company Overview" ? "1.1 Company Overview *" : NAME === "2.1 Project Overview" ? "2.1 Project Overview *" : NAME
          :
          NAME === "1.1 نظرة عامة على الشركة" ? "1.1 نظرة عامة على الشركة*" : NAME === '2.1 نظرة عامة على المشروع' ? "2.1 نظرة عامة على المشروع*" : NAME
      }

      </Accordion.Header>
      <Accordion.Body>

        {suggestQues?.map((section, index) => (
          <div key={index} className="input-section d-flex mb-2">
            <div className="sections" onClick={() => setFunctional_requirementText(section)} >{section}</div>
          </div>
        ))}


        {defaultText && (
          <div key={`inline-radio`} className=" mb-1">
            {/* <b> Text Type:</b> */}
            {"  "}
            <Form.Check
              inline
              label="Default"
              name={`input-${NAME}`}
              type="radio"
              id={`inline-radio-1${NAME}`}
              onClick={() => setIsCustom(!isCustom)}
              defaultChecked={!isCustom}
            />
            <Form.Check
              inline
              label="Custom"
              name={`input-${NAME}`}
              type="radio"
              id={`inline-radio-2${NAME}`}
              onClick={() => setIsCustom(!isCustom)}
              defaultChecked={isCustom}
            />
          </div>
        )}
        <Row>
          {/*user input box*/}

          <Col md={showPreviewcol ? 12 : 6} sm={12} className="position-relative">
            <Form.Control
              as="textarea"
              rows={4}
              value={functional_requirementText}
              onChange={(e) => {
                setFunctional_requirementText(e.target.value);
              }}
              placeholder={isOn === "English" ? "Add text here..." : "أضف نصًا هنا..."}
              className={isOn === "Arabic" ? "direction-right" : ""}
              disabled={defaultText && !isCustom}

            />
            {
              scope!=="" && (<img src={send} alt='' className="submit_icon position-absolute" onClick={() =>
                submitAPI(
                  scope,
                  functional_requirementText,
                  setTextResponse
                )
              }
              />)
            }
            
            {/* {isOn === "English" ? "Submit" : "يُقدِّم"} */}
            <div className="d-flex justify-content-end  align-items-center gap-1">
              <div className="d-flex justify-content-center pt-1  align-items-center">
                {/* <SpeechToText setSowText={setSowText} /> */}
              </div>
              <div>
                {/* <Button
                  variant="primary"
                  type="button"
                  className="mt-2"
                  onClick={() =>
                    submitAPI(
                      scope,
                      functional_requirementText,
                      setTextResponse
                    )
                  }
                >
                  {isOn === "English" ? "Submit" : "يُقدِّم"}
                </Button> */}
              </div>
            </div>
          </Col>

          {/*response text area box*/}
          {/*response text area box*/}
          {
            !showPreviewcol && <Col md={6} sm={12}>
              {dataSet ? (
                dataSet && dataSet.type == "text" ? (
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={textResponse}
                    className={isOn === "Arabic" ? "direction-right" : ""}
                    onChange={(e) => {
                      setTextResponse(e.target.value);
                    }}
                    placeholder="Preview"
                  />
                ) : (
                  <DataTable
                    data={dataSet.content}
                    setTableResponse={setTableResponse}
                  />
                )
              ) : (
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={textResponse}
                  className={isOn === "Arabic" ? "direction-right" : ""}
                  placeholder="Preview"
                />
              )}
            </Col>
          }
        </Row>
      </Accordion.Body>
    </>
  );
}

export default InputBoxComponent;