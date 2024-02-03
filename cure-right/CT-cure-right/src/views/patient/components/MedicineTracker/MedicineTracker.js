import React from "react";
import "./medicineTracker.css";
import Table from "react-bootstrap/Table";

const MedicineTracker = () => {
  return (
    <div className="container py-2 pe-2 d-flex flex-column overflow-auto">
      <div className="bottomBorder">
        <Table className="table borderless overflow-auto mb-0">
          <thead>
            <tr className="">
              <th></th>
              <th className="medicine1">Medicines</th>
              <th className="medicine1">Notes</th>
            </tr>
          </thead>
          <tbody className="body_of_table">
            <div className="line_table_dot"></div>
            <tr className="row-header ">
              <td className="circleCont">
                <div className="yellow2"></div>
              </td>
              <td className="medicines">Azithromycin Paracetamol</td>
              <td className="notes">
                Antibiotic used to treat bacterial infections.
              </td>
            </tr>
            <tr className="row-header ">
              <td className="circleCont">
                <div className="orange"></div>
              </td>
              <td className="medicines">Citrizine</td>
              <td className="notes">Can consume with or without food.</td>
            </tr>
            <tr className="row-header ">
              <td className="circleCont">
                <div className="purple"></div>
              </td>
              <td className="medicines">Paracetamol</td>
              <td className="notes">Consume this after the 1 hour of meal</td>
            </tr>
            <tr className="row-header ">
              <td className="circleCont">
                <div className="blue"></div>
              </td>
              <td className="medicines">Paracetamol</td>
              <td className="notes">Consume this after the 2 hour of meal</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="d-flex flex-row medicineTrackerBottomBox align-items-center gap-2">
        <div className="d-flex flex-row align-items-center ">
          <div className="yellow1 circle ms-2"></div>
          <p className="text1 mb-0">Morning</p>
        </div>
        <div className="d-flex flex-row align-items-center">
          <div className="orange1 circle ms-3"></div>
          <p className="text1 mb-0">Afternoon</p>
        </div>
        <div className="d-flex flex-row align-items-center">
          <div className="purple1 circle ms-2"></div>
          <p className="text1 mb-0">Evening</p>
        </div>
        <div className="d-flex flex-row align-items-center">
          <div className="blue1 circle ms-3"></div>{" "}
          <p className="text1 mb-0">Night</p>
        </div>
      </div>
    </div>
  );
};

export default MedicineTracker;
