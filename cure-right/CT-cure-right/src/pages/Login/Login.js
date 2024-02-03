import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CURE_RIGHT_LOGO from "../../assets/icons/cureRightLogo.svg";
import EYE_ICON from "../../assets/icons/passwordEye.svg";
import { validateFormInput } from "../../utils/helpers/validateFormInput";
import "./Login.css";
import { loginApi } from "../../services/commonApi";
import { useDispatch } from "react-redux";
import { setIsSidebarNavDisplay } from "../../redux/actions";

const Login = ({ userType }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  let notificationId;

  useEffect(() => {
    setPayload({
      ...payload,
      userType: userType,
    });
  }, [userType]);

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
      payload?.password?.length === 0 ? "Password is required" : "";
    if ((isEmailValid || isPasswordValid) !== "") {
      toast?.dismiss(notificationId);
      notificationId = toast?.error(
        isEmailValid !== "" ? isEmailValid : isPasswordValid
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    console.log("handleSubmit called");
    if (validateForm()) {
      setIsLoading(true);
      toast.dismiss(notificationId);
      notificationId = toast.loading("Please wait....");
      try {
        const res = await loginApi(payload);
        toast.dismiss(notificationId);
        setIsLoading(false);
        if (res?.status === 200) {
          localStorage.setItem("authToken", res.data.data.token);
          localStorage.setItem("userId", res.data.data.Id);
          localStorage.setItem("userType", userType);
          dispatch(setIsSidebarNavDisplay(true));
          navigateToHome(userType);
        } else {
          console.log("in else");
          setIsLoading(false);
          toast.error("Invalid credentials.");
        }
      } catch (error) {
        setIsLoading(false);
        toast.dismiss(notificationId);
        console.log("in catch", error?.message?.message);
        notificationId = toast?.error(error?.message?.message);
      }
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid email address");
    }
  };

  const navigateToHome = (userType) => {
    if (userType === "patient") {
      navigate("/home");
    } else {
      navigate(`/${userType}/home`);
    }
  };

  const sendtoForgotPassPage = (e) => {
    localStorage.setItem("userType", userType);
    navigate("/forgotpassword");
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container fluid className="login-div">
      <div className="login-card">
        <div className="login-main-card">
          <img src={CURE_RIGHT_LOGO} alt="cureLogo" className="curelogo mb-3" />
          <h4 className="mt-4">Get Started</h4>
          <p className="mb-4">Enter the following details to proceed.</p>
          <Form className="login-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="mb-1">Email ID</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={payload?.email}
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
                  value={payload?.password}
                  placeholder="Enter Password"
                  onChange={handleChange}
                />
                <img src={EYE_ICON} alt="Eye" onClick={handleShowPassword} />
              </div>
            </Form.Group>
            <div className="btn-group mt-2">
              <button
                className="login-btn mb-3 mt-1"
                disabled={isLoading}
              >
                Login
              </button>
              <button
                type="button"
                className="signup-btn mb-3 mt-1"
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
            </div>

            <p className="create-account-text mt-2">
              Don't remember password ?
              <div
                className="d-inline cursor-pointer forgot-password-text"
                onClick={sendtoForgotPassPage}
              >
                Forgot Password
              </div>
            </p>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default Login;
