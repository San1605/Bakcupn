import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Icon from "../../../patient/assets/icons/Icon.svg";
import CustomRadioBtn from "../../../../components/CustomRadioBtn/CustomRadioBtn";
import DoctorAvailabilityCard from "../DoctorAvailabilityCard/DoctorAvailabilityCard";
import Button from "../../../../components/Button/Button";
import appBookedVector from "../../assets/images/appBookedVector.png";
import HOME_ICON from "../../assets/icons/homeIcon.svg";

import {
  getAPayment,
  getAvailableDoctorsForAppointments,
  getProblemsList,
  getRazorPayLink,
  postPatientAppointment,
} from "../../../../services/patientApi";

import "./BookAppointmentModal.css";
import Loader from "../../../../components/Loader/Loader";
import { setBookAppointmentPayload } from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CustomAutoComplete from "../../../../components/CustomAutoComplete/CustomAutoComplete";

const BookAppointmentModal = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step1State, setStep1State] = useState("active-step-btn");
  const [step2State, setStep2State] = useState("disabled-step-btn");
  const [step3State, setStep3State] = useState("disabled-step-btn");
  const [showOptions, setShowOptions] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [availableDoctorsList, setAvailableDoctorsList] = useState([]);
  const [problemsList, setProblemsList] = useState(null);
  const [reportFile, setReportFile] = useState();
  const [fetchingPaymentLink, setFetchingPaymentLink] = useState(false);
  const [fetchingDoctorLoader, setFetchingDoctorLoader] = useState(false);
  const [postPaymentResponse, setPostPaymentResponse] = useState();
  const [countdown, setCountdown] = useState(15 * 60); // 15 minutes in seconds
  const [fetchingPatientProblemLoader, setFetchingPatientProblemLoader] =
    useState(false);
  let notificationId;
  let patientReducer = useSelector((state) => {
    return state.PatientReducer;
  });
  const handleDropdownValue = (name, elem) => {
    dispatch(
      setBookAppointmentPayload({
        ...patientReducer?.bookAppointmentPayload,
        [name]: elem,
      })
    );
  };

  const handleBookAppPayload = (e) => {
    dispatch(
      setBookAppointmentPayload({
        ...patientReducer?.bookAppointmentPayload,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleBack = () => {
    if (activeStep === 2) {
      setActiveStep(1);
      setStep1State("active-step-btn");
      setStep2State("disabled-step-btn");
      setStep3State("disabled-step-btn");
    } else if (activeStep === 3) {
      setActiveStep(2);
      setStep2State("active-step-btn");
      setStep3State("disabled-step-btn");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const validateForm = () => {
    let isProblemSelected = patientReducer?.bookAppointmentPayload?.problem
      ? ""
      : "Problem is required.";

    if (isProblemSelected !== "") {
      toast?.dismiss(notificationId);
      notificationId = toast?.error(isProblemSelected);
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    if (validateForm()) {
      dispatch(
        setBookAppointmentPayload({
          ...patientReducer?.bookAppointmentPayload,
          selectedAppointmentDate: DateArr[0],
        })
      );
      setActiveStep(2);
      setStep1State("completed-step-btn");
      setStep2State("active-step-btn");
    }
  };

  const handleSubmit = async () => {
    setFetchingPaymentLink(true);
    let toastId = toast.loading("Please Wait...");
    if (validateForm()) {
      let formData = new FormData();
      for (var key in patientReducer?.bookAppointmentPayload) {
        formData.append(key, patientReducer?.bookAppointmentPayload[key]);
      }
      if (reportFile) {
        formData.append("report", reportFile);
      }
      try {
        let res = await postPatientAppointment(formData);
        console.log(res);
        if (res.status === 200) {
          // localStorage.setItem("appointmentId", res?.data.data.appointmentId);
          // let selectedDoctor = availableDoctorsList.filter(
          //   (d) => d.doctorId === patientReducer.bookAppointmentPayload.doctorId
          // );
          let postPaymentPayload = {
            amount: res?.data.data.price,
            appointmentId: res?.data.data.appointmentId,
            patientId: localStorage.getItem("userId"),
            callback_url: window.location.origin + "/home",
          };
          try {
            let postPaymentResponse = await getRazorPayLink(postPaymentPayload);
            console.log("postPaymentResponse ======>", postPaymentResponse);
            toast.dismiss(toastId);
            setActiveStep(3);
            setStep1State("completed-step-btn");
            setStep2State("completed-step-btn");
            setStep3State("active-step-btn");
            setPostPaymentResponse(postPaymentResponse.data.data);
            window.open(postPaymentResponse.data.data.short_url);
          } catch (err) {
            toast.dismiss(toastId);
            setFetchingPaymentLink(false);
            toast.error("Something went wrong. Please try again.");
          }
        }
      } catch (err) {
        setFetchingPaymentLink(false);
        toast.error(err.message.message);
      }
    }
  };

  const handleDateTabChange = (date) => {
    console.log(date, "-----------<<<<<<-------date");
    dispatch(
      setBookAppointmentPayload({
        ...patientReducer?.bookAppointmentPayload,
        selectedAppointmentDate: date,
      })
    );
  };

  const storeFiles = (e) => {
    setReportFile(e.target.files[0]);
  };

  useEffect(() => {
    //REFETCH THE DOCTOR LIST AS PER MODIFIED DATE
    getAvailableDoctors();
  }, [patientReducer?.bookAppointmentPayload?.selectedAppointmentDate]);

  const getPaymentApi = async () => {
    if (props?.razorpay_payment_link_status) {
      let arg = window.location.search;
      let appointmentId = localStorage.getItem("appointmentId");
      let res = await getAPayment(arg.slice(1), appointmentId);
      console.log("resssssssssssssssssssssssssssssssssssssssssssssssss", res);
    }
  };

  useEffect(() => {
    if (props?.razorpay_payment_link_status === "paid") {
      setActiveStep(4);
      setStep1State("completed-step-btn");
      setStep2State("completed-step-btn");
      setStep3State("completed-step-btn");
      getPaymentApi();
    }
    getPatientProblemsList();
  }, []);

  const getPatientProblemsList = async () => {
    setFetchingPatientProblemLoader(true);
    try {
      const res = await getProblemsList();
      if (res.status === 200) {
        setProblemsList(res.data.data.data);
        setFetchingPatientProblemLoader(false);
      }
    } catch (err) {
      setFetchingPatientProblemLoader(false);
      toast.error("Some Error");
    }
  };

  const getAvailableDoctors = async () => {
    if (
      patientReducer.bookAppointmentPayload?.selectedAppointmentDate &&
      patientReducer?.bookAppointmentPayload?.problem
    ) {
      setFetchingDoctorLoader(true);
      try {
        const res = await getAvailableDoctorsForAppointments(
          patientReducer.bookAppointmentPayload?.selectedAppointmentDate,
          patientReducer?.bookAppointmentPayload?.problem
        );
        if (res.status === 200) {
          setAvailableDoctorsList(res.data.data.data);
          setFetchingDoctorLoader(false);
        }
      } catch (err) {
        setFetchingDoctorLoader(false);
        toast.error("Some Error");
      }
    }
  };

  const [DateArr, setDateArr] = useState([]);

  function getNextSevenDays(currentDate) {
    const datesArray = [];

    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(nextDate.getDate() + i);
      const formattedDate = nextDate.toISOString();
      datesArray.push(formattedDate);
    }
    setDateArr(datesArray);
  }

  useEffect(() => {
    getNextSevenDays(new Date());
  }, []);

  const monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  // console.log(convertToISOString(getNextSevenDays()))

  // const formatDateToCustomFormat = (dateString) => {
  //   const date = new Date(dateString);
  //   const day = date.getDate().toString().padStart(2, "0");
  //   const month = new Intl.DateTimeFormat("en", { month: "short" }).format(
  //     date
  //   );
  //   const dayOfWeek = new Intl.DateTimeFormat("en", {
  //     weekday: "short",
  //   }).format(date);

  //   return `${day} ${month} ${dayOfWeek}`;
  // };

  // const getNextSevenDays = () => {
  //   const dates = [];
  //   const today = new Date();
  //   for (let i = 0; i < 7; i++) {
  //     const date = new Date();
  //     date.setDate(today.getDate() + i);
  //     const formattedDate = date?.toISOString();
  //     dates.push(formattedDate);
  //   }
  //   return dates;
  // };

  const handleCloseModal = () => {
    props.onHide();
    navigate("/home");
  };

  return (
    <Modal
      className={`book-appointment-modal ${
        patientReducer.bookAppointmentPayload?.emergency === "1" && "emergency"
      }`}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Book Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {patientReducer.bookAppointmentPayload?.emergency === "1" ? (
          <div className="stepper-container h-100">
            {activeStep === 1 && (
              <div className="step-content">
                <div className="step-content-main h-auto">
                  <form className="step1-form">
                    <div className="input-container">
                      <label>What problem are you facing?</label>
                      <CustomAutoComplete
                        className={"step-dropdown emergencyAppointmentModal"}
                        value={patientReducer?.bookAppointmentPayload?.problem}
                        options={problemsList}
                        showOptions={showOptions}
                        setShowOptions={setShowOptions}
                        onClick={handleDropdownValue}
                        name="problem"
                      />
                    </div>
                    <div className="input-container radio-container">
                      <label>Select Mode</label>
                      <div className="select-theme d-flex align-items-center h-100 gap-4 ">
                        <CustomRadioBtn
                          name="mode"
                          id="Online"
                          value="online consultation"
                          text="Online Consultation"
                          onChange={handleBookAppPayload}
                          checked={
                            patientReducer?.bookAppointmentPayload?.mode ===
                            "online consultation"
                          }
                        />
                        <CustomRadioBtn
                          name="mode"
                          id="Offline"
                          value="offline consultation"
                          text="Offline Consultation"
                          onChange={handleBookAppPayload}
                          checked={
                            patientReducer?.bookAppointmentPayload?.mode ===
                            "offline consultation"
                          }
                        />
                      </div>
                    </div>
                  </form>
                  <Button
                    type="primary"
                    className="py-2 px-5 mt-4 mb-2"
                    text="Proceed To Pay"
                    onClick={handleSubmit}
                  />
                  <hr />
                  <p className="avg-wait">*Average wait time is 15 minutes</p>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="step-content">
                <div className="step-content-main">
                  Third Party Payment Integration
                </div>
                <div className="modal-button-container">
                  <Button
                    type="primary-bordered"
                    className="border-0 py-2 px-4"
                    text="Back"
                    onClick={handleBack}
                  />
                  <Button
                    type="primary"
                    className="py-2 px-4"
                    text="Complete"
                    disabled={fetchingPaymentLink}
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            )}
            {activeStep === 3 && (
              <div className="step-content ">
                <div className="row m-0 gap-0 pt-3 pb-4 pe-4 ps-4">
                  <div className="  col-lg-7 col-md-12  p-0 pe-3   d-flex flex-column ">
                    <div className="pe-2 book-bill-modal">
                      <div className="customLoadingDiv">
                        <span class="customLoader"></span>
                      </div>
                      <p>Go to the webpage for the payment </p>
                      <p className=" pay">
                        Pay before <span>{formatTime(countdown)}</span>{" "}
                      </p>
                    </div>
                  </div>
                  <div className=" col-lg-5 pt-md-3 pt-lg-0 col-md-12 p-0 h-100 d-flex flex-column">
                    <div className="book-bill-modal1  ">
                      <div className="h-75 bill-part">
                        <div className="d-flex pt-3 flex-row justify-content-between">
                          <div className="paybill ps-3">Your Bill</div>
                          <img src={Icon} alt="" className="me-3" />
                        </div>
                        <div className="product mt-3 px-2  mx-2 py-1 d-flex flex-row justify-content-between">
                          <div>Product/Service </div>
                          <div>Cost</div>
                          <div> Total</div>
                        </div>
                        <div className="d-flex mt-2 px-2  mx-2 py-1 flex-row justify-content-between">
                          <div style={{ fontSize: "13px" }}>
                            General Consultancy
                            <span className="ps-4">
                              ₹{postPaymentResponse?.amount / 100 || "₹699"}
                            </span>
                          </div>
                        </div>
                        <div className="circle1"></div>
                        <div className="circle2"></div>
                      </div>
                      <div className="paybill1 pt-3 ps-4">
                        <div className="amount">Total Amount</div>
                        <div className="paybill">
                          ₹{postPaymentResponse?.amount / 100 || "₹699"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeStep === 4 && (
              <div className="step-content completed-step">
                <div className="d-flex flex-column align-items-center h-100 w-100">
                  <img
                    src={appBookedVector}
                    className="appBookedVector"
                    alt=""
                    height={210}
                    width={210}
                  />
                  <div className="bookedHeading">Appointment Booked</div>
                  <div className="bookedDesc">
                    A confirmation mail has been sent to your registered mail ID
                  </div>
                  <button
                    className="primary cure-btn text-nowrap my-3 go-to-home-btn"
                    onClick={handleCloseModal}
                  >
                    <img src={HOME_ICON} height={16} alt="" className="me-2" />
                    Go back to Homepage
                  </button>
                  <Button
                    text={""}
                    onClick={() => {}}
                    type={"primary"}
                    className={"primary-bordered-btn mb-4"}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          patientReducer?.bookAppointmentPayload?.emergency === "0" && (
            <div className="stepper-container h-100">
              <div className="stepper-cont">
                <div className="stepper">
                  <div className={`step ${activeStep === 1 ? "active" : ""}`}>
                    <div className="step-cont">
                      <div className={`circle-btn ${step1State}`}>1</div>
                      <div className="stepper-text">Fill the details</div>
                    </div>
                  </div>
                  <div className={`step ${activeStep === 2 ? "active" : ""}`}>
                    <div className="step-cont">
                      <div className={`circle-btn ${step2State}`}>2</div>
                      <div className="stepper-text">
                        Choose Available Doctor
                      </div>
                    </div>
                  </div>
                  <div className={`step ${activeStep === 3 ? "active" : ""}`}>
                    <div className="step-cont">
                      <div className={`circle-btn ${step3State}`}>3</div>
                      <div className="stepper-text">Payment</div>
                    </div>
                  </div>
                </div>
              </div>
              {activeStep === 1 && (
                <div className="step-content">
                  <div className="step-content-main">
                    <form className="step1-form">
                      <div className="input-container">
                        <label>What problem are you facing?</label>
                        {
                          <CustomAutoComplete
                            className={"step-dropdown"}
                            value={
                              patientReducer?.bookAppointmentPayload?.problem
                            }
                            options={problemsList}
                            showOptions={showOptions}
                            setShowOptions={setShowOptions}
                            onClick={handleDropdownValue}
                            name="problem"
                          />
                        }
                      </div>
                      <div className="input-container radio-container">
                        <label>Select Mode</label>
                        <div className="select-theme d-flex align-items-center h-100 gap-4 ">
                          <CustomRadioBtn
                            name="mode"
                            id="Online"
                            value="online consultation"
                            text="Online Consultation"
                            onChange={handleBookAppPayload}
                            checked={
                              patientReducer?.bookAppointmentPayload?.mode ===
                              "online consultation"
                            }
                          />
                          <CustomRadioBtn
                            name="mode"
                            id="Offline"
                            value="offline consultation"
                            text="Offline Consultation"
                            onChange={handleBookAppPayload}
                            checked={
                              patientReducer?.bookAppointmentPayload?.mode ===
                              "offline consultation"
                            }
                          />
                        </div>
                      </div>
                      <div className="input-container">
                        <label>Add Description</label>
                        <input
                          name="description"
                          value={
                            patientReducer?.bookAppointmentPayload?.description
                          }
                          type="text"
                          onChange={handleBookAppPayload}
                        />
                      </div>
                      <div className="input-container">
                        <label>Allergic To</label>
                        <input
                          name="allergic"
                          value={
                            patientReducer?.bookAppointmentPayload?.allergic
                          }
                          type="text"
                          onChange={handleBookAppPayload}
                        />
                      </div>
                      <div className="input-container">
                        <label>Upload Report</label>
                        <input
                          name="report"
                          type="file"
                          onChange={storeFiles}
                          title="Upload CT-Scan, X-ray"
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-button-container">
                    <Button
                      type="primary"
                      className="py-2 px-4"
                      text="Next"
                      onClick={handleNext}
                    />
                  </div>
                </div>
              )}
              {activeStep === 2 && (
                <div className="step-content ">
                  <div className="step-content-main pt-1">
                    <div className="slots-container">
                      <div className="date-tabs-container">
                        {DateArr?.map((item, i) => {
                          const DateStr = item.substring(0, 10);
                          // console.log(DateStr,'DateStr');
                          let date = DateStr?.split("-");
                          return (
                            <div key={i} className="date-tab-outer">
                              <div
                                onClick={() => {
                                  handleDateTabChange(DateArr[i]);
                                }}
                                className={`date-tab ${
                                  DateArr[i] ===
                                    patientReducer?.bookAppointmentPayload
                                      ?.selectedAppointmentDate &&
                                  "active-tab-steps"
                                }`}
                              >
                                <div className="tab-date">
                                  {date[2]} {monthArr[date[1] - 1]}
                                </div>
                                <div className="tab-day">
                                  {daysInWeek[new Date(DateArr[i]).getDay()]}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="tabdata">
                        {fetchingDoctorLoader ? (
                          <Loader />
                        ) : (
                          <>
                            {availableDoctorsList?.length !== 0
                              ? availableDoctorsList?.map((doctor, i) => (
                                  <DoctorAvailabilityCard
                                    key={i}
                                    doctor={doctor}
                                    i={i}
                                  />
                                ))
                              : "No Doctor's Available"}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="modal-button-container">
                    <Button
                      type="primary-bordered"
                      className="border-0 py-2 px-4"
                      text="Back"
                      onClick={handleBack}
                    />
                    <Button
                      type="primary"
                      className="py-2 px-4"
                      text="Next"
                      disabled={fetchingPaymentLink}
                      onClick={handleSubmit}
                    />
                  </div>
                </div>
              )}
              {activeStep === 3 && (
                <div className="step-content ">
                  <div className="row m-0 gap-0 pt-3 pb-4 pe-4 ps-4">
                    <div className="  col-lg-7 col-md-12  p-0 pe-3   d-flex flex-column ">
                      <div className="pe-2 book-bill-modal">
                        <div className="customLoadingDiv">
                          <span class="customLoader"></span>
                        </div>
                        <p>Go to the webpage for the payment </p>
                        <p className=" pay">
                          Pay before <span>{formatTime(countdown)}</span>{" "}
                        </p>
                      </div>
                    </div>
                    <div className=" col-lg-5 pt-md-3 pt-lg-0 col-md-12 p-0 h-100 d-flex flex-column">
                      <div className="book-bill-modal1  ">
                        <div className="h-75 bill-part">
                          <div className="d-flex pt-3 flex-row justify-content-between">
                            <div className="paybill ps-3">Your Bill</div>
                            <img src={Icon} alt="" className="me-3" />
                          </div>
                          <div className="product mt-3 px-2  mx-2 py-1 d-flex flex-row justify-content-between">
                            <div>Product/Service </div>
                            <div>Cost</div>
                            <div> Total</div>
                          </div>
                          <div className="d-flex mt-2 px-2  mx-2 py-1 flex-row justify-content-between">
                            <div style={{ fontSize: "13px" }}>
                              General Consultancy
                              <span className="ps-4">
                                ₹{postPaymentResponse?.amount / 100 || "₹699"}
                              </span>
                            </div>
                          </div>
                          <div className="circle1"></div>
                          <div className="circle2"></div>
                        </div>
                        <div className="paybill1 pt-3 ps-4">
                          <div className="amount">Total Amount</div>
                          <div className="paybill">
                            ₹{postPaymentResponse?.amount / 100 || "₹699"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeStep === 4 && (
                <div className="step-content completed-step">
                  <div className="d-flex flex-column align-items-center h-100 w-100">
                    <img
                      src={appBookedVector}
                      className="appBookedVector"
                      alt=""
                      height={210}
                      width={210}
                    />
                    <div className="bookedHeading">Appointment Booked</div>
                    <div className="bookedDesc">
                      A confirmation mail has been sent to your registered mail
                      ID
                    </div>
                    <button
                      className="primary cure-btn text-nowrap my-3 go-to-home-btn"
                      onClick={handleCloseModal}
                    >
                      <img
                        src={HOME_ICON}
                        height={16}
                        alt=""
                        className="me-2"
                      />
                      Go back to Homepage
                    </button>
                    <Button
                      text={"Download Receipt"}
                      onClick={() => {}}
                      type={"primary"}
                      className={"primary-bordered-btn mb-4"}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </Modal.Body>
    </Modal>
  );
};

export default BookAppointmentModal;
