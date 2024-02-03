import React from "react";
import Button from "../../../../components/Button/Button";
import next_icon from "../../../admin/assets/icons/next_icon.svg";
import back_icon from "../../../admin/assets/icons/back_icon.svg";
import { validateFormInput } from "../../../../utils/helpers/validateFormInput";
import { toast } from "react-hot-toast";

const Agreement = ({
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

  const handleCheckbox = (e) => {
    setOnboardPayload(() => {
      return {
        ...onboardPayload,
        [e.target.name]: e.target.checked === true ? 1 : 0,
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
      (ConsentToReleaseMedicalInformationValid ||
        AcknowledgeOfComplianceValid ||
        signatureValid ||
        AcceptTermsCondetionValid) !== ""
    ) {
      toast.dismiss(toastId);
      ConsentToReleaseMedicalInformationValid
        ? (toastId = toast.error(ConsentToReleaseMedicalInformationValid))
        : AcknowledgeOfComplianceValid
        ? (toastId = toast.error(AcknowledgeOfComplianceValid))
        : signatureValid
        ? (toastId = toast.error(signatureValid))
        : AcceptTermsCondetionValid &&
          (toastId = toast.error(AcceptTermsCondetionValid));
      console.log("Form is not valid");
    } else {
      // console.log("Form is not valid");
      // alert("fill all input values first...");
      setActiveTabIndex(val);
    }
  };
  return (
    <div className="onboard_detailss">
      <h3 className="personal mt-1 text-nowrap">Agreements and Signatures</h3>
      <div className="personal-border"></div>
      <form className="onboard-form " onSubmit={(e) => e.preventDefault()}>
        <div className="input-container1 d-flex mt-3">
          <input
            type="checkbox"
            id="Accept1"
            onChange={handleCheckbox}
            value={onboardPayload?.ConsentToReleaseMedicalInformation}
            name="ConsentToReleaseMedicalInformation"
            checked={onboardPayload.ConsentToReleaseMedicalInformation}
          />
          <label for="Accept1">
            {" "}
            Consent to release medical information for insurance billing and
            coordination of care
          </label>
          <br />
        </div>
        <div className="input-container1 d-flex mt-3">
          <input
            type="checkbox"
            id="Accept2"
            onChange={handleCheckbox}
            value={onboardPayload?.AcknowledgeOfCompliance}
            name="AcknowledgeOfCompliance"
            checked={onboardPayload.AcknowledgeOfCompliance}
          />
          <label for="Accept2">
            Acknowledgment of compliance with privacy and confidentiality
            regulations
          </label>
          <br />
        </div>
        <div className="input-container">
          <label className="required">Signature</label>
          <br />
          <input name="signature" type="file" onChange={storeFiles} />
          <div className="input-container1 d-flex mt-3">
            <input
              type="checkbox"
              id="Accept"
              onChange={handleCheckbox}
              value={onboardPayload?.AcceptTermsCondetion}
              name="AcceptTermsCondetion"
              checked={onboardPayload.AcceptTermsCondetion}
            />
            <label for="Accept">Accept terms and Condition </label>
            <br />
          </div>
        </div>
        {/* <div className="input-container1 d-flex mt-3">
         <input type="checkbox" id="Accept" name="Accept"/>
  <label for="Accept">Accept terms and Condition </label><br/>
        </div> */}
        <div className="modal-button-container1">
          <button
            className="back_icon"
            onClick={() => {
              // setActiveTabIndex(5)
              validateForm(5);
            }}
          >
            <img src={back_icon} alt="" className="pe-2" />
            Back
          </button>
        </div>
      </form>
      {/* <div className="modal-button-container1">
         <Button
                    type="primary-bordered"
                    className="border-0 py-2 px-4"
                    text="Back"
                    // onClick={handleBack}
                  />
                  </div> */}
    </div>
  );
};

export default Agreement;
