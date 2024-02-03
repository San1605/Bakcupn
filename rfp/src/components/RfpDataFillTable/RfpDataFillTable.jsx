import React, { useCallback, useContext, useEffect } from "react";
//library for the toster pdf styling
import { Accordion, Container, Button, Form } from "react-bootstrap";
import { Toaster } from "react-hot-toast";

//import component
import ChatContext from "../../Context/Context";
import InputBoxComponent from "../InputandTextArea/InputBoxComponent";


const RfpDataFillTable = ({ isManualRFPClicked, active, setShowSeperateDoc, sideNavData, sideNavCheckboxState, filteredData }) => {
  const {
    apidata,
    setApiData,
    pdfValue,
    setPdfValue,
    isOn,
    setTableValue,
    suggestQues
  } = useContext(ChatContext);



  useEffect(() => {
    console.log(sideNavData.filter((i, index) => sideNavCheckboxState[index]))
    console.log(apidata, '---api data')
  }, [sideNavData])
  //set of api callingn method all main api
  // const apicallingOne = useCallback(() => {
  //   fetch("http://20.127.168.63:8082/one_api")
  //     .then((response) => response.json())
  //     .then((json) => setApiData(json));
  // }, [setApiData]);

  // console.log(apidata,"apiDatanew")
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
  }, [pdfValue, isOn]);

  useEffect(() => {
    setPdfValue([]);
  }, [isOn]);

  console.log(sideNavCheckboxState, "jhuhi")

  return (

    <Container className={isManualRFPClicked ? "col-4 mt-2 rfp-create" : "col-12 mt-4 rfp-create"} >
      <Accordion defaultActiveKey="0">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey={0}>
            <Accordion.Header style={{paddingLeft:'15px'}}>
              {isOn === "English" ? "Ministry overview" : "نظرة عامة على الوزارة"}
            </Accordion.Header>
            <Accordion.Body>
              <Accordion.Item eventKey={0}>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={isOn === 'English' ? "The Ministry, born out of the exigencies of a rapidly evolving society, stands as the bastion of societal equilibrium and progress. Tasked with the intricate tapestry of governance, this institution is an amalgamation of visionary thought and pragmatic action. Its core mission transcends the conventional realms of governance, delving into the profound responsibility of shaping a collective future. Operating at the nexus of innovation and tradition, the Ministry acts as a dynamic catalyst, fostering a symbiotic relationship between the aspirations of the populace and the imperatives of the ever-changing global landscape.This clandestine engine of transformation operates with a commitment to inclusivity, weaving threads of social justice into the fabric of its policies. Beyond the usual bureaucratic confines, the Ministry embraces a culture of collaboration and cross-disciplinary ideation, recognizing the interconnectivity of challenges in this multifaceted era. Its endeavors span from technological frontiers to cultural preservation, environmental sustainability to mental well-being. In the pursuit of an enlightened society, the Ministry's endeavors are guided by an unwavering dedication to the principles of equity, resilience, and progress, ensuring that the nation evolves not just economically, but also ethically and harmoniously." : "الوزارة، التي ولدت من رحم مقتضيات مجتمع سريع التطور، تقف بمثابة معقل للتوازن المجتمعي والتقدم. إن هذه المؤسسة، المكلفة بنسيج الحكم المعقد، عبارة عن مزيج من الفكر البصري والعمل العملي. وتتجاوز مهمتها الأساسية المجالات التقليدية للحكم، وتتعمق في المسؤولية العميقة المتمثلة في تشكيل المستقبل الجماعي. تعمل الوزارة في إطار العلاقة بين الابتكار والتقاليد، كمحفز ديناميكي، مما يعزز العلاقة التكافلية بين تطلعات السكان وضرورات المشهد العالمي المتغير باستمرار. ويعمل هذا المحرك السري للتحول مع الالتزام بالشمولية، نسج خيوط العدالة الاجتماعية في نسيج سياساتها. وبعيدًا عن الحدود البيروقراطية المعتادة، تتبنى الوزارة ثقافة التعاون والتفكير متعدد التخصصات، مع الاعتراف بالترابط بين التحديات في هذا العصر متعدد الأوجه. وتمتد مساعيها من الحدود التكنولوجية إلى الحفاظ على الثقافة، والاستدامة البيئية إلى الصحة العقلية. وفي السعي لتحقيق مجتمع مستنير، تسترشد مساعي الوزارة بالتفاني الذي لا يتزعزع لمبادئ الإنصاف والمرونة والتقدم، مما يضمن تطور الأمة ليس فقط اقتصاديًا، ولكن أيضًا أخلاقيًا ومتناغمًا."}
                  className={isOn === "Arabic" ? "direction-right" : ""}
                />
              </Accordion.Item>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {!!apidata &&
          apidata
            ?.filter((val) => {
              // let values = val.category.split(" ")
              // console.log(values,"val inside apidata")
              // values.shift()
              // let finalVal = values.join(" ");
              if (active === 0) {
                return true
              } else {
                return filteredData.includes(val?.category)
              }
            })
            ?.map((res, index) => {
              console.log(res, 'res')
              let values = res.category.split(" ")
              values.shift()
              let finalVal = values.join(" ");
              return <>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey={index}>
                    <Accordion.Header>
                      {/* {index+1 + '. ' + finalVal} */}
                      {/* {finalVal}  */}
                      {isOn === "English" ? res.category : res.categoryArabic}
                    </Accordion.Header>
                    <Accordion.Body>
                      <Accordion.Item eventKey={index}>
                        {res?.categorydata?.map((e) => (
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
                            suggestQues={isOn === "English" ? e.suggestQues : e.suggestQuesArabic}
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