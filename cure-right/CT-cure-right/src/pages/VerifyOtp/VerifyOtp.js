import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { toast } from "react-hot-toast";
import CURE_RIGHT_LOGO from "../../assets/icons/cureRightLogo.svg";
import { verifyOtp } from "../../services/commonApi";
import "../Login/Login.css";

const VarifyOtp = ({ type }) => {
  let navigate = useNavigate();
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  let userType = localStorage.getItem("userType");

  const handleCancel = async () => {
    navigate("/");
  };

  const handleChange = (index, e) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    if (e.target.value !== "" && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < newOtp.length; i++) {
      if (pastedData[i]) {
        newOtp[i] = pastedData[i];
      } else {
        break;
      }
    }
    setOtp(newOtp);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    let OTP = otp.join("");
    let payload = {
      userType: userType,
      email: localStorage.getItem("email"),
      verificationcode: OTP,
    };
    if (payload?.verificationcode?.length === 6) {
      const toastId = toast.loading("Please wait....");
      try {
        let res = await verifyOtp(payload);
        toast.dismiss(toastId);
        toast.success(res.data.data.message);
        navigate("/resetPassword");
      } catch (error) {
        toast.dismiss(toastId);
        toast.error(error?.message?.message);
      }
    } else {
      toast.error("OTP should contain 6 digits.");
    }
  };

  return (
    <Container fluid className="login-div">
      <div className="login-card">
        <div className="login-main-card">
          <img src={CURE_RIGHT_LOGO} alt="cureLogo" className="curelogo mb-3" />
          <h4 className="mt-4">OTP Verification</h4>
          <p className="mb-4 mt-2 forgot-pass-desc">
            A 6-digit OTP has been sent to your mail ID
          </p>
          <Form className="login-form " onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="mb-1">Enter OTP</Form.Label>
              <div className="d-flex gap-3 w-75">
                {otp.map((digit, index) => (
                  <Form.Control
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={(e) => handlePaste(e)}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                  />
                ))}
              </div>
            </Form.Group>
            <div className="btn-group mt-2">
              <button
                className="login-btn mb-3 mt-1"
                type="button"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button className="signup-btn mb-3 mt-1" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default VarifyOtp;
