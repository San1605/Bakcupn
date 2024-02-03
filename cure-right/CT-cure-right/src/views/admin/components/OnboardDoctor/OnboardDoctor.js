import React, { useEffect } from "react";
import { useState } from "react";
import "./OnboardDoctor.css";
import Button from "../../../../components/Button/Button";
import OnboardSidebar from "../OnboardSidebar/OnboardSidebar";
import PersonalDetails from "../OnboardDetailsForms/PersonalDetails";
import ProfessionalInformation from "../OnboardDetailsForms/ProfessionalInformation";
import Education from "../OnboardDetailsForms/Education";
import WorkHistory from "../OnboardDetailsForms/WorkHistory";
import Documents from "../OnboardDetailsForms/Documents";
import Background from "../OnboardDetailsForms/Background";
import Agreement from "../OnboardDetailsForms/Agreement";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { doctorOnboard } from "../../../../services/adminApi";
import { toast } from "react-hot-toast";
import { validateFormInput } from "../../../../utils/helpers/validateFormInput";

const OnboardDoctor = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [onboardPayload, setOnboardPayload] = useState({
    FirstName: "",
    LastName: "",
    Gender: "",
    DOB: "",
    image: "",
    phoneNumber1: "",
    phoneNumber2: "",
    email: "",
    Pincode: "",
    address: "",
    state: "",
    city: "",
    country: "",
    preferredMethodOfCommunication: "",
    languageProficiency: "",
    AvaibilityForOnCallDuties: "",
    InterpreterterNeeded: "",
    MedicalDegree1: "",
    Speciality1: "",
    MedicalLicenceNumber: "",
    BoardCertificate1: "",
    NPInumber: "",
    ProfessionalMembershipAndAffiliations: "",
    MedicalDegree2: "",
    Speciality2: "",
    BoardCertificate2: "",
    medicalSchool: "",
    SchoolstartDate: "",
    SchoolendDate: "",
    TrainingProgramCompleted: "",
    uploadDegree: "",
    CME: "",
    uploadTrainingCertificate: "",
    graduationYear: "",
    previousEmployement: "",
    preEmployeeStartDate: "",
    preEmployeeendDate: "",
    previousPosition: "",
    privileges: "",
    Department: "",
    hospitalAffiliations: "",
    AadharCard: "",
    panCard: "",
    insuranceDocument: "",
    insuranceNumber: "",
    BankAccountNumber: "",
    confirmAccountNumber: "",
    IFSCCOde: "",
    AccountHolderName: "",
    CriminalHistory: "",
    DisciplinaryActions: "",
    CriminalReason: "",
    DisciplinaryReasons: "",
    signature: "",
    experience: "",
    ConsentToReleaseMedicalInformation: "",
    AcknowledgeOfCompliance: "",
    AcceptTermsCondetion: "",
    price: 1000,
    password: "doctor",
    userType: "doctor",
    status: 1,
    teamMember: 10,
  });
  let toastId;
  const [activeOnboardTab, setActiveOnboardTab] = useState();
  // const [showButton, setShowButton] = useState(true);
  const [file, setFile] = useState(null);
  const [data, setData] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   console.log("handleSubmit is called.");
  //   if (file) {
  //     let formData = new FormData();
  //     formData.append("files", file);
  //     axios
  //       .post("https://cure-rights.azurewebsites.net/postdoctor", formData)
  //       .then((response) => {
  //         console.log("API response:", response.data);
  //         setData(response.data["0"]);
  //       })
  //       .catch((error) => {
  //         console.error("Error submitting data:", error);
  //       });
  //   }
  // };
  const validateForm = (val) => {
    let firstNameValid = validateFormInput(
      "first_name",
      onboardPayload?.FirstName
    );
    let lastNameValid = validateFormInput(
      "last_name",
      onboardPayload?.LastName
    );
    let genderValid = validateFormInput("Gender", onboardPayload?.Gender);
    let validDob = validateFormInput("DOB", onboardPayload?.DOB);
    let validPhone1 = validateFormInput(
      "contact_no",
      onboardPayload?.phoneNumber1
    );
    let validEmail = validateFormInput("email", onboardPayload?.email);
    let pincodeValid = validateFormInput("Pincode", onboardPayload?.Pincode);
    let addressValid = validateFormInput("address", onboardPayload?.address);
    let stateValid = validateFormInput("state", onboardPayload?.state);
    let cityValid = validateFormInput("city", onboardPayload?.city);
    let countryValid = validateFormInput("country", onboardPayload?.country);
    let languageProficiencyValid = validateFormInput(
      "languageProficiency",
      onboardPayload?.languageProficiency
    );
    let AvaibilityValid = validateFormInput(
      "AvaibilityForOnCallDuties",
      onboardPayload?.AvaibilityForOnCallDuties
    );
    let InterpreterValid = validateFormInput(
      "InterpreterterNeeded",
      onboardPayload?.InterpreterterNeeded
    );
    let preferredMethodValid = validateFormInput(
      "preferredMethodOfCommunication",
      onboardPayload?.preferredMethodOfCommunication
    );

    let MedicalDegree1Valid = validateFormInput(
      "MedicalDegree1",
      onboardPayload?.MedicalDegree1
    );
    let Speciality1Valid = validateFormInput(
      "Speciality1",
      onboardPayload?.Speciality1
    );
    let MedicalLicenceNumberValid = validateFormInput(
      "MedicalLicenceNumber",
      onboardPayload?.MedicalLicenceNumber
    );
    let BoardCertificate1Valid = validateFormInput(
      "BoardCertificate1",
      onboardPayload?.BoardCertificate1
    );
    let NPInumberValid = validateFormInput(
      "NPInumber",
      onboardPayload?.NPInumber
    );
    let ProfessionalMembershipValid = validateFormInput(
      "ProfessionalMembershipAndAffiliations",
      onboardPayload?.ProfessionalMembershipAndAffiliations
    );
    let MedicalDegree2Valid = validateFormInput(
      "MedicalDegree2",
      onboardPayload?.MedicalDegree2
    );
    let BoardCertificate2Valid = validateFormInput(
      "BoardCertificate2",
      onboardPayload?.BoardCertificate2
    );

    let medicalSchoolValid = validateFormInput(
      "medicalSchool",
      onboardPayload?.medicalSchool
    );
    let TrainingProgramCompletedValid = validateFormInput(
      "TrainingProgramCompleted",
      onboardPayload?.TrainingProgramCompleted
    );
    let uploadDegreeValid = validateFormInput(
      "uploadDegree",
      onboardPayload?.uploadDegree
    );
    let CMEValid = validateFormInput("CME", onboardPayload?.CME);
    let uploadTrainingCertificateValid = validateFormInput(
      "uploadTrainingCertificate",
      onboardPayload?.uploadTrainingCertificate
    );

    let previousEmployementValid = validateFormInput(
      "previousEmployement",
      onboardPayload?.previousEmployement
    );
    let previousPositionValid = validateFormInput(
      "previousPosition",
      onboardPayload?.previousPosition
    );
    let privilegesValid = validateFormInput(
      "privileges",
      onboardPayload?.privileges
    );
    let DepartmentValid = validateFormInput(
      "Department",
      onboardPayload?.Department
    );
    let hospitalAffiliationsValid = validateFormInput(
      "hospitalAffiliations",
      onboardPayload?.hospitalAffiliations
    );

    let AadharCardValid = validateFormInput(
      "AadharCard",
      onboardPayload?.AadharCard
    );
    let panCardValid = validateFormInput("panCard", onboardPayload?.panCard);
    let insuranceDocumentValid = validateFormInput(
      "insuranceDocument",
      onboardPayload?.insuranceDocument
    );
    let insuranceNumberValid = validateFormInput(
      "insuranceNumber",
      onboardPayload?.insuranceNumber
    );
    let BankAccountNumberValid = validateFormInput(
      "BankAccountNumber",
      onboardPayload?.BankAccountNumber
    );
    let confirmAccountNumberValid = validateFormInput(
      "confirmAccountNumber",
      onboardPayload?.confirmAccountNumber
    );
    let IFSCCOdeValid = validateFormInput("IFSCCOde", onboardPayload?.IFSCCOde);
    let AccountHolderNameValid = validateFormInput(
      "AccountHolderName",
      onboardPayload?.AccountHolderName
    );

    let CriminalHistoryValid = validateFormInput(
      "CriminalHistory",
      onboardPayload?.CriminalHistory
    );
    let DisciplinaryActionsValid = validateFormInput(
      "previousPosition",
      onboardPayload?.DisciplinaryActions
    );
    let CriminalReasonValid = validateFormInput(
      "CriminalReason",
      onboardPayload?.CriminalReason
    );
    let DisciplinaryReasonsValid = validateFormInput(
      "DisciplinaryReasons",
      onboardPayload?.DisciplinaryReasons
    );

    let ConsentToReleaseMedicalInformationValid = validateFormInput(
      "ConsentToReleaseMedicalInformation",
      onboardPayload?.ConsentToReleaseMedicalInformation
    );
    let AcknowledgeOfComplianceValid = validateFormInput(
      "AcknowledgeOfCompliance",
      onboardPayload?.AcknowledgeOfCompliance
    );
    let signatureValid = validateFormInput(
      "signature",
      onboardPayload?.signature
    );
    let AcceptTermsCondetionValid = validateFormInput(
      "AcceptTermsCondetion",
      onboardPayload?.AcceptTermsCondetion
    );

    if (
      (firstNameValid ||
        lastNameValid ||
        genderValid ||
        validDob ||
        validPhone1 ||
        validEmail ||
        pincodeValid ||
        addressValid ||
        stateValid ||
        cityValid ||
        countryValid ||
        languageProficiencyValid ||
        AvaibilityValid ||
        InterpreterValid ||
        preferredMethodValid ||
        MedicalDegree1Valid ||
        Speciality1Valid ||
        MedicalLicenceNumberValid ||
        BoardCertificate1Valid ||
        NPInumberValid ||
        ProfessionalMembershipValid ||
        MedicalDegree2Valid ||
        BoardCertificate2Valid ||
        medicalSchoolValid ||
        TrainingProgramCompletedValid ||
        uploadDegreeValid ||
        CMEValid ||
        uploadTrainingCertificateValid ||
        previousEmployementValid ||
        previousPositionValid ||
        privilegesValid ||
        DepartmentValid ||
        hospitalAffiliationsValid ||
        AadharCardValid ||
        panCardValid ||
        insuranceDocumentValid ||
        insuranceNumberValid ||
        BankAccountNumberValid ||
        confirmAccountNumberValid ||
        IFSCCOdeValid ||
        AccountHolderNameValid ||
        CriminalHistoryValid ||
        DisciplinaryActionsValid ||
        CriminalReasonValid ||
        DisciplinaryReasonsValid ||
        ConsentToReleaseMedicalInformationValid ||
        AcknowledgeOfComplianceValid ||
        signatureValid ||
        AcceptTermsCondetionValid
        ) !== ""
    ) {
      toast.dismiss(toastId);
      firstNameValid
        ? (toastId = toast.error(firstNameValid))
        : lastNameValid
        ? (toastId = toast.error(lastNameValid))
        : genderValid
        ? (toastId = toast.error(genderValid))
        : validDob
        ? (toastId = toast.error(validDob))
        : validPhone1
        ? (toastId = toast.error(validPhone1))
        : validEmail
        ? (toastId = toast.error(validEmail))
        : pincodeValid
        ? (toastId = toast.error(pincodeValid))
        : addressValid
        ? (toastId = toast.error(addressValid))
        : stateValid
        ? (toastId = toast.error(stateValid))
        : cityValid
        ? (toastId = toast.error(cityValid))
        : countryValid
        ? (toastId = toast.error(countryValid))
        : languageProficiencyValid
        ? (toastId = toast.error(languageProficiencyValid))
        : AvaibilityValid
        ? (toastId = toast.error(AvaibilityValid))
        : InterpreterValid
        ? (toastId = toast.error(InterpreterValid))
        : preferredMethodValid 
        ? (toastId = toast.error(preferredMethodValid))
        :   MedicalDegree1Valid
        ? (toastId =toast.error(MedicalDegree1Valid))
        : Speciality1Valid
        ? (toastId =toast.error(Speciality1Valid))
        : MedicalLicenceNumberValid
        ? (toastId =toast.error(MedicalLicenceNumberValid))
        : BoardCertificate1Valid
        ? (toastId =toast.error(BoardCertificate1Valid))
        : NPInumberValid
        ? (toastId =toast.error(NPInumberValid))
        : ProfessionalMembershipValid
        ? (toastId =toast.error(ProfessionalMembershipValid))
        : MedicalDegree2Valid
        ? (toastId =toast.error(MedicalDegree2Valid))
        : BoardCertificate2Valid 
        ? (toastId =toast.error(BoardCertificate2Valid))
        : medicalSchoolValid
        ? (toastId =toast.error(medicalSchoolValid))
        : TrainingProgramCompletedValid
        ? (toastId =toast.error(TrainingProgramCompletedValid))
        : uploadDegreeValid
        ? (toastId =toast.error(uploadDegreeValid))
        : CMEValid
        ? (toastId =toast.error(CMEValid))
        : uploadTrainingCertificateValid 
        ? (toastId =toast.error(uploadTrainingCertificateValid))
        : previousEmployementValid
        ? (toastId =toast.error(previousEmployementValid))
        : previousPositionValid
        ? (toastId =toast.error(previousPositionValid))
        : privilegesValid
        ? (toastId =toast.error(privilegesValid))
        : DepartmentValid
        ? (toastId =toast.error(DepartmentValid))
        : hospitalAffiliationsValid 
        ? (toastId =toast.error(hospitalAffiliationsValid))
        :  AadharCardValid
        ? (toastId =toast.error(AadharCardValid))
        : panCardValid
        ? (toastId =toast.error(panCardValid))
        : insuranceDocumentValid
        ? (toastId =toast.error(insuranceDocumentValid))
        : insuranceNumberValid
        ? (toastId =toast.error(insuranceNumberValid))
        : BankAccountNumberValid
        ? (toastId =toast.error(BankAccountNumberValid))
        : confirmAccountNumberValid
        ? (toastId =toast.error(confirmAccountNumberValid))
        : IFSCCOdeValid
        ? (toastId =toast.error(IFSCCOdeValid))
        : AccountHolderNameValid 
        ? (toastId =toast.error(AccountHolderNameValid))
        :  CriminalHistoryValid
        ? (toastId =toast.error(CriminalHistoryValid))
        : DisciplinaryActionsValid
        ? (toastId =toast.error(DisciplinaryActionsValid))
        : CriminalReasonValid
        ? (toastId =toast.error(CriminalReasonValid))
        : DisciplinaryReasonsValid 
        ? (toastId =toast.error(DisciplinaryReasonsValid))
        : ConsentToReleaseMedicalInformationValid
        ? (toastId =toast.error(ConsentToReleaseMedicalInformationValid))
        : AcknowledgeOfComplianceValid
        ? (toastId =toast.error(AcknowledgeOfComplianceValid))
        : signatureValid
        ? (toastId =toast.error(signatureValid))
        : AcceptTermsCondetionValid && (toastId =toast.error(AcceptTermsCondetionValid));

      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    if (validateForm()) {
       //console.log("Form is valid");
       let toastId = toast.loading("Loading...");
       e?.preventDefault();
       let formData = new FormData();
       for (var key in onboardPayload) {
         formData.append(key, onboardPayload[key]);
       }
       try {
         const res = await doctorOnboard(formData);
         console.log(res, "data");
         if (res.status === 200) {
           navigate("/admin/home");
         } else {
           console.log(res.message);
           toast.error(res.message);
         }
       } catch (err) {
         toast.error(err.message);
         console.log(err, "in catch");
       }
       toast.dismiss(toastId);
       toast.success("Onboarded Successfully");
     
      
    } else {
      console.log("Form is not valid");
     // setActiveTabIndex(6);
    
  };
  }
  //   let toastId = toast.loading("Loading...");
  //   e?.preventDefault();
  //   let formData = new FormData();
  //   for (var key in onboardPayload) {
  //     formData.append(key, onboardPayload[key]);
  //   }
  //   try {
  //     const res = await doctorOnboard(formData);
  //     console.log(res, "data");
  //     if (res.status === 200) {
  //       navigate("/admin/home");
  //     } else {
  //       console.log(res.message);
  //       toast.error(res.message);
  //     }
  //   } catch (err) {
  //     toast.error(err.message);
  //     console.log(err, "in catch");
  //   }
  //   toast.dismiss(toastId);
  //   toast.success("Onboarded Successfully");
  // };

  return (
    <div className="h-100">
      <div className=" home-top  p-0 w-100 onboard_page">
        <div>
          <h3 className="heading-overview mb-1">Onboard New</h3>
          <h2 className="heading-homepage">List of Doctors/ Onboard Doctor</h2>
        </div>
        <div className="h-auto onboard-save">
          {activeTabIndex === 6 && (
            <Button
              type="primary"
              className="py-2 px-4"
              text="Save"
              onClick={handleSubmit}
            />
          )}
        </div>
      </div>
      <div className="onboard_height d-flex">
        <OnboardSidebar
          activeOnboardTab={activeOnboardTab}
          setActiveOnboardTab={setActiveOnboardTab}
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
        />
        <div className="onboard_details h-100">
          {activeTabIndex === 0 ? (
            <PersonalDetails
              onboardPayload={onboardPayload}
              setOnboardPayload={setOnboardPayload}
              setActiveTabIndex={setActiveTabIndex}
            />
          ) : activeTabIndex === 1 ? (
            <ProfessionalInformation
              onboardPayload={onboardPayload}
              setOnboardPayload={setOnboardPayload}
              setActiveTabIndex={setActiveTabIndex}
            />
          ) : activeTabIndex === 2 ? (
            <Education
              onboardPayload={onboardPayload}
              setOnboardPayload={setOnboardPayload}
              setActiveTabIndex={setActiveTabIndex}
            />
          ) : activeTabIndex === 3 ? (
            <WorkHistory
              onboardPayload={onboardPayload}
              setOnboardPayload={setOnboardPayload}
              setActiveTabIndex={setActiveTabIndex}
            />
          ) : activeTabIndex === 4 ? (
            <Documents
              onboardPayload={onboardPayload}
              setOnboardPayload={setOnboardPayload}
              setActiveTabIndex={setActiveTabIndex}
            />
          ) : activeTabIndex === 5 ? (
            <Background
              onboardPayload={onboardPayload}
              setOnboardPayload={setOnboardPayload}
              setActiveTabIndex={setActiveTabIndex}
            />
          ) : (
            activeTabIndex === 6 && (
              <Agreement
                onboardPayload={onboardPayload}
                setOnboardPayload={setOnboardPayload}
                setActiveTabIndex={setActiveTabIndex}
              />
            )
          )}
          {activeOnboardTab}
        </div>
      </div>
    </div>
  );
};

export default OnboardDoctor;