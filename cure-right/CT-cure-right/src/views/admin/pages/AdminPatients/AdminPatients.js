import React, { useEffect, useState } from "react";
import {  Table } from "react-bootstrap";
import { getPatientList } from "../../../../services/commonApi";
import { setAdminPatientList } from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import PREV from "../../../../assets/icons/prevArrow.svg"
import NEXT from "../../../../assets/icons/nextArrow.svg"
import person from "../../../../assets/images/person.svg";
import wright from "../../../../assets/icons/wright.svg";
import eye from "../../../../assets/icons/eye.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Loader from "../../../../components/Loader/Loader";
import "./AdminPatients.css";

const AdminPatients = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [pageNo,setPageNo] =useState(1);
  const [totalpages, setTotalPages] = useState(1);
  const [isPatientListLoading, setIsPatientListLoading] = useState(false);
  let adminReducer = useSelector((state) => {
    return state.AdminReducer;
  });

  const getPatientsList = async (e) => {
    try {
      setIsPatientListLoading(true);
      let res = await getPatientList(pageNo,10);
      // let data = res?.data?.data;
      setTotalPages(res?.data?.pages?.Total_Pages)
      // console.log(data, "patient data");
      dispatch(setAdminPatientList(res?.data?.data));
      setIsPatientListLoading(false);
    } catch (err) {
      console.log("Some Error", err);
      toast.error("Some Error");
      setIsPatientListLoading(false);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
  

  const handleViewPatient = (val) => {
    navigate(`/admin/patient/${val?.patientId}`);
  };

  const getCircleColor = (status) => {
    switch (status) {
      case "Active":
        return "Active_status_show";
      case "new":
        return "New_status_show";
      case "In-Active":
        return "In-Active_status_show";
      default:
        return "In-Active_status_show";
    }
  };

  useEffect(() => {
  getPatientsList();
  }, [pageNo]);

  const HandlePrev = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };
  const HandleNext = () => {
    if (pageNo < totalpages) {
      setPageNo(pageNo + 1);
    }
  };

  const handleInputChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    const numberValue = parseInt(value);
    const lowerLimit = 1;
    const upperLimit = totalpages;
    if (isNaN(numberValue) || numberValue < lowerLimit) {
      setPageNo(lowerLimit);
    } else if (numberValue > upperLimit) {
      setPageNo(upperLimit);
    } else {
      setPageNo(numberValue);
    }
  };

if(isPatientListLoading){
  return <Loader/>
}


  return (
    <div className=" adminPatients  h-100">
      <div className="d-flex justify-content-between align-items-center">
        <div className="mb-2">
          <h3 className="heading-overview mb-1">Patients</h3>
          <h2 className="heading-homepage">List of Patients</h2>
        </div>
        <button className="Onboard_New">Onboard New 
        {/* <img src={eyes_icon} alt ='/' /> */}
        </button>
      </div>
      <div className="w-100 overflow-auto admin-custom-table">
        <Table>
          <thead>
            <tr>
              <th className="table-header tid">ID</th>
              <th className="table-header pe-0"></th>
              <th className="table-header ps-0">Name</th>
              <th className="table-header">Number</th>
              <th className="table-header">Status</th>
              <th className="table-header">Treatment</th>
              <th className="table-header">1st Visited On</th>
              <th className="table-header">Action</th>
            </tr>
          </thead>
          <tbody>
            {(!isPatientListLoading || adminReducer?.patientList?.length > 0) &&
              adminReducer?.patientList?.map((val, i) => {
                return (
                  <tr key={i}>
                    <td className="table-body tid">{val?.patientId || "NA"}</td>
                    <td className="table-body pe-0 tid">
                      {val?.patientId && (
                        <div className="dp m-auto">
                          <img
                            className="p-0"
                            src={val?.Image || person}
                            alt=""
                          />
                        </div>
                      )}
                    </td>
                    <td className="table-body ps-0 text-nowrap">
                      {val?.Name || "NA"}
                    </td>
                    <td className="table-body text-nowrap">
                      {val?.MobileNumber || "NA"}
                    </td>
                    {/* <td className="table-body text-nowrap">
                        {val?.Experience || "04 Yrs"}
                      </td> */}
                    <td className="table-body">
                      <div className="d-flex align-items-center gap-2">
                        <span
                          className={`${getCircleColor(val.Status)}`}
                        ></span>
                        <span>{val.Status || "NA"}</span>
                      </div>
                    </td>
                    <td className="table-body">{val?.treatMent || "NA"}</td>
                    {/* <td className="table-body">{val?.Speciality1 || "NA"}</td> */}
                    <td className="table-body">
                      {formatDate(val?.createdAt) || "NA"}
                    </td>
                    <td className="table-body">
                      <div className="d-flex gap-3 align-items-center">
                        <img
                          src={wright}
                          width="15px"
                          alt=""
                          className="icon_img cursor-pointer"
                        />
                        <img
                          src={eye}
                          alt=""
                          width="20px"
                          className="icon_img cursor-pointer"
                          onClick={() => handleViewPatient(val)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>

      </div>
      <div className="table-pagination">
                <div className="pagination-content">
                  Page{" "}
                  <input
                    type="number"
                    min={"1"}
                    max={totalpages}
                    value={pageNo}
                    onChange={handleInputChange}
                  />{" "}
                  of {totalpages}
                </div>
                <div className="d-flex rounded-1 overflow-hidden">
                  <button
                    className="prevBtn"
                    aria-label="Previous Page"
                    onClick={HandlePrev}
                  >
                    <img src={PREV} alt="" />
                  </button>
                  <button
                    className="nextBtn"
                    onClick={HandleNext}
                    aria-label="Next Page"
                  >
                    <img src={NEXT} alt="" />
                  </button>
                </div>
              </div>
 
    </div>
  );
};

export default AdminPatients;
