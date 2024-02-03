import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CURE_RIGHT_LOGO from "../../assets/icons/cureRightLogo.svg";
import { forgotPassword } from "../../services/commonApi";
import "../Login/Login.css";

const ForgotPassword = ({ type }) => {
  let navigate = useNavigate();
  let userType = localStorage.getItem("userType");
  const [payload, setPayload] = useState({
    userType: userType || "patient",
  });

  const handleChange = (e) => {
    setPayload(() => {
      return {
        ...payload,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async () => {
    const toastId = toast.loading("Please wait....");
    try {
      const res = await forgotPassword(payload);
      toast.dismiss(toastId);
      toast.success(res?.data?.data?.message);
      setTimeout(() => {
        localStorage.setItem("email", res?.data?.data?.email);
        navigate("/verifyOtp");
      }, 1000);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.message?.message);
    }
  };
  const handleCancel = async (e) => {
    e.preventDefault();
    window.history.go(-1);
  };
  return (
    <Container fluid className="login-div">
      <div className="login-card">
        <div className="login-main-card">
          <img src={CURE_RIGHT_LOGO} alt="cureLogo" className="curelogo mb-3" />
          <h4 className="mt-4">Forgot Password?</h4>
          <p className="mb-4 mt-2 forgot-pass-desc">
            Don’t worry, we will send you reset instruction on your mail ID
          </p>
          <Form className="login-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="mb-1">Email ID</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="abc@gmail.com"
                onChange={handleChange}
              />
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

export default ForgotPassword;
