import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "../../../../components/Button/Button"

import CustomDropdown from "../../../../components/CustomDropdown/CustomDropdown"
import "./SosModal.css"
import { toast } from "react-hot-toast";
import { postSosDetailsApi } from "../../../../services/patientApi";
const personList = [
  "Father",
  "Mother",
  "Brother",
  "Sister",
  "Husband",
  "Wife",
  "Son",
  "Daughter",
  "Friend",
  "Neighbor",
  "Relative",
  "Other"
]

const SosModal = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showOptions2, setShowOptions2] = useState(false);
  const { show, onHide } = props



  const handleCancel = () => {
    props.onHide()
  }
  const handleSave = () => {
    toast.success("Details Updated Successfully")
    props.onHide()
  }

  const [sosDetails, setSosDetails] = useState(
    {

      EnterName: "",
      PhoneNumber: "",
      ThePerson: "",
      EmailId: "",
      patientId: localStorage.getItem("userId")
    }
  )

  function handleChange(event) {
    const { name, value } = event.target;

    setSosDetails((prev) => ({
      ...prev,
      [name]: value
    }))
  }


  const postSosDetails = async()=>{
    try{
      const res = await postSosDetailsApi(sosDetails);
      console.log(res);
    }

    catch(error){
      console.log(error)
    }
  }


useEffect(()=>{
  postSosDetails()
},[])


  return (
    <Modal
      // show={true}
      {...props}
      className="SOSModal"
      // style={{ height: "20rem", width: "50rem" , position:""}}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >

      <Modal.Header closeButton>
        <Modal.Title className="ModelTitle">SOS Details</Modal.Title>
      </Modal.Header>


      <Modal.Body className="ModalBody">
        <div className="scrollBox">

          <div className="outerdiv">
            <div className="d-flex  row-box ">

              <div className="d-flex flex-column box">
                <label htmlFor="">Enter Name</label>
                <input className="input" placeholder="Enter Name" onChange={handleChange} name="EnterName" value={sosDetails.EnterName} type="text" />
              </div>

              <div className="d-flex flex-column box">
                <label htmlFor="">Phone Number</label>
                <div className="d-flex flex-row ">

                  <select className="selectBox">
                    <option>+91</option>
                    <option>+90</option>
                    <option>+92</option>
                    <option>+101</option>
                  </select>

                  <input type="tel" placeholder="Enter Phone No." onChange={handleChange} name="PhoneNumber" value={sosDetails.PhoneNumber} id="" className="inputNum" />

                </div>
              </div>
            </div>

            <div className="d-flex  row-box">

              <div className="d-flex flex-column box">
                <label htmlFor="">The Person is? </label>
                <input className="input" placeholder="Enter Relation" type="text" onChange={handleChange} name="ThePerson" value={sosDetails.ThePerson} />
                {/* <CustomDropdown
                  className={"step-dropdown"}
                  // value={props?.bookAppointmentPayload?.problem}
                  options={personList}
                  showOptions={showOptions}
                  setShowOptions={setShowOptions}
                  // onClick={handleDropdownValue}
                  name="problem"
                /> */}
              </div>

              <div className="d-flex flex-column box">
                <label htmlFor="">Email ID </label>
                <input type="text" placeholder="Enter Email Address" className="input" onChange={handleChange} name="EmailId" value={sosDetails.EmailId} />
              </div>
            </div>





          </div>
          {/* <div className="outerdiv2">
            <div className="d-flex  row-box ">

              <div className="d-flex flex-column box">
                <label htmlFor="">Enter Name</label>
                <input className="input" placeholder="Text" type="text" />
              </div>

              <div className="d-flex flex-column box">
                <label htmlFor="">Phone Number</label>
                <div className="d-flex flex-row ">

                  <select className="selectBox">
                    <option>+91</option>
                    <option>+90</option>
                    <option>+92</option>
                    <option>+101</option>
                  </select>

                  <input type="tel" name="" id="" className="inputNum" />

                </div>

              </div>
            </div>

            <div className="d-flex  row-box">

              <div className="d-flex flex-column box">
                <label htmlFor="">The Person is? </label>
                <CustomDropdown
                  className={"step-dropdown"}
                  // value={props?.bookAppointmentPayload?.problem}
                  options={personList}
                  showOptions={showOptions2}
                  setShowOptions={setShowOptions2}
                  // onClick={handleDropdownValue}
                  name="problem"
                />
              </div>

              <div className="d-flex flex-column box">
                <label htmlFor="">Email ID </label>
                <input type="text" placeholder="Text" className="input" />
              </div>
            </div>
          </div> */}


        </div>
        <div className="lastBox" style={{ display: "flex", justifyContent: "end" }}>
          <button onClick={handleCancel} className="cancelBtn"> Cancel</button>
          <Button
            onClick={handleSave}
            type="primary"
            className="py-2 px-4 savebtn"
            text="Save"
          />
        </div>


      </Modal.Body>


    </Modal>
  );
};

export default SosModal;




