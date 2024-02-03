import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import Loader from "../../../../components/Loader/Loader";
import OnboardDoctor from "../../components/OnboardDoctor/OnboardDoctor";
import person from "../../../../assets/images/person.svg";
import wright from "../../../../assets/icons/wright.svg";
import PREV from "../../../../assets/icons/prevArrow.svg";
import NEXT from "../../../../assets/icons/nextArrow.svg";
import eye from "../../../../assets/icons/eye.svg";
import { getDoctorList } from "../../../../services/adminApi";
import { setDoctorsList } from "../../../../redux/actions";
import "./AdminDoctors.css";

const AdminDoctors = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showComponent, setShowComponent] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [totalpages, setTotalPages] = useState(1);
  const [isDoctorListLoading, setIsDoctorListLoading] = useState(true);
  const adminReducer = useSelector((state) => state.AdminReducer);

  const handleClick = () => {
    setShowComponent(false);
  };

  const handleViewDoctor = (val) => {
    navigate(`/admin/doctor/${val?.doctorId}`);
  };

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

  const getDoctorsList = async (e) => {
    setIsDoctorListLoading(true);
    try {
      let res = await getDoctorList(pageNo, 10);
      setIsDoctorListLoading(false);
      setTotalPages(res?.data?.pages?.Total_Pages);
      dispatch(setDoctorsList(res?.data?.data));
    } catch (err) {
      console.log("Some Error", err);
      toast.error("Some Error");
      setIsDoctorListLoading(false);
    }
  };

  useEffect(() => {
    getDoctorsList();
  }, [pageNo]);

  return (
    <>
      {!isDoctorListLoading ? (
        <div className="adminDoctors h-100">
          {showComponent ? (
            <>
              <div className="d-flex justify-content-between align-items-center">
                <div className="mb-2">
                  <h3 className="heading-overview mb-1">Doctors</h3>
                  <h2 className="heading-homepage">List of Doctors</h2>
                </div>
                <button className="Onboard_New" onClick={handleClick}>
                  Onboard New
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
                      <th className="table-header">Experience</th>
                      <th className="table-header">Department</th>
                      <th className="table-header">Specialization</th>
                      <th className="table-header">Team Members</th>
                      <th className="table-header">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminReducer?.doctorList?.length > 0 &&
                      adminReducer?.doctorList?.map((val, i) => {
                        return (
                          <tr key={i}>
                            <td className="table-body tid">{val?.doctorId}</td>
                            <td className="table-body pe-0 tid">
                              {val?.doctorId && (
                                <div className="dp m-auto">
                                  <img
                                    className="p-0"
                                    src={val?.image || person}
                                    alt=""
                                  />
                                </div>
                              )}
                            </td>
                            <td className="table-body ps-0 text-nowrap">
                              {val?.FullName}
                            </td>
                            <td className="table-body text-nowrap">
                              {val?.phoneNumber1}
                            </td>
                            <td className="table-body text-nowrap">
                              {val?.experience || "NA"}
                            </td>
                            <td className="table-body">
                              {val?.Department || "NA"}
                            </td>
                            <td className="table-body">
                              {val?.Speciality1 || "NA"}
                            </td>
                            <td className="table-body">
                              {val?.teamMember || "NA"}
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
                                  onClick={() => handleViewDoctor(val)}
                                />
                                <div className="form-check form-switch pt-1">
                                  <input
                                    className="form-check-input cursor-pointer"
                                    type="checkbox"
                                    id="flexSwitchCheckChecked"
                                    checked={val?.status}
                                  />
                                </div>
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
            </>
          ) : (
            <OnboardDoctor setShowComponent={setShowComponent} />
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default AdminDoctors;