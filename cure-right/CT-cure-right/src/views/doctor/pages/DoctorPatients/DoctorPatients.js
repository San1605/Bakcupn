import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import Loader from "../../../../components/Loader/Loader";
import eye from "../../../../assets/icons/eye.svg";
import person from "../../../../assets/images/person.svg";
import { getPatientList } from "../../../../services/commonApi";
import { setMyPatientList } from "../../../../redux/actions";

const DoctorPatients = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPatientListLoading, setIsPatientListLoading] = useState(true);
  let doctorReducer = useSelector((state) => state.DoctorReducer);

  const handleViewPatient = (val) => {
    navigate(`/doctor/patient/${val?.patientId}`);
  };

  const getPatientsList = async () => {
    try {
      setIsPatientListLoading(true);
      let res = await getPatientList(1, 8);
      let data = res?.data?.data;
      console.log(data, "patient data");
      dispatch(setMyPatientList(res?.data?.data));
      setIsPatientListLoading(false);
    } catch (err) {
      console.log("getPatientsList", err);
    }
  };

  useEffect(() => {
    getPatientsList();
  }, []);

  return (
    <>
      {!isPatientListLoading ? (
        <div>
          <div className="mb-2">
            <h3 className="heading-overview mb-1">My Patients</h3>
            <h2 className="heading-homepage">My Patients</h2>
          </div>
          <div className="w-100 overflow-auto admin-custom-table">
            <Table>
              <thead>
                <tr>
                  <th className="table-header tid">ID</th>
                  <th className="table-header pe-0"></th>
                  <th className="table-header ps-0">Name</th>
                  <th className="table-header">Number</th>
                  <th className="table-header">Last Visit</th>
                  <th className="table-header">Time</th>
                  <th className="table-header">Concern Level</th>
                  <th className="table-header">Other Details</th>
                </tr>
              </thead>
              <tbody>
                {doctorReducer?.myPatientList?.map((val, i) => {
                  return (
                    <tr key={i}>
                      <td className="table-body tid">
                        {val?.patientId || "NA"}
                      </td>
                      <td className="table-body tid">
                        <div className="dp m-auto">
                          <img
                            className="p-0"
                            src={val?.Image || person}
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="table-body ps-0 text-nowrap">
                        {val?.Name || "NA"}
                      </td>
                      <td className="table-body text-nowrap">
                        {val?.MobileNumber || "NA"}
                      </td>
                      <td className="table-body text-nowrap">
                        {val?.LastAppointmentDate || "NA"}
                      </td>
                      <td className="table-body">
                        {val?.LastAppointmentStartTime || "NA"}
                      </td>
                      <td className="table-body">{val?.Level || "moderate"}</td>
                      <td className="table-body">
                        <img
                          src={eye}
                          alt=""
                          width="20px"
                          className="icon_img cursor-pointer"
                          onClick={() => handleViewPatient(val)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            {isPatientListLoading && (
              <div className="loaderCont">
                <Loader />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default DoctorPatients;
