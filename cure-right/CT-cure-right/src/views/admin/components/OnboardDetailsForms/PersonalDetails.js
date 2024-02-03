import React, { useEffect, useState } from "react";
import "../OnboardDoctor/OnboardDoctor.css";
import CustomRadioBtn from "../../../../components/CustomRadioBtn/CustomRadioBtn";
import next_icon from "../../../admin/assets/icons/next_icon.svg";
import { validateFormInput } from "../../../../utils/helpers/validateFormInput";
import { toast } from "react-hot-toast";
import CustomAutoComplete from "../../../../components/CustomAutoComplete/CustomAutoComplete";
import { Country, State, City } from "country-state-city";

const PersonalDetails = ({
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
  const [showOptions, setShowOptions] = useState(false);

  const validateForm = () => {
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
        preferredMethodValid) !== ""
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
        : preferredMethodValid && (toastId = toast.error(preferredMethodValid));
      return false;
    }
    return true;
  };

  const handleNext = () => {
    // if (validateForm()) {
    //   setActiveTabIndex(1);
    // }
    console.log("handleNext triggered");
    if (validateForm()) {
      console.log("Form is valid");
      setActiveTabIndex(1);
    } else {
      console.log("Form is not valid");
    }
  };

  const handleDropdownValue = (name, elem) => {
    setOnboardPayload({
      ...onboardPayload,
      [name]: elem,
    });
  };

  // const handleOnboardPayload = (e) => {
  //   setOnboardPayload(() => {
  //     return {
  //       ...onboardPayload,
  //       [e.target.name]: e.target.value,
  //     };
  //   });
  // };
  // const [selectedCountry, setSelectedCountry] = useState(null);
  // const [selectedState, setSelectedState] = useState(null);
  // const [selectedCity, setSelectedCity] = useState(null);
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  // const handleCountryChange = (selectedCountry) => {
  //   setSelectedCountry(selectedCountry);
  //   setSelectedState(null); // Reset state and city when country changes
  //   setSelectedCity(null);
  
    useEffect(() => {
      console.log(countryOptions, "oooooooooo");
    }, [countryOptions]);
    useEffect(() => {
      console.log(stateOptions, "aaaaa");
    }, [stateOptions]);
    useEffect(() => {
      console.log(cityOptions, "okkkkk");
    }, [cityOptions]);
    // };

  useEffect(() => {
    console.log(countryOptions, "oooooooooo");
    setCountryOptions(() => {
      let arr = [...Country.getAllCountries()];
      arr = arr.map((i) => i.name);
      return arr;
    });
  }, []);

  useEffect(() => {
    console.log(stateOptions, "aaaaa");
    setStateOptions(() => {
      let arr = [...State.getAllStates()];
      arr = arr.map((i) => i.name);
      return arr;
    });
  }, []);


  // useEffect(() => {
  //   console.log(cityOptions, "okkkk");
  //   setCityOptions(() => {
  //     let arr = [...City.getAllCities()];
  //     arr = arr.map((i) => i.name);
  //     return arr;
  //   });
  // }, []);


 
  return (
    <div className="onboard_details h-100">
      {/* <div className='personal-border'></div> */}
      <h3 className="personal mt-1">Personal Details</h3>
      <div className="personal-border"></div>
      <form className="onboard-form" onSubmit={(e) => e.preventDefault()}>
        <div className="input-container">
          <label className="required">First Name</label>
          <br />
          <input
            name="FirstName"
            type="text"
            placeholder="Enter First Name"
            onChange={handleOnboardPayload}
            value={onboardPayload?.FirstName}
          />
        </div>
        <div className="input-container">
          <label className="required">Last Name</label>
          <br />
          <input
            name="LastName"
            type="text"
            placeholder="Enter Last Name"
            onChange={handleOnboardPayload}
            value={onboardPayload?.LastName}
          />
        </div>
        <div className="input-container radio-container">
          <label className="required">Gender</label>
          <div className="select-theme onboard_radio d-flex align-items-center  gap-2 ">
            <CustomRadioBtn
              labelClass="select-radio"
              name="Gender"
              id="Male"
              value="Male"
              text="Male"
              onChange={handleOnboardPayload}
              checked={onboardPayload?.Gender === "Male"}
            />
            <CustomRadioBtn
              labelClass="select-radio"
              name="Gender"
              id="Female"
              value="Female"
              text="Female"
              onChange={handleOnboardPayload}
              checked={onboardPayload?.Gender === "Female"}
            />
            <CustomRadioBtn
              labelClass="select-radio"
              name="Gender"
              id="Other"
              value="Other"
              text="Other"
              onChange={handleOnboardPayload}
              checked={onboardPayload?.Gender === "Other"}
            />
          </div>
        </div>
        <div className="input-container">
          <label className="required">Date of Birth</label>
          <br />
          <input
            name="DOB"
            type="date"
            className="onboard_cal"
            placeholder="DD/MM/YYYY"
            onChange={handleOnboardPayload}
            value={onboardPayload?.DOB}
          />
        </div>
        <div className="input-container">
          <label>Image</label>
          <br />
          <input name="image" type="file" onChange={storeFiles} />
        </div>
        <div className="input-container">
          <label className="required">Phone Number - 1</label>
          <br />
          <input
            name="phoneNumber1"
            type="text"
            placeholder="Enter Phone Number"
            onChange={handleOnboardPayload}
            value={onboardPayload?.phoneNumber1}
          />
        </div>
        <div className="input-container">
          <label>Phone Number - 2</label>
          <br />
          <input
            name="phoneNumber2"
            type="text"
            placeholder="Enter Phone Number"
            onChange={handleOnboardPayload}
            value={onboardPayload?.phoneNumber2}
          />
        </div>
        <div className="input-container">
          <label className="required">Email ID</label>
          <br />
          <input
            name="email"
            type="text"
            placeholder="Enter Email ID"
            onChange={handleOnboardPayload}
            value={onboardPayload?.email}
          />
        </div>
        <div className="input-container">
          <label className="required">PIN code</label>
          <br />
          <input
            name="Pincode"
            type="text"
            placeholder="Enter PIN code"
            onChange={handleOnboardPayload}
            value={onboardPayload?.Pincode}
          />
        </div>
        <div className="input-container">
          <label className="required">Address</label>
          <br />
          <input
            name="address"
            type="text"
            placeholder="Enter Address"
            onChange={handleOnboardPayload}
            value={onboardPayload?.address}
          />
        </div>
        <div className="input-container">
          <label className="required">Country</label>
          <br />
          {console.log()}
          <CustomAutoComplete
            className={"costom"}
            onChange={handleOnboardPayload}
            value={onboardPayload?.country}
            options={countryOptions}
            //                       value={selectedCountry}
            // options={countryOptions}
            // onChange={handleCountryChange}
            showOptions={showOptions}
            setShowOptions={setShowOptions}
            onClick={handleDropdownValue}
            placeholder="Enter Country"
            name="country"
          />
          
        </div>
        <div className="input-container">
          <label className="required">State</label>
          <br />

          <CustomAutoComplete
            className={"costom"}
            onChange={handleOnboardPayload}
            value={onboardPayload?.state}
            options={stateOptions}
            //                      value={selectedState}
            // options={stateOptions}
            // onChange={handleStateChange}
            showOptions={showOptions}
            setShowOptions={setShowOptions}
            onClick={handleDropdownValue}
            placeholder="Enter State"
            name="state"
          />
          {/* <input
            name="state"
            type="text"
            placeholder="Enter State"
            onChange={handleOnboardPayload}
            value={onboardPayload?.state}
          /> */}
        </div>
        <div className="input-container">
          <label className="required">City</label>
          <br />

          <CustomAutoComplete
            className={"costom"}
            onChange={handleOnboardPayload}
            value={onboardPayload?.city}
            options={cityOptions}
            //                       value={selectedCity}
            // options={cityOptions}
            // onChange={handleCityChange}
            showOptions={showOptions}
            setShowOptions={setShowOptions}
            onClick={handleDropdownValue}
            placeholder="Enter City"
            name="city"
          />
        </div>

        <div className="input-container radio-container">
          <label className="required">Preferred method of communication</label>
          <div className="select-theme d-flex align-items-center  gap-2 ">
            <CustomRadioBtn
              labelClass="select-radio"
              name="preferredMethodOfCommunication"
              id="Email"
              value="Email"
              text="Email"
              onChange={handleOnboardPayload}
              checked={
                onboardPayload?.preferredMethodOfCommunication === "Email"
              }
            />
            <CustomRadioBtn
              labelClass="select-radio"
              name="preferredMethodOfCommunication"
              id="Phone"
              value="Phone"
              text="Phone"
              onChange={handleOnboardPayload}
              checked={
                onboardPayload?.preferredMethodOfCommunication === "Phone"
              }
            />
          </div>
        </div>
        <div className="input-container">
          <label className="required">Language Proficiency</label>
          <br />
          <input
            name="languageProficiency"
            type="text"
            placeholder="Enter Language Proficiency"
            onChange={handleOnboardPayload}
            value={onboardPayload?.languageProficiency}
          />
        </div>
        <div className="input-container radio-container">
          <label className="required">Availability for On-call duties</label>
          <div className="select-theme d-flex align-items-center  gap-2 ">
            <CustomRadioBtn
              labelClass="select-radio"
              name="AvaibilityForOnCallDuties"
              id="Yes"
              value="Yes"
              text="Yes"
              onChange={handleOnboardPayload}
              checked={onboardPayload?.AvaibilityForOnCallDuties === "Yes"}
            />
            <CustomRadioBtn
              labelClass="select-radio"
              name="AvaibilityForOnCallDuties"
              id="No"
              value="No"
              text="No"
              onChange={handleOnboardPayload}
              checked={onboardPayload?.AvaibilityForOnCallDuties === "No"}
            />
          </div>
        </div>
        <div className="input-container radio-container">
          <label>Interpreter Needed</label>
          <div className=" select-theme d-flex align-items-center  gap-2 ">
            <CustomRadioBtn
              labelClass="select-radio"
              name="InterpreterterNeeded"
              id="Yes1"
              value="Yes1"
              text="Yes"
              onChange={handleOnboardPayload}
              checked={onboardPayload?.InterpreterterNeeded === "Yes1"}
            />
            <CustomRadioBtn
              labelClass="select-radio"
              name="InterpreterterNeeded"
              id="No1"
              value="No1"
              text="No"
              onChange={handleOnboardPayload}
              checked={onboardPayload?.InterpreterterNeeded === "No1"}
            />
          </div>
        </div>
        <div className="modal-button-container3 me-2">
          <button className="next_icon" onClick={handleNext}>
            Next
            <img src={next_icon} alt="" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;