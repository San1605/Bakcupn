import React from "react";
import "../OnboardDoctor/OnboardDoctor.css";
import CustomRadioBtn from "../../../../components/CustomRadioBtn/CustomRadioBtn";
import Button from "../../../../components/Button/Button";
import next_icon from "../../../admin/assets/icons/next_icon.svg";
import back_icon from "../../../admin/assets/icons/back_icon.svg";
import { validateFormInput } from "../../../../utils/helpers/validateFormInput";
import { toast } from "react-hot-toast";

const Documents = ({
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

    if (
      (AadharCardValid ||
        panCardValid ||
        insuranceDocumentValid ||
        insuranceNumberValid ||
        BankAccountNumberValid ||
        confirmAccountNumberValid ||
        IFSCCOdeValid ||
        AccountHolderNameValid) !== ""
    ) {
      toast.dismiss(toastId);
      AadharCardValid
        ? (toastId = toast.error(AadharCardValid))
        : panCardValid
        ? (toastId = toast.error(panCardValid))
        : insuranceDocumentValid
        ? (toastId = toast.error(insuranceDocumentValid))
        : insuranceNumberValid
        ? (toastId = toast.error(insuranceNumberValid))
        : BankAccountNumberValid
        ? (toastId = toast.error(BankAccountNumberValid))
        : confirmAccountNumberValid
        ? (toastId = toast.error(confirmAccountNumberValid))
        : IFSCCOdeValid
        ? (toastId = toast.error(IFSCCOdeValid))
        : AccountHolderNameValid &&
          (toastId = toast.error(AccountHolderNameValid));
      console.log("Form is not valid");
    } else {
      // console.log("Form is not valid");
      // alert("fill all input values first...");
      setActiveTabIndex(val);
    }
  };
  return (
    <div className="onboard_detailss">
      <h3 className="personal mt-1 text-nowrap">Document & Bank Details</h3>
      <div className="personal-border"></div>
      <form className="onboard-form" onSubmit={(e) => e.preventDefault()}>
        <div className="input-container">
          <label className="required">Aadhaar Card number</label>
          <br />
          <input
            name="AadharCard"
            type="file"
            onChange={storeFiles}
            // value={onboardPayload?.AadharCard}
          />
        </div>
        <div className="input-container">
          <label className="required">Pan Card number</label>
          <br />
          <input
            name="panCard"
            type="file"
            onChange={storeFiles}
            // value={onboardPayload?.panCard}
          />
        </div>
        <div className="input-container">
          <label>Insurance Document</label>
          <br />
          <input
            name="insuranceDocument"
            type="file"
            onChange={storeFiles}
            // value={onboardPayload?.insuranceDocument}
          />
        </div>
        <div className="input-container">
          <label>Insurance Number</label>
          <br />
          <input
            name="insuranceNumber"
            type="text"
            placeholder="Enter Insurance Number"
            onChange={handleOnboardPayload}
            value={onboardPayload?.insuranceNumber}
          />
        </div>
        <div className="input-container">
          <label className="required">Bank Account Number</label>
          <br />
          <input
            name="BankAccountNumber"
            type="text"
            placeholder="Enter Bank Account Number"
            onChange={handleOnboardPayload}
            value={onboardPayload?.BankAccountNumber}
          />
        </div>

        <div className="input-container">
          <label className="required">Confirm Account Number</label>
          <br />
          <input
            name="confirmAccountNumber"
            type="text"
            placeholder="Enter Confirm Account Number"
            onChange={handleOnboardPayload}
            value={onboardPayload?.confirmAccountNumber}
          />
        </div>
        <div className="input-container">
          <label className="required">IFCS Code</label>
          <br />
          <input
            name="IFSCCOde"
            type="text"
            placeholder="Enter IFCS Code"
            onChange={handleOnboardPayload}
            value={onboardPayload?.IFCSCode}
          />
        </div>
        <div className="input-container">
          <label className="required">Account Holder Name</label>
          <br />
          <input
            name="AccountHolderName"
            type="text"
            placeholder="Enter Account Holder Name"
            onChange={handleOnboardPayload}
            value={onboardPayload?.AccountHolderName}
          />
        </div>
        <div className="modal-button-container1">
          <button
            className="back_icon"
            onClick={() => {
              setActiveTabIndex(3);
            }}
          >
            <img src={back_icon} alt="" className="pe-2" />
            Back
          </button>
          <button
            className="next_icon"
            onClick={() => {
              //setActiveTabIndex(5)
              validateForm(5);
            }}
          >
            Next
            <img src={next_icon} alt="" />
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
                  <Button
                    type="primary"
                    className="py-2 px-4"
                    text="Next"
                    // onClick={handleSubmit}
                  />
                </div> */}
    </div>
  );
};

export default Documents;
