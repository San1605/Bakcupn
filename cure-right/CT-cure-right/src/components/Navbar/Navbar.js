import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiMenu } from "react-icons/bi";
import Button from "../Button/Button";
import Searchbar from "../Searchbar/Searchbar";
import HandleClickOutside from "../../utils/helpers/HandleOutsideClick";
import SosModal from "../../views/patient/components/SosModal/SosModal";
import BookAppointmentModal from "../../views/patient/components/BookAppointmentModal/BookAppointmentModal";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import ARROW_ICON from "../../assets/icons/arrow.svg";
import BELL_ICON from "../../assets/icons/notification.svg";
import PROFILE_ICON from "../../assets/icons/profile.svg";
import "./Navbar.css";
import {
  mtoggleSidebar,
  setBookAppointmentPayload,
  setShowAppointmentModal,
} from "../../redux/actions";

const Navbar = () => {
  let ref = useRef();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [showSosModal, setShowSosModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  let appReducerData = useSelector((state) => state.AppReducer);
  let patientReducer = useSelector((state) => state.PatientReducer);
  const isDoctor = localStorage.getItem("userType") === "doctor" ? true : false;
  const isAdmin = localStorage.getItem("userType") === "admin" ? true : false;
  let payment_status = searchParams.get("razorpay_payment_link_status");
  const initialAppPayload = {
    mode: "online consultation",
    emergency: "0",
    slot: "1",
    transaction_status: "pending",
    status: "new",
    description: "",
    allergic: "",
    report: null,
  };

  HandleClickOutside(ref, () => {
    setShowProfileMenu(false);
  });

  const checkBackFromPaymentPage = async () => {
    if (payment_status) {
      dispatch(setShowAppointmentModal(true));
    }
  };

  const handleBookApp = () => {
    dispatch(setShowAppointmentModal(true));
  };

  const setInitialBookAppPayload = () => {
    dispatch(setBookAppointmentPayload(initialAppPayload));
  };

  const handleBack = () => {
    window.history.back();
  };
  const handleShowSosModal = () => {
    setShowSosModal(true);
  };

  useEffect(() => {
    setInitialBookAppPayload();
    checkBackFromPaymentPage();
  }, []);

  return (
    <nav className="d-flex align-items-center justify-content-between bg-white position-relative">
      <div className="d-flex gap-4 h-100">
        <div className="p-cursor h-100 d-flex align-items-center">
          <img
            src={ARROW_ICON}
            width="15px"
            height="100%"
            alt="arrow-icon"
            className="m-0 sidebar-open-arrow"
            onClick={handleBack}
          />
          <div
            className="mobile-menu-btn"
            onClick={() => {
              dispatch(mtoggleSidebar(!appReducerData?.sidebarCollapse));
            }}
          >
            <BiMenu />
          </div>
        </div>

        <div className="h-100 top-navbar-search">
          <Searchbar type={"Nav"} />
        </div>
        {!isAdmin && !isDoctor && (
          <div className="d-flex gap-3">
            <div className="nav-btn">
              <Button
                type="primary"
                text="Book Appointment"
                onClick={handleBookApp}
                className="py-2 px-4 d-md-inline d-none border-0"
                style={{
                  fontSize: "12px",
                  borderRadius: "6px",
                  fontWeight: 600,
                }}
              />
            </div>
            <div className="nav-btn">
              <Button
                type="red-bordered"
                text="SOS"
                className="d-sm-inline d-none"
                style={{
                  fontSize: "12px",
                  borderRadius: "6px",
                  fontWeight: 600,
                }}
                onClick={handleShowSosModal}
              />
            </div>
          </div>
        )}
      </div>
      <div className="d-flex align-items-center gap-4">
        <div>
          <img
            src={BELL_ICON}
            width="30px"
            height="30px"
            alt=""
            style={{
              padding: ".14rem",
            }}
          />
        </div>
        <div className="h-100 cursor-pointer" ref={ref}>
          <img
            src={PROFILE_ICON}
            width="29px"
            height="29px"
            alt=""
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          />
          {showProfileMenu && <ProfileMenu />}
        </div>
      </div>

      {showSosModal && (
        <SosModal
          show={showSosModal}
          onHide={() => {
            setShowSosModal(false);
          }}
        />
      )}
      {patientReducer?.showAppointmentModal && (
        <BookAppointmentModal
          show={patientReducer?.showAppointmentModal}
          bookAppointmentPayload={patientReducer?.bookAppointmentPayload}
          setBookAppointmentPayload={setBookAppointmentPayload}
          razorpay_payment_link_status={payment_status}
          onHide={() => {
            dispatch(setShowAppointmentModal(false));
            dispatch(setBookAppointmentPayload(initialAppPayload));
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
