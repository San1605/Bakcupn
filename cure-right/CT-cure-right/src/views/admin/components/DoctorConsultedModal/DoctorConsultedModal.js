import React from "react";
import { Modal } from "react-bootstrap";
import consult from "../../../admin/assets/icons/consult.svg";
import tabla_image from "../../../admin/assets/icons/table_image.svg";
import "./DoctorConsultedModal.css";

const DoctorConsultedModal = (props) => {
  const { show, onHide } = props;
  return (
    <div>
      <Modal
        show={true}
        onHide={onHide}
        {...props}
        className="DoctorConsulted"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        //  backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="ModelTitle">Doctor’s Consulted</Modal.Title>
        </Modal.Header>
        <img src={tabla_image} alt="/" className="tabla_image" />
        <Modal.Body className="overflow-auto DoctorConsulted-table ">
          <div className="admin-custom-table ">
            <table className="table border mb-2">
              <thead>
                <tr>
                  <th className="table-header1 ">S.No</th>
                  <th className="table-header1 pe-0 text-nowrap">
                    Doctor’s Name
                  </th>
                  <th className="table-header1 ">Date</th>
                  <th className="table-header1">Time</th>
                  <th className="table-header1">Mode</th>
                  <th className="table-header1">Issue</th>
                  <th className="table-header1 text-nowrap">
                    Doctor’s Details
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="table-body1 ">01</td>
                  <td className="table-body1 ">Dr. Anita Henderson</td>
                  <td className="table-body1 ps-0 text-nowrap">16-4-2004</td>
                  <td className="table-body1 text-nowrap">15:12:32</td>
                  <td className="table-body1 text-nowrap">Online</td>
                  <td className="table-body1">Alzheimer</td>
                  <td className="table-body1">
                    <button className="consult_open">
                      <img src={consult} alt="/" className="mx-1 me-2" />
                      Open
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="table-body1 ">02</td>
                  <td className="table-body1 ">Dr. Anita Henderson</td>
                  <td className="table-body1 ps-0 text-nowrap">16-4-2004</td>
                  <td className="table-body1 text-nowrap">15:12:32</td>
                  <td className="table-body1 text-nowrap">Online</td>
                  <td className="table-body1">Alzheimer</td>
                  <td className="table-body1">
                    <button className="consult_open">
                      <img src={consult} alt="/" className="mx-1 me-2" />
                      Open
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="table-body1 ">03</td>
                  <td className="table-body1 ">Dr. Anita Henderson</td>
                  <td className="table-body1 ps-0 text-nowrap">16-4-2004</td>
                  <td className="table-body1 text-nowrap">15:12:32</td>
                  <td className="table-body1 text-nowrap">Online</td>
                  <td className="table-body1">Alzheimer</td>
                  <td className="table-body1">
                    <button className="consult_open">
                      <img src={consult} alt="/" className="mx-1 me-2" />
                      Open
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DoctorConsultedModal;
