import React, { useState } from "react";
import "../assets/css/login.css";
import microsoft from "../assets/images/microsoft 1.svg";
import { Link } from "react-router-dom";
import femalebg from "../assets/images/femalebg.png";
import Navbar from "../components/Navbar";
import { Container } from "react-bootstrap";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
              <h5 className="login_heading">Signup</h5>
              <p className="login_text pb-1">
                Please enter the following details to continue.
              </p>
              <button className="login_microsoft_btn">
                <img className="px-3" src={microsoft} alt=".." />
                Signup with Microsoft
              </button>
              <p className="login_options my-3">
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
              </p>
              <form>
                <div className="mb-1">
                  <div className="pb-2 email_id">Email Id</div>
                  <input
                    type="email"
                    className="login_input"
                    placeholder="abc123@example.com"
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
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {/* <div className="login_forgot_pass pb-4">Forgot Password?</div> */}
                <button type="submit" className="login_page_button mt-4">
                  Signup
                </button>
                <div className="login_sign_up pt-3">
                  Have an account?
                  <Link to="/login" className="sign_up_link">
                    Login
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

export default SignupPage;
