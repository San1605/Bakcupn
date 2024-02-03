import React from "react";
import "../OnboardDoctor/OnboardDoctor.css";
import next_icon from "../../../admin/assets/icons/next_icon.svg";
import back_icon from "../../../admin/assets/icons/back_icon.svg";
import { validateFormInput } from "../../../../utils/helpers/validateFormInput";
import { toast } from "react-hot-toast";

const ProfessionalInformation = ({
  onboardPayload,
  setOnboardPayload,
  setActiveTabIndex,
}) => {
  let toastId;
  const handleOnboardPayload = (e) => {
    setOnboardPayload(() => {
      return {
        ...onboardPayload,
        [e.target.name]: e.target.value,
      };
    });
  };
  const storeFiles = (e) => {
    setOnboardPayload(() => {
      return {
        ...onboardPayload,
        [e.target.name]: e.target.files[0],
      };
    });
  };

  const validateForm = (val) => {
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
    if (
      (MedicalDegree1Valid ||
        Speciality1Valid ||
        MedicalLicenceNumberValid ||
        BoardCertificate1Valid ||
        NPInumberValid ||
        ProfessionalMembershipValid ||
        MedicalDegree2Valid ||
        BoardCertificate2Valid) !== ""
    ) {
      toast.dismiss(toastId);
      MedicalDegree1Valid
        ? (toastId = toast.error(MedicalDegree1Valid))
        : Speciality1Valid
        ? (toastId = toast.error(Speciality1Valid))
        : MedicalLicenceNumberValid
        ? (toastId = toast.error(MedicalLicenceNumberValid))
        : BoardCertificate1Valid
        ? (toastId = toast.error(BoardCertificate1Valid))
        : NPInumberValid
        ? (toastId = toast.error(NPInumberValid))
        : ProfessionalMembershipValid
        ? (toastId = toast.error(ProfessionalMembershipValid))
        : MedicalDegree2Valid
        ? (toastId = toast.error(MedicalDegree2Valid))
        : BoardCertificate2Valid &&
          (toastId = toast.error(BoardCertificate2Valid));
      console.log("Form is not valid");
    } else {
      setActiveTabIndex(val);
    }
  };

  return (
    <div className="onboard_detailss">
      <h3 className="personal mt-1 text-nowrap">Professional Information</h3>
      <div className="personal-border"></div>
      <form className="onboard-form" onSubmit={(e) => e.preventDefault()}>
        <div className="input-container">
          <label className="required">Medical Degree 1</label>
          <br />
          <input
            name="MedicalDegree1"
            type="text"
            placeholder="Enter Medical Degree"
            onChange={handleOnboardPayload}
            value={onboardPayload?.MedicalDegree1}
          />
        </div>
        <div className="input-container">
          <label className="required">Specialty</label>
          <br />
          <input
            name="Speciality1"
            type="text"
            placeholder="Enter Specialty"
            onChange={handleOnboardPayload}
            value={onboardPayload?.Speciality1}
          />
        </div>
        <div className="input-container">
          <label className="required">Medical License Number</label>
          <br />
          <input
            name="MedicalLicenceNumber"
            type="text"
            placeholder="Enter Medical License Number"
            onChange={handleOnboardPayload}
            value={onboardPayload?.MedicalLicenceNumber}
          />
        </div>
        <div className="input-container">
          <label className="required">Board Certificate</label>
          <br />
          <input name="BoardCertificate1" type="file" onChange={storeFiles} />
        </div>
        <div className="input-container">
          <label className="required">
            National Provider Identifier (NPI) number
          </label>
          <br />
          <input
            name="NPInumber"
            type="text"
            placeholder="Enter NPI number"
            onChange={handleOnboardPayload}
            value={onboardPayload?.NPInumber}
          />
        </div>
        <div className="input-container">
          <label className="required">
            Professional membership and affiliations
          </label>
          <br />
          <input
            name="ProfessionalMembershipAndAffiliations"
            type="text"
            placeholder="Enter membership and affiliations"
            onChange={handleOnboardPayload}
            value={onboardPayload?.ProfessionalMembershipAndAffiliations}
          />
        </div>
        <div className="input-container">
          <label>Medical Degree 2</label>
          <br />
          <input
            name="MedicalDegree2"
            type="text"
            placeholder="Enter Medical Degree"
            onChange={handleOnboardPayload}
            value={onboardPayload?.MedicalDegree2}
          />
        </div>
        <div className="input-container">
          <label className="required">Specialty</label>
          <br />
          <select
            className="input-container onboard-select"
            name="Speciality2"
            onChange={handleOnboardPayload}
          >
            <option value="" disabled selected>
              Enter Specialty
            </option>
            <option value="Specialty1">Specialty1</option>
            <option value="Specialty2">Specialty2</option>
            <option value="Specialty3">Specialty3</option>
            <option value="Specialty4">Specialty4</option>
          </select>
        </div>
        <div className="input-container">
          <label>Board Certificate</label>
          <br />
          <input name="BoardCertificate2" type="file" onChange={storeFiles} />
        </div>
      </form>
      <div className="modal-button-container1">
        <button
          className="back_icon"
          onClick={() => {
            setActiveTabIndex(0);
          }}
        >
          <img src={back_icon} alt="" className="pe-2" />
          Back
        </button>
        <button
          className="next_icon"
          onClick={() => {
            validateForm(2);
          }}
        >
          Next
          <img src={next_icon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default ProfessionalInformation;
