import React, { useContext, useEffect, useState } from "react";
import background from "../assets/images/bgmain.webp";
// import backgroundsm from "../assets/images/bgmain.webp";
import backgroundsm from "../assets/images/backgroundsm.webp";
import microsoftLogin from "../assets/images/Microsoftlogin.svg";
import chevronright from "../assets/images/chevron-right.svg";
import logo from "../assets/images/logo.webp";
import { Context } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useIsAuthenticated } from "@azure/msal-react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
const Login = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { AuthToken ,setAuthToken , setShow } = useContext(Context);
  const isAutheticated = useIsAuthenticated();

  const { instance } = useMsal();

  function handleLogin(instance) {
    toast.loading("Authenticating...", {
      id: "login-toast",
    });
    instance
      .loginPopup(loginRequest)
      .then((res) => {
        toast.success("Logged in successfully", {
          id: "login-toast",
        });
        console.log("navigation")
        console.log("ress", res.accessToken);
        setAuthToken(res.accessToken);
        setShow(true)
        sessionStorage.setItem("auth_token", res.accessToken);
        setTimeout(()=>{
          navigate("/");

        } , 1000)
      })
      .catch((e) => {
        console.error(e);
      });
  }
useEffect(()=>{
  if(AuthToken){
    navigate("/")
  }
} , [AuthToken])
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (windowWidth === 0) {
    return null;
  }
  return (
    <div
      className="h-full bg-cover bg-no-repeat bg-right md:bg-left md:bg-cover md:bg-no-repeat p-10 py-20 md:p-0"
      style={{
        backgroundImage: `url(${
          windowWidth >= 768 ? background : backgroundsm
        })`,
      }}
    >
      <div
        className={`flex flex-col justify-center items-center md:items-start md:pl-[10vw] h-full w-full md:bg-opacity-100 bg-opacity-80 md:static md:transform-none md:h-full rounded-[8px] md:rounded-none ${
          windowWidth >= 768 ? "bg-transparent" : "bg-white"
        }`}
      >
        <div className="absolute top-36 md:top-32 md:left-18 ">
          <img className=" w-52" src={logo} alt="" />
        </div>
        <div className="md:pt-0 pt-12 p-1rem md:w-fit w-[90%] ">
          <div className="font-semibold md:text-3xl text-2xl">Hello 👋</div>
          <div className=" md:text-2xl text-xl text-neutral-500">
            Welcome to the Everise{" "}
          </div>
          <div className="mt-5 ">
            <button
              className="items-center justify-between py-3 px-4 text-white border-1 outline-none w-full border-[#00829B] rounded-lg bg-[#00829B] flex gap-2"
              type="button"
              onClick={() => handleLogin(instance)}
            >
              <img src={microsoftLogin} alt="LOGO" className="h-6 w-6" />
              <span className="text-white font-roboto text-4 font-normal">
                Sign in with Microsoft{" "}
              </span>
              <img src={chevronright} alt="LOGO" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
