import React, { useState } from "react";
import "../assets/css/login.css";
import microsoft from "../assets/images/microsoft 1.svg";
import { Link, useNavigate } from "react-router-dom";
import femalebg from "../assets/images/femalebg.png";
import Navbar from "../components/Navbar";
import { Container } from "react-bootstrap";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userData = [
    {
      "email": "test@celebaltech.com",
      "password": "Celebal@12345",
      "name": "Celebal"
    },
    {
      "email": "nirmal.kukna@celebaltech.com",
      "password": "Nirmal@12345",
      "name": "Nirmal"
    }
  ];

  const loginFun = () => {
    const filterData = userData.filter((item) => item.email === email && item.password === password);
    if (filterData.length > 0) {
      localStorage.setItem("userInfo", JSON.stringify(filterData[0]))
      navigate("/dashboard");
    } else {
      toast.error("Please enter valid details")
    }
  }

  return (
    <>
      <Navbar />
      <Container fluid>
        <div
          className="row main_conatainer-login"
          style={{
            backgroundImage: `url('${femalebg}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="login-card">
            <div className="p-3 login_card_container bg-white">
              <h5 className="login_heading">Login</h5>
              <p className="login_text pb-1">
                Please enter the following details to continue.
              </p>
              <button className="login_microsoft_btn">
                <img className="px-3" src={microsoft} alt=".." />
                Login with Microsoft
              </button>
              <div className="login_options my-3">
                <div className="row align-items-center justify-content-center">
                  <div className="col-5">
                    <span></span>
                  </div>
                  <div className="col-1">
                    Or
                  </div>
                  <div className="col-5">
                    <span></span>
                  </div>
                </div>
              </div>
              <form>
                <div className="mb-1">
                  <div className="pb-2 email_id">Email Id</div>
                  <input
                    type="email"
                    className="login_input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-1">
                  <div className="py-2 password">Password</div>
                  <input
                    type="password"
                    className="login_input"
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {/* <div className="login_forgot_pass pb-4">Forgot Password?</div> */}
                <button type="button" onClick={() => loginFun()} className="login_page_button mt-4">
                  Login
                </button>
                <div className="login_sign_up pt-3">
                  Don't have an account?
                  <Link to="/signup" className="sign_up_link">
                    Sign up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default LoginPage;
