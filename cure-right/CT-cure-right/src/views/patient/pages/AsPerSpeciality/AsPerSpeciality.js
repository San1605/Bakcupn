import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import Button from "../../../../components/Button/Button";
import "./AsPerSpeciality.css";
import { getDoctorFilteredOnSpecialityPatientApi } from "../../../../services/patientApi";
import { setDoctorBasedOnSpeciality } from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const AsPerSpeciality = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  let patientReducer = useSelector((state) => state.PatientReducer);

  const doctorStatus = ["Available", "On Leave", "On Break"];

  const getDoctorFilteredOnSpeciality = async () => {
    try {
      const res = await getDoctorFilteredOnSpecialityPatientApi(id, 1, 5);
      dispatch(setDoctorBasedOnSpeciality(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorFilteredOnSpeciality();
  }, []);

  return (
    <div className="asPerOrgans">
      <div className=" home-top row m-0 p-0 w-100">
        <div className="mb-2 p-0">
          <h3 className="heading-overview mb-1">Speciality</h3>
          <h2 className="heading-homepage">Departments/{id}</h2>
        </div>
      </div>

      <Table>
        <thead>
          <tr>
            <th className="table-header small">ID</th>
            <th className="table-header small smallImgTd"></th>
            <th className="table-header ">Doctor's Name</th>
            <th className="table-header">Status</th>
            <th className="table-header">Experience</th>
            <th className="table-header">Treated</th>
            <th className="table-header">Book Appointment</th>
          </tr>
        </thead>

        <tbody className="shadow-body">
          {patientReducer?.doctorBasedOnSpeciality?.map((item, index) => (
            <tr key={index}>
              <td
                className="table-body small fontAsPerOrganId"
                style={{ width: "fit-content" }}
              >
                {item.doctorId}
              </td>
              <td className="table-body ps-0 text-nowrap small smallImgTd">
                <img className="profImg" src={item.image} alt="" />
              </td>

              <td className="table-body text-nowrap">{item.FullName}</td>

              <td className="table-body">
                <div className="flex">
                  <div
                    className={
                      doctorStatus[item.status] === "Available"
                        ? "green"
                        : doctorStatus[item.status] === "On Break"
                        ? "yellow"
                        : "red"
                    }
                  ></div>
                  <span>{doctorStatus[item.status]}</span>
                </div>
              </td>
              <td className="table-body">{item.experience} years</td>
              <td className="table-body">
                {item.TotalTreatedPatients}+ patients
              </td>
              <td className="table-body">
                <Button
                  type="primary"
                  text="Book Now"
                  onClick={() => {}}
                  className="py-2 px-5 d-md-inline d-none"
                  style={{
                    fontSize: "12px",
                    borderRadius: "4px",
                    fontWeight: 500,
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AsPerSpeciality;
