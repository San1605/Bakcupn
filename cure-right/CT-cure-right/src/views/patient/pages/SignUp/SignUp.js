import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import CURE_RIGHT_LOGO from "../../../../assets/icons/cureRightLogo.svg";
import EYE_ICON from "../../../../assets/icons/passwordEye.svg";
import { validateFormInput } from "../../../../utils/helpers/validateFormInput";
import { patientSignUp } from "../../../../services/patientApi";
import "../../../../pages/Login/Login.css";

const SignUp = () => {
  const [payload, setPayload] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  let notificationId;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPayload(() => {
      return {
        ...payload,
        [e.target.name]: e.target.value,
      };
    });
  };

  const validateForm = () => {
    let isEmailValid = validateFormInput("email", payload?.email);
    let isPasswordValid =
      payload?.password.length === 0 ? "Password is required" : "";
    if ((isEmailValid || isPasswordValid) !== "") {
      toast?.dismiss(notificationId);
      notificationId = toast?.error(
        isEmailValid !== "" ? isEmailValid : isPasswordValid
      );
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    toast.dismiss(notificationId);
    notificationId = toast.loading("Please wait....");
    if (validateForm()) {
      try {
        let res = await patientSignUp(payload);
        // console.log(res, "signup response");
        toast.dismiss(notificationId);
        if (res?.data?.data?.status === 200) {
          toast.success(res?.data?.data?.message);
          navigate("/");
        } else {
          // console.log(res?.data?.data?.message)
          toast.error(res?.data?.data?.message);
        }
      } catch (err) {
        // console.log(err, "catch");
        toast.dismiss(notificationId);
        console.log(err);
        notificationId = toast?.error(err?.message?.message);
      }
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container fluid className="login-div">
      <div className="login-card">
        <div className="login-main-card">
          <img src={CURE_RIGHT_LOGO} alt="cureLogo" className="curelogo mb-3" />
          <h4 className="mt-4">Hi!</h4>
          <p className="mb-4">Enter the following details to proceed.</p>
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

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label className="mb-1">Password</Form.Label>
              <div className="password-input-container">
                <Form.Control
                  type={`${showPassword ? "text" : "password"}`}
                  name="password"
                  placeholder="***********"
                  onChange={handleChange}
                />
                <img src={EYE_ICON} alt="Eye" onClick={handleShowPassword} />
              </div>
            </Form.Group>

            <div className="btn-group mt-2">
              <button
                className="login-btn mb-3 mt-1"
                type="button"
                onClick={handleSubmit}
              >
                SignUp
              </button>
              {/* <button
                className="signup-btn mb-3 mt-1"
                onClick={() => navigate("/")}
              >
                Login
              </button> */}
            </div>
            <p className="create-account-text mt-2">
              Already have an account ?{" "}
              <div
                className="d-inline cursor-pointer forgot-password-text login-text"
                onClick={() => {
                  navigate("/");
                }}
              >
                Login
              </div>
            </p>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
