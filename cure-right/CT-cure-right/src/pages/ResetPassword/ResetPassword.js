import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Container, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import CURE_RIGHT_LOGO from "../../assets/icons/cureRightLogo.svg";
import { resetPassword } from "../../services/commonApi";
import EYE_ICON from "../../assets/icons/passwordEye.svg";
import "../Login/Login.css";

const ResetPassword = ({ type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  let userType = localStorage.getItem("userType");
  const [payload, setPayload] = useState({
    email: localStorage.getItem("email"),
    userType: userType,
  });
  const [isLoading, setIsLoading] = useState(false);
  let location = useLocation();
  let navigate = useNavigate();

  const handleChange = (e) => {
    setPayload(() => {
      return {
        ...payload,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Please wait....");
    try {
      const res = await resetPassword(payload);
      // console.log(res, "forgot password");
      toast.dismiss(toastId);
      setIsLoading(false);
      toast.success(res?.data?.data?.message);
      navigateToLogin(userType);
    } catch (error) {
      setIsLoading(false);
      toast.dismiss(toastId);
      // console.log("catch");
      toast.error(error.message.message);
    }
  };

  const navigateToLogin = (userType) => {
    localStorage.removeItem("email");
    localStorage.removeItem("userType");
    if (userType === "patient") {
      navigate("/");
    } else if (userType === "doctor") {
      navigate("/doctor");
    } else if (userType === "admin") {
      navigate("/admin");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Container fluid className="login-div">
      <div className="login-card">
        <div className="login-main-card">
          <img src={CURE_RIGHT_LOGO} alt="cureLogo" className="curelogo mb-3" />
          <h4 className="mt-4">Enter New Password</h4>
          <p className="mb-4">Please reset your password</p>
          <Form className="login-form">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="mb-1">Enter New Password</Form.Label>
              <div className="password-input-container">
                <Form.Control
                  type={`${showPassword ? "text" : "password"}`}
                  name="changepassword"
                  placeholder="Enter New Password"
                  onChange={handleChange}
                />
                <img src={EYE_ICON} alt="Eye" onClick={handleShowPassword} />
              </div>
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label className="mb-1">Password</Form.Label>
              <div className="password-input-container">
                <Form.Control
                  type={`${showConfirmPassword ? "text" : "password"}`}
                  name="confirmpassword"
                  placeholder="Confirm New Password"
                  onChange={handleChange}
                />
                <img
                  src={EYE_ICON}
                  alt="Eye"
                  onClick={handleShowConfirmPassword}
                />
              </div>
            </Form.Group>

            <div className="btn-group mt-2">
              <button
                className="login-btn mb-3 mt-1"
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Submit
              </button>
              <button
                type="button"
                className="signup-btn mb-3 mt-1"
                onClick={navigateToLogin}
              >
                Cancel
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default ResetPassword;
