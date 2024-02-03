import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "./DoctorCalenderModal.css";
import Button from "../../../../components/Button/Button";
import book_edit from "../../../doctor/assets/icons/book_edit.svg";
import sort from "../../../doctor/assets/icons/sort.svg";
import book_time from "../../../doctor/assets/icons/book_time.svg";
import arrowright from "../../../doctor/assets/icons/arrowright.svg";
import CustomRadioBtn from "../../../../components/CustomRadioBtn/CustomRadioBtn";
import save from "../../../doctor/assets/icons/save.svg";

const DoctorCalenderModal = ({ show, setShow }) => {
  // const [isModalOpen, setIsModalOpen] = useState(show);

  const openModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  const handleSave = () => {
    closeModal();
  };
  return (
    <div>
      {show && (
        <Modal
          show={show}
          className="book-calendar"
          //   style={{ height: "30rem", width: "35rem" , position:""}}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={() => closeModal()}
          // backdrop="static"
        >
          <Modal.Header>
            <Modal.Title className="ModelTitle mt-4">
              <div className="d-flex justify-content-between w-100">
                <h3 className="cal-personal  m-0 text-nowrap">Book Calendar</h3>
                {/* <Button
             position=''
              type="primary"
              className="py-1 px-4"
              text="Save"
           
            /> */}
                <button className="book-save" onClick={handleSave}>
                  Save <img src={save} alt="/" className="ms-1 mb-1" />
                </button>
              </div>
              <div className="cal-personal-border "></div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="ModalBody">
            <div className="row px-0 m-0 w-100">
              <div className="column gap-0 col-1 book-calendar1 ">
                <div className="gap-4 mt-3 d-flex flex-column justify-content-center align-items-center">
                  <div className="book_time">
                    <img src={book_edit} alt="/" />
                  </div>
                  <div className="book_time">
                    <img src={sort} alt="/" />
                  </div>
                  <div className="book_time">
                    <img src={book_time} alt="/" />
                  </div>
                </div>
              </div>
              <div className="row gap-0 col-11 book-calendar2">
                <div className="d-flex mt-2 flex-column gap-3">
                  <input
                    name="description"
                    type="text"
                    placeholder="Write description here..."
                  />
                  {/* <input              
        name="description"
        type="text"
        placeholder='Select status'            
        />              */}

                  <select className="" name="Speciality2">
                    <option value="" disabled selected>
                      Select status
                    </option>
                    <option value="On Break">On Break</option>
                    <option value="On Leave - Full Day">
                      On Leave - Full Day
                    </option>
                    <option value="On Leave - Half Day">
                      On Leave - Half Day
                    </option>
                  </select>
                  <div className="d-flex date-time gap-3">
                    <input name="date" type="date" className="book-date" />
                    <input name="time" type="time" className="book-time" />
                    <img src={arrowright} alt="/" />
                    <input name="date1" type="date" className="book-date" />
                    <input name="time1" type="time" className="book-time" />
                  </div>
                  {/* <div className=" d-flex align-items-center  gap-4 ">
            <CustomRadioBtn
            labelClass="select-button"
              name="select"
              id="First"
              value="First"
              text="First Half"
              
            />
            <CustomRadioBtn
            labelClass="select-button"
              name="select"
              id="Second"
              value="Second"
              text="Second Half"
             
            />
          </div> */}
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default DoctorCalenderModal;
