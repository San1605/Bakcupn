import React, { useContext } from "react";
import logo from "./assets/svg/login/logo.svg";
import arrow from "./assets/svg/login/arrow.svg";
import cloack from "./assets/svg/login/cloack.svg";
import leaf from "./assets/svg/login/leaf.svg";
import microsoft from "./assets/svg/login/microsoft.svg";
import person from "./assets/svg/login/person.svg";
import spiral from "./assets/svg/login/spiral.svg";
import clock from "./assets/svg/login/mobile-clock.svg";
import "./login.css";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./microsoft-ADLogin.js";
import { Bars } from "react-loader-spinner";
import { GlobalContext } from "./context/GlobalState";
import { useIsAuthenticated } from "@azure/msal-react";
import { useEffect } from "react";
import loginArrow from './assets/svg/login/loginarrow.png'
function Login(props) {
  const { loading, gethrmusingzoho, addToken } = useContext(GlobalContext);
  const { instance, accounts } = useMsal();
  const isauth = useIsAuthenticated();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.log(e);
    });
  };

  const RequestProfileData = async () => {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };
    await instance
      .acquireTokenSilent(request)
      .then((response) => {
        const usermail = {
          email: `${accounts[0].username}`,
        };
        props.setIsLoginT(response.accessToken);
        addToken(response.accessToken, response.idToken, accounts[0].username);
        localStorage.setItem("token", response.accessToken);
        localStorage.setItem("email", accounts[0].username);
        localStorage.setItem("refreshhere", response.idToken);
        gethrmusingzoho(response.accessToken);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  useEffect(() => {
    props.setIsLoginT("");
    if (isauth) {
      RequestProfileData();
    }
  }, [isauth]);

  useEffect(() => {
    document.title = `Login | ${process.env.REACT_APP_APP_NAME}`;
  }, []);

  return (
    <>
      {loading === true ? (
        <div className="page-loader-div">
          <Bars
            height="50"
            width="50"
            color="#4F52B2"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass="page-loader"
            visible={true}
          />
        </div>
      ) : null}
      <div className="row login-page ">
        <div className="login-page-logo-row ">
          <img src={logo} alt="logo" />
        </div>
        <div className="login-page-col-6-left col-lg-6 col-md-5 ">
          <div className="d-flex flex-column" style={{ rowGap: "1.5rem" }}>
            <div className="login-welcome-text">
              Welcome to
              <span style={{ color: "#4F52B2" }}>
                Learning Management <br /> System
              </span>
              <img
                className="login-welcome-text-img "
                src={arrow}
                alt="arrow"
              />
            </div>
            <div className="fw-500">
              <button
                onClick={() => {
                  handleLogin();
                }}
                className="px-3 py-1 ad-signin-btn"
              >
                <img
                  className="p-2"
                  style={{ width: "2.3rem" }}
                  src={microsoft}
                  alt="microsoftlogo"
                />
                <span>Sign in with Microsoft</span>
                {/* <img style={{paddingLeft:"1.5rem",paddingRight:"0.5rem",height:"0.6rem"}} src={loginArrow}/> */}
              </button>
            </div>
          </div>
          <img className="spiral-bg" style={{zIndex:"-2"}} src={spiral} alt="arrow" />
          <img className="mob-clock-bg" src={clock} alt="clock" />
        </div>
        <div className="login-page-col-6-right col-lg-6 col-md-5 position-relative">
          <img className="person-tab-bg  w-100" src={person} alt="tag" />
          <img className="clock-bg " src={cloack} alt="tag" />
          <img className="plant-bg " src={leaf} alt="tag" />
        </div>
      </div>
    </>
  );
}
export default Login;
