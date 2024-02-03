import React, { useState, createContext } from "react";
const ChatContext = createContext();
function ContextComponent({ children }) {
  const[globalApiEndPoint] = ("http://20.127.168.63:8082")
  const [apidata, setApiData] = useState();
  const [pdfValue, setPdfValue] = useState([])
  const [isOn, setIsOn] = useState("English");
  const [project_scopeResp, setProject_scopeResp] = useState("");
  const [project_scopeText, setProject_scopeText] = useState("");
  const [pdfBlob, setPdfBlob] = useState("");
  const [functional_requirementResp, setFunctional_requirementResp] =
    useState("");
  const [functional_requirementText, setFunctional_requirementText] =
   useState("");
  const [solution_descriptionResp, setSolution_descriptionResp] = useState("");
  const [solution_descriptionText, setSolution_descriptionText] = useState("");

  const [
    functional_security_requirementResp,
    setFunctional_security_requirementResp,
  ] = useState("");
  const [
    functional_security_requirementText,
    setFunctional_security_requirementText,
  ] = useState("");

  const [other_requirementResp, setOther_requirementResp] = useState("");
  const [other_requirementText, setOther_requirementText] = useState("");

  const [non_functional_requirementResp, setNon_functional_requirementResp] =
    useState("");
  const [non_functional_requirementText, setNon_functional_requirementText] =
    useState("");

  const [
    non_functional_security_requirementResp,
    setNon_functional_security_requirementResp,
  ] = useState("");
  const [
    non_functional_security_requirementText,
    setNon_functional_security_requirementText,
  ] = useState("");

  const [upgrade_abilityResp, setUpgrade_abilityResp] = useState("");
  const [upgrade_abilityText, setUpgrade_abilityText] = useState("");

  const [interoperabilityResp, setInteroperabilityResp] = useState("");
  const [interoperabilityText, setInteroperabilityText] = useState("");
  const [exclusionResp, setExclusionResp] = useState("");
  const [exclusionText, setExclusionText] = useState("");
  const [service_level_agreementResp, setService_level_agreementResp] =
    useState("");
  const [service_level_agreementText, setService_level_agreementText] =
    useState("");
  const [project_deliveryResp, setProject_deliveryResp] = useState("");
  const [project_deliveryText, setProject_deliveryText] = useState("");


  const [tableValue, setTableValue] = useState([])
  
  const [timeStamp, setTimeStamp] = useState(Date.now())

  return (
    <ChatContext.Provider
      value={{
        apidata, setApiData,
        pdfValue, setPdfValue,
        project_scopeResp,
        setProject_scopeResp,
        project_scopeText,
        setProject_scopeText,
        functional_requirementResp,
        setFunctional_requirementResp,
        functional_requirementText,
        setFunctional_requirementText,
        isOn,
        setIsOn,
        solution_descriptionResp,
        setSolution_descriptionResp,
        solution_descriptionText,
        setSolution_descriptionText,

        functional_security_requirementResp,
        setFunctional_security_requirementResp,
        functional_security_requirementText,
        setFunctional_security_requirementText,
        other_requirementResp,
        setOther_requirementResp,
        other_requirementText,
        setOther_requirementText,
        non_functional_requirementResp,
        setNon_functional_requirementResp,

        non_functional_requirementText,
        setNon_functional_requirementText,

        non_functional_security_requirementResp,
        setNon_functional_security_requirementResp,
        non_functional_security_requirementText,
        setNon_functional_security_requirementText,

        upgrade_abilityResp,
        setUpgrade_abilityResp,
        upgrade_abilityText,
        setUpgrade_abilityText,

        interoperabilityResp,
        setInteroperabilityResp,
        interoperabilityText,
        setInteroperabilityText,
        exclusionResp,
        setExclusionResp,
        exclusionText,
        setExclusionText,
        service_level_agreementResp,
        setService_level_agreementResp,
        service_level_agreementText,
        setService_level_agreementText,
        project_deliveryResp,
        setProject_deliveryResp,
        project_deliveryText,
        setProject_deliveryText,
        pdfBlob,
        setPdfBlob,
        tableValue, setTableValue,
        globalApiEndPoint,
        timeStamp,
        setTimeStamp
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
export default ChatContext;
export { ContextComponent };
