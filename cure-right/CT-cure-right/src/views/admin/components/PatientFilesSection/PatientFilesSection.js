import React from 'react'
import { Table } from "react-bootstrap";
import view from "../../../../assets/icons/eye.svg";

const PatientFilesSection = () => {
  return (
    <div className="files_patient px-2 round-2 py-2 h-100">
      <h5 className="files_patient_heading">Files</h5> 
      <div className="files_patient_info p-3 overflow-auto">
        <Table className="border-0">
          <thead>
            <tr>
              <th className="table-header border-0">Name</th>
              <th className="table-header border-0">Date</th>
              <th className="table-header border-0">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row-body">
              <td className="table-body border-0 text-nowrap">Report.pdf</td>
              <td className="table-body border-0 text-nowrap">24-07-2023</td>
              <td className="table-body border-0">
                <img className="" width="17px" src={view} alt="" />
              </td>
            </tr>
            <tr className="table-row-body">
              <td className="table-body border-0">Medicine.pdf</td>
              <td className="table-body border-0">01-08-2023</td>
              <td className="table-body border-0">
                <img className="" width="17px" src={view} alt="" />
              </td>
            </tr>
            <tr className="table-row-body">
              <td className="table-body border-0">Prescription.pdf</td>
              <td className="table-body border-0">04-04-2023</td>
              <td className="table-body border-0">
                <img className="" width="17px" src={view} alt="" />
              </td>
            </tr>
            <tr className="table-row-body">
              <td className="table-body border-0">Medicine.pdf</td>
              <td className="table-body border-0">24-0-2023</td>
              <td className="table-body border-0">
                <img className="" width="17px" src={view} alt="" />
              </td>
            </tr>
          </tbody>
        </Table>
      </div> 
    </div>
  )
}

export default PatientFilesSection